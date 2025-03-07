import {IconCalendarEvent, IconClock, IconMoneybag} from "@tabler/icons-react";

export  const auctionMockdata = [
  { label: "auctionDate", icon: IconCalendarEvent },
  { label: "deposit", icon: IconMoneybag },
  { label: "duration", icon: IconClock, unit: "hrs" },
];

export  const lotPreviewData = [
  {
    id: 1,
    bedroom: 0,
    floor: "1-20",
    price: "500-600k",
    size: "300-400",
    units: "20",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },

  {
    id: 2,
    bedroom: 1,
    floor: "10-20",
    price: "600-750k",
    size: "500-700",
    units: "25",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },
  {
    id: 3,
    bedroom: "1+1",
    floor: "1-20",
    price: "620-780k",
    size: "380-750",
    units: "20",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },
  {
    id: 4,
    bedroom: 2,
    floor: "10-30",
    price: "700-900k",
    size: "650-800",
    units: "30",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },
  {
    id: 5,
    bedroom: "2+1",
    floor: "1-20",
    price: "750-950k",
    size: "670-850",
    units: "15",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },
  {
    id: 6,
    bedroom: 3,
    floor: "10-30",
    price: "800k-1.2m",
    size: "800-1000",
    units: "10",
    plan: <></>,
    planLink:
      "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg",
  },
];


export  const builderFavoritesData = [
  {
    name: "King West Towers",
    builder: "Developers Inc",
    address: "100 Spadina",
    status: "Live",
    bid: "570k",
    auctionDate: "Sep 10 2023",
    sold: 10,
  },

  {
    bid: "1m",
    name: "Condo 229",
    address: "35 Queen",
    builder: "Developers Inc",
    status: "Passed",
    sold: 30,
  },
];


export  const clientFavoritesData = [
  {
    id: 1,
    name: 'King West Towers',
    builder: 'Developers Inc',
    address: '100 Spadina',
    status: 'Live',
    bid: '570k',
    auctionDate: 'Sep 10 2023',
    bedroom: 1,
    bathroom: 1,
    size: '550sqft',
    auction: 3,
    unit: 2290,
  },
  {
    id: 2,
    name: 'King West Towers',
    builder: 'Developers Inc',
    address: '100 Spadina',
    status: 'Live',
    bid: '570k',
    auctionDate: 'Sep 10 2023',
    bedroom: 1,
    bathroom: 1,
    size: '570sqft',
    auction: 3,
    unit: 2294,
  },
  {
    id: 3,
    bid: '660k',
    name: 'Condo 223',
    address: '35 Bathurst',
    builder: 'Developers Inc',
    status: 'Sep 10 2023',
    bedroom: '1+1',
    size: '600sqft',
    unit: 2021,
    bathroom: 1,
    auction: 2,
  },
  {
    id: 4,
    bid: '660k',
    name: 'Condo 223',
    address: '35 Bathurst',
    builder: 'Developers Inc',
    status: 'Sep 10 2023',
    bedroom: '1+1',
    size: '600sqft',
    unit: 2236,
    bathroom: 1,
    auction: 2,
  },
  // {
  //   id: 5,
  //   bid: "1m",
  //   name: "Condo 229",
  //   address: "35 Queen",
  //   builder: "Developers Inc",
  //   status: "Passed",
  //   bedroom: "1+1",
  //   bathroom: 2,
  //   size: "620sqft",
  //   auction: 7,
  //   unit: 6675,
  // },
];

export const builderUserData = {
  title: "Mr",
  name: "John Doe",
  email: "johndoe@hotmail.com",
  phone: "+16474722634",
  avatar:
    "https://images.unsplash.com/photo-1612833609249-5e9c9b9b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyZCUyMGF1dGhvcml0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
};
