"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, PhoneCall } from "lucide-react";
import { submitLead } from "../actions";

const WHATSAPP_NUMBER = "18133273551";

export function FloatingLeadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const toggleForm = () => setIsOpen(!isOpen);
  
  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  // Close when pressing Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(formRef.current);
    const result = await submitLead(formData);

    setIsSubmitting(false);

    if (result.success) {
      setMessage({ text: result.message, type: "success" });
      formRef.current.reset();
      // Auto close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setMessage(null);
      }, 3000);
    } else {
      setMessage({ text: result.message, type: "error" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
      {/* Query Form Modal/Popover */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-300 origin-bottom-right">
          <div className="bg-brand-primary-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-brand-cyan-400" />
              Get a Quote
            </h3>
            <button 
              onClick={toggleForm}
              className="text-gray-300 hover:text-white transition-colors p-1"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-5">
              Have a question about our services? Leave your details and we'll get back to you shortly.
            </p>

            {message && (
              <div className={`p-3 rounded-xl mb-5 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="lead-name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary-900 focus:ring-1 focus:ring-brand-primary-900 outline-none transition-all text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="lead-email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="lead-email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary-900 focus:ring-1 focus:ring-brand-primary-900 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="sr-only">Phone (Optional)</label>
                <input
                  type="tel"
                  id="lead-phone"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary-900 focus:ring-1 focus:ring-brand-primary-900 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="lead-message" className="sr-only">Message</label>
                <textarea
                  id="lead-message"
                  name="message"
                  required
                  placeholder="How can we help you?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary-900 focus:ring-1 focus:ring-brand-primary-900 outline-none transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary-900 hover:bg-brand-primary-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="flex flex-col items-end gap-3">
        {/* Get a Quote Button */}
        {!isOpen && (
          <button
            onClick={toggleForm}
            className="hidden sm:flex bg-white hover:bg-gray-50 text-brand-primary-900 border border-gray-200 font-bold py-3 px-5 rounded-full shadow-lg items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            Get a Quote
          </button>
        )}
        
        {/* WhatsApp Icon */}
        <button
          onClick={openWhatsApp}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Custom WhatsApp SVG icon to match standard brand icon better than standard PhoneCall */}
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
