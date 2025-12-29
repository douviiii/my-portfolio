"use client";

import Image from "next/image";

export default function ComputerIcon() {
  return (
    <div className="inline-flex items-center justify-center computer-icon-wrapper">
      <Image
        src="/computer.gif"
        alt="Computer animation"
        width={48}
        height={48}
        className="computer-gif"
        unoptimized
      />
    </div>
  );
}

