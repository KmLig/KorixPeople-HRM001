import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Shift } from '../../models/employee.model';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shifts.component.html',
  styleUrl: './shifts.component.scss'
})
export class ShiftsComponent {
  selectedMonth = signal(new Date().getMonth());
  selectedYear = signal(new Date().getFullYear());
  selectedView = signal<'calendar' | 'list'>('calendar');
  showShiftForm = signal(false);

  constructor(public dataService: DataService) {}

  shifts = computed(() => this.dataService.shifts());
  employees = computed(() => this.dataService.employees());

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  currentMonthName = computed(() => this.monthNames[this.selectedMonth()]);

  calendarDays = computed(() => {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{day: number, isCurrentMonth: boolean, isToday: boolean, shifts: Shift[]}> = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        shifts: []
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      const dayShifts = this.shifts().filter(s => s.date === dateStr);
      
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        shifts: dayShifts
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        shifts: []
      });
    }

    return days;
  });

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

  getShiftTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'regular': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'overtime': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'holiday': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return colors[type] || '';
  }

  totalShifts = computed(() => this.shifts().length);
  upcomingShifts = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.shifts().filter(s => s.date >= today).length;
  });
}
