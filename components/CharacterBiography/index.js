import Image from "next/image";
import styles from "./CharacterBio.module.css";

export default function CharacterBio({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Image
          className={styles.image}
          priority
          src={data.image}
          alt={data.name}
          width="350"
          height="350"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAbEAACAwADAAAAAAAAAAAAAAABAgADBQZRkf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAS/9oADAMBAAIRAxEAPwCcz+TpSgWzLosToOQfYiIqtJkv/9k='/%3E%3C/svg%3E"
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
