"use client";

import { useState, useEffect } from "react";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiBriefcase,
} from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    settings: false,
    management: false,
  });

  useEffect(() => {
    const storedDropdowns = localStorage.getItem("dropdowns");
    if (storedDropdowns) {
      setDropdowns(JSON.parse(storedDropdowns));
    }
  }, []);

  const toggleDropdown = (menu) => {
    setDropdowns((prev) => {
      const newDropdowns = { ...prev, [menu]: !prev[menu] };
      localStorage.setItem("dropdowns", JSON.stringify(newDropdowns));
      return newDropdowns;
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white p-5 transform transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="text-white p-2 bg-gray-700 rounded mb-4 w-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FiMenu size={24} className="mx-auto" />
        </button>

        <nav>
          <ul>
            <li className="mb-4 flex items-center gap-3">
              <FiHome size={24} />{" "}
              {!isCollapsed && <Link href="/dashboard">Dashboard</Link>}
            </li>
            <li className="mb-4 flex items-center gap-3">
              <FiUser size={24} />{" "}
              {!isCollapsed && <Link href="/users">Users</Link>}
            </li>
            {/* Settings Dropdown Menu */}
            <li className="mb-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleDropdown("settings")}
              >
                <FiSettings size={24} /> {!isCollapsed && <span>Settings</span>}
                {!isCollapsed && (
                  <FiChevronDown
                    size={20}
                    className={`transition-transform ${
                      dropdowns.settings ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {!isCollapsed && dropdowns.settings && (
                <ul className="ml-8 mt-2 space-y-2">
                  <li>
                    <Link href="/settings/profile" className="block text-sm">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings/security" className="block text-sm">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/notifications"
                      className="block text-sm"
                    >
                      Notifications
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Management Dropdown Menu */}
            <li className="mb-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleDropdown("management")}
              >
                <FiBriefcase size={24} />{" "}
                {!isCollapsed && <span>Management</span>}
                {!isCollapsed && (
                  <FiChevronDown
                    size={20}
                    className={`transition-transform ${
                      dropdowns.management ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {!isCollapsed && dropdowns.management && (
                <ul className="ml-8 mt-2 space-y-2">
                  <li>
                    <Link href="/management/projects" className="block text-sm">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/management/teams" className="block text-sm">
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link href="/management/reports" className="block text-sm">
                      Reports
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-6 flex items-center gap-3 text-red-400">
              <FiLogOut size={24} /> {!isCollapsed && <button>Logout</button>}
            </li>
          </ul>
        </nav>
      </div>

      {/* Content area */}
      <div
        className={`flex-1 min-h-screen p-5 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <h2 className="text-2xl font-semibold">
          Welcome to the Admin Dashboard
        </h2>
        <p className="mt-4">Manage your users, settings, and more.</p>
      </div>
    </div>
  );
}
