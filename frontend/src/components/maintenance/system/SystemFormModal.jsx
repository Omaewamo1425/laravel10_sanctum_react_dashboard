import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "../../custom_modal/Modal"; 
import { Loader2, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function SystemFormModal({ open, onClose, form, setForm, onSubmit, saving}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

    return (

        <Modal open={open} onClose={onClose} title={form.id ? "Edit System" : "Create System"}>
        <div className="space-y-3 mt-2">
          <Input
            name="system_name"
            placeholder="System Name"
            onChange={handleChange}
            value={form.system_name || ""}
          />
          <Input
            name="db_host"
            placeholder="Database Host"
            onChange={handleChange}
            value={form.db_host || ""}
          />
          <Input
            name="db_port"
            placeholder="Database Port"
            onChange={handleChange}
            value={form.db_port || ""}
          />
          <Input
            name="db_database"
            placeholder="Database Name"
            onChange={handleChange}
            value={form.db_database || ""}
          />
          <Input
            name="db_username"
            placeholder="Database User Name"
            onChange={handleChange}
            value={form.db_username || ""}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="db_password"
              placeholder="Database Password"
              onChange={handleChange}
              value={form.db_password || ""}
              className="w-full pr-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        <Select
            value={form.is_active || ""}
            onValueChange={(value) => setForm((prev) => ({ ...prev, is_active: value }))}
            >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} disabled={saving} className="min-w-[100px] h-9">
              {saving ? (
                <div className="flex items-center justify-center w-full">
                  <Loader2 className="animate-spin h-5 w-5" />
                </div>
              ) : (
                form?.id ? "Update" : "Create"
              )}
          </Button>

          </div>
        </div>
      </Modal>
      
    );
}
