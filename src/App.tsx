import Layout from './components/Layout/Layout';
import Admin from './containers/Admin/Admin';

import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import EditDish from './containers/EditDish/EditDish';
import AddDish from './containers/AddDish/AddDish';
import Dishes from './components/Dishes/Dishes';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


const App = () => {


  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/admin" element={<Admin/>}>
            <Route path="dishes" element={<Dishes/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="/admin/dishes/:id/edit" element={<EditDish/>}/>
          <Route path="/admin/dishes/add-dish" element={<AddDish/>}/>
          <Route path="*" element={<h1>Not found!</h1>}/>
        </Routes>
      </Layout>

    </>
  );
};

export default App;
