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
  Checkbox,
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
import SizeFilter from "../components/inventory/SizeFilter";

import { auctionData } from "../data";

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

// const builderOptions = [
//   { value: "1", label: "Builders Inc" },
//   { value: "2", label: "Construction Corp" },
// ];

const builders = auctionData.map((a) => a.builder);

const builderOptions = [...new Set(builders)].map((b) => ({
  label: b,
  value: b,
}));

const statusOptions = [
  { value: "Live Auction", label: "Live" },
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

const Inventory = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [size, setSizeRange] = useState<[number, number]>([0, 100]);
  const [bedroom, setBedroom] = useState<number>(-1);
  const [bathroom, setBathroom] = useState<number>(-1);
  const [deposit, setDeposit] = useState<string>("");
  const [sortBy, setSort] = useState<string>("price");
  const [builder, setBuilder] = useState<string>("");
  const [status, setStatus] = useState<string>("All");

  const [filters, setFilter] = useState<string[]>(["All"]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== "All"), filter]);
    }
  };

  function filterPrice(
    prices: { [key: number]: number },
    priceRange: [number, number],
    bedroomFilter: number
  ) {
    console.info(prices, priceRange, bedroomFilter);
    if (bedroomFilter > 0) {
      let bedroomPrice = prices[bedroomFilter];
      return (
        bedroomPrice >= (priceRange[0] + 20) * 12.5 &&
        bedroomPrice <= (priceRange[1] + 20) * 12.5
      );
    } else {
      let priceValues = Object.values(prices);

      for (let i = 0; i < priceValues.length; i++) {
        let pv = priceValues[i];
        console.log(pv);
        if (
          pv >= (priceRange[0] + 20) * 12.5 &&
          pv <= (priceRange[1] + 20) * 12.5
        ) {
          console.log("FOUND");
          return true;
        }
      }

      return false;
    }
  }

  const FILTER_MAP: { [char: string]: any } = {
    All: () => true,
    priceRange: (auction: any) =>
      filterPrice(auction.price, priceRange, bedroom),

    size: (auction: any) =>
      auction.size >= (size[0] + 20) * 12.5 &&
      auction.size <= (size[1] + 20) * 12.5,
    bedroom: (auction: any) => {
      console.log(
        auction.bedroom,
        parseInt(auction.bedroom.slice(0)),
        parseInt(auction.bedroom.slice(-1)),
        bedroom
      );
      if (bedroom === -1) return true;
      else
        return (
          parseInt(auction.bedroom.slice(0)) <= bedroom &&
          parseInt(auction.bedroom.slice(-1)) >= bedroom
        );
    },
    deposit: (auction: any) => (deposit ? auction.deposit === deposit : true),
    builder: (auction: any) => (builder ? auction.builder === builder : true),
    status: (auction: any) => (status ? auction.status === status : true),

    // Active: (auction, address) => !auction.completed,
    // Completed: (auction) => auction.completed,
  };

  var filteredAuctions: auctionType[] = auctionData;
  filters.forEach((f) => {
    filteredAuctions = filteredAuctions.filter(FILTER_MAP[f]);
  });

  const sortedAuctions = filteredAuctions.sort((a, b) =>
    b[sortBy] > a[sortBy] ? -1 : 1
  );

  const AuctionList = sortedAuctions.map((auction) => (
    <Grid.Col md={6} lg={4} key={auction.id}>
      <AuctionCard
        // status={auction.status}
        id={auction.id}
        image={auction.images[0]}
        size={auction.size}
        // size={bedroom >= 0 ? auction.size[bedroom] : auction.minSize}
        price={bedroom >= 0 ? auction.price[bedroom] : auction.minPrice}
        name={auction.name}
        address={auction.address}
        bedroom={auction.bedroom}
        builder={auction.builder}
        completionDate={auction.completionDate}
        auctionDate={auction.auctionDate}
        deposit={auction.deposit}
        bathroom={auction.bathroom}
        parking={auction.parking}
        locker={auction.locker}
        bedroomFilter={bedroom}
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
        <Grid.Col xs={2.5} md={2} lg={1.5}>
          <Text>Size</Text>
          <SizeFilter
            size={size}
            setSizeRange={setSizeRange}
            addFilter={addFilter}
          />
        </Grid.Col>
        <Grid.Col xs={3} md={2.5} lg={1.5}>
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
        {/* <Grid.Col xs={3} md={2.5} lg={1.5}>
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
        </Grid.Col> */}
        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <Select
            clearable
            data={statusOptions}
            label="Status"
            placeholder="Auction status"
            onChange={(value: string) => {
              setStatus(value);
              addFilter("status");
            }}
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
      </Grid>

      <Space h="md" />
      <Accordion chevronPosition="left" defaultValue="">
        <Accordion.Item value="customization">
          <Accordion.Control>More Filters</Accordion.Control>
          <Accordion.Panel>
            <Grid gutter={50}>
              {/* <Grid.Col xs={6} sm={4} md={3} lg={2.5}>
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
              </Grid.Col> */}

              <Grid.Col xs={3} lg={2}>
                <Select
                  searchable
                  clearable
                  data={builderOptions}
                  label="Builder"
                  placeholder="Builder"
                  onChange={(value: string) => {
                    setBuilder(value);
                    addFilter("builder");
                  }}
                />
              </Grid.Col>

              <Grid.Col xs={3} lg={2}>
                <Select
                  searchable
                  clearable
                  data={depositOptions}
                  label="Deposit Structure"
                  placeholder="Deposit"
                  onChange={(value: string) => {
                    setDeposit(value);
                    addFilter("deposit");
                  }}
                />
              </Grid.Col>
              <Grid.Col xs={5} sm={3} lg={2}>
                <Stack spacing="0">
                  <Text size="sm" fw={500}>
                    Bathrooms
                  </Text>
                  <SegmentedControl
                    color="blue"
                    radius="sm"
                    transitionDuration={500}
                    transitionTimingFunction="linear"
                    size="sm"
                    data={[
                      { label: "All", value: "-1" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3+", value: "3" },
                    ]}
                    onChange={(value) => {
                      console.log("111111334243r4");
                      // setBathroom(parseInt(value));
                      // addFilter("bathroom");
                    }}
                    // classNames={classes}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col xs={3} md={1.5}>
                <Checkbox label="Locker" mt="1.9rem" />
              </Grid.Col>
              <Grid.Col xs={3} md={1.5}>
                <Checkbox label="Parking" mt="1.9rem" />
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
