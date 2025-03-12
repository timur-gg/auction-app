import React from 'react';

import { Text, Group, Title } from '@mantine/core';

type DateTimeDisplayProps = {
  value: number;
  type: string;
  isDanger: boolean;
};

type ShowCounterProps = {
  days?: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed?: boolean;
};

const DateTimeDisplay = ({ value, type, isDanger }: DateTimeDisplayProps) => {
  return (
    <Group className={isDanger ? 'countdown danger' : 'countdown'} spacing={5}>
      <Title order={4}>{value}</Title>
      <Text>{type}</Text>
    </Group>
  );
};

export const ShowCounter = ({
  days = -1,
  hours,
  minutes,
  seconds,
  completed = false,
}: ShowCounterProps) => {
  console.log(days, hours, minutes, seconds);
  if (completed) {
    // Render a complete state
    return <span>You are good to go!</span>;
  } else {
    return (
      <Group className="show-counter" spacing="sm" position="center">
        {days > 0 && (
          <>
            <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
            <Text>:</Text>
          </>
        )}
        {hours >= 0 && (
          <>
            <DateTimeDisplay value={hours} type={'h'} isDanger={hours <= 2} />
            <Text>:</Text>
          </>
        )}
        {minutes >= 0 && (
          <>
            <DateTimeDisplay
              value={minutes}
              type={'m'}
              isDanger={minutes <= 2}
            />
            <Text>:</Text>
          </>
        )}
        {seconds >= 0 && (
          <DateTimeDisplay value={seconds} type={'s'} isDanger={minutes <= 1} />
        )}
      </Group>
    );
  }
};
