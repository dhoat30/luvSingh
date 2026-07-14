

import CardsTemplate from "@/Components/UI/HtmlPageTemplate/CardsTemplate";
export default function BlogsArchive({ data, blogsData }) {
  if (!data || !blogsData) {
    return null;
  }
  const heroData = {
    title: data.title.rendered,
    description: data.content.rendered,
  };
  const blogsDataArr = blogsData.map((blog) => {
    return {
      title: blog.title.rendered,
      description: blog.excerpt.rendered,
      image: blog.acf.blog_featured_image,
      ctaLink: `/blogs/${blog.slug}`,
      ctaLabel: "READ MORE",
      slug: blog.slug,
      publishDate: blog.date_gmt,
      profilePic: blog.acf.user.user_avatar,
      authorFirstName: blog.acf.user.user_firstname,
      authorLastName: blog.acf.user.user_lastname,
    };
  });
  return <CardsTemplate cardsDataArr={blogsDataArr} heroData={heroData} />;
}
