import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auctionData, lots } from "../../data.js";

import { IconTrash, IconX, IconPlus } from "@tabler/icons-react";
import {
  Container,
  Stack,
  TextInput,
  Text,
  Button,
  Tabs,
  Space,
  ActionIcon,
  Group,
  Grid,
  Checkbox,
  SegmentedControl,
  NumberInput,
} from "@mantine/core";
import { useState } from "react";
import FileDrop from "../signup/FileDrop.js";
import { notifications } from "@mantine/notifications";

const unitTabs = [{ title: "New Unit", value: "new", id: 1 }];

export default function AddUnit(props: any) {
  const [removedTabs, setRemovedTabs] = useState<string[]>([]);
  const [newTabs, setNewTabs] = useState<string[]>([]);

  const [unitNumber, setUnitNumber] = useState<{ [key: string]: string }>({
    "1": "",
  });

  const addTab = () => {
    setNewTabs([...newTabs, "newTab" + newTabs.length]);
  };

  const saveUnit = () => {
    notifications.show({
      autoClose: 4000,
      title: "Unit saved!",
      color: "yellow",
      message: "",
    });
  };

  let tabs = unitTabs;

  newTabs.forEach((t, i) => {
    if (!tabs.map((t) => t.value).includes(t)) {
      tabs.push({
        title: "New Unit",
        value: t.toString(),
        id: Math.max(...tabs.map((t) => t.id)) + 1,
      });
    }
  });

  tabs = tabs.filter((t) => !removedTabs.includes(t.value));

  const setUnit = (unitId: string) => {
    tabs.forEach((t) => {
      if (t.id.toString() === unitId) {
        t.title = unitNumber[unitId] || t.title;
      }
    });
  };

  return (
    <>
      <Tabs defaultValue="new" orientation="vertical">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              px={15}
              mih="45px"
              miw={150}
            >
              <Group spacing="xs">
                <ActionIcon
                  mx="1px"
                  onClick={(e) => setRemovedTabs([...removedTabs, tab.value])}
                >
                  <IconX size={14} />
                </ActionIcon>

                {tab.title}
              </Group>
            </Tabs.Tab>
          ))}

          <Container bg="#DCEDC8" w="100%" py={10} onClick={addTab}>
            <Group spacing="xs">
              <Text color="#424242" fw={500}>
                Add Unit
              </Text>

              <IconPlus
                style={{ border: "2px solid #AED581", borderRadius: "50%" }}
                color="grey"
                size="1rem"
                stroke={2.5}
                // bg="#AED581"
                // color={theme.colors.blue[7]}
              />
            </Group>
          </Container>
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel value={tab.value}>
            <Space h={10} />
            <Container px="50px" ta="left">
              <Grid>
                <Grid.Col md={6}>
                  <TextInput
                    mx="auto"
                    maw={220}
                    label="Unit #"
                    placeholder={tab.title}
                    value={unitNumber[tab.id]}
                    onChange={(e) => {
                      console.log(e.currentTarget.value);

                      setUnitNumber({
                        ...unitNumber,
                        [tab.id]: e.currentTarget.value,
                      });

                      console.log(tab.id);
                      console.log(tabs);
                      setUnit(tab.id.toString());
                    }}
                    // {...form.getInputProps("username")}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <NumberInput
                    mx="auto"
                    maw={220}
                    label="Bedrooms"
                    placeholder="# of Bedrooms"
                    max={10}
                    min={0}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <Space h={20} />
                  <NumberInput
                    mx="auto"
                    maw={220}
                    label="Size"
                    placeholder="sqft"
                    max={10000}
                    min={0}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <Space h={20} />
                  <NumberInput
                    mx="auto"
                    maw={220}
                    label="Bathrooms"
                    placeholder="# of Bathrooms"
                    max={10}
                    min={0}
                  />
                </Grid.Col>

                <Grid.Col md={6}>
                  <Space h={20} />
                  <Stack w="220px" mx="auto" spacing="xs">
                    <Text fz="0.875rem" fw={500} color="#212529">
                      Exposure
                    </Text>
                    <SegmentedControl
                      name="Facing"
                      miw={220}
                      mx="auto"
                      data={[
                        { label: "N", value: "n" },
                        { label: "E", value: "e" },
                        { label: "S", value: "s" },
                        { label: "W", value: "w" },
                      ]}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col md={6}>
                  <Space h={50} />
                  <Group w="220px" mx="auto" spacing={60}>
                    <Checkbox label="Parking" />
                    <Checkbox label="Locker" />
                  </Group>
                </Grid.Col>
                <Grid.Col md={6}>
                  <Space h={20} />
                  <NumberInput
                    mx="auto"
                    maw={220}
                    label="Starting Price"
                    defaultValue={100000}
                    parser={(value: string) => value.replace(/\$\s?|(,*)/g, "")}
                    // formatter={(value: string) =>
                    //   !Number.isNaN(parseFloat(value))
                    //     ? `$ ${value}`.replace(
                    //         /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    //         ","
                    //       )
                    //     : "$ "
                    // }
                  />
                </Grid.Col>

                <Grid.Col md={12}>
                  <Space h={20} />

                  <Text fz="0.875rem" fw={500} color="#212529">
                    Upload Floor Plans
                  </Text>
                  <Space h={5} />
                  <FileDrop />
                </Grid.Col>
              </Grid>
            </Container>
          </Tabs.Panel>
        ))}
      </Tabs>
      <Space h={20} />
      <Container px="50px" ta="right">
        <Button onClick={saveUnit} mr="auto">
          Add Unit
        </Button>
      </Container>
    </>
  );
}
