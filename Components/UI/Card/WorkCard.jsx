import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TextLink from "../CTA/TextLink";
import Link from "next/link";
import styles from './WorkCard.module.scss'

export default function WorkCard({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
}) {

 
  return (
    <section
      className={`${className} ${styles.section} row`}
 
    >
      <div className={`${styles.bulb}`} ></div>
      <div className={`${styles.wrapper}`}>
      <Link href={ctaLink}>
        <div
          className={`${styles.imageWrapper} image-wrapper`}
          style={{ paddingBottom: `56%` }}
        >
          <Image src={image.url} alt={title} fill />
        </div>
        </Link>
        <Box className={`${styles.contentWrapper}`}>
        <Link href={ctaLink}>

          <Typography
            component={"h4"}
            variant="h5"
            color="white"
            className={`${styles.title}`}
       
          >
            {title}
          </Typography>
          <Typography
            component={"h5"}
         
            variant="h6"
            className={`${styles.description}`}
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
          />
 </Link>
          <TextLink
            label={ctaLabel}
            url={ctaLink}
            className={`${styles.cta}`}
            size="sm"
            color="var(--dark-secondary, #F8F770)"
          />
        </Box>
      </div>
     
    </section>
  );
}

