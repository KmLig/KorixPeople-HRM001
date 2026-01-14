# Nexus HRM - Human Resource Management System

A modern HRM (Human Resource Management) application built with Angular 21 and Tailwind CSS.

## Features

- **Dashboard Overview** - Comprehensive dashboard with key metrics and statistics
- **Employee Management** - Complete employee directory with search and filtering
- **Attendance & Shift Management** - Track employee attendance, check-ins, and shift schedules
- **Payroll Management** - Manage employee payroll and compensation
- **Recruitment** - Applicant tracking and recruitment management
- **Performance Management** - Employee performance reviews and evaluations
- **Leave Management** - Track and manage employee leave requests
- **Shift Planning** - Schedule and manage employee shifts
- **Approvals** - Handle various approval workflows

## Technology Stack

- **Angular 21** - Latest Angular framework with standalone components
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Signals** - Angular's new reactive state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Navigate to the project directory:
```bash
cd fe/nexus-hrm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── layouts/          # Layout components (sidebar, header, main layout)
│   ├── pages/            # Page components (dashboard, employees, attendance, etc.)
│   ├── services/         # Data services
│   ├── models/           # TypeScript models/interfaces
│   ├── components/       # Reusable components
│   └── shared/           # Shared utilities
├── styles.scss           # Global styles and Tailwind imports
└── index.html            # Main HTML file
```

## Development

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Features in Detail

### Dashboard
- Overview of key HR metrics
- Quick access to important information
- Real-time statistics

### Employee Management
- Complete employee directory
- Search and filter functionality
- Employee profiles and details
- Department and status filtering

### Attendance Management
- Daily attendance logs
- Check-in/check-out tracking
- Late arrivals and absences tracking
- Shift schedule management
- Pending approval requests

## Design System

The application uses a consistent design system with:
- **Primary Color**: #135bec (Blue)
- **Fonts**: Manrope (Display), Noto Sans (Body)
- **Dark Mode**: Fully supported
- **Icons**: Material Symbols Outlined

## License

This project is private and proprietary.
