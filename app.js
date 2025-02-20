

//Storage Controller

const StorageCtrl = (function(){


    return{
        storeItem : function(item){
            let items 
            if(localStorage.getItem("items") == null){
                items = []
            }else{
                items = JSON.parse(localStorage.getItem("items"))   
            }
            items.push(item)

            localStorage.setItem("items",JSON.stringify(items))
        },
        getStoreItem : function(){
            let items 
            if(localStorage.getItem("items") == null){
                items = []
            }else{
                items = JSON.parse(localStorage.getItem("items"))   
            }
            return items
        },
        updateStoreItem : function(updateItem){
            let items = JSON.parse(localStorage.getItem("items"))

            items.forEach(function(item,index){
                if(updateItem.id === item.id){
                    items.splice(index,1,updateItem)
                }
            })
            localStorage.setItem("items",JSON.stringify(items))
        },
        deleteStoreItem : function(id){
            let items = JSON.parse(localStorage.getItem("items"))

            items.forEach(function(item,index){
                if(id === item.id){
                    items.splice(index,1)
                }
            })

            localStorage.setItem("items",JSON.stringify(items))

        },
        
        clearAllStoreItems : function(){
            let items = JSON.parse(localStorage.getItem("items"))

            items = []

            localStorage.setItem("items",JSON.stringify(items))

        }

    }
})()


// Item controller


const ItemCtrl = (function(){
    // Constructor 
    const Item = function(id,name,money){
        this.id = id,
        this.name = name,
        this.money = money
    }

    const data = {
        // items : [
        //     // {id:0, name:"Clothes", money:3000}
        // ],
        items : StorageCtrl.getStoreItem(),
        totalMoney : 0,
        currentItem : null
    }
    return{
        addItem : function(name,money){
            let id;
            if(data.items.length > 0){
                id = data.items[data.items.length -1].id +1
            }else{
                id = 0;
            }
            
            money = parseInt(money);

            const newItem = new Item(id,name,money)

            data.items.push(newItem)

            return newItem
        },

        setCurrentItem : function(item){
            data.currentItem = item
        },
        getDataItem : function(){
            return data.currentItem
        },
        getTotalItems : function(){
            return data.items
        },

        getTotalMoney : function(){
            let total = 0
            if(data.items.length > 0){
                data.items.forEach(function(item){
                    total += item.money
                    
                })
                data.totalMoney = total
            }else{
                return data.totalMoney = 0
            }

            return total
        },

        getCurrentItem : function(id){
            return data.items[id]
        },
        updateItems : function(name,money){
            console.log(name,money);
            let found = null
            money = parseInt(money)
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name
                    item.money = money
                    found = item

                }
            })
            return found
        },
        removeItem : function(item){
            let id ;
           data.items.forEach(function(element){
            if(element.id === item.id){
                id = element.id
                data.items.splice(element.id,1)
            } 
           })
           console.log(data.items);
            return id
        },
        removeAllItem : function(){

             data.items =[]
        }

    }

}

)();

//UI controller

const UiCtrl = (function(){
    return{
        populateListItems : function(items){
            let html = ""

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong> :
                <em>${item.money} RS</em>
                <a href="#!" class="secondary-content">
                     <i class="fa-solid fa-pencil edit-item"></i>
                </a>
                </li>
                `
            })

            document.querySelector(".collection").innerHTML = html
        },
        clearEditButton : function(){
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none"
            document.querySelector(".delete-btn").style.display = "none"
            document.querySelector(".back-btn").style.display = "none"
        },

        // get the value 

        getInputValue : function(){
            return{
                name : document.querySelector("#item-name").value,
                money : document.querySelector("#item-money").value
            }
        },

        // add  list items

        addListItem : function(newItem){

            const li = document.createElement('li')

            const { name,money}= this.getInputValue()

            li.classList = "collection-item"

            li.id = `item-${newItem.id}`

            li.innerHTML = `<strong>${name}</strong> :
                <em>${money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>
                </a>`

            document.querySelector(".collection").appendChild(li)
        },

        clearInputField : function(){
            document.querySelector("#item-name").value = ""
            document.querySelector("#item-money").value = ""
        },
        updateMoney : function(money){
            document.querySelector(".total-money").innerText =money
        },
        addEditBtn : function(){
            document.querySelector(".add-btn").style.display = "none"
            document.querySelector(".update-btn").style.display = "inline"
            document.querySelector(".delete-btn").style.display = "inline"
            document.querySelector(".back-btn").style.display = "inline"
        },
        updateInputField : function(item){
            const {name,money}= item
            document.querySelector("#item-name").value = name
            document.querySelector("#item-money").value = money
        },
        updateListItem : function(item){
            console.log(item);
            let li = document.querySelectorAll(".collection-item")

            li.forEach(function(element){
                const id = element.getAttribute('id');
                console.log(id);

                if(id === `item-${item.id}`){
                    document.querySelector(`#${id}`).innerHTML = `
                    <strong>${item.name}</strong> :
                    <em>${item.money}RS</em>
                    <a href="#!" class="secondary-content">
                        <i class="fa-solid fa-pencil edit-item"></i>
                    </a>`
                }
            })
        },
        removeListItems : function(id){
            document.querySelectorAll(".collection-item").forEach(function(item){
                if(item.id === `item-${id}`){
                    console.log(document.querySelector(`#item-${id}`));
                    document.querySelector(`#item-${id}`).remove()
                   

                }
            })
        },
        clearAllList : function(){
            document.querySelector(".collection").innerHTML = ""
        }

    }
}

)();


