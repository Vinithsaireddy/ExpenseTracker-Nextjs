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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

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
    const { setTheme } = useTheme(); // Get current theme

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

                            {/* Settings with Theme Button Inside */}
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="flex w-full items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                            <Settings />
                                            <span className="text-sm font-medium">Theme</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                                <Settings className="h-4 w-4" />
                                                <span className="text-sm font-medium">Theme</span>
                                            </DropdownMenuSubTrigger>

                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                    <Sun className="h-4 w-4 mr-2" /> Light Theme
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                    <Moon className="h-4 w-4 mr-2" /> Dark Theme
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                                    <Settings className="h-4 w-4 mr-2" /> System Theme
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
