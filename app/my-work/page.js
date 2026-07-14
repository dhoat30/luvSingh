import OurWorkPage from '@/Components/Pages/OurWorkPage/OurWorkPage'
import Footer from '@/Components/UI/Footer/Footer'
import Header from '@/Components/UI/Header/Header'
import Layout from '@/Components/UI/Layout/Layout';
import { getSinglePostData, getOptions, getAllPosts } from '@/utils/fetchData'



export async function generateMetadata({ params, searchParams }, parent) {


    // fetch data
  const data = await getSinglePostData("my-work", "wp-json/wp/v2/luv-singh");
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/our-work`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://webduel.co.nz/our-work`,
                siteName: 'webduel',
                images: [
                    {
                        url: seoData.og_image && seoData.og_image[0].url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }

}

export default async function Page() {


  const data = await getSinglePostData("my-work", "wp-json/wp/v2/luv-singh");
    // const projectsData = await getAllPosts('/wp-json/wp/v2/work')
 if (!data) return { notFound: true };
  const sections = data[0]?.acf?.layout;
    const options = await getOptions()
    return (
        <>
        <Header/> 
            <main >
               <Layout
                       // googleReviewsData={googleReviews}
                       uspTable={options.usp_table}
                       sections={sections}
                       uspData={options.usp}
                       statsData={options.status}
                       locationsCovered={options.locations_covered}
                       hoursCalculatorData={options.hours_calculator}
                       servicesData={options.services}
                     />
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
