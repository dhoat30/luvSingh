import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "../Card/BlogCard";
import styles from './CardsTemplate.module.scss'
export default function CardsTemplate({
  cardsDataArr,
  heroData,
  oneByOneAspectRatio,
}) {
  if (!cardsDataArr || !heroData) return null;
  const cards = cardsDataArr.map((item, index) => {
    return (
      <BlogCard
        oneByOneAspectRatio={oneByOneAspectRatio}
        key={index}
        title={item.title}
        image={item.image}
        ctaLink={item.ctaLink}
        ctaLabel={item.ctaLabel ? item.ctaLabel : "LEARN MORE"}
        description={item?.description}
        authorFirstName={item.authorFirstName}
        authorLastName={item.authorLastName}
        profilePic={item.profilePic}
        publishDate={item.publishDate}
      />
    );
  });
  return (
    <>
      <section className={`${styles.section}`}>
        <Container maxWidth="xl">
          <div className={styles.titleWrapper}>
            <Typography variant="h1">{heroData.title}</Typography>
            <Typography
              variant="h6"
              component="div"
              className="subtitle mt-16"
              dangerouslySetInnerHTML={{ __html: heroData.description }}
            ></Typography>
          </div>
        </Container>
      </section>
      <section className={styles.cardsSection}>
        <Container maxWidth="xl" className={styles.cardsWrapper}>
          {cards}
        </Container>
      </section>
    </>
  );
}

