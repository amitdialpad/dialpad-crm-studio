import React from 'react'
export function Input({ className = '', ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full border border-slate-300 rounded-xl px-3 py-2 text-sm ${className}`} {...rest} />
}
