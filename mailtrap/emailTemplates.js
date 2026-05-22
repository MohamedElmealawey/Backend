const CONTACT_MESSAGE_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Message Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Contact Message Received</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We’ve received a new contact message with the following details:</p>
    <div style="margin: 20px 0;">
      <p><strong>Name:</strong> {senderName}</p>
      <p><strong>Email:</strong> {senderEmail}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Message:</strong></p>
      <p style="background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">{message}</p>
    </div>
    <p>Thank you for reaching out!</p>
    <p>Best regards,<br>My Portofolio</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports = {
  CONTACT_MESSAGE_EMAIL_TEMPLATE,
};