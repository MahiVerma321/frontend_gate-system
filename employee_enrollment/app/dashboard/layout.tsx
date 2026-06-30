import "./dashboard.css";
import { Geist, Geist_Mono } from "next/font/google";
import { EmployeeProvider } from "@/context/employee-context";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmployeeProvider>
      <main>
    <div
      className={`dark ${geist.variable} ${mono.variable} bg-background text-foreground min-h-screen font-sans`}
    >
      {children}
    </div>
    </main>
    </EmployeeProvider>
  );
}