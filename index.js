const express = require('express');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Sample Data for Leads and Campaigns
const leads = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', status: 'new' },
    { id: 2, name: 'Michael Brown', email: 'michael.b@example.com', status: 'qualified' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@example.com', status: 'contacted' },
    { id: 4, name: 'David Wilson', email: 'david.w@example.com', status: 'closed' }
];

const campaigns = [
    { id: 1, name: 'Spring Sale 2024', leads_generated: 300 },
    { id: 2, name: 'Black Friday Blast', leads_generated: 500 },
    { id: 3, name: 'New Year Campaign', leads_generated: 150 }
];

// Fetch Leads Data
app.get('/leads', (req, res) => {
    res.json(leads);
});

// Fetch Campaigns Data
app.get('/campaigns', (req, res) => {
    res.json(campaigns);
});

// Generate CSV Report for Leads and Campaigns
app.get('/report/csv', (req, res) => {
    const fields = ['id', 'name', 'email', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(leads);

    res.header('Content-Type', 'text/csv');
    res.attachment('report_leads.csv');
    return res.send(csv);
});


// Nodemailer Config for Email Alerts
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

// Email Alert Function
function sendEmailAlert() {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'Lead Alert: Low Lead Count',
        text: 'Warning: The number of leads has dropped below the threshold.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

// Check Lead Count and Trigger Email Alert
const leadCountThreshold = 3;
app.get('/check-leads', (req, res) => {
    if (leads.length < leadCountThreshold) {
        sendEmailAlert();
    }
    res.send(`Lead count is ${leads.length}`);
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
