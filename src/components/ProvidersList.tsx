import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { providerListColumns } from "./table/ProvidersTable/providerListColumns";
import { DataTable } from "./table/ProvidersTable/DataTable";

const ProvidersList = () => {
  return (
    <TabsContent value="providers" className="space-y-4">
      <div className="admin-stat">Providers</div>
      <div className="data-table">
        <DataTable
          columns={providerListColumns}
          data={[
            {
              $id: "39289ru892897248",
              provider: {
                state: "Florida",
                name: "Gi Doe",
                gender: "Male",
                credential: "MD",
                specialty: "Surgery",
              },
              $collectionId: "",
              $databaseId: "",
              $createdAt: "",
              $updatedAt: "",
              $permissions: [],
            },
            {
              $id: "39289ru892897248",
              provider: {
                state: "Florida",
                name: "Gi Diaz",
                gender: "Female",
                credential: "MD",
                specialty: "Primary Practice",
              },
              $collectionId: "",
              $databaseId: "",
              $createdAt: "",
              $updatedAt: "",
              $permissions: [],
            },
          ]}
        />
      </div>
    </TabsContent>
  );
};

export default ProvidersList;
