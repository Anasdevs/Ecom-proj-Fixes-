// Spinner.tsx
import React from "react";
import styles from "./Spinner.module.css";

interface Props {
  size?: "small" | "medium" | "large";
}

const Spinner: React.FC<Props> = ({ size = "small" }) => {
  const spinnerClass = `${styles.spinner} ${size && styles[size]}`;

  return (
    <div className={styles.spinnerContainer}>
      <div className={spinnerClass}></div>
    </div>
  );
};

export default Spinner;
