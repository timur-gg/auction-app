import React from "react";

import { useState, useRef } from "react";
import {
  Autocomplete,
  Loader,
  Select,
  Grid,
  Slider,
  Accordion,
  Container,
  Space,
  Popover,
  Button,
  Center,
  SegmentedControl,
  Text,
  Stack,
  Menu,
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { createStyles, RangeSlider, rem } from "@mantine/core";
import {
  IconPoint,
  IconGripVertical,
  IconArrowsSort,
  IconCoin,
  IconCalendar,
  IconRuler,
} from "@tabler/icons-react";

import AuctionCard from "../components/inventory/AuctionCard";
import PriceFilter from "../components/inventory/PriceFilter";

export function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
  return (
    <Autocomplete
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label="Address"
      placeholder="Address, Lot #"
    />
  );
}

const useStyles = createStyles((theme) => ({
  mark: {
    display: "none",
  },

  markWrapper: {
    marginTop: rem(12),
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

const point = (
  <IconPoint size={10} style={{ marginTop: rem(6) }} stroke={1.5} />
);

export function SliderMarks() {
  const { classes } = useStyles();
  return (
    <RangeSlider
      mt="xl"
      mb="xl"
      classNames={classes}
      defaultValue={[30, 60]}
      thumbChildren={<IconGripVertical size="1.2rem" stroke={1.5} />}
      marks={[
        { value: 0, label: "0" },
        { value: 12.5, label: point },
        { value: 25, label: "25" },
        { value: 37.5, label: point },
        { value: 50, label: "50" },
        { value: 62.5, label: point },
        { value: 75, label: "75" },
        { value: 87.5, label: point },
        { value: 100, label: "100" },
      ]}
    />
  );
}

const projectOptions = [
  { value: "a", label: "The Condos on King" },
  { value: "b", label: "House on Spadina" },
];

const builderOptions = [
  { value: "1", label: "Builders Inc" },
  { value: "2", label: "Construction Corp" },
];

const statusOptions = [
  { value: "live", label: "Live" },
  { value: "upcoming", label: "Upcoming" },
  { value: "passed", label: "Passed" },
];

const depositOptions = [
  { value: "5/5/5/5", label: "5/5/5/5" },
  { value: "10/5/5", label: "10/5/5" },
  { value: "10/10", label: "10/10" },
];

const MARKS = [
  { value: 0, label: "0" },
  { value: 33, label: "1" },
  { value: 66, label: "2" },
  { value: 99, label: "3+" },
];

interface auctionType {
  // 👈 typing for the "romanNumber" object
  [key: string]: any;
}

const Auctions: auctionType[] = [
  {
    id: "1",
    image:
      "https://cache15.housesigma.com/file/pix-exclusive/HSE03041/33bfa_5ea6c.jpg?e224ad04",
    price: 550,
    name: "The Condominimums",
    address: "50 Richmond W",
    bedroom: "0-3",
    size: "490-1200",
    builder: "Toronto Building Corp",
    completionDate: "Dec 2025",
    auctionDate: "Live",
    deposit: "5/5/5/5",
  },

  {
    id: "2",
    image:
      "https://cache08.housesigma.com/file/pix-exclusive/HSE03040/9ca2c_8b275.jpg?594560a1",
    price: 600,
    name: "Condo 223",
    address: "35 Bathurst",
    bedroom: "2-3",
    size: "590-1000",
    builder: "Developers Inc",
    completionDate: "June 2026",
    auctionDate: "1 Oct 2023",
    deposit: "10/5/5",
  },

  {
    id: "3",
    image:
      "https://cache08.housesigma.com/file/pix-exclusive/HSE03006/5c783_ce332.jpg?b43e9ea7",
    price: 900,
    name: "King West Towers",
    address: "100 Spadina",
    bedroom: "1-2",
    size: "400-750",
    builder: "Developers Inc",
    completionDate: "August 2024",
    auctionDate: "1 Jul 2023",
    deposit: "10/10",
  },
];

const Inventory = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [size, setSize] = useState<[number, number]>([0, 100]);
  const [bedroom, setBedroom] = useState<number>(0);
  const [sortBy, setSort] = useState<string>("price");

  const [filters, setFilter] = useState<string[]>(["All"]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== "All"), filter]);
    }
  };

  const FILTER_MAP: { [char: string]: any } = {
    All: () => true,
    priceRange: (auction: any) =>
      auction.price >= (priceRange[0] + 20) * 12.5 &&
      auction.price <= (priceRange[1] + 20) * 12.5,

    size: (auction: any) =>
      auction.size >= (size[0] + 20) * 12.5 &&
      auction.size <= (size[1] + 20) * 12.5,
    bedroom: (auction: any) => {
      if (bedroom === -1) return true;
      else if (bedroom === 3) return auction.bedroom >= 3;
      else return auction.bedroom === bedroom;
    },
    deposit: (auction: any) => auction.deposit === depositOptions[0].label,
    // Active: (auction, address) => !auction.completed,
    // Completed: (auction) => auction.completed,
  };

  var filteredAuctions = Auctions;
  filters.forEach((f) => {
    filteredAuctions = filteredAuctions.filter(FILTER_MAP[f]);
  });

  const sortedAuctions = filteredAuctions.sort((a, b) =>
    b[sortBy] > a[sortBy] ? -1 : 1
  );
  console.log(sortedAuctions);

  const AuctionList = sortedAuctions.map((auction) => (
    <Grid.Col md={6} lg={4}>
      <AuctionCard
        // status={auction.status}
        image={auction.image}
        size={auction.size}
        price={auction.price}
        name={auction.name}
        address={auction.address}
        bedroom={auction.bedroom}
        builder={auction.builder}
        completionDate={auction.completionDate}
        auctionDate={auction.auctionDate}
        id={auction.id}
        deposit={auction.deposit}
      />
    </Grid.Col>
  ));

  function onSortClick(sortBy: string) {
    console.log(sortBy);
    setSort(sortBy);
  }

  return (
    <div className="Inventory">
      <Grid justify="space-around">
        <Grid.Col xs={1} md={1} pt={33}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button>
                <IconArrowsSort />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconCoin size={14} />}
                onClick={(e) => onSortClick("price")}
              >
                Price
              </Menu.Item>
              <Menu.Item
                icon={<IconRuler size={14} />}
                onClick={(e) => onSortClick("size")}
              >
                Size
              </Menu.Item>
              <Menu.Item
                icon={<IconCalendar size={14} />}
                onClick={(e) => onSortClick("auctionDate")}
              >
                Auction Date
              </Menu.Item>
              <Menu.Item
                icon={<IconCalendar size={14} />}
                onClick={(e) => onSortClick("completionDate")}
              >
                Completion Date
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <AutocompleteLoading />
        </Grid.Col>
        <Grid.Col xs={2.5} md={2} lg={1}>
          <Text>Price</Text>
          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            addFilter={addFilter}
          />
        </Grid.Col>
        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <Select
            searchable
            clearable
            data={projectOptions}
            label="Project"
            placeholder="Project"
            style={{
              overflowWrap: "normal",
            }}
          />
        </Grid.Col>
        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <Select
            clearable
            data={statusOptions}
            label="Status"
            placeholder="Auction status"
          />
        </Grid.Col>

        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <DatePickerInput
            type="range"
            label="Completion date"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            mx="auto"
            maw={400}
          />
        </Grid.Col>
        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <DatePickerInput
            type="range"
            label="Auction date"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            mx="auto"
            maw={400}
          />
        </Grid.Col>
        <Grid.Col xs={3} md={3} lg={2}>
          <Stack spacing="0">
            <Text size="sm" fw={500}>
              Bedrooms
            </Text>
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
              // classNames={classes}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Space h="md" />
      <Accordion chevronPosition="left" defaultValue="">
        <Accordion.Item value="customization">
          <Accordion.Control>More Filters</Accordion.Control>
          <Accordion.Panel>
            <Grid gutter={50}>
              <Grid.Col xs={6} sm={6} md={4} lg={3}>
                <Space h="md" />
                <Text>Size (sqft)</Text>
                <RangeSlider
                  size="lg"
                  radius="md"
                  scale={(v) => (v + 20) * 12.5}
                  step={4}
                  name="size"
                  marks={[
                    { value: 0, label: "250" },
                    { value: 20, label: "500" },
                    { value: 40, label: "750" },
                    { value: 60, label: "1000" },
                    { value: 80, label: "1250" },
                    { value: 100, label: "1500+" },
                  ]}
                  value={size}
                  onChange={(value) => {
                    setSize(value);
                    addFilter("size");
                  }}
                />
                <Space h="lg" />
              </Grid.Col>

              <Grid.Col xs={4} sm={4} md={3} lg={2}>
                <Select
                  searchable
                  clearable
                  data={builderOptions}
                  label="Builder"
                  placeholder="Builder"
                />
              </Grid.Col>

              <Grid.Col xs={4} sm={4} md={3} lg={2}>
                <Select
                  searchable
                  clearable
                  data={depositOptions}
                  label="Deposit Structure"
                  placeholder="Deposit"
                />
              </Grid.Col>

              {/* <Grid.Col md={6} lg={3}>
                <Slider
                  label={(val) =>
                    MARKS.find((mark) => mark.value === val)?.label
                  }
                  defaultValue={33}
                  step={33}
                  marks={MARKS}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <Select searchable clearable data={data} />
              </Grid.Col> */}
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Space h="md" />

      <Container size="xl">
        <Grid>{AuctionList}</Grid>
      </Container>
    </div>
  );
};

export default Inventory;
