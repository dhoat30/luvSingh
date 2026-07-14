"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import { ThemeProvider } from "@emotion/react";
import Image from "next/image";
import WebsitePriceCalculatorForm from "@/Components/UI/Forms/WebsitePriceCalculatorForm";
import Video from "@/Components/UI/Video/Video";
import USP from "@/Components/UI/USP/USP";
import styles from './WebsiteDesignPriceCalculator.module.scss'
// const WebsitePriceCalculatorForm = dynamic(() =>
//   import("@/Components/UI/Forms/WebsitePriceCalculatorForm")
// );

export default function WebsiteDesignPriceCalculator({
  data,
  websitePackageOffer,
}) {
  console.log(websitePackageOffer)
  return (
    <ThemeProvider theme={lightTheme}>
      <section className={`${styles.section}`}>
        <Container maxWidth="lg" className={`${styles.container}`}>
          <div className={`${styles.formContainer}`}>
            <WebsitePriceCalculatorForm className={`${styles.formComponent} row-max`} />
          </div>
          <div className={`${styles.contentContainer}`}>
            <Typography
              variant="h5"
              color="secondary.main"
              component="div"
              className={`${styles.subtitle}`}
            >
              {data.acf.hero_section.subtitle}
            </Typography>
            <Typography
              variant="h4"
              color="white"
              component="h2"
              className={`${styles.title}`}
            >
              {data.acf.hero_section.title}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              component="p"
              className={`${styles.description}`}
            >
              {data.acf.hero_section.description}
            </Typography>
            {data.acf.hero_section.graphic.desktop &&
            !data.acf.hero_section.has_a_video ? (
              <div
                className={`${styles.imageWrapper} image-wrapper`}
                style={{
                  paddingBottom: `${
                    (data.acf.hero_section.graphic.desktop.height /
                      data.acf.hero_section.graphic.desktop.width) *
                    100
                  }%`,
                }}
              >
                <Image
                  src={data.acf.hero_section.graphic.desktop.url}
                  alt={data.acf.hero_section.graphic.desktop.alt}
                  fill
                  priority={true}
                  sizes="(max-width: 1000px) 100vw, 40vw"
                />
              </div>
            ) : (
              <Video
                placeholderImage={data.acf.hero_section.video.thumbnail}
                videoID={data.acf.hero_section.video.video_id}
              />
            )}
            {/* usp section  */}
            {websitePackageOffer && (
              <USP data={websitePackageOffer} showTitle={true}
              title={websitePackageOffer.section_title}
                            description={websitePackageOffer.description}
                cards={websitePackageOffer.cards}
              />
            )}
          </div>
        </Container>
      </section>
    </ThemeProvider>
  );
}
