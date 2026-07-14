import Image from "next/image";
import Link from "next/link";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import CustomAccordion from "@/Components/UI/Accordion/CustomAccordion";
import styles from "./RowSection.module.scss";

export default function RowSection({
  title,
  subtitle,
  description,
  imageAlignment,
  image,
  ctaGroup,
  bulletPoints,
  showBeforeAfterImages,
  beforeImage,
  afterImage,
  accordionData,
  backgroundColor,
  fontColor,
}) {
  const hasMedia = showBeforeAfterImages || image?.url;
  const sectionStyle = {
    backgroundColor: backgroundColor || undefined,
    "--row-font-color": fontColor || undefined,
  };

  return (
    <section className={styles.section} style={sectionStyle}>
      <div className={styles.container}>
        <div
          className={`${styles.wrapper} ${
            imageAlignment === "right" ? styles.imageRight : styles.imageLeft
          } ${!hasMedia ? styles.withoutMedia : ""}`}
        >
          <div className={styles.contentWrapper}>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}

            {description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {bulletPoints?.length > 0 && (
              <ul className={styles.bulletList}>
                {bulletPoints.map((item, index) => (
                  <li key={`${item.text}-${index}`}>{item.text}</li>
                ))}
              </ul>
            )}

            {accordionData?.length > 0 && (
              <div className={styles.accordionWrapper}>
                <CustomAccordion qaData={accordionData} />
              </div>
            )}

            {ctaGroup?.cta && (
              <Link
                href={ctaGroup.cta.url}
                target={ctaGroup.cta.target || undefined}
                rel={ctaGroup.cta.target === "_blank" ? "noreferrer" : undefined}
                className={`${styles.cta} ${
                  ctaGroup.cta_type === "outlined" ? styles.outlined : styles.contained
                }`}
              >
                {ctaGroup.cta.title}
              </Link>
            )}
          </div>

          {hasMedia && (
            <div className={styles.mediaColumn}>
              {showBeforeAfterImages ? (
                <div className={styles.imageContainer}>
                  <BeforeAfter
                    showTitle={false}
                    data={{ beforeImage, afterImage }}
                  />
                </div>
              ) : (
                <div className={styles.imageWrapper}>
                  <Image
                    src={image.url}
                    alt={image.alt || title || ""}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                    className={styles.image}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
