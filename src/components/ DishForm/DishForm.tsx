import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import SpinnerBtn from '../SpinnerBtn/SpinnerBtn';
import {ApiDish, DishMutation} from '../../types';

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: ApiDish;
  sending:boolean;
}

const emptyState: DishMutation = {
  title: '',
  image: '',
  price: '',
};

const DishForm:React.FC<Props> = ({onSubmit,existingDish,sending}) => {
  const initialState: DishMutation = existingDish
    ? { ...existingDish, price: existingDish.price.toString() }
    : emptyState;

  const [dishMutation, setDishMutation] = useState<DishMutation>(initialState);

  const changeDish = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDishMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...dishMutation,
      price: parseFloat(dishMutation.price),
    });
  };


  return (
    <div>
      <Form className="mt-5" onSubmit={onFormSubmit}>
        <Form.Group as={'div'} className="mb-3 row" controlId="name">
          <Col sm={4}>
            <Form.Label>Title:</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="text"
              name="title"
              required
              value={dishMutation.title}
              onChange={changeDish}
            />
          </Col>
        </Form.Group>

        <Form.Group as={'div'} className="mb-3 row" controlId="phone">
          <Col sm={4}>
            <Form.Label>Price</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control
              type="number"
              name="price"
              required
              value={dishMutation.price}
              onChange={changeDish}
            />
          </Col>
        </Form.Group>

        <Form.Group as={'div'} className="mb-3 row" controlId="photo">
          <Col sm={4}>
            <Form.Label>Image URl:</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control type="url"
                          name="image"
                          value={dishMutation.image}
                          onChange={changeDish}
            />
          </Col>
        </Form.Group>

        <SpinnerBtn type="submit"
                    variant="warning"
                    isSending={sending}
                    className="text-white"

        >
        {!existingDish ? 'Create' : 'Edit'}
      </SpinnerBtn>
      </Form>
    </div>
  );
};

export default DishForm;