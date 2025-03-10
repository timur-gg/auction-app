export interface IAuction {
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
