import {
  Badge,
  Modal,
  Space,
  Text,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconCircleX, IconEdit, IconHomeCancel } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { lotMockData as lots } from '@mocks/auction.tsx';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IAuction, ILot } from '@auction-app/at-models';

export default function AuctionsTable({
  auctions,
  removeAuction,
}: {
  auctions: IAuction[];
  removeAuction: (a: IAuction) => void;
}) {
  const navigate = useNavigate();
  const [removedAuction, setRemovedAuction] = useState<IAuction>();

  const rowClick = (a: IAuction) => {
    navigate(`/auction/${a.id}`);
  };

  const removeAuctionAction = () => {
    if (removedAuction) {
      removeAuction(removedAuction);
    }
    closeQuitModal();
  };

  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        opened={quitModalOpened}
        onClose={closeQuitModal}
        title=""
        centered
      >
        {removedAuction?.status === 'Live Auction' ? (
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
          {...(removedAuction?.status === 'Live Auction'
            ? { ml: 130 }
            : { ml: 80 })}
        >
          {removedAuction?.status === 'Live Auction' ? (
            <Button radius="sm" color="red" onClick={removeAuctionAction}>
              <IconCircleX size="1.05rem" stroke={1.5} />
              <Space w={10} />
              Quit Auction
            </Button>
          ) : (
            <Button radius="sm" color="red" onClick={removeAuctionAction}>
              <IconHomeCancel size="1.6rem" stroke={1.5} />
              <Space w={10} />
              Remove Registration
            </Button>
          )}

          <Button size="xs" radius="sm" onClick={closeQuitModal}>
            Cancel
          </Button>
        </Group>
        <Space h={10} />
      </Modal>

      <DataTable
        highlightOnHover
        style={{ textAlign: 'left' }}
        onRowClick={rowClick}
        columns={[
          { accessor: 'name' },
          { accessor: 'builder' },
          { accessor: 'address' },
          {
            accessor: 'unit',
            title: 'Units',
            render: (a: IAuction) =>
              a.lotsAuctioned
                ?.map((l: number) => lots.find((i) => i.id === l)?.unit)
                .join(', ') || [],
          },
          {
            accessor: 'status',
            title: 'Auction Date',
            render: (a: IAuction) =>
              a.status === 'Live Auction' ? (
                <Badge color="green" size="md" variant="filled">
                  {a.status}
                </Badge>
              ) : a.status === 'passed' ? (
                <Badge color="red" size="md" variant="filled">
                  {a.status}
                </Badge>
              ) : (
                a.auctionDate
              ),
          },
          {
            accessor: 'actions',
            width: 50,
            title: <></>,
            textAlignment: 'right',
            render: (a: IAuction) =>
              a.status === 'upcoming' && (
                <Group spacing={2} position="right" noWrap>
                  <ActionIcon
                    color="gray"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      navigate(`/choose_units/${a.id}`);
                    }}
                  >
                    <IconEdit size={22} />
                  </ActionIcon>
                  <ActionIcon
                    color="gray"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      openQuitModal();
                      setRemovedAuction(a);
                    }}
                  >
                    {/* <IconSquareRoundedX size={22} /> */}
                    <IconHomeCancel size={22} />
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
