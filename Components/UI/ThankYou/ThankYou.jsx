import Link from "next/link";
import styles from "./ThankYou.module.scss";

export default function ThankYou({
  title = "Your request is in.",
  description =
    "Thanks for reaching out. Your details have been received and I will get back to you as soon as possible.",
}) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.statusVisual} aria-hidden="true">
            <div className={styles.orbit}>
              <span className={styles.orbitDot} />
              <div className={styles.confirmationMark}>
                <span />
              </div>
            </div>
            <p>Submission complete</p>
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>Message received</p>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryAction}>
                Back to home
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/my-work" className={styles.secondaryAction}>
                View my work
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.nextSteps}>
          <div className={styles.stepIntro}>
            <p className={styles.eyebrow}>What happens now</p>
            <h2>A simple next step.</h2>
          </div>

          <ol className={styles.stepList}>
            <li>
              <span>01</span>
              <div>
                <h3>Received</h3>
                <p>Your details have landed safely.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Review</h3>
                <p>I will look through everything you shared.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Reply</h3>
                <p>Keep an eye on your inbox for the next step.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
