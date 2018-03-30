import Pizza from './pizza';
import interaction from './interaction';
import inventory from './inventory';


var pizza = new Pizza();
var emptyPizzaPrice = 5;


function toggleSize(name) {
    if (pizza.getSize() == null || pizza.getSize() != name) {
        pizza.setSize(name);
    } else {
        pizza.setSize(null);
    }

    storeConfiguration();
}

function isSize(name) {
    return pizza.getSize() == name;
}

function toggleCrust(name) {
    if (pizza.getCrust() == null || pizza.getCrust() != name) {
        pizza.setCrust(name);
    } else {
        pizza.setCrust(null);
    }

    storeConfiguration();
}

function isCrust(name) {
    return pizza.getCrust() == name;
}

function toggleIngredient(name) {
    pizza.setIngredient(name, !pizza.getIngredient(name));
    storeConfiguration();
}

function reset() {
    pizza.setSize(null);
    pizza.setCrust(null);
    pizza.removeAllIngredients();
    localStorage.removeItem('configuration');
}

function isValid() {
    let errors = [];
    if (pizza.getSize() == null) {
        errors.push("size not selected");
    }
    if (pizza.getCrust() == null) {
        errors.push("crust not selected");
    }
    if (pizza.getNumberOfIngredients() < 3) {
        errors.push("at least 3 ingredients should be selected");
    }
    var stockResult = inventory.isValid(pizza);
    errors = errors.concat(stockResult);
    return errors;
};

function storeConfiguration() {
    localStorage['configuration'] = JSON.stringify(pizza.get());
}

function loadConfigurationIfExists() {
    if (typeof localStorage['configuration'] != 'undefined') {

        var configuration = JSON.parse(localStorage['configuration']);
        if (configuration) {
            pizza = new Pizza(configuration);
        }
        return pizza.get();
    }
    return null;
}

function save() {
    // load pre-saved history or create a new array
    var existingHistory = typeof localStorage['history'] != 'undefined' ? JSON.parse(localStorage['history']) : [];

    var configuration = pizza.get();
    configuration.created = new Date();
    configuration.price = emptyPizzaPrice + pizza.getIngredientsPrice();

    // add the current configuration to the in-memory list
    existingHistory.push(configuration);


    // save the list of orders in localStorage
    localStorage['history'] = JSON.stringify(existingHistory);

    // add the current configuration to the page
    interaction.showOrder(configuration);

    inventory.removeFromStock(configuration);
    // showOrder(configuration);
}


function getTotal() {
    return emptyPizzaPrice + pizza.getIngredientsPrice();
}

function loadHistoryIfExists() {
    if (typeof localStorage['history'] != 'undefined') {
        var history = JSON.parse(localStorage['history']);
        inventory.load(history);
        return history;
    }
    return [];
}

export default {
    toggleSize: toggleSize,
    toggleCrust: toggleCrust,
    toggleIngredient: toggleIngredient,
    isSize: isSize,
    isCrust: isCrust,
    reset: reset,
    isValid: isValid,
    loadConfigurationIfExists: loadConfigurationIfExists,
    loadHistoryIfExists: loadHistoryIfExists,
    save: save,
    getTotal: getTotal
};