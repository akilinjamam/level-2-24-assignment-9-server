"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const member_service_1 = require("./member.service");
const createMember = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberService.createMember(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Member created successfully",
        data: result,
    });
}));
const getMember = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberService.getMember();
    res.status(201).json({
        success: true,
        status: 200,
        message: "Members retrieved successfully",
        data: result,
    });
}));
const getMemberByMemberId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberService.getMemberByMemberId(req.params.memberId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Member retrieved successfully",
        data: result,
    });
}));
const updateMemberByMemberId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberService.updateMemberByMemberId(req.params.memberId, req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Member updated successfully",
        data: result,
    });
}));
const deleteMemberByMemberId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield member_service_1.memberService.deleteMemberByMemberId(req.params.memberId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Member successfully deleted",
    });
}));
exports.memberController = {
    createMember,
    getMember,
    getMemberByMemberId,
    updateMemberByMemberId,
    deleteMemberByMemberId,
};
