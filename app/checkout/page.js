import Checkout from '@/Components/UI/Checkout/Checkout';
import Footer from '@/Components/UI/Footer/Footer';
import Header from '@/Components/UI/Header/Header';
import { getAllPosts, getOptions } from '@/utils/fetchData'



export const metadata = {
    metadataBase: new URL('https://webduel.co.nz'),
    title: 'Checkout | webduel',
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function Page() {
    const allServicePackages = await getAllPosts('/wp-json/wp/v2/service-package')
  const options = await getOptions();


    return (
        <>
        <Header/> 
            <main >
                <Checkout servicePackages={allServicePackages} />
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
