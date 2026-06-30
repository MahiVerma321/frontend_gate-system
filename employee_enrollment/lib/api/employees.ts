export async function fetchEmployees() {
  const response = await fetch(
    "/api/employees/list",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch employees"
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.employees;
}