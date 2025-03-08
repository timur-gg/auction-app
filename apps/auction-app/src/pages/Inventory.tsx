import React from 'react';
import { useState, useRef } from 'react';
import {
  Autocomplete,
  Loader,
  Select,
  Grid,
  Accordion,
  Space,
  Button,
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
  MantineTheme,
  CSSObject,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { createStyles, RangeSlider, rem } from '@mantine/core';
import {
  IconPoint,
  IconGripVertical,
  IconArrowsSort,
  IconCoin,
  IconCalendar,
  IconRuler,
  IconLayoutGrid,
  IconMap,
} from '@tabler/icons-react';

// import GoogleMapReact from 'google-map-react';
import AuctionCard from '../components/inventory/AuctionCard';
import PriceFilter from '../components/inventory/PriceFilter';
import SizeFilter from '../components/inventory/SizeFilter';
import { auctionData } from '@mocks/auction.tsx';
import pinAsset from '../assets/pin.png';
import { inventoryStyle } from '../styles/theme.ts';
import { IAuction } from '@auction-app/at-models';

export function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ['gmail.com', 'outlook.com', 'yahoo.com'].map(
            (provider) => `${val}@${provider}`,
          ),
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

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    inventoryStyle(theme) as Record<string, CSSObject>,
);

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
        { value: 0, label: '0' },
        { value: 12.5, label: point },
        { value: 25, label: '25' },
        { value: 37.5, label: point },
        { value: 50, label: '50' },
        { value: 62.5, label: point },
        { value: 75, label: '75' },
        { value: 87.5, label: point },
        { value: 100, label: '100' },
      ]}
    />
  );
}

const builders = auctionData.map((a) => a.builder);

const builderOptions = [...new Set(builders)].map((b) => ({
  label: b,
  value: b,
}));

const statusOptions = [
  { value: 'Live Auction', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'passed', label: 'Passed' },
];

const depositOptions = [
  { value: '5/5/5/5', label: '5/5/5/5' },
  { value: '10/5/5', label: '10/5/5' },
  { value: '10/10', label: '10/10' },
];

const MARKS = [
  { value: 0, label: '0' },
  { value: 33, label: '1' },
  { value: 66, label: '2' },
  { value: 99, label: '3+' },
];

