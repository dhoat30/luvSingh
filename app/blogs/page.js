import { getSinglePostData, getAllPosts, getOptions } from '@/utils/fetchData';
import BlogsArchive from '@/Components/Pages/BlogsPage/BlogsArchive';
import Footer from '@/Components/UI/Footer/Footer';
import Header from '@/Components/UI/Header/Header';
export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    // const id = params.id

    // fetch data
    const data = await getSinglePostData( 'blogs', '/wp-json/wp/v2/pages')

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json;
        return {
            title: seoData?.title,
            description: seoData?.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: 'https://webduel.co.nz/blogs',
            },
            openGraph: {
                title: seoData?.title,
                description: seoData?.description,
                url: "https://webduel.co.nz",
                siteName: "webduel.co.nz",
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    },
                    {
                        url: seoData?.og_image[0] && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },
                ],
                type: "website",
            },
        };
    }
}
export default async function Home() {
    const data = await getSinglePostData( 'blogs', '/wp-json/wp/v2/pages')
    const blogsData = await getAllPosts('/wp-json/wp/v2/posts')
      const options = await getOptions();
    
    return (
        <>
                    <Header />
        
        <main>

            {/* <ServicesPage data={data[0]} /> */}
            <BlogsArchive data={data[0]} blogsData={blogsData} />
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
