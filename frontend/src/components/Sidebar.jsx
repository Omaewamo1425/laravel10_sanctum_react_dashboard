import { Link, useLocation } from "react-router-dom";
import { Atom, Rocket, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { hasPermission } from "@/utils/permissions";

export default function Sidebar({
  sidebarOpen,
  sidebarCollapsed,
  visibleLinks,
  toggleSidebar,
  permissions,
}) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <aside
        className={`fixed md:static z-40 inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${sidebarCollapsed ? "w-20" : "w-60"}`}
      >
        {/* Logo */}
        <div className="h-[64px] px-4 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          {sidebarCollapsed ? (
            <Rocket className="text-[#e15b05] h-6 w-6" />
          ) : (
            <>
              <Atom className="w-5 h-5" />
              <h2 className="text-xl font-extrabold text-[#e15b05] tracking-wide">
                Template
              </h2>
            </>
          )}
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {visibleLinks.map((link) => {
            if (link.children) {
              const isOpen = openGroups[link.label] || false;

              return (
                <div key={link.label}>
                  <button
                    onClick={() => toggleGroup(link.label)}
                    className="flex items-center justify-between w-full gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-gray-400" />
                      {!sidebarCollapsed && <span>{link.label}</span>}
                    </div>
                    {!sidebarCollapsed &&
                      (isOpen ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      ))}
                  </button>

                  <AnimatePresence>
                    {isOpen && !sidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 mt-1 flex flex-col gap-1"
                      >
                        {link.children
                          .filter(
                            ({ permission }) =>
                              !permission || hasPermission(permissions, permission)
                          )
                          .map(({ to, label, icon: Icon }) => {
                            const isActive = location.pathname === to;
                            return (
                              <Link
                                key={to}
                                to={to}
                                onClick={() => toggleSidebar(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                  isActive
                                    ? "bg-[#e15b05]/10 text-[#e15b05]"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    isActive ? "text-[#e15b05]" : "text-gray-400"
                                  }`}
                                />
                                <span>{label}</span>
                              </Link>
                            );
                          })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => toggleSidebar(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#e15b05]/10 text-[#e15b05]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${sidebarCollapsed ? "justify-center p-2" : ""}`}
              >
                <link.icon
                  className={`h-5 w-5 ${isActive ? "text-[#e15b05]" : ""}`}
                />
                {!sidebarCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </>
  );
}
