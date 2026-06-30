import jsPDF from "jspdf";
import { EmployeeListItem } from "@/types/employee";
import {
  generateQRCode,
  generateSignature,
  generateVerificationId,
} from "./reportVerification";

import { drawAnalyticsPage } from "./reportCharts";

import {
  drawHeader,
  drawExecutiveSummary,
  drawKpiCards,
  drawEmployeeTable,
  drawFooter,
} from "./reportLayout";

import {
  getEmployeeStatistics,
} from "./reportStatistics";

export async function generateEmployeeReport(employee: EmployeeListItem) {
  const doc = new jsPDF();
  const stats =
  getEmployeeStatistics(employee);
  const verificationId =
  generateVerificationId(employee.id);

const signature =
  generateSignature();

const qrCode =
  await generateQRCode(verificationId);

  drawHeader(doc);
  drawExecutiveSummary(doc, employee);
  drawKpiCards(doc, stats);
  drawEmployeeTable(doc, employee);
  drawFooter(doc,2);

  doc.addPage();

  drawAnalyticsPage(
  doc,
  employee,
  stats,
  qrCode,
  verificationId,
  signature
);

  doc.save(`employee_${employee.id}.pdf`);
}

