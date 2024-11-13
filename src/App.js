import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSidebar from './pages/Admin/AdminSidebar'; // Import your AdminSidebar
import CartManagement from './pages/Admin/management/CartManagement';
import OrderManagement from './pages/Admin/management/OrderManagement';
import OrderItemManagement from './pages/Admin/management/OrderItemManagement';
import ProductManagement from './pages/Admin/management/ProductManagement';
import UserManagement from './pages/Admin/management/UserManagement';
import SliderManagement from './pages/Admin/management/SliderManagement';
import UserNavbar from './pages/User/UserNavbar'; // Import UserNavbar
import Home from './pages/User/Home'; // Import user pages
import Products from './pages/User/Products';
import Cart from './pages/User/Cart';
import Login from './pages/User/Login';
import Register from './pages/User/Register';

function App() {
  return (
    <Router>
      <div className="h-screen">
        {/* Routes for user-related pages with UserNavbar */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UserNavbar />
                <div className="pt-16"> {/* Add padding to account for fixed navbar */}
                  <Home />
                </div>
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <UserNavbar />
                <div className="pt-16">
                  <Products />
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <UserNavbar />
                <div className="pt-16">
                  <Cart />
                </div>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <UserNavbar />
                <div className="pt-16">
                  <Login />
                </div>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <UserNavbar />
                <div className="pt-16">
                  <Register />
                </div>
              </>
            }
          />

          {/* Admin routes with AdminSidebar */}
          <Route
            path="/admin/*"
            element={
              <div className="flex h-screen">
                <AdminSidebar />
                <div className="flex-1 p-8 bg-gray-100">
                  <Routes>
                    <Route path="management/cartmanagement" element={<CartManagement />} />
                    <Route path="management/ordermanagement" element={<OrderManagement />} />
                    <Route path="management/orderitemmanagement" element={<OrderItemManagement />} />
                    <Route path="management/productmanagement" element={<ProductManagement />} />
                    <Route path="management/usermanagement" element={<UserManagement />} />
                    <Route path="management/slidermanagement" element={<SliderManagement />} />
                    {/* Add more admin routes as needed */}
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
