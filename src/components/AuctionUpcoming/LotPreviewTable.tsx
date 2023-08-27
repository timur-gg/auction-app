import {
  Container,
  Space,
  Card,
  Grid,
  Image,
  Text,
  createStyles,
  rem,
  Table,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import AuctionProfileCard from "./AuctionProfileCard";
import PricePlot from "../AuctionLive/PricePlot";
import { useDisclosure } from "@mantine/hooks";
import { IconZoomInArea } from "@tabler/icons-react";

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

const lots = [
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
    id: 4,
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
    id: 5,
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
    id: 4,
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

export function LotPreviewTable() {
  let modalImage = "";
  const openModal = (image: string) => {
    modalImage = image;
    open();
  };

  lots.forEach((lot) => {
    lot.plan = (
      <UnstyledButton onClick={() => openModal(lot.planLink)}>
        <IconZoomInArea color="grey" />
      </UnstyledButton>
    );
  });

  const rows = lots.map((element) => (
    <tr key={element.id}>
      <td>{element.bedroom}</td>
      <td>{element.floor}</td>
      <td>${element.price}</td>
      <td>{element.size}sqft</td>
      <td>{element.units}</td>
      <td>{element.plan}</td>
    </tr>
  ));

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Image
          maw={400}
          mx="auto"
          radius="md"
          src={
            "https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg"
          }
          alt="Random image"
        />
      </Modal>
      <Table style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th>Bedrooms</th>
            <th>Floors</th>
            <th>Price</th>
            <th>Lot Size</th>
            <th>Units total</th>
            <th>Floor plans</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
