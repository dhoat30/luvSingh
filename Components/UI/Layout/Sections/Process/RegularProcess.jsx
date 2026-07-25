import Image from "next/image";
import styles from "./Process.module.scss";

export default function RegularProcess({ title, description, cards, image }) {
  if (!cards?.length) return null;
  const formattedTitle = title?.replaceAll("-", "&#8209;");

  return (
    <section className={styles.section} id="our-process">
      <div className={styles.container}>
        <div className={`${styles.headingWrapper} ${image ? styles.withImage : ""}`}>
          {image && (
            <div className={styles.imageWrapper}>
              <Image
                src={image.sizes?.large || image.url}
                alt={image.alt || "Editing process"}
                fill
                sizes="(max-width: 800px) 100vw, 32vw"
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.headingContent}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: formattedTitle }}
            />
            {description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>

        <ol className={styles.steps}>
          {cards.map((item, index) => (
            <li className={styles.step} key={`${item.title}-${index}`}>
              <div className={styles.marker} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                {item.description && (
                  <div
                    className={styles.stepDescription}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
