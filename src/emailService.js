// Simple email notification service using a backend endpoint or EmailJS
// For now, we'll use a simulated email system that logs to console

export const sendBookingConfirmation = async (bookingDetails, userEmail) => {
  try {
    // Simulate sending email - in production, use EmailJS or backend API
    const emailData = {
      to: userEmail,
      subject: `Booking Confirmation - ${bookingDetails.eventName}`,
      message: `
        Dear ${bookingDetails.clientName},
        
        Your event has been confirmed!
        
        Event: ${bookingDetails.eventName}
        Date: ${bookingDetails.date}
        Time: ${bookingDetails.time}
        Location: ${bookingDetails.venue}
        Guests: ${bookingDetails.people}
        Service: ${bookingDetails.service}
        
        Amount Paid: ₹1500
        
        Thank you for booking with Event Planner!
        
        Best regards,
        Event Planner Team
      `
    };
    
    // In production, send via EmailJS:
    // await emailjs.send('service_id', 'template_id', emailData);
    
    console.log("Email sent (simulated):", emailData);
    
    // Store in localStorage for admin to see
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({
      ...emailData,
      timestamp: new Date().toISOString(),
      sent: true
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications")) || [];
};
