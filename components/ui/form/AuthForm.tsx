"use client";

interface Props {
    title:string;
    subtitle:string;
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export default function AuthForm({
    title,
    subtitle,
    onSubmit,
    children,
}:Props) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                {children}
            </form>
        </div>
    )
}