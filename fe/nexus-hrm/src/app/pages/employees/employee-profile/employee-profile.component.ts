import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {
  activeTab = signal<'overview' | 'personal' | 'job' | 'documents' | 'timeoff' | 'benefits'>('overview');
  employeeId = signal<string | null>(null);
  employee = computed(() => {
    const id = this.employeeId();
    if (!id) return null;
    return this.dataService.getEmployeeById(id);
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService
  ) {
    this.route.params.subscribe(params => {
      this.employeeId.set(params['id']);
    });
  }

  setTab(tab: 'overview' | 'personal' | 'job' | 'documents' | 'timeoff' | 'benefits'): void {
    this.activeTab.set(tab);
  }

  teamMembers = computed(() => {
    const emp = this.employee();
    if (!emp) return [];
    return this.dataService.employees().filter(e => 
      e.department === emp.department && e.id !== emp.id
    ).slice(0, 3);
  });
}
