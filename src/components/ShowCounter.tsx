import React from "react";

import {

    Text,
    Group,
    Title

  } from "@mantine/core";

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
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <Text>:</Text>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <Text>:</Text>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        {/* <Text>:</Text>
        <DateTimeDisplay value={seconds} type={"Secs"} isDanger={false} /> */}
    </Group>
  );
};

export default ShowCounter;
