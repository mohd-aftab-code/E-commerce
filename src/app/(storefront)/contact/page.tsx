import type { Metadata } from "next";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Us | Print Studio 24",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-extrabold text-brand-navy-900 sm:text-5xl tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-gray-500">
            Have a custom order or need help with a print project? We're here to help. Reach out to our Tampa-based team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="firstName" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-brand-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="lastName" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-brand-cyan-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-brand-cyan-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select id="subject" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-brand-cyan-500 focus:outline-none bg-white">
                  <option>General Inquiry</option>
                  <option>Custom Quote Request</option>
                  <option>Order Support</option>
                  <option>Design Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-brand-cyan-500 focus:outline-none"></textarea>
              </div>
              <button type="button" className="w-full rounded-lg bg-brand-navy-900 px-6 py-3 text-white font-bold hover:bg-brand-royal-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 bg-brand-cyan-50 rounded-xl flex items-center justify-center text-brand-primary-800 mb-2">
                  <FiPhone className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm">Mon-Fri from 9am to 6pm EST.</p>
                <p className="font-semibold text-brand-navy-900 mt-1">(+1) 435 485 232</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 bg-brand-cyan-50 rounded-xl flex items-center justify-center text-brand-primary-800 mb-2">
                  <FiMail className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                <p className="text-gray-500 text-sm">Our friendly team is here to help.</p>
                <p className="font-semibold text-brand-navy-900 mt-1">support@printstudio24.com</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 bg-brand-cyan-50 rounded-xl flex items-center justify-center text-brand-primary-800 mb-2">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Visit Us</h3>
                <p className="text-gray-500 text-sm">Come say hello at our HQ.</p>
                <p className="font-semibold text-brand-navy-900 mt-1">
                  123 Print Ave<br/>
                  Tampa, FL 33602<br/>
                  United States
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 bg-brand-cyan-50 rounded-xl flex items-center justify-center text-brand-primary-800 mb-2">
                  <FiClock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Hours</h3>
                <p className="text-gray-500 text-sm">When we are printing.</p>
                <p className="font-semibold text-brand-navy-900 mt-1">
                  Mon-Fri: 9:00 AM - 6:00 PM<br/>
                  Sat-Sun: Closed
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
