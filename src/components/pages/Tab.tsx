import React, { useState, FC } from "react";

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  return (
    <div className="mt-8">
      {/* Навигация табов */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab1"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab2"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab3"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Tab 3
        </button>
      </div>

      {/* Контент табов */}
      <div className="mt-4">
        {activeTab === "tab1" && (
          <p className="text-gray-700">This is the content for Tab 1.</p>
        )}
        {activeTab === "tab2" && (
          <p className="text-gray-700">Here is some content for Tab 2.</p>
        )}
        {activeTab === "tab3" && (
          <p className="text-gray-700">And this is the content for Tab 3.</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
