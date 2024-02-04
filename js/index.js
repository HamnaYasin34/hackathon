const products = [
    {
        id: 1,
        name: "hp core i7",
        category: "Laptop",
        price: " 50,000",
        img: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?cs=srgb&dl=pexels-craig-dennis-205421.jpg&fm=jpg",
    },
    {
        id: 2,
        name: "Best Gaming Phones 2023",
        category: "Smartphone",
        price: "75,000",
        img: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/04/Best-gaming-phone-2023.jpg",
    },
    {
        id: 3,
        name: "Official Huawei FreeBuds Studio Wireless Headphones",
        category: "Headphones",
        price: "42,999",
        img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
        id: 4,
        name: "SAMSUNG Galaxy Tab S6 Lite 10.4 64GB",
        category: "Tablet",
        price: "199.9",
        img: "https://m.media-amazon.com/images/I/415G0bg-hiL._AC._SR360,460.jpg",
    },
    {
        id: 5,
        name: "Microsoft Surface Laptop 5 Core i7 ",
        category: "Laptop",
        price: "474,999 ",
        img: "https://www.mega.pk/items_images/Microsoft+Surface+Laptop+5+Core+i7+12th+Generation+16GB+RAM+512GB+SSD+13+5+inch+Windows+11+Price+in+Pakistan%2C+Specifications%2C+Features_-_23885.webp",
    },
    {
        id: 6,
        name: "HP Notebook 15",
        category: "Laptop",
        price: " 45,999.00 ",
        img: "https://www.hshop.pk/wp-content/uploads/2019/12/HP-Notebook-15-RA008nia-Price-in-Pakistan-hshop.pk_.png",
    },
];

let productSection = document.querySelector(".product-section");

function searchItem(products, itemToSearch) {
    let item = itemToSearch.toLowerCase();
    let result = products.filter((e) => {
        let productName = e.category.toLowerCase();

        return productName.includes(item);
    });
    return result;
}


// let result = searchItem(products, "Laptop");
//   console.log(result);


function generateProductCard(product) {
    return `
    <div class="product-card">
      <img class="product-image" src="${product.img}" alt="${product.name}">
      <div class="product-info"  pid='${product.id}'  pname='${product.name}' pprice='${product.price}'  pimg='${product.img}'>
        <div class="product-title">${product.name}</div>
        <div class="product-price" >${product.price} PKR</div>
        <button class="btn" onclick="addToCart(this)">Add to cart</button>

      </div>
    </div>
  `;
}

let productCardsHTML;

productCardsHTML = products.map(generateProductCard).join("");
productSection.innerHTML = productCardsHTML;

function handleSearch(searchTerm) {
    let searchResult = searchItem(products, searchTerm);
    if (searchResult.length > 0) {
        productCardsHTML = searchResult.map(generateProductCard).join("");
        productSection.innerHTML = productCardsHTML;
    } else {
        productSection.innerHTML = `<div class='no-match'>no match Found ...</div>`;

    }
}



/////////////////////////////// add to cart /////////////////////////////
let cartItems = [];

const addToCart = (e) => {

    // console.log(e.parentNode.parentNode);
    const itemName = e.parentNode.getAttribute('pname');
    const itemPrice = e.parentNode.getAttribute('pprice');
    const itemImg = e.parentNode.getAttribute('pimg');
    const itemId = e.parentNode.getAttribute('pid');

    const existingItem = cartItems.find(product => product.pid == itemId);

    if (existingItem) {
        existingItem.quantity += 1;
        createCart(cartItems);
    } else {
        cartItems.push({ name: itemName, price: itemPrice, img: itemImg, pid: itemId, quantity: 1 });
        document.getElementById('cartLength').innerHTML = cartItems.length;
        createCart(cartItems);
    }

    // console.log(cartItems);
}


function removeCartItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.pid == itemId);

    if (itemIndex !== -1) {
        const removedItem = cartItems.splice(itemIndex, 1)[0];
        createCart(cartItems);

        document.getElementById('cartLength').innerHTML = cartItems.length;
        const total = calculateCartTotal(cartItems);
        document.getElementById('cartTotal').innerHTML = total.toFixed(2);

        // console.log(`Removed item: ${removedItem.name}`);
    }
}

function increaseQuantity(itemId) {
    const cartItem = cartItems.find(item => item.pid == itemId);
    if (cartItem) {
        cartItem.quantity += 1;
        createCart(cartItems);
    }
}

function decreaseQuantity(itemId) {
    const cartItem = cartItems.find(item => item.pid == itemId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        createCart(cartItems);
    }
}

function calculateCartTotal(items) {
    let total = 0;
    items.forEach((item) => {
        total += parseFloat(item.price.replace(',', '')) * item.quantity;
    });
    return total;
}

function createCart(items) {
    document.getElementById('cart-body').innerHTML = items.map((e, i) => {
        // console.log(e);

        return `

        <div class="cartItem">
          <img
            src= '${e.img}'
            alt="${e.name}"
          />
  
          <div class="cartItemDetail">
            <h3>${e.name}</h3>
            <h3>${e.price} PKR</h3>
            <b> 
            <button class="smBtn increaseBtn" onclick="increaseQuantity('${e.pid}')">+</button>
             qty: ${e.quantity}
             <button class="smBtn decreaseBtn" onclick="decreaseQuantity('${e.pid}')">-</button>
             </b>
             <button class=" removeBtn" onclick="removeCartItem('${e.pid}')">X</button>

          </div>
          </div>
  `
    })
    const total = calculateCartTotal(items);
    document.getElementById('cartTotal').innerHTML = total.toFixed(2);

}




function clearCart() {
   cartItems.length = 0;
   createCart(cartItems);
}
function toggleCart() {
    document.getElementById('cart').style.display = 'block'
}
function closeBtn() {
    document.getElementById('cart').style.display = 'none'
}