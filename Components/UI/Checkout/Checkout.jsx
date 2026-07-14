"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Container from "@mui/material/Container";
import CheckoutForm from "../Forms/CheckoutForm";
import OrderSummary from "./OrderSummary";
import styles from "./Checkout.module.scss";

export default function Checkout({ servicePackages }) {
  const [selectedPackages, setSelectedPackages] = useState([]); // ✅ array

  useEffect(() => {
    if (!servicePackages?.length) return;

    // 1) Services cookie → package slugs
    let slugArray = [];
    const slugsCookie = Cookies.get("services");
    if (slugsCookie) {
      try {
        slugArray = JSON.parse(slugsCookie);
      } catch (e) {
        console.error("Invalid services cookie JSON", e);
      }
    }

    const serviceSelected = servicePackages
      .filter((p) => slugArray.includes(p.slug))
      .map((item) => ({
        title: item?.acf?.hero_section?.title,
        price: `$${item?.acf?.cta_section?.service_price}`,
        image: item?.acf?.hero_section?.image?.url,
        slug: item?.slug, // ✅ add slug for dedupe
      }));

    // 2) Google Ads cookie → single selected package
    let adsSelected = [];
    const adsCookie = Cookies.get("googleAdsPackages");
    if (adsCookie) {
      try {
        const [selectedPackage] = JSON.parse(adsCookie);
        if (selectedPackage) {
          adsSelected = [
            {
              title: `Google Ads - ${selectedPackage.name}`,
              price: selectedPackage.price,
              image: "/services-graphics/google-ads.jpg", // ✅ no /public
              slug: "google-ads",
              priceSuffix: selectedPackage.priceSuffix,
            },
          ];
        }
      } catch (e) {
        console.error("Invalid googleAdsPackages cookie", e);
      }
    }

    // 3) Combine + dedupe (by slug)
    const combined = [...serviceSelected, ...adsSelected];
    const deduped = Array.from(
      new Map(combined.map((p) => [p.slug, p])).values(),
    );

    setSelectedPackages(deduped);
  }, [servicePackages]);
  console.log(selectedPackages);

  const serivceRequired = selectedPackages.map((item) => {
    return item.title;
  });

  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <div className={styles.formWrapper}>
            <CheckoutForm serivceRequired={serivceRequired} />
          </div>

          {selectedPackages.length === 0 ? null : (
            <div className={styles.orderSummaryWrapper}>
              <OrderSummary selectedPackages={selectedPackages} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
