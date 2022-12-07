let cube = document.querySelector(".cube");
let container = document.querySelector(".container");


/* document.querySelector(".btnMusic").onclick = function() {
    if(document.querySelector(".eminem").play()){
        document.querySelector(".eminem").pause();
    }else{
        document.querySelector(".btnMusic").style.backgroundColor = "#735bc1";
    document.querySelector(".eminem").play();
    }
    
    
}

 */
document.querySelector(".emailIcon").onclick = function(){
    document.querySelector(".face").innerHTML = "☹️";
    document.querySelector('.emailContainer').style.top = "0";
    container.style.opacity = "0.2"
}
document.querySelector(".copyBtn").onclick = function() {
    document.querySelector(".face").innerHTML = "😃";
    document.querySelector('.emailContainer').style.top = "-100%";
    container.style.opacity = "1";
    const cb = navigator.clipboard;
    cb.writeText(document.querySelector(".email").innerHTML);
    document.querySelector(".copyBtn").innerHTML = "copied";
    setTimeout(()=> {
        document.querySelector(".copyBtn").innerHTML = "Copy";
    },1500)
}


let letters = document.querySelectorAll(".container .header div h1");
letters.forEach(element => {
    
    element.addEventListener('mouseover',function(){
        element.style.animation = "updown 0s 1 linear";
        element.style.animation = "updown 1s 1 linear";
    })
});
    

    


document.querySelector(".btnMusic").addEventListener('click',function(){
    document.querySelector(".eminem").classList.toggle("pl")
    if(document.querySelector(".eminem").classList.contains("pl")){
        document.querySelector(".eminem").play();
        document.querySelector(".btnMusic").style.backgroundColor = "#735bc1";
    }else{
        document.querySelector(".eminem").pause();
        document.querySelector(".btnMusic").style.backgroundColor = "rgba(255, 255, 255, 0.518)";

    }
})
container.addEventListener("mousemove", function(e){
    cube.style.left = `${e.clientX }px`
    cube.style.top = `${e.clientY}px`
})
document.querySelector(".offline").addEventListener("mousemove", function(e){
    cube.style.left = `${e.clientX }px`
    cube.style.top = `${e.clientY}px`
})

window.addEventListener("online",function(){
    onLine();
})
window.addEventListener("offline",function(){
    offline();
})
function onLine(){
    document.querySelector(".offline").classList.add('hide');
    document.querySelector(".onlinee").classList.remove('hide');

}
function offline(){    
    document.querySelector(".onlinee").classList.add('hide');
    document.querySelector(".offline").classList.remove('hide');
}





//  get total
//  create product
//  save localStorage
//  Read data
//  count function
//  update
//  search
let title = document.querySelector(".inputs .title");
let count = document.querySelector(".inputs #count");
let category = document.querySelector(".inputs #category");
let submitBtn = document.getElementById("create");
let price = document.querySelector(".inputs .prices #price");
let taxes = document.querySelector(".inputs .prices #taxes");
let ads = document.querySelector(".inputs .prices #ads");
let discount = document.querySelector(".inputs .prices #discount");
let total = document.querySelector(".inputs .prices #total");
let theTable = document.getElementById("bodyTable");
let deleteAll = document.getElementById('deleteAll');
let temp;
let Mood = "create";
let scrollSpan = document.querySelector(".scrollToTop");
let sbTitle = document.getElementById("sbTitle");
let sbCategory = document.getElementById("sbCategory");

container.onscroll = function(){
    if(this.scrollTop >= 450){
        scrollSpan.classList.add("show");
    }else{
        scrollSpan.classList.remove("show");

    }
}
    

scrollSpan.onclick = function(){
    container.scroll(0,0);
}


clearInputs = () => {
    title.value ="";
    count.value ="";
    category.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value ="";
    total.innerHTML ="";
    total.style.backgroundColor = "rgba(95, 95, 95, 0.323)"
}

