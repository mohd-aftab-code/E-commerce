import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Print Studio 24",
  description: "Login or register for Print Studio 24.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
