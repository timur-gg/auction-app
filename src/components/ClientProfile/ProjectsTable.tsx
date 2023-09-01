import { Badge, Group, ActionIcon } from "@mantine/core";
import { IconBed, IconBath, IconRuler, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auctionData, lots } from "../../data.js";

export default function ProjectsTable(props: any) {
  const { auctions, deleteFave } = props;
  const navigate = useNavigate();

  const rowClick = (lot: any) => {
    navigate(`/project/${lot.auction}`);
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
        { accessor: "builder" },
        { accessor: "address" },
        {
          accessor: "unit",
          title: "Units",
          render: (a) =>
            a.lotsAuctioned
              ?.map((l: number) => lots.find((i) => i.id === l)?.unit)
              .join(", ") || [],
        },

        {
          accessor: "status",
          title: "Auction Date",
          render: (lot) =>
            lot.status === "Live Auction" ? (
              <Badge color="green" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : lot.status === "passed" ? (
              <Badge color="red" size="md" variant="filled">
                {lot.status}
              </Badge>
            ) : (
              lot.auctionDate
            ),
        },

        {
          accessor: "actions",
          title: <></>,
          textAlignment: "right",
          width: 20,
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
      records={auctions}
      onRowClick={rowClick}
    />
  );
}
