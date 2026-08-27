import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Printer } from "lucide-react";

export const metadata = {
  title: "Invoice | Print Studio 24",
  robots: { index: false, follow: false },
};

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            include: {
              options: {
                include: { values: true },
              },
            },
          },
        },
      },
      coupon: true,
    },
  });

  if (!order) return notFound();

  const customer = order.userId ? await db.user.findUnique({ where: { id: order.userId } }) : null;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white p-4 sm:p-8 font-sans text-gray-900">
      {/* Print Button Wrapper - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end print:hidden">
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary-900 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-primary-800 transition-colors"
          style={{ cursor: "pointer" }}
        >
          <Printer className="w-4 h-4" />
          <span onClick={() => {}} id="print-btn-text">Print Invoice</span>
        </button>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.querySelector('.print\\\\:hidden button').addEventListener('click', function() {
                window.print();
              });
            `,
          }}
        />
      </div>

      {/* Printable Invoice Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-sm border border-gray-200 print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-brand-primary-900 rounded-lg flex items-center justify-center">
                 <span className="text-xl font-extrabold text-white leading-none">PS</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-brand-primary-900">Print Studio 24</h1>
            </div>
            <p className="text-sm text-gray-500">123 Printing Lane<br />Tampa, FL 33602<br />contact@printstudio24.com<br />+1 (555) 123-4567</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-2">Invoice</h2>
            <p className="text-sm font-semibold text-gray-900">Invoice #<span className="font-mono">{order.id.slice(-8).toUpperCase()}</span></p>
            <p className="text-sm text-gray-500">Date: {formatDate(order.createdAt)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Status: <span className="font-bold text-gray-800 uppercase">{order.status.replace('_', ' ')}</span>
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Billed To</h3>
            <p className="text-sm font-bold text-gray-900">{customer ? `${customer.firstName} ${customer.lastName}` : order.shippingName || "Guest Checkout"}</p>
            {customer && <p className="text-sm text-gray-600">{customer.email}</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Shipped To</h3>
            {order.shippingAddress ? (
              <div className="text-sm text-gray-800 leading-relaxed">
                <p className="font-bold">{order.shippingName}</p>
                <p>{order.shippingAddress}</p>
                <p>{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
                <p>United States</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No shipping details provided</p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 text-xs font-bold uppercase tracking-widest text-gray-500 w-2/3">Item Description</th>
                <th className="py-3 text-xs font-bold uppercase tracking-widest text-gray-500 text-center w-1/6">Qty</th>
                <th className="py-3 text-xs font-bold uppercase tracking-widest text-gray-500 text-right w-1/6">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <p className="font-bold text-gray-900">{item.product.name}</p>
                    {item.options && typeof item.options === 'object' && Object.keys(item.options).length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        {Object.entries(item.options as Record<string, string>).map(([optId, valId]) => {
                           const optionsArray = item.product.options as any[] | undefined;
                           const option = optionsArray?.find((o: any) => o.id === optId);
                           const value = option?.values?.find((v: any) => v.id === valId);
                           if (!option || !value) return null;
                           return <span key={optId} className="mr-3 inline-block">• {option.name}: {value.label}</span>;
                        })}
                      </div>
                    )}
                  </td>
                  <td className="py-4 text-center text-sm font-medium text-gray-700">{item.quantity}</td>
                  <td className="py-4 text-right text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-1/2 sm:w-1/3">
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatPrice(order.totalAmount + order.discountTotal)}</span>
            </div>
            {order.coupon && (
              <div className="flex justify-between py-2 text-sm text-green-600 border-t border-gray-100">
                <span>Discount ({order.coupon.code})</span>
                <span className="font-medium">-{formatPrice(order.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-sm text-gray-600 border-t border-gray-100">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">
                {order.status === 'PENDING_PAYMENT' ? 'TBD' : 'Included'}
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-gray-900 mt-2">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-xl font-extrabold text-brand-primary-900">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          <p className="font-semibold text-gray-600 mb-1">Thank you for your business!</p>
          <p>If you have any questions about this invoice, please contact support@printstudio24.com</p>
        </div>

      </div>
    </div>
  );
}
