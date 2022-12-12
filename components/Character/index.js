import Image from "next/image";
import styles from "./Character.module.css";

export default function Character({ data }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        priority
        src={data.image}
        height={100}
        width={100}
        alt={data.name}
      />

      <div className={styles.textContainer}>
        <p className={styles.text}>
          name:&nbsp;<span className={styles.characterTrait}>{data.name}</span>
        </p>
        <p className={styles.text}>
          status:&nbsp;
          <span className={styles.characterTrait}>{data.status}</span>
        </p>
        <p className={styles.text}>
          Featured in:&nbsp;
          <span className={styles.characterTrait}>
            {data.episode.length > 1 ? "1 episodes" : "1 episode"}
          </span>
        </p>
      </div>
    </div>
  );
}