window.onload = function(){

    if(window.navigator.onLine){
        onLine();
        clearInputs();
    }else{
        offline();        

    }

    
}
let productsArr = [];
if(window.localStorage.getItem("products")){
    productsArr = JSON.parse(localStorage.getItem("products"));
    showData(productsArr);
}
function getTotal(){
    if(price.value != "" ){
        let res = (+price.value + +taxes.value + + ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.backgroundColor = "#1e781ec7";
    }else{
        discount.value="";
        ads.value ="";
        taxes.value = "";
        total.innerHTML = "";
        total.style.backgroundColor = "#a11717db";}
}


submitBtn.onclick = function() {
    if(Mood === "Update"){
        console.log('its ')
        productsArr[temp].title = title.value;
        productsArr[temp].price = price.value;
        productsArr[temp].taxes = taxes.value;
        productsArr[temp].ads = ads.value;
        productsArr[temp].discount = discount.value;
        productsArr[temp].category = category.value;
        productsArr[temp].total = total.innerHTML;
        addToLC(productsArr);
        showData(productsArr);
        Mood = "Create";
        submitBtn.innerHTML = Mood;
        count.style.display = "block";
        clearInputs();
        container.scroll(0,9000);

    }else{
        if((price.value != "")  && (category.value != "" )&& (title.value != "")){
            if(count.value != ""  &&  count.value <=100){
                for(let i=0; i<count.value ; i++)
                {
                    const product = {
                        title : title.value,
                        price : price.value,
                        taxes : taxes.value,
                        ads : ads.value,
                        discount: discount.value,
                        total : total.innerHTML,
                        category: category.value,}
                    productsArr.push(product);
                    showData(productsArr);
                    }
            }else{
                const product = {
                    title : title.value,
                    price : price.value,
                    taxes : taxes.value,
                    ads : ads.value,
                    discount: discount.value,
                    total : total.innerHTML,
                    category: category.value,}
                productsArr.push(product);
                showData(productsArr);
                }   
                addToLC(productsArr);
                clearInputs();
        }else{
            document.querySelector(".submitContainer").style.top = "0";
            document.querySelector(".container").style.opacity = "0.4";
        }
        
    }
    }
    
function addToLC(arr) {
        window.localStorage.setItem("products",JSON.stringify(arr));
}

function showData(arr){

    theTable.innerHTML = "";    
    for(let i=0 ; i<arr.length;i++)
    {
        /*  
        -------------------the stuuuuuuuuuuuuuuuuuuuupid method

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(ele.id))


        let title = document.createElement("td");
        title.appendChild(document.createTextNode(ele.title))

        let price = document.createElement("td");
        price.appendChild(document.createTextNode(ele.price))

        let taxes = document.createElement("td");
        taxes.appendChild(document.createTextNode(ele.taxes))

        let ads = document.createElement("td");
        ads.appendChild(document.createTextNode(ele.ads))

        let discount = document.createElement("td");
        discount.appendChild(document.createTextNode(ele.discount))

        let total = document.createElement("td");
        total.appendChild(document.createTextNode(ele.total))

        let category = document.createElement("td");
        category.appendChild(document.createTextNode(ele.category))

        let btnUpdate = document.createElement("button");
        btnUpdate.appendChild(document.createTextNode("Update"));
        btnUpdate.className = "btnUpdate";

        let tdUpdate = document.createElement("td");
        tdUpdate.appendChild(btnUpdate);

        let btnDelete = document.createElement("button");
        btnDelete.appendChild(document.createTextNode("Delete"));
        btnDelete.className = "btDelete";
        let tdDelete = document.createElement("td");
        tdDelete.appendChild(btnDelete);

        let tr = document.createElement("tr");
        tr.appendChild(id);
        tr.appendChild(title);
        tr.appendChild(price);
        tr.appendChild(taxes);
        tr.appendChild(ads);
        tr.appendChild(discount);
        tr.appendChild(total);
        tr.appendChild(category);
        tr.appendChild(tdUpdate);
        tr.appendChild(tdDelete); */


        //-----------------------the best Method
        let line = 
        `
            <tr>
                <td>${i+1}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].category}</td>
                <td><button onclick="updateEle(${i})" class="btnUpdate">Update</button></td>
                <td><button onclick="deleteEle(${i})" class="btnDelete">Delete</button></td>
            </tr>
        `
        theTable.innerHTML += line;
    }
    
}

function deleteEle(i){
    window.addEventListener('click' ,(e)=> {
        if(e.target.className === "btnDelete")
        {
            productsArr.splice(i,1);
            
            addToLC(productsArr);
            showData(productsArr);
            console.log(productsArr);
            window.location.reload();
        }
        
    })
}
function updateEle(i){
    window.addEventListener('click' ,(e)=> {
        if(e.target.className === "btnUpdate")
        {
            
            title.value = productsArr[i].title;
            price.value = productsArr[i].price;
            taxes.value = productsArr[i].taxes;
            ads.value = productsArr[i].ads;
            discount.value = productsArr[i].discount;
            category.value = productsArr[i].category;
            total.innerHTML = productsArr[i].total;
            count.style.display = "none";
            submitBtn.innerHTML = "Update";
            Mood = "Update"
            temp = i;
            container.scroll(0,0);
        }
    })
}

deleteAll.onclick = function() 
{
    if(productsArr.length >0){
        productsArr.splice(0);
        addToLC(productsArr);
        showData(productsArr);
    }else {
        document.querySelector(".noDataContainer").style.top = "0";
        document.querySelector(".container").style.opacity = "0.4";
    }
    
}

document.querySelector(".submitNOData").onclick = function() {
    document.querySelector(".noDataContainer").style.top = "-100%";
    document.querySelector(".container").style.opacity = "1";
}
document.querySelector(".submitEmpty").onclick = function() {
    document.querySelector(".submitContainer").style.top = "-100%";
    document.querySelector(".container").style.opacity = "1";
}

sbTitle.onclick = function(){
    if(document.getElementById('search').value != "") {    
    theTable.innerHTML = "";
    productsArr.map((ele,ind) => {
        if(ele.title.includes(document.getElementById('search').value.toLowerCase())){
            theTable.innerHTML += 
            `
            <tr>
                <td>${ind}</td>
                <td>${ele.title}</td>
                <td>${ele.price}</td>
                <td>${ele.taxes}</td>
                <td>${ele.ads}</td>
                <td>${ele.discount}</td>
                <td>${ele.total}</td>
                <td>${ele.category}</td>
                <td><button onclick="updateEle(${ind})" class="btnUpdate">Update</button></td>
                <td><button onclick="deleteEle(${ind})" class="btnDelete">Delete</button></td>
            </tr>
        `
        }
    })
        document.getElementById('search').value = ""
    }else {
        document.getElementById('search').focus();
    }
}
sbCategory.onclick = function(){
    if(document.getElementById('search').value != ""){
        theTable.innerHTML ="";
    productsArr.map((ele,ind) => {
        if(ele.category.includes(document.getElementById('search').value.toLowerCase())){
            theTable.innerHTML += 
            `
            <tr>
                <td>${ind}</td>
                <td>${ele.title}</td>
                <td>${ele.price}</td>
                <td>${ele.taxes}</td>
                <td>${ele.ads}</td>
                <td>${ele.discount}</td>
                <td>${ele.total}</td>
                <td>${ele.category}</td>
                <td><button onclick="updateEle(${ind})" class="btnUpdate">Update</button></td>
                <td><button onclick="deleteEle(${ind})" class="btnDelete">Delete</button></td>
            </tr>
        `
        }
    })
    document.getElementById('search').value = "";
    }
    else 
    {
        document.getElementById('search').focus();
    }
}

document.querySelector(".reload").onclick = ()=> {
    showData(productsArr);
}