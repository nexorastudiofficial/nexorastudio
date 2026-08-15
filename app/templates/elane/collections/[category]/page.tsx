import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "../CollectionView";
import { categoryLabels } from "../../data/products";

const valid = ["all", "women", "men", "accessories"];

export function generateStaticParams() {
  return valid.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!valid.includes(category)) return {};
  return {
    title: `${categoryLabels[category]} — ÉLANÉ`,
    description: "تسوّق المجموعة الكاملة من ÉLANÉ.",
  };
}

export default async function CollectionRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!valid.includes(category)) notFound();
  return <CollectionView category={category} />;
}
