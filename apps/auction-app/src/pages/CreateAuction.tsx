import React from 'react';
import { useState, useRef } from 'react';
import { useForm } from '@mantine/form';

import {
  Text,
  Group,
  Button,
  Container,
  Textarea,
  Paper,
  Stepper,
  TextInput,
  Stack,
  Space,
  Grid,
  SegmentedControl,
  Select,
} from '@mantine/core';
import { DatePickerInput, TimeInput, YearPickerInput } from '@mantine/dates';

import { Link } from 'react-router-dom';
import FileDrop from '../components/signup/FileDrop';
import DetailedDescripion from '../components/CreateAuction/DetailedDescription';
import AddUnit from '../components/CreateAuction/AddUnit';

import { IconCalendarEvent } from '@tabler/icons-react';

export default function CreateAuction() {
  const [active, setActive] = useState(0);

  const [unitUploadOption, setUnitUploadOption] = useState('excel');
  const [detailsUploadOption, setDetailsUploadOption] = useState('manual');

  const [auctionDateValue, setAuctionValue] = useState<Date>(new Date());

  const [constructionStartValue, setConstructionStartValue] = useState<Date>(
    new Date(),
  );
  const [completionValue, setCompletionValue] = useState<Date>(new Date());
  const [projectTitle, setProjectTitle] = useState('');

  const [address, setAddress] = useState('');

  const [projectId, setProjectId] = useState(0);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },
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

  const submitAuction = () => {
    if (projectId > 0) {
      console.log('submitting');
    }
  };

  return (
    <Container size="md">
      <Paper
        withBorder
        shadow="md"
        p={15}
        radius="md"
        style={{ height: '100%' }}
      >
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="Project Info" description="Profile settings">
            <Grid ta="left" justify="center">
              <Grid.Col md={6}>
                {' '}
                <TextInput
                  maw={300}
                  mx="auto"
                  label="Project Title"
                  placeholder="Project"
                  value={projectTitle}
                  onChange={(event) =>
                    setProjectTitle(event.currentTarget.value)
                  }
                  // {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <TextInput
                  maw={300}
                  mx="auto"
                  label="Address"
                  placeholder="Address"
                  value={address}
                  onChange={(event) => setAddress(event.currentTarget.value)}
                  // {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <Textarea
                  mx="auto"
                  maw={300}
                  label="Project Description"
                  placeholder="Description"
                  // {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <Stack mx="auto" maw={300}>
                  <Text fw={500} size="sm">
                    Construction Start Date
                  </Text>

                  <Group spacing="1">
                    <IconCalendarEvent size="1.05rem" stroke={1.5} />
                    <Space w={10} />

                    <Select
                      maw={120}
                      // defaultValue={auction["completionDate"].substring(
                      //   0,
                      //   auction["completionDate"].length - 5
                      // )}
                      placeholder="Season"
                      data={['Fall', 'Winter', 'Spring', 'Summer']}
                    />
                    <Space w={10} />

                    <YearPickerInput
                    // value={completionValue}
                    // onChange={setCompletionValue}
                    />
                  </Group>
                </Stack>

                {/* <DatePickerInput
                  maw={300}
                  // type="range"
                  label="Construction Start Date"
                  placeholder="Pick dates range"
                  value={constructionStartValue}
                  // onChange={(event) =>
                  //   setConstructionStartValue(event?.currentTarget?.value)
                  // }
                  // onChange={setConstructionStartValue}
                  mx="auto"
                /> */}
              </Grid.Col>
              <Grid.Col md={6}>
                <Stack mx="auto" maw={300}>
                  <Text fw={500} size="sm">
                    Completion Date
                  </Text>

                  <Group spacing="1">
                    <IconCalendarEvent size="1.05rem" stroke={1.5} />
                    <Space w={10} />

                    <Select
                      maw={120}
                      // defaultValue={auction["completionDate"].substring(
                      //   0,
                      //   auction["completionDate"].length - 5
                      // )}
                      placeholder="Season"
                      data={['Fall', 'Winter', 'Spring', 'Summer']}
                    />
                    <Space w={10} />

                    <YearPickerInput
                    // value={completionValue}
                    // onChange={setCompletionValue}
                    />
                  </Group>
                </Stack>
                {/*
                <DatePickerInput
                  maw={300}
                  // type="range"
                  label="Completion date"
                  placeholder="Pick dates range"
                  value={completionValue}
                  // onChange={setCompletionValue}
                  mx="auto"
                /> */}
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
            <Space h={20} />

            <SegmentedControl
              color="blue"
              value={detailsUploadOption}
              onChange={setDetailsUploadOption}
              data={[
                { label: 'Add Manually', value: 'manual' },
                { label: 'Upload Excel', value: 'excel' },
              ]}
            />
            <Space h={40} />
            {detailsUploadOption === 'excel' ? (
              <>
                <Space h={20} />
                <Container maw={600}>
                  <Text fz="1.2rem" fw={500} color="#212529">
                    Upload Details Table
                  </Text>
                  <Space h={20} />
                  <FileDrop />
                </Container>
              </>
            ) : (
              <DetailedDescripion />
            )}
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
                  value={auctionDateValue}
                  // onChange={setConstructionStartValue}
                  mx="auto"
                  maw={200}
                />
              </Grid.Col>
              {/* <Grid.Col md={6}>
                <TimeInput mx="auto" ta="left" maw={200} label="Start time" />
              </Grid.Col> */}
              {/* <Grid.Col md={6}>
                <NumberInput
                  mx="auto"
                  ta="left"
                  maw={200}
                  label="Auction duration"
                  description="hours"
                  placeholder="duration, hours"
                  min={0}
                />
              </Grid.Col> */}
            </Grid>

            {/* Auction duration */}
          </Stepper.Step>

          <Stepper.Step label="Auctioned Units" description="Social media">
            <Space h={20} />

            <SegmentedControl
              color="blue"
              value={unitUploadOption}
              onChange={setUnitUploadOption}
              data={[
                { label: 'Upload Excel', value: 'excel' },
                { label: 'Add Manually', value: 'manual' },
              ]}
            />

            {unitUploadOption === 'excel' ? (
              <>
                <Space h={40} />
                <Container maw={600}>
                  <Text fz="1.2rem" fw={500} color="#212529">
                    Upload Units Table
                  </Text>
                  <Space h={5} />
                  <FileDrop />
                </Container>
              </>
            ) : (
              <AddUnit />
            )}
          </Stepper.Step>

          <Stepper.Completed>
            <Space h={20} />
            <Text fz={17}>Your auction is submitted for review!</Text>
            <Space h={20} />

            <Group position="center">
              <a href="/builder_profile">
                <Button color="blue">Go to My Profile</Button>
              </a>
              {/* <Space w={20} />
              <Link to="/auction/1">
                <Button color="blue" onClick={nextStep}>
                  Go to Auction
                </Button> */}
              {/* </Link> */}
            </Group>
            {/* <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code> */}
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt="xl">
          {active > 0 && active < 4 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active < 3 && <Button onClick={nextStep}>Next step</Button>}

          {active === 3 && (
            <Button
              color="green"
              onClick={() => {
                nextStep();
                submitAuction();
              }}
            >
              Complete
            </Button>
          )}
        </Group>
      </Paper>
    </Container>
  );
}
