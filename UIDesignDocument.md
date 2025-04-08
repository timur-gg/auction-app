
# User Interface Design Document: Pre-Construction Auction Platform

## Layout Structure

### Landing Page
- **Header**: Logo, navigation links (Buy, How It Works, For Builders, Login/Register), and a centered search bar.
- **Hero Section**: Full-width cityscape image background with a large search bar and filters (Price, Beds, Auction Status).
- **Trending Units Strip**: Horizontally scrollable row of featured units (Zillow-style cards).
- **Info Panels**: Three content blocks — How It Works, For Buyers, For Builders — with illustrations and CTA buttons.
- **Map & Listing Preview**: Teaser split-screen (map left, listings right), with option to toggle full map or full list.
- **Footer**: Site info, legal links, social media, builder CTA.

### Buyer Portal
- **Sidebar Navigation**: Dashboard, My Favorites, Auctions (Upcoming, Current, Past), Documents, Profile.
- **Dashboard**: Summary of registered auctions, current bids, and alerts.
- **Live Auction View**: Unit info, bid history feed, countdown timer, "Place Bid" button, watcher count.

### Builder Portal
- **Sidebar Navigation**: My Projects, Upcoming Auctions, Documents, Profile.
- **Dashboard**: Tile-based overview (Project Status, Active Units, Uploads).
- **Project Management View**: Table view of units per project with edit options and auction configuration.
- **Post-Auction Area**: Document review section with download and sign-off tools.

## Core Components

- **Unit Card**: Image carousel, price, auction status badge, countdown (if applicable), favorite button.
- **Map Interface**: Clickable project pins, synced with listing scroll.
- **Search Filters**: Price range, bedrooms, auction status, location.
- **Bid Feed**: Real-time updates on auction activity.
- **Form Wizard**: Step-by-step onboarding and verification for both builders and buyers.

## Interaction Patterns

- **Split-screen Toggle**: Users can toggle between map/list combo or full-screen versions.
- **Live Auction Timer**: 2-minute reset on every bid, open bidding visible to all.
- **Cards for Navigation**: Used for unit listings and dashboard tiles.
- **Real-time Feedback**: Snackbar/toast confirmations for bids, favorites, and document uploads.
- **Form Auto-save**: For longer onboarding/verification flows.

## Visual Design Elements & Color Scheme

- **Primary Colors**:
  - Deep Blue (#1B3A57) – trust and professionalism
  - Sky Blue (#4BA3C7) – accents and highlights
  - Soft Gray (#F5F6F8) – backgrounds and card surfaces

- **Status Colors**:
  - Green (#28A745) – verified, active
  - Red (#DC3545) – error, expired
  - Yellow (#FFC107) – pending, countdown

- **Illustrations & Icons**:
  - Simple flat-style icons for roles (buyer, builder), bidding, documents, auction

## Mobile, Web App, Desktop Considerations

- **Mobile**:
  - Responsive layout with stacked panels
  - Hamburger menu for navigation
  - Horizontal scroll for trending units

- **Web App**:
  - Optimized for 1280px+
  - Toggle between map/listing views
  - Fixed headers for persistent access to search/navigation

- **Desktop**:
  - Extended dashboards with additional detail columns
  - Hover tooltips for clarity on icons and statuses
  - Drag-and-drop support for uploads (builder view)

## Typography

- **Primary Font**: Inter – clean, modern, readable
- **Hierarchy**:
  - H1 (36px) – Page Titles
  - H2 (24px) – Section Headers
  - Body (16px) – Main content
  - Captions (12px) – Metadata and countdowns

## Accessibility

- **Color Contrast**: Meets WCAG AA standards
- **Keyboard Navigation**: Tab-indexed elements for auctions, forms, and listings
- **Screen Reader Support**: ARIA roles on key components (bidding, search, project info)
- **Language Toggle**: Optional support for French (bilingual compliance)

---

## Glossary

- **Unit**: Individual condo available for auction.
- **Project**: A pre-construction building with multiple units.
- **Auction Status**: Label indicating if a unit is live, upcoming, or completed.
- **Bid Feed**: A live stream of auction activity showing the latest bids.
- **Verified User**: A buyer or builder whose documents and identity have been approved.
- **Document Package**: Compiled legal and identity documentation shared post-auction for processing.

