import { Popover, Button, RangeSlider, Space } from "@mantine/core";

type FloorFilterProps = {
  floor: [number, number];
  setFloor: Function;
  addFilter: Function;
};

export default function FloorFilter({
  floor,
  setFloor,
  addFilter,
}: FloorFilterProps) {
  return (
    <Popover width={500} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>
          {!(floor[1] > 0 && floor[1] < 100)
            ? "All Floors"
            : (floor[0] > 0 ? (floor[0] / 2) : 0) - (floor[1] / 2)}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <RangeSlider
          size="lg"
          radius="md"
          scale={(v) => (v + 20) * 12.5}
          step={4}
          name="floor"
          marks={[
            { value: 0, label: "0" },
            { value: 20, label: "10" },
            { value: 40, label: "20" },
            { value: 60, label: "30" },
            { value: 80, label: "40" },
            { value: 100, label: "50" },
          ]}
          value={floor}
          onChange={(value) => {
            setFloor(value);
            addFilter("floor");
          }}
        />
        <Space h="md" />
      </Popover.Dropdown>
    </Popover>
  );
}
