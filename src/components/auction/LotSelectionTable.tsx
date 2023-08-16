import {
  SegmentedControl,
  Space,
  Grid,
  Text,
  createStyles,
  rem,
  useMantineTheme,
  Group,
  UnstyledButton,
} from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons-react";

import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "mantine-react-table";

import PriceFilter from "../inventory/PriceFilter";
import SizeFilter from "../inventory/SizeFilter";
import FloorFilter from "./FloorFilter";

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
  thumb: {
    width: rem(16),
    height: rem(28),
    backgroundColor: theme.white,
    color: theme.colors.gray[5],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[3]
    }`,
  },
  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

type LotSelectionProps = {
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Function | any;
  lots: any[];
  backButtonAction: Function;
  // setFloor: Function;
};

export function LotSelectionTable(props: LotSelectionProps) {
  const [bedroom, setBedroom] = useState<number>(-1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [size, setSizeRange] = useState<[number, number]>([0, 100]);
  const [floorRange, setFloorRange] = useState<[number, number]>([0, 100]);

  const [filters, setFilter] = useState<string[]>(["All"]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== "All"), filter]);
    }
  };

  console.log(floorRange);

  const FILTER_MAP: { [char: string]: any } = {
    All: () => true,
    priceRange: (lot: any) =>
      lot.price >= (priceRange[0] + 20) * 12.5 &&
      lot.price <= (priceRange[1] + 20) * 12.5,

    size: (lot: any) =>
      lot.size >= (size[0] + 20) * 12.5 && lot.size <= (size[1] + 20) * 12.5,
    floor: (lot: any) =>
      lot.floor >= floorRange[0] / 2 && lot.floor <= floorRange[1] / 2,
    bedroom: (lot: any) => {
      if (bedroom === -1) return true;
      else return lot.bedroom === bedroom;
    },
  };

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "unit",
          header: "unit #",
          minSize: 100, //min size enforced during resizing
          size: 80,
        },

        {
          accessorKey: "bedroom",
          header: "Bedrooms",
          minSize: 100, //min size enforced during resizing
          maxSize: 200,
          size: 80,
        },
        {
          accessorKey: "price",
          header: "Price",
          minSize: 100, //min size enforced during resizing
          maxSize: 200,
          size: 80,
        },
        {
          accessorKey: "size",
          header: "Size (sqft)",
          minSize: 100, //min size enforced during resizing
          maxSize: 200,
          size: 80,
        },
      ] as MRT_ColumnDef<any>[],
    []
  );
  const { classes } = useStyles();

  const { rowSelection, setRowSelection, lots, backButtonAction } = props;
  console.log(rowSelection);

  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  }, [rowSelection]);

  const { colorScheme } = useMantineTheme();

  var filteredLots: any = lots;
  filters.forEach((f) => {
    filteredLots = filteredLots.filter(FILTER_MAP[f]);
  });

  const backClick = () => {
    backButtonAction();
  };

  const table = useMantineReactTable({
    columns,
    data: filteredLots,
    positionToolbarAlertBanner: "none",
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
    getRowId: (row: any) => row.userId,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    mantineTableProps: {
      withColumnBorders: false,
      withBorder: false,
      style: { textAlign: "left" },
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Grid style={{ width: "100%" }} p={7}>
        <Grid.Col xs={6} sm={0.5} md={0.9} my="auto" ta="left">
          <UnstyledButton onClick={backClick}>
            <IconArrowLeft size="1.5rem" stroke={2} className={classes.icon} />
          </UnstyledButton>
        </Grid.Col>
        <Grid.Col xs={6} sm={5} lg={2.9}>
          <SegmentedControl
            color="blue"
            radius="sm"
            transitionDuration={500}
            transitionTimingFunction="linear"
            size="sm"
            data={[
              { label: "All", value: "-1" },
              { label: "0", value: "0" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3+", value: "3" },
            ]}
            onChange={(value) => {
              setBedroom(parseInt(value));
              addFilter("bedroom");
            }}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={3} lg={2.7}>
          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            addFilter={addFilter}
          />
        </Grid.Col>
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

  const rows = lots.map((element) => (
    <tr key={element.id}>
      <td>{element.unit}</td>
      <td>{element.bedroom}</td>
      <td>{element.floor}</td>
      <td>${element.price}</td>
      <td>{element.size}sqft</td>
    </tr>
  ));

  return <MantineReactTable table={table} />;
}
