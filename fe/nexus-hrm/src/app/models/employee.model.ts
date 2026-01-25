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
  role?: string;
}

export interface PerformanceReview {
  id: string;
  employee: Employee;
  cycle: string;
  rating: number;
  completed: boolean;
  dueDate: string;
  manager?: string;
}

export interface ReviewCycle {
  id: string;
  name: string;
  departments: string;
  completion: number;
  dueDate: string;
  icon?: string;
  iconColor?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  color: string;
}

export interface PayrollStats {
  totalPayroll: number;
  netSalariesPaid: number;
  taxAndDeductions: number;
  paymentStatus: string;
  processingProgress: number;
}

export interface PerformanceStats {
  reviewsCompleted: number;
  averageRating: number;
  pendingReviews: number;
  goalsOnTrack: number;
}

export interface JobApplication {
  id: string;
  candidateName: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  resume?: string;
}

export interface TimeTracking {
  id: string;
  employee: Employee;
  date: string;
  clockIn?: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours?: number;
  breakHours?: number;
  overtimeHours?: number;
  location?: string;
  status: 'clocked-in' | 'clocked-out' | 'on-break';
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'national' | 'company' | 'regional';
  isRecurring: boolean;
  description?: string;
}

export interface LeaveBalance {
  employeeId: string;
  sickLeave: number;
  vacation: number;
  personal: number;
  total: number;
  used: number;
  pending: number;
  available: number;
}
