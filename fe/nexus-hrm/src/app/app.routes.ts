import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./pages/employees/employees.component').then(m => m.EmployeesComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./pages/attendance/attendance.component').then(m => m.AttendanceComponent)
      },
      {
        path: 'payroll',
        loadComponent: () => import('./pages/payroll/payroll.component').then(m => m.PayrollComponent)
      },
      {
        path: 'recruitment',
        loadComponent: () => import('./pages/recruitment/recruitment.component').then(m => m.RecruitmentComponent)
      },
      {
        path: 'performance',
        loadComponent: () => import('./pages/performance/performance.component').then(m => m.PerformanceComponent)
      },
      {
        path: 'leaves',
        loadComponent: () => import('./pages/leaves/leaves.component').then(m => m.LeavesComponent)
      },
      {
        path: 'shifts',
        loadComponent: () => import('./pages/shifts/shifts.component').then(m => m.ShiftsComponent)
      },
      {
        path: 'approvals',
        loadComponent: () => import('./pages/approvals/approvals.component').then(m => m.ApprovalsComponent)
      }
    ]
  }
];
