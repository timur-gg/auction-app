import React from 'react';
import {
  Anchor,
  Text,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Container,
  SegmentedControl,
  Space,
} from '@mantine/core';

const SignupStep1 = () => {
  return (
    <Container maw={600} miw={300}>
      <Stack align="center" ta="left">
        <TextInput w={250} label="Name" placeholder="Name" required />
        <TextInput w={250} label="Last Name" placeholder="Last Name" required />

        <TextInput
          w={250}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <TextInput
          w={250}
          label="Password"
          placeholder="Your password"
          defaultValue="secret"
          required
        />
        <TextInput w={250} label="Confirm password" defaultValue="secret" />
      </Stack>
      <Group position="apart" mt="xs">
        {/* <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor> */}
      </Group>
      {/* <Button fullWidth mt="xl">
            Sign Up
          </Button> */}
    </Container>
  );
};

export default SignupStep1;
