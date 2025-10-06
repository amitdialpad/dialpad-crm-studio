import React from 'react'
export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'secondary' }) {
  const styles = variant === 'secondary' ? 'bg-slate-100 text-slate-700' : 'bg-slate-900 text-white'
  return <span className={`inline-block text-[10px] px-2 py-1 rounded-full ${styles}`}>{children}</span>
}
