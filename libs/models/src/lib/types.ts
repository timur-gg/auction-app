// User Roles
export enum UserRole {
  BUYER = 'buyer',
  BUILDER = 'builder',
  ADMIN = 'admin',
}

// User Interfaces
export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Project & Unit Interfaces
export interface IProject {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  builderId: string; // The builder who owns the project
  createdAt: Date;
  updatedAt: Date;
}

export interface IUnit {
  id: string;
  projectId: string;
  name: string;
  description: string;
  size: number; // e.g., in square feet
  bedrooms: number;
  bathrooms: number;
  basePrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Auction & Bidding Interfaces
export interface IAuction {
  id: string;
  unitId: string;
  builderId: string;
  startPrice: number;
  startTime: Date;
  endTime: Date;
  highestBid?: number;
  highestBidderId?: string;
  status: 'pending' | 'active' | 'completed' | 'canceled';
  whitelistedUsers: string[]; // Array of whitelisted user IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface IBid {
  id: string;
  auctionId: string;
  userId: string;
  amount: number;
  timestamp: Date;
}

export interface IAuctionWhitelist {
  id: string;
  auctionId: string;
  userId: string;
  createdAt: Date;
}

// Extended Auction & Lot Details
export interface IAuctionDetails {
  [key: string]: any;
  id: string;
  images: string[];
  price: Partial<Record<number, number>>;
  minPrice: number;
  name: string;
  address: string;
  bedroom: string;
  size: string | number;
  builder: string;
  completionDate: string;
  auctionDate: string;
  status: string;
  parking: string;
  locker: string;
  deposit: string;
  duration: number;
  lot: number;
  lots?: number[];
  lotsAuctioned?: number[];
  bathroom: string;
  cooling?: string;
  heating?: string;
  amenities?: string[];
  lat: number;
  lng: number;
}

export interface ILot {
  [key: string]: any;
  id: number;
  floor?: number;
  totalBids?: number;
  position?: number;
  soldPrice?: number;
  registeredTotal?: number;
  planLink?: string;
  unit: number | string;
  bedroom: number | string;
  facing?: string;
  size: number;
  parking?: number;
  locker?: number;
  bathroom: number;
  bid: number;
  price?: number;
  timeLeft?: number;
  place?: number;
}

export interface ILotPreview {
  [key: string]: any;
  id: number;
  floorRange?: string;
  planLink?: string;
  bedroom: number | string;
  priceRange?: string;
  sizeRange?: string;
  units: number;
}
