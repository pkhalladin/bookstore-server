import { IUser } from "../models/Users";

/**
 * Usually, we would store our users in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 */
const users: IUser[] = [
  {
    id: "2725",
    username: "hermione",
    password: "granger123",
  },
  {
    id: "5976",
    username: "harry",
    password: "potter123",
  },
];

export default users;
