import Image from "next/image";
import Link from "next/link";
import styles from "./FooterCTA.module.scss";

export default function FooterCta({
  title,
  description,
  ctaArray,
  image,
  lightBackground = false,
}) {
  if (!title) return null;

  return (
    <section className={`${styles.section} ${lightBackground ? styles.light : ""}`}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            {image && (
              <Image
                src={image.url}
                alt={image.alt || ""}
                width={96}
                height={96}
                className={styles.image}
              />
            )}
            <h2 className={styles.title}>{title}</h2>
          </div>

          <div className={styles.actionWrapper}>
            {description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {ctaArray?.length > 0 && (
              <div className={styles.buttonWrapper}>
                {ctaArray.map((cta, index) => (
                  <Link
                    href={cta.link.url}
                    target={cta.link.target || undefined}
                    rel={cta.link.target === "_blank" ? "noreferrer" : undefined}
                    className={`${styles.cta} ${index > 0 ? styles.outlined : ""}`}
                    key={`${cta.link.url}-${index}`}
                  >
                    {cta.link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
