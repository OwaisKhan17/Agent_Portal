"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  DeleteIcon,
  EditIcon,
  ExportIcon,
  EyeIcon,
  FilterIcon,
} from "components/svgIcons/icons";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const TableComponent = ({ columns, showFilters, apiUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentTableData, setCurrentTableData] = useState(null);

  const fetchData = async (page, rowsOnPage) => {
    setLoading(true);
    const response = await fetch(`${apiUrl}?page=${page}&limit=${rowsOnPage}`);
    const result = await response.json();
    setData(result.data);
    setTotalItems(result.total);
    setLoading(false);
    setCurrentTableData(result.data);
  };

  useEffect(() => {
    fetchData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    console.log("cellValue ", cellValue);
    switch (columnKey) {
      case "firstName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {item.role}
            </p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {item.firstName}
            </p>
          </div>
        );
      case "age":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {item.firstName}
            </p>
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

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    fetchData(currentPage, rowsPerPage);
  };

  // const onRowsPerPageChange = useCallback((e) => {
  //   setRowsPerPage(Number(e.target.value));
  //   fetchData(currentPage ,rowsPerPage);
  // }, []);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    setFilterValue(trimmedValue);
    const filteredItems = data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(trimmedValue.toLowerCase())
      // item.email.toLowerCase().includes(value.toLowerCase()) ||
      // item.role.toLowerCase().includes(value.toLowerCase())
    );

    if (trimmedValue !== "") {
      setData(filteredItems);
    } else {
      setData(currentTableData);
    }
  };

  const classNames = useMemo(
    () => ({
      wrapper: ["border-b", "bg-black"],
      table : ["mb-8"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
      //   // changing the rows border radius
      //   // first
      //   "group-data-[first=true]:first:before:rounded-none",
      //   "group-data-[first=true]:last:before:rounded-none",
      //   // middle
      //   "group-data-[middle=true]:before:rounded-none",
      //   // last
            "border-b",
            "group-data-[last=true]:border-b"
      //   "group-data-[last=true]:first:before:rounded-none",
      //   "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <div> 

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <div className="flex justify-between mb-4">
            <Input
              className="w-80"
              placeholder="Search by name..."
              value={filterValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Dropdown>
              <DropdownTrigger>
                <Button>Status</Button>
              </DropdownTrigger>
              <DropdownMenu onSelectionChange={setStatusFilter}>
                <DropdownItem key="all">All</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <Button>Add New</Button> *

          </div> */}

          <div className="flex justify-between items-center mb-4">
            <Input
              className="w-80"
              placeholder="Search by name..."
              value={filterValue}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* <label className="flex items-center text-default-400 text-small">
              Per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label> */}
          </div>

          {showFilters && (
            <div className="flex gap-x-5 justify-end mb-9 mt-8 ">
              <button className="bg-white rounded-xl border-1 border-[#0258643B] shadow-lg shadow-[#8E8E8E45] w-36 py-3 justify-center items-center flex gap-x-4">
                <FilterIcon />
                <span className="text-[#3E3E3E] font-medium text-base">
                  Filters
                </span>
              </button>
              <button className="bg-white rounded-xl border-1 border-[#0258643B] shadow-lg shadow-[#8E8E8E45] w-36 py-3 justify-center items-center flex gap-x-4">
                <ExportIcon />
                <span className="text-[#3E3E3E] font-medium text-base">
                  Export
                </span>
              </button>
            </div>
          )}

          <Table aria-label="Data table with actions" classNames={classNames} removeWrapper>
            <TableHeader columns={columns} className="mb-8">
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data} emptyContent={"No data found"}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">
                Showing {data.length} from {totalItems}
              </span>
            </div>

            <Pagination
              showControls
              classNames={{
                // wrapper: "bg-black text-white",
                cursor: "bg-foreground text-background",
                isActive: "bg-[#15A199] text-black",
                cursor: "bg-[#15A199] shadow-lg text-white font-bold",
                item: ""
              }}
              color="default"
              page={currentPage}
              total={totalItems}
              onChange={handlePageChange}
              rowsPerPage={rowsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TableComponent;
