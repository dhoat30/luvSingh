import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import styles  from './CenterAlignHero.module.scss'
export default function CenterAlignHero({ data }) {
  return (
    <section className={`${styles.section}`}>
      <Box className={`${styles.container}`}>
        <Box className={`${styles.imageWrapper} flexGrow-1`}>
          <div className={`${styles.bulb}`}></div>
          <Image src={data?.desktopImage.url} alt="hero" fill priority={true} />
        </Box>
        <Container className={`${styles.row}`} maxWidth="xl">
          <Box className={`${styles.contentWrapper}`}>
            <Typography
              className={`${styles.subtitle}`}
              component="h2"
              variant="h4"
              color="secondary.main"
              align="center"
            >
              {data?.subtitle}
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="white"
              className={`${styles.title}`}
              align="center"
            >
              {data?.title}
            </Typography>
            <Typography
              component="p"
              variant="h5"
              align="center"
              color=" var(--dark-on-surface)"
            >
              {data?.description}
            </Typography>
            {data?.ctaLink && (
              <Box className={`${styles.buttonWrapper}`}>
                <Link href={data.ctaLink}>
                  <Button variant="contained" size="large">
                    {data.ctaLabel}
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </section>
  );
}

