const nodemailer = require("nodemailer");
/* Thanks for actually reading the commit changes :> Sadly im stuck between these two imports for all eternity until someone takes pity on me and moves me elsewhere or just puts me out of my misery */
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

/* Setup transporter for sending mail */
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

/* Express handlebars middleware */
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  })
);

// TODO: replace homePage with our domain when in production
/* Custom mail sending interface */
const sendMail = async ({ booking, type }) => {
  const {
    clinicId,
    date,
    user: { email },
  } = booking;
  transporter.sendMail({
    from: `Clinic ${clinicId} ${process.env.MAIL_ADDRESS}`,
    to: email,
    subject: `Appointment on ${date} ${type}`,
    template: "index",
    context: {
      ...booking,
      type,
      typeColor: type === "approved" ? "rgb(56, 142, 60)" : "rgb(198, 40, 40)",
      headText: `We have some ${type === "approved" ? "good" : "bad"} news!`,
      footText: `Visit the Clinic's contact page ${
        type === "approved" ? "for more information" : "to find a new time slot"
      }!`,
      homePage: `http://localhost:8080`,
      clinicPage: `http://localhost:8080/clinic/${clinicId}`,
    },
  });
};

module.exports = sendMail;
