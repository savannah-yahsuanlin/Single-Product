"use strict"

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}   

function ready(){
    
    var cartRemove = document.querySelectorAll(".details-remove");
    for(var i = 0; i < cartRemove.length; i++){
        var removeItem = cartRemove[i];
        removeItem.addEventListener('click', removeCartItem);
    }

    let addToCart = document.querySelectorAll('.add-to-cart');
    for(var i = 0; i < addToCart.length; i++){
        let itemCountList = addToCart[i];
        itemCountList.addEventListener('click', addItemButtonClicked);
    }
  
    const openSideNav = document.getElementById('open-side-nav');
    const closeSideNav = document.getElementById('close-side-nav');

    closeSideNav.addEventListener('click', cartClose, false);
    openSideNav.addEventListener('click', cartOpen, false);

    const individual = document.getElementById('individual'); 
    const group = document.getElementById('group');

    individual.addEventListener('click', singlePrice, false);
    group.addEventListener('click', groupPrice, false );    
}

function cartClose() {
    document.getElementsByClassName('shopping-side')[0].style.display = 'none';
}
function cartOpen() {
   document.getElementsByClassName('shopping-side')[0].style.display = 'block';
}


function singlePrice() {
    document.getElementsByClassName('price')[0].innerText = '$499';
    document.getElementsByClassName('license')[0].classList.add('Individual');
    document.getElementsByClassName('license')[0].classList.remove('Group');
    document.getElementById('addToCart').removeAttribute('disabled');
}

function groupPrice() {
    document.getElementsByClassName('price')[0].innerText = '$749';
    document.getElementsByClassName('license')[0].classList.add('Group');
    document.getElementsByClassName('license')[0].classList.remove('Individual');   
    document.getElementById('addToCart').removeAttribute('disabled');
}



function addItemButtonClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;
    var imageItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('sub-title-desktop')[0].innerText;
    var price = shopItem.children[2].innerText;
    var imageSrc = imageItem.children[0].children[1].children[0].children[0].attributes[0].nodeValue;
    var license = shopItem.children[4].childNodes[1].classList[1];
    var quantity = document.getElementById('counter').value;
    document.getElementById('shopping-side').style.display = 'block';
    addItemtoCart(title, price, license, imageSrc, quantity);
    totalPrice();
    updateItemCount();
}


function addItemtoCart(title, price, license, imageSrc, quantity) {
    var cartRow = document.createElement('li');
    cartRow.classList.add('item-list-details');
    var itemListRow = document.getElementsByClassName('cart-item-list')[0];
    var itemListTitle = itemListRow.getElementsByClassName('details-content-title');
    var cartRowContent = ` 
        <div class="list-details-image">
            <img class="list-img" width="100" height="100" src="${imageSrc}">
        </div>
        <div class="list-details-content">
            <h6 class="details-content-title">${title}</h6>
            <p class="cart-license">License:<span>${license}</span></p>
            <div class="details-option">
                <div class="input-group">
                    <input class="cart-minus" id="minus" type="button" value="-">
                    <input class="cart-quantity" id="form-quantity" value="${quantity}" type="number">
                    <input class="cart-plus" id="plus" type="button" value="+">      
                </div> 
                <span class="cart-remove">
                    <a href="#" class="details-remove">Remove</a>
                </span>
                <span class="cart-details-price">${price}</span>
            </div>
        </div>`;

    cartRow.innerHTML = cartRowContent;
    itemListRow.append(cartRow);
    cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    Array.prototype.slice.call(document.querySelectorAll('.input-group'))
    .map(function (document) {
        return {
        input: document.querySelector('.cart-quantity'),
        decrease: document.querySelector('.cart-minus'),
        increase: document.querySelector('.cart-plus'),
        get value () { 
            return parseInt(this.input.value);
        },
        set value (v) { 
            this.input.value = v; 
            }
        }
    })
    .forEach(function (item) {
        item.decrease.addEventListener('click', function () { 
            item.value -= 1;
            updateItemCount();
            totalPrice();
        });
        item.increase.addEventListener('click', function () {
            item.value += 1;
            updateItemCount();
            totalPrice();
        });
          
    });
}


function removeCartItem(event) {
    let removeButton = event.target;
    removeButton.parentElement.parentElement.parentElement.parentElement.remove();
    totalPrice();
    return updateItemCount();
}   


function updateItemCount(){
    var itemListRow = document.getElementsByClassName('cart-item-list')[0];
    var itemListDetails = itemListRow.getElementsByClassName('item-list-details'); 
    var total = document.querySelectorAll('.total-number')[0].innerText;
    var array = [];
    var sum = 0;
    if(total = "0"){
        document.getElementsByClassName('item-count')[0].innerHTML = "0";
    }
    for(var i = 0; i < itemListDetails.length; i++) {
        var cartList = itemListDetails[i];
        var quantity = parseInt(cartList.getElementsByClassName('cart-quantity')[0].value);
        array.push(quantity);
        array.concat(array);
    }
    for(var j = 0; j < array.length; j++){
        sum += array[j];
        document.getElementsByClassName('item-count')[0].innerHTML = sum;
    }
    totalPrice();
}

function totalPrice(){
    var itemListRow = document.getElementsByClassName('cart-item-list')[0];
    var itemListDetails = itemListRow.getElementsByClassName('item-list-details'); 
    var total = 0;
    for(let i = 0; i < itemListDetails.length; i++){
        var cartList = itemListDetails[i];
        var price = parseInt(cartList.getElementsByClassName('cart-details-price')[0].innerHTML.replace('$', ''));
        var quantity = parseInt(cartList.getElementsByClassName('cart-quantity')[0].value);
        var total = total + (quantity * price);
    }
    document.querySelectorAll('.total-number')[0].innerText = '$'+ total;
}


