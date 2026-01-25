import { Injectable, signal } from '@angular/core';
import { Employee, AttendanceLog, Shift, LeaveRequest, PayrollRecord, PerformanceReview, JobApplication, ReviewCycle, Goal, Holiday, LeaveBalance } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock data signals
  employees = signal<Employee[]>([
    {
      id: '1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@company.com',
      department: 'UX Design',
      position: 'Senior Product Designer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjfO_--0N5T3PYGpWsipF7smLtx-lf40Qxc7ZuE4YcRB4RsxGXAFFfuSg7ZwE3pk9FJ7KOjjcVKT9WoiMhBr4WBHuHYi7llm3BoF6M4JTGv_4uuTrI8DsvgfRHLAf0QahkA6PSW9BcFlycQzD_KeTQghC5BK0BXlhQjZp4cCWpG6HG-hcb_7CyVkuBGRnL_FM9KzGG2U-4rPSV7y8C1zM8F-58THQsMzQ5AAbQn0Neh8HBuk6RwN0LMahzniJ7uov4LMXt7G97vFY7',
      status: 'active',
      joinDate: '2022-01-15',
      location: 'San Francisco, CA',
      workType: 'full-time'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJke9pIYcqkldBXYelIwup1WxK7PUbelXXtb1PekhQ6YaZsYIHd0Vnyx0bD9lkDha6PFWHDvo4No9kGw8TBgauLD8tMYAeRNZUoipIc-hoGhRY1Femqlrc7p6LecyR8g68wqsDlEp7Ne-HnpdkAY49UKldJ6-3f_nMgiCvGLgdmwRGQ1TEpByz8w9YUpe6qWIlsjBsh25GKmbCBv1cFnok6NiVAbPDU_Cz4ZReqciofL1p0AmHogGBkAo7F8bO0o60WtQdpVkmxNQw',
      status: 'active',
      joinDate: '2021-03-20',
      location: 'New York, NY',
      workType: 'full-time'
    },
    {
      id: '3',
      name: 'David Ross',
      email: 'david.r@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh9jpdiuDKOlayIBjVn-Mft4_5L7aNXloXhNfAHT7tzZR9kCu8CGt94KPU3Udr9RMhH_nXfL7Chghgl1bHDwjOvzO3whyEWPgLKByTsjn35oymOROC-pw7_86xi9epn4Q82f-IQ2nOrkjq5P4uJedRa8Mi3RAbTpteshEgY1m70a7I7AglpwWpuYLzVbA5yQuc_4jpu12nBpASEaepRGffmEEK7nQpD9bkNNDAMH8jtSgMBkJsyq3p4GspPh6Lt3wLW-EYvLw6cRcb',
      status: 'active',
      joinDate: '2020-06-10',
      location: 'Chicago, IL',
      workType: 'full-time'
    },
    {
      id: '4',
      name: 'Emily White',
      email: 'emily.w@company.com',
      department: 'HR',
      position: 'HR Manager',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAItCEmve5l-vtD5PXM56-F1ugfyO_961laGCf0OZw_LyLElFjep7UssmYNgPbhviNCEtg7JzREqFoacx8wS_Yy4-g723E1QqzxFJL2GQ6CHV_uhwZft4F7At8shw2qGIpCkb3fNgn-IXXbjb7BRoAgHsaIlV_Hc8Hu__HVBOQw4DNKqLYyPTQfCVtQYLGu9yGC1h-ZZLbwlNQupWEuag0n0ixUqT1c_l2oNzUaHstD15GhBrHfO3zqtnyWmuIvuV0cnb108Y_7x866',
      status: 'active',
      joinDate: '2019-11-05',
      location: 'Boston, MA',
      workType: 'full-time'
    },
    {
      id: '5',
      name: 'James Smith',
      email: 'james.s@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIGep8pwssR_uAeUxbksrVpS2Bv2wA4KElaoFzqmBnciDm8KwRzc2HIJCeUy4M5q6QhN8j0x20Mh6aw4KD_aiHvSAjdRUI6GP8yf9fPOrOF4GL-Opfu7hhBV7JwoW9ch3CmgwZelgAAqhm9Ibg2a_V4gYRYAVIOdquslVIBBwmJzSH96eS_r-XzurwCLpydlUd36zdbJVUQjJVhgmPqAZ7y2P9byF-KVqPkhiKl-i2zIAreV2A0guOXK8fOJ5J62pP9U5pvUEtnH3K',
      status: 'active',
      joinDate: '2022-08-12',
      location: 'Austin, TX',
      workType: 'full-time'
    }
  ]);

  attendanceLogs = signal<AttendanceLog[]>([]);
  shifts = signal<Shift[]>([]);
  leaveRequests = signal<LeaveRequest[]>([]);
  payrollRecords = signal<PayrollRecord[]>([]);
  performanceReviews = signal<PerformanceReview[]>([]);
  reviewCycles = signal<ReviewCycle[]>([]);
  goals = signal<Goal[]>([]);
  jobApplications = signal<JobApplication[]>([]);
  holidays = signal<Holiday[]>([]);
  leaveBalances = signal<LeaveBalance[]>([]);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const employees = this.employees();
    
    // Initialize attendance logs
    this.attendanceLogs.set([
      {
        id: '1',
        employee: employees[0],
        date: '2023-10-24',
        checkIn: '08:58 AM',
        checkOut: '05:02 PM',
        hours: '8h 4m',
        status: 'on-time'
      },
      {
        id: '2',
        employee: employees[1],
        date: '2023-10-24',
        checkIn: '09:15 AM',
        checkOut: undefined,
        hours: undefined,
        status: 'late'
      },
      {
        id: '3',
        employee: employees[2],
        date: '2023-10-24',
        checkIn: '08:30 AM',
        checkOut: '06:30 PM',
        hours: '10h 0m',
        status: 'overtime'
      },
      {
        id: '4',
        employee: employees[3],
        date: '2023-10-24',
        checkIn: '08:55 AM',
        checkOut: '05:00 PM',
        hours: '8h 5m',
        status: 'on-time'
      },
      {
        id: '5',
        employee: employees[4],
        date: '2023-10-24',
        checkIn: '08:50 AM',
        checkOut: '04:55 PM',
        hours: '8h 5m',
        status: 'on-time'
      }
    ]);

    // Initialize leave requests
    this.leaveRequests.set([
      {
        id: '1',
        employee: employees[0],
        type: 'Sick Leave',
        startDate: '2023-10-12',
        endDate: '2023-10-14',
        days: 3,
        status: 'pending',
        reason: 'Medical appointment'
      },
      {
        id: '2',
        employee: employees[1],
        type: 'Vacation',
        startDate: '2023-10-20',
        endDate: '2023-10-25',
        days: 6,
        status: 'approved'
      },
      {
        id: '3',
        employee: employees[2],
        type: 'Personal',
        startDate: '2023-10-15',
        endDate: '2023-10-15',
        days: 1,
        status: 'pending'
      },
      {
        id: '4',
        employee: employees[3],
        type: 'Sick Leave',
        startDate: '2023-10-12',
        endDate: '2023-10-13',
        days: 2,
        status: 'rejected'
      },
      {
        id: '5',
        employee: employees[4],
        type: 'Vacation',
        startDate: '2023-11-01',
        endDate: '2023-11-05',
        days: 5,
        status: 'pending'
      }
    ]);

    // Initialize payroll records
    this.payrollRecords.set([
      {
        id: '1',
        employee: employees[0],
        period: 'Oct 2023',
        baseSalary: 8500,
        deductions: 1850,
        bonuses: 0,
        netPay: 6650,
        status: 'pending',
        role: 'Engineering Lead'
      },
      {
        id: '2',
        employee: employees[1],
        period: 'Oct 2023',
        baseSalary: 7200,
        deductions: 1400,
        bonuses: 0,
        netPay: 5800,
        status: 'processed',
        role: 'Product Designer'
      },
      {
        id: '3',
        employee: employees[2],
        period: 'Oct 2023',
        baseSalary: 5900,
        deductions: 1100,
        bonuses: 0,
        netPay: 4800,
        status: 'pending',
        role: 'Marketing Specialist'
      }
    ]);

    // Initialize performance reviews
    this.performanceReviews.set([
      {
        id: '1',
        employee: employees[0],
        cycle: 'Q3 2023 Review',
        rating: 4.9,
        completed: true,
        dueDate: '2023-10-31',
        manager: 'Sarah Jenkins'
      },
      {
        id: '2',
        employee: employees[1],
        cycle: 'Q3 2023 Review',
        rating: 4.8,
        completed: true,
        dueDate: '2023-10-31',
        manager: 'Michael Chen'
      },
      {
        id: '3',
        employee: employees[2],
        cycle: 'Q3 2023 Review',
        rating: 4.7,
        completed: false,
        dueDate: '2023-10-31',
        manager: 'Alex Morgan'
      }
    ]);

    // Initialize review cycles
    this.reviewCycles.set([
      {
        id: '1',
        name: 'Q3 2023 Review',
        departments: 'All Depts',
        completion: 86,
        dueDate: 'Oct 31',
        icon: 'calendar_month',
        iconColor: 'indigo'
      },
      {
        id: '2',
        name: 'Eng. Mid-Year',
        departments: 'Engineering',
        completion: 45,
        dueDate: 'Nov 15',
        icon: 'code',
        iconColor: 'purple'
      }
    ]);

    // Initialize goals
    this.goals.set([
      {
        id: '1',
        title: 'Increase Employee Retention',
        description: 'Objective: Maintain voluntary turnover below 5%',
        progress: 92,
        color: 'primary'
      },
      {
        id: '2',
        title: 'Complete Leadership Training',
        description: 'Objective: 100% of managers certified by Q4',
        progress: 65,
        color: 'orange'
      },
      {
        id: '3',
        title: 'Streamline Recruitment Process',
        description: 'Objective: Reduce time-to-hire to 25 days',
        progress: 78,
        color: 'green'
      }
    ]);

    // Initialize holidays
    this.holidays.set([
      {
        id: '1',
        name: 'New Year\'s Day',
        date: '2024-01-01',
        type: 'national',
        isRecurring: true,
        description: 'New Year celebration'
      },
      {
        id: '2',
        name: 'Independence Day',
        date: '2024-07-04',
        type: 'national',
        isRecurring: true
      },
      {
        id: '3',
        name: 'Christmas Day',
        date: '2024-12-25',
        type: 'national',
        isRecurring: true
      },
      {
        id: '4',
        name: 'Company Foundation Day',
        date: '2024-10-15',
        type: 'company',
        isRecurring: true
      }
    ]);

    // Initialize leave balances
    this.leaveBalances.set([
      {
        employeeId: '1',
        sickLeave: 10,
        vacation: 15,
        personal: 5,
        total: 30,
        used: 8,
        pending: 3,
        available: 19
      },
      {
        employeeId: '2',
        sickLeave: 10,
        vacation: 15,
        personal: 5,
        total: 30,
        used: 5,
        pending: 2,
        available: 23
      }
    ]);
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees().find(emp => emp.id === id);
  }
}
