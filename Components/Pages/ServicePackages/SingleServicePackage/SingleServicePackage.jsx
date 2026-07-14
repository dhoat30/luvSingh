import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ServiceCTA from "@/Components/UI/CTA/ServiceCTA";
import ServiceSection from "./ServiceSection";
import styles from './SingleServicePackage.module.scss'

export default function SingleServicePackage({ data }) {
  const heroImage = data?.acf?.hero_section?.image;
  const title = data?.acf?.hero_section?.title;
  const description = data?.acf?.hero_section?.description;
  const ctaData = {
    ctaLabel: "Buy now",
    ctaLink: "/checkout",
    slug: data?.slug,
    price: data?.acf?.cta_section?.service_price,
    frequency: data?.acf?.cta_section?.frequency,
    itemsArr: data?.acf?.cta_section?.service_items,
  };

  return (
    <>
      <section className={`${styles.singleServicePackage}`} >
        <Container maxWidth="xl">
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.mainContentWrapper}`}>
              <div
                className={`${styles.heroImageWrapper}`}
                style={{
                  paddingBottom: `${
                    (heroImage.height / heroImage.width) * 100
                  }%`,
                }}
              >
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 70vw"
                />
              </div>
              <div className={`${styles.introWrapper}`}>
                <Typography className="title" variant="h3" component="h1">
                  {title}
                </Typography>
                <Typography
                  className={`${styles.description}`}
                  variant="body1"
                  component="p"
                >
                  {description}
                </Typography>
                <ServiceCTA data={ctaData} className={`${styles.ctaMobileWrapper}`} />
              </div>
              <ServiceSection data={data.acf.layout} />
            </div>
            <ServiceCTA data={ctaData} className={`${styles.ctaWrapper}`} />
          </div>
        </Container>
      </section>
    </>
  );
}
