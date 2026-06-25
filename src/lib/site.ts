export const SITE_NAME = "Rahul Wale";
export const SITE_TITLE = "Rahul Wale";
export const SITE_DESCRIPTION =
  "Rahul Wale is an AI engineer and full-stack developer building production AI systems: voice agents, RAG products, computer vision platforms, and full-stack applications.";

const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (rawSiteUrl ?? "https://rahulwale.vercel.app").replace(/\/$/, "");
export const HAS_SITE_URL = SITE_URL.length > 0;

export function absoluteUrl(path = "/") {
  if (!SITE_URL) return path;
  return new URL(path, SITE_URL).toString();
}

export function projectUrl(slug: string) {
  return absoluteUrl(`/projects/${slug}`);
}
