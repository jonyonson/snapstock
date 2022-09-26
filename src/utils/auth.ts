import { signIn, signOut } from 'next-auth/react';

const PROVIDERS = {
  GOOGLE: 'google',
};

async function handleGoogleSignIn() {
  await signIn(PROVIDERS.GOOGLE, {
    callbackUrl: 'http://localhost:3000/dashboard',
  });
}

async function handleSignOut() {
  await signOut({ callbackUrl: 'http://localhost:3000/' });
}

export { handleGoogleSignIn, handleSignOut };
