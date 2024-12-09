import { IBook } from "../models/Bookshelves";
import axios from "axios";

let starterBookshelves: IBook[] = [];

export const setStartBookshelves = async () => {
  starterBookshelves = await Promise.all(
    [
      { id: "qKydDAAAQBAJ", userId: "2725", shelf: "wantToRead" },
      { id: "A1QoDwAAQBAJ", userId: "2725", shelf: "wantToRead" },
      { id: "aHo3DwAAQBAJ", userId: "2725", shelf: "wantToRead" },
      { id: "ppjUtAEACAAJ", userId: "2725", shelf: "currentlyReading" },
      { id: "dgYvDwAAQBAJ", userId: "2725", shelf: "read" },
      { id: "YhdU8thA6eEC", userId: "2725", shelf: "read" },
      { id: "F9wIMQAACAAJ", userId: "2725", shelf: "read" },
      { id: "oy3psgEACAAJ", userId: "5976", shelf: "currentlyReading" },
    ].map(({ id, userId, shelf }) =>
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(({ data }) => ({ id, userId, shelf, ...data.volumeInfo }))
    )
  );
};

export const getStartBookshelves = () => structuredClone(starterBookshelves);

export default starterBookshelves;
