import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TextLink from "../CTA/TextLink";
import styles from './Card.module.scss'
export default function Card({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
}) {
  return (
    <div
      className={`${className} ${styles.section} row`}
   
    >
      <div className={styles.bulb} ></div>
      <div className={styles.wrapper}>
        <Box className={styles.contentWrapper}>
          <Typography
            component={"h2"}
            variant="h4"
            color="white"
            className="title"
           
          >
            {title}
          </Typography>
          <Typography
            component={"div"}
          
            variant="h6"
            className={`${styles.description} dark-body1`}
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <TextLink label={ctaLabel} url={ctaLink} className="cta" />
        </Box>
        <div
        
          className={styles.imageWrapper}
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            objectFit="cover"
            sizes="(max-width: 1020px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

