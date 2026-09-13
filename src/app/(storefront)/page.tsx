import { Hero } from "@/components/home/hero";
import { CategoryMosaic } from "@/components/home/category-mosaic";
import { PlayKitChooser } from "@/components/home/play-kit-chooser";
import { ProductGrid } from "@/components/home/product-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { FounderStory } from "@/components/home/founder-story";
import { TrustRow } from "@/components/home/trust-row";
import { Testimonials } from "@/components/home/testimonials";
import { CelebrityStrip } from "@/components/home/celebrity-strip";
import { MarketplaceStrip } from "@/components/home/marketplace-strip";
import { WarehouseVideo } from "@/components/home/warehouse-video";
import { WelcomePopup } from "@/components/home/welcome-popup";
import { OfferPill } from "@/components/home/offer-pill";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBestsellers, getNewLaunches } from "@/lib/data/products";

export default function Home() {
  const bestsellers = getBestsellers();
  const newLaunches = getNewLaunches();

  return (
    <>
      <Hero />

      <section className="section-padding bg-white">
        <div className="content-shell">
          <SectionHeading
            title="bestsellers this week"
            viewAllHref="/collection?sort=bestsellers"
            className="mb-10"
          />
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <CategoryMosaic />
      <PlayKitChooser />

      <section className="section-padding bg-white">
        <div className="content-shell">
          <SectionHeading
            title="new launches"
            viewAllHref="/collection?sort=new"
            className="mb-10"
          />
          <ProductGrid products={newLaunches} />
        </div>
      </section>

      <HowItWorks />
      <FounderStory />
      <TrustRow />
      <Testimonials />
      <CelebrityStrip />
      <MarketplaceStrip />
      <WarehouseVideo />

      <WelcomePopup />
      <OfferPill />
    </>
  );
}
