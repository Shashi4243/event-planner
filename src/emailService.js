// EmailJS Configuration
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('UQ0me3FOAkdgLLPJA');

const SERVICE_ID = 'service_vgg8188';
const TEMPLATE_ID = 'template_rjwg2lc';

export const sendBookingConfirmation = async (bookingDetails, userEmail) => {
  try {
    const emailData = {
      to_email: userEmail,
      to_name: bookingDetails.clientName || 'Client',
      event_name: bookingDetails.eventName || 'Event',
      event_date: bookingDetails.date || 'N/A',
      event_time: bookingDetails.time || 'N/A',
      event_venue: bookingDetails.venue || 'N/A',
      event_guests: bookingDetails.people || 'N/A',
      event_service: bookingDetails.service || 'N/A',
      amount_paid: '₹1500'
    };

    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData);
    
    console.log('Email sent successfully:', result);

    // Store in localStorage for admin to see
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({
      to_email: userEmail,
      subject: `Booking Confirmation - ${bookingDetails.eventName}`,
      event_name: bookingDetails.eventName,
      timestamp: new Date().toISOString(),
      sent: true,
      status: 'Success'
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));
    
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error("Failed to send email:", error);
    
    // Store failed attempt
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({
      to_email: userEmail,
      subject: `Booking Confirmation - ${bookingDetails.eventName}`,
      timestamp: new Date().toISOString(),
      sent: false,
      status: 'Failed',
      error: error.text || 'Unknown error'
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));
    
    return { success: false, error: error.message };
  }
};

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications")) || [];
};
