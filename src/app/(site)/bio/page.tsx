import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Bio",
};

export default function BioPage() {
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
              <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
                Dave Merheje is considered to be one of the most original standup
                voices on the comedy scene today. His multiple award-winning act has
                gained a loyal following across North America with his &quot;no
                fear&quot; approach on stage and a comedy style best described as
                aggressive in-your-face funny. Dave had his first comedy special air
                in Australia on ABC2. His second special &quot;Good Friend Bad
                Grammar&quot; won the 2019 Juno Award for Comedy Album of the year.
                His third special &quot;Beautifully Manic,&quot; can be seen on
                Netflix as part of Comedians of the World, and his fourth special
                titled &quot;I Love You Habibi&quot; is streaming on AppleTV and was
                nominated for a Canadian Screen Award. Dave&apos;s latest special
                &apos;Dawud&apos; was recently nominated for a 2026 Juno and is
                available on YouTube. Dave is a regular at the Just For Laughs
                Festival in Montreal, Toronto, and Vancouver, and has made multiple
                appearances at The Winnipeg Comedy Festival, The Halifax Comedy
                Festival, the Melbourne International Comedy Festival in Australia,
                and tours clubs and theatres regularly.
              </p>
              <p style={{ lineHeight: "1.8" }}>
                Dave was a regular contributor on MTV Live, played Mr. Bechara on
                CBC&apos;s Mr. D, and co-starred in the critically acclaimed comedy
                series Ramy on Hulu and CraveTV. He was also the lead in the feature
                film &apos;Sometimes I Think About Dying&apos; which was an official
                selection at the Sundance Film Festival.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
