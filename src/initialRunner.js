import { productRender } from "./inventory";
import { products } from "./state";

const initialRunner = () => {
    // open product sideBar 
    // productSidebar.classList.remove('translate-x-full');
    productRender(products);
};

export default initialRunner;