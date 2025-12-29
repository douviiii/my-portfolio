"use client";

import Image from "next/image";

export default function DiplomaIcon() {
  return (
    <div className="inline-flex items-center justify-center diploma-icon-wrapper">
      <Image
        src="/diploma.gif"
        alt="Diploma animation"
        width={48}
        height={48}
        className="diploma-gif"
        unoptimized
      />
    </div>
  );
}

