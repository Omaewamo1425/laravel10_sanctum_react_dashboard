import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import DataTableServer from "@/components/tables/DataTableServer";
import { showToast } from "@/utils/toast";
import { confirmAction } from "@/utils/confirm";
import axios from "axios";
import SystemFormModal from "@/components/maintenance/system/SystemFormModal";
import { hasPermission } from "@/utils/permissions";

export const System = () => {
  const token = useSelector((state) => state.auth.token);
  const permissions = useSelector((state) => state.auth.permissions);

  const [form, setForm] = useState({});
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openCreate = () => {
    setForm({ system_name: "", is_active: "", db_host: "", db_port: "", db_database: "", db_username: "", db_password: "" });
    setModal(true);
  };

  const openEdit = async (system_id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/systems/${system_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const system = res.data; 
      setForm({
        ...system,
        db_password: system.db_password ?? "",
        
        is_active: system.is_active.toString(),
      });
      setModal(true);
    } catch {
      showToast("Failed to load system for editing", "error");
    }
  };



  const saveSystem = async () => {
    const label = form.id ? "Update" : "Create";

    const confirmed = await confirmAction(`Are you sure to ${label.toLowerCase()} this user?`, async () => {
      setSaving(true);

      const url = form.id
        ? `http://localhost:8000/api/systems/${form.id}`
        : `http://localhost:8000/api/systems`;
      const method = form.id ? axios.put : axios.post;

      const response = await method(url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast(response.data.message);
      setModal(false);
      setRefreshKey(prev => prev + 1);
    });

    if (!confirmed) setModal(true);
    setSaving(false);
  };

  const deleteUser = async (id) => {
    await confirmAction("Are you sure to delete this user?", async () => {
      const response = await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast(response.data.message);
      setRefreshKey(prev => prev + 1);
    });
  };

  const columns = [
    {
      accessorKey: "system_name",
      header: () => <div className="text-center text-[#e15b05]">System Name</div>,
      cell: (info) => <div className="text-center text-xs">{info.getValue()}</div>,
    },
    {
      accessorKey: "db_host",
      header: () => <div className="text-center text-[#e15b05]">Database Host</div>,
      cell: (info) => <div className="text-center text-xs">{info.getValue()}</div>,
    },
    {
      accessorKey: "db_port",
      header: () => <div className="text-center text-[#e15b05]">Database Port</div>,
      cell: (info) => <div className="text-center text-xs">{info.getValue()}</div>,
    },
    {
      accessorKey: "db_database",
      header: () => <div className="text-center text-[#e15b05]">Database Name</div>,
      cell: (info) => <div className="text-center text-xs">{info.getValue()}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center text-[#e15b05]">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-1 px-1 py-0.5">
          {hasPermission(permissions, "edit-users") && (
            <Button
              size="sm"
              className="h-6 px-2 text-[10px]"
              variant="outline"
              onClick={() => openEdit(row.original.id)}
            >
              Edit
            </Button>
          )}
          {hasPermission(permissions, "delete-users") && (
            <Button
              size="sm"
              className="h-6 px-2 text-[10px]"
              variant="destructive"
              onClick={() => deleteUser(row.original.id)}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTableServer
        token={token}
        permissions={permissions}
        fetchUrl="http://localhost:8000/api/systems/read"
        columnsDef={columns}
        refetchTrigger={refreshKey}
        createButton={
          hasPermission(permissions, "create-users") && (
            <Button onClick={openCreate}>+ Create System</Button>
          )
        }
      />

      <SystemFormModal
        open={modal}
        onClose={() => setModal(false)}
        form={form}
        setForm={setForm}
        onSubmit={saveSystem}
        saving={saving}
      />
    </>
  );
}
