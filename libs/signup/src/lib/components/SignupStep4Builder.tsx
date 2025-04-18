import React from 'react';
import {
  Title,
  Text,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Space,
  Grid,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { useRef } from 'react';

const SignupStep4Builder = () => {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <Container miw={500}>
      {/* <Title order={3}>Construction Company Info</Title>
      <Space h={20} />

      <Grid gutter={50}>
        <Grid.Col md={12}>
          <Stack align="center" ta="left">
            <TextInput w={250} label="Company Name" placeholder="Company" />
            <TextInput w={250} label="Business Number" placeholder="#" />
            <TextInput w={250} label="Phone Number" placeholder="#" />
            <TextInput
              w={250}
              label="Responsible Person Name"
              placeholder="Name"
            />
            <TextInput w={250} label="Company E-mail" placeholder="E-mail" />
          </Stack>
        </Grid.Col>
      </Grid> */}
      <Title order={3}>Construction Company Sign Up</Title>
      <Space h={20} />

      <Text fw={500} fz={15}>
        You should receive a unique sign up code
      </Text>

      <Grid gutter={50}>
        <Grid.Col md={12}>
          <Stack align="center" ta="left">
            <Space h={20} />
            <TextInput
              w={250}
              label="Please enter the sign up code below"
              placeholder="Unique Code"
            />

            {/* <TextInput w={250} label="Business Number" placeholder="#" /> */}
            {/* <TextInput w={250} label="Phone Number" placeholder="#" /> */}
            {/* <TextInput
              w={250}
              label="Responsible Person Name"
              placeholder="Name"
            /> */}
            {/* <TextInput w={250} label="Company E-mail" placeholder="E-mail" /> */}
          </Stack>
        </Grid.Col>
      </Grid>

      <Space h={20} />
    </Container>
  );
};

export default SignupStep4Builder;
