import styles from "./PriceSliderSection.module.scss"
export default function Bubble({ label, x, y, size }) {

  return (
    <div  className={`${styles.bubble} body1 dark-body1`}
      style={{
        "--x": x,
        "--y": y,
        "--size": `${size}px`
      }}>
        {label}

    </div>
  );
}
