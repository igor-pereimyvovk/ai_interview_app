'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from '@/components/FormField';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
import { FirebaseError } from 'firebase/app';

const createAuthFormSchema = (type: FormType) =>
  z.object({
    name: type === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });

type AuthFormProps = {
  type: FormType;
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const formSchema = createAuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up' && values.name) {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({ uid: userCredentials.user.uid, name, email });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in');
        console.log('Sign up', values);
      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        await signIn({ email, idToken });

        toast.success('Signed in successfully.');
        router.push('/');
        console.log('Sign in', values);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/invalid-credential':
            toast.error('Invalid login credentials. Please try again.');
            break;
          default:
            toast.error(`Authentication error: ${error.message}`);
        }
      } else if (error instanceof Error) {
        toast.error(`Unexpected error: ${error.message}`);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="card flex flex-col gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-brand">PrepWise</h2>
        </div>
        <h3 className="self-center">Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form w-full space-y-6 mt-4">
            {!isSignIn && (
              <FormField
                name="name"
                label="Name"
                placeholder="name"
                type="text"
                control={form.control}
              />
            )}
            <FormField
              name="email"
              label="Email"
              placeholder="email"
              type="email"
              control={form.control}
            />
            <FormField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
              control={form.control}
            />
            <Button type="submit" size="lg" className="w-full text-base font-bold">
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Already have an account?'}
          <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold ml-1">
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
