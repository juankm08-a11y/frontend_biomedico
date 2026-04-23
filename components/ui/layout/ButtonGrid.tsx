
import { ReactNode } from "react";

export default function ButtonGrid({ children }: { children: ReactNode }) {
  return <div className="flex gap-6 mt-6">{children}</div>;
}
