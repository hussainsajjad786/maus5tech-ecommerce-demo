const products = [
 {id:1,name:"Everyday Bottle",category:"WELLNESS",price:1850,desc:"A dependable companion for your daily routine.",shape:"bottle",badge:"BESTSELLER"},
 {id:2,name:"Canvas Carryall",category:"ACCESSORIES",price:3200,desc:"A roomy, versatile bag for days on the move.",shape:"bag",badge:"NEW"},
 {id:3,name:"Field Notes Journal",category:"STATIONERY",price:1250,desc:"A little space for your next big idea.",shape:"notebook",badge:""},
 {id:4,name:"Studio Mug",category:"HOME",price:1450,desc:"A quiet moment, made a little better.",shape:"mug",badge:""},
 {id:5,name:"Soft Glow Lamp",category:"HOME",price:4850,desc:"Warm light for slow evenings and focused work.",shape:"lamp",badge:""},
 {id:6,name:"Weekend Tote",category:"ACCESSORIES",price:2650,desc:"Lightweight, useful, ready for anywhere.",shape:"tote",badge:"POPULAR"}
];
let cart = [];
const money = value => "Rs. " + value.toLocaleString("en-PK");
const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
function renderProducts(){
  const term = search.value.trim().toLowerCase();
  let visible = products.filter(p => (p.name+" "+p.category+" "+p.desc).toLowerCase().includes(term));
  if(sort.value==="low") visible.sort((a,b)=>a.price-b.price);
  if(sort.value==="high") visible.sort((a,b)=>b.price-a.price);
  grid.innerHTML = visible.length ? visible.map(p=>`
    <article class="product-card">
      <div class="product-image">${p.badge?`<span class="label">${p.badge}</span>`:""}<div class="shape shape-${p.shape}">${p.shape==="notebook"?'<span>NORTHSTAR<br>FIELD NOTES</span>':""}</div></div>
      <div class="product-info">
        <div class="product-title-row"><h3 class="product-title">${p.name}</h3><span class="product-price">${money(p.price)}</span></div>
        <p class="product-description">${p.desc}</p>
        <button class="add-button" data-add="${p.id}">ADD TO BAG +</button>
      </div>
    </article>`).join("") : '<p class="no-results">No products found. Try another search.</p>';
}
function renderCart(){
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  document.querySelector("#cart-count").textContent=count;
  document.querySelector("#drawer-count").textContent=`(${count})`;
  document.querySelector("#cart-total").textContent=money(cart.reduce((sum,item)=>sum+item.price*item.qty,0));
  const target=document.querySelector("#cart-items");
  target.innerHTML=cart.length?cart.map(item=>`<div class="cart-line"><div><strong>${item.name}</strong><small>${money(item.price)} each</small><div class="quantity-controls"><button data-qty="${item.id}" data-change="-1" aria-label="Decrease ${item.name} quantity">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-change="1" aria-label="Increase ${item.name} quantity">+</button></div></div><div><strong>${money(item.price*item.qty)}</strong><br><button class="remove-item" data-remove="${item.id}">Remove</button></div></div>`).join(""):'<p class="empty-cart">Your bag is waiting for something good.</p>';
}
function openCart(){document.querySelector("#cart-overlay").hidden=false;document.body.style.overflow="hidden";}
function closeCart(){document.querySelector("#cart-overlay").hidden=true;document.body.style.overflow="";}
grid.addEventListener("click",e=>{const button=e.target.closest("[data-add]");if(!button)return;const p=products.find(item=>item.id===Number(button.dataset.add));const existing=cart.find(item=>item.id===p.id);existing?existing.qty++:cart.push({...p,qty:1});renderCart();button.textContent="ADDED ✓";setTimeout(()=>{button.textContent="ADD TO BAG +"},900);});
document.querySelector("#cart-items").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]");const remove=e.target.closest("[data-remove]");if(qty){const item=cart.find(p=>p.id===Number(qty.dataset.qty));item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(p=>p.id!==item.id);}if(remove)cart=cart.filter(p=>p.id!==Number(remove.dataset.remove));renderCart();});
document.querySelector("#open-cart").addEventListener("click",openCart);
document.querySelector("#close-cart").addEventListener("click",closeCart);
document.querySelector("#close-cart-x").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.querySelector("#checkout").addEventListener("click",()=>alert("This is a front-end portfolio demo. No real checkout or payment is connected."));
search.addEventListener("input",renderProducts);sort.addEventListener("change",renderProducts);
document.querySelector("#newsletter-form").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#newsletter-message").textContent="Thanks! This demo form is working locally; no email was sent.";e.target.reset();});
renderProducts();renderCart();
