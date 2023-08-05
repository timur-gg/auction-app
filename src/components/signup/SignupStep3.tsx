import React from "react";
import {
  Anchor,
  Text,
  Button,
  Group,
  Container,
  PasswordInput,
  Stack,
  useMantineTheme,
  Space,
  Checkbox,
} from "@mantine/core";

import { useRef } from "react";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";

const SignupStep3 = () => {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  const [subPage, setSubPage] = React.useState("proofLicense");

  return (
    <Container miw={400}>
      {subPage === "proofLicense" && (
        <>
          <Text size="lg" inline mt={10}>
            We need to confirm your identity.
          </Text>
          <Text size="lg" inline mt={10}>
            Please attach a photo of your Driver's License
          </Text>
        </>
      )}
      {subPage === "proofCitizenship" && (
        <Text size="lg" inline mt={10}>
          Please attach a proof of citizenship
        </Text>
      )}

      <Space h={20} />
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        openRef={openRef}
      >
        <Group
          position="center"
          spacing="lg"
          mih={100}
          sx={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size="3rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag file here
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              File should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <Group position="center" mt="md">
        <Button>Select files</Button>
      </Group>
      <Space h={20} />
      <Checkbox
        size="md"
        label="I am a Canadian citizen or permanent resident"
      />
      <Space h={10} />

      <Text
        size="sm"
        c="dimmed"
        td="underline"
        style={{ cursor: "pointer" }}
        onClick={() => setSubPage("proofCitizenship")}
      >
        Upload a proof of citizenship
      </Text>
    </Container>
  );
};

export default SignupStep3;
