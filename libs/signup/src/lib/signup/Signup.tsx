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
  SegmentedControl,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import SignupStep1 from '../components/SignupStep1';
import { useState } from 'react';
import SignupStep2 from '../components/SignupStep2';
import SignupStep3 from '../components/SignupStep3';
import SignupStep4 from '../components/SignupStep4';
import SignupStep4Realtor from '../components/SignupStep4Realtor';
import SignupStep4Builder from '../components/SignupStep4Builder';
import SignupStep5Builder from '../components/SignupStep5Builder';
import SignupStep5 from '../components/SignupStep5';
import SignupStep6 from '../components/SignupStep6';

export default function Signup() {
  const [step, setStep] = useState(1);

  const [role, setRole] = useState('buyer');
  const theme = useMantineTheme();

  if (step === 3 && (role === 'builder' || role === 'realtor')) {
    setStep(4);
  }

  if (step === 4 && (role === 'builder' || role === 'realtor')) {
    setStep(5);
  }

  if (step === 7 && (role === 'realtor' || role === 'buyer')) {
    setStep(8);
  }

  console.log(step);

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

      {step < 4 && (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account ?{' '}
          <Anchor<'a'>
            href="#"
            size="sm"
            onClick={(e: React.MouseEvent) => e.preventDefault()}
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
          {...(step != 5 ? { mt: 10 } : '')}
          radius="md"
        >
          {step === 1 && <SignupStep1 />}
          {step === 2 && role !== 'builder' && <SignupStep2 />}
          {step === 2 && role === 'builder' && <SignupStep4Builder />}
          {step === 3 && <SignupStep3 />}
          {step === 4 && role === 'buyer' && <SignupStep4 />}
          {step === 5 && role === 'realtor' && <SignupStep4Realtor />}
          {step === 5 && role === 'builder' && <SignupStep2 />}
          {step === 5 && role === 'buyer' && <SignupStep6 />}

          {step === 6 && role === 'builder' && <SignupStep5Builder />}
          {step === 6 && role === 'realtor' && <SignupStep6 />}
          {step === 6 && role === 'buyer' && (
            <Title order={3}>Subscription Info</Title>
          )}

          {step === 7 && role === 'builder' && <SignupStep6 />}

          {step === 8 && (
            <>
              <Space h={10} />
              <Title order={2}>Thank you for signing up!</Title>
              <Space h={20} />

              {role === 'buyer' && <SignupStep5 />}
            </>
          )}
          {step === 1 && (
            <>
              <Space h={15} />
              <SegmentedControl
                onChange={setRole}
                value={role}
                color="blue"
                data={[
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'builder', label: 'Builder' },
                  { value: 'realtor', label: 'Authorized Person' },
                ]}
              />
            </>
          )}

          <Space h={30} />

          <Group position="apart" spacing="xl" align="right">
            {step > 1 && step < 7 && (
              <Button
                onClick={() => {
                  setStep((prev) => prev - 1);
                }}
                styles={(theme) => ({
                  root: {
                    border: 'none',
                    '&:hover': {
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
            {step >= 5 && step < 8 ? (
              <Button
                onClick={() => setStep((prev) => prev + 1)}
                color="customPurple.2"
                {...(step > 5 && { mx: 'auto' })}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: '50%',
                    },
                  },
                }}
              >
                {step === 5 ? 'Agree & Proceed' : 'Confirm'}
              </Button>
            ) : step === 8 ? (
              <Center mx="auto">
                <Group>
                  <Link to={'/inventory'}>
                    <Button
                      onClick={() => {
                        setStep((prev) => prev + 1);
                      }}
                      color="customPurple.2"
                      mx="auto"
                      styles={{
                        root: {
                          '&:hover': {
                            opacity: '50%',
                          },
                        },
                      }}
                    >
                      See the auctions
                    </Button>
                  </Link>
                  <Space w={10} />

                  {role === 'builder' && (
                    <Button
                      // onClick={() => setStep((prev) => prev + 1)}
                      color="green"
                      mx="auto"
                      styles={{
                        root: {
                          '&:hover': {
                            opacity: '50%',
                          },
                        },
                      }}
                    >
                      + Create Auction
                    </Button>
                  )}
                </Group>
              </Center>
            ) : (
              <Button
                style={{ marginLeft: 'auto' }}
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
