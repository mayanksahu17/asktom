import { SignInForm } from '@/components/SignInForm'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Sign In</h1>
        <SignInForm />
      </div>
    </div>
  )
}

