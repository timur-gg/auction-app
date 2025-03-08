import { Popover, Button, RangeSlider, Space } from '@mantine/core';

type SizeFilterProps = {
  size: [number, number];
  setSizeRange: (value: [number, number]) => void;
  addFilter: (filterKey: string) => void;
};

export default function SizeFilter({
  size,
  setSizeRange,
  addFilter,
}: SizeFilterProps) {
  return (
    <Popover width={500} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>
          {size[0] > 0 ? (size[0] + 20) * 12.5 : 0}
          {size[1] === 100 && 'sqft'} -{' '}
          {size[1] > 0 && size[1] < 100
            ? (size[1] + 20) * 12.5 + 'sqft'
            : 'Max'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <RangeSlider
          size="lg"
          radius="md"
          scale={(v) => (v + 20) * 12.5}
          step={4}
          name="size"
          marks={[
            { value: 0, label: '250' },
            { value: 20, label: '500' },
            { value: 40, label: '750' },
            { value: 60, label: '1000' },
            { value: 80, label: '1250' },
            { value: 100, label: '1500+' },
          ]}
          value={size}
          onChange={(value) => {
            setSizeRange(value);
            addFilter('size');
          }}
        />
        <Space h="md" />
      </Popover.Dropdown>
    </Popover>
  );
}
