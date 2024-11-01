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
import { ExportIcon, FilterIcon } from "components/svgIcons/icons";
import { useEffect, useState } from "react";

const TableComponent = ({ columns, rowsPerPage, apiUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fetchData = async (page) => {
    setLoading(true);
    const response = await fetch(`${apiUrl}?page=${page}&limit=${rowsPerPage}`);
    const result = await response.json();
    setData(result.data);
    setTotalItems(result.total);
    setLoading(false);
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

        <div className="flex gap-x-5 justify-end mb-9 mt-8">
          <button className="bg-white rounded-xl border-1 border-[#0258643B] shadow-lg shadow-[#8E8E8E45] w-36 py-3 justify-center items-center flex gap-x-4">
            <FilterIcon />
            <span className="text-[#3E3E3E] font-medium text-base">Filters</span>
          </button>
          <button className="bg-white rounded-xl border-1 border-[#0258643B] shadow-lg shadow-[#8E8E8E45] w-36 py-3 justify-center items-center flex gap-x-4">
            <ExportIcon />
            <span className="text-[#3E3E3E] font-medium text-base">Export</span>
          </button>

        </div>

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
            isCompact
            showControls
            showShadow
            color="primary"
            total={totalItems} // Update based on your total item count from the server
            // initialPage={currentPage}
            page={currentPage}
            onChange={handlePageChange}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default TableComponent;
