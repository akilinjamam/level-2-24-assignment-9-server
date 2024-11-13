import express from "express";
import { bookController } from "./Book.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { bookSchema } from "./Book.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(bookSchema.createBookSchema),
  bookController.createBook
);
router.get("/", bookController.getBook);
router.get("/:bookId", bookController.getBookByBookId);
router.put(
  "/:bookId",
  validateRequest(bookSchema.updateBookSchema),
  bookController.updateBookByBookId
);
router.delete("/:bookId", bookController.deleteBookByBookId);

export const bookRouter = router;
