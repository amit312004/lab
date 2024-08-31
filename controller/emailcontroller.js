const emailSender = require('../utils/emailsender');

exports.sendEmail = (req, res) => {
  const { email, pdfBase64 } = req.body;

  if (!email || !pdfBase64) {
    return res.status(400).json({ success: false, message: 'Email and PDF data are required' });
  }

  emailSender.sendEmailWithAttachment(email, pdfBase64)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: err.message }));
};
