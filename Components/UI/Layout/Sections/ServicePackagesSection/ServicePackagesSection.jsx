import React from "react";
import Container from "@mui/material/Container";
import styles from "./ServicePackagesSection.module.scss";
import Package from "./Package";

export default function ServicePackagesSection({
  title,
  description,
  packages,
}) {
  console.log(packages);

  return (
    <section className={`${styles.section}`} id="package-price">
      <Container maxWidth="md" className={`${styles.titleContainer}`}>
        <div
          dangerouslySetInnerHTML={{ __html: title }}
          className={`heading-1 colored-text center-align uppercase ${styles.title}`}
        />
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className={`heading-5 center-align mt-24 `}
        />
      </Container>

      <Container
        maxWidth="xl"
        className={`${styles.packagesContainer} flex gap-32 flex-wrap justify-center mt-56`}
      >
        {packages &&
          packages.length > 0 &&
          packages.map((item, index) => {
            console.log(item);
            return (
              <Package
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                priceSuffix={item.price_suffix}
                includedTitle={item.included.title}
                includedArr={item.included.items}
                description={item.description}
                dark={index === 1 && true}
              />
            );
          })}
      </Container>
    </section>
  );
}
