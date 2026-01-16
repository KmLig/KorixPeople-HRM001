import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AttendanceLog } from '../../models/employee.model';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  selectedView = signal<'attendance' | 'shifts'>('attendance');
  selectedDate = signal(new Date().toISOString().split('T')[0]);

  constructor(public dataService: DataService) {}

  attendanceLogs = computed(() => this.dataService.attendanceLogs());

  // KPI calculations
  onTimeToday = computed(() => {
    const logs = this.attendanceLogs();
    return logs.filter(log => log.status === 'on-time').length;
  });

  lateArrivals = computed(() => {
    const logs = this.attendanceLogs();
    return logs.filter(log => log.status === 'late').length;
  });

  absent = computed(() => {
    const logs = this.attendanceLogs();
    return logs.filter(log => log.status === 'absent').length;
  });

  currentlyClockedIn = computed(() => {
    const logs = this.attendanceLogs();
    return logs.filter(log => log.checkIn && !log.checkOut).length;
  });

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'on-time': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      'late': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      'absent': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      'overtime': 'bg-blue-100 dark:bg-blue-900/30 text-primary border-blue-200 dark:border-blue-800'
    };
    return classes[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'on-time': 'On Time',
      'late': 'Late',
      'absent': 'Absent',
      'overtime': 'Overtime'
    };
    return labels[status] || status;
  }
}
