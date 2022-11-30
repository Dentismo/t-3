const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async ({ to, subject, text, html }) =>
  transporter.sendMail({
    from: `"Dentismo Group 1" ${process.env.MAIL_ADDRESS}`,
    to,
    subject,
    text,
    html,
  });

module.exports = sendMail;
