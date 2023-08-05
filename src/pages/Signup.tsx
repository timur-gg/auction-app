import {
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

import SignupStep1 from "../components/signup/SignupStep1";
import { useState } from "react";
import SignupStep2 from "../components/signup/SignupStep2";
import SignupStep3 from "../components/signup/SignupStep3";
import SignupStep4 from "../components/signup/SignupStep4";
import SignupStep5 from "../components/signup/SignupStep5";

export default function Signup() {
  const [step, setStep] = useState(1);

  console.log("STEP" + step);
  const theme = useMantineTheme();

  return (
    <Container maw={800} miw={420} my={5}>
      {step < 5 && (
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create an Account
        </Title>
      )}

      {step < 5 && (
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
      )}
      <Center>
        <Paper
          withBorder
          shadow="md"
          p={30}
          {...(step != 5 ? { mt: 10 } : "")}
          radius="md"
        >
          {step === 1 && <SignupStep1 />}
          {step === 2 && <SignupStep2 />}
          {step === 3 && <SignupStep3 />}
          {step === 4 && <SignupStep4 />}
          {step === 5 && <SignupStep5 />}
          {step === 6 && <Title order={3}>Subscription Info</Title>}
          {step == 7 && (
            <>
              <Space h={10} />
              <Title order={4}>Thank you for signing up!</Title>
              <Title order={4}>Your subscription is now active!</Title>
            </>
          )}

          <Space h={30} />

          <Group position="apart" spacing="xl" align="right">
            {step > 1 && step < 7 && (
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
            {step >= 5 && step < 7 ? (
              <Button
                onClick={() => setStep((prev) => prev + 1)}
                color="customPurple.2"
                {...(step > 5 && { mx: "auto" })}
                styles={{
                  root: {
                    "&:hover": {
                      opacity: "50%",
                    },
                  },
                }}
              >
                {step === 5 ? "Agree & Proceed" : "Confirm"}
              </Button>
            ) : step === 7 ? (
              <Center mx="auto">
                <Link to={"/inventory"}>
                  <Button
                    onClick={() => setStep((prev) => prev + 1)}
                    color="customPurple.2"
                    mx="auto"
                    styles={{
                      root: {
                        "&:hover": {
                          opacity: "50%",
                        },
                      },
                    }}
                  >
                    See the auctions
                  </Button>
                </Link>
              </Center>
            ) : (
              <Button
                style={{ marginLeft: "auto" }}
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
