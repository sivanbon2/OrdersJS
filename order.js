var orders_data = document.getElementById('orders_data');
let orders = [];
const deliveryCosts = [0 , 15 , 20];
const necklaceTypesCosts = [0,10, 20, 30];
var modal = document.getElementById('myModal');

LoadOrdersFromStorage();



function LoadOrdersFromStorage(){
    let ordersJson = localStorage.getItem("store_orders");
    orders = JSON.parse(ordersJson);
    CreateOrdersTable(orders);
    
}

function CreateOrdersTable(orders){


    
    orders.forEach(order => {

        let tr = document.createElement('tr');
        
        let td_order_id = document.createElement('td');
        td_order_id.innerText = order.order_id;

        let td_order_necklace = document.createElement('td');
        td_order_necklace.innerText = order.order_necklace;

        let td_order_necklace_cost = document.createElement('td');
        td_order_necklace_cost.innerText = necklaceTypesCosts[order.order_necklace];


        let td_order_text = document.createElement('td');
        td_order_text.innerText = order.order_text;

        let td_order_cus_name = document.createElement('td');
        td_order_cus_name.innerText = order.order_cus_name;

        let td_order_cus_address = document.createElement('td');
        td_order_cus_address.innerText = order.order_cus_address;
        
        let td_order_cus_email = document.createElement('td');
        td_order_cus_email.innerText = order.order_cus_email;

        let td_order_delivery_cost = document.createElement('td');
        td_order_delivery_cost.innerText = deliveryCosts[order.order_delivary_type];

        let td_order_total_pay = document.createElement('td');
        td_order_total_pay.innerText = order.order_total_pay;

        let td_order_actions = document.createElement('td');

        let btn_done = document.createElement('button');
        btn_done.type = "button";
        btn_done.className = "btn btn-primary btn-sm"
        let btn_done_i = document.createElement('i');
        btn_done_i.className = "fas fa-check-circle";
        btn_done.appendChild(btn_done_i);
        
        btn_done.dataset.order_id = order.order_id;
        
        let btn_cancel = document.createElement('button');
        btn_cancel.type = "button";
        btn_cancel.className = "btn btn-danger btn-sm"
        let btn_cancel_i = document.createElement('i');
        btn_cancel_i.className = "fas fa-trash";
        btn_cancel.appendChild(btn_cancel_i);

        btn_cancel.dataset.order_id = order.order_id;


        let btn_edit = document.createElement('button');
        btn_edit.type = "button";
        btn_edit.className = "btn btn-warning btn-sm"
        let btn_edit_i = document.createElement('i');
        btn_edit_i.className = "fas fa-pen";
        btn_edit.appendChild(btn_edit_i);
        btn_edit.dataset.order_id = order.order_id;
        btn_edit.addEventListener('click' , function(){
            editOrder(this.dataset.order_id);
        });
        

        td_order_actions.appendChild(btn_done);
        td_order_actions.appendChild(btn_cancel);
        td_order_actions.appendChild(btn_edit);


        tr.appendChild(td_order_id);
        tr.appendChild(td_order_necklace);
        tr.appendChild(td_order_necklace_cost);
        tr.appendChild(td_order_text);
        tr.appendChild(td_order_cus_name);
        tr.appendChild(td_order_cus_address);
        tr.appendChild(td_order_cus_email);
        tr.appendChild(td_order_delivery_cost);
        tr.appendChild(td_order_total_pay);
        tr.appendChild(td_order_actions);


     
        orders_data.appendChild(tr)
    });
}

function editOrder(order_id){
    document.getElementById("order_edit_title").innerHTML = order_id;
    modal.style.display = "block";
    let order_to_edit = getOrderById(order_id);
}

function getOrderById(order_id){
    let order_to_return = null;
    orders.forEach(order => {
        if(order.order_id == order_id ){
            order_to_return = order;
        }
    });

    return order_to_return;


}

// Get the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




