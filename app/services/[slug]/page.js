export const revalidate = 2592000;

import Header from "@/Components/UI/Header/Header";
import {
  getSinglePostData,
  getAllPosts,
  getGoogleReviews,
  getOptions,
} from "@/utils/fetchData";
import Footer from "@/Components/UI/Footer/Footer";
import Layout from "@/Components/UI/Layout/Layout";

export async function generateStaticParams() {
  const services = await getAllPosts('/wp-json/wp/v2/services');
  if (!services?.length) return [];
  return services.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }, parent) {
  const param = await params;
  const slug = param.slug;
  const data = await getSinglePostData(slug, "wp-json/wp/v2/services");

  const previousImages = (await parent).openGraph?.images || [];

  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData?.title,
      description: seoData?.description,
      metadataBase: new URL(process.env.siteUrl),
      alternates: {
        canonical: `${process.env.siteUrl}/services/${slug}`,
      },
      openGraph: {
        title: seoData?.title,
        description: seoData?.description,
        url: `${process.env.siteUrl}/services/${slug}`,
        siteName: process.env.siteName,
        images: [
          {
            url: seoData?.og_image?.[0]?.url,
            width: 800,
            height: 600,
          },
          {
            url: seoData?.og_image?.[0]?.url,
            width: 1800,
            height: 1600,
          },
        ],
        type: "website",
      },
    };
  }
}

export default async function Home({ params }) {
  const param = await params;
  const slug = param.slug;
  const data = await getSinglePostData(slug, "wp-json/wp/v2/services");

  const options = await getOptions();
  // const googleReviews = await getGoogleReviews();
  if (!data) return { notFound: true };
  const sections = data[0]?.acf?.layout;
  const reviewerPics = options?.review_section_?.reviewer_pics;
  const adsPackagesData= options.ads_package;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data[0]?.title?.rendered,
    "description": data[0]?.yoast_head_json?.description,
    "url": `https://webduel.co.nz/services/${slug}`,
    "areaServed": "New Zealand",
    "provider": {
      "@type": "Organization",
      "name": "Webduel Limited",
      "url": "https://webduel.co.nz",
      "logo": "https://webduel.co.nz/dark-logo.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Layout
          sections={sections}
          uspTable={options.usp_table}

          // googleReviewsData={googleReviews}
          uspData={options.usp}
          statsData={options.status}
          locationsCovered={options.locations_covered}
          hoursCalculatorData={options.hours_calculator}
          spaceCalculatorData={options.cubic_meter_calculator}
          servicesData={options.services}
          reviewerPics={reviewerPics}
          adsPackagesData={adsPackagesData}
        />
        {/* <Layout sections={postData[0]?.acf?.sections} /> */}
        {/* <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} /> */}

        {/* <GoogleReviewsCarousel data={googleReviews} /> */}
      </main>
      <Footer
        showFooterCta={false}
        className="mt-32"
        footerCtaData={options.footer_cta}
        contactInfo={options.contact_info}
        socialData={options.social_links}
                certifications={options.certifications}

      />
    </>
  );
}
