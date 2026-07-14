import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./TestimonialSection.module.scss";
import Image from "next/image";
import ClientLogosCarousel from "@/Components/ClientLogoCarousel/ClientLogoCarousel";

export default function TestimonialSection({
  subtitle,
  title,
  description,
  ctaArray,
  statsArray,
  testimonialsArray,
  clientLogosArray,
}) {
  return (
    <section className={`${styles.section}`}>
      <Container maxwidth="xl" className={styles.container}>
        <Container maxWidth="md" className={`${styles.titleContainer}`}>
          <Typography
            className="center-align mb-8 medium uppercase"
            variant="h5"
            component="div"
          >
            {subtitle}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 dark-version-font colored-text center-align uppercase ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-5 center-align  mt-24 dark-version-font`}
          />
        </Container>

        <Container maxWidth="lg" className={`${styles.descriptionContainer}`}>
          {statsArray && statsArray.length > 0 && (
            <Container
              maxWidth="lg"
              className={`${styles.itemsContainer} grid  mt-56 mb-56`}
            >
              {statsArray.map((singleItem, index) => {
                return (
                  <div
                    className={`${styles.item} flex align-center`}
                    key={index}
                  >
                    {singleItem.image && (
                      <Image
                        src={singleItem.image.url}
                        alt={
                          singleItem.image.alt
                            ? singleItem.image.alt
                            : singleItem.title
                        }
                        width="80"
                        height="80"
                      />
                    )}
                    <Typography
                      className={`center-align mt-24 bold ${styles.value}`}
                      variant="h3"
                      component="div"
                      color={"var(--dark-secondary)"}
                    >
                      {singleItem.value}
                    </Typography>
                    <Typography
                      className={`center-align mt-24 semi-bold ${styles.title}`}
                      variant="h6"
                      component="h3"
                    >
                      {singleItem.title}
                    </Typography>
                    <Typography
                      className={`center-align mt-8 ${styles.description}`}
                      variant="body1"
                      component="div"
                    >
                      {singleItem.description}
                    </Typography>
                  </div>
                );
              })}
            </Container>
          )}
        </Container>

        {clientLogosArray && clientLogosArray.length > 0 && (
          <ClientLogosCarousel logos={clientLogosArray} />
        )}
        {/* cta  */}
        <div className={`${styles.btnWrapper} flex justify-center mt-40`}>
          {ctaArray &&
            ctaArray.map((cta, index) => {
              return (
                <Link href={cta.link.url} key={index}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    {cta.link.title}
                  </Button>
                </Link>
              );
            })}
        </div>
        {/* testimonials */}
          {testimonialsArray && testimonialsArray.length > 0 && (
            <Container
              maxWidth="md"
              className={`${styles.testimonialsContainer}   mt-56 mb-48`}
            >
              {testimonialsArray.map((singleItem, index) => {
                return (
                  <div
                    className={`${styles.item} border-radius-16`}
                    key={index}
                  >
               
                    <Typography
                      className={` ${styles.testimonial}`}
                      variant="body1"
                      component="div"
                    > 
                      "{singleItem.testimonial}"
                    </Typography>
                         <Typography
                      className={` mt-8 medium ${styles.label}`}
                      variant="subtitle1"
                      component="h3"
                    >
                      {singleItem.label}
                    </Typography>
                  </div>
                );
              })}
            </Container>
          )}
      </Container>
    </section>
  );
}
