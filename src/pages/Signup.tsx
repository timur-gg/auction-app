import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Stack,
  } from "@mantine/core";
  
  export default function Signup() {
    return (
      <Container size={520} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create an Account
        </Title>
        
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack >
        <TextInput label="Name" placeholder="Name" required />
        <TextInput label="Last Name" placeholder="Last Name" required />

          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
          defaultValue="secret"
            required
          />
           <PasswordInput
          label="Confirm password"
          defaultValue="secret"
        />
        </Stack>
          <Group position="apart" mt="xs">
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
          <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account ?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            Sign IN
          </Anchor>
        </Text>
        </Paper>
      </Container>
    );
  }