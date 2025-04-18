import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// This should be called once when your app starts
export const initEmailJS = () => {
  emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
};

// Send an enquiry notification email
export const sendEnquiryNotification = async (enquiryData, properties) => {
  try {
    // Get the current year for the footer
    const currentYear = new Date().getFullYear();
    
    // Create the admin URL
    const adminUrl = `${window.location.origin}/admin`;
    
    // Generate HTML for properties
    const propertiesHtml = generatePropertiesHtml(properties);
    
    // Prepare the template parameters for admin notification
    const adminTemplateParams = {
      name: enquiryData.name,
      email: enquiryData.email,
      phone: enquiryData.phone,
      property: enquiryData.property,
      message: enquiryData.message || 'No message provided',
      date: enquiryData.date,
      adminUrl: adminUrl,
      currentYear: currentYear,
      propertiesHtml: propertiesHtml
    };

    // Send the email to admin
    const adminResponse = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      adminTemplateParams
    );

    // Prepare the template parameters for customer confirmation
    const customerTemplateParams = {
      name: enquiryData.name,
      property: enquiryData.property,
      message: enquiryData.message || 'No message provided',
      currentYear: currentYear
    };

    // Send the confirmation email to customer
    const customerResponse = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID, // You'll need to create this template
      customerTemplateParams,
      enquiryData.email // Send to the customer's email
    );

    console.log('Emails sent successfully:', { adminResponse, customerResponse });
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { success: false, message: 'Failed to send emails', error };
  }
};

// Helper function to generate HTML for properties
const generatePropertiesHtml = (properties) => {
  if (!properties || properties.length === 0) {
    return '<p>No properties available.</p>';
  }

  // Take up to 3 properties to display
  const propertiesToShow = properties.slice(0, 3);
  
  let html = '';
  
  propertiesToShow.forEach(property => {
    html += `
      <div class="property-card">
        <img src="${property.banner_image || property.image[0] || ''}" alt="${property.name}" class="property-image">
        <div class="property-info">
          <div class="property-name">${property.name}</div>
          <div class="property-price">${property.price}</div>
          <div>${property.distance}</div>
        </div>
      </div>
    `;
  });
  
  return html;
}; 