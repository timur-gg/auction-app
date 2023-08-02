import { NumberInputHandlers, Group, ActionIcon, NumberInput } from "@mantine/core";
import { rem } from "@mantine/styles";
import { IconCurrencyDollarCanadian } from "@tabler/icons-react";
import { useState, useRef } from "react";



export function BidSelector(props: any) {
    const [value, setValue] = useState<number | "">(props.auction.price * 1000);
    const handlers = useRef<NumberInputHandlers>();
  
    return (
      <Group spacing={5} className={props.className}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => handlers.current?.decrement()}
        >
          –
        </ActionIcon>
  
        <NumberInput
          hideControls
          value={value}
          onChange={(val) => setValue(val)}
          handlersRef={handlers}
          max={1000000}
          min={props.auction.price}
          step={10000}
          styles={{ input: { width: rem(150) } }}
          icon={<IconCurrencyDollarCanadian size="1rem" />}
        />
  
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => handlers.current?.increment()}
        >
          +
        </ActionIcon>
      </Group>
    );
  }