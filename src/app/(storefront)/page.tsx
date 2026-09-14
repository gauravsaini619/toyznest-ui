import { Hero } from "@/components/home/hero";
import { ShopByAge } from "@/components/home/shop-by-age";
import { ShopTheirWorld } from "@/components/home/shop-their-world";
import { ProductGrid } from "@/components/home/product-grid";
import { ShopByDevelopment } from "@/components/home/shop-by-development";
import { CuratedCollections } from "@/components/home/curated-collections";
import { QuizTeaser } from "@/components/home/quiz-teaser";
import { FounderStory } from "@/components/home/founder-story";
import { TrustRow } from "@/components/home/trust-row";
import { SafetyPromise } from "@/components/home/safety-promise";
import { Testimonials } from "@/components/home/testimonials";
import { WelcomePopup } from "@/components/home/welcome-popup";
import { OfferPill } from "@/components/home/offer-pill";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBestsellers, getNewLaunches } from "@/lib/data/products";
import { getTrending } from "@/lib/data/draft-products";

export default function Home() {
  const bestsellers = getBestsellers();
  const newLaunches = getNewLaunches();
  const trending = getTrending();

  return (
    <>
      <Hero />

      <ShopByAge />

      <ShopTheirWorld />

      <section className="section-padding bg-white">
        <div className="content-shell">
          <SectionHeading
            title="loved right now"
            subtitle="Toys parents are picking on repeat."
            viewAllHref="/collection?sort=bestsellers"
            viewAllLabel="View all bestsellers"
            className="mb-10"
          />
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <section className="section-padding bg-navy-deep">
        <div className="content-shell">
          <SectionHeading
            title="trending at toyznest 🔥"
            subtitle="The toys everyone's talking about."
            onNavy
            className="mb-10"
          />
          <ProductGrid products={trending} />
        </div>
      </section>

      <ShopByDevelopment />

      <CuratedCollections />

      <QuizTeaser />

      <section className="section-padding bg-white">
        <div className="content-shell">
          <SectionHeading
            title="fresh in the nest 🐣"
            subtitle="New toys worth discovering."
            viewAllHref="/collection?sort=new"
            viewAllLabel="See what's new"
            className="mb-10"
          />
          <ProductGrid products={newLaunches} />
        </div>
      </section>

      <TrustRow />
      <SafetyPromise />
      <FounderStory />
      <Testimonials />

      <WelcomePopup />
      <OfferPill />
    </>
  );
}
