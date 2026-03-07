let categories = [
    {
        "id": 1,
        "name": "Food & Dining",
        "parent": null
    },
    {
        "id": 2,
        "name": "Household",
        "parent": null
    },
    {
        "id": 3,
        "name": "Personal care",
        "parent": null
    },
    {
        "id": 4,
        "name": "Automotive",
        "parent": null
    },
    {
        "id": 5,
        "name": "Entertainment",
        "parent": null
    },
    {
        "id": 6,
        "name": "Bill",
        "parent": null
    },
    {
        "id": 7,
        "name": "Saving/Investing",
        "parent": null
    },
    {
        "id": 8,
        "name": "Paycheck",
        "parent": null
    },
    {
        "id": 9,
        "name": "Payment",
        "parent": null
    }
];

let subcategories = [
    {
        "id": 10,
        "name": "Repairs",
        "parent": 4
    },
    {
        "id": 11,
        "name": "Parts",
        "parent": 4
    },
    {
        "id": 12,
        "name": "Insurance",
        "parent": 4
    },
    {
        "id": 13,
        "name": "Groceries",
        "parent": 6
    },
    {
        "id": 14,
        "name": "Insurance",
        "parent": 6
    },
    {
        "id": 15,
        "name": "Rent",
        "parent": 6
    },
    {
        "id": 16,
        "name": "Utilities",
        "parent": 6
    },
    {
        "id": 17,
        "name": "Internet",
        "parent": 6
    },
    {
        "id": 18,
        "name": "Healthcare",
        "parent": 6
    },
    {
        "id": 19,
        "name": "Gasoline",
        "parent": 6
    },
    {
        "id": 20,
        "name": "Phone",
        "parent": 6
    },
    {
        "id": 21,
        "name": "Tuition",
        "parent": 6
    },
    {
        "id": 22,
        "name": "Hobbies",
        "parent": 5
    },
    {
        "id": 23,
        "name": "Car stuff",
        "parent": 5
    },
    {
        "id": 24,
        "name": "Magic the gathering",
        "parent": 5
    },
    {
        "id": 25,
        "name": "Vacations",
        "parent": 5
    },
    {
        "id": 26,
        "name": "Nights out",
        "parent": 5
    },
    {
        "id": 27,
        "name": "Fast food",
        "parent": 1
    },
    {
        "id": 28,
        "name": "Drinks",
        "parent": 1
    },
    {
        "id": 29,
        "name": "Dining out",
        "parent": 1
    },
    {
        "id": 30,
        "name": "Kitchen",
        "parent": 2
    },
    {
        "id": 31,
        "name": "Auto",
        "parent": 2
    },
    {
        "id": 32,
        "name": "Yumi",
        "parent": 2
    },
    {
        "id": 33,
        "name": "Miscellaneous",
        "parent": 2
    },
    {
        "id": 34,
        "name": "Tools",
        "parent": 2
    },
    {
        "id": 35,
        "name": "Baby mama",
        "parent": 2
    },
    {
        "id": 36,
        "name": "Gifts",
        "parent": 2
    },
    {
        "id": 37,
        "name": "Baby",
        "parent": 2
    },
    {
        "id": 38,
        "name": "Transfer funds",
        "parent": 9
    },
    {
        "id": 39,
        "name": "Zelle",
        "parent": 9
    },
    {
        "id": 40,
        "name": "Credit card",
        "parent": 9
    },
    {
        "id": 41,
        "name": "Cashback rewards",
        "parent": 9
    },
    {
        "id": 42,
        "name": "Interest paid",
        "parent": 9
    },
    {
        "id": 43,
        "name": "Clothes",
        "parent": 3
    },
    {
        "id": 44,
        "name": "Skincare",
        "parent": 3
    },
    {
        "id": 45,
        "name": "Toiletries",
        "parent": 3
    },
    {
        "id": 46,
        "name": "Emergency fund",
        "parent": 7
    },
    {
        "id": 47,
        "name": "IRA",
        "parent": 7
    },
    {
        "id": 48,
        "name": "Upcoming expenses",
        "parent": 7
    },
    {
        "id": 49,
        "name": "Other",
        "parent": 7
    },
    {
        "id": 50,
        "name": "Brokerage",
        "parent": 7
    }
];

let type = document.getElementById('type')
let source = document.getElementById('source')
let destination = document.getElementById('destination');
let amount = document.getElementById('amount');
let date = document.getElementById('date');
let categoryObj = document.getElementById('category');
let subcategoryObj = document.getElementById('subcategory');
let description = document.getElementById('description');

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

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let transaction = {
        "id": 32,
        "description": description.value,
        "source": parseInt(source.value),
        "destination": parseInt(destination.value),
        "date": date.value,
        "amount": parseFloat(amount.value),
        "category": parseInt(categoryObj.value),
        "subcategory": parseInt(subcategoryObj.value),
        "type": type.value
    };

    console.log(JSON.stringify(transaction));

    (async () => {
        const data = await fetch("http://money-api.sudo/transaction", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(transaction),
            headers: {"Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const response = await data.json();
        console.log(response);
    })();
    
});