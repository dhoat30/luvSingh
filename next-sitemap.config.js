/** @type {import('next-sitemap').IConfig} */

const isProd = process.env.NODE_ENV === 'production';

const getData = async (endpoint, urlPrefix) => {
    try {
        const fetchData = await fetch(endpoint);
        const data = await fetchData.json();
        return data.map(post => `/${urlPrefix}/${post.slug}`);
    } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}:`, error);
        return [];
    }
};

// const getBlogsData = () => getData('https://cms.liftandshiftmovers.com.au/wp-json/wp/v2/posts?acf_format=standard&per_page=100', "blogs");
const getProjects = () => getData('https://data.webduel.co.nz/wp-json/wp/v2/work?acf_format=standard&per_page=100', "our-work");
const getBlogs = () => getData('https://data.webduel.co.nz/wp-json/wp/v2/posts?acf_format=standard&per_page=100', "blogs");
const getServices = () => getData('https://data.webduel.co.nz/wp-json/wp/v2/services?acf_format=standard&per_page=100', "services");
const getServicePackages = () => getData('https://data.webduel.co.nz/wp-json/wp/v2/service-package?acf_format=standard&per_page=100', "service-packages");


module.exports = {
    siteUrl: isProd ? 'https://webduel.co.nz' : 'http://localhost:3000',
    generateRobotsTxt: true,
    sitemapSize: 1000,
    exclude: ['/thank-you', '/order-received', '/checkout', '/form-submitted/thank-you', '/api/*'],
    additionalPaths: async (config) => {
        // const blogUrls = await getBlogsData();
        const projects = await getProjects();
        const blogs = await getBlogs();
        const services = await getServices();
        const servicePackages = await getServicePackages();

        // Return all generated URLs for sitemap
        return [
            // ...await Promise.all(blogUrls.map(url => config.transform(config, url))),
            ...await Promise.all(projects.map(url => config.transform(config, url))),
            ...await Promise.all(blogs.map(url => config.transform(config, url))),
                        ...await Promise.all(services.map(url => config.transform(config, url))),
            ...await Promise.all(servicePackages.map(url => config.transform(config, url))),

        ];
    },
};