//App controller


const App = (function(){
    
    const loadEventLisner = function(){
        document.querySelector(".add-btn").addEventListener('click',itemAddSubmit)

        document.querySelector("#item-list").addEventListener('click',itemEditClick)

        document.querySelector(".update-btn").addEventListener('click',updateClick)

        document.querySelector(".delete-btn").addEventListener('click',deleteClicked)

        document.querySelector('.back-btn').addEventListener('click',backClicked)

        document.querySelector(".clear-btn").addEventListener('click',clearAllSubmit)

    }

    const itemAddSubmit = function(e){

        e.preventDefault();

        const input = UiCtrl.getInputValue()

        if(input.name === "" || input.money === ""){
            alert("Please fill the form")
        }else{
            
            const newItem = ItemCtrl.addItem(input.name,input.money)

            UiCtrl.addListItem(newItem);

            UiCtrl.clearInputField();

            StorageCtrl.storeItem(newItem)

            const total = ItemCtrl.getTotalMoney();

            UiCtrl.updateMoney(total)
        }


    }
    
    const itemEditClick = function(e){

        if(e.target.classList.contains('edit-item')){

            const li = e.target.parentElement.parentElement

            const item = ItemCtrl.getCurrentItem(li.id.split("-")[1])

            UiCtrl.updateInputField(item)

            //set cuurent item
            ItemCtrl.setCurrentItem(item)

            // add the edit btn
            UiCtrl.addEditBtn()
        }

    }

    const updateClick = function(){
        const items = UiCtrl.getInputValue()

        const updatedItem = ItemCtrl.updateItems(items.name,items.money)

        UiCtrl.updateListItem(updatedItem)

        StorageCtrl.updateStoreItem(updatedItem)

        UiCtrl.clearInputField()

        UiCtrl.clearEditButton()

        const total = ItemCtrl.getTotalMoney();

        UiCtrl.updateMoney(total)


    }

    const deleteClicked = function(){
        ItemCtrl.getCurrentItem()

        const item = ItemCtrl.getDataItem()

        const id = ItemCtrl.removeItem(item)

        StorageCtrl.deleteStoreItem(id)

        UiCtrl.removeListItems(id)

        UiCtrl.clearInputField()

        UiCtrl.clearEditButton()

        const total = ItemCtrl.getTotalMoney();

        UiCtrl.updateMoney(total)


    }

    const backClicked = function(){
        UiCtrl.clearInputField()

        UiCtrl.clearEditButton()
    }

    const clearAllSubmit = function(){

        ItemCtrl.removeAllItem()

        UiCtrl.clearAllList()

        StorageCtrl.clearAllStoreItems()

        const total = ItemCtrl.getTotalMoney();

        UiCtrl.updateMoney(total)
    }

    return {
        init : function(){
            //clear three btn

            UiCtrl.clearEditButton()

            const items = ItemCtrl.getTotalItems()

            UiCtrl.populateListItems(items)

            const total = ItemCtrl.getTotalMoney();

            UiCtrl.updateMoney(total)

            loadEventLisner()
        }
        
    }
}

)();

App.init()