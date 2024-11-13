import { PrismaClient } from "@prisma/client";
import { TMember } from "./member.constant";

const pirsma = new PrismaClient();

const createMember = async (data: TMember) => {
  const result = await pirsma.member.create({
    data: data,
  });

  return result;
};
const getMember = async () => {
  const result = await pirsma.member.findMany({});
  return result;
};
const getMemberByMemberId = async (id: string) => {
  const result = await pirsma.member.findUniqueOrThrow({
    where: {
      memberId: id,
    },
  });
  return result;
};

const updateMemberByMemberId = async (
  id: string,
  data: Record<string, unknown>
) => {
  const result = await pirsma.member.update({
    where: {
      memberId: id,
    },
    data: data,
  });
  return result;
};

const deleteMemberByMemberId = async (id: string) => {
  const result = await pirsma.member.delete({
    where: {
      memberId: id,
    },
  });
  return result;
};

export const memberService = {
  createMember,
  getMember,
  getMemberByMemberId,
  updateMemberByMemberId,
  deleteMemberByMemberId,
};
