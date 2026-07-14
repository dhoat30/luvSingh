import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import {
  services,
  usefulLinks,
  commercialLinks,
  informationLinks,
} from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";
import SocialWrapper from "./SocialWrapper";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,
  contactInfo,
  socialData,
}) {
  console.log(certifications);
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData?.title}
          description={footerCtaData?.description}
          ctaArray={footerCtaData?.cta}
        />
      )}

      <div className={`${styles.footerSection}`}>
        <Container maxWidth="xl" className="row">
          {/* logo wrapper */}
          <div className={`${styles.footerWrapper}`}>
            <div className={`${styles.logoWrapper}`}>
              {/* <Link href="/" className="mb-16 block mt-8">
                <Image
                          src="/logo.png"
                     width={500 / 7}
                height={527 / 7}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                />
              </Link> */}

              <Typography
                variant="h6"
                component="p"
                // sx={{ marginTop: "0" }}
              >
                Websites and ads designed to convert — not confuse.
              </Typography>
              {certifications && (
                <div className="certification-wrapper">
                  <Typography
                    variant="subtitle1"
                    component="div"
                    className=" mt-32 uppercase"
                    sx={{ marginBottom: "8px" }}
                  >
                    Certifications
                  </Typography>
                  <div
                    className={`${styles.certificationsLogos} certification-logos grid gap-8 align-center`}
                  >
                    {certifications.items.map((item, index) => {
                      const padding =
                        (item.image.height / item.image.width) * 100;
                      return (
                        <Link href={item.link.url} target="_blank" key={index}>
                          <div
                            className="image-wrapper"
                            style={{ paddingBottom: `${padding}%` }}
                          >
                            <Image
                              src={item.image.url}
                              alt={item.alt ? item.alt : "certification"}
                              fill
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className={`${styles.linksContainer}`}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ marginBottom: "8px" }}
              >
                USEFUL LINKS
              </Typography>
              <ul
                className={`${styles.menuList}`}
                sx={{ margin: 0, padding: 0 }}
              >
                {usefulLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`${styles.link} dark-body2 body2 `}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${styles.contactWrapper}`}>
              {contactInfo && contactInfo.info && (
                <div className="contact-section">
                  <ContactInfo contactInfo={contactInfo} />
                </div>
              )}
              {socialData && socialData.length > 0 && (
                <SocialWrapper socialData={socialData} className="mt-24" />
              )}
            </div>
          </div>
        </Container>
      </div>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
