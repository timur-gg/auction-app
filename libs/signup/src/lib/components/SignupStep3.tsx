import React from 'react';
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
} from '@mantine/core';

import { useRef } from 'react';

import { FileDrop } from '@auction-app/components';

const SignupStep3 = () => {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  const [subPage, setSubPage] = React.useState('proofLicense');

  return (
    <Container miw={400}>
      {subPage === 'proofLicense' && (
        <>
          <Text size="lg" inline mt={10}>
            We need to confirm your identity.
          </Text>
          <Text size="lg" inline mt={10}>
            Please attach a photo of your Driver's License
          </Text>
        </>
      )}
      {subPage === 'proofCitizenship' && (
        <Text size="lg" inline mt={10}>
          Please attach a proof of citizenship
        </Text>
      )}

      <Space h={20} />

      <FileDrop />

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
        style={{ cursor: 'pointer' }}
        onClick={() => setSubPage('proofCitizenship')}
      >
        Upload a proof of citizenship
      </Text>
    </Container>
  );
};

export default SignupStep3;
