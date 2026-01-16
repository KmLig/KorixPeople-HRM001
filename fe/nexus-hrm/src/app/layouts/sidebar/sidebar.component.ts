import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isDarkMode = signal(false);
  
  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', active: false },
    { path: '/employees', icon: 'group', label: 'Employees', active: false },
    { path: '/attendance', icon: 'calendar_month', label: 'Attendance', active: true },
    { path: '/payroll', icon: 'payments', label: 'Payroll', active: false },
    { path: '/recruitment', icon: 'work', label: 'Recruitment', active: false },
    { path: '/performance', icon: 'trending_up', label: 'Performance', active: false },
    { path: '/leaves', icon: 'event_available', label: 'Leaves', active: false },
  ];

  managementItems = [
    { path: '/shifts', icon: 'assignment_ind', label: 'Shift Planning', active: false },
    { path: '/approvals', icon: 'approval', label: 'Approvals', active: false },
  ];
}
