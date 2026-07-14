import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./EmpathySection.module.scss";
export default function EmpathySection({
  title,
  description,
  ctaArray,
  items,
}) {
  return (
    <section className={`${styles.section}`}>
        <Container maxwidth="xl" className={styles.container}> 
      <Container maxWidth="md" className={`${styles.titleContainer}`}>
        <div
          dangerouslySetInnerHTML={{ __html: title }}
          className={`heading-1 colored-text center-align uppercase ${styles.title}`}
        />
      </Container>
      {items && items.length > 0 && (
        <Container maxWidth="lg" className={`${styles.itemsContainer} grid gap-16 mt-56 mb-56`}>
          {items.map((singleItem, index) => {
            return (
              <div className={`${styles.item} grid gap-16 align-start`} key={index}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 40 40" fill="none">
                    <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z" fill="#1C1B20"/>
                    </svg>
                <div
                  dangerouslySetInnerHTML={{ __html: singleItem.item }}
                  className={`heading-5 `}
                />
              </div>
            );
          })}

        </Container>
      )}

        <Container maxWidth="lg" className={`${styles.descriptionContainer}`}>
      
             <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className={`heading-5 center-align `}
                />

                <div className={`${styles.btnWrapper} flex justify-center mt-32`}> 
                            {ctaArray && ctaArray.map((cta, index) => { 
                return       <Link href={cta.link.url} key={index}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                                disableElevation
                     
                >
                  {cta.link.title}
                </Button>
              </Link>
              } )  
              }
                </div>
        </Container>
        </Container>
    </section>
  );
}
