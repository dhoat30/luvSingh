import BookConsultation from "@/Components/Pages/BookConsultation/BookConsultation";
import Footer from "@/Components/UI/Footer/Footer";
import Header from "@/Components/UI/Header/Header";
import { getOptions, getSinglePostData } from "@/utils/fetchData";




export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    // const id = params.id

    // fetch data
     const data = await getSinglePostData( 'consultation', '/wp-json/wp/v2/pages')
 

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    const seoData = data[0].yoast_head_json
    return {
        title: seoData.title,
        description: seoData.description,
        metadataBase: new URL('https://webduel.co.nz'),
        alternates: {
            canonical: `https://webduel.co.nz/book-consultation`,
        },
        openGraph: {
            title: seoData.title,
            description: seoData.description,
            url: 'https://webduel.co.nz/book-consultation',
            siteName: 'webduel',

            images: [
                {
                    url: seoData?.og_image && seoData.og_image[0].url,
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
export default async function Home() {
    // fetch data
    const options = await getOptions()
    return (
        <>
      
        <Header/> 
     
     
            <main>
                <BookConsultation techLogos={options.tech_logos} />
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
