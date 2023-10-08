import { useTotalUsers } from "@/hooks/useTotalUsers";
import DataTable, { Alignment } from "react-data-table-component";
import styled from "styled-components";

const generateRandomEthereumAddress = () =>
  `0x${
    Array.from(
      { length: 40 },
      () => Math.floor(Math.random() * 16).toString(16),
    ).join("")
  }`;

const generateRandomData = () =>
  Array.from({ length: 50 }, () => ({
    mebibytes: Math.floor(Math.random() * 10000),
    block: (Math.random() * 1000000).toFixed(0),
    from: generateRandomEthereumAddress(),
    event: ["purchase", "sale", "transfer"][Math.floor(Math.random() * 3)],
  }));

const data = generateRandomData();

const columns: {
  [k: string]: string | ((k: typeof data[number]) => unknown);
}[] = [
  {
    name: "Buyer",
    selector: (row) => row.from,
  },
  {
    name: "Event",
    selector: (row) => row.event,
  },
  {
    name: "Block Number",
    selector: (row) => row.block,
  },
  {
    name: "GiB",
    selector: (row) => (row.mebibytes / 1024).toFixed(2),
  },
];

const WrapperContainer = styled.div`
    width: 840px;
    border-radius: 10px;
    padding: 20px;
    overflow-x: hidden;
    border: 2px solid #0e6efd;
    margin: 20px auto;
`;

export function WorldTable() {
  const { data: users, isLoading } = useTotalUsers();

  return (!isLoading &&
    (
      <WrapperContainer>
        <DataTable
          title="Real-time Blockchain Transactions"
          columns={columns.map((col) => ({
            ...col,
            sortable: true,
            reorder: true,
          }))}
          data={data.map((row) => ({
            ...row,
            from: (users as string[])[
              Math.floor(Math.random() * (users as string[]).length)
            ],
          }))}
          pagination
          responsive
          subHeaderAlign={Alignment.RIGHT}
          subHeaderWrap
          customStyles={{
            header: {
              style: {
                color: "#0e6efd",
                fontWeight: "bold",
                fontSize: "24px",
              },
            },
            head: {
              style: {
                color: "#0e6efd",
                fontWeight: "bold",
                fontSize: "16px",
              },
            },
          }}
        />
      </WrapperContainer>
    ));
}
