"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <div className="w-full min-h-screen px-6 py-8">
      {children}
    </div>
  );
}
