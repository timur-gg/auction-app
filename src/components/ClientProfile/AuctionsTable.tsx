import {
  Badge,
  Modal,
  Space,
  Text,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconDoorExit, IconRuler, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auctionData, lots } from "../../data.js";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function AuctionsTable(props: any) {
  const { auctions, removeAuction } = props;
  const navigate = useNavigate();

  const rowClick = (a: any) => {
    navigate(`/auction/${a.id}`);
  };

  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  const [removedAuction, setRemovedAuction] = useState<any>();
  return (
    <>
      <Modal
        opened={quitModalOpened}
        onClose={closeQuitModal}
        title="Bid Confirmation"
        centered
      >
        <Space h={15} />

        {removedAuction?.status === "Live Auction" ? (
          <>
            <Text ta="center" size="md" fw={400}>
              Are you sure that you want to quit the auction?
            </Text>
            <Space h={10} />
            <Text ta="center" size="md" fw={400}>
              You will not have an option to participate in this auction again.
            </Text>
          </>
        ) : (
          <Text ta="center" size="md" fw={400}>
            Are you sure that you want to remove your registration for the
            auction?
          </Text>
        )}

        <Space h={25} />
        <Group>
          <Text>Project:</Text> <Text fw={700}>King West Towers</Text>
        </Group>
        <Group>
          <Text>Lot #:</Text> <Text fw={700}>20212</Text>
        </Group>
        <Space h={30} />
        <Group
          spacing={30}
          {...(removedAuction?.status === "Live Auction"
            ? { ml: 130 }
            : { ml: 80 })}
        >
          {removedAuction?.status === "Live Auction" ? (
            <Button
              radius="sm"
              color="red"
              onClick={() => {
                removeAuction(removedAuction);
                closeQuitModal();
              }}
            >
              <IconDoorExit size="1.05rem" stroke={1.5} />
              <Space w={10} />
              Quit Auction
            </Button>
          ) : (
            <Button
              radius="sm"
              color="red"
              onClick={() => {
                removeAuction(removedAuction);
                closeQuitModal();
              }}
            >
              <IconDoorExit size="1.05rem" stroke={1.5} />
              <Space w={10} />
              Remove Registration
            </Button>
          )}

          <Button size="xs" radius="sm" onClick={closeQuitModal}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <DataTable
        highlightOnHover
        style={{ textAlign: "left" }}
        onRowClick={rowClick}
        columns={[
          { accessor: "name" },
          { accessor: "builder" },
          { accessor: "address" },
          {
            accessor: "unit",
            title: "Units",
            render: (a) =>
              a.lotsAuctioned
                ?.map((l: number) => lots.find((i) => i.id === l)?.unit)
                .join(", ") || [],
          },
          {
            accessor: "status",
            render: (lot) =>
              lot.status === "Live Auction" ? (
                <Badge color="green" size="md" variant="filled">
                  {lot.status}
                </Badge>
              ) : lot.status === "passed" ? (
                <Badge color="red" size="md" variant="filled">
                  {lot.status}
                </Badge>
              ) : (
                lot.auctionDate
              ),
          },
          {
            accessor: "actions",
            title: <></>,
            textAlignment: "right",
            render: (lot) =>
              lot.status !== "passed" && (
                <Group spacing={4} position="right" noWrap>
                  <ActionIcon
                    color="gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuitModal();
                      setRemovedAuction(lot);
                    }}
                  >
                    <IconDoorExit size={16} />
                  </ActionIcon>
                </Group>
              ),
          },
        ]}
        records={auctions}
      />
    </>
  );
}
