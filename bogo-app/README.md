# BOGO Offers & Banners for Shopify

Complete BOGO app with banners and notifications.

## Setup

1. Clone repository
2. `npm install`
3. Create `.env` file with:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=3000
   ```
4. `npm start`

## API Endpoints

- `POST /api/offers` - Create offer
- `GET /api/offers/:shop` - Get offers
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

Similar endpoints for `/api/banners`

## Access Admin

Visit: `http://localhost:3000`
