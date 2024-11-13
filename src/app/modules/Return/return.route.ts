import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { returnSchema } from "./return.validation";
import { returnController } from "./return.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(returnSchema.createReturnSchema),
  returnController.createReturn
);

export const returnRouter = router;
