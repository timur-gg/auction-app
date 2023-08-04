import React from "react";

import { Text, Group, Title } from "@mantine/core";

type DateTimeDisplayProps = {
  value: number;
  type: string;
  isDanger: Boolean;
};

type ShowCounterProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DateTimeDisplay = ({ value, type, isDanger }: DateTimeDisplayProps) => {
  return (
    <Group className={isDanger ? "countdown danger" : "countdown"} spacing="sm">
      <Title order={4}>{value}</Title>
      <Text>{type}</Text>
    </Group>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounterProps) => {
  return (
    <Group className="show-counter" spacing="sm" position="center">
      {days >= 0 && (
        <>
          <DateTimeDisplay value={days} type={"Days"} isDanger={false} />
          <Text>:</Text>
        </>
      )}
      {hours >= 0 && (
        <>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={hours <= 2} />
          <Text>:</Text>
        </>
      )}
      {minutes >= 0 && (
        <>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={minutes <= 2} />
          <Text>:</Text>
        </>
      )}
      {seconds >= 0 && (
        <>
          <DateTimeDisplay value={seconds} type={"Secs"} isDanger={minutes <= 1} />
        </>
      )}
    </Group>
  );
};

export default ShowCounter;
