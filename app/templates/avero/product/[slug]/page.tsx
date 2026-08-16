import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { bySlug, products } from "../../data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.nameEn}) — AVERO`,
    description: product.description,
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
