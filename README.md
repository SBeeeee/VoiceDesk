# 🎙️ VoiceDesk - AI Voice Receptionist for Local Shops

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-9.2.2-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Vapi_AI-2.5.2-purple?style=for-the-badge" alt="Vapi AI">
</div>

## 🚀 Overview

VoiceDesk is an intelligent AI-powered voice receptionist system designed specifically for local shops and small businesses. It automatically handles customer calls, captures leads, processes orders, checks inventory, and provides 24/7 customer support - ensuring you never miss a business opportunity.

## ✨ Key Features

### 🤖 AI Voice Receptionist
- **Natural Conversations**: Advanced AI that understands customer intent and responds naturally
- **24/7 Availability**: Never miss a call, even outside business hours
- **Multi-language Support**: Serve customers in their preferred language
- **Call Recording & Transcripts**: Full call logs and searchable transcripts

### 📊 Business Management
- **Lead Capture**: Automatically collect and qualify customer leads
- **Order Processing**: Take and manage orders through voice commands
- **Inventory Integration**: Real-time stock checking and updates
- **Analytics Dashboard**: Comprehensive insights into call patterns and business metrics

### 🎯 Smart Features
- **Customizable Workflows**: Tailor responses to your specific business needs
- **CRM Integration**: Seamlessly connect with existing business systems
- **Real-time Notifications**: Instant alerts for important calls and orders
- **Voice Biometrics**: Secure customer identification

## 🏗️ Architecture

### Frontend (Next.js 16)
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4.0 with custom design system
- **State Management**: Redux Toolkit for complex state handling and thunks
- **Components**: Modern, reusable component architecture
- **Voice Integration**: Vapi AI Web SDK for real-time voice processing

### Backend (Node.js + Express)
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB 
- **Authentication**: JWT-based secure authentication
- **API**: RESTful API with comprehensive error handling

### Key Integrations
- **Vapi AI**: Advanced voice processing and NLP
- **MongoDB**: Scalable document database
- **JWT**: Secure authentication and authorization
- **Redux**: Predictable state management
- 
## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or cloud)
- Vapi AI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SBeeeee/VoiceDesk.git
cd VoiceDesk
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Setup**
Create `.env` file in backend directory:
```env
For Backend:
PORT=5000
MONGO_URI=your Mongo URI
JWT_SECRET=your_jwt_secret_key
VAPI_API_KEY=your_vapi_api_key
JWT_EXPIRES_IN=jwt_expiry_time
COOKIE_NAME=cookiename
BACKEND_URL=your deployed backend url to create webhooks
For Frontend:
COOKIE_NAME=same as backend one
NEXT_PUBLIC_API_URL=your backend url
NEXT_PUBLIC_VAPI_PUBLIC_KEY=vapi public key

```

5. **Start the development servers**

Backend:
```bash
cd backend
npm run dev
```

Frontend (in separate terminal):
```bash
cd frontend
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📊 Core Features Deep Dive

### 🎙️ Voice Processing
- **Speech-to-Text**: Convert customer voice to text in real-time
- **Natural Language Understanding**: Understand customer intent and context
- **Text-to-Speech**: Generate natural-sounding responses
- **Sentiment Analysis**: Detect customer emotions and respond appropriately

### 📈 Analytics & Insights
- **Lead Conversion**: Monitor lead capture 
- **Order Analytics**: Place orders and update inventory
- **Customer Insights**: Understand customer behavior and preferences
- **General Queries** :Answer all queries of customer like services and business hours and more.
-  **Call Analytics**: When cant answer take lead of customer so owner can reach out.
- **Call Analytics**: Track call volume, duration, and outcomes

### 🔐 Security & Privacy
- **End-to-End Encryption**: Secure voice and data transmission
- **GDPR Compliance**: Handle customer data responsibly
- **Access Control**: Role-based permissions for shop owners and customers

## 🎯 Business Impact

### For Local Shops
- **Increased Revenue**: Never miss a customer or order
- **Cost Efficiency**: Reduce need for full-time reception staff
- **Better Customer Service**: 24/7 professional customer suppor

### For Customers
- **Instant Service**: No wait times for basic queries
- **Accurate Information**: Real-time inventory and pricing
- **Convenient Ordering**: Place orders through natural conversation
- **Multi-language Support**: Service in preferred language

## 🔮 Future Roadmap

### Phase 2 Features
- [ ] **Multi-shop Support**: Manage multiple locations from one dashboard
- [ ] **Advanced Analytics**: AI-powered business insights and predictions
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **WhatsApp Integration**: Extend voice capabilities to messaging

### Phase 3 Features
- [ ] **AI Training**: Custom AI model training for specific industries
- [ ] **Voice Commerce**: Complete voice-based shopping experience
- [ ] **Integration Marketplace**: Connect with popular business tools
- [ ] **Advanced Reporting**: Custom reports and business intelligence

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Follow same structure of code as done in the whole project
   Ex:in frontend->Integration with backend follows structure service->thunk->redux store->hooks->UI
- Maintain code consistency with ESLint
- Update documentation for new features

## 📞 Contact

**Project Creator**: [SHATADRU BHATTACHARYA]
**Portfolio**: [https://shatadru.vercel.app]

---

<div align="center">
  <p>⭐ If this project helped you, please give it a star!</p>
  <p>Made with ❤️ for local businesses everywhere</p>
</div>
