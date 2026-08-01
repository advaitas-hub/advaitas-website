"use client";

import React from "react";
import ServiceCard from "@/components/ui/social-card";

export default function ServicesShowcase() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 font-fredoka">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive digital solutions tailored to drive your
            business forward
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <ServiceCard
            title="Our Services"
            socialLinks={[
              {
                href: "#custom-software",
                icon: <CustomSoftwareIcon />,
                className: "box1",
                title: "Custom Software",
              },
              {
                href: "#web-development",
                icon: <WebDevelopmentIcon />,
                className: "box2",
                delay: "0.2s",
                title: "Web Development",
              },
              {
                href: "#mobile-apps",
                icon: <MobileAppsIcon />,
                className: "box3",
                delay: "0.4s",
                title: "Mobile Apps",
              },
            ]}
          />
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <ServiceDetail
            id="custom-software"
            title="Custom Software Development"
            description="Tailored software solutions designed to meet your unique business requirements and scale with your growth"
          />
          <ServiceDetail
            id="web-development"
            title="Web Development"
            description="Modern, responsive websites that engage users and drive results with cutting-edge technologies"
          />
          <ServiceDetail
            id="mobile-apps"
            title="Mobile Applications"
            description="Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences"
          />
        </div>
      </div>
    </section>
  );
}

// Icons
function CustomSoftwareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-6 h-6"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function WebDevelopmentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MobileAppsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-6 h-6"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
}

function ServiceDetail({ id, title, description }: ServiceDetailProps) {
  return (
    <div id={id} className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:border-cyan-300 transition-all">
      <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <a
        href="#contact"
        className="inline-block mt-6 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
      >
        Learn More →
      </a>
    </div>
  );
}
