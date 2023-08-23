import { Badge, Group, ActionIcon } from "@mantine/core";
import { IconBed, IconBath, IconRuler, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FavoritesTable(props: any) {
  const { favorites, deleteFave } = props;
  const navigate = useNavigate();

  const rowClick = (lot: any) => {
    navigate(`/auction/${lot.auction}`);
  };
  return (
    <DataTable
      highlightOnHover
      style={{ textAlign: "left" }}
      // rowStyle={(row, id) => {
      //   console.info(rows[id - 1]);

      //   return id % 2 === 0
      //     ? { backgroundColor: "#FA5639" }
      //     : undefined;
      // }}
      columns={[
        { accessor: "name" },
        { accessor: "address" },
        { accessor: "unit", title: "Unit #" },
        { accessor: "bedroom", title: <IconBed size="1.2rem" /> },
        { accessor: "bathroom", title: <IconBath size="1.2rem" /> },
        { accessor: "size", title: <IconRuler size="1.2rem" /> },
        { accessor: "bid", title: "$" },
        {
          accessor: "status",
          render: (lot) =>
            lot.status === "Live" ? (
              <Badge color="green" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : lot.status === "Passed" ? (
              <Badge color="red" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : (
              lot.status
            ),
        },
        {
          accessor: "actions",
          title: <></>,
          textAlignment: "right",
          render: (lot) => (
            <Group spacing={4} position="right" noWrap>
              <ActionIcon
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFave(lot);
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={favorites}
      onRowClick={rowClick}
    />
  );
}
