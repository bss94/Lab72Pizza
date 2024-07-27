import {Button, Modal} from 'react-bootstrap';
import React, {MouseEventHandler} from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: MouseEventHandler;
  onContinue: MouseEventHandler;
}

const OrderModal: React.FC<Props> = ({
  show,
  onClose,
  onContinue,
  children
}) => {
  return (
    <Modal
      show={show}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="outline-success" onClick={onContinue}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;