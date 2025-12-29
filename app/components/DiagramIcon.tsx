"use client";

import Image from "next/image";

export default function DiagramIcon() {
  return (
    <div className="inline-flex items-center justify-center diagram-icon-wrapper">
      <Image
        src="/diagram.gif"
        alt="Diagram animation"
        width={48}
        height={48}
        className="diagram-gif"
        unoptimized
      />
    </div>
  );
}

