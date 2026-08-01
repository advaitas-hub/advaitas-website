'use client';

import { Home, Briefcase, User, FolderOpen, Mail } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <Home className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#home',
  },
  {
    title: 'Services',
    icon: (
      <Briefcase className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#services',
  },
  {
    title: 'About',
    icon: (
      <User className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#about',
  },
  {
    title: 'Portfolio',
    icon: (
      <FolderOpen className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#portfolio',
  },
  {
    title: 'Contact',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#contact',
  },
];

export function AppleStyleDock() {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='fixed bottom-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 cursor-pointer'
            onClick={() => handleClick(item.href)}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
