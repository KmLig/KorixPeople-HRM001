import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AttendanceLog, TimeTracking } from '../../models/employee.model';

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
  
  // Clock In/Out state
  currentTime = signal(new Date());
  isClockedIn = signal(false);
  clockInTime = signal<string | null>(null);
  todayWorkHours = signal(0);
  todayBreakHours = signal(0);

  constructor(public dataService: DataService) {
    // Update time every second
    setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);

    // Check if user is clocked in
    this.checkClockStatus();
  }

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

  // Clock In/Out functions
  checkClockStatus(): void {
    const today = new Date().toISOString().split('T')[0];
    const todayLog = this.attendanceLogs().find(log => 
      log.date === today && log.employee.id === '1' // Mock: current user
    );
    
    if (todayLog) {
      this.isClockedIn.set(!!todayLog.checkIn && !todayLog.checkOut);
      this.clockInTime.set(todayLog.checkIn || null);
      
      if (todayLog.checkIn && !todayLog.checkOut) {
        this.calculateWorkHours();
      }
    }
  }

  clockIn(): void {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    this.isClockedIn.set(true);
    this.clockInTime.set(timeString);
    
    // In real app, this would call API
    console.log('Clocked In at:', timeString);
  }

  clockOut(): void {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    this.isClockedIn.set(false);
    
    // Calculate total hours
    if (this.clockInTime()) {
      const hours = this.calculateHoursBetween(this.clockInTime()!, timeString);
      this.todayWorkHours.set(hours);
    }
    
    // In real app, this would call API
    console.log('Clocked Out at:', timeString);
  }

  calculateWorkHours(): void {
    if (this.clockInTime()) {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      const hours = this.calculateHoursBetween(this.clockInTime()!, currentTime);
      this.todayWorkHours.set(hours);
    }
  }

  calculateHoursBetween(start: string, end: string): number {
    // Simple calculation - in real app, use proper date parsing
    const startParts = start.replace(/[AP]M/i, '').split(':');
    const endParts = end.replace(/[AP]M/i, '').split(':');
    const startHour = parseInt(startParts[0]) + (start.includes('PM') && parseInt(startParts[0]) !== 12 ? 12 : 0);
    const endHour = parseInt(endParts[0]) + (end.includes('PM') && parseInt(endParts[0]) !== 12 ? 12 : 0);
    const startMin = parseInt(startParts[1]);
    const endMin = parseInt(endParts[1]);
    
    const startTotal = startHour * 60 + startMin;
    const endTotal = endHour * 60 + endMin;
    
    return Math.round(((endTotal - startTotal) / 60) * 10) / 10;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getExpectedClockOut(): string {
    if (!this.clockInTime()) return '--:--';
    
    // Assuming 8 hours work day
    const startParts = this.clockInTime()!.replace(/[AP]M/i, '').split(':');
    const startHour = parseInt(startParts[0]) + (this.clockInTime()!.includes('PM') && parseInt(startParts[0]) !== 12 ? 12 : 0);
    const startMin = parseInt(startParts[1]);
    
    const endHour = startHour + 8;
    const endHour12 = endHour > 12 ? endHour - 12 : endHour;
    const ampm = endHour >= 12 ? 'PM' : 'AM';
    
    return `${endHour12}:${startMin.toString().padStart(2, '0')} ${ampm}`;
  }
}
