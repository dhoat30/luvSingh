const { siteUrl } = require('./next-sitemap.config');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === "production" ? "https://webduel.co.nz" : "http://localhost:3000");
    const siteName = "Webduel Limited"

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {
    transpilePackages: ['mui-tel-input'],

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
       
     
        remotePatterns: [{
            protocol: 'https',
            hostname: 'data.webduel.co.nz',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://data.webduel.co.nz",
        siteUrl: baseUrl,
        siteName: siteName,
        name: "Webduel - Web Design Tauranga",
        darkLogo: "/dark-logo.png",
        gurpreet: "/gurpreet.jpg"
    },
     async redirects() {
        return [
            {
                source: '/privacy',
                destination: '/privacy-policy',
                permanent: true,
            },
            {
                source: '/our-work/epic-cleaning',
                destination: '/our-work/epic-cleaning-tauranga',
                permanent: true,
            },
            {
                source: '/project',
                destination: '/our-work',
                permanent: true,
            },
            {
                source: '/projects',
                destination: '/our-work',
                permanent: true,
            },
            {
                source: '/projects/:slug*',
                destination: '/our-work',
                permanent: true,
            },

            {
                source: '/terms-conditions',
                destination: '/terms-and-conditions',
                permanent: true,
            },
            {
                source: '/contact-us',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/all-projects/graphic-design',
                destination: '/',
                permanent: true,
            },
            {
                source: '/projects/gonogo',
                destination: '/our-work/gonogo',
                permanent: true,
            },
            {
                source: '/projects/aveeno',
                destination: '/',
                permanent: true,
            },
            {
                source: '/projects/femi',
                destination: '/',
                permanent: true,
            },
            {
                source: '/projects/mbc',
                destination: '/',
                permanent: true,
            },
            {
                source: '/all-projects/web-design',
                destination: '/our-work',
                permanent: true,
            },
            {
                source: '/projects/own-masala',
                destination: '/our-work/own-masala',
                permanent: true,
            },
            {
                source: '/projects/mumbai-masala',
                destination: '/our-work/mumbai-masala',
                permanent: true,
            },
            {
                source: '/projects/nexgen-builders',
                destination: '/our-work/nexgen-builders',
                permanent: true,
            },
            {
                source: '/projects/liquor-center',
                destination: '/our-work/liquor-center',
                permanent: true,
            },
            {
                source: '/projects/g-robotics',
                destination: '/our-work/g-robotics',
                permanent: true,
            },
            {
                source: '/blogs/3-ways-to-show-your-business-on-google-search-results',
                destination: '/blogs/3-ways-to-show-your-business-in-google-search-results',
                permanent: true,
            },

        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
