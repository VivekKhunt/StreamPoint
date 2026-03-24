import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { TopNav } from "./components/top-nav";
import { BottomNav } from "./components/bottom-nav";

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet /> 
        </main>
      </div>

      <BottomNav />
    </div>
  );
}