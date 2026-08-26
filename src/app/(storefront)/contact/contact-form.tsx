"use client";

import { useActionState, useEffect, useState } from "react";
import { submitContactForm } from "@/features/shared/contact/actions";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  if (state.success && showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
        <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
        <button 
          onClick={() => setShowSuccess(false)}
          className="mt-6 text-sm font-medium text-green-700 hover:text-green-800 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {state.error}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="name" 
            className={`w-full rounded-xl border ${state.fieldErrors?.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-brand-primary-500'} bg-gray-50/50 px-4 py-3.5 focus:bg-white focus:ring-2 focus:border-transparent transition-all outline-none text-gray-800`} 
            placeholder="John" 
          />
          {state.fieldErrors?.name && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name (Optional)</label>
          <input 
            type="text" 
            id="lastName" 
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent transition-all outline-none text-gray-800" 
            placeholder="Doe" 
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          className={`w-full rounded-xl border ${state.fieldErrors?.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-brand-primary-500'} bg-gray-50/50 px-4 py-3.5 focus:bg-white focus:ring-2 focus:border-transparent transition-all outline-none text-gray-800`} 
          placeholder="john@example.com" 
        />
        {state.fieldErrors?.email && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
        <select 
          id="subject" 
          name="subject"
          className={`w-full rounded-xl border ${state.fieldErrors?.subject ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-brand-primary-500'} bg-gray-50/50 px-4 py-3.5 focus:bg-white focus:ring-2 focus:border-transparent transition-all outline-none text-gray-800 appearance-none`}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Custom Quote Request">Custom Quote Request</option>
          <option value="Order Support">Order Support</option>
          <option value="Design Services">Design Services</option>
        </select>
        {state.fieldErrors?.subject && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.subject[0]}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
        <textarea 
          id="message" 
          name="message"
          rows={6} 
          className={`w-full rounded-xl border ${state.fieldErrors?.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-brand-primary-500'} bg-gray-50/50 px-4 py-3.5 focus:bg-white focus:ring-2 focus:border-transparent transition-all outline-none text-gray-800 resize-none`} 
          placeholder="Tell us about your project..."
        ></textarea>
        {state.fieldErrors?.message && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.message[0]}</p>}
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center items-center rounded-xl bg-brand-primary-900 px-6 py-4 text-white font-extrabold text-lg hover:bg-brand-primary-800 transition-all shadow-md hover:shadow-xl disabled:opacity-70 disabled:hover:shadow-md disabled:cursor-not-allowed"
      >
        {isPending ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
