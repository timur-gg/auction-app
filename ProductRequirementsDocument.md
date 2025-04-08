
# Product Requirements Document: Pre-Construction Auction Platform

## 1. Elevator Pitch

A live auction platform for pre-construction condo units in Ontario, Canada, connecting builders with buyers and investors. The platform curates auctions on behalf of builders, who define the minimum price and eligible units. Verified buyers compete in real-time auctions with transparent bidding, offering a seamless experience that maximizes sale price and minimizes sales timelines for builders, while offering a unique opportunity for tech-savvy and seasoned real estate investors.

## 2. Who is this app for

- **Builders / Construction Companies**: Seeking a streamlined, high-visibility sales channel for their pre-construction inventory with minimal effort.
- **Buyers**: Everyday individuals looking to own pre-construction condos.
- **Investors**: Real estate investors interested in competitive pricing and early-stage access to developments.

## 3. Functional Requirements

### For Builders
- Register and authenticate as verified builder users.
- Create and manage projects with unit details, location, floor plans, and auction eligibility.
- Set minimum prices per unit and schedule them for curated auction.
- View auction results and manage post-auction document workflows.

### For Buyers
- Explore an open map interface of upcoming and past projects.
- Save favorites and register for upcoming auctions.
- Register, verify identity and documents to gain access to live bidding.
- Choose up to 2 units per auction and place live bids in real-time.
- Get notified if they win and proceed with purchase documentation flow.

### Auction Mechanics
- Live auction with 2-minute countdown resets after each new bid.
- Open bidding: all participants can see the current highest bid.
- Bid increments are enforced at 1.5%.
- Winning bid is finalized when no new bids are placed within 2 minutes.

### Post-Auction
- Notify winners and builders.
- Facilitate signing of purchase agreements.
- Collect and compile buyer documentation into a legal package for builder/legal team review.

## 4. User Stories

### As a buyer:
- I want to explore condos on a map so I can find projects by location.
- I want to favorite units so I can come back to them later.
- I want to register and verify my identity so I can participate in auctions.
- I want to bid live and see the highest bid so I know how competitive the auction is.
- I want to receive confirmation and start the purchase process if I win.

### As a builder:
- I want to register and verify my company so I can list projects.
- I want to upload units and set minimum prices to prepare them for auction.
- I want to see auction results to understand buyer behavior.
- I want to receive buyer information and documents post-auction to continue the sales process.

## 5. User Interface

### General (Public)
- Interactive map view showing all available and upcoming projects (buildings).
- Search/filter by location, price range, developer, unit size.
- Unit detail pages with renderings, floorplans, auction dates, unit details.
- Project detail pages with renderings, floorplans, auction dates, building and project details.

### Buyer Portal
- Dashboard with registered auctions and saved units.
- Verification process and document upload section.
- Live auction screen showing countdown, highest bid, unit details, and bid button.

### Builder Portal
- Project management dashboard with unit status (upcoming, live, sold).
- Upload tools for units, pricing, documents, renderings.
- Post-auction dashboard to view buyer info and download completed paperwork packages.

