<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Astroveda - Your Celestial Compass

An India-first Vedic Astrology platform powered by AI, providing personalized cosmic insights and guidance.

## Features

- **Personalized Astrological Predictions**: Get insights based on your birth chart (Lagna, Rashi, Nakshatra, Dasha)
- **Decision Simulator**: Compare different life paths with astrological guidance
- **Two-Tier Payment System**: 
  - Basic Prediction (₹10) - Essential cosmic guidance
  - Premium Prediction (₹99) - Deep, accurate cosmic analysis

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```env
   # SambaNova API (for AI predictions)
   SAMBANOVA_API_KEY=fc3cafff-21b3-4ab8-a6b2-980be9e21639

   # Razorpay Payment Gateway
   RAZORPAY_KEY_ID=your_razorpay_key_id
   
   # Optional: Razorpay Payment Button IDs (if using payment links)
   RAZORPAY_BASIC_BUTTON_ID=pl_xxxxx  # For ₹10 basic plan
   RAZORPAY_PREMIUM_BUTTON_ID=pl_xxxxx  # For ₹99 premium plan
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Payment Setup

### Razorpay Configuration

1. **Get your Razorpay Key ID**:
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Go to Settings → API Keys
   - Copy your Key ID and add it to `.env` as `RAZORPAY_KEY_ID`

2. **For Production** (Recommended):
   - Create a backend server to securely create Razorpay orders
   - Verify payment signatures on your backend
   - Never expose your Razorpay Secret Key in frontend code

3. **Using Payment Links** (Alternative):
   - Create payment links in Razorpay Dashboard for ₹10 and ₹99
   - Add the payment button IDs to `.env`:
     - `RAZORPAY_BASIC_BUTTON_ID` for ₹10
     - `RAZORPAY_PREMIUM_BUTTON_ID` for ₹99

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SAMBANOVA_API_KEY` | SambaNova API key for AI predictions | Yes |
| `RAZORPAY_KEY_ID` | Razorpay Key ID for payments | Yes (for payments) |
| `RAZORPAY_BASIC_BUTTON_ID` | Payment link ID for ₹10 plan | Optional |
| `RAZORPAY_PREMIUM_BUTTON_ID` | Payment link ID for ₹99 plan | Optional |

## Tech Stack

- React + TypeScript
- Vite
- SambaNova AI API
- Razorpay Payment Gateway
- Tailwind CSS
