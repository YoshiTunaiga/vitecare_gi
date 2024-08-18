import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ProvidersTypes } from "../../../types/appwrite.types";

export const providerListColumns: ColumnDef<ProvidersTypes>[] = [
  {
    header: "NPI-ID",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-14-medium ">{data.provider.name}</p>;
    },
  },
  {
    header: "State",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-14-medium ">{data.provider.state}</p>;
    },
  },
  {
    header: "Gender",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-14-medium ">{data.provider.gender}</p>;
    },
  },
  {
    header: "Credentials",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-14-medium ">{data.provider.credential}</p>;
    },
  },
  {
    header: "Specialty",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-14-medium ">{data.provider.specialty}</p>;
    },
  },
];
