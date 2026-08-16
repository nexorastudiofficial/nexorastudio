import type { Metadata } from "next";
import CollectionView from "../CollectionView";
import { categoryLabels } from "../../data/products";

export const dynamicParams = false;

const categories = ["all", "smart", "classic", "accessories"];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || "الساعات";
  return {
    title: `${label} — CHRONOVA`,
    description: `تسوّق تشكيلة ${label} الفاخرة بدقة متناهية من دار كرونوفا.`,
  };
}

export default async function CollectionRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CollectionView category={category} />;
}
