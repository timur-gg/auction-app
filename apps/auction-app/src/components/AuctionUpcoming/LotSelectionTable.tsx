import {
  SegmentedControl,
  Grid,
  Image,
  createStyles,
  useMantineTheme,
  UnstyledButton,
  Modal,
  MantineTheme,
  CSSObject,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IconArrowLeft, IconZoomInArea, IconStar } from '@tabler/icons-react';

import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'mantine-react-table';

import PriceFilter from '../inventory/PriceFilter';
import SizeFilter from '../inventory/SizeFilter';
import FloorFilter from './FloorFilter';
import { lotSelectionStyle } from '../../styles/theme.ts';
import { ILot } from '../../types.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    lotSelectionStyle(theme) as Record<string, CSSObject>,
);

type LotSelectionProps = {
  rowSelection: MRT_RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<MRT_RowSelectionState>>;
  backButtonAction?: () => void;
  lots: ILot[];
};

export function LotSelectionTable({
  rowSelection,
  setRowSelection,
  lots,
  backButtonAction,
}: LotSelectionProps) {
  const [bedroom, setBedroom] = useState<number>(-1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [size, setSizeRange] = useState<[number, number]>([0, 100]);
  const [floorRange, setFloorRange] = useState<[number, number]>([0, 100]);

  const [faves, setFaves] = useState<number[]>([]);

  const [filters, setFilter] = useState<string[]>(['All']);
  const [opened, { open, close }] = useDisclosure(false);

  let modalImage = '';

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== 'All'), filter]);
    }
  };

  const FILTER_MAP: Record<string, (lot: ILot) => boolean> = {
    All: () => true,
    priceRange: (lot: ILot) =>
      (lot.floor ?? 0) >= (priceRange[0] + 20) * 12.5 &&
      (lot.floor ?? 0) <= (priceRange[1] + 20) * 12.5,
    size: (lot: ILot) =>
      Number(lot.size) >= (size[0] + 20) * 12.5 &&
      Number(lot.size) <= (size[1] + 20) * 12.5,
    floor: (lot: ILot) =>
      (lot.floor ?? 0) >= floorRange[0] / 2 &&
      (lot.floor ?? 0) <= floorRange[1] / 2,
    bedroom: (lot: ILot) => {
      if (bedroom === -1) return true;
      return lot.bedroom === bedroom;
    },
  } as const;

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'unit',
          header: 'unit #',
          minSize: 80, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'floor',
          header: 'Floor',
          minSize: 70, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'facing',
          header: 'Facing',
          minSize: 70, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },

        {
          accessorKey: 'bedroom',
          header: 'Bedrooms',
          minSize: 70, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'price',
          header: 'Price',
          minSize: 70, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'size',
          header: 'Size (sqft)',
          minSize: 70, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'plan',
          header: 'Floor Plan',
          minSize: 50, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
        {
          accessorKey: 'fav',
          header: '',
          minSize: 50, //min size enforced during resizing
          maxSize: 180,
          size: 80,
        },
      ] as MRT_ColumnDef<ILot>[],
    [],
  );
  const { classes } = useStyles();

  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  }, [rowSelection]);

  lots.forEach((lot: ILot) => {
    lot.plan = (
      <UnstyledButton onClick={() => openModal(lot.planLink ?? '')}>
        <IconZoomInArea color="grey" />
      </UnstyledButton>
    );
  });

  console.log(faves);

  lots.forEach((lot) => {
    lot.fav = (
      <UnstyledButton
        onClick={() => {
          if (faves.includes(lot.id)) {
            setFaves(faves.filter((f) => f !== lot.id));
          } else {
            setFaves([...faves, lot.id]);
          }
        }}
      >
        <IconStar
          color="gold"
          {...(faves.includes(lot.id)
            ? { style: { fill: 'gold' } }
            : { style: { fill: 'white' } })}
        />
      </UnstyledButton>
    );
  });

  let filteredLots: ILot[] = [...lots];
  filters.forEach((f) => {
    filteredLots = filteredLots.filter(FILTER_MAP[f]);
  });

  const backClick = () => {
    if (backButtonAction) {
      backButtonAction();
    }
  };

  const openModal = (image: string) => {
    modalImage = image;
    console.log(modalImage);
    open();
  };

  const table = useMantineReactTable({
    columns,
    data: filteredLots,
    positionToolbarAlertBanner: 'none',
    enableRowSelection: (row) =>
      Object.keys(rowSelection).includes(row.id) ||
      Object.keys(rowSelection).length < 2,
    enablePagination: false,
    enableColumnActions: false,
    enableSorting: false,
    enableColumnFilterModes: false,
    enableColumnResizing: false,
    enableSelectAll: false,
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableColumnFilters: false,
    enableTopToolbar: true,
    getRowId: (row: ILot) => row.userId,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    mantineTableProps: {
      withColumnBorders: false,
      withBorder: false,
      style: { textAlign: 'left' },
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Grid style={{ width: '100%' }} p={7}>
        {backButtonAction && (
          <Grid.Col xs={6} sm={0.5} md={0.9} my="auto" ta="left">
            <UnstyledButton onClick={backClick}>
              <IconArrowLeft
                size="1.5rem"
                stroke={2}
                className={classes.icon}
              />
            </UnstyledButton>
          </Grid.Col>
        )}

        <Grid.Col xs={6} sm={5} lg={2.9}>
          <SegmentedControl
            color="blue"
            radius="sm"
            transitionDuration={500}
            transitionTimingFunction="linear"
            size="sm"
            data={[
              { label: 'All', value: '-1' },
              { label: '0', value: '0' },
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3+', value: '3' },
            ]}
            onChange={(value) => {
              setBedroom(parseInt(value));
              addFilter('bedroom');
            }}
          />
        </Grid.Col>
        {backButtonAction && (
          <Grid.Col xs={6} sm={3} lg={2.7}>
            <PriceFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              addFilter={addFilter}
            />
          </Grid.Col>
        )}

        <Grid.Col xs={6} sm={3.5} lg={2.7}>
          <SizeFilter
            size={size}
            setSizeRange={setSizeRange}
            addFilter={addFilter}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={3.5} lg={2.7}>
          <FloorFilter
            floor={floorRange}
            setFloor={setFloorRange}
            addFilter={addFilter}
          />
        </Grid.Col>
      </Grid>
    ),
  });

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Image
          maw={400}
          mx="auto"
          radius="md"
          src={
            'https://condonow.com/The-Wyatt-Condos/Floor-Plan-Price/The-Chrome-1-bedroom/images/The-Wyatt-Condos-The-Chrome-1-bedroom-floorplan-v16.jpg'
          }
          alt="Random image"
        />
      </Modal>
      <MantineReactTable table={table} />
    </>
  );
}
