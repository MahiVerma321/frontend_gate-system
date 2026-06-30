import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EmployeeListItem } from "@/types/employee";
import { EmployeeStatistics } from "./reportStatistics";

export function drawHeader(doc: jsPDF) {
  doc.setFillColor(11, 19, 32);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(0, 220, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text("SecureVision", 15, 18);

  doc.setFontSize(11);
  doc.setTextColor(240);

  doc.text("Employee Security Report", 15, 27);
}

export function drawExecutiveSummary(
  doc: jsPDF,
  employee: EmployeeListItem
) {
  doc.setFillColor(247, 249, 252);

  doc.roundedRect(15, 48, 180, 60, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30);

  doc.text(employee.name, 22, 62);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100);

  doc.text(employee.email, 22, 72);
  doc.text(`Employee ID: ${employee.id}`, 22, 80);
  doc.text(`Last Seen: ${employee.lastSeen}`, 22, 88);

  const active =
    employee.status.toLowerCase() === "inside";

  doc.setFillColor(
    active ? 22 : 220,
    active ? 185 : 68,
    active ? 129 : 68
  );

  doc.roundedRect(148, 58, 32, 12, 3, 3, "F");

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text(
    active ? "ACTIVE" : "INACTIVE",
    152,
    66
  );
}

export function metricCard(
  doc: jsPDF,
  x: number,
  y: number,
  title: string,
  value: string
) {
  doc.setFillColor(250, 250, 252);

  doc.roundedRect(x, y, 52, 28, 3, 3, "F");

  doc.setFontSize(9);
  doc.setTextColor(110);

  doc.text(title, x + 5, y + 8);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20);

  doc.text(value, x + 5, y + 20);
}

export function drawKpiCards(
  doc: jsPDF,
  stats: EmployeeStatistics
) {
  metricCard(
  doc,
  15,
  40,
  "Recognition",
  `${stats.recognitionRate.toFixed(1)}%`
);

metricCard(
  doc,
  79,
  40,
  "Confidence",
  `${stats.averageConfidence.toFixed(1)}%`
);

metricCard(
  doc,
  143,
  40,
  "Alerts",
  `${stats.totalAlerts}`
);
}

export function drawEmployeeTable(
  doc: jsPDF,
  employee: EmployeeListItem
) {
  doc.setFontSize(16);
  doc.setTextColor(30);

  doc.text("Employee Details", 15, 160);

  autoTable(doc, {
    startY: 168,

    head: [["Field", "Value"]],

    body: [
      ["Employee ID", employee.id],
      ["Employee Name", employee.name],
      ["Email", employee.email],
      ["Status", employee.status],
      ["Last Seen", employee.lastSeen],
    ],

    theme: "grid",

    headStyles: {
      fillColor: [0, 188, 212],
    },

    alternateRowStyles: {
      fillColor: [245, 248, 250],
    },
  });
}

export function drawFooter(doc: jsPDF, page=1) {
  doc.line(15, 285, 195, 285);

  doc.setFontSize(9);

  doc.setTextColor(120);

  doc.text(
    "SecureVision",
    15,
    291
  );

  doc.text(
    `Page ${page}`,
    182,
    291
  );
}