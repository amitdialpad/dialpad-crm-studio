import React from 'react'

export function Button({
  children,
  className = '',
  variant = 'default',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }) {
  const styles =
    variant === 'outline'
      ? 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
      : 'bg-slate-900 text-white hover:bg-slate-800'
  return (
    <button className={`px-3 py-2 rounded-xl text-sm ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}
