# PawaIT Solution

A modern web application built with Laravel and Next.js, providing a robust full-stack solution.

## Tech Stack

### Backend
- **Framework**: Laravel 12.0
- **PHP Version**: 8.2+
- **Database**: SQLite (default)
- **Authentication**: Laravel Sanctum
- **Development Tools**:
  - Laravel Sail (Docker development environment)
  - Laravel Pint (Code styling)
  - PHPUnit (Testing)

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: TailwindCss
- **Package Manager**: npm

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js (Latest LTS version recommended)
- npm
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/suhailabdi2/PawaIT-Solution
cd PawaIT-Solution
```

### 2. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations
php artisan migrate

# Start the development server
php artisan serve
```

The backend server will be running at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install


# Start the development server
npm run dev

```

The frontend application will be running at `http://localhost:3000`

### 4. Development Script (Optional)

You can use the combined development script from the backend directory:

```bash
composer run dev
```

This will concurrently run:
- Laravel development server
- Queue worker
- Vite development server

## Testing

### Backend Testing
```bash
cd backend
composer test
```

### Frontend Testing
```bash
cd frontend
npm run test


```

## Project Structure
PawaIT-Solution/
├── backend/ # Laravel backend application
│ ├── app/ # Application code
│ ├── database/ # Database migrations and seeders
│ └── tests/ # Backend tests
│
└── frontend/ # Next.js frontend application
├── app/ # Application code
├── components/ # React components
└── tests/ # Frontend tests

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
