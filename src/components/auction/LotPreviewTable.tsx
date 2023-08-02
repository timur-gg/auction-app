import { Container, Space, Card, Grid, Center, Text, createStyles,rem, Table } from "@mantine/core";
import AuctionProfileCard from "./AuctionProfileCard";
import PricePlot from "./PricePlot";

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    bidSelector: {
      minWidth: rem(245),
    },
    label: {
      marginBottom: theme.spacing.xs,
      lineHeight: 1,
      fontWeight: 700,
      fontSize: theme.fontSizes.xs,
      letterSpacing: rem(-0.25),
      textTransform: "uppercase",
    },
  
    section: {
      padding: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
    bidButton: {
      marginTop: rem(30),
    },
  }));

  const lots  = [
    {
    "id": 1,
    "bedroom": 0,
    "floor": '1-20',
    "price": '500-600k',
    "size": '300-400',
    'units': '20'
  },
  {
    "id": 2,
    "bedroom": 1,
    "floor": '10-20',
    "price": '600-750k',
    "size": '500-700',
    'units': '25'
  },
  {
    "id": 3,
    "bedroom": 2,
    "floor": '10-30',
    "price": '700-900k',
    "size": '650-800',
    'units': '30'
  },
  {
    "id": 4,
    "bedroom":3,
    "floor": '10-30',
    "price": '800k-1.2m',
    "size": '800-1000',
    'units': '10'
  }
]

 export function LotPreviewTable() {
    const rows = lots.map((element) => (
      <tr key={element.id}>
        <td>{element.bedroom}</td>
        <td>{element.floor}</td>
        <td>${element.price}</td>
        <td>{element.size}sqft</td>
        <td>{element.units}</td>
      </tr>
    ));
  
    return (
      <Table style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th>Bedrooms</th>
            <th>Floors</th>
            <th>Price</th>
            <th>Lot Size</th>
            <th>Units total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }