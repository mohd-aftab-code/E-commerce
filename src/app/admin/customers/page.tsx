import { db } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type UserWithCounts = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: { sessions: true }
    }
  }
}>;

export const metadata = {
  title: "Manage Customers | Admin Panel",
};

export default async function CustomersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { sessions: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Customers & Users
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all users registered on the platform, including their roles and account status.
          </p>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user: UserWithCounts) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : 
                        user.role === "STAFF" ? "bg-indigo-100 text-indigo-800" : 
                        "bg-gray-100 text-gray-800"
                      }
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${user.status === "ACTIVE" ? "bg-green-100 text-green-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }
                    `}>
                      {user.status.toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