const Inventory = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [size, setSizeRange] = useState<[number, number]>([0, 100]);
  const [bedroom, setBedroom] = useState<number>(-1);
  const [bathroom, setBathroom] = useState<number>(-1);
  const [deposit, setDeposit] = useState<string>('');
  const [sortBy, setSort] = useState<string>('price');
  const [builder, setBuilder] = useState<string>('');
  const [status, setStatus] = useState<string>('All');
  const [selectedAuction, setSelectedAuction] = useState<number>(-1);

  const [filters, setFilter] = useState<string[]>(['All']);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilter([...filters.filter((f) => f !== 'All'), filter]);
    }
  };

  const [mapViewChecked, setMapViewChecked] = useState(false);

  function filterPrice(
    prices: Partial<Record<number, number>>,
    priceRange: [number, number],
    bedroomFilter: number,
  ) {
    console.info(prices, priceRange, bedroomFilter);
    if (bedroomFilter > 0) {
      const bedroomPrice = prices[bedroomFilter] ?? 0;
      return (
        bedroomPrice >= (priceRange[0] + 20) * 12.5 &&
        bedroomPrice <= (priceRange[1] + 20) * 12.5
      );
    } else {
      const priceValues = Object.values(prices);

      for (let i = 0; i < priceValues.length; i++) {
        const pv = priceValues[i] ?? 0;
        if (
          pv >= (priceRange[0] + 20) * 12.5 &&
          pv <= (priceRange[1] + 20) * 12.5
        ) {
          return true;
        }
      }
      return false;
    }
  }

  const FILTER_MAP: { [key: string]: (auction: IAuction) => boolean } = {
    All: () => true,
    priceRange: (a: IAuction) => filterPrice(a.price, priceRange, bedroom),

    size: (a: IAuction) =>
      (a.size as number) >= (size[0] + 20) * 12.5 &&
      (a.size as number) <= (size[1] + 20) * 12.5,
    bedroom: (a: IAuction) => {
      if (bedroom === -1) return true;
      else
        return (
          parseInt(a.bedroom.slice(0)) <= bedroom &&
          parseInt(a.bedroom.slice(-1)) >= bedroom
        );
    },
    deposit: (a: IAuction) => (deposit ? a.deposit === deposit : true),
    builder: (a: IAuction) => (builder ? a.builder === builder : true),
    status: (a: IAuction) => (status ? a.status === status : true),
  };

  let filteredAuctions: IAuction[] = auctionData;
  filters.forEach((f) => {
    filteredAuctions = filteredAuctions.filter(FILTER_MAP[f]);
  });

  const sortedAuctions = filteredAuctions.sort((a, b) =>
    b[sortBy] > a[sortBy] ? -1 : 1,
  );

  const sortedAuctionsSelected = [
    ...sortedAuctions.filter((a) => a.id === selectedAuction.toString()),
    ...sortedAuctions.filter((a) => a.id !== selectedAuction.toString()),
  ];

  sortedAuctionsSelected.forEach((auction) => console.log(auction));

  console.log(selectedAuction.toString() == '1');
  const AuctionList = sortedAuctionsSelected.map((auction: IAuction) => (
    <Grid.Col sm={6} lg={4} key={auction.id}>
      <AuctionCard
        auction={auction}
        price={bedroom >= 0 ? auction.price[bedroom] : auction.minPrice}
        bedroomFilter={bedroom}
        selected={selectedAuction.toString() === auction.id}
      />
    </Grid.Col>
  ));

  function onSortClick(sortBy: string) {
    setSort(sortBy);
  }

  const distanceToMouse = (
    pt: { x: number; y: number },
    mousePos: { x: number; y: number },
  ): number => {
    if (pt && mousePos) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mousePos.x) * (pt.x - mousePos.x) +
          (pt.y - mousePos.y) * (pt.y - mousePos.y),
      );
    } else return 0;
  };
  const handleClick = (e: React.MouseEvent, id: string) => {
    console.log(`You clicked on ${id}`);

    setSelectedAuction(parseInt(id));
  };

  const Marker = ({
    text,
    id,
    selected,
  }: {
    text: string;
    id: string;
    selected: boolean;
  }) => {
    return (
      <div
        style={{
          width: '35px',
          height: '50px',
        }}
        // className={"pin2"}
        onClick={(e) => handleClick(e, id)}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            filter: selected ? 'contrast(150%)' : '',
          }}
          src={pinAsset}
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
                onClick={(e: React.MouseEvent) => onSortClick('price')}
              >
                Price
              </Menu.Item>
              Z
              <Menu.Item
                icon={<IconRuler size={14} />}
                onClick={(e: React.MouseEvent) => onSortClick('size')}
              >
                Size
              </Menu.Item>
              <Menu.Item
                icon={<IconCalendar size={14} />}
                onClick={(e: React.MouseEvent) => onSortClick('auctionDate')}
              >
                Auction Date
              </Menu.Item>
              <Menu.Item
                icon={<IconCalendar size={14} />}
                onClick={(e: React.MouseEvent) => onSortClick('completionDate')}
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
              addFilter('status');
            }}
          />
        </Grid.Col>

        <Grid.Col xs={3} md={2.5} lg={1.5}>
          <DatePickerInput
            type="range"
            label="Completion date"
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
            <Accordion.Control style={{ width: '50%' }}>
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
                    addFilter('builder');
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
                    addFilter('deposit');
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
                      { label: 'All', value: '-1' },
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3+', value: '3' },
                    ]}
                    onChange={(value) => {
                      console.log('111111334243r4');
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
        <Grid.Col {...(mapViewChecked ? { xs: 8, md: 9 } : { xs: 0 })}>
          <Box w="100%" h="90vh" hidden={!mapViewChecked}>
            {/*<GoogleMapReact*/}
            {/*  bootstrapURLKeys={{*/}
            {/*    // remove the key if you want to fork*/}
            {/*    key: 'AIzaSyB-iyAn3z8aIS8iMxHZaUwg8IWCkY_2Vh8',*/}
            {/*    language: 'en',*/}
            {/*    region: 'US',*/}
            {/*  }}*/}
            {/*  defaultCenter={{ lat: 43.6428525, lng: -79.3959449 }}*/}
            {/*  defaultZoom={15}*/}
            {/*  distanceToMouse={distanceToMouse}*/}
            {/*>*/}
            {/*  {sortedAuctionsSelected.map(*/}
            {/*    ({ lat, lng, id, address }: IAuction) => {*/}
            {/*      return (*/}
            {/*        <Marker*/}
            {/*          key={id}*/}
            {/*          // lat={lat}*/}
            {/*          // lng={lng}*/}
            {/*          text={id}*/}
            {/*          id={id}*/}
            {/*          // icon={pinAsset}*/}
            {/*          selected={selectedAuction.toString() === id}*/}
            {/*        />*/}
            {/*      );*/}
            {/*    },*/}
            {/*  )}*/}
            {/*</GoogleMapReact>*/}
          </Box>
        </Grid.Col>
        <Grid.Col {...(!mapViewChecked ? { xs: 12 } : { xs: 4, md: 3 })}>
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
                    auction={auction}
                    price={
                      bedroom >= 0 ? auction.price[bedroom] : auction.minPrice
                    }
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
