"use client";

import Image from "next/image";

export default function MortarboardIcon() {
  return (
    <div className="inline-flex items-center justify-center mortarboard-icon-wrapper">
      <Image
        src="/mortarboard.gif"
        alt="Mortarboard animation"
        width={48}
        height={48}
        className="mortarboard-gif"
        unoptimized
      />
    </div>
  );
}

