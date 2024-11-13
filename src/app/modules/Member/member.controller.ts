import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { memberService } from "./member.service";

const createMember = tryCatchAsync(async (req, res) => {
  const result = await memberService.createMember(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "Member created successfully",
    data: result,
  });
});

const getMember = tryCatchAsync(async (req, res) => {
  const result = await memberService.getMember();

  res.status(201).json({
    success: true,
    status: 200,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberByMemberId = tryCatchAsync(async (req, res) => {
  const result = await memberService.getMemberByMemberId(req.params.memberId);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Member retrieved successfully",
    data: result,
  });
});
const updateMemberByMemberId = tryCatchAsync(async (req, res) => {
  const result = await memberService.updateMemberByMemberId(
    req.params.memberId,
    req.body
  );

  res.status(200).json({
    success: true,
    status: 200,
    message: "Member updated successfully",
    data: result,
  });
});
const deleteMemberByMemberId = tryCatchAsync(async (req, res) => {
  await memberService.deleteMemberByMemberId(req.params.memberId);

  res.status(200).json({
    success: true,
    status: 200,
    message: "Member successfully deleted",
  });
});

export const memberController = {
  createMember,
  getMember,
  getMemberByMemberId,
  updateMemberByMemberId,
  deleteMemberByMemberId,
};
