import {
  Card,
  Stack,
  Text,
  createStyles,
  Group,
  Grid,
  Tooltip,
  Tabs,
  Textarea,
  MantineTheme,
  CSSObject,
} from '@mantine/core';
import {
  IconTemperature,
  IconBuildingCircus,
  IconPropeller,
} from '@tabler/icons-react';
import React from 'react';
import { auctionsDetailsEditStyle } from '../../styles/theme.ts';
import { IAuction } from '../../types.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionsDetailsEditStyle(theme) as Record<string, CSSObject>,
);

const featureGrid = [
  //   {
  //     label: "completionDate",
  //     icon: IconCalendarEvent,
  //     desc: "Construction completion date",
  //   },
  //   {
  //     label: "address",
  //     icon: IconAddressBook,
  //     desc: <Image h={200} w={300} src={mapImg} />,
  //   },
  // { label: "bedroom", icon: IconBedFilled, desc: "Number of bedrooms" },
  //   {
  //     label: "size",
  //     icon: IconRuler,
  //     unit: "sqft",
  //     desc: "Size of the property",
  //   },
  //   { label: "parking", icon: IconCar, desc: "Parking spots" },
  //   { label: "locker", icon: IconLock, desc: "Storage lockers" },
  { label: 'amenities', icon: IconBuildingCircus, desc: 'Amenities' },
  { label: 'heating', icon: IconTemperature, desc: 'Heating' },
  { label: 'cooling', icon: IconPropeller, desc: 'Cooling' },
];

export function AuctionDetails({ auction }: { auction: IAuction }) {
  const { classes } = useStyles();

  const features = featureGrid.map((feature) => (
    <Grid.Col xs={6} sm={12} py={5} key={feature.label}>
      <Tooltip
        key={feature.label}
        multiline
        p={5}
        h={feature.label === 'address' ? 256 : 'auto'}
        // h={500}
        withArrow
        style={{ cursor: 'pointer' }}
        transitionProps={{ duration: 200 }}
        label={feature.desc}
      >
        <Group spacing="1">
          <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
          <Text size="sm">
            {/* {auction[feature.label] + (feature.unit ? feature.unit : "")} */}
            {auction[feature.label] + ' '}
          </Text>
        </Group>
      </Tooltip>
    </Grid.Col>
  ));

  return (
    <Card.Section p="2rem" px="3rem">
      <Grid>
        <Grid.Col xs={10} sm={3}>
          <Stack spacing={6} align="flex-start">
            <Text fz="sm" c="dimmed" className={classes.label} align="left">
              building details
            </Text>

            <Grid>{features}</Grid>
          </Stack>
        </Grid.Col>
        <Grid.Col xs={10} sm={9}>
          <Tabs defaultValue="amenities" mt="-10px">
            <Tabs.List>
              <Tabs.Tab fz="sm" px="sm" fw={400} value="amenities">
                Amenities
              </Tabs.Tab>
              <Tabs.Tab fz="sm" px="sm" fw={400} value="doors">
                Doors / Hardware / Carpentry
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="kitchen" fz="sm">
                Kitchen
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="appliances" fz="sm">
                Appliances
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="bathroom" fz="sm">
                Bathrooms
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="amenities" pt="15px" ta="left">
              <Textarea autosize minRows={6}>
                {`• Approximately 9 ft. ceiling heights in principal rooms, defined as the Living Room and Dining Room.
• Approximately 9 ft. ceiling heights at upper level of two-storey walkouts. Where bulkheads or dropped ceilings are required. The height of the ceiling will be less than 9 ft. All measurements are calculated from the finished concrete slab floor to the underside of the concrete slab or finished ceiling above.
• Approximately 10 ft. ceiling heights in principal rooms, defined as the Living Room and Dining Room for suites on Levels 2 and 3. Where bulkheads or dropped ceilings are required, the height of the ceiling will be less than 10 ft.
• Smooth ceilings throughout.
• Porcelain tile floor and baseboard in Bathroom(s).
• Ceramic tile floor and baseboard in Laundry Closet.
• Laminate flooring in all other areas.
• Semi-gloss, off-white latex paint in Bathroom(s), Laundry closet, and on all trim.
• Flat, off-white latex paint on all other walls and ceilings.`}
              </Textarea>
            </Tabs.Panel>
            <Tabs.Panel value="doors" pt="15px" ta="left">
              <Textarea autosize minRows={6}>
                {`• Entry door to be solid core, with door viewer.
• Interior swing doors to be hollow-core, flat panel.
• Closet sliding door(s) to be framed and mirrored (as per Schedule A, if applicable).
• Internal Bedroom to have clear glass partition and/or clear glass sliding door (as per Schedule A, if applicable).
• Dark bronze lever hardware on entry door and brushed chrome lever hardware interior swing doors.
• Privacy lock on all Bathroom doors.
• 4” baseboards in all areas where laminate or vinyl flooring is located.
• 2” casings throughout.
• Stairs in two-storey walkouts with stained treads to coordinate with laminate floors, with white painted risers. Black metal pickets with stained handrail to coordinate with laminate floors (as per Schedule A, if applicable).`}
              </Textarea>
            </Tabs.Panel>
            <Tabs.Panel value="kitchen" pt="15px" ta="left">
              <Textarea autosize minRows={6}>
                {`• Custom-designed cabinetry with soft-close hardware.
              • Quartz countertop.
              • Islands with dining accommodations (as per Schedule A, if
              applicable).
              • Single bowl, stainless steel, undermount sink.
              • Single lever, chrome faucet.
              • Ceramic tile backsplash.`}
              </Textarea>
            </Tabs.Panel>
            <Tabs.Panel value="appliances" pt="15px" ta="left">
              <Textarea autosize minRows={6}>
                {`• Studio, one-bedroom, one-bedroom + den, two- bedroom, and two-bedroom + den units to receive:
              • 24” stainless steel refrigerator.
              • 24” cooktop and wall oven with over-the-range microwave.
              • 24” panelized dishwasher.
              • 24” stacked, front-load washer and ventless heat pump dryer.
              • Three-bedroom and two-storey walkouts to receive:
              • 30” stainless steel refrigerator.
              • 30” cooktop and wall oven with over-the-range microwave.
              • 24” panelized dishwasher.
              • 27” stacked, front-load washer and ventless heat pump dryer.`}
              </Textarea>
            </Tabs.Panel>
            <Tabs.Panel value="bathroom" pt="15px" ta="left">
              <Textarea autosize minRows={6}>
                {`• Custom-designed vanity cabinetry with soft-close hardware.
                • Surface-mounted, frameless mirror.
                • Off-white quartz countertop with single edge profile.
                • Single bowl, white porcelain, undermount sink.
                • Single lever, chrome faucet.
                • Low consumption toilet.
                • Chrome accessories (towel bar or ring, toilet paper holder, robe hook).
                • Shower to have:
                • Full-height tile surround.
                • Fixed-mount chrome shower head, single lever control handle, and
                spout.
                • Frameless glass shower enclosure with pre-formed base.
                • Acrylic deep soaker tub to have:
                • Full-height tile surround.
                • Fixed-mount chrome shower head, single lever control handle, and
                spout.`}
              </Textarea>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Card.Section>
  );
}

export default AuctionDetails;
