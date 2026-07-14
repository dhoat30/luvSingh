import Image from "next/image";
import Link from "next/link";
import styles from "./SolutionSection.module.scss";

export default function SolutionSection({
  subtitle,
  title,
  description,
  ctaArray,
  items,
}) {
  if (!items?.length) return null;

  const hasTitle = Boolean(title?.trim());

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingColumn}>
          {hasTitle ? (
            <>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </>
          ) : (
            subtitle && <h2 className={styles.fallbackTitle}>{subtitle}</h2>
          )}

          {description && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {ctaArray?.length > 0 && (
            <div className={styles.ctaWrapper}>
              {ctaArray.map((cta, index) => (
                <Link
                  href={cta.link.url}
                  target={cta.link.target || undefined}
                  rel={cta.link.target === "_blank" ? "noreferrer" : undefined}
                  className={`${styles.cta} ${index === 0 ? styles.contained : styles.outlined}`}
                  key={`${cta.link.url}-${index}`}
                >
                  {cta.link.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <article className={styles.item} key={`${item.title}-${index}`}>
              <div className={styles.itemMarker}>
                {item.image ? (
                  <Image
                    src={item.image.sizes?.thumbnail || item.image.url}
                    alt={item.image.alt || ""}
                    width={48}
                    height={48}
                    className={styles.itemImage}
                  />
                ) : (
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title?.trim()}</h3>
                {item.description && (
                  <div
                    className={styles.itemDescription}
                    dangerouslySetInnerHTML={{ __html: item.description.trim() }}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
