"use client";

import Image from "next/image";

export default function AwardIcon() {
  return (
    <div className="inline-flex items-center justify-center award-icon-wrapper">
      <Image
        src="/award.gif"
        alt="Award animation"
        width={48}
        height={48}
        className="award-gif"
        unoptimized
      />
    </div>
  );
}

