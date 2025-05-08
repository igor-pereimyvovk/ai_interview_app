'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const oneWeek = 60 * 60 * 24 * 7;

export const signUp = async (params: SignUpParams) => {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists, please sign in',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: 'Signed up successfully',
    };
  } catch (error) {
    console.error('signing up error:', error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Unknown error occurred',
    };
  }
};

const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: oneWeek * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: oneWeek,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
};

export const signIn = async (params: SignInParams) => {
  const { idToken } = params;

  try {
    await setSessionCookie(idToken);
  } catch (error) {
    console.error('signing in error:', error);
  }
};

const getCurrentUser: () => Promise<User | null> = async () => {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) return null;

  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db.collection('users').doc(uid).get();

    if (!userRecord.exists) return null;

    return { ...userRecord.data(), id: userRecord.id } as User;
  } catch (error) {
    console.error('getting current user error:', error);

    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();

  return !!user;
};
