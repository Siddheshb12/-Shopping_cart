let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopItems.find((y) => y.id === id) || []
            return `
            <div class="cart-items">
            <img src= ${search.img} alt="" />
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class = "price">$ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-circle-fill"></i>
            </div>  
            <div class="button">
            <i onclick = "decrement(${id})" class="bi bi-dash"></i>
            <div id = ${id} class="quantity">
            ${item}
            </div>
            <i onclick = "increment(${id})" class="bi bi-plus"></i>
        </div>
            <h2>$ ${item*search.price}</h2>
            </div>
            </div>
            `
        }).join(''))
    }
    else {
        shoppingCart.innerHTML = '';
        label.innerHTML = `
        <h2>This cart is empty</h2>
        <a href="index.html">
        <button class="Home">Back to home</button>
        </a> 
        `;
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }
    else {
        search.item += 1;
    }
    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        return
    }
    else if (search.item === 0) {
        return;
    }
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems();
    
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation();
    totalAmount();
}

let removeItem = (id)=>{
    let selectedItem = id
    basket = basket.filter((x)=> x.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems();
    totalAmount(); 
    calculation()
}

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amaount = basket.map((x)=>{
            let {item, id} = x
            let search = shopItems.find((y) => y.id === id) || []
            return item*search.price;
        }).reduce((x,y)=>x+y,0)
        label.innerHTML = `
        <h2>Total bill : $ ${amaount}</h2>
        <button  class="checkout">Checkout</button>
        <button onclick="clearCart()" class="clear-cart">Clear cart</button>
        `
    }
    else return;
}

totalAmount();

let clearCart = ()=>{
    basket = []
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))
    calculation() 
}