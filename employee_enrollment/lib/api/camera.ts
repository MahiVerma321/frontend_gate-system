const BASE_URL = "http://localhost:8000";

export async function getMonitoringStatus() {
  const res = await fetch(`${BASE_URL}/status`);

  if (!res.ok) {
    throw new Error("Unable to get monitoring status");
  }

  return res.json();
}

export async function startMonitoring() {
  const res = await fetch(
    `${BASE_URL}/start_monitoring`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Unable to start monitoring");
  }

  return res.json();
}

export async function stopMonitoring() {
  const res = await fetch(
    `${BASE_URL}/stop_monitoring`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Unable to stop monitoring");
  }

  return res.json();
}


export async function getHealth() {
  const res = await fetch(`${BASE_URL}/health`);

  if (!res.ok) {
    throw new Error("Camera service unavailable");
  }

  return res.json();
}

export async function getExitMonitoringStatus() {
  const res = await fetch(
    `${BASE_URL}/exit_monitoring_status`
  );

  if (!res.ok) {
    throw new Error("Failed to get exit monitoring status");
  }

  return res.json();
}

export async function startExitMonitoring() {
  const res = await fetch(
    `${BASE_URL}/start_exit_monitoring`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to start exit monitoring");
  }

  return res.json();
}

export async function stopExitMonitoring() {
  const res = await fetch(
    `${BASE_URL}/stop_exit_monitoring`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to stop exit monitoring");
  }

  return res.json();
}