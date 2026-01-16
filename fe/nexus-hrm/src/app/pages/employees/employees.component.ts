import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  searchQuery = signal('');
  selectedDepartment = signal<string>('all');
  selectedStatus = signal<string>('all');

  constructor(public dataService: DataService) {}

  filteredEmployees = computed(() => {
    let employees = this.dataService.employees();
    const query = this.searchQuery().toLowerCase();
    const dept = this.selectedDepartment();
    const status = this.selectedStatus();

    if (query) {
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      );
    }

    if (dept !== 'all') {
      employees = employees.filter(emp => emp.department === dept);
    }

    if (status !== 'all') {
      employees = employees.filter(emp => emp.status === status);
    }

    return employees;
  });

  departments = computed(() => {
    const depts = new Set(this.dataService.employees().map(e => e.department));
    return Array.from(depts);
  });

  getStatusClass(status: string): string {
    return status === 'active' 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
      : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
  }
}
