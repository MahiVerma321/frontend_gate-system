import jsPDF from "jspdf";
import { metricCard } from "./reportLayout";
import { type EmployeeStatistics } from "./reportStatistics";
import { EmployeeListItem } from "@/types/employee";

    const graphTopY = 120;
const graphBaseY = 205;

export function drawBar(
  doc: jsPDF,
  x: number,
  baseY: number,
  height: number
) {
  doc.setFillColor(0, 188, 212);

  doc.roundedRect(
    x,
    baseY - height,
    10,
    height,
    2,
    2,
    "F"
  );
}


export function drawAnalyticsPage(
  doc: jsPDF,
  employee: EmployeeListItem,
  stats: EmployeeStatistics,
  qrCode: string,
  verificationId: string,
  signature: string
) {
    doc.setFillColor(11,19,32);
doc.rect(0,0,210,28,"F");

doc.setTextColor(0,220,255);
doc.setFontSize(22);
doc.setFont("helvetica","bold");

doc.text("SecureVision Analytics",15,18);

doc.setTextColor(240);
doc.setFontSize(10);

doc.text(
"Recognition Performance Dashboard",
15,
25
);

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

doc.setFontSize(16);
doc.setFont("helvetica", "bold");

doc.setFontSize(16);
doc.setFont("helvetica", "bold");

doc.text(
  "Recognition Trend",
  15,
  graphTopY
);

doc.setDrawColor(180);

doc.line(
  20,
  graphBaseY,
  120,
  graphBaseY
);

const minConfidence = Math.min(...stats.confidenceHistory);
const maxConfidence = Math.max(...stats.confidenceHistory);

const minBarHeight = 48;
const maxBarHeight = 65;

  doc.setFontSize(8);
doc.setTextColor(120);

doc.text(
  "Relative confidence trend",
  15,
  graphTopY + 7
);

stats.confidenceHistory.forEach((confidence, index) => {
  const x = 22 + index * 28;

  const height =
  minBarHeight +
  ((confidence - minConfidence) /
    (maxConfidence - minConfidence || 1)) *
    (maxBarHeight - minBarHeight);

  drawBar(doc, x, graphBaseY, height);

  doc.setFontSize(8);
  doc.setTextColor(90);

  doc.text(
    `${confidence.toFixed(1)}%`,
    x,
    graphBaseY - height - 4
  );

});

employee.recognitionHistory
  .slice(0, 5)
  .forEach((item, index) => {

    const x = 22 + index * 28;

    doc.text(
      item.time,
      x,
      graphBaseY + 15
    );

});

doc.setFillColor(248,249,252);

doc.roundedRect(
  138,
  92,
  58,
  110,
  4,
  4,
  "F"
);

doc.setFont("helvetica","bold");

doc.setFontSize(15);

doc.setTextColor(25);

doc.text(
  "Verification",
  143,
  104
);

doc.addImage(
  qrCode,
  "PNG",
  149,
  110,
  36,
  36
);

doc.setFontSize(8);

doc.setTextColor(90);

doc.text(
  "Verification ID",
  143,
  154
);

doc.setFont("courier","bold");

doc.text(
  verificationId,
  143,
  160
);

doc.setFont("helvetica","bold");

doc.text(
  "Generated",
  143,
  170
);

doc.setFont("helvetica","normal");

doc.text(
  new Date().toLocaleString(),
  143,
  176
);

doc.setFont("helvetica","bold");

doc.text(
  "Digital Signature",
  143,
  186
);

doc.setFont("courier","normal");

doc.setFontSize(7);

doc.text(
  signature,
  143,
  192
);

}