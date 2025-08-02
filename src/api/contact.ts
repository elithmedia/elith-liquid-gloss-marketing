import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import sqlite3 from 'sqlite3';
import axios from 'axios';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./contacts.db');

// Create contacts table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER || 'contact@elithmedia.ro', // Replace with actual email
      pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password', // Replace with app password
    },
  });
};

// Verify reCAPTCHA
const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe', // Test key
      response: token,
    });
    
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, recaptchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !message || !recaptchaToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    // Save to database
    db.run(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone || null, message],
      function(err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }

        console.log('Contact saved with ID:', this.lastID);
      }
    );

    // Send emails
    const transporter = createTransporter();

    // Email to client (confirmation)
    const clientEmailOptions = {
      from: process.env.GMAIL_USER || 'contact@elithmedia.ro',
      to: email,
      subject: 'Mulțumim pentru mesajul tău - Elith Media',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Mulțumim pentru mesajul tău!</h2>
          <p>Bună ${name},</p>
          <p>Am primit mesajul tău și îți mulțumim pentru interesul acordat serviciilor noastre.</p>
          <p>Echipa noastră va analiza cerința ta și îți va răspunde în cel mai scurt timp posibil, de obicei în termen de 24 de ore.</p>
          <p>Până atunci, te invităm să ne urmărești pe rețelele sociale pentru a vedea ultimele noastre proiecte și campanii.</p>
          <p>Cu stimă,<br>Echipa Elith Media</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Elith Media<br>
            Strada Exemplu 123, București<br>
            +40 XXX XXX XXX<br>
            contact@elithmedia.ro
          </p>
        </div>
      `,
    };

    // Email to agency (notification)
    const agencyEmailOptions = {
      from: process.env.GMAIL_USER || 'contact@elithmedia.ro',
      to: process.env.GMAIL_USER || 'contact@elithmedia.ro',
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="margin-top: 20px;">
            <small>Submitted at: ${new Date().toLocaleString('ro-RO')}</small>
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(clientEmailOptions),
      transporter.sendMail(agencyEmailOptions),
    ]);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server (for development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;