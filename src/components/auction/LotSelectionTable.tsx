import {
  Container,
  SegmentedControl,
  Space,
  Card,
  Grid,
  Center,
  Text,
  createStyles,
  rem,
  Table,
  Flex,
  Button,
  useMantineTheme,
  Group,
  RangeSlider,
} from "@mantine/core";

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
}));

type LotSelectionProps = {
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Function | any;
  lots: any[];
  // addFilter: Function;
  // setFloor: Function;
};

export function LotSelectionTable(props: LotSelectionProps) {
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

  const { rowSelection, setRowSelection, lots } = props;
  console.log(rowSelection);

  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  }, [rowSelection]);

  const { colorScheme } = useMantineTheme();

  const table = useMantineReactTable({
    columns,
    data: lots,
    positionToolbarAlertBanner: "none",
    enableRowSelection: (row) =>
      Object.keys(rowSelection).includes(row.id) ||
      Object.keys(rowSelection).length < 3,
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
        <Grid.Col xs={6} sm={5} lg={3.5}>
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
            // onChange={(value) => {
            //   setBedroom(parseInt(value));
            //   addFilter("bedroom");
            // }}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={3} lg={2.833333333}>
          <PriceFilter
            priceRange={[0, 1000]}
            setPriceRange={() => ""}
            addFilter={() => ""}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4} lg={2.833333333}>
          <SizeFilter
            size={[0, 1000]}
            setSizeRange={() => ""}
            addFilter={() => ""}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4} lg={2.833333333}>
          <FloorFilter
            floor={[0, 100]}
            setFloor={() => ""}
            addFilter={() => ""}
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

  return (
    <div>
      {/* <Grid>
        <Grid.Col span={4}>
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
            // onChange={(value) => {
            //   setBedroom(parseInt(value));
            //   addFilter("bedroom");
            // }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <PriceFilter
            priceRange={[0, 1000]}
            setPriceRange={() => ""}
            addFilter={() => ""}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          
        </Grid.Col>
      </Grid>
      <Table style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th>Unit #</th>
            <th>Bedrooms</th>
            <th>Floors</th>
            <th>Price</th>
            <th>Lot Size</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table> */}

      <MantineReactTable table={table} />
    </div>
  );
}
