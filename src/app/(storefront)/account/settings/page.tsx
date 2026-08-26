import { getSession } from "@/lib/session";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Settings | Print Studio 24",
};

export default async function SettingsPage() {
  const session = await getSession();
  
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.userId }
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and contact details.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
        </div>
        <div className="p-6">
          <form className="space-y-4 max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  defaultValue={user.firstName}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-900 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  defaultValue={user.lastName}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary-900 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                defaultValue={user.email}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled
              />
              <p className="text-xs text-gray-500">Your email address cannot be changed right now.</p>
            </div>

            <div className="pt-4">
              <button 
                type="button" 
                disabled
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-900 disabled:pointer-events-none disabled:opacity-50 bg-brand-primary-900 text-white hover:bg-brand-primary-800 h-10 px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
