import type { Metadata } from "next";
import CollectionView from "../CollectionView";
import { categoryLabels } from "../../data/products";

export const dynamicParams = false;

const categories = ["all", "men", "women", "running", "training", "lifestyle", "accessories"];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || "الأحذية";
  return {
    title: `${label} — AVERO`,
    description: `تسوّق تشكيلة ${label} المصممة بتقنيات الأداء الرياضي المتطورة من أفيرو.`,
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
