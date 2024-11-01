"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  User,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, ExportIcon, EyeIcon, FilterIcon } from "components/svgIcons/icons";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

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

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    console.log('cellValue ',cellValue)
    switch (columnKey) {
      case "firstName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{item.role}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{item.firstName}</p>
          </div>
        );
        case "age":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{item.firstName}</p>
            </div>
          );
      case "actions":
        return (
          <div className="relative justify-center flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Custom styles */}
      <style jsx>{`
        .custom-pagination{
          background-color: #000000;
        }
        .custom-pagination .item.active{
          background-color: #19D2BCBF;
        }
      `}</style>

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

          <Table aria-label="Data table with actions">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            className="mt-4 flex justify-end custom-pagination"
            // isCompact
            showControls
            // showShadow
            // color="#19D2BCBF"
            total={totalItems}
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
