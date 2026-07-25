"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { headerLinks } from "@/utils/headerLinks";
import HeaderArrowIcon from "../Icons/HeaderArrowIcon";
import MenuIcon from "../Icons/MenuIcon";
import styles from "./Header.module.scss";

function NavigationItem({ item, onNavigate }) {
  if (!item.subLinks?.length) {
    return (
      <li className={styles.navItem}>
        <Link href={item.url} className={styles.navLink} onClick={onNavigate}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.navItem}>
      <details className={styles.submenu}>
        <summary className={styles.navLink}>
          {item.label}
          <HeaderArrowIcon className={styles.submenuArrow} />
        </summary>
        <ul
          className={styles.submenuList}
          style={{
            gridTemplateColumns: item.gridTemplateColumn || "1fr",
            width: item.width || "max-content",
          }}
        >
          {item.subLinks.map((subLink) => (
            <li key={subLink.url}>
              <Link
                href={subLink.url}
                className={styles.submenuLink}
                onClick={onNavigate}
              >
                {subLink.graphic && (
                  <Image
                    className={styles.submenuGraphic}
                    src={subLink.graphic}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
                <span className={styles.submenuContent}>
                  <span className={styles.submenuLabel}>{subLink.label}</span>
                  {subLink.subtitle && (
                    <span className={styles.submenuDescription}>
                      {subLink.subtitle}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}

export default function Header() {
  const menuToggleRef = useRef(null);

  const closeMenu = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Luv Singh home"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              width={168}
              height={77}
              alt="Luv Singh"
              className={styles.logo}
              priority
            />
          </Link>

          <div className={styles.navigationMenu}>
            <input
              ref={menuToggleRef}
              type="checkbox"
              id="navigation-toggle"
              className={styles.menuToggle}
              aria-label="Toggle navigation menu"
            />
            <label
              htmlFor="navigation-toggle"
              className={styles.menuButton}
              title="Menu"
            >
              <span className={styles.menuIcon}>
                <MenuIcon />
              </span>
              <span className={styles.closeIcon} aria-hidden="true" />
            </label>

            <label
              htmlFor="navigation-toggle"
              className={styles.menuBackdrop}
              aria-hidden="true"
            />

            <ul className={styles.navList}>
              {headerLinks.map((item) => (
                <NavigationItem
                  item={item}
                  onNavigate={closeMenu}
                  key={item.url || item.label}
                />
              ))}
              <li className={styles.ctaItem}>
                <Link
                  href="/get-a-sample-cut"
                  className={styles.cta}
                  onClick={closeMenu}
                >
                  Get Your Sample Cut
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
