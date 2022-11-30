const sendMail = require("../mailer");

const sendMailHandler = async (req, res) => {
  console.log(`Sending Mail:`);
  console.log(req.body);
  const { to, subject, text, html } = req.body;
  if (!to)
    return res
      .status(400)
      .json({ message: "Sending mail requires a recepient address `to`" });
  if (!subject)
    return res
      .status(400)
      .json({ message: "Sending mail requires a subject `subject`" });
  if (!text && !html)
    return res.status(400).json({
      message:
        "Sending mail requires atleast one of plain text `text` or HTML `html`",
    });
  try {
    const message = await sendMail({
      to,
      subject,
      text,
      html,
    });
    res.status(200).json({
      message: "Mail successfully sent!",
      payload: {
        ...req.body,
        message,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  sendMailHandler,
};
