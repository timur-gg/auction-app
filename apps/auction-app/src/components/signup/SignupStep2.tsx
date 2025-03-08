import React from 'react';
import {
  Anchor,
  Space,
  Text,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Container,
} from '@mantine/core';
import Countdown from './Countdown';

const SignupStep2 = () => {
  return (
    <Container maw={600} miw={300}>
      <Stack align="center" ta="left">
        <Space h={10} />
        <Text maw={400} ta="center">
          You will receive a text message containing a 6-digit code within 3
          minutes
        </Text>
        <TextInput w={250} label="Phone number" placeholder="#" required />

        <Space h={10} />

        <Countdown seconds={60} />

        <TextInput
          w={250}
          label="Code received in the text message "
          placeholder="6-digit code"
          required
        />

        <a>
          <Text maw={400} size="xs" c="dimmed" ta="center">
            Code not received?
          </Text>
        </a>
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

export default SignupStep2;
