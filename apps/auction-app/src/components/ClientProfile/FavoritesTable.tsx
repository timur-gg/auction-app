import { Badge, Group, ActionIcon } from '@mantine/core';
import { IconBed, IconBath, IconRuler, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { IAuction, ILot } from '../../types.ts';
import { auctionData } from '@mocks/auction.tsx';

export default function FavoritesTable({
  favorites,
  deleteFave,
}: {
  favorites: ILot[];
  deleteFave: (a: ILot) => void;
}) {
  const navigate = useNavigate();

  const rowClick = (lot: ILot) => {
    navigate(`/project/${lot.id}`);
  };

  return (
    <DataTable
      highlightOnHover
      style={{ textAlign: 'left' }}
      columns={[
        { accessor: 'name' },
        { accessor: 'address' },
        { accessor: 'unit', title: 'Unit #' },
        { accessor: 'bedroom', title: <IconBed size="1.2rem" /> },
        { accessor: 'bathroom', title: <IconBath size="1.2rem" /> },
        { accessor: 'size', title: <IconRuler size="1.2rem" /> },
        { accessor: 'bid', title: '$' },
        {
          accessor: 'status',
          title: 'Auction Date',
          render: (lot: ILot) =>
            lot.status === 'Live' ? (
              <Badge color="green" size="md" variant="filled">
                {
                  auctionData.find((a: IAuction) => a.id !== lot.id.toString())
                    ?.status
                }
              </Badge>
            ) : lot.status === 'Passed' ? (
              <Badge color="red" size="md" variant="filled">
                {
                  auctionData.find((a: IAuction) => a.id !== lot.id.toString())
                    ?.status
                }
              </Badge>
            ) : (
              auctionData.find((a: IAuction) => a.id !== lot.id.toString())
                ?.status
            ),
        },
        {
          accessor: 'actions',
          title: <></>,
          width: 20,

          textAlignment: 'right',
          render: (lot: ILot) => (
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
      records={favorites}
      onRowClick={rowClick}
    />
  );
}
