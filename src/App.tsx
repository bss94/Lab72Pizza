import Layout from './components/Layout/Layout';
import Admin from './containers/Admin/Admin';

const App = () => {

  // const dispatch = useAppDispatch();
  // const dishes = useAppSelector(selectDishes);
  //
  // useEffect(() => {
  //   dispatch(fetchDishes());
  // }, [dispatch]);

    return(
            <>
              <Layout>
               <Admin/>
              </Layout>

            </>
        );
};

export default App
