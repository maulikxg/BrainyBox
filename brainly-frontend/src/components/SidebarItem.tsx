import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
  count?: number;
  onClick?: () => void;
}

export function SidebarItem({
  text,
  icon,
  isActive = false,
  count,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-purple-100 text-purple-700 shadow-sm border border-purple-200"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${
            isActive
              ? "text-purple-600"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
        >
          {icon}
        </div>
        <span
          className={`ml-3 text-sm font-medium ${
            isActive
              ? "text-purple-700"
              : "text-gray-700 group-hover:text-gray-900"
          }`}
        >
          {text}
        </span>
      </div>

      {count !== undefined && (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isActive
              ? "bg-purple-200 text-purple-700"
              : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </div>
  );
}
