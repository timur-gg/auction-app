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

const SignupStep5Builder = () => {
  const theme = useMantineTheme();

  return (
    <Container miw={500}>
      <Title order={3}>Construction Company Info</Title>
      <Space h={20} />

      <Grid gutter={50}>
        <Grid.Col md={12}>
          <Stack align="center" ta="left">
            <TextInput
              w={250}
              label="Company Name"
              value="Toronto Developers Inc"
              disabled
            />
            <TextInput
              w={250}
              label="Business Number"
              value="#1243553"
              disabled
            />
            <TextInput
              w={250}
              label="Phone Number"
              value="6474715132"
              disabled
            />
            <TextInput
              w={250}
              label="Company E-mail"
              value="torontodevinc@gmail.com"
              disabled
            />

            <TextInput
              w={250}
              label="Responsible Person Name"
              placeholder="Name"
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Space h={20} />
    </Container>
  );
};

export default SignupStep5Builder;
