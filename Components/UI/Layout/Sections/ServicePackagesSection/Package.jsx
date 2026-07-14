"use client";
import React from "react";
import styles from "./Package.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Package({
  title,
  subtitle,
  price,
  priceSuffix,
  includedTitle,
  includedArr,
  description,
  dark = false,
}) {
  console.log(includedArr.length);
  const router = useRouter();

  // Function to handle the click event
  const handleBuyNowClick = (packageName, price, priceSuffix) => {
    // Replace the cookie completely with the new package
    const packages = [
      { name: packageName, price: price, priceSuffix: priceSuffix },
    ];

    Cookies.set("googleAdsPackages", JSON.stringify(packages), { expires: 30 });

    router.push("/checkout");
  };

  return (
    <div
      className={`${styles.wrapper} border-radius-12 ${dark && styles.dark}`}
    >
      <div className={styles.content}>
        <Typography
          variant="h6"
          component="h4"
          color={`var(--${dark ? "dark" : "light"}-on-surface)`}
          className="uppercase center-align"
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          color={`var(--${dark ? "dark" : "light"}-on-surface)`}
          className=" center-align mt-8"
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          color={`var(--${dark ? "dark" : "light"}-on-surface)`}
          className={`${styles.description} center-align mt-16`}
        >
          {description}
        </Typography>
        <div
          className={`${styles.priceWrapper} flex flex-wrap align-bottom justify-center mt-32`}
        >
          <Typography
            variant="h3"
            component="div"
            color={`var(--${dark ? "dark" : "light"}-on-surface)`}
            className=" center-align  bold"
          >
            {price}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            color={
              dark
                ? "var(--dark-on-surface)"
                : "var(--light-on-surface-variant)"
            }
            className=""
          >
            {priceSuffix}
          </Typography>
        </div>
        <div className="btn-wrapper flex justify-center mt-24">
          {dark ? (
            <Button
              size="large"
              variant="contained"
              sx={{
                background: "white",
                color: "var(--dark-on-primary)",
                "&:hover": {
                  background: "#eaeaea",
                },
              }}
              onClick={() => handleBuyNowClick(title, price, priceSuffix)}
            >
              Start Free Trial
            </Button>
          ) : (
            <Button
              onClick={() => handleBuyNowClick(title, price, priceSuffix)}
              size="large"
              variant="contained"
              color="secondary"
            >
              Start Free Trial
            </Button>
          )}
        </div>

        <div className={`${styles.itemsContainer} mt-40`}>
          <Typography
            variant="body1"
            component="div"
            color={`var(--${dark ? "dark" : "light"}-on-surface)`}
            className="semi-bold"
          >
            {includedTitle}
          </Typography>
          <div className={`${styles.items} mt-16`}>
            {includedArr &&
              includedArr.length > 0 &&
              includedArr.map((item, index) => {
                return (
                  <div
                    className={`${styles.item} grid align-start gap-8`}
                    key={index}
                  >
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.672 4.464L6.4 9.736L3.528 6.872L2.4 8L6.4 12L12.8 5.6L11.672 4.464ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z"
                        fill={`${dark ? "white" : "#4112FE"}`}
                      />
                    </svg>

                    <Typography
                      variant="body1"
                      component="div"
                      color={`var(--${dark ? "dark" : "light"}-on-surface)`}
                      className="mb-8"
                    >
                      {item.item}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
