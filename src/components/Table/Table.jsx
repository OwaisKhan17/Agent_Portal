// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   getKeyValue,
// } from "@nextui-org/react";
// import { useMemo, useState } from "react";

// const TableComponent = ({ columns, data, rowsPerPage = 4 }) => {
//   // };

//   const [page, setPage] = useState(1);

//   const pages = Math.ceil(data.length / rowsPerPage);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return data.slice(start, end);
//   }, [page, data]);

//   return (
//     <>
//       <Table
//         aria-label="Example table with client side pagination"
//         bottomContent={
//           <div className="flex w-full justify-center">
//             <Pagination
//               isCompact
//               showControls
//               showShadow
//               color="secondary"
//               page={page}
//               total={pages}
//               onChange={(page) => setPage(page)}
//             />
//           </div>
//         }
//         classNames={{
//           wrapper: "min-h-[222px]",
//         }}
//       >
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn key={column.key}>{column.label}</TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={items}>
//           {(item) => (
//             <TableRow key={item.name}>
//               {(columnKey) => (
//                 <TableCell>{getKeyValue(item, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default TableComponent;

"use client";

// import { Table, Pagination } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const TableComponent = ({ columns, rowsPerPage, apiUrl }) => {
  const [data, setData] = useState([]);
  const [loading, loaderStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fetchData = async (page) => {
    loaderStatus(true);
    const response = await fetch(`${apiUrl}?page=${page}&limit=${rowsPerPage}`);
    const result = await response.json();
    setData(result.data);
    setTotalItems(result.total);
    loaderStatus(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    console.log(" page ");
    console.log(" page ", page);
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              {columns.map((column, index) => (
                <TableColumn key={index}>{column}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column}>{item[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            total={totalItems} // Update based on your total item count from the server
            initialPage={currentPage}
            onChange={handlePageChange}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default TableComponent;
