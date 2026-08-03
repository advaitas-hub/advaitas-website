"use client";

import HowItWorks, { Step } from "@/components/ui/how-it-works";

export default function WhatWeStandFor() {
  const advaitaValues: Step[] = [
    {
      title: "Innovation First",
      description:
        "We push boundaries and embrace cutting-edge technologies to deliver solutions that transform businesses.",
      colorTheme: "blue",
    },
    {
      title: "Client Success",
      description:
        "Your goals are our mission. We partner with you every step of the way to ensure measurable results.",
      colorTheme: "purple",
    },
    {
      title: "Quality Excellence",
      description:
        "We never compromise on quality. Every line of code, every design element is crafted with precision.",
      colorTheme: "orange",
    },
    {
      title: "Agile Mindset",
      description:
        "We adapt quickly to changes, iterate rapidly, and deliver value continuously.",
      colorTheme: "blue",
    },
    {
      title: "Transparency",
      description:
        "Open communication, honest feedback, and clear timelines are at the heart of everything we do.",
      colorTheme: "purple",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            What We Stand For
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Our core values drive everything we do. These principles guide our decisions,
            shape our culture, and define our commitment to excellence.
          </p>
        </div>
        <HowItWorks features={advaitaValues} />
      </div>
    </div>
  );
}
