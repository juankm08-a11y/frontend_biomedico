"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <div className="w-full flex justify-center px-6 py-8">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  );
}
