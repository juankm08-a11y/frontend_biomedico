"use client";

interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({children}:Props) {
    return (
        <div className=" min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[var(--color-panel-blue)]
      via-[var(--color-form-bg)]
      to-[var(--color-panel-yellow)]">
        <div className="w-full max-w-[420px]">
            {children}
        </div>
      </div>
    )
}