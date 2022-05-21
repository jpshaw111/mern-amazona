import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import Rating from "./Rating";
function Product(props){
    const {product} = props;
    return(
        
            <Card className="product">
                      <Link to={`/product/${product.slug}`}>
                      <img src={product.image} className="card-img-top" alt={product.name} />
                      </Link>
                      <Card.Body>
                      <Link to={`product/${product.slug}`}>
                     <p>{product.name}</p>
                     </Link>
                     <Rating rating={product.rating} numReviews={product.numReviews} ></Rating>
                     <Card.Text>
                     <strong>${product.price}</strong>
                     </Card.Text>
                     <Button>Add To Cart</Button>

                      </Card.Body>
                     
                    </Card>
        
    )

}
export default Product;