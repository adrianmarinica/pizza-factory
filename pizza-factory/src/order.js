var order = (function (window, pizza) {
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

        totalPrice = emptyPizzaPrice;

        localStorage.removeItem('configuration');
    }

    function isValid() {
        return pizza.getSize() != null && pizza.getCrust() != null && pizza.getNumberOfIngredients() >= 3;
    };

    function storeConfiguration() {
        localStorage['configuration'] = JSON.stringify(pizza.get());
    }

    function loadConfigurationIfExists() {
        if (typeof localStorage['configuration'] != 'undefined') {
            configuration = JSON.parse(localStorage['configuration']);

            if (configuration.size != null) {
                toggleSize(configuration.size);
            }

            if (configuration.crust != null) {
                toggleCrust(configuration.crust);
            }

            for (var i in configuration.ingredients) {
                if (configuration.ingredients[i]) {
                    toggleIngredient(i);
                }
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

        // add the current configuration to the page
        showOrder(configuration);

        // save the list of orders in localStorage
        localStorage['history'] = JSON.stringify(existingHistory);
    }

    function showOrder(order) {
        // compute comma-separated ingredient list
        var ingredientsList = '';
        for (var i in order.ingredients) {
            if (order.ingredients[i]) {
                ingredientsList += i + ', ';
            }
        }
        ingredientsList = ingredientsList.substr(0, ingredientsList.length - 2);

        var orderElement = window.document.createElement('div');
        orderElement.classList.add('order');

        // create new elements for the order
        var descriptionElement = window.document.createElement('span');
        descriptionElement.classList.add('left', 'order-summary');

        var dateElement = window.document.createElement('span');
        dateElement.classList.add('right', 'order-date');

        var clearElement = window.document.createElement('div');
        clearElement.classList.add('clear');

        // set the inner HTML of the elements
        descriptionElement.innerHTML = order.size + ' pizza with a ' + order.crust + ' crust and a topping of: ' + ingredientsList + ' - $' + order.price + '.';
        dateElement.innerHTML = moment(order.created).fromNow();

        // add the elements to the list
        orderElement.appendChild(descriptionElement);
        orderElement.appendChild(dateElement);
        orderElement.appendChild(clearElement);

        window.document.querySelector('#history').appendChild(orderElement);
    }

    function getTotal() {
        return emptyPizzaPrice + pizza.getIngredientsPrice();
    }

    function loadHistoryIfExists() {
        if (typeof localStorage['history'] != 'undefined') {
            var history = JSON.parse(localStorage['history']);
            for (var i = 0; i < history.length; i++) {
                showOrder(history[i]);
            }
        }
    }

    return {
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
    }
})(window, pizza);