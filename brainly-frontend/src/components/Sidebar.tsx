import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

export function Sidebar() {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 w-72 fixed left-0 top-0 shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-8 border-b border-gray-100 bg-white">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-xl mr-3">
            <div className="text-purple-600">
              <Logo />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Brainly</h1>
            <p className="text-sm text-gray-500">Your second brain 🧠</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-200 transition-all duration-200 group">
            <PlusIcon size="sm" />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-purple-600">
              Add
            </span>
          </button>
          <button className="flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-200 transition-all duration-200 group">
            <ShareIcon />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-purple-600">
              Share
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Content Types
          </h3>
          <div className="space-y-2">
            <SidebarItem
              text="All Content"
              icon={<div className="text-gray-500">📝</div>}
              isActive={true}
              count={12}
            />
            <SidebarItem
              text="YouTube Videos"
              icon={<YoutubeIcon />}
              count={8}
            />
            <SidebarItem
              text="Twitter Posts"
              icon={<TwitterIcon />}
              count={4}
            />
            <SidebarItem
              text="LinkedIn Articles"
              icon={<div className="text-blue-600">💼</div>}
              count={2}
            />
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">User</p>
            <p className="text-xs text-gray-500">user@brainly.com</p>
          </div>
          <div className="text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
