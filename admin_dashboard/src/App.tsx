
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ChakraProvider } from "@chakra-ui/react";
// import ErrorBoundary from './ErrorBoundry';
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Users from './pages/users'
// import UserDetails from './pages/userDetails'
// import EditUsers from "./pages/UserEdit";
// import QuotesRecipes from "./pages/QuotesRecipes";
// import PostList from "./pages/PostList";
// import PostDetails from './pages/postDetails'
// import OrderList from "./pages/OrderList";
// import OrderDetails from "./pages/OrderDetails";
// import Cart from "./pages/Cart";
// import ProductList from "./pages/ProductList";
// import ProductDetail from "./pages/ProductDetails";
// import ProductForm from "./pages/ProductForm";
// import { useUserStore } from './stores/UserEditstore'
// import { ReactNode } from "react";

// const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const { auth } = useUserStore();
//   return auth.token ? children : <Navigate to="/" replace />;
// };

// function App() {
//   return (
//     <ErrorBoundary>
//       <ChakraProvider>
//         <Router>
//           <Routes>
      
//             <Route path="/" element={<Login />} />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users"
//               element={
//                 <ProtectedRoute>
//                   <Users />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users/:id"
//               element={
//                 <ProtectedRoute>
//                   <UserDetails />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/editusers/:id"
//               element={
//                 <ProtectedRoute>
//                   <EditUsers />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/quotes-recipes"
//               element={
//                 <ProtectedRoute>
//                   <QuotesRecipes />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/posts"
//               element={
//                 <ProtectedRoute>
//                   <PostList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/posts/:id"
//               element={
//                 <ProtectedRoute>
//                   <PostDetails />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/orders"
//               element={
//                 <ProtectedRoute>
//                   <OrderList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/orders/:id"
//               element={
//                 <ProtectedRoute>
//                   <OrderDetails />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/carts"
//               element={
//                 <ProtectedRoute>
//                   <Cart />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/products"
//               element={
//                 <ProtectedRoute>
//                   <ProductList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/product/:id"
//               element={
//                 <ProtectedRoute>
//                   <ProductDetail />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/new"
//               element={
//                 <ProtectedRoute>
//                   <ProductForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/edit/:id"
//               element={
//                 <ProtectedRoute>
//                   <ProductForm />
//                 </ProtectedRoute>
//               }
//             />
//             {/* Catch-all Redirect */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Router>
//       </ChakraProvider>
//     </ErrorBoundary>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from './ErrorBoundry';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from './pages/users';
import UserDetails from './pages/userDetails';
import EditUsers from "./pages/UserEdit";
import QuotesRecipes from "./pages/QuotesRecipes";
import PostList from "./pages/PostList";
import PostDetails from './pages/postDetails';
import OrderList from "./pages/OrderList";
import OrderDetails from "./pages/OrderDetails";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import { useUserStore } from './stores/UserEditstore';
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => { 
  const { auth } = useUserStore(); 
  return auth.token ? children : <Navigate to="/" replace />; 
};

function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/users/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
            <Route path="/editusers/:id" element={<ProtectedRoute><EditUsers /></ProtectedRoute>} />
            <Route path="/quotes-recipes" element={<ProtectedRoute><QuotesRecipes /></ProtectedRoute>} />
            <Route path="/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
            <Route path="/posts/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/carts" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
