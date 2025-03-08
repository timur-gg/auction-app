import {
  Image,
  Table,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconZoomInArea } from "@tabler/icons-react";
import { lotPreviewData as lots } from '@mocks/auction.tsx';

// const useStyles = createStyles((theme) => (
//   lotPreviewTableStyle(theme)
// ));

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
