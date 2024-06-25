import initialRunner from "./initialRunner";
import listener from "./listener";
import observer from "./observer";

export default class Invoice {
    init(){
        console.log('inovice app start');
        observer();
        initialRunner();
        listener();
    }
}



// Self Edit 

// const inventory_manage = document.querySelector('#inventory_manage');
// const manage_bar = document.querySelector('#manage_bar');

// const cancel_bar = document.querySelector('#cancel_nav')

// const manage_navbar = () =>{
//     manage_bar.classList.remove('translate-x-full');
//     inventory_manage.style.opacity = 0
// }

// const cancel_navbar = () =>{
//     manage_bar.classList.add('translate-x-full');
//     inventory_manage.style.opacity = 1
// }

// inventory_manage.addEventListener('click',manage_navbar)

// cancel_bar.addEventListener('click',cancel_navbar)

