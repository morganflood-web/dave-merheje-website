"use client";
import { useState } from "react";

type Props = {
  src: string | null | undefined;
  alt: string;
  title: string;
  year: number;
};

export default function ReleaseImage({ src, alt, title, year }: Props) {
  const [imgFailed, setImgFailed] = useState(false);

  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setImgFailed(true)}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-bebas, Impact, sans-serif)",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          letterSpacing: "0.08em",
          color: "white",
          textAlign: "center",
          margin: 0,
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>
        {year}
      </p>
    </div>
  );
}
