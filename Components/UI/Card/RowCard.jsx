import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import TextLink from "../CTA/TextLink";
import styles from './RowCard.module.scss'
export default function RowCard({
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
      <div className={styles.bulb}></div>
      <div className={styles.wrapper}>
        <Box className={styles.contentWrapper}>
          <Typography
            component={"h2"}
            variant="h4"
            color="white"
            className=" title"
           
          >
            {title}
          </Typography>
          <Typography
            component={"div"}
            variant="h6"
            className={`${styles.description} mb-24 dark-body1`}
  
            dangerouslySetInnerHTML={{ __html: description }}
          
          />

          <TextLink label={ctaLabel} url={ctaLink} className="cta" />
        </Box>
        <div
       
          className="image-wrapper"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
        objectFit="cover"
        style={{borderRadius: "12px"}}
            sizes="(max-width: 1080px) 100vw, 50vw "
          />
        </div>
      </div>
    </div>
  );
}

