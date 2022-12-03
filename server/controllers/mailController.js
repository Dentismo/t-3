const sendMail = require("../mailer");

const sendMailHandler = async (req, res) => {
  const { booking, type } = req.body;
  if (!booking)
    return res
      .status(400)
      .json({ message: "Sending mail requires a booking `booking`" });
  if (!type)
    return res.status(400).json({
      message:
        "Sending mail requires the type of confirmation `type` 'denied' | 'accepted'",
    });
  try {
    const message = await sendMail({
      booking,
      type,
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
