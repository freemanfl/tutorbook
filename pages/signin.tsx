import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignInPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');

  const handleEmailSignIn = async () => {
    if (!email) return;
    await signIn('email', {
      email,
      redirect: false,
      callbackUrl: '/',
    });
    alert('Check your email for the magic link!');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      {session ? (
        <>
          <p className="mb-4">Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">Sign in with your email</p>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleEmailSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Send Magic Link
          </button>
        </>
      )}
    </div>
  );
}
