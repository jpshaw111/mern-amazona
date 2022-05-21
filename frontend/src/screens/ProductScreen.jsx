import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductScreen() {
    const params = useParams();
    const {slug} = params;
    useEffect(()=>{
        document.title = `${slug}`;
    }, [slug]);
    return(
        <div>
            {slug}
        </div>
    )
}
export default ProductScreen;