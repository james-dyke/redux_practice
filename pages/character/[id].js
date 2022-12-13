import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCharacterById } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import CharacterBiography from "../../components/CharacterBiography/";
import axios from "axios";

const CharacterBio = () => {
  const router = useRouter();

  const characterResult = useSelector((state) => state.data.character);
  const dispatch = useDispatch();
  const { id } = router.query;

  dispatch(getCharacterById(axios, id));

  console.log(characterResult, "characterResult");

  return characterResult !== undefined ? (
    <CharacterBiography data={characterResult} />
  ) : (
    "loading"
  );
};

export default CharacterBio;
