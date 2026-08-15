import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { bySlug } from "../../data/fragrances";

export function generateStaticParams() {
  return [
    "no01",
    "no02",
    "no03",
    "no04",
    "no05",
    "no06",
    "no07",
    "no08",
    "no09",
    "no10",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fragrance = bySlug(slug);
  if (!fragrance) return {};
  return {
    title: `${fragrance.no} · ${fragrance.nameEn} — VELORA`,
    description: fragrance.description,
  };
}

export default async function FragranceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fragrance = bySlug(slug);
  if (!fragrance) notFound();
  return <ProductPage fragrance={fragrance} />;
}
