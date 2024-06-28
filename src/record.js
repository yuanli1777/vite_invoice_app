import Swal from "sweetalert2";
import {
  createRecordForm,
  recordGroup,
  recordNetTotal,
  recordRowTemplate,
  recordTax,
  recordTotal,
} from "./selector";
import { products } from "./state";
import { v4 as uuidv4 } from "uuid";

export const createRecordFormHandler = (event) => {
  event.preventDefault();
  // console.log('U submited form');

  const formData = new FormData(createRecordForm);
  // console.log(formData.get('product_select'));
  // console.log(formData.get('quantity'));

  const currentProduct = products.find(
    ({ id }) => id == formData.get("product_select")
  );

  const isExitedRecord = document.querySelector(
    `[product-id = '${currentProduct.id}']`
  );

  if (isExitedRecord === null) {
    //add new record
    recordGroup.append(
      createRecordRow(currentProduct, formData.get("quantity"))
    );
  }else {
  Swal.fire({
    title : `Are you sure want to add quantity to ${currentProduct.name}?`,
    text : "You won't be able to revert this!",
    icon : "question",
    showCancelButton : true ,
    confirmButtonText : "Yes, add it",
  }).then((result) => {
    if(result.isConfirmed){
        quantityUpdate(
            isExitedRecord.getAttribute("row-id"),
            parseInt(formData.get("quantity"))
        );
    }
  });
  
  }

  createRecordForm.reset();

  //   const total = calculateRecordCostTotal();
  //   const tax = calculateTax(total);

  //   // console.log(total);
  //   recordTotal.innerText = total;
  //   recordTax.innerText = calculateTax(total);
  //   recordNetTotal.innerText = total + tax;
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");

  const currentRecordRow = recordRow.querySelector(".record-row");
  // console.log(currentRecordRow);
  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;

  return recordRow;
};

// Calculating Products

export const calculateTax = (amount, percentage = 5) =>
  (amount / 100) * percentage;

export const calculateRecordCostTotal = () => {
  let total = 0;

  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });
  return total;
};

// Record Remove products part

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure to Delete?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
      // console.log(currentRecordRow);
      currentRecordRow.remove();
    }
  });
};

//Simple Way to add & subtract
// export const quantityAdd = (rowId) => {
//     const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
//     const recordProductPrice = currentRecordRow.querySelector(
//         ".record-product-price"
//     );
//     const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//     const recordCost = currentRecordRow.querySelector(".record-cost");

//     recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
//     recordCost.innerText = recordQuantity.innerText * recordProductPrice.innerText;
// };

// export const quantityReduce = (rowId) => {
//   const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
//   const recordProductPrice = currentRecordRow.querySelector(
//     ".record-product-price"
//   );
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordCost = currentRecordRow.querySelector(".record-cost");

//   let currentQuantuty = parseInt(recordQuantity.innerText);
//   if(currentQuantuty > 1){
//     recordQuantity.innerText = currentQuantuty -1 ;
//     recordCost.innerText = recordQuantity.innerText * recordProductPrice.innerText;
//   }
// };

export const quantityUpdate = (rowId, newQuantity) => {
  const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(
    ".record-product-price"
  );
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
  }
  recordCost.innerText =
    recordQuantity.innerText * recordProductPrice.innerText;
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  } else if (event.target.classList.contains("quantity-add")) {
    const currentRecordRow = event.target.closest(".record-row");
    quantityUpdate(currentRecordRow.getAttribute("row-id"), 1);
  } else if (event.target.classList.contains("quantity-sub")) {
    const currentRecordRow = event.target.closest(".record-row");
    quantityUpdate(currentRecordRow.getAttribute("row-id"), -1);
  }
};

// obseve record calculating

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);

    recordTotal.innerText = total;
    recordTax.innerText = calculateTax(total);
    recordNetTotal.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, observerOptions);
};
