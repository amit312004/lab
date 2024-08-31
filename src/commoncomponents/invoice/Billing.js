import React, { useState } from 'react';
import easyinvoice from 'easyinvoice';
import './Billing.css';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    clientAddress: '',
    clientZip: '',
    clientCountry: '',
    tests: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? checked
          ? [...prevData.tests, value]
          : prevData.tests.filter(test => test !== value)
        : value
    }));
  };

  const createInvoiceData = (data) => {
    return {
      images: { logo: "https://via.placeholder.com/150" }, // Placeholder logo, replace with your own URL
      client: {
        company: "Client",
        address: data.clientAddress,
        zip: data.clientZip,
        country: data.clientCountry
      },
      information: {
        number: '2023.0001', // Invoice number
        date: new Date().toISOString().split('T')[0], // Invoice date
        'due-date': new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0] // Due date (15 days from now)
      },
      products: data.tests.map(test => {
        const [description, price] = test.split('|');
        return {
          quantity: 1,
          description,
          'tax-rate': 0,
          price: parseFloat(price)
        };
      }),
      bottomNotice: `Patient Name: ${data.patientName}\nEmail Address: ${data.patientEmail}`,
      settings: {
        currency: "INR",
        locale: "en-IN",
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        format: "A4",
        height: "1000px",
        width: "500px",
        orientation: "portrait"
      }
    };
  };

  const handleSendInvoice = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = createInvoiceData(formData);
      const result = await easyinvoice.createInvoice(data); // Generate the invoice

      const pdfBase64 = result.pdf; // Get the Base64-encoded PDF
      if (!pdfBase64) {
        throw new Error('PDF base64 not found in the result.');
      }

      setPdfBase64(pdfBase64); // Set the state with the generated PDF

      // Download the invoice before sending it
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = 'invoice.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Now send the invoice via email
      const response = await fetch('http://localhost:5000/send-email', { // Ensure URL is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.patientEmail, pdfBase64 })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.success) {
        alert('Invoice sent successfully!');
      } else {
        alert('Failed to send invoice.');
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      setError('An error occurred while sending the invoice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-form">
      <h2>Invoice Form</h2>
      <form id="invoiceForm">
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter Patient's Name"
            required
          />
        </label><br />
        <label>
          Email Address:
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            placeholder="Enter Patient's Email"
            required
          />
        </label><br />
        <label>
          Address:
          <input
            type="text"
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </label><br />
        <label>
          Zip:
          <input
            type="text"
            name="clientZip"
            value={formData.clientZip}
            onChange={handleChange}
            placeholder="Enter Zip Code"
            required
          />
        </label><br />
        <label>
          Country:
          <input
            type="text"
            name="clientCountry"
            value={formData.clientCountry}
            onChange={handleChange}
            placeholder="Enter Country"
            required
          />
        </label><br />

        <fieldset>
          <legend>Select Tests:</legend>
          <label>
            <input
              type="checkbox"
              name="tests"
              value="Blood Test|500"
              checked={formData.tests.includes("Blood Test|500")}
              onChange={handleChange}
            /> Blood Test - ₹500
          </label><br />
          <label>
            <input
              type="checkbox"
              name="tests"
              value="X-Ray|1500"
              checked={formData.tests.includes("X-Ray|1500")}
              onChange={handleChange}
            /> X-Ray - ₹1500
          </label><br />
          <label>
            <input
              type="checkbox"
              name="tests"
              value="Ultrasound|2000"
              checked={formData.tests.includes("Ultrasound|2000")}
              onChange={handleChange}
            /> Ultrasound - ₹2000
          </label><br />
          <label>
            <input
              type="checkbox"
              name="tests"
              value="ECG|2500"
              checked={formData.tests.includes("ECG|2500")}
              onChange={handleChange}
            /> ECG - ₹2500
          </label>
        </fieldset>

        <button
          type="button"
          onClick={handleSendInvoice}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Download & Send Invoice'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default InvoiceForm;
