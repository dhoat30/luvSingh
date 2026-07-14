import React from "react";
import styles from "./HeroSection.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeroUSP from "@/Components/UI/USP/HeroUSP";
import Image from "next/image";
import Video from "@/Components/UI/Video/Video";
import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";

export default function HeroSectionRows({
  title,
  subtitle,
  reviewTitle,
  description,
  ctaArr,
  graphicType,
  graphicData,
  uspData,
  reviewerPics,
  ctaMicroCopy,
}) {
  let graphic;

  if (graphicType === "image") {
    graphic = (
      <div
        className="image-wrapper border-radius-12"
        style={{
          paddingBottom: `${(graphicData.height / graphicData.width) * 100}%`,
        }}
      >
        <Image
          src={graphicData.sizes.large}
          alt={graphicData.alt || title}
          fill
          className={`${styles.image}`}
        />
      </div>
    );
  }

  if (graphicType === "youtube_video") {
    graphic = (
      <Video
        videoID={graphicData.youtube_id}
        placeholderImage={graphicData.placeholder_image}
        priority={true}
      />
    );
  }
  return (
    <section className={`${styles.sectionRows}`}>
      <Container className={`${styles.container} align-center`} maxWidth="lg">
        <div className={`${styles.contentWrapper}`}>
          {/* <GoogleReviewSnippet reviewerPics={reviewerPics} reviewTitle={reviewTitle} />  */}
          <Typography
            variant="h6"
            component="div"
            className={`${styles.subtitle} mb-16`}
          >
            {subtitle}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 dark-version-font colored-text center-align ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-4 dark-version-font mt-16 center-align ${styles.description}`}
          />
          <HeroUSP data={uspData} />

          {ctaArr && ctaArr.length > 0 && (
            <div
              className={` mt-32 flex gap-24 justify-center ${styles.ctaWrapper}`}
            >
              {ctaArr.map((cta, index) => {
                return (
                  <Link href={cta.cta_link.url} key={index}>
                    <Button
                      className="block"
                      variant={index === 0 ? "contained" : "outlined"}
                      disableElevation
                      size="large"
                    >
                      {cta.cta_link.title}
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
          {ctaMicroCopy && (
            <div className="flex justify-center mt-16">
              <Typography
                variant="body1"
                component={"p"}
                className="center-align"
              >
                {ctaMicroCopy}
              </Typography>
            </div>
          )}
        </div>
        <div className={`${styles.graphicWrapper} mt-80`}>{graphic}</div>
      </Container>
    </section>
  );
}
