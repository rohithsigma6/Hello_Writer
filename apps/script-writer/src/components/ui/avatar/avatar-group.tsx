"use client"

import type React from "react"
import { useState } from "react"
import defaultUser from "@/assets/default-user.png"

interface Avatar {
  imgLink?: string
  username: string
}

interface AvatarGroupProps {
  avatars: Avatar[]
  maxVisible?: number
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, maxVisible = 4 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Create a copy of the avatars array to avoid modifying the original
  const allAvatars = [...avatars]

  // Determine which avatars to display based on expansion state
  const displayAvatars = isExpanded ? allAvatars : allAvatars.slice(0, maxVisible)
  const extraCount = allAvatars.length - maxVisible

  return (
    <div
      className="relative inline-flex items-center rounded-[16px] p-2 space-x-1"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`flex transition-all duration-300 ease-in-out ${isExpanded ? "overflow-visible" : "overflow-hidden"}`}
      >
        {displayAvatars.map((avatar, index) => (
          <div
            key={index}
            className={`relative group transition-all duration-300 ease-in-out ${
              isExpanded ? "translate-x-0 opacity-100" : ""
            }`}
            style={{
              transform: isExpanded ? "translateX(0)" : `translateX(${index > 0 ? "-" + index * 10 + "px" : "0"})`,
              zIndex: displayAvatars.length - index,
              marginLeft: index > 0 ? "-10px" : "0",
            }}
          >
            <img
              src={avatar?.imgLink || defaultUser}
              alt={avatar?.username}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-white transform scale-90 group-hover:scale-110 transition-transform duration-300 ease-out"
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
              {avatar?.username}
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && extraCount > 0 && (
        <div className="relative group ml-1">
          <div
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs font-medium transform scale-90 group-hover:scale-110 transition-transform duration-300 ease-out border-2 border-white"
            style={{ zIndex: 0 }}
          >
            +{extraCount}
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
            {extraCount} more
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarGroup

