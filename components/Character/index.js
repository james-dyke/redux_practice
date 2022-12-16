import Image from "next/image";
import styles from "./Character.module.css";
import Link from "next/link";

export default function Character({ data, id, showLoader }) {
  return (
    <>
      {showLoader && (
        <Image
          className={styles.loader}
          priority
          src="/images/spinner.gif"
          height={50}
          width={50}
          alt=""
        />
      )}
      {!showLoader && (
        <Link href={"character/" + id.toString()}>
          <div className={styles.container}>
            <Image
              className={styles.image}
              priority
              src={data.image}
              height={100}
              width={100}
              alt={data.name}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAbEAACAwADAAAAAAAAAAAAAAABAgADBQZRkf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAS/9oADAMBAAIRAxEAPwCcz+TpSgWzLosToOQfYiIqtJkv/9k='/%3E%3C/svg%3E"
            />

            <div className={styles.textContainer}>
              <p className={styles.text}>
                name:&nbsp;
                <span className={styles.characterTrait}>{data.name}</span>
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
        </Link>
      )}
    </>
  );
}
