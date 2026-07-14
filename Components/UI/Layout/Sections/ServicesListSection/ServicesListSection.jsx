import styles from "./ServicesListSection.module.scss";

export default function ServicesListSection({ title, description, services }) {
  if (!services?.length) return null;

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <ol className={styles.servicesList}>
          {services.map((service, index) => (
            <li className={styles.service} key={`${service.title}-${index}`}>
              <div className={styles.serviceHeading}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.serviceTitle}>{service.title?.trim()}</h3>
              </div>
              {service.description && (
                <div
                  className={styles.serviceDescription}
                  dangerouslySetInnerHTML={{ __html: service.description.trim() }}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
