import Typography from "@mui/material/Typography";
import React from "react";
import styles from './SingleWorkPage.module.scss'
import Image from "next/image";
export default function SingleProjectContentSections({ dataArr }) {
  if (!dataArr.length) return null;
  const sections = dataArr.map((item, index) => {
    return (
   
        <div key={index + 1025} id={item.acf_fc_layout} className={`${styles.singleProjectContentSection}`}>
          {item.title && (
            <Typography variant="h3" component="h2" color="white">
              {item.title}
            </Typography>
          )}
          {item.content && (
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          )}
          {item.image && (
            <div
              className="image-wrapper"
              style={{
                paddingBottom: `${
                  (item.image.height / item.image.width) * 100
                }%`,
              }}
            >
              <Image
                src={item.image.url}
                fill
                alt={item.image.alt}
                quality={100}
              />
            </div>
          )}

          {/* Loop over item.repeater array */}
          {item.repeater &&
            item.repeater.map((repeaterItem, repeaterIndex) => {
              // Render HTML for each element in item.repeater
              return (
                <div key={repeaterIndex + 2025} className={`${styles.subSection}`}>
                  <Typography
                    variant="h4"
                    component="h3"
                    color="white"
                    className="sub-section-title"
                  >
                    {repeaterItem.title}
                  </Typography>
                  {repeaterItem.content && (
                    <div
                      dangerouslySetInnerHTML={{ __html: repeaterItem.content }}
                    ></div>
                  )}
                  {repeaterItem.image && (
                    <div
                      className="image-wrapper"
                      style={{
                        paddingBottom: `${
                          (repeaterItem.image.height /
                            repeaterItem.image.width) *
                          100
                        }%`,
                      }}
                    >
                      <Image
                        src={repeaterItem.image.url}
                        fill
                        alt={repeaterItem.image.alt}
                        quality={100}
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
    
    );
  });
  return <>
  {sections}
 </>;
}

