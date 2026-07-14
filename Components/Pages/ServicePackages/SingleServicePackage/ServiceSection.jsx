
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from './SingleServicePackage.module.scss'

export default function ServiceSection({ data }) {
  const section = data.map((item, index) => {
    return (
      <section key={index} className={`${styles.serviceSection}`}>
        <Typography variant="h4" component="h2">
          {item.title}
        </Typography>
        {/* set description dangerously */}
        {item.description && (
          <div
            className={`${styles.description}`}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
        )}
        {item.does_this_section_has_a_subheading && (
          <div className={`${styles.subHeadingWrapper}`}>
            {item.sub_heading_group.map((subHeadingItem, index) => {
              return (
                <div key={index}>
                  <Typography
                    key={index}
                    variant="h6"
                    component="h4"
                    className={`${styles.subHeading}`}
                  >
                    {subHeadingItem.subheading}
                  </Typography>
                  <div
                    className={`${styles.description}`}
                    dangerouslySetInnerHTML={{ __html: subHeadingItem.content }}
                  ></div>
                  {subHeadingItem.image && (
                    <div
                      className={`${styles.imageWrapper}`}
                      style={{
                        paddingBottom: `${
                          (subHeadingItem.image.height /
                            subHeadingItem.image.width) *
                          100
                        }%`,
                      }}
                    >
                      <Image
                        src={subHeadingItem.image.url}
                        alt={subHeadingItem.image.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 70vw"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  });
  return <>{section}</>;
}
