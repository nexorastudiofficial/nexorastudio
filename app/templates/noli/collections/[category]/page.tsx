import type { Metadata } from "next";
import CollectionView from "../CollectionView";
import { categoryLabels } from "../../data/products";

export const dynamicParams = false;

const categories = ["all", "clothing", "toys", "gifts"];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || "المنتجات";
  return {
    title: `${label} — NOLI & CO.`,
    description: `تسوّق تشكيلة ${label} الفاخرة للأطفال من بوتيك نولي & كو.`,
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
