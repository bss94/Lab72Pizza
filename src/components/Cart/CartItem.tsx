import {Button, Card, Col, Row} from 'react-bootstrap';
import React, {MouseEventHandler} from 'react';

interface Props {
  title: string;
  amount: number;
  price: number;
  remove: MouseEventHandler;
  increase: MouseEventHandler;
  decrease: MouseEventHandler;
}

const CartItem: React.FC<Props> = ({
  title,
  amount,
  price,
  remove,
  increase,
  decrease
}) => {
  const currentPrice = price * amount;
  return (
    <Card className="mb-2">
      <Row className="align-items-center">
        <Col className="pe-0">
          <Card.Body>
            <Card.Text>
              {title}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col xs={3} className="d-flex justify-content-center align-items-center">
          <Button variant="light" onClick={decrease}>-</Button>
          <Card.Text className="m-0">
            x{amount}
          </Card.Text>
          <Button variant="light" onClick={increase}>+</Button>
        </Col>
        <Col xs={3}>
          <Card.Text>
            {currentPrice} KGS
          </Card.Text>
        </Col>
        <Col xs={2}>
          <Button variant="danger" onClick={remove}>X</Button>
        </Col>
      </Row>

    </Card>
  );
};

export default CartItem;