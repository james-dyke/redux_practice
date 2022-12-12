import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Pullrefresh.module.css";

export default function PullToRefresh({ onRefresh, loading, children }) {
  // add and remove event listeners
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState();
  const [isMouseClicked, setIsMouseClicked] = useState(false);

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

  const mouseDown = (e) => {
    setStartPoint(e.clientY);
    setIsMouseClicked(true);
  };

  const mouseMove = (e) => {
    let pullLength =
      startPoint < e.clientY ? Math.abs(e.clientY - startPoint) : 0;
    if (isMouseClicked) {
      setPullChange(pullLength);
    }
  };

  const mouseEnd = (e) => {
    setStartPoint(0);
    setPullChange(0);
    setIsMouseClicked(false);
    if (pullChange > 50) initLoading();
  };

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("touchmove", pull);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchend", endPull);
    window.addEventListener("mouseup", mouseEnd);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchend", endPull);
      window.removeEventListener("mouseup", mouseEnd);
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
      <p className={styles.title} style={{ marginTop: pullChange || "0px" }}>
        Pull to load data
      </p>

      <div className={styles.resultsContainer}>{children}</div>
    </div>
  );
}
