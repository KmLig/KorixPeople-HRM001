import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LeaveRequest, Holiday, LeaveBalance } from '../../models/employee.model';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss'
})
export class LeavesComponent {
  selectedMonth = signal(new Date().getMonth());
  selectedYear = signal(new Date().getFullYear());
  showLeaveForm = signal(false);
  selectedLeaveType = signal<string>('vacation');
  leaveStartDate = signal('');
  leaveEndDate = signal('');
  leaveReason = signal('');

  constructor(public dataService: DataService) {}

  leaveRequests = computed(() => this.dataService.leaveRequests());
  holidays = computed(() => this.dataService.holidays());
  leaveBalances = computed(() => this.dataService.leaveBalances());

  // Stats
  pendingRequests = computed(() => {
    return this.leaveRequests().filter(r => r.status === 'pending').length;
  });

  approvedToday = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.leaveRequests().filter(r => 
      r.status === 'approved' && r.startDate === today
    ).length;
  });

  onLeaveCurrently = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.leaveRequests().filter(r => 
      r.status === 'approved' && 
      r.startDate <= today && 
      r.endDate >= today
    ).length;
  });

  availableBalance = computed(() => {
    const balance = this.leaveBalances()[0];
    return balance ? balance.available : 15;
  });

  // Calendar
  calendarDays = computed(() => {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{day: number, isCurrentMonth: boolean, isToday: boolean, isHoliday: boolean, isLeave: boolean, leaveType?: string}> = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        isHoliday: false,
        isLeave: false
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      const isHoliday = this.holidays().some(h => h.date === dateStr);
      const leaveRequest = this.leaveRequests().find(lr => 
        lr.status === 'approved' && 
        dateStr >= lr.startDate && 
        dateStr <= lr.endDate
      );
      
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isHoliday,
        isLeave: !!leaveRequest,
        leaveType: leaveRequest?.type
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isHoliday: false,
        isLeave: false
      });
    }

    return days;
  });

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  currentMonthName = computed(() => this.monthNames[this.selectedMonth()]);

  previousMonth(): void {
    if (this.selectedMonth() === 0) {
      this.selectedMonth.set(11);
      this.selectedYear.set(this.selectedYear() - 1);
    } else {
      this.selectedMonth.set(this.selectedMonth() - 1);
    }
  }

  nextMonth(): void {
    if (this.selectedMonth() === 11) {
      this.selectedMonth.set(0);
      this.selectedYear.set(this.selectedYear() + 1);
    } else {
      this.selectedMonth.set(this.selectedMonth() + 1);
    }
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      'approved': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      'rejected': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    };
    return classes[status] || '';
  }

  getLeaveTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'Sick Leave': 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      'Vacation': 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      'Personal': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    };
    return colors[type] || 'bg-gray-50 text-gray-600';
  }

  getLeaveTypeDot(type: string): string {
    const colors: Record<string, string> = {
      'Sick Leave': 'bg-orange-400',
      'Vacation': 'bg-purple-400',
      'Personal': 'bg-blue-400'
    };
    return colors[type] || 'bg-gray-400';
  }

  approveLeave(id: string): void {
    // In real app, call API
    console.log('Approve leave:', id);
  }

  rejectLeave(id: string): void {
    // In real app, call API
    console.log('Reject leave:', id);
  }

  submitLeaveRequest(): void {
    // In real app, call API
    console.log('Submit leave request:', {
      type: this.selectedLeaveType(),
      startDate: this.leaveStartDate(),
      endDate: this.leaveEndDate(),
      reason: this.leaveReason()
    });
    this.showLeaveForm.set(false);
  }

  whoIsAwayToday = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.leaveRequests().filter(r => 
      r.status === 'approved' && 
      r.startDate <= today && 
      r.endDate >= today
    ).slice(0, 3);
  });
}
