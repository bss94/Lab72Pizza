import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clearCart, selectCartDishes, selectCreatingOrder} from '../../store/cartSlice';
import {Card, Col, Form, Row} from 'react-bootstrap';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import SpinnerBtn from '../../components/SpinnerBtn/SpinnerBtn';
import React, {useState} from 'react';
import {AppOrder, Customer} from '../../types';
import {createOrder} from '../../store/cartThunk';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const creating = useAppSelector(selectCreatingOrder);
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: ''
  });

  const changeCustomer = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCustomer((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const order: AppOrder = {
      customer,
      dishes: cartDishes,
    };
    try {
      await dispatch(createOrder(order));
      toast.success('Order created, please wait.');
      navigate('/');
      dispatch(clearCart());
    } catch (error) {
      toast.error('Could not create order!');
    }


  };

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 150);

  return (
    <>
      <h4 className="text-center mt-3 mb-2">Your order</h4>
      {cartDishes.map((el) => {
        return <CheckoutItem
          key={el.dish.id}
          title={el.dish.title}
          amount={el.amount}
          price={el.dish.price}
        />;
      })}
      <Card className="mb-2">
        <Row className="align-items-center">
          <Col>
            <Card.Body>
              <Card.Text>
                Delivery
              </Card.Text>
            </Card.Body>
          </Col>
          <Col xs={3}>
            150 KGS
          </Col>
        </Row>
      </Card>
      <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
        <p className="m-0">Order total: </p> <strong>{total} KGS</strong>
      </div>

      <Form className="mt-3" onSubmit={onFormSubmit}>
        <Form.Group as={'div'} className="mb-3 row" controlId="name">
          <Col sm={4}>
            <Form.Label>Name:</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="text"
              name="name"
              required
              value={customer.name}
              onChange={changeCustomer}
            />
          </Col>
        </Form.Group>
        <Form.Group as={'div'} className="mb-3 row" controlId="phone">
          <Col sm={4}>
            <Form.Label>Phone</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="text"
              name="phone"
              required
              value={customer.phone}
              onChange={changeCustomer}
            />
          </Col>
        </Form.Group>

        <Form.Group as={'div'} className="mb-3 row" controlId="address">
          <Col sm={4}>
            <Form.Label>Address:</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control type="text"
                          name="address"
                          value={customer.address}
                          onChange={changeCustomer}
            />
          </Col>
        </Form.Group>

        <SpinnerBtn type="submit"
                    variant="warning"
                    isSending={creating}
                    disabled={customer.name === '' || customer.address === '' || customer.phone === ''}
                    className="text-white"

        >
          Create
        </SpinnerBtn>
      </Form>


    </>
  );
};

export default Checkout;