import { EMAIL_BODY, EMAIL_SUBJECT } from "./constants";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: true,
//   auth: {
//     user: "notifications.engexpert@gmail.com",
//     pass: "tzgiosatvnpirfkx",
//   },
// });

const sendEmail = (sendTo) => {
  //   transporter.sendMail(
  //     {
  //       from: "notifications.engexpert@gmail.com",
  //       to: sendTo,
  //       subject: EMAIL_SUBJECT,
  //       text: EMAIL_BODY,
  //     },
  //     (error, info) => {
  //       if (error) {
  //         console.error(error);
  //       } else {
  //         console.log(`Email sent to ${sendTo}: `, info.response);
  //       }
  //     }
  //   );
};
export default sendEmail;
