import { Card, Image,Stack, Text, Group, Badge, createStyles, Center, Button, rem } from '@mantine/core';
import {  IconBedFilled, IconRuler, IconGavel, IconCalendarEvent, IconStar, IconStarFilled, IconAddressBook} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: 'completionDate', icon: IconCalendarEvent, },
  { label: 'address', icon: IconAddressBook },
  { label: 'bedroom', icon: IconBedFilled },
  { label: 'size', icon: IconRuler , unit: 'sqft'},];

type CardProps = {
  [key: string]: any;
    image: string,
    price: number,
    name: string,
    address: string,
    bedroom: number,
    size: number,
    // status: string,
    // project: string,
    builder: string,
    completionDate: string,
    // auctionDate: Date
  };

export function AuctionCard(props:CardProps) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="sm">{props[feature.label] + (feature.unit? feature.unit : '')}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section >
        <Image src={props.image} alt="Tesla Model S" height={250}/>
      </Card.Section>

      <Group position="apart" mt="md">
      <Stack align="flex-start" spacing={-2}>
          <Text fw={500}>{props.name}</Text>
          <Text fz="xs" c="dimmed">
            {props.builder}
          </Text>
        </Stack>
        <Badge variant="outline">{props.auctionDate}</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Lot details
        </Text>

        <Group spacing={20} mb={-5}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${props.price}k
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              starting price
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Go to Auction
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default AuctionCard;
