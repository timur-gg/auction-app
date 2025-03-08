import { Badge, Group, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { lotMockData as lots } from '@mocks/auction.tsx';
import { IAuction } from '../../types.ts';

export default function ProjectsTable({
  auctions,
  deleteFave,
}: {
  auctions: IAuction[];
  deleteFave: (a: IAuction) => void;
}) {
  const navigate = useNavigate();

  const rowClick = (lot: IAuction) => {
    console.log(lot.id);
    navigate(`/project/${lot.id}`);
  };
  return (
    <DataTable
      highlightOnHover
      style={{ textAlign: 'left' }}
      columns={[
        { accessor: 'name' },
        { accessor: 'builder' },
        { accessor: 'address' },
        {
          accessor: 'unit',
          title: 'Units',
          render: (a) =>
            a.lotsAuctioned
              ?.map((l: number) => lots.find((i) => i.id === l)?.unit)
              .join(', ') || [],
        },

        {
          accessor: 'status',
          title: 'Auction Date',
          render: (lot) =>
            lot.status === 'Live Auction' ? (
              <Badge color="green" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : lot.status === 'passed' ? (
              <Badge color="red" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : (
              lot.auctionDate
            ),
        },

        {
          accessor: 'actions',
          title: <></>,
          textAlignment: 'right',
          width: 20,
          render: (lot) => (
            <Group spacing={4} position="right" noWrap>
              <ActionIcon
                color="red"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteFave(lot);
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={auctions}
      onRowClick={rowClick}
    />
  );
}
