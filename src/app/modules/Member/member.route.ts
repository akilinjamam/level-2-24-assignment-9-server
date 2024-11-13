import express from "express";

import { validateRequest } from "../../../middleware/validateRequest";
import { memberSchema } from "./member.validation";
import { memberController } from "./member.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(memberSchema.createMemberSchema),
  memberController.createMember
);
router.get("/", memberController.getMember);
router.get("/:memberId", memberController.getMemberByMemberId);
router.put(
  "/:memberId",
  validateRequest(memberSchema.updateMemberSchema),
  memberController.updateMemberByMemberId
);
router.delete("/:memberId", memberController.deleteMemberByMemberId);

export const memberRouter = router;
