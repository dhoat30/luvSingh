import Link from "next/link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Button from "@mui/material/Button";
import  styles from './ServicePackageCard.module.scss'
export default function ServicePackageCard({
  title,
  description,
  price,
  image,
  ctaLink,
  ctaLabel,
  className,
}) {
  if (!image) return null;
  return (
    <Paper className={`${className} ${styles.section} card-wrapper`} elevation={0}>
      <Link className={`${styles.linkWrapper}`} href={ctaLink}>
        <div className={`${styles.imageWrapper}`}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={true}
            sizes=""
          />
        </div>
        <div className={`${styles.contentWrapper}`}>
          <Typography className={`${styles.title}`} component="h2" variant="h4">
            {title}
          </Typography>
          <Typography className={`${styles.description}`} component="p" variant="body1">
            {description}
          </Typography>
          <Typography className={`${styles.price}`} component="div" variant="h4">
            ${price}
          </Typography>
          <Button className={`${styles.button}`} variant="contained" size="large">
            {ctaLabel}
          </Button>
        </div>
      </Link>
    </Paper>
  );
}
