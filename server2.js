import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

 // allow all origins


const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({ origin: "*" }));

// ⚠️ Insert your Gemini API key here
const GEMINI_API_KEY = "AIzaSyBX2hdnxfXKAKL-MiA6-posegt2_hBQbwA";

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



// Chat endpoint
// ---------------- Chat Route ----------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "⚠️ No message provided." });
    }

    console.log("💬 User asked:", message);

    // Call Gemini
    const result = await model.generateContent(message);

    // Defensive check
    const reply =
      result?.response?.text?.() || "⚠️ AI did not return any response.";

    console.log("🤖 AI replied:", reply.slice(0, 100), "...");

    res.json({ reply });

  } catch (err) {
    console.error("❌ Chat error:", err);

    // Always return a response instead of crashing
    res.status(500).json({
      reply: "⚠️ AI request failed. Please try again in a moment."
    });
  }
});

import multer from "multer";
// import pdfParse from "pdf-parse";

const upload = multer();

// PDF Summarize endpoint
// app.post("/api/pdf-summary", upload.single("pdf"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ reply: "No PDF uploaded." });

//     const data = await pdfParse(req.file.buffer);
//     const text = data.text.substring(0, 5000); // avoid token overload

//     const result = await model.generateContent("Summarize this PDF:\n" + text);
//     res.json({ reply: result.response.text() });
//   } catch (err) {
//     console.error("PDF Summary Error:", err);
//     res.status(500).json({ reply: "⚠️ Failed to summarize PDF." });
//   }
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
// server2.js



// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import fs from "fs";
// import path from "path";
// import multer from "multer";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { DOMMatrix } from "canvas";
// // global.DOMMatrix = DOMMatrix;




// // ---------------- Gemini API ----------------
// const GEMINI_API_KEY = "AIzaSyBX2hdnxfXKAKL-MiA6-posegt2_hBQbwA"; // put key directly here
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// // ---------------- Setup ----------------
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// // ---------------- Routes ----------------

// // Simple chat
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ reply: "⚠️ No message provided." });

//     const result = await model.generateContent(message);
//     res.json({ reply: result.response.text() });
//   } catch (err) {
//     console.error("Chat error:", err);
//     res.status(500).json({ reply: "⚠️ Error generating response." });
//   }
// });

// // PDF summary
// // 📄 Summarize plain text
// app.post("/api/summarize", async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) return res.status(400).json({ summary: "⚠️ No text provided for summary." });

//     const result = await model.generateContent(`Summarize this page text in short and simple points:\n\n${text}`);
//     res.json({ summary: result.response.text() });
//   } catch (error) {
//     console.error("Summarize API error:", error);
//     res.status(500).json({ summary: "⚠️ Error generating summary." });
//   }
// });


// // ---------------- Start ----------------
// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));






// import express from "express";
// import cors from "cors";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import multer from "multer";

// // Import the PDF.js version that works in Node.js
// import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';

// // Set up the worker
// pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ⚠️ Insert your Gemini API key here
// const GEMINI_API_KEY = "AIzaSyBX2hdnxfXKAKL-MiA6-posegt2_hBQbwA";

// // Initialize Gemini model
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Configure multer for memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed'), false);
//     }
//   }
// });

// // Error handling middleware
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ reply: "File too large. Please upload a PDF smaller than 10MB." });
//     }
//   }
//   if (error.message === 'Only PDF files are allowed') {
//     return res.status(400).json({ reply: "Only PDF files are allowed." });
//   }
//   next(error);
// });

// // Chat endpoint
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ reply: "No message provided." });

//     const result = await model.generateContent(message);
//     res.json({ reply: result.response.text() });
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     res.status(500).json({ reply: "⚠️ Error connecting to Gemini API. Please try again." });
//   }
// });

// // PDF Text Extraction using PDF.js
// app.post("/api/pdf-summary", upload.single("pdf"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ reply: "No PDF file uploaded. Please select a PDF file." });
//     }

//     // Extract text from PDF
//     const text = await extractTextFromPDF(req.file.buffer);
    
//     if (!text || text.trim().length === 0) {
//       return res.status(400).json({ 
//         reply: "The PDF appears to be empty or contains only images. Please upload a PDF with readable text." 
//       });
//     }

//     // Limit text length to avoid token limits
//     const limitedText = text.substring(0, 12000);
    
//     // Create a prompt for summarization
//     const prompt = `
// Please analyze and summarize this PDF document. Provide:

// 1. A comprehensive overview of the main topics
// 2. Key points and important details
// 3. Any conclusions or recommendations mentioned
// 4. The overall purpose of the document

// PDF content:
// ${limitedText}
// `;

//     const result = await model.generateContent(prompt);
//     res.json({ reply: result.response.text() });
    
//   } catch (err) {
//     console.error("PDF Summary Error:", err);
    
//     if (err.message.includes('Unexpected token') || err.message.includes('PDF')) {
//       return res.status(400).json({ 
//         reply: "Failed to process the PDF. The file might be corrupted or contain scanned images instead of text." 
//       });
//     }
    
//     res.status(500).json({ 
//       reply: "⚠️ Server error while processing PDF. Please try again with a different file." 
//     });
//   }
// });

// // PDF text extraction using pdfjs-dist
// async function extractTextFromPDF(buffer) {
//   try {
//     // Convert buffer to Uint8Array
//     const uint8Array = new Uint8Array(buffer);
    
//     // Load the PDF document
//     const loadingTask = pdfjs.getDocument(uint8Array);
//     const pdfDocument = await loadingTask.promise;
    
//     let fullText = '';
    
//     // Extract text from each page (limit to first 20 pages for performance)
//     const maxPages = Math.min(pdfDocument.numPages, 20);
    
//     for (let i = 1; i <= maxPages; i++) {
//       const page = await pdfDocument.getPage(i);
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items.map(item => item.str).join(' ');
//       fullText += pageText + '\n';
//     }
    
//     await pdfDocument.destroy();
    
//     if (!fullText || fullText.trim().length === 0) {
//       throw new Error('No text could be extracted from the PDF');
//     }
    
//     return fullText;
//   } catch (error) {
//     console.error("PDF text extraction error:", error);
//     throw new Error("Could not extract text from PDF. It may be a scanned document or protected PDF.");
//   }
// }

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is running" });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));




