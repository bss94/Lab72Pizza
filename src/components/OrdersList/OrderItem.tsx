import React from 'react';
import {ReadOrder} from '../../types';
import {Card, Col, Row} from 'react-bootstrap';
import SpinnerBtn from '../SpinnerBtn/SpinnerBtn';

interface Props {
  order: ReadOrder;
  completeOrder: (id: string) => void;
  completeLoading: string | false;
}

const OrderItem: React.FC<Props> = ({
  order,
  completeOrder,
  completeLoading,
}) => {
  const total = order.dishes.reduce((sum, dish) => {
    return sum + dish.amount * dish.price;
  }, 150);

  return (
    <Card className="mb-2">
      <Row className="align-items-center">
        <Col className="pe-0">
          <Card.Body>
            {order.dishes.map((dish) => (
              <Row key={dish.id}>
                <Col xs={1} className="text-end p-0">{dish.amount}</Col>
                <Col className="text-start p-0">x {dish.title}</Col>
                <Col className="text-start p-0 fw-bold">{dish.price} KGS</Col>
              </Row>
            ))}
            <Row>
              <Col xs={1} className="text-end p-0"/>
              <Col className="text-start p-0">Delivery</Col>
              <Col className="text-start p-0 fw-bold">150 KGS</Col>
            </Row>

          </Card.Body>
        </Col>
        <Col xs={3} className="d-flex flex-column">
          <p className="m-0">Order Total</p>
          <p className="m-0 fw-bold"> {total} KGS</p>
          <SpinnerBtn
            isSending={order.id === completeLoading}
            variant={'success'}
            onClick={() => {
              completeOrder(order.id);
            }}
          >
            Delete
          </SpinnerBtn>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderItem;