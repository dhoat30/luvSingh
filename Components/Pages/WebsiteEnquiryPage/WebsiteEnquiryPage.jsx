"use client";

import Container from "@mui/material/Container";
import { ThemeProvider } from "@emotion/react";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import dynamic from "next/dynamic";
import styles from './WebsiteEnquiryPage.module.scss'
const WebsiteEnquiryForm = dynamic(() =>
  import("@/Components/UI/Forms/WebsiteEnquiryForm")
);

export default function WebsiteEnquiryPage({ data }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <section className={`${styles.section}`}>
        <Container maxWidth="sm" className={`${styles.container}`}>
          <div className={`${styles.formContainer}`}>
            <WebsiteEnquiryForm className="row-max form-component" />
          </div>
       
        </Container>
      </section>
    </ThemeProvider>
  );
}

