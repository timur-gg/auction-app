import React from 'react';
import { Text, Group, useMantineTheme } from '@mantine/core';

import { useRef } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconFile, IconX } from '@tabler/icons-react';

function FileDrop() {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      openRef={openRef}
    >
      <Group
        position="center"
        spacing="lg"
        mih={100}
        sx={{ pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
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
  );
}

export default FileDrop;
