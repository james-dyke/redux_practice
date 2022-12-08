import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Pullrefresh.module.css";

export default function PullToRefresh() {
  // add and remove event listeners
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const refreshOPullAnchor = useRef();
  const refreshCont = useRef(0);
  const initLoading = () => {
    // refreshCont.current.classList.add("loading");
    // setTimeout(() => {
    //   // window.location.reload();
    // }, 1000);
  };

  const pullStart = (e) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e) => {
    setIsLoading(true);
    /**
     * get the current user touch event data
     */
    const touch = e.targetTouches[0];
    /**
     * get the touch position on the screen's Y axis
     */
    const { screenY } = touch;
    /**
     * The length of the pull
     *
     * if the start touch position is lesser than the current touch position, calculate the difference, which gives the `pullLength`
     *
     * This tells us how much the user has pulled
     */
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
    console.log({ screenY, startPoint, pullLength, pullChange });
  };

  const endPull = (e) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 220) initLoading();
  };

  useEffect(() => {
    refreshOPullAnchor.current.addEventListener("touchstart", pullStart);
    refreshOPullAnchor.current.addEventListener("touchmove", pull);
    refreshOPullAnchor.current.addEventListener("touchend", endPull);
    return () => {
      refreshOPullAnchor.current.removeEventListener("touchstart", pullStart);
      refreshOPullAnchor.current.removeEventListener("touchmove", pull);
      refreshOPullAnchor.current.removeEventListener("touchend", endPull);
    };
  });
  return (
    <div>
      <div
        className={!isLoading ? styles.loadingContainer : styles.loading}
        ref={refreshCont}
      >
        Loading..
        <Image
          priority
          src="/images/loading.gif"
          //   className={utilStyles.borderCircle}
          height={150}
          width={150}
          alt=""
        />
      </div>
      <p
        ref={refreshOPullAnchor}
        style={{ marginTop: pullChange / 3.118 || "" }}
      >
        Pull to load data
      </p>
      <ul>
        <li>image</li>
        <li>name</li>
        <li>status</li>
        <li>how ofter character showed up in each season</li>
      </ul>
    </div>
  );
}
