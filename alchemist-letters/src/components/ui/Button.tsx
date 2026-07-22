import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-accent-brown text-paper-bg hover:bg-[#7A3B10] active:bg-[#6A3000]',
  secondary: 'border border-ink-light text-ink-light hover:bg-[#3A2A1A]/5 active:bg-[#3A2A1A]/10',
  danger: 'bg-accent-danger text-white hover:bg-[#8A3030] active:bg-[#7A2020]',
  ghost: 'text-ink-light hover:text-ink hover:bg-[#3A2A1A]/5',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-ui rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
