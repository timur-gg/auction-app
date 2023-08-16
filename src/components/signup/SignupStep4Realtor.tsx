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
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconFile } from "@tabler/icons-react";
import { useRef } from "react";

const SignupStep4Realtor = () => {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <Container miw={500}>
      {/* <Title order={3}>Your Info</Title> */}
      <Space h={10} />

      <Grid gutter={50}>
        <Grid.Col md={12}>
          <Stack align="center" ta="left">
            <TextInput
              w={250}
              label="Real Estate Agency"
              placeholder="Agency"
            />
            <TextInput w={250} label="License Number" placeholder="#" />
          </Stack>
        </Grid.Col>
      </Grid>
      <Space h={30} />
      <Text size="lg" inline mt={10}>
        Please upload a photo of your business card
      </Text>
      <Space h={20} />
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        openRef={openRef}
        maw={300}
        mx="auto"
      >
        <Group
          position="center"
          spacing="lg"
          mih={70}
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
    </Container>
  );
};

export default SignupStep4Realtor;
