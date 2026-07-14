export const revalidate = 2592000;

import { getOptions, getSinglePostData, getAllPosts } from '@/utils/fetchData'
import SingleServicePackage from '@/Components/Pages/ServicePackages/SingleServicePackage/SingleServicePackage'
import Header from '@/Components/UI/Header/Header'
import Footer from '@/Components/UI/Footer/Footer'

export async function generateStaticParams() {
    const packages = await getAllPosts('/wp-json/wp/v2/service-package');
    if (!packages?.length) return [];
    return packages.map(pkg => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData(slug, "/wp-json/wp/v2/service-package")

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/service-packages/${slug}`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://webduel.co.nz/service-packages/${slug}`,
                siteName: 'webduel',
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData?.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }

}

export default async function Contact({ params }) {
    const slug = params.slug
    const singleServicePackage = await getSinglePostData(slug, "/wp-json/wp/v2/service-package")

    const options = await getOptions()
    if (!singleServicePackage) {
        return { notFound: true }
    }

    const pkg = singleServicePackage[0];
    const price = pkg?.acf?.cta_section?.service_price;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": pkg?.acf?.hero_section?.title || pkg?.title?.rendered,
        "description": pkg?.acf?.hero_section?.description || pkg?.yoast_head_json?.description,
        "image": pkg?.acf?.hero_section?.image?.url,
        "brand": {
            "@type": "Brand",
            "name": "Webduel",
        },
        ...(price && {
            "offers": {
                "@type": "Offer",
                "price": price,
                "priceCurrency": "NZD",
                "availability": "https://schema.org/InStock",
                "url": `https://webduel.co.nz/service-packages/${slug}`,
            },
        }),
    };

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header/>
            <main >
                <SingleServicePackage techLogos={options.tech_logos} data={pkg} />
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

    )
}
