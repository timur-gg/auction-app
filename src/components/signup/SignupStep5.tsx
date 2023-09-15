import React from "react";
import {
  Anchor,
  Space,
  Text,
  Button,
  Stack,
  TextInput,
  Container,
  List,
  ThemeIcon,
  Title,
  Checkbox,
} from "@mantine/core";
import Countdown from "./Countdown";
import text from "../../text.js";
import { IconCircleCheck } from "@tabler/icons-react";

const SignupStep5 = () => {
  const conditionText = text.auctionRules.map((rule) => (
    <List.Item>
      <Title order={5}>{rule.title}</Title>
      {rule.text}
    </List.Item>
  ));
  return (
    <Container maw={800} miw={300}>
      <Stack align="center" ta="left">
        {/* <Title order={2} ta="center">
          Auction Rules
        </Title> */}

        <List
          type="ordered"
          spacing="xs"
          size={14}
          ta="left"
          icon={
            <ThemeIcon color="teal" size={30} radius="xl">
              <IconCircleCheck size="1.5rem" />
            </ThemeIcon>
          }
        >
          {conditionText}
        </List>
        <Space />
        {/* <Checkbox size="md" label="I agree to the auction rules" /> */}
      </Stack>
    </Container>
  );
};

export default SignupStep5;
