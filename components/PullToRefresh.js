import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Pullrefresh.module.css";

export default function PullToRefresh({ onRefresh, loading, children }) {
  // add and remove event listeners
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState();
  const refreshOPullAnchor = useRef();

  const initLoading = () => {
    onRefresh();
  };

  const pullStart = (e) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
  };

  const endPull = (e) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 50) initLoading();
  };

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    //  window.addEventListener("mousedown", pullStart);
    window.addEventListener("touchmove", pull);
    //  window.addEventListener("mousemove", pull);
    window.addEventListener("touchend", endPull);
    // window.addEventListener("mouseend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      // window.removeEventListener("mousedown", pullStart);
      window.removeEventListener("touchmove", pull);
      //  window.removeEventListener("mousemove", pull);
      window.removeEventListener("touchend", endPull);
      //window.removeEventListener("mouseend", endPull);
    };
  });
  return (
    <div>
      {loading && (
        <Image
          className={styles.loader}
          priority
          src="/images/spinner.gif"
          height={50}
          width={50}
          alt=""
        />
      )}
      <p
        ref={refreshOPullAnchor}
        className={styles.title}
        style={{ marginTop: pullChange || "" }}
      >
        Pull to load data
      </p>

      <div className={styles.resultsContainer}>{children}</div>
    </div>
  );
}
