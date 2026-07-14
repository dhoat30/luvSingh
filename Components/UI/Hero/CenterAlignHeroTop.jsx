import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import styles from './CenterAlignHeroTop.module.scss'
export default function CenterAlignHeroTop({ data }) {

  return (
    <section className={`${styles.section}`}>
      <Box className={`${styles.container}`}>
        <Box className={`${styles.imageWrapper} image-wrapper flexGrow-1`}>
          <div className={`${styles.bulb}`}></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className={`${styles.row}`} maxWidth="xl">
          <Box className={`${styles.contentWrapper}`}>
            {data && data.subtitle ? (
              <Typography
                className={`${styles.subtitle}`}
                component="h2"
                variant="h4"
                color="secondary.main"
                align="center"
              >
                {data.subtitle}
              </Typography>
            ) : null}
            {data && data.title ? (
              <Typography
                component="h1"
                variant="h2"
                color="white"
                className={`${styles.title}`}
                align="center"
              >
                {data.title}
              </Typography>
            ) : null}

            {data && data.description ? (
              <Typography
                component="p"
                variant="h5"
                align="center"
                color=" var(--dark-on-surface)"
              >
                {data.description}
              </Typography>
            ) : null}
            {data && data.ctaLink ? (
              <Box className={`${styles.buttonWrapper}`}>
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </section>
  );
}


