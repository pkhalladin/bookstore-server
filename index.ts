/**
 * The server is for the Book Store project
 * @author AlbanyCanCode
 */
import app from "./app";
import Bookshelves from "./models/Bookshelves";

const PORT = process.env.PORT || 3000;

(async () => {
  await Bookshelves.initialBookshelf();

  app.listen(PORT, () => {
    console.log(`\nYour server is running on http://localhost:${PORT}/`);
    console.log(`\nPress ctrl+c to stop\n`);
  });
})();
