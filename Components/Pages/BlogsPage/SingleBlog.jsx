// import "./blogs.scss";

export default function SingleBlog({ content }) {
  // Ensure data is an array and has at least one item

  return (
    <>
      <section className="single-blog">
        <div
          className="content-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </section>
    </>
  );
}

