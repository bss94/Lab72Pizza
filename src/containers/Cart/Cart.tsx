import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {closeModal, openModal, selectCartDishes, selectModalShow} from '../../store/cartSlice';
import {Alert, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import CartDishes from '../../components/Cart/CartDishes';
import OrderModal from '../../components/OrderModal/OrderModal';

const Cart = () => {
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const show = useAppSelector(selectModalShow);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onOpen = () => {
    dispatch(openModal());
  };

  const onContinue = () => {
    dispatch(closeModal());
    navigate('/checkout');
  };

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 150);
  return (
    <>
      {cartDishes.length === 0
        ?
        <Alert variant={'primary'}>
          Card is empty, please bac to menu and add dishes
        </Alert>
        : <CartDishes/>
      }

      <p className="mt-3 mb-2 fw-bold">Delivery 150 KGS</p>
      <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
        <p className="m-0">Order total: <strong>{total}</strong></p>
        {cartDishes.length > 0 ?
          <Button className="btn btn-light btn-outline-secondary"
                  onClick={() => {
                    onOpen();
                  }}>
            Continue
          </Button>
          :
          <Button className="btn btn-light btn-outline-secondary"
                  onClick={() => {
                    navigate('/');
                  }}>
            Back
          </Button>

        }

      </div>
      <OrderModal
        show={show}
        onClose={() => {
          onClose();
        }}
        onContinue={() => {
          onContinue();
        }}>
        <h4>Do you want to continue to checkout?</h4>
      </OrderModal>

    </>
  );
};

export default Cart;