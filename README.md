# FINVO – AI-Powered Portfolio Management System (PMS)

## 🚀 Quick Start

Welcome to FINVO! This is an AI-powered portfolio management system designed to democratize PMS for retail investors in India.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FINVO
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend server on `http://localhost:3000`

4. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Use any email and password to login (demo mode)

## 📁 Project Structure

```
FINVO/
├── backend/                 # Node.js/Express API server
│   ├── routes/             # API route handlers
│   ├── models/             # Database models (MongoDB)
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── config/             # Configuration files
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Frontend utilities
│   └── public/             # Static assets
├── ai-engine/              # Python AI/ML engine (future)
└── docs/                   # Documentation
```

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **Framework**: React 18 with React Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

### AI/ML (Planned)
- **Language**: Python
- **Libraries**: Scikit-learn, TensorFlow, PyTorch
- **Framework**: FastAPI or Flask

## 🎯 Core Features

### ✅ Implemented
- [x] User authentication (demo mode)
- [x] Dashboard with portfolio overview
- [x] Responsive UI with Tailwind CSS
- [x] Navigation and routing
- [x] Basic API structure

### 🚧 In Development
- [ ] Portfolio creation and management
- [ ] AI-powered recommendations
- [ ] Portfolio simulation engine
- [ ] Real-time market data integration
- [ ] Database integration
- [ ] Advanced analytics

### 📋 Planned Features
- [ ] Monte Carlo simulations
- [ ] Tax optimization engine
- [ ] Goal-based investing
- [ ] Rebalancing automation
- [ ] Mobile application
- [ ] Advanced AI chat advisor

## 🔧 Development

### Available Scripts

```bash
# Root level
npm run dev          # Start both frontend and backend
npm run install-all  # Install all dependencies

# Backend
cd backend
npm run dev          # Start backend with nodemon
npm test             # Run backend tests

# Frontend
cd frontend
npm start            # Start frontend development server
npm run build        # Build for production
npm test             # Run frontend tests
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finvo
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user

### Portfolio Management
- `POST /api/portfolio/create` - Create new portfolio
- `GET /api/portfolio/:id` - Get portfolio details
- `PUT /api/portfolio/:id` - Update portfolio
- `GET /api/portfolio/:id/performance` - Get performance metrics
- `POST /api/portfolio/:id/rebalance` - Rebalance portfolio

### Simulation
- `POST /api/simulation/scenario` - Run scenario simulation
- `POST /api/simulation/compare` - Compare portfolios
- `POST /api/simulation/monte-carlo` - Monte Carlo simulation

### AI Features
- `POST /api/ai/recommend-portfolio` - Get AI recommendations
- `POST /api/ai/chat` - AI financial advisor chat
- `POST /api/ai/optimize` - Optimize portfolio

### Market Data
- `GET /api/market/instruments` - Get financial instruments
- `GET /api/market/quotes` - Get market quotes

## 🎨 UI Components

The application uses a consistent design system with:

- **Color Palette**: Blue primary, with success/warning/danger variants
- **Typography**: Inter font family
- **Components**: Cards, buttons, forms, navigation
- **Animations**: Fade-in and slide-in transitions
- **Responsive**: Mobile-first design

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs/` folder

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic UI/UX implementation
- [x] Authentication system
- [x] Dashboard with mock data
- [ ] Database integration
- [ ] Basic portfolio management

### Phase 2 (Next)
- [ ] AI recommendation engine
- [ ] Portfolio simulation
- [ ] Real market data integration
- [ ] Advanced analytics

### Phase 3 (Future)
- [ ] Mobile application
- [ ] Advanced AI features
- [ ] Tax optimization
- [ ] Goal-based investing
- [ ] Social features

---

**FINVO – Your AI Portfolio Manager. Liquidity. Growth. Clarity.** 🚀







