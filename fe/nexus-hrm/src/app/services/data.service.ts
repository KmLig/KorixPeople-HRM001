import { Injectable, signal } from '@angular/core';
import { Employee, AttendanceLog, Shift, LeaveRequest, PayrollRecord, PerformanceReview, JobApplication } from '../models/employee.model';

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
  jobApplications = signal<JobApplication[]>([]);

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
        type: 'Overtime Request',
        startDate: '2023-10-25',
        endDate: '2023-10-25',
        days: 1,
        status: 'pending',
        reason: 'Requested Overtime (2h)'
      },
      {
        id: '2',
        employee: employees[1],
        type: 'Shift Swap',
        startDate: '2023-10-26',
        endDate: '2023-10-26',
        days: 1,
        status: 'pending'
      }
    ]);
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees().find(emp => emp.id === id);
  }
}
