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
  Center,
  Space,
  useMantineTheme,
} from "@mantine/core";

import SignupStep1 from "../components/signup/SignupStep1";
import { useState } from "react";
import SignupStep2 from "../components/signup/SignupStep2";
import SignupStep3 from "../components/signup/SignupStep3";

export default function Signup() {
  const [step, setStep] = useState(1);

  console.log("STEP" + step);
  const theme = useMantineTheme();


  return (
    <Container maw={720} miw={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create an Account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account ?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            Sign In
          </Anchor>
        </Text>

        <Center >
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {step === 1 && <SignupStep1 />}
        {step === 2 && <SignupStep2 />}
        {step === 3 && <SignupStep3 />}
        {step === 4 && <Title order={3}>Subscription Info</Title>}

        <Space h={40} />

        <Group position="apart" spacing="xl" align="right" >
          

        {step > 1 && (
          <Button
          
            onClick={() => setStep((prev) => prev - 1)}
            styles={(theme) => ({
              root: {
                border: "none",
                "&:hover": {
                  color: theme.colors.grey,
                },
              },
            })}
            variant="outline"
            color="customGrey.3"
          >
            Go Back
          </Button>
        )}
        {step >= 4 ? (
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            color="customPurple.2"
            styles={{
              root: {
                "&:hover": {
                  opacity: "50%",
                },
              },
            }}
          >
            {"Confirm"}
          </Button>
        ) : (
          <Button
          style={{marginLeft: 'auto'}}
            onClick={() => setStep((prev) => prev + 1)}
            color="customBlue.0"
          >
            Next
          </Button>
        )}
        </Group>


      </Paper>
      </Center>
    </Container>
  );
}
