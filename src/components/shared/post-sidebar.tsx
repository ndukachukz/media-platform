// Sidebar.js
import React from "react";

export default function Sidebar() {
  return (
    <div className="sticky top-0 h-full p-4 bg-gray-100 w-64">
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Link 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Link 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Link 3
          </a>
        </li>
      </ul>
    </div>
  );
}
