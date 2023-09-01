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
  Box,
  ScrollArea,
  Group,
  Switch,
  useMantineTheme,
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
  IconFlagSearch,
  IconLayoutGrid,
  IconMap,
} from "@tabler/icons-react";

import GoogleMapReact from "google-map-react";

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

  pin2: {
    // position: "absolute",
    // top: '40%';
    // left: '50%';
    // margin-left: 115px;

    borderRadius: "50%",
    border: "8px solid #fff",
    width: "8px",
    height: "8px",
    backgroundColor: "red",
  },

  "pin2::after": {
    position: "absolute",
    content: "",
    width: "0px",
    height: "0px",
    bottom: "-30px",
    left: "-6px",
    border: "10px solid transparent",
    borderTop: "17px solid #fff",
    backgroundColor: "red",
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
  const [selectedAuction, setSelectedAuction] = useState<number>(-1);

  const [filters, setFilter] = useState<string[]>(["All"]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== "All"), filter]);
    }
  };

  const [mapViewChecked, setMapViewChecked] = useState(false);

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

  const sortedAuctionsSelected = [
    ...sortedAuctions.filter((a) => a.id === selectedAuction.toString()),
    ...sortedAuctions.filter((a) => a.id !== selectedAuction.toString()),
  ];

  console.log(sortedAuctionsSelected);

  console.log(selectedAuction.toString() == "1");
  const AuctionList = sortedAuctionsSelected.map((auction) => (
    <Grid.Col sm={6} lg={4} key={auction.id}>
      <AuctionCard
        status={auction.status}
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
        selected={selectedAuction.toString() === auction.id}
      />
    </Grid.Col>
  ));

  function onSortClick(sortBy: string) {
    console.log(sortBy);
    setSort(sortBy);
  }

  const points = [
    { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
  ];

  const distanceToMouse = (pt: any, mousePos: any): number => {
    if (pt && mousePos) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mousePos.x) * (pt.x - mousePos.x) +
          (pt.y - mousePos.y) * (pt.y - mousePos.y)
      );
    } else return 0;
  };

  const handleClick = (e: any, id: string) => {
    console.log(`You clicked on ${id}`);

    setSelectedAuction(parseInt(id));
  };

  const Marker = ({ text, id, selected }: any) => {
    return (
      <div
        style={{
          width: "35px",
          height: "50px",
        }}
        // className={"pin2"}
        onClick={(e) => handleClick(e, id)}
      >
        {/* <span className="circleText" title={id}>
          {text}
        </span> */}
        <img
          style={{
            width: "100%",
            height: "100%",
            filter: selected ? "contrast(150%)" : "",
          }}
          src={require("../assets/pin.png")}
          alt="logo"
        />
      </div>
    );
  };

  console.log(selectedAuction);
  const theme = useMantineTheme();

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
          <Group position="apart" pb="10px">
            <Accordion.Control style={{ width: "50%" }}>
              More Filters
            </Accordion.Control>
            <div>
              <Switch
                mr={20}
                radius="md"
                size="xl"
                color="white"
                onLabel={
                  <IconLayoutGrid
                    size="1rem"
                    stroke={2.5}
                    color={theme.colors.gray[0]}
                  />
                }
                offLabel={
                  <IconMap
                    size="1rem"
                    stroke={2.5}
                    color={theme.colors.blue[7]}
                  />
                }
                checked={mapViewChecked}
                onChange={(event) => {
                  setSelectedAuction(-1);
                  setMapViewChecked(event.currentTarget.checked);
                }}
              />
            </div>
          </Group>
          <Accordion.Panel>
            <Grid gutter={50}>
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

      <Grid>
        <Grid.Col {...(mapViewChecked ? { xs: 9 } : { xs: 0 })}>
          <Box w="100%" h="90vh" hidden={!mapViewChecked}>
            <GoogleMapReact
              bootstrapURLKeys={{
                // remove the key if you want to fork
                key: "AIzaSyB-iyAn3z8aIS8iMxHZaUwg8IWCkY_2Vh8",
                language: "en",
                region: "US",
              }}
              defaultCenter={{ lat: 43.6428525, lng: -79.3959449 }}
              defaultZoom={15}
              distanceToMouse={distanceToMouse}
            >
              {sortedAuctionsSelected.map(({ lat, lng, id, address }) => {
                return (
                  <Marker
                    key={id}
                    lat={lat}
                    lng={lng}
                    text={id}
                    id={id}
                    icon={require("../assets/pin.png")}
                    selected={selectedAuction.toString() === id}
                  />
                );
              })}
            </GoogleMapReact>
          </Box>
        </Grid.Col>
        <Grid.Col {...(!mapViewChecked ? { xs: 12 } : { xs: 3 })}>
          <ScrollArea
            w="100%"
            h="90vh"
            type="always"
            scrollbarSize={15}
            // onScrollPositionChange={onScrollPositionChange}
          >
            <Grid>
              {sortedAuctionsSelected.map((auction) => (
                <Grid.Col
                  {...(mapViewChecked ? { xs: 12 } : { sm: 6, lg: 4 })}
                  key={auction.id}
                >
                  <AuctionCard
                    status={auction.status}
                    id={auction.id}
                    image={auction.images[0]}
                    size={auction.size}
                    // size={bedroom >= 0 ? auction.size[bedroom] : auction.minSize}
                    price={
                      bedroom >= 0 ? auction.price[bedroom] : auction.minPrice
                    }
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
                    selected={selectedAuction.toString() === auction.id}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Inventory;
