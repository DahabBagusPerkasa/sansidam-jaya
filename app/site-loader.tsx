"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteLoader() {
  const pathname = usePathname();

  return <RadarLoader key={pathname} />;
}

function RadarLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`radar-loader ${isLoading ? "" : "radar-loader-hidden"}`}
      aria-hidden="true"
    >
      <div className="radar">
        <div className="radar-circle radar-circle-1" />
        <div className="radar-circle radar-circle-2" />
        <div className="radar-circle radar-circle-3" />

        <div className="radar-cross radar-cross-horizontal" />
        <div className="radar-cross radar-cross-vertical" />
        <div className="radar-sweep" />
        <div className="radar-center" />

        <span className="radar-dot radar-dot-1" />
        <span className="radar-dot radar-dot-2" />
        <span className="radar-dot radar-dot-3" />
      </div>
    </div>
  );
}
