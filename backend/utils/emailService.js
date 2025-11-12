const nodemailer = require('nodemailer');

// Create transporter (configure based on your email provider)
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  Email credentials not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send booking confirmation email
exports.sendBookingConfirmation = async (booking) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return; // Skip if email is not configured
  }

  const servicesList = booking.services.map(s => 
    `- ${s.serviceName} (${s.quantity}x $${s.basePrice})`
  ).join('\n');

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: booking.clientEmail,
    subject: 'Booking Confirmation - Digital Marketing Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank You for Your Booking!</h2>
        <p>Dear ${booking.clientName},</p>
        <p>We have received your booking request and will contact you shortly.</p>
        
        <h3>Booking Details:</h3>
        <ul style="line-height: 1.8;">
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Preferred Call Date:</strong> ${new Date(booking.preferredCallDate).toLocaleDateString()}</li>
          <li><strong>Preferred Time:</strong> ${booking.preferredCallTime}</li>
          <li><strong>Total Price:</strong> $${booking.totalPrice}</li>
        </ul>
        
        <h3>Selected Services:</h3>
        <pre style="background: #f3f4f6; padding: 15px; border-radius: 5px;">${servicesList}</pre>
        
        ${booking.message ? `<h3>Your Message:</h3><p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">${booking.message}</p>` : ''}
        
        <p style="margin-top: 30px;">We look forward to speaking with you!</p>
        <p style="color: #6b7280; font-size: 14px;">If you have any questions, please reply to this email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Digital Marketing Services | © ${new Date().getFullYear()}
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${booking.clientEmail}`);
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};
