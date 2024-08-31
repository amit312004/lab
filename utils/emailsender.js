const nodemailer = require('nodemailer');

exports.sendEmailWithAttachment = (recipientEmail, pdfBase64) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Invoice',
      text: 'Please find your invoice attached.',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBase64,
          encoding: 'base64'
        }
      ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err);
      }
      resolve(info);
    });
  });
};
