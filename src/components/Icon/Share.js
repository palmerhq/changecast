import React from 'react'
export const Share = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="Share_svg__feather Share_svg__feather-share-2"
    {...props}
  >
    <circle cx={18} cy={5} r={3} />
    <circle cx={6} cy={12} r={3} />
    <circle cx={18} cy={19} r={3} />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
)
