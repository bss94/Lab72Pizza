import { Card, Col, Row} from 'react-bootstrap';
import React, {PropsWithChildren} from 'react';

interface Props extends PropsWithChildren{
  title:string;
  price:number;
  image:string;
}

const DishItem:React.FC<Props> = ({title,price,image,children}) => {
  return (
    <Card className="mt-3 p-1">
      <Row>
        <Col xs={4} sm={2} md={3}>
          <div className="d-flex justify-content-between align-items-center h-100">
            <Card.Img variant="top" src={image} style={{maxWidth:'100px',maxHeight:'100px'}} alt="not found"/>
          </div>
        </Col>
        <Col xs={8} sm={10} md={9}>
          <Card.Body className="d-flex justify-content-between align-items-center h-100">
            <div className="d-flex align-items-center justify-content-between flex-sm-nowrap h-100 w-100 pe-1">
              <Card.Text className='m-0'>
                {title}
              </Card.Text>
              <Card.Text>
                {price + ' KGS'}
              </Card.Text>
            </div>

            {children}

          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DishItem;