export const revalidate = 2592000;

import { getSinglePostData, getAllPosts, getOptions } from '@/utils/fetchData'
import SingleBlog from '@/Components/Pages/BlogsPage/SingleBlog'
import styles from './Blogs.module.css'
import BlogMetaInfo from '@/Components/UI/Meta/BlogMetaInfo'
import BlogHero from '@/Components/UI/Hero/BlogHero'
import BottomSocialShare from '@/Components/UI/SocialShare/BottomSocialShare'
import BlogTableOfContent from '@/Components/UI/TableOfContent/BlogTableOfContent'
import Header from '@/Components/UI/Header/Header'
import Footer from '@/Components/UI/Footer/Footer'

export async function generateStaticParams() {
    const posts = await getAllPosts('/wp-json/wp/v2/posts');
    if (!posts?.length) return [];
    return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData(slug, "/wp-json/wp/v2/posts")

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://webduel.co.nz'),
            alternates: {
                canonical: `https://webduel.co.nz/blogs/${slug}`,
            },
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: `https://webduel.co.nz/blogs/${slug}`,
                siteName: "webduel.co.nz",
                images: [
                    {
                        url: seoData.og_image && seoData.og_image[0].url,
                        width: 800,
                        height: 600,
                    },
                    {
                        url: seoData?.og_image && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },
                ],
                type: 'article',
            },
        }
    }

}
function countWords(text) {
    // Remove any extra spaces and split the text into words
    const words = text.trim().split(/\s+/);
    return words.length;
}

export default async function singleProject({ params }) {

    const slug = params.slug
    const data = await getSinglePostData(slug, "/wp-json/wp/v2/posts")
    if (!data.length) return null
  const options = await getOptions();

    //meta info 
    const metaData = {
        publishedDate: data[0].date_gmt,
        authorFirstName: data[0].acf.user.user_firstname,
        authorLastName: data[0].acf.user.user_lastname
    };

    let publishedDate = new Date(metaData.publishedDate);
    // Create an array of abbreviated month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Format the date in "9 Jul, 2024" format
    publishedDate = `${publishedDate.getDate()} ${months[publishedDate.getMonth()]}, ${publishedDate.getFullYear()}`;

    // share buttons 
    const postUrl = `${process.env.siteUrl}/blogs/${data[0].slug}`;
    const postTitle = data[0].title.rendered;
    const postDescription = data[0].excerpt.rendered;
    //schema data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data[0].yoast_head_json.title,
        "name": data[0].yoast_head_json.title,
        "datePublished": data[0].yoast_head_json.article_published_time,
        "dateModified": data[0].yoast_head_json.article_modified_time,
        "description": data[0].yoast_head_json.description,
        "url": `${process.env.siteUrl}/blogs/${slug}`,
        "wordCount": countWords(data[0].content.rendered),
        "image": [
            data[0].yoast_head_json?.og_image ? data[0].yoast_head_json.og_image[0].url : null,
        ],
        "author": {
            "@type": "Person",
            "name": data[0].yoast_head_json.author,
            "image": {
                "@type": "ImageObject",
                "@id": `https://webduel.co.nz${process.env.gurpreet}`,
                "url": `https://webduel.co.nz${process.env.gurpreet}`,
                "height": "96",
                "width": "96"
            }
        },
        "publisher": {
            "@type": "Organization",
            "@id": process.env.siteUrl,
            "name": process.env.name,
            "logo": {
                "@type": "ImageObject",
                "@id": `https://webduel.co.nz${process.env.darkLogo}`,
                "url": `https://webduel.co.nz${process.env.darkLogo}`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.siteUrl}/blogs/${slug}`
        },

    }

    return (
        <> 
        <Header/> 
 <main className={styles.blogMain} style={{ background: "var( --light-surface-container-low)" }}>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className={`container max-width-xl ${styles.wrapper}`}>
                <BlogTableOfContent data={data[0].toc ? data[0].toc : null} />
                <div className='main-content-wrapper'>
                    <div className="title-wrapper">
                        <h1
                            className="title h1 bold"
                        >
                            {data[0].title.rendered}
                        </h1>
                    </div>


                    <BlogMetaInfo
                        className='meta mt-16'
                        authorFirstName={metaData.authorFirstName}
                        authorLastName={metaData.authorLastName}
                        publishDate={publishedDate}
                    />
                    {/* hero image */}
     <BlogHero
            className="hero-section mt-16"
            videoID={data[0].acf.youtube_video_id ? data[0].acf.youtube_video_id : null}
            featuredImage={data[0].acf.blog_featured_image}
        />                    <SingleBlog content={data[0].content.rendered} />
                    <BottomSocialShare
                        url={postUrl}
                        title={postTitle}
                        description={postDescription}
                    />
                </div>

            </section>


        </main>
    <Footer
        showFooterCta={false}
        className="mt-32"
        footerCtaData={options.footer_cta}
        contactInfo={options.contact_info}
        socialData={options.social_links}
                certifications={options.certifications}

      />        </>
       
    )
}


