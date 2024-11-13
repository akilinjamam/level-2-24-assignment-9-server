import { bookService } from "./Book.service";
import { tryCatchAsync } from "../../../shared/tryCatchAsynce";

const createBook = tryCatchAsync(async (req, res) => {
  const result = await bookService.createBook(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Book created successfully",
    data: result,
  });
});

const getBook = tryCatchAsync(async (req, res) => {
  const result = await bookService.getBook();

  res.status(201).json({
    success: true,
    status: 200,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getBookByBookId = tryCatchAsync(async (req, res) => {
  const result = await bookService.getBookByBookId(req.params.bookId);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Book retrieved successfully",
    data: result,
  });
});
const updateBookByBookId = tryCatchAsync(async (req, res) => {
  const result = await bookService.updateBookByBookId(
    req.params.bookId,
    req.body
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Book updated successfully",
    data: result,
  });
});
const deleteBookByBookId = tryCatchAsync(async (req, res) => {
  await bookService.deleteBookByBookId(req.params.bookId);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Book successfully deleted",
  });
});

export const bookController = {
  createBook,
  getBook,
  getBookByBookId,
  updateBookByBookId,
  deleteBookByBookId,
};
