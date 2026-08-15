import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "../CollectionView";
import { categoryLabels, type Category } from "../../data/fragrances";

const valid: Category[] = ["all", "women", "men", "unisex"];

export function generateStaticParams() {
  return valid.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!valid.includes(category as Category)) return {};
  return {
    title: `${categoryLabels[category as Category]} — VELORA`,
    description: "تسوّقي مجموعة عطور VELORA.",
  };
}

export default async function CollectionRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!valid.includes(category as Category)) notFound();
  return (
    <Suspense>
      <CollectionView category={category as Category} />
    </Suspense>
  );
}
