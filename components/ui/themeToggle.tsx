"use client";

import * as React from "react";
import { MonitorDot, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface IThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<IThemeToggleProps> = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn(`z-20 transition-all cursor-pointer`, className)}
    >
      {resolvedTheme === "light" && (
        <Sun
          className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme("dark")}
        />
      )}
      {resolvedTheme === "dark" && (
        <Moon
          className={`h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all light:-rotate-90 light:scale-0`}
          onClick={() => setTheme("light")}
        />
      )}

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-center p-2">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </Button>
  );
};

export default ThemeToggle;
