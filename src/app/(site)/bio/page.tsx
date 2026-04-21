import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { getBio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bio",
};

export default async function BioPage() {
  const bio = await getBio();

  // Split bio text on double newlines for paragraph rendering
  const paragraphs = bio.text
    ? bio.text.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl px-8 py-16">
          <h1 className="w-full text-center font-[family-name:var(--font-bebas)] text-5xl tracking-[0.12em] text-white sm:text-6xl">
            BIO
          </h1>
          <div className="mt-12 flex flex-col items-start gap-12 md:flex-row">
            <div className="w-full md:w-2/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- explicit static img per design */}
              <img
                src="/images/dave-image-1.jpg"
                alt="Dave Merheje"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <div className="w-full md:w-3/5">
              {paragraphs.length > 0 ? (
                paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p style={{ lineHeight: "1.8", color: "rgba(255,255,255,0.5)" }}>
                  Bio coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
