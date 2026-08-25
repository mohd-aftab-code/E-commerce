import React from 'react';
import { Truck, Award, HeadphonesIcon, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Ship Worldwide',
    description: 'Lorem ipsum det, consec tetur adipis cing elit duis nec quality'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Lorem ipsum det, consec tetur adipis cing elit duis nec quality'
  },
  {
    icon: HeadphonesIcon,
    title: 'Quick Support',
    description: 'Lorem ipsum det, consec tetur adipis cing elit duis nec quality'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: 'Lorem ipsum det, consec tetur adipis cing elit duis nec quality'
  }
];

export function StoreFeatures() {
  return (
    <section className="bg-[#F8F9FA] py-12 border-y border-gray-100">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <feature.icon className="w-10 h-10 text-brand-primary-900" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-brand-primary-900 font-bold text-[15px] mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
