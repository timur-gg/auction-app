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
} from "@mantine/core";

import { useRef } from "react";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload,IconFile, IconX } from "@tabler/icons-react";

const SignupStep2 = () => {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();


  return (
    <Container miw={400}>
      <Text size="lg" inline mt={10}>
              Please attach a photo of your Driver's License
      </Text>
      <Space h={20} />
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        openRef={openRef}
      >
         <Group position="center" spacing="lg" mih={120} sx={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
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
        <Button >Select files</Button>
      </Group>
    </Container>
  );
};

export default SignupStep2;
