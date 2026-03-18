let categories = [];
let subcategories = [];

let type = document.getElementById('type')
let source = document.getElementById('source')
let destination = document.getElementById('destination');
let amount = document.getElementById('amount');
let date = document.getElementById('date');
let categoryObj = document.getElementById('category');
let subcategoryObj = document.getElementById('subcategory');
let description = document.getElementById('description');
let operation = document.getElementById('db_type');
let transactionID = document.getElementById('transaction_id');
let loadBtn = document.getElementById('load_transaction');

const setCategories = async () => {
    const response = await fetch("https://krabs-api.snowlizard.app/category/all");
    const  data = await response.json();

    data.forEach((item) => {
        if(item.parent == null) {
            categories.push(item);
        } else {
            subcategories.push(item);
        }
    });

    categories.forEach((category) => {
        let option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoryObj.appendChild(option);
    });

    categoryObj.addEventListener("change", (event) => {
        subcategoryObj.replaceChildren();
        subcategories.forEach((subcategory) => {
            if(subcategory.parent == event.target.value){
                let option = document.createElement("option");
                option.value = subcategory.id;
                option.textContent = subcategory.name;
                subcategoryObj.appendChild(option);
            }
        });
    });

    categoryObj.value = "";
}

const setAccounts = async () => {
    const response = await fetch("https://krabs-api.snowlizard.app/account/all");
    const data = await response.json();

    data.forEach((account) => {
        let temp = document.createElement("option");
        temp.value = account.id;
        temp.textContent = account.name;
        source.appendChild(temp);

        let temp2 = document.createElement("option");
        temp2.value = account.id;
        temp2.textContent = account.name;
        destination.appendChild(temp2);
    });
}
setCategories();
setAccounts();

transactionID.addEventListener('change', (event) => {
    let value = event.target.value;
    let regexp = new RegExp(/^\d+$/s);

    if(!regexp.test(value)) {
        transactionID.value = "";
        transactionID.classList.add('is-invalid');
    } else {
        transactionID.classList.remove('is-invalid');
    }
});

loadBtn.addEventListener('click', (event) => {
    if(transactionID.value != ""){
        (async () => {
            const response = await fetch(`https://krabs-api.snowlizard.app/transaction/${transactionID.value}`);
            const data = (await response.json())[0];

            type.value = data.type;
            source.value = data.source;
            destination.value = data.destination;
            amount.value = data.amount;
            date.value = data.date.split('T')[0];
            categoryObj.value = data.category;
            subcategoryObj.value = data.subcategory;
            description.value = data.description;
        })();
    }
});

operation.addEventListener('change', (event) => {
    let opType = event.target.value;

    if(opType == 'update' || opType == 'delete') {
        transactionID.disabled = false;
        loadBtn.disabled = false;
    } else {
        transactionID.disabled = true;
        loadBtn.disabled = true;
    }
});

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let transaction = {
        "id": transactionID.value,
        "description": description.value,
        "source": parseInt(source.value),
        "destination": parseInt(destination.value),
        "date": date.value,
        "amount": parseFloat(amount.value),
        "category": parseInt(categoryObj.value),
        "subcategory": parseInt(subcategoryObj.value),
        "type": type.value
    };

    (async () => {

        let method = "";
        switch (operation.value) {
            case "insert":
                method = "POST";
                break;
            case "update":
                method = "PUT";
                break;
            case "delete":
                method = "DELETE";
                break;
        }

        if((method === 'PUT' || method === 'DELETE') && transactionID.value === "") {
            alert("Invalid transaction id");
            return;
        }

        const data = await fetch("https://krabs-api.snowlizard.app/transaction", {
            method: method,
            mode: "cors",
            body: JSON.stringify(transaction),
            headers: {"Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const response = await data.json();
        alert(response);

        description.value = "";
        categoryObj.value = "";
        subcategoryObj.value = "";
        amount.value = "";
        source.value = "";
        destination.value = "";
    })();
    
});