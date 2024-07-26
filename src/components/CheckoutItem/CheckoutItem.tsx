import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';

interface Props {
  title: string;
  amount: number;
  price: number;
}


const CheckoutItem: React.FC<Props> = ({
  title,
  amount,
  price
}) => {
  const currentPrice = price * amount;
  return (
    <Card className="mb-2">
      <Row className="align-items-center">
        <Col>
          <Card.Body>
            <Card.Text>
              {title}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col xs={2} className="p-0">
          <Card.Text>
            x{amount}
          </Card.Text>
        </Col>
        <Col xs={3} className="ps-0">
          <Card.Text>
            {currentPrice} KGS
          </Card.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CheckoutItem;