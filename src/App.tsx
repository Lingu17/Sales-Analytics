import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Dashboard } from "./components/pages/Dashboard";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <h2 className="text-xl font-semibold text-blue-600">Sales Analytics</h2>
        <SignOutButton />
      </header>
      <main className="flex-1">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <Dashboard />
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-full max-w-md mx-auto p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Sales Dashboard</h1>
              <p className="text-gray-600">Sign in to access your sales analytics</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </>
  );
}
