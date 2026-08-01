"use client";

import React from "react";
import { Code2, Globe, Smartphone } from "lucide-react";
import "./social-card.css";

// Types
interface SocialBoxProps {
  href: string;
  icon: React.ReactNode;
  className: string;
  delay?: string;
  title?: string;
}

interface SocialCardProps {
  title?: string;
  socialLinks?: Array<{
    href: string;
    icon: React.ReactNode;
    className: string;
    delay?: string;
    title?: string;
  }>;
}

// Service Icons using lucide-react
const SoftwareIcon = () => <Code2 className="w-8 h-8" />;
const WebIcon = () => <Globe className="w-8 h-8" />;
const MobileIcon = () => <Smartphone className="w-8 h-8" />;

// Service Box Component
const ServiceBox = ({
  href,
  icon,
  className,
  delay,
  title,
}: SocialBoxProps) => (
  <a href={href} className="group">
    <div
      className={`service-box ${className}`}
      style={{ transitionDelay: delay }}
      title={title}
    >
      <span className="service-icon">{icon}</span>
      {title && <span className="service-title text-xs">{title}</span>}
    </div>
  </a>
);

// Service Card Component
const ServiceCard = ({
  title = "Our Services",
  socialLinks = [
    {
      href: "#services",
      icon: <SoftwareIcon />,
      className: "box1",
      title: "Custom Software",
    },
    {
      href: "#services",
      icon: <WebIcon />,
      className: "box2",
      delay: "0.2s",
      title: "Web Development",
    },
    {
      href: "#services",
      icon: <MobileIcon />,
      className: "box3",
      delay: "0.4s",
      title: "Mobile Apps",
    },
  ],
}: SocialCardProps) => (
  <div className="service-card">
    <div className="service-background" />
    <div className="service-logo">{title}</div>
    {socialLinks.map((link, index) => (
      <ServiceBox
        key={index}
        href={link.href}
        icon={link.icon}
        className={link.className}
        delay={link.delay}
        title={link.title}
      />
    ))}
  </div>
);

export const Component = () => {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <ServiceCard />
    </div>
  );
};

export default ServiceCard;
