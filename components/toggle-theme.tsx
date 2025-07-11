"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ToggleTheme = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-md hover:bg-red-50 dark:hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-900 dark:focus:ring-red-500 h-9 w-9 flex items-center justify-center">
          <Sun className="h-5 w-5 text-red-900 scale-100 rotate-0 transition-all dark:text-red-500 dark:scale-0 dark:-rotate-90 absolute" />
          <Moon className="h-5 w-5 text-red-900 scale-0 rotate-90 transition-all dark:text-red-500 dark:scale-100 dark:rotate-0 absolute" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="min-w-[120px] bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="text-red-900 dark:text-red-500 focus:bg-red-50 dark:focus:bg-card/50 focus:text-red-900 dark:focus:text-red-400 cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="text-red-900 dark:text-red-500 focus:bg-red-50 dark:focus:bg-card/50 focus:text-red-900 dark:focus:text-red-400 cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="text-red-900 dark:text-red-500 focus:bg-red-50 dark:focus:bg-card/50 focus:text-red-900 dark:focus:text-red-400 cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleTheme