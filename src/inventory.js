import { 
    newProductName, 
    newProductPrice, 
    productCardTemplate, 
    productGroup,
    productSelect
} from "./selector";

import { v4 as uuidv4 } from 'uuid';
import { products } from "./state";

export const addnewProductBtnHandler = () =>{

    const createdId = uuidv4()
    // console.log('new products added.');
    productGroup.append(creatProduct(createdId,newProductName.value, newProductPrice.valueAsNumber));

    productSelect.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`,createdId));

    products.push(
        {
            id : createdId,
            name : newProductName.value,
            price : newProductPrice.valueAsNumber,
        }
    );

    console.log(products);

    newProductName.value = null;
    newProductPrice.value = null;
};

export const productRender = (products) => {
    products.forEach(({id,name,price}) => {
        productGroup.append(creatProduct(id,name,price));
        productSelect.append(new Option(`${name} - ${price}`,id));
    });
};

export const creatProduct = (id,name,price) => {
    const productCard = productCardTemplate.content.cloneNode(true);

    const currentProductCard = document.querySelector('.product-card');
    const productName = productCard.querySelector('.product-name');
    const productPrice = productCard.querySelector('.product-price');

    productName.innerText = name;
    productPrice.innerText = price;

    return productCard;

};