"use client";

import React from "react";
import Image from "next/image";

const services = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Tailored software solutions designed to meet your unique business requirements and scale seamlessly with your growth.",
    gif: "/software-development.gif",
    badge: "Enterprise & Scale",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications that engage users and drive results with cutting-edge technologies.",
    gif: "/web-development.gif",
    badge: "Next-Gen Web",
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences and performance.",
    gif: "/mobile-app.gif",
    badge: "iOS & Android",
  },
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="w-full py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mt-4 mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We deliver comprehensive digital solutions tailored to elevate your brand and drive business growth.
          </p>
        </div>

        {/* Service Cards Grid with GIFs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-cyan-400 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* GIF Container */}
              <div className="relative w-full h-60 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={service.gif}
                  alt={service.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <span className="absolute top-4 left-4 bg-blue-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {service.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-cyan-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-cyan-600 group-hover:text-blue-900 transition-colors"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
