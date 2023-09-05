import React from "react";
import { useState, useRef } from "react";
import ExampleDoc from "../assets/terms_conditions.pdf";
import { useForm } from "@mantine/form";

import {
  Box,
  Stack,
  Text,
  Group,
  Badge,
  Button,
  Container,
  Title,
  Textarea,
  NumberInput,
  Paper,
  ThemeIcon,
  Avatar,
  Stepper,
  TextInput,
  Code,
  Tabs,
  Space,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";

import {
  IconPhoneCall,
  IconAt,
  IconGavel,
  IconTrash,
  IconX,
  IconArchive,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import FileDrop from "../components/signup/FileDrop";
import DetailedDescripion from "../components/CreateAuction/DetailedDescription";
import AddUnit from "../components/CreateAuction/AddUnit";

export default function CreateAuction() {
  const [active, setActive] = useState(0);

  const [auctionDateValue, setAuctionValue] = useState<Date>(new Date());

  const [constructionStartValue, setConstructionStartValue] = useState<Date>(
    new Date()
  );
  const [completionValue, setCompletionValue] = useState<Date>(new Date());

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      website: "",
      github: "",
    },

    // validate: (values) => {
    //   if (active === 0) {
    //     return {
    //       username:
    //         values.username.trim().length < 6
    //           ? "Username must include at least 6 characters"
    //           : null,
    //       password:
    //         values.password.length < 6
    //           ? "Password must include at least 6 characters"
    //           : null,
    //     };
    //   }

    //   if (active === 1) {
    //     return {
    //       name:
    //         values.name.trim().length < 2
    //           ? "Name must include at least 2 characters"
    //           : null,
    //       email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    //     };
    //   }

    //   return {};
    // },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 4 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container size="md">
      <Paper
        withBorder
        shadow="md"
        p={15}
        radius="md"
        style={{ height: "100%" }}
      >
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="Project Info" description="Profile settings">
            <Grid ta="left" justify="center">
              <Grid.Col md={6}>
                {" "}
                <TextInput
                  maw={300}
                  mx="auto"
                  label="Project Title"
                  placeholder="Project"
                  {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <TextInput
                  maw={300}
                  mx="auto"
                  label="Address"
                  placeholder="Address"
                  {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <Textarea
                  mx="auto"
                  maw={300}
                  label="Project Description"
                  placeholder="Description"
                  {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <DatePickerInput
                  maw={300}
                  // type="range"
                  label="Construction Start Date"
                  placeholder="Pick dates range"
                  value={constructionStartValue}
                  // onChange={setConstructionStartValue}
                  mx="auto"
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <DatePickerInput
                  maw={300}
                  // type="range"
                  label="Completion date"
                  placeholder="Pick dates range"
                  value={completionValue}
                  // onChange={setCompletionValue}
                  mx="auto"
                />
              </Grid.Col>

              <Grid.Col xs={9} md={6} px={80}>
                <Text fz="0.875rem" fw={500} color="#212529">
                  Upload Project Photos
                </Text>
                <Space h={5} />
                <FileDrop />
              </Grid.Col>
            </Grid>
          </Stepper.Step>

          <Stepper.Step label="Project Details" description="Details">
            {/* Detailed Info */}
            <Space h={40} />

            <DetailedDescripion />
          </Stepper.Step>

          <Stepper.Step
            label="Auction Settings"
            description="Personal information"
          >
            <Space h={20} />

            <Grid maw={600} mx="auto">
              <Grid.Col md={6}>
                <DatePickerInput
                  ta="left"
                  // type="range"
                  label="Auction Date"
                  placeholder="Pick auction date"
                  value={auctionDateValue}
                  // onChange={setConstructionStartValue}
                  mx="auto"
                  maw={200}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <TimeInput mx="auto" ta="left" maw={200} label="Start time" />
              </Grid.Col>
              <Grid.Col md={6}>
                <NumberInput
                  mx="auto"
                  ta="left"
                  maw={200}
                  label="Auction duration"
                  description="hours"
                  placeholder="duration, hours"
                  max={10}
                  min={0}
                />
              </Grid.Col>
            </Grid>

            {/* Auction duration */}
          </Stepper.Step>

          <Stepper.Step label="Auctioned Units" description="Social media">
            <Space h={20} />
            <AddUnit />
          </Stepper.Step>

          <Stepper.Completed>
            <Space h={20} />
            <Text fz={17}>Your auction is created!</Text>
            <Space h={20} />

            <Group position="center">
              <Link to="/project/2">
                <Button color="blue" onClick={nextStep}>
                  Go to Project
                </Button>
              </Link>
              <Space w={20} />
              <Link to="/auction/1">
                <Button color="blue" onClick={nextStep}>
                  Go to Auction
                </Button>
              </Link>
            </Group>
            {/* <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code> */}
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 && <Button onClick={nextStep}>Next step</Button>}

          {active === 3 && (
            <Button color="green" onClick={nextStep}>
              Complete
            </Button>
          )}
        </Group>
      </Paper>
    </Container>
  );
}
