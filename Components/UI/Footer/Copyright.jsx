import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
export default function Copyright() {
  return (
    <div className={`${styles.copyrightWrapper} `} >
      <Container maxWidth="xl" className="content-wrapper pt-8 pb-8"  style={{borderTop:  "1px solid var(--dark-outline-variant)"}}>
        <div className="copyright-wrapper ">
        <Typography variant="body1" component="div" className="center-align">
            © {new Date().getFullYear()} Webduel Limited. All Rights Reserved. 
            </Typography>
        
        </div>
    
      </Container>
    </div>
  );
}
