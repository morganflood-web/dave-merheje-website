export type PlatformLink = {
  label: string;
  url: string;
};

export function parsePlatforms(json: unknown): PlatformLink[] {
  if (!Array.isArray(json)) return [];
  return json
    .filter(
      (x): x is PlatformLink =>
        !!x &&
        typeof x === "object" &&
        "label" in x &&
        "url" in x &&
        typeof (x as PlatformLink).label === "string" &&
        typeof (x as PlatformLink).url === "string",
    )
    .map((x) => ({ label: x.label, url: x.url }));
}
