import {productSidebar } from "./selector"

export const manageInventoryBtnHandler = ()=>{
    productSidebar.classList.remove('translate-x-full')
    productSidebar.classList.add('duration-500')
};

export const closeSidebarBtnHandler = ()=> {
    productSidebar.classList.add('translate-x-full')
};


