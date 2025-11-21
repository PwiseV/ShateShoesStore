## Project Structure

```
src/
│
├─ api/                       
│   ├─ axios.ts                
│   ├─ authService.ts          
│   ├─ customerService.ts      
│   ├─ fakeAuthService.ts    
│   └─ adminService.ts        
│
├─ pages/
│   ├─ Signin/
│   │    └─ LoginForm.tsx
│   ├─ Signup/
│   │    └─ SignupForm.tsx
│   ├─ Customer/
│   │    └─ Homepage.tsx
│   └─ Admin/
│        └─ Dashboard.tsx
│
├─ routes/
│   └─ protectedRoutes.tsx            
│
└─ context/
    ├─ authContext.ts                
    ├─ ToastContext.ts            
    ├─ useToast.ts 
    └─ useAuth.ts      


```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
