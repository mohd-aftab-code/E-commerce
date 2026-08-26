import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Print Studio 24",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* VIP background decorative elements */}
      <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[600px] h-[600px] bg-brand-primary-100 rounded-full blur-[140px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[700px] h-[700px] bg-brand-cyan-100/50 rounded-full blur-[160px] opacity-70 pointer-events-none" />

      <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Heading Left Aligned */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="text-brand-primary-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            Contact Support
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary-900 tracking-tight mb-6 leading-[1.1]">
            Let's build something <br className="hidden sm:block" /> incredible together.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Have a custom order, need help with a print project, or just want to say hi? We're here for you. Reach out to our Tampa-based team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-2xl shadow-brand-primary-900/5 border border-gray-100/60 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary-600 to-brand-cyan-500" />
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
              
              <ContactForm />
            </div>
          </div>

          {/* Contact Info - Right Side */}
          <div id="locations" className="lg:col-span-5 flex flex-col gap-8 lg:mt-0 mt-4 scroll-mt-24">
            {siteConfig.offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl shadow-brand-primary-900/5 border border-gray-100/60 p-8 sm:p-10 group hover:border-brand-primary-200 transition-colors">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-4">{office.name}</h2>
                <div className="flex flex-col gap-8">
                  
                  <div className="flex gap-5">
                    <div className="h-12 w-12 bg-brand-primary-50 group-hover:bg-brand-primary-100 transition-colors rounded-2xl flex items-center justify-center text-brand-primary-700 flex-shrink-0">
                      <FiMapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-1">Address</h3>
                      <p className="font-bold text-gray-900 text-base leading-relaxed">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="h-12 w-12 bg-brand-primary-50 group-hover:bg-brand-primary-100 transition-colors rounded-2xl flex items-center justify-center text-brand-primary-700 flex-shrink-0">
                      <FiPhone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-1">Call Us</h3>
                      <p className="font-bold text-gray-900 text-base">
                        <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-brand-primary-600 transition-colors">{office.phone}</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="h-12 w-12 bg-brand-primary-50 group-hover:bg-brand-primary-100 transition-colors rounded-2xl flex items-center justify-center text-brand-primary-700 flex-shrink-0">
                      <FiMail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-1">Email Us</h3>
                      <p className="font-bold text-gray-900 text-base">
                        <a href={`mailto:${office.email}`} className="hover:text-brand-primary-600 transition-colors">{office.email}</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="h-12 w-12 bg-brand-primary-50 group-hover:bg-brand-primary-100 transition-colors rounded-2xl flex items-center justify-center text-brand-primary-700 flex-shrink-0">
                      <FiClock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-1">Working Hours</h3>
                      <div className="font-bold text-gray-900 text-base space-y-1">
                        {office.hours.map((hour, i) => (
                          <p key={i}>{hour}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
