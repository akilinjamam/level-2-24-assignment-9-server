import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { borrowService } from "./Borrow.service";

const createBorrow = tryCatchAsync(async (req, res) => {
  const result = await borrowService.createBorrow(req.body);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Book borrowed successfully",
    data: result,
  });
});
const getOverDueBorrowedBooks = tryCatchAsync(async (req, res) => {
  const result = await borrowService.getOverDueBooks();

  res.status(200).json({
    success: true,
    status: 200,
    message:
      result.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
    data: result,
  });
});
export const borrowController = {
  createBorrow,
  getOverDueBorrowedBooks,
};
