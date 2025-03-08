import { Popover, Button, RangeSlider, Space } from '@mantine/core';

type PriceFilterProps = {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  addFilter: (filterName: string) => void;
};

export default function PriceFilter({
  priceRange,
  setPriceRange,
  addFilter,
}: PriceFilterProps) {
  // const { priceRange, setPriceRange, addFilter } = props;
  return (
    <Popover width={500} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>
          ${priceRange[0] > 0 ? (priceRange[0] + 20) * 12.5 : 0} -{' '}
          {priceRange[1] > 0 && priceRange[1] < 100
            ? '$' + (priceRange[1] + 20) * 12.5
            : 'Max'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <RangeSlider
          size="lg"
          radius="md"
          scale={(v) => (v + 20) * 12.5}
          step={4}
          name="priceRange"
          marks={[
            { value: 0, label: '250k' },
            { value: 20, label: '500k' },
            { value: 40, label: '750k' },
            { value: 60, label: '1m' },
            { value: 80, label: '1.25m' },
            { value: 100, label: '1.5m+' },
          ]}
          value={priceRange}
          onChange={(value) => {
            setPriceRange(value);
            addFilter('priceRange');
          }}
        />
        <Space h="md" />
      </Popover.Dropdown>
    </Popover>
  );
}
