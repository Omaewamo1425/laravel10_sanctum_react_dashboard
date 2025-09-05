import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { LogOut, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authSlice";
import { showToast } from "@/utils/toast";
import axios from "axios";
import { setSystem } from "../store/systemSlice";
import { useAppContext } from "@/hooks/useAppContext";

const SelectSystem = () => {
  const [systems, setSystems] = useState([]);
  const { user, token } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSystems = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/systems", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSystems(res.data);
    } catch {
      showToast("Failed to load systems", "error");
    }
  }, [token]);

  const handleLogout = async () => {
      const token = localStorage.getItem("token");
      try {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(clearAuth());
        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (e) {
        console.error("Logout failed", e);
      }
    };

  useEffect(() => {
    fetchSystems();
  }, [fetchSystems]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex flex-col items-center justify-start p-6"
      style={{
        backgroundImage: "url('/images/bg-truck.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 flex justify-between items-center w-full max-w-4xl mb-6">
        <button  onClick={handleLogout}  className="flex items-center gap-2 text-white hover:text-red-300 font-semibold transition">
          <LogOut size={18} />
          Log Out
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-white drop-shadow-md">
          Welcome <span className="text-orange-400">{user?.first_name} {user?.last_name}</span>!
        </h2>
      </div>

      <div className="relative z-10 bg-white/90 shadow-xl rounded-xl w-full max-w-4xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-4 py-2">
          <h3 className="text-base md:text-lg font-bold">Select System</h3>
        </div>

        <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {systems.map((system) => (
            <div
              key={system.id}
              onClick={() => {
                dispatch(setSystem({ id: system.id}));
                navigate('/dashboard');
              }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-3 flex flex-col items-center text-center border border-gray-100 hover:scale-105"
            >
              <div className="bg-indigo-600 text-white p-2 rounded-full mb-2">
                <Layers size={20} />
              </div>

              <h4 className="font-semibold text-blue-800 text-sm mb-1">
                {system.system_name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectSystem;
