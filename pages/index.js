import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import PullToRefresh from "../components/PullToRefresh";
import Character from "../components/Character";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  getCharacters,
  getNextPageCharacters,
  resetCharacters,
} from "../store/actions";

export default function Home() {
  const characterResults = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetCharacters());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleRefresh = () => {
    dispatch(resetCharacters());
    dispatch(getCharacters(axios));
  };

  const [open, setOpen] = React.useState(false);
  const characters = characterResults.characters ?? [];
  const errorMessage = characterResults.message ?? undefined;

  useEffect(() => {
    const handleScroll = (event) => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        dispatch(getNextPageCharacters(axios));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage, setOpen]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Obe fitness takehome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
      <main className={styles.main}>
        <Button onClick={handleClick} variant="contained">
          Reset
        </Button>
        <div id="test" className={styles.resultsContainer}>
          <PullToRefresh
            onRefresh={handleRefresh}
            loading={characterResults.loading}
          >
            {characters.map((character, index) => {
              return (
                <Character
                  key={index}
                  data={character}
                  id={character.id}
                ></Character>
              );
            })}
            {characterResults.loadingNextPage && (
              <Image
                className={styles.loader}
                priority
                src="/images/spinner.gif"
                height={50}
                width={50}
                alt="loading spinner"
              />
            )}
          </PullToRefresh>
        </div>
      </main>
    </div>
  );
}
