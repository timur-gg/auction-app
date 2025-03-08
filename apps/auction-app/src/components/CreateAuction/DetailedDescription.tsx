import { IconX, IconPlus } from '@tabler/icons-react';
import {
  Container,
  Textarea,
  TextInput,
  Tabs,
  Space,
  ActionIcon,
  Group,
} from '@mantine/core';
import { useState } from 'react';

const defaultTabs = [
  {
    title: 'Deposit Structure',
    description: 'Deposit',
    value: 'deposit',
  },
  { title: 'Incentives', description: 'Incentives', value: 'incentives' },
  {
    title: 'Amenities',
    description: 'Amenities',
    value: 'amenities',
    optional: true,
  },
  {
    title: 'Appliances',
    description: 'Appliances',
    value: 'appliances',
    optional: true,
  },
  {
    title: 'Bathrooms',
    description: 'Bathrooms',
    value: 'bathrooms',
    optional: true,
  },
  {
    title: 'Ceilings/Floors/Paint',
    description: 'Ceilings/Floors/Paint',
    value: 'ceilings',
    optional: true,
  },
  {
    title: 'Kitchen',
    description: 'Kitchen',
    value: 'kitchen',
    optional: true,
  },
];
export default function DetailedDescripion() {
  const [removedTabs, setRemovedTabs] = useState<string[]>([]);
  const [newTabs, setNewTabs] = useState<string[]>([]);

  const addTab = () => {
    setNewTabs([...newTabs, 'newTab' + newTabs.length]);
  };

  let tabs = defaultTabs;

  newTabs.forEach((t, i) => {
    if (!tabs.map((t) => t.value).includes(t)) {
      tabs.push({
        title: 'New Tab',
        description: '',
        value: t.toString(),
        optional: true,
      });
    }
  });

  tabs = tabs.filter((t) => !removedTabs.includes(t.value));

  return (
    <Tabs defaultValue="deposit" orientation="vertical">
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value} px={15} mih="45px">
            <Group spacing="xs">
              {tab.optional && (
                <ActionIcon
                  mx="1px"
                  onClick={(e: React.MouseEvent) =>
                    setRemovedTabs([...removedTabs, tab.value])
                  }
                >
                  <IconX size={14} />
                </ActionIcon>
              )}

              {tab.title}
            </Group>
          </Tabs.Tab>
        ))}

        <Container bg="#DCEDC8" w="100%" pt="8px" onClick={addTab}>
          <IconPlus
            color="grey"
            size="1rem"
            stroke={2.5}
            // bg="#AED581"
            // color={theme.colors.blue[7]}
          />
        </Container>
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel value={tab.value} key={tab.value}>
          <Container px="50px" ta="left">
            <TextInput
              mx="auto"
              maw={500}
              label="Title"
              placeholder={tab.title}
              // {...form.getInputProps("username")}
            />
            <Space h={30} />
            <Textarea
              mx="auto"
              maw={500}
              label="Detailed Description"
              placeholder="Description"
              // {...form.getInputProps("username")}
              minRows={4}
            />
          </Container>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
