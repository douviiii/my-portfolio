"use client";

import Image from "next/image";

export default function CustomerIcon() {
  return (
    <div className="inline-flex items-center justify-center customer-icon-wrapper">
      <Image
        src="/customer.gif"
        alt="Customer animation"
        width={48}
        height={48}
        className="customer-gif"
        unoptimized
      />
    </div>
  );
}

