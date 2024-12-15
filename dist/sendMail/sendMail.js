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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import config from '../config';
const userEmail = process.env.SMTP_EMAIL;
const userPass = process.env.SMTP_PASS;
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: userEmail,
            pass: userPass, // this password is collected from google app password
        },
    });
    // async..await is not allowed in global scope, must use a wrapper
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            // send mail with defined transport object
            const info = yield transporter.sendMail({
                from: userEmail, // sender address
                to,
                subject: "reset your password within 10 minutes", // Subject line
                text: "", // plain text body
                html,
            });
            console.log("Message sent: %s", info.messageId);
            return info.messageId;
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        });
    }
    main().catch(console.error);
});
exports.sendEmail = sendEmail;
