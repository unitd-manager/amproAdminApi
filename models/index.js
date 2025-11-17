import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ampro",
});

console.log("geminiKey", process.env.GEMINI_API_KEY);

// Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Query Gemini model
async function queryGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Remove any markdown or extra formatting
  return text.replace(/```sql/g, "").replace(/```/g, "").trim();
}
// Summarise DB results with Gemini
async function summariseWithGemini(command, dbResult) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const summaryPrompt = `
  The user asked: "${command}".
  The database returned the following raw data:
  ${JSON.stringify(dbResult, null, 2)}.
  Please summarise this result in a short, clear sentence.
  If there are multiple rows, summarise the key insights.
  `;

  const result = await model.generateContent(summaryPrompt);
  return result.response.text().trim();
}

app.post("/command", async (req, res) => {
  const { command } = req.body;

  try {
   const sqlPrompt = `
You are an intelligent MySQL database assistant.

Database schema:
- Tables:
adjust_stock_log, basket, blog, blog_comments, blog_likes, brand, broadcast, broadcast_contact, broadcast_test_recipient, category, comment, contact, content, delivery_order, delivery_order_history, department, enquiry, geo_country, interest, interest_contact, inventory, media, mod_acc_other_action, mod_acc_room, mod_acc_room_user_group, mod_acc_user_group_other_action, order_item, orders, po_product, product, product_color, product_company, product_compare, product_size, purchase_order, section, setting, staff, staff_group, staff_group_history, sub_category, supplier, supplier_receipt, supplier_receipt_history, translation, user_group, valuelist, wish_list.

- Each table has a primary key named <table_name>_id.

Column mapping rules:
- If the user says "name", map to columns like "title", "category_title", etc.
- If the user says "description", map to "description", "details", "info".
- If the user says "price" or "cost", map to "unit_price", "sale_price", or "total_cost".
- Be flexible with synonyms.

⚠️ IMPORTANT:
- Output ONLY the MySQL query.  
- Do NOT add any commentary, explanation, or extra words.  
- The output must start directly with SELECT, INSERT, UPDATE, or DELETE.
- Do not wrap in markdown code fences (\`\`\`sql).

User request: ${command}
`;

    console.log("SQL Prompt:", sqlPrompt);
    const sqlQuery = await queryGemini(sqlPrompt);

    console.log("Generated SQL:", sqlQuery);

    // Step 2: Execute query
    const [rows] = await pool.query(sqlQuery);

    // Step 3: Summarise result
    const summary = await summariseWithGemini(command, rows);

    res.json({
      sql: sqlQuery,
      summary, // human-readable
      raw: rows // optional raw data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(4000, () =>
  console.log("✅ Server running on http://localhost:4000")
);

// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// //import axios from "axios";
// import * as cheerio from "cheerio";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL connection pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ampro",
// });

// console.log("geminiKey", process.env.GEMINI_API_KEY);

// // Gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ------------------
// // Gemini Query Helper
// // ------------------
// async function queryGemini(prompt) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent(prompt);
//   return result.response.text().trim();
// }

// // Summarise DB results with Gemini
// async function summariseWithGemini(command, dbResult) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const summaryPrompt = `
//   The user asked: "${command}".
//   The database returned:
//   ${JSON.stringify(dbResult, null, 2)}.
//   Summarise in a short, clear answer.
//   `;
//   const result = await model.generateContent(summaryPrompt);
//   return result.response.text().trim();
// }

// // ------------------
// // Simple Web Scraper
// // ------------------
// // ------------------
// // Simple Web Scraper (Fixed for node-fetch)
// // ------------------
// async function scrapeWebsite(url) {
//   const response = await fetch(url); // fetch returns a Response
//   const html = await response.text(); // you must call .text() to get HTML
//   const $ = cheerio.load(html);

//   // Get all text from paragraphs and headings
//   let content = "";
//   $("h1, h2, h3, p").each((_, el) => {
//     const text = $(el).text().trim();
//     if (text) content += text + "\n";
//   });

//   return content;
// }


// // ------------------
// // DB Query Endpoint
// // ------------------
// app.post("/command", async (req, res) => {
//   const { command } = req.body;
//   try {
//     const sqlPrompt = `
// You are an intelligent MySQL database assistant.

// Database schema:
// - Tables:
// adjust_stock_log, basket, blog, blog_comments, blog_likes, brand, broadcast, broadcast_contact, broadcast_test_recipient, category, comment, contact, content, delivery_order, delivery_order_history, department, enquiry, geo_country, interest, interest_contact, inventory, media, mod_acc_other_action, mod_acc_room, mod_acc_room_user_group, mod_acc_user_group_other_action, order_item, orders, po_product, product, product_color, product_company, product_compare, product_size, purchase_order, section, setting, staff, staff_group, staff_group_history, sub_category, supplier, supplier_receipt, supplier_receipt_history, translation, user_group, valuelist, wish_list.

// - Each table has a primary key named <table_name>_id.

// Column mapping rules:
// - If the user says "name", map to columns like "title", "category_title", etc.
// - If the user says "description", map to "description", "details", "info".
// - If the user says "price" or "cost", map to "unit_price", "sale_price", or "total_cost".

// ⚠️ IMPORTANT:
// - Output ONLY the MySQL query.
// - Do NOT add any commentary.
// - Must start directly with SELECT, INSERT, UPDATE, or DELETE.

// User request: ${command}
// `;
//     const sqlQuery = await queryGemini(sqlPrompt);
//     console.log("Generated SQL:", sqlQuery);

//     const [rows] = await pool.query(sqlQuery);
//     const summary = await summariseWithGemini(command, rows);

//     res.json({ sql: sqlQuery, summary, raw: rows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ------------------
// // Website Q&A Endpoint
// // ------------------
// app.post("/webqa", async (req, res) => {
//   const { url, question } = req.body;
//   try {
//     const content = await scrapeWebsite(url);

//     const prompt = `
// You are a website assistant.
// The following is content scraped from ${url}:
// ${content}

// The user asks: "${question}".
// Answer using ONLY the scraped content.
// `;
//     const answer = await queryGemini(prompt);

//     res.json({ answer, source: url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));
