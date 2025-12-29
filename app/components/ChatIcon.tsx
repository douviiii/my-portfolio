"use client";

import Image from "next/image";

export default function ChatIcon() {
  return (
    <div className="inline-flex items-center justify-center chat-icon-wrapper">
      <Image
        src="/chat.gif"
        alt="Chat animation"
        width={48}
        height={48}
        className="chat-gif"
        unoptimized
      />
    </div>
  );
}

