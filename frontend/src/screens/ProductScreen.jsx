import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge, Button, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading:true};
        case 'FETCH_SUCCESS':
            return {...state, product: action.payload, loading:false};
        case 'FETCH_FAIL':
        return {...state, loading:false, error: action.payload};
        default:
            return state

    }
}

function ProductScreen() {
    const params = useParams();
    const {slug} = params;
    const [{loading, error, product}, dispatch] = useReducer(reducer,{
        product: [],
        loading: false,
        error: '',
    });
    useEffect(()=>{
        const fetchProduct = async () => {
            dispatch({type: 'FETCH_REQUEST'});
        try {
            const result = await axios.get(`/api/product/slug/${slug}`);
            dispatch({type: 'FETCH_SUCCESS', payload: result.data});

        }catch(err) {
            dispatch({type: 'FETCH_FAIL', payload: err.message});

        }
        }
        fetchProduct();
       
    }, [slug]);
    return(
        <div>
            {
                loading ? (<div>Loading</div>) 
                :
                error ? (
                    <div>{error}</div>
                )
                :
                <div>
                    <Row>
                        <Col md={6}>
                            <img src={product.image} className="img-large" alt={product.name}></img>
                        </Col>
                        <Col md={3}>
                            <ListGroup varient="flush">
                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                                    <h1>{product.name}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description:
                                    <p>{product.description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price</Col>
                                                <Col>${product.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status</Col>
                                                <Col>
                                                {product.countInStock>0?
                                                <Badge bg="success">In Stock</Badge>
                                                :
                                                <Badge bg="danger">Unavailable</Badge>
                                                }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && (
<ListGroup.Item>
                                            <div className="d-grid">
                                                <Button varient="primary">Add to Cart</Button>
                                            </div>
                                        </ListGroup.Item>
                                            )
                                        }
                                    </ListGroup>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}
export default ProductScreen;