-- Add soldOut column to Show
ALTER TABLE "Show" ADD COLUMN "soldOut" BOOLEAN NOT NULL DEFAULT false;

-- Add sortOrder column to Release
ALTER TABLE "Release" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Create Bio table
CREATE TABLE IF NOT EXISTS "Bio" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "text" TEXT NOT NULL DEFAULT ''
);

-- Seed default bio if empty
INSERT OR IGNORE INTO "Bio" ("id", "text") VALUES ('main', 'Dave Merheje is considered to be one of the most original standup voices on the comedy scene today. His multiple award-winning act has gained a loyal following across North America with his "no fear" approach on stage and a comedy style best described as aggressive in-your-face funny. Dave had his first comedy special air in Australia on ABC2. His second special "Good Friend Bad Grammar" won the 2019 Juno Award for Comedy Album of the year. His third special "Beautifully Manic," can be seen on Netflix as part of Comedians of the World, and his fourth special titled "I Love You Habibi" is streaming on AppleTV and was nominated for a Canadian Screen Award. Dave''s latest special ''Dawud'' was recently nominated for a 2026 Juno and is available on YouTube. Dave is a regular at the Just For Laughs Festival in Montreal, Toronto, and Vancouver, and has made multiple appearances at The Winnipeg Comedy Festival, The Halifax Comedy Festival, the Melbourne International Comedy Festival in Australia, and tours clubs and theatres regularly.

Dave was a regular contributor on MTV Live, played Mr. Bechara on CBC''s Mr. D, and co-starred in the critically acclaimed comedy series Ramy on Hulu and CraveTV. He was also the lead in the feature film ''Sometimes I Think About Dying'' which was an official selection at the Sundance Film Festival.');
