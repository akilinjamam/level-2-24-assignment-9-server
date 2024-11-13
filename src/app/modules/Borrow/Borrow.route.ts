import express from "express";
import { borrowSchema } from "./Borrow.validation";
import { validateRequest } from "../../../middleware/validateRequest";
import { borrowController } from "./Borrow.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(borrowSchema.createBorrowSchema),
  borrowController.createBorrow
);

router.get("/overdue", borrowController.getOverDueBorrowedBooks);

export const borrowRouter = router;
