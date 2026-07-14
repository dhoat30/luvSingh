import WebsiteEnquiryPage from "@/Components/Pages/WebsiteEnquiryPage/WebsiteEnquiryPage"
import Footer from "@/Components/UI/Footer/Footer"
import Header from "@/Components/UI/Header/Header"
import { getSinglePostData, getOptions } from '@/utils/fetchData'

export async function generateMetadata({ params, searchParams }, parent) {
    // fetch data
            const data = await getSinglePostData("website-enquiry", '/wp-json/wp/v2/pages')

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/website-enquiry`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://webduel.co.nz',
                siteName: 'webduel',
                images: [
                    {
                        url: seoData.og_image && seoData.og_image.url,
                        width: 800,
                        height: 600,
                    },
                    {
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
        const options = await getOptions()

    return (
        <>
        <Header/> 
            <main>
                <WebsiteEnquiryPage  />
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
