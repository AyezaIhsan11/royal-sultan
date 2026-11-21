# 👑 Royal Sultan - Premium Basmati Rice (MERN Stack)

> **"Khushbu Jo Royal Ho"** • Pure Punjab 1121 Kainat Basmati Rice  
> A high-performance, fullstack MERN eCommerce & B2B Export Logistics Platform.

---

## 🌟 Key Features

* **Interactive Rice & Packaging Configurator (B2C):** Dynamic selection of rice varieties, processing finishes (Steam, Sella, Raw), and packaging sizes (1kg, 5kg, 10kg, 20kg, 40kg) with live price calculation and spec visualization.
* **B2B Container Load Logistics Calculator:** Live FCL capacity estimator for 20ft (25 MT) and 40ft (28 MT) containers, computing total bags and shipping tonnage for major ports (Jebel Ali, Dammam, Rotterdam, London, Houston).
* **Direct Export RFQ Generator:** Submits formal container export inquiries directly to MongoDB.
* **Sliding Cart Drawer & Express Checkout:** Cart state management with free delivery progress meter, cash on delivery, and WhatsApp order confirmation links.
* **Royal Design System:** Custom luxury palette inspired by raw silk and polished Mughal gold (**Royal Skin & Off-White** `#FAF7F2` with **Antique Gold** `#B88E28`).

---

## 🏗️ MERN Stack Architecture

* **MongoDB:** Cloud database via Mongoose with cached connection pooling for serverless environments.
  * `Product` model (varieties, milling finishes, tiers, specs)
  * `Order` model (customer details, items, delivery fee, order codes)
  * `RfqInquiry` model (B2B container specifications, target ports, metric tons)
* **Express.js & Node.js:** Clean RESTful API with CORS, error handling, and offline fallback mode.
* **React.js (Vite):** Fast, componentized client with custom CartContext state management.
* **Vercel Serverless Ready:** Pre-configured `vercel.json` routing API requests to serverless handlers.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
# Install root (backend) dependencies
npm install

# Install client (frontend) dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/royalsultan?retryWrites=true&w=majority
PORT=5000
```
*(Note: If you run without `MONGODB_URI`, the server will automatically run in resilient offline mode with fallback seed data).*

### 3. Seed MongoDB (Optional)
```bash
npm run seed
```

### 4. Run Both Client & Server Concurrently
```bash
npm run dev
```
* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:5000/api`

---

## 🚢 Deploy to Vercel

1. Push this repository to your GitHub account (`AyezaIhsan11/royal-sultan`).
2. Log into [vercel.com](https://vercel.com) and click **"Add New..."** → **"Project"**.
3. Select `royal-sultan` and click **Import**.
4. In **Environment Variables**, add:
   * Key: `MONGODB_URI`
   * Value: `your_mongodb_atlas_connection_string`
5. Click **Deploy**. Vercel will build the React frontend and deploy the serverless Express API with automatic SSL.

---

## 📜 License
Product of Pakistan 🇵🇰 • Developed for Royal Sultan Basmati Rice.
