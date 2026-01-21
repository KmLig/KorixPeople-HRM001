export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  location?: string;
  workType?: 'full-time' | 'part-time' | 'contract';
}

export interface AttendanceLog {
  id: string;
  employee: Employee;
  date: string;
  checkIn?: string;
  checkOut?: string;
  hours?: string;
  status: 'on-time' | 'late' | 'absent' | 'overtime';
}

export interface Shift {
  id: string;
  employee: Employee;
  date: string;
  startTime: string;
  endTime: string;
  type: 'regular' | 'overtime' | 'holiday';
}

export interface LeaveRequest {
  id: string;
  employee: Employee;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

export interface PayrollRecord {
  id: string;
  employee: Employee;
  period: string;
  baseSalary: number;
  deductions: number;
  bonuses: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid';
}

export interface PerformanceReview {
  id: string;
  employee: Employee;
  cycle: string;
  rating: number;
  completed: boolean;
  dueDate: string;
}

export interface JobApplication {
  id: string;
  candidateName: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  resume?: string;
}
