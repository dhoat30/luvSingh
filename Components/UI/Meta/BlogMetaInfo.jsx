import Image from "next/image";
import Typography from "@mui/material/Typography";
import styles from './BlogMetaInfo.module.scss'
export default function BlogMetaInfo({
  authorFirstName,
  authorLastName,
  publishDate,
  className,
}) {
  return (
    <div className={`${className} ${styles.section}`}>
      <div className={`${styles.profilePicWrapper}`}>
        <Image
          src="https://data.webduel.co.nz/wp-content/uploads/2024/05/IMG_3022-scaled-e1715077130872-300x300-1-e1715560169333.jpg"
          alt="Gurpreet Singh Dhoat's Photo"
          fill
        />
      </div>
      <div className={`${styles.textWrapper}`}>
        <Typography
          variant="subtitle1"
          component="span"
          className={`${styles.metaAuthorName}`}
          color="var(--light-on-surface-variant)"
        >
          {authorFirstName} {authorLastName}
        </Typography>
        <Typography
          variant="subtitle1"
          component="span"
          className={`${styles.divider}`}
          color="var(--light-on-surface-variant)"
        >
          |
        </Typography>
        <Typography
          variant="subtitle1"
          component="span"
          color="var(--light-on-surface-variant)"
          className={`${styles.metaInfo}`}
        >
          {publishDate}
        </Typography>
      </div>
    </div>
  );
}
