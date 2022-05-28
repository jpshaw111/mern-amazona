import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
// import data from "../data";
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return{...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
      default:
        return state;


  }
}


function HomeScreen() {
  const [{ loading, error, products}, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: []
  });

 /*const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchProducts();

  }, []) */

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});

      } catch(err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message});

      }

    }
    fetchProducts();
    
  }, []);
  
    return(
        <div>
          <Helmet>
            <title>Amazona</title>
          </Helmet>
            <h1>Feature Products</h1>
        <div className="products">
          {
            loading ? (
              <LoadingBox></LoadingBox>
           
            ) :
            error? (
              <MessageBox variant="danger">{error}</MessageBox>
            )
            :
            (
             <Row>
               {
                  products.map((product) => (
                    <Col key={product.slug} xs={6} sm={6} md={4} lg={3} className="mb-5">
                    <Product product={product} />
                    </Col>
                  ))
               }
             </Row>
            )
              }

       
        </div>
        </div>
    )
}
export default HomeScreen;