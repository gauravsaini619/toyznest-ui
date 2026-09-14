import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data/products";
import { DRAFT_PRODUCTS } from "@/lib/data/draft-products";
import { PRODUCT_DETAILS } from "@/lib/data/product-details";
import { DRAFT_PRODUCT_DETAILS } from "@/lib/data/draft-product-details";

const ALL_PRODUCTS = [...PRODUCTS, ...DRAFT_PRODUCTS];
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBlock } from "@/components/product/product-buy-block";
import { StickyBuyBar } from "@/components/product/sticky-buy-bar";
import { ProductPillarBand } from "@/components/product/product-pillar-band";
import { ProductFeatureRows } from "@/components/product/product-feature-rows";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductFaq } from "@/components/product/product-faq";
import { ProductSpecifications } from "@/components/product/product-specifications";
import { RelatedProducts } from "@/components/product/related-products";
import { SignupCapture } from "@/components/shared/signup-capture";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const detail = PRODUCT_DETAILS[slug] ?? DRAFT_PRODUCT_DETAILS[slug];

  return (
    <>
      <div className="content-shell grid grid-cols-1 gap-10 pt-8 pb-16 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          name={product.name}
          placeholderLabel={product.placeholderLabel}
          photoCount={product.photoCount}
        />
        <ProductBuyBlock product={product} detail={detail} />
      </div>

      {detail && (
        <>
          <ProductPillarBand pillars={detail.pillars} />
          <ProductFeatureRows rows={detail.featureRows} />
          <ProductReviews
            product={product}
            distribution={detail.reviewDistribution}
            reviews={detail.reviews}
          />
          <ProductFaq faqs={detail.faqs} />
          <ProductSpecifications
            product={product}
            specifications={detail.specifications}
            legalInfo={detail.legalInfo}
          />
          <RelatedProducts items={detail.related} />
          <SignupCapture />
        </>
      )}

      <div className="h-20 lg:h-24" aria-hidden />
      <StickyBuyBar product={product} />
    </>
  );
}
