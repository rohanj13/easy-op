# easy-op

A comprehensive pre-operative assessment platform that combines patient information management, surgical planning, and AI-powered medical analysis.

## Project Overview

**easy-op** is a full-stack application designed to streamline pre-operative assessments for hospitals and surgical facilities. It allows clinicians to:

- Register and manage patient information (demographics, medical history, allergies, medications, lifestyle factors)
- Document surgical procedures with details (name, side, indication, scheduled date)
- Capture comprehensive pre-operative assessments (vitals, investigations, anaesthetic history)
- Receive AI-powered risk assessments and clinical recommendations
- Export pre-operative forms as PDF documents

## Tech Stack

### Backend

- **Framework**: Django + Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Language**: Python 3.x
- **Key Libraries**:
  - `djangorestframework` - API development
  - `reportlab` - PDF generation
  - `django-cors-headers` - CORS support

### Frontend

- **Framework**: React 18+ with TypeScript
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Key Libraries**:
  - `react-router-dom` - Client-side routing
  - `axios` / generated API client - HTTP requests
  - `sonner` - Toast notifications

### Infrastructure

- **Containerization**: Docker + Docker Compose
- **Services**: PostgreSQL, Redis (optional), Django backend, React frontend

## Project Structure

```
easy-op/
├── preopai-backend/              # Django backend
│   ├── preopai/                  # Main project settings
│   ├── hospitals/                # Hospital management app
│   ├── patients/                 # Patient management app
│   ├── forms/                    # Pre-operative forms app
│   ├── surgeries/                # Surgery management app
│   ├── ai_engine/                # AI analysis and RAG pipeline
│   ├── common/                   # Shared utilities and base models
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── preopai-frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── pages/                # Page components (Dashboard, NewForm, Details, etc.)
│   │   ├── components/           # Reusable UI components
│   │   ├── lib/                  # Utilities and API client setup
│   │   ├── api/                  # Generated API types and client
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── infrastructure/               # Docker compose and deployment config
│   └── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Docker & Docker Compose (recommended for local development)
- Node.js 18+ and Bun (for frontend development)
- Python 3.8+ (for backend development)
- PostgreSQL 12+ (or use Docker)

### Quick Start with Docker Compose

1. **Clone the repository**

   ```bash
   git clone https://github.com/rohanj13/easy-op.git
   cd easy-op
   ```

2. **Start services**

   ```bash
   cd infrastructure
   docker compose up -d
   ```

   This will start:

   - PostgreSQL database on port 5432
   - Django backend on port 8000
   - React frontend on port 5173

3. **Run migrations**

   ```bash
   docker compose exec backend python manage.py migrate
   ```

4. **Create superuser** (optional, for admin panel)

   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Admin: http://localhost:8000/admin

### Local Development Setup

#### Backend

1. **Set up virtual environment**

   ```bash
   cd preopai-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure database** (update `preopai/settings/local.py`)

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'preopai',
           'USER': 'postgres',
           'PASSWORD': 'password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

4. **Run migrations**

   ```bash
   python manage.py migrate
   ```

5. **Start development server**
   ```bash
   python manage.py runserver
   ```

#### Frontend

1. **Navigate to frontend directory**

   ```bash
   cd preopai-frontend
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or npm install
   ```

3. **Start development server**

   ```bash
   bun run dev
   # or npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## API Documentation

The backend exposes RESTful APIs for all major resources:

- **Hospitals**: `/hospitals/` - Hospital management
- **Patients**: `/patients/` - Patient registration and management
- **Forms**: `/forms/` - Pre-operative form creation and retrieval
- **Surgeries**: `/surgeries/` - Surgery planning and management
- **Responses**: `/responses/` - AI assessment responses
- **AI**: `/ai/generate/` - AI analysis generation

Swagger/OpenAPI documentation available at: `http://localhost:8000/swagger/` (if configured)

## Key Features

### Patient Management

- Register new patients with demographics and medical history
- Capture ethnicity, sex, contact information
- Store comprehensive medical conditions, allergies, and medications
- Document surgical history and anaesthetic complications

### Form & Surgery Workflow

1. Select or create a patient
2. Define upcoming surgery (name, side, indication, scheduled date)
3. Complete pre-operative assessment form
4. Receive AI-powered risk assessment

### Pre-operative Assessment

- Vital signs and measurements (height, weight, BMI, BP, HR, SpO₂)
- Medical conditions with severity and onset year
- Surgical history with complications
- Allergies and current medications
- Lifestyle factors (smoking, alcohol, substance use)
- Investigations (bloods, ECG, CXR, etc.)
- Anaesthetic history and family history

### AI Analysis

- Automatically analyzes patient data
- Provides risk assessment (ASA classification, complications risk)
- Generates clinical recommendations
- Suggests perioperative management strategies

### Export & Reporting

- Generate and download pre-operative forms as PDF
- Includes patient information, medical history, and AI recommendations

## Database Models

### Key Entities

- **Hospital**: Multi-tenant organization
- **Patient**: Individual patient with demographics and medical history
- **Form**: Pre-operative assessment linked to one patient and one surgery
- **Surgery**: Surgical procedure with details (name, side, indication, date)
- **Response**: AI-generated assessment and recommendations

## Multi-tenancy

The application supports multi-tenancy at the hospital level. Hospital context is propagated through:

- **Frontend**: `X-Hospital-ID` header in API requests
- **Backend**: Hospital ID in JWT claims or request context

## Authentication & Authorization

Currently uses basic authentication. Hospital context is managed via:

- Header injection (`X-Hospital-ID`)
- User's associated hospital from JWT claims

## Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** to backend and/or frontend

3. **Test locally** with Docker Compose or development servers

4. **Commit and push**

   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin feature/your-feature-name
   ```

5. **Create pull request** on GitHub

## Common Commands

### Backend

```bash
# Run migrations
python manage.py migrate

# Create new migration
python manage.py makemigrations

# Start development server
python manage.py runserver

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Generate API schema
python manage.py generateschema > schema.yml
```

### Frontend

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Lint code
bun run lint

# Generate API types (if using swagger-typescript-api)
npx swagger-typescript-api -p http://localhost:8000/schema/ -o src/api
```

## Troubleshooting

### Port Already in Use

If ports 5173, 8000, or 5432 are already in use:

```bash
# Docker Compose: specify different ports
docker compose -f docker-compose.yml up -e FRONTEND_PORT=3000 BACKEND_PORT=8001
```

### Database Connection Issues

- Ensure PostgreSQL is running
- Check connection credentials in settings
- Verify database name and user permissions

### API Type Generation Issues

Regenerate frontend API types from OpenAPI schema:

```bash
cd preopai-frontend
npx swagger-typescript-api -p http://localhost:8000/schema/ -o src/api -n api-types.ts
```

### CORS Issues

Ensure `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` are properly configured in Django settings for your frontend URL.
