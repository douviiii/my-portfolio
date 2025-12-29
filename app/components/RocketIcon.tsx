"use client";

import Image from "next/image";

export default function RocketIcon() {
  return (
    <div className="inline-flex items-center justify-center rocket-icon-wrapper">
      <Image
        src="/rocket.gif"
        alt="Rocket animation"
        width={48}
        height={48}
        className="rocket-gif"
        unoptimized
      />
    </div>
  );
}

