import { closeSidebarBtnHandler, manageInventoryBtnHandler } from "./handler";
import { addnewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import { addNewProductBtn, closeSidebarBtn, createRecordForm, manageInventoryBtn, recordGroup } from "./selector";

const listener = () =>{
    manageInventoryBtn.addEventListener('click',manageInventoryBtnHandler);
    closeSidebarBtn.addEventListener('click',closeSidebarBtnHandler);
    addNewProductBtn.addEventListener('click',addnewProductBtnHandler);
    createRecordForm.addEventListener('submit',createRecordFormHandler);
    recordGroup.addEventListener('click',recordGroupHandler);
}

export default listener;

