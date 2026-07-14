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

export default function HeroSectionColumns({
  title,
  subtitle,
  reviewTitle,
  description,
  ctaArr,
  graphicType,
  graphicData,
  uspData,
  reviewerPics,
}) {
  let graphic;
  if (graphicType === "new_graphic_type") {
    graphic = (
      <div className={`${styles.newGraphicType} grid align-bottom`}>
        <div className={`${styles.graphic}`}>
          <div
            className={`${styles.imageWraper1} image-wrapper border-radius-16`}
          >
            <Image
              src={graphicData[0].image.sizes.large}
              alt={
                graphicData[0].image.alt ||
                graphicData[0].token.subtitle +
                  " " +
                  graphicData[0].token.title +
                  " " +
                  graphicData[0].token.description
              }
              fill
              priority={true}
              sizes=" (max-width: 550px) 100vw, (max-width: 1100px) 50vw, 50vw"
            />
          </div>
          <div className={`${styles.token1}`}>
            <div className={`${styles.tokenContent}`}>
              <Typography
                variant="subtitle1"
                component="span"
                className={`${styles.subtitle} center-align block`}
              >
                {graphicData[0].token.subtitle}
              </Typography>
              <Typography
                variant="h4"
                component="span"
                className={`${styles.title} center-align block black`}
              >
                {graphicData[0].token.title}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={`${styles.description} center-align block`}
              >
                {graphicData[0].token.description}
              </Typography>
            </div>
          </div>
        </div>

        <div className={`${styles.graphic}`}>
          <div
            className={`${styles.imageWraper2} image-wrapper border-radius-16`}
          >
            <Image
              src={graphicData[1].image.sizes.large}
              alt={
                graphicData[1].image.alt ||
                graphicData[1].token.subtitle +
                  " " +
                  graphicData[1].token.title +
                  " " +
                  graphicData[1].token.description
              }
              fill
              priority={true}
              sizes=" (max-width: 550px) 100vw, 50vw"
            />
          </div>
          <div className={`${styles.token2}`}>
            <div className={`${styles.tokenContent}`}>
              <Typography
                variant="subtitle1"
                component="span"
                className={`${styles.subtitle} center-align block`}
              >
                {graphicData[1].token.subtitle}
              </Typography>
              <Typography
                variant="h4"
                component="span"
                className={`${styles.title} center-align block black`}
              >
                {graphicData[1].token.title}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={`${styles.description} center-align block`}
              >
                {graphicData[1].token.description}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (graphicType === "image") {
    graphic = (
      <div
        className="image-wrapper border-radius-12"
        style={{ paddingBottom: `${(graphicData.height/graphicData.width)*100}%` }}
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
    <section className={`${styles.sectionColumns}`}>
      <Container className={`${styles.container} grid gap-80 align-center`} maxWidth="xl">
        <div className={`${styles.contentWrapper}`}>

          {/* <GoogleReviewSnippet reviewerPics={reviewerPics} reviewTitle={reviewTitle} />  */}
          <Typography variant="h6" component="div" className={`${styles.subtitle} mb-16`}>{subtitle}</Typography>
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 dark-version-font ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-5 dark-version-font mt-16 ${styles.description}`}
          />
          <HeroUSP data={uspData} />

          {(ctaArr && ctaArr.length > 0  ) && (
            <div className={` mt-32 flex gap-24 ${styles.ctaWrapper}`}>
           {ctaArr.map((cta, index)=> { 
           return <Link href={cta.cta_link.url}  key={index}>
              <Button
                  className="block"
                  variant={index === 0 ? "contained" : "outlined"}
                  disableElevation
                  size="large"
                >
                  {cta.cta_link.title}
                </Button>
              </Link>
           })}
               
              </div>
          )}
        </div>
        <div className={`${styles.graphicWrapper}`}>{graphic}</div>
      </Container>
    </section>
  );
}
