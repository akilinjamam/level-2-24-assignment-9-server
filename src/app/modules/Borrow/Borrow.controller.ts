import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { borrowService } from "./Borrow.service";

const createBorrow = tryCatchAsync(async (req, res) => {
  const result = await borrowService.createBorrow(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Book borrowed successfully",
    data: result,
  });
});
export const borrowController = {
  createBorrow,
};
