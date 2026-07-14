import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from './BlogCard.module.scss'
import TextLink from "../CTA/TextLink";

export default function BlogCard({
  title,
  description,
  image,
  ctaLabel,
  ctaLink,
  oneByOneAspectRatio,
  authorFirstName,
  authorLastName,
  profilePic,
  publishDate,
}) {
  let publishedDate = new Date(publishDate);
  // Create an array of abbreviated month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Format the date in "9 Jul, 2024" format
  const formattedDate = `${publishedDate.getDate()} ${
    months[publishedDate.getMonth()]
  }, ${publishedDate.getFullYear()}`;

  return (
    <Paper className={`${styles.section} `} variant="outlined" >
      <Link href={ctaLink}>
        <Box className={`${styles.imageWrapper}`}>
          {image && (
            <Image
              src={image.url}
              alt={title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              quality={80}
              className={`${styles.img}`}
            />
          )}
        </Box>
      </Link>
      <div className={`${styles.metaInfoWrapper}`}>
        <div className={`${styles.profilePicWrapper}`}>
          <Image
            src="https://data.webduel.co.nz/wp-content/uploads/2024/05/IMG_3022-scaled-e1715077130872-300x300-1-e1715560169333.jpg"
            alt="Gurpreet Singh Dhoat's Photo"
            fill
            className={`${styles.img}`}
          />
        </div>
        <div className={`${styles.textWrapper}`}>
          <Typography
            variant="body2"
            component="span"
            className="meta-author-name"
          >
            {authorFirstName} {authorLastName}
          </Typography>
          <Typography variant="body1" component="span" className={`${styles.divider}`}>
            |
          </Typography>
          <Typography variant="body2" component="span" className={`${styles.metaInfo}`}>
            {formattedDate}
          </Typography>
        </div>
      </div>
      <Box className={`${styles.contentWrapper}`}>
        <Typography
          variant="h5"
          component="h2"
          className={`${styles.title}`}
          color="var(--white)"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            component="div"
            className={`${styles.description}`}
            dangerouslySetInnerHTML={{ __html: description }}
            color="var(--gray-light)"
          />
        )}
        {ctaLink && (
          <Box className={`${styles.buttonWrapper} mt-16`}>
            <TextLink
              url={ctaLink}
              className="cta"
              label={ctaLabel}
              color="var(--dark-secondary)"
            ></TextLink>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
