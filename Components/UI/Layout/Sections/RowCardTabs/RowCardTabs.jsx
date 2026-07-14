import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
// import TextLink from "@/Components/UI/CTA/TextLink";
import ScrollableTabs from "./ScrollableTabs";
import styles from './RowCardTabs.module.scss'
export default function RowCardTabs({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
  tabsData,
  rows,
}) {
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="xl">
        <div className={`${styles.wrapper} `}>
          <div className={`${styles.contentWrapper} `}>
            <Typography
              component={"h2"}
              variant="h3"
           
              className="section-title"
            >
              {title}
            </Typography>
            <div
              className="section-description mt-16 body1 dark-body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {ctaLink && (
              <TextLink label={ctaLabel} url={ctaLink} className="cta" />
            )}
              
              <ScrollableTabs tabsData={tabsData} />
           

          </div>
          <div
            className="image-wrapper"
            style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
          >
            <Image
              src={image.url}
              alt={title}
              fill
              sizes="(max-width: 1080px) 100vw, 50vw "
            />
          </div>

        </div>

      </Container>
    </section>
  );
}

