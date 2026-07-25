import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { usefulLinks } from "./FooterLinks";
import { socialLinks } from "@/utils/staticData/socialLinksData";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

export default function Footer({ footerCtaData, showFooterCta = true }) {
  const currentYear = new Date().getFullYear();
  const availableSocialLinks = socialLinks.filter(
    ({ url }) => typeof url === "string" && url.trim().length > 0,
  );

  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData?.title}
          description={footerCtaData?.description}
          ctaArray={footerCtaData?.cta}
        />
      )}

      <footer className={styles.footerSection}>
        <div className={styles.container}>
          <div
            className={`${styles.footerGrid} ${
              availableSocialLinks.length === 0 ? styles.withoutSocials : ""
            }`}
          >
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.logoLink} aria-label="Luv Singh home">
                <Image
                  src="/logo.png"
                  width={168}
                  height={77}
                  alt="Luv Singh"
                  className={styles.logo}
                />
              </Link>

              <p className={styles.eyebrow}>Video editor · Storyteller</p>
              <h2 className={styles.statement}>
                Edits made to earn the next second.
              </h2>
              <p className={styles.description}>
                Performance edits, explainers, promos, and social-first videos
                built to hold attention and drive action.
              </p>
            </div>

            <nav className={styles.linksColumn} aria-label="Footer navigation">
              <p className={styles.columnTitle}>Useful links</p>
              <ul className={styles.menuList}>
                {usefulLinks.map((link) => (
                  <li key={`${link.label}-${link.url}`}>
                    <Link href={link.url} className={styles.navLink}>
                      <span>{link.label}</span>
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {availableSocialLinks.length > 0 && (
              <div className={styles.socialColumn}>
                <p className={styles.columnTitle}>Follow the work</p>
                <p className={styles.socialIntro}>
                  Fresh edits, breakdowns, and behind-the-scenes work.
                </p>

                <ul className={styles.socialList}>
                  {availableSocialLinks.map((social) => {
                    const SocialIcon = socialIcons[social.platform];

                    return (
                      <li key={social.platform}>
                        <Link
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${social.label} (opens in a new tab)`}
                          className={styles.socialLink}
                        >
                          <span className={styles.socialIcon}>
                            {SocialIcon && <SocialIcon aria-hidden="true" />}
                          </span>
                          <span>{social.label}</span>
                          <span className={styles.socialArrow} aria-hidden="true">
                            ↗
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.footerBottom}>
            <p>© {currentYear} Luv Singh. All rights reserved.</p>
            <Link href="#" className={styles.backToTop}>
              Back to top <span aria-hidden="true">↑</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
