import Image from "next/image";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <Image
      className={styles.loader}
      priority
      src="/images/spinner.gif"
      height={50}
      width={50}
      alt="loading spinner"
    />
  );
}
