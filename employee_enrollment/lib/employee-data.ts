import { EmployeeDetails } from "@/types/employee";

export const employees: EmployeeDetails[] = [
  {
    id: "EMP00124",

    name: "Mahi Verma",

    email: "mahi@email.com",

    status: "inside",

    lastEvent: "entered",

    accountStatus:"active",

    lastSeen: "Today • 3:42 PM",

    avatarTheme: "cyan",

    videoUrl:
      "employee-videos/mahi.mp4",

    registeredOn:
      "22 June 2026",

    totalRecognitions: 183,

    attendanceToday: "Present",

    alertsGenerated: 2,

    recognitionHistory: [
  {
    timestamp: "2026-06-28T15:17:00",
    time: "Today • 3:17 PM",
    confidence: 99.2,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-28T12:15:00",
    time: "Today • 12:15 PM",
    confidence: 98.7,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-27T17:05:00",
    time: "Yesterday • 5:05 PM",
    confidence: 97.5,
    result: "Recognized",
  },
],

    attendanceHistory: [
      {
        date: "Today",
        firstIn: "09:08",
        lastOut: "--",
      },
      {
        date: "Yesterday",
        firstIn: "09:04",
        lastOut: "17:41",
      },
      {
        date: "Jun 18",
        firstIn: "09:12",
        lastOut: "17:57",
      },
    ],

    alertHistory: [
  {
    date: "Jun 20",

    type: "warning",

    title: "Low confidence recognition",

    description:
      "Recognition confidence dropped below the configured threshold.",
  },

  {
    date: "Jun 12",

    type: "critical",

    title: "Multiple failed attempts",

    description:
      "Three consecutive recognition failures detected.",
  },

  {
    date: "Jun 01",

    type: "success",

    title: "Face profile updated",

    description:
      "Employee profile was successfully re-enrolled.",
  },
]
  },

  {
    id: "EMP00125",
    name: "Rahul Singh",
    email: "rahul@email.com",
    accountStatus:"active",
    status: "outside",

    lastEvent: "exited",
    
    lastSeen: "Today • 2:18 PM",

    avatarTheme: "green",

    videoUrl:
      "https://company-storage/rahul.mp4",

    registeredOn: "18 June 2026",

    totalRecognitions: 154,

    attendanceToday: "Present",

    alertsGenerated: 2,

    recognitionHistory: [
  {
    timestamp: "2026-06-28T15:30:00",
    time: "Today • 3:30 PM",
    confidence: 99.2,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-27T12:56:00",
    time: " Yesterday • 12:56 PM",
    confidence: 98.7,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-27T17:00:00",
    time: "Yesterday • 5:00 PM",
    confidence: 97.5,
    result: "Recognized",
  },
],

    attendanceHistory: [
      {
        date: "Today",
        firstIn: "09:08",
        lastOut: "--",
      },
      {
        date: "Yesterday",
        firstIn: "09:04",
        lastOut: "17:41",
      },
      {
        date: "Jun 18",
        firstIn: "09:12",
        lastOut: "17:57",
      },
    ],

    alertHistory: [
  {
    date: "Jun 20",

    type: "warning",

    title: "Low confidence recognition",

    description:
      "Recognition confidence dropped below the configured threshold.",
  },

  {
    date: "Jun 12",

    type: "critical",

    title: "Multiple failed attempts",

    description:
      "Three consecutive recognition failures detected.",
  },

  {
    date: "Jun 01",

    type: "success",

    title: "Face profile updated",

    description:
      "Employee profile was successfully re-enrolled.",
  },
]
},

{
    id: "EMP00126",
    name: "Ananya Das",
    email: "ananya@email.com",
    accountStatus:"active",
    status: "inside",

    lastEvent: "entered",
    
    lastSeen: "Today • 1:58 PM",

    avatarTheme: "amber",

    videoUrl:
      "https://company-storage/ananya.mp4",

    registeredOn: "15 June 2026",

    totalRecognitions: 231,

    attendanceToday: "Present",

    alertsGenerated: 1,

    recognitionHistory: [
  {
    timestamp: "2026-06-28T15:32:00",
    time: "Today • 3:32 PM",
    confidence: 99.2,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-28T12:05:00",
    time: "Today • 12:05 PM",
    confidence: 98.7,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-27T17:09:00",
    time: "Yesterday • 5:09 PM",
    confidence: 97.5,
    result: "Recognized",
  },
],

    attendanceHistory: [
      {
        date: "Today",
        firstIn: "09:08",
        lastOut: "--",
      },
      {
        date: "Yesterday",
        firstIn: "09:04",
        lastOut: "17:41",
      },
      {
        date: "Jun 18",
        firstIn: "09:12",
        lastOut: "17:57",
      },
    ],

    alertHistory: [
  {
    date: "Jun 20",

    type: "warning",

    title: "Low confidence recognition",

    description:
      "Recognition confidence dropped below the configured threshold.",
  },

  {
    date: "Jun 12",

    type: "critical",

    title: "Multiple failed attempts",

    description:
      "Three consecutive recognition failures detected.",
  },

  {
    date: "Jun 01",

    type: "success",

    title: "Face profile updated",

    description:
      "Employee profile was successfully re-enrolled.",
  },
]
},

{
    id: "EMP00127",
    name: "Rohit Kumar",
    email: "rohit@email.com",
    accountStatus:"active",
    status: "inside",

    lastEvent: "exited",
    
    lastSeen: "5 days ago",

    avatarTheme: "red",

    videoUrl:
      "https://company-storage/rohit.mp4",

    registeredOn: "10 June 2026",

    totalRecognitions: 0,

    attendanceToday: "Absent",

    alertsGenerated: 0,

    recognitionHistory: [
  {
    timestamp: "2026-06-28T14:42:00",
    time: "Today • 2:42 PM",
    confidence: 99.2,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-28T10:15:00",
    time: "Today • 10:15 PM",
    confidence: 98.7,
    result: "Recognized",
  },

  {
    timestamp: "2026-06-27T16:05:00",
    time: "Yesterday • 4:05 PM",
    confidence: 97.5,
    result: "Recognized",
  },
],

    attendanceHistory: [
      {
        date: "Today",
        firstIn: "09:08",
        lastOut: "--",
      },
      {
        date: "Yesterday",
        firstIn: "09:04",
        lastOut: "17:41",
      },
      {
        date: "Jun 18",
        firstIn: "09:12",
        lastOut: "17:57",
      },
    ],

    alertHistory: [
  {
    date: "Jun 20",

    type: "warning",

    title: "Low confidence recognition",

    description:
      "Recognition confidence dropped below the configured threshold.",
  },

  {
    date: "Jun 12",

    type: "critical",

    title: "Multiple failed attempts",

    description:
      "Three consecutive recognition failures detected.",
  },

  {
    date: "Jun 01",

    type: "success",

    title: "Face profile updated",

    description:
      "Employee profile was successfully re-enrolled.",
  },
]
}
];