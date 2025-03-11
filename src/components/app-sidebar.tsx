"use client";

import { Home, Inbox, Settings, Info, History, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";

// Menu items (excluding settings)
const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "About", url: "/about", icon: Info },
    { title: "Add", url: "/add", icon: Inbox },
    { title: "History", url: "/history", icon: History },
];

export function AppSidebar() {
    const { user } = useUser();
    const pathname = usePathname();
    const { setTheme, theme } = useTheme(); // Get current theme
    const [showThemeOptions, setShowThemeOptions] = useState(false);

    const handleThemeChange = (newTheme: SetStateAction<string>) => {
        setTheme(newTheme);
        setShowThemeOptions(false); // Automatically close after selection
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(({ title, url, icon: Icon }) => (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={url}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition 
                                            ${pathname === url ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                }`}
                                        >
                                            <Icon />
                                            <span className="text-sm font-medium">{title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Theme Toggle Section (Auto-close on selection) */}
                            <SidebarMenuItem>
                                <button
                                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    onClick={() => setShowThemeOptions(!showThemeOptions)}
                                >
                                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                    <span className="text-sm font-medium">Theme</span>
                                </button>

                                {/* Show theme options when clicked */}
                                {showThemeOptions && (
                                    <div className="mt-2 flex flex-col gap-1 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
                                        <button
                                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            onClick={() => handleThemeChange("light")}
                                        >
                                            <Sun className="h-4 w-4" /> Light
                                        </button>
                                        <button
                                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            onClick={() => handleThemeChange("dark")}
                                        >
                                            <Moon className="h-4 w-4" /> Dark
                                        </button>
                                        <button
                                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            onClick={() => handleThemeChange("system")}
                                        >
                                            <Settings className="h-4 w-4" /> System
                                        </button>
                                    </div>
                                )}
                            </SidebarMenuItem>

                            {/* Authentication Section */}
                            <div className="mt-4 flex flex-col gap-2 items-center p-3 border-t border-gray-200 dark:border-gray-700">
                                <SignedOut>
                                    <SignInButton>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton>
                                        <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md">
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </SignedOut>

                                <SignedIn>
                                    <div className="flex items-center gap-2">
                                        <UserButton />
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {user?.fullName || "User"}
                                        </span>
                                    </div>
                                </SignedIn>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
