const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies

app.post('/send-email', async (req, res) => {
  const { email, pdfBase64 } = req.body;

  try {
    // Here you'd add your logic to send the email with the PDF attachment.
    // For example, using Nodemailer:

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'a3110k2004@gmail.com', // Your email
        pass: 'vsee svzs xdkj acck'   // Your email password or app-specific password
      }
    });

    const mailOptions = {
      from: 'Advanced Diagnostic centre',
      to: email,
      subject: 'Your Invoice',
      text: 'Please find your invoice attached.',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBase64,
          encoding: 'base64'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
