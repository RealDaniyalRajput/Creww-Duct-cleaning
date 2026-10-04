import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory inquiry storage for audit & intake logging
interface Inquiry {
  id: string;
  type: 'quote' | 'callback';
  data: Record<string, any>;
  receivedAt: string;
  sentTo: string;
}

const inquiries: Inquiry[] = [];

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'CREWW DUCT CLEANING API' });
});

// Quote submission endpoint
app.post('/api/quote', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      propertyType,
      serviceNeeded,
      fullAddress,
      zipCode,
      preferredDate,
      preferredTime,
      additionalDetails,
      promoApplied,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !propertyType ||
      !serviceNeeded ||
      !fullAddress ||
      !zipCode ||
      !preferredDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. All fields except Additional Details are required.',
      });
    }

    const inquiryId = `QUOTE-${Date.now().toString(36).toUpperCase()}`;
    const inquiry: Inquiry = {
      id: inquiryId,
      type: 'quote',
      data: {
        fullName,
        phone,
        email,
        propertyType,
        serviceNeeded,
        fullAddress,
        zipCode,
        preferredDate,
        preferredTime,
        additionalDetails: additionalDetails || 'None',
        promoApplied: !!promoApplied,
      },
      receivedAt: new Date().toISOString(),
      sentTo: 'crewwductcleaning@gmail.com',
    };

    inquiries.push(inquiry);

    console.log(`[CREWW DUCT CLEANING] New Quote Request ${inquiryId}:`, JSON.stringify(inquiry, null, 2));

    return res.status(200).json({
      success: true,
      inquiryId,
      message: 'Your quote request has been submitted successfully to the CREWW Duct Cleaning team.',
    });
  } catch (error) {
    console.error('Error handling quote submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your quote request.',
    });
  }
});

// Callback submission endpoint (simplified as requested)
app.post('/api/callback', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      preferredDate,
      preferredTime,
      additionalDetails,
    } = req.body;

    if (!fullName || !phone || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. Full Name, Phone Number, Preferred Date, and Preferred Time are required.',
      });
    }

    const inquiryId = `CALLBACK-${Date.now().toString(36).toUpperCase()}`;
    const inquiry: Inquiry = {
      id: inquiryId,
      type: 'callback',
      data: {
        fullName,
        phone,
        preferredDate,
        preferredTime,
        additionalDetails: additionalDetails || 'None',
      },
      receivedAt: new Date().toISOString(),
      sentTo: 'crewwductcleaning@gmail.com',
    };

    inquiries.push(inquiry);

    console.log(`[CREWW DUCT CLEANING] New Callback Request ${inquiryId}:`, JSON.stringify(inquiry, null, 2));

    return res.status(200).json({
      success: true,
      inquiryId,
      message: 'Thank you. Your callback request has been received. Our team will review your preferred time and contact you.',
    });
  } catch (error) {
    console.error('Error handling callback submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your callback request.',
    });
  }
});

// Book Your Service endpoint
app.post('/api/book', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      serviceNeeded,
      fullAddress,
      zipCode,
      preferredDate,
      preferredTime,
      additionalDetails,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !serviceNeeded ||
      !fullAddress ||
      !zipCode ||
      !preferredDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. All fields except Additional Details are required.',
      });
    }

    const inquiryId = `BOOK-${Date.now().toString(36).toUpperCase()}`;
    const inquiry: Inquiry = {
      id: inquiryId,
      type: 'quote',
      data: {
        fullName,
        phone,
        email,
        serviceNeeded,
        fullAddress,
        zipCode,
        preferredDate,
        preferredTime,
        additionalDetails: additionalDetails || 'None',
      },
      receivedAt: new Date().toISOString(),
      sentTo: 'crewwductcleaning@gmail.com',
    };

    inquiries.push(inquiry);

    console.log(`[CREWW DUCT CLEANING] New Booking Request ${inquiryId}:`, JSON.stringify(inquiry, null, 2));

    return res.status(200).json({
      success: true,
      inquiryId,
      message: 'Thank you. Your service booking request has been received. Our team will review your details and contact you.',
    });
  } catch (error) {
    console.error('Error handling service booking submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your booking request.',
    });
  }
});

// Setup dev vs prod static/Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CREWW DUCT CLEANING Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
