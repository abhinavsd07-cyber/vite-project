import React from 'react';

export const DashboardIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M4 18.5a8 8 0 1 1 16 0H4z" />
    <circle cx="12" cy="14" r="2" />
    <path d="M13.4 12.6L16.5 9.5" />
  </svg>
);

export const UsersIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="8" r="4.5" />
    <path d="M5.5 21v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2" />
  </svg>
);

export const VendorIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="9" cy="8" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h3" />
    <path d="M17 12.5l1.3 2.6 2.8.4-2 2 .5 2.8-2.6-1.3-2.6 1.3.5-2.8-2-2 2.8-.4z" />
  </svg>
);

export const CustomersIcon = ({ size = 24, strokeWidth = 2, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="14" r="3.5" />
    <path d="M7 22v-1a4 4 0 0 1 8 0v1" />
    <circle cx="5.5" cy="6.5" r="2.5" />
    <path d="M2.5 14v-1a3 3 0 0 1 3-3h1" />
    <circle cx="18.5" cy="6.5" r="2.5" />
    <path d="M21.5 14v-1a3 3 0 0 0-3-3h-1" />
  </svg>
);
