import React from "react";
import {
  Title,
  Text,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Avatar,
  Space,
  Grid,
} from "@mantine/core";

const SignupStep4 = () => {
  return (
    <Container miw={500}>
      <Title order={3}>Authorized Person Info</Title>
      <Space h={20} />

      <Grid gutter={50} >
        <Grid.Col md={6} >
          <Stack align="center" ta='left'>
          <TextInput w={200}  label="Name" placeholder="Name"  />
          <TextInput w={200}  label="Last Name" placeholder="Last Name"  />
          <TextInput w={200}  label="Realtor Id" placeholder="1234"  />
          </Stack>
        </Grid.Col>
        <Grid.Col md={6} >
          <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <Avatar
              src={
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
              }
              size={120}
              radius={120}
              mx="auto"
            />
            <Text ta="center" fz="lg" weight={500} mt="md">
              {"Alex Smith"}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {"realtor@realtor.com"}
            </Text>
            <Text ta="center" fz="md">
              {"#11234"}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SignupStep4;
