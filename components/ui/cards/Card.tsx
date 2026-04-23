import { UI_SIZES } from "@/utils/uiSizes";

interface CardProps {
  variant?: "default" | "form" | "table";
  title?: string;
  children: React.ReactNode;
}

export default function Card({
  variant = "default",
  title,
  children,
}: CardProps) {
  const sizes = {
    default: {},
    form: UI_SIZES.FORM_CARD,
    table: UI_SIZES.TABLE_CARD,
  };

  const variants = {
    default: "bg-[var(--color-card)]",
    form: "bg-[var(--color-card)]",
    table: "bg-[var(--color-card)]",
  };

  return (
    <div
      style={sizes[variant]}
      className={`${variants[variant]} w-full p-6 rounded shadow overflow-hidden`}
    >
      {title && (
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
}
