import Image from "next/image";
import styles from "./CharacterBio.module.css";

export default function CharacterBio({ data }) {
  console.log(data, "data");
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Image
          className={styles.image}
          priority
          src={data.image}
          alt={data.name}
          layout="fill"
          objectFit="contain"
        />
        <p className={styles.title}>{data.name}</p>
        <p className={styles.text}>
          Status:&nbsp;
          <span className={styles.characterTrait}>{data.status}</span>
        </p>
        <p className={styles.text}>
          Location:&nbsp;
          <span className={styles.characterTrait}>{data.location.name}</span>
        </p>
        <p className={styles.text}>
          Planet:&nbsp;
          <span className={styles.characterTrait}>{data.origin.name}</span>
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
