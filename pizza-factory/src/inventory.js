var stock = {
    ingredients: {
        salami: 30,
        prosciutto: 50,
        ham: 30,
        pollo: 30,
        mozzarella: 3,
        parmesan: 30,
        gorgonzola: 30,
        tomatoes: 30,
        onions: 40,
        olives: 40,
        corn: 40
    }
}

function removeFromStock(order) {
    for (var ingredient in order.ingredients) {
        if (order.ingredients.hasOwnProperty(ingredient) && order.ingredients[ingredient]) {
            stock.ingredients[ingredient]--;
        }
    }
}


function load(orderHistory) {
    (orderHistory || []).forEach(removeFromStock);
};

function get() {
    return stock;
};

function isValid(pizza) {
    let errors = [];
    Object.keys(stock.ingredients).forEach(ingredient => {
        let hasIngredient = pizza.getIngredient(ingredient);
        if (hasIngredient && stock.ingredients[ingredient] < 1) {
            errors.push(`ingredient ${ingredient} is out of stock`);
        };
    })

    return errors;
}

export default {
    load: load,
    get: get,
    isValid: isValid
}