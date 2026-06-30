"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type { EmployeeListItem } from "@/types/employee";
import { fetchEmployees } from "@/lib/api/employees";

type EmployeeContextType = {
  employees: EmployeeListItem[];

  loading: boolean;

  error: string;

  loadEmployees: () => Promise<void>;

  setEmployees: React.Dispatch<
    React.SetStateAction<EmployeeListItem[]>
  >;

  addEmployee: (
    employee: EmployeeListItem
  ) => void;
};

const EmployeeContext =
  createContext<EmployeeContextType | null>(
    null
  );

export function EmployeeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [employees, setEmployees] =
    useState<EmployeeListItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadEmployees() {
    try {
      setLoading(true);

      setError("");

      const data =
        await fetchEmployees();

      setEmployees(data);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message ??
          "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = (
    employee: EmployeeListItem
  ) => {
    setEmployees((prev) => [
      employee,
      ...prev,
    ]);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,

        loading,

        error,

        loadEmployees,

        setEmployees,

        addEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context =
    useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployees must be used inside EmployeeProvider"
    );
  }

  return context;
}

export interface CreateEmployeeRequest {
  employeeId: string;

  name: string;

  email: string;

  videoUrl: string;
}

export interface UpdateEmployeeRequest {
  employeeId: string;

  name: string;

  email: string;

  videoUrl?: string;
}