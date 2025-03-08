import {
  NumberInputHandlers,
  Group,
  ActionIcon,
  NumberInput,
} from '@mantine/core';
import { rem } from '@mantine/styles';
import { IconCurrencyDollarCanadian } from '@tabler/icons-react';
import { useRef } from 'react';

export function BidSelector({
  lot,
  className,
  value,
  setValue,
  step,
  decrementActive,
  incrementActive,
}: {
  lot: { bid: number };
  className?: string;
  value: number;
  setValue: (val: number) => void;
  step: number;
  decrementActive: boolean;
  incrementActive: boolean;
}) {
  const handlers = useRef<NumberInputHandlers>();
  return (
    <Group spacing={5} className={className}>
      <ActionIcon
        disabled={!decrementActive}
        size={42}
        variant="default"
        onClick={() => handlers.current?.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val: number) => setValue(val ?? 0)}
        handlersRef={handlers}
        max={1000000}
        min={lot.bid}
        step={step}
        styles={{ input: { width: rem(150) } }}
        icon={<IconCurrencyDollarCanadian size="1rem" />}
        style={{ pointerEvents: 'none' }}
      />

      <ActionIcon
        disabled={!incrementActive}
        size={42}
        variant="default"
        onClick={() => handlers.current?.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
}
