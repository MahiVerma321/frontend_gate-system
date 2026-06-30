export type AvatarTheme =
  | "cyan"
  | "green"
  | "amber"
  | "red"
  | "violet"
  | "blue"
  | "purple";

export type EmployeeStatus =
  | "inside"
  | "outside";

export type EmployeeEvent =
  | "entered"
  | "exited"
  | "registered" ;

export interface RecognitionHistory {
    timestamp: string;
    time: string;
    confidence: number;
    result: string;
}

export type EmployeeAccountStatus =
  | "active"
  | "inactive";

export interface AttendanceHistory {
  date: string;
  firstIn: string;
  lastOut: string;
}

export interface AlertHistory {
  date: string;

  type:
    | "warning"
    | "critical"
    | "success";

  title: string;

  description: string;
}

export interface BaseEmployee {
  id: string;

  name: string;

  email: string;

  avatarTheme: AvatarTheme;

  accountStatus: EmployeeAccountStatus;

  videoUrl: string;

  registeredOn: string;
}

export interface EmployeeListItem
  extends BaseEmployee {

  status: EmployeeStatus;

  lastEvent: EmployeeEvent;

  lastSeen: string;

  attendanceToday:
    | "Present"
    | "Absent"
    | "Not Marked";

  totalRecognitions: number;

  alertsGenerated: number;
}

export interface EmployeeDetails
  extends EmployeeListItem {

  recognitionHistory:
    RecognitionHistory[];

  attendanceHistory:
    AttendanceHistory[];

  alertHistory:
    AlertHistory[];
}


//export interface Employee {
//  id: string;

//  name: string;

//  email: string;

//  accountStatus: EmployeeAccountStatus
  
//  status: EmployeeStatus;

//  lastEvent: EmployeeEvent;

//  lastSeen: string;

//  avatarTheme: AvatarTheme;

//  videoUrl: string;

//  registeredOn: string;

//  totalRecognitions: number;

//  attendanceToday: "Present" | "Absent" | "Not Marked";

//  alertsGenerated: number;

//  recognitionHistory: RecognitionHistory[];

//  attendanceHistory: AttendanceHistory[];

//  alertHistory: AlertHistory[];
//}