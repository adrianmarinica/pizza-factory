var pizza = (function (window) {
    var configuration = {
        size: null,
        crust: null,
        created: null,
        ingredients: {
            salami: false,
            prosciutto: false,
            ham: false,
            pollo: false,
            mozzarella: false,
            parmesan: false,
            gorgonzola: false,
            tomatoes: false,
            onions: false,
            olives: false,
            corn: false
        }
    };

    function toggleSize(name) {
        var sizes = window.document.querySelectorAll('.pizza-size');

        sizes.forEach(function (sizeElement) {
            sizeElement.classList.remove('selected');
        });

        var sizeToSelect = window.document.querySelector('.pizza-size[data-pizza-size="' + name + '"]');
        sizeToSelect.classList.toggle('selected');

        if (sizeToSelect.classList.contains('selected')) {
            configuration.size = name;
        }
        storeConfiguration();
    }

    function toggleCrust(name) {
        var crusts = window.document.querySelectorAll('.pizza-crust');

        crusts.forEach(function (crustElement) {
            crustElement.classList.remove('selected');
        });

        var crustToSelect = window.document.querySelector('.pizza-crust[data-pizza-crust="' + name + '"]');
        crustToSelect.classList.toggle('selected');

        if (crustToSelect.classList.contains('selected')) {
            configuration.crust = name;
        }
        storeConfiguration();
    }

    function toggleIngredient(name) {
        var ingredientToSelect = window.document.querySelector('.pizza-ingredient[data-pizza-ingredient="' + name + '"]');
        ingredientToSelect.classList.toggle('selected');
        configuration.ingredients[name] = ingredientToSelect.classList.contains('selected');
        storeConfiguration();
    }

    function reset() {
        var sizes = window.document.querySelectorAll('.pizza-size');

        sizes.forEach(function (sizeElement) {
            sizeElement.classList.remove('selected');
        });

        var crusts = window.document.querySelectorAll('.pizza-crust');

        crusts.forEach(function (crustElement) {
            crustElement.classList.remove('selected');
        });

        var ingredients = window.document.querySelectorAll('.pizza-ingredient');

        ingredients.forEach(function (ingredientElement) {
            ingredientElement.classList.remove('selected');
        });

        configuration.size = null;
        configuration.crust = null;
        configuration.created = null;

        for (var i in configuration.ingredients) {
            configuration.ingredients[i] = false;
        }

        localStorage.removeItem('configuration');
    }

    function isValid() {
        var ingredientsLength = 0;
        for (var i in configuration.ingredients) {
            if (configuration.ingredients[i]) {
                ingredientsLength++;
            }
        }
        return configuration.size != null && configuration.crust != null && ingredientsLength >= 3;
    };

    function storeConfiguration() {
        localStorage['configuration'] = JSON.stringify(configuration);
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

            for(var i in configuration.ingredients) {
                if (configuration.ingredients[i]) {
                    toggleIngredient(i);
                }
            }
        }
    }

    function save() {
        // load pre-saved history or create a new array
        var existingHistory = typeof localStorage['history'] != 'undefined' ? JSON.parse(localStorage['history']) : [];
        configuration.created = new Date();

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

        // create new elements for the order
        var descriptionElement = window.document.createElement('span');
        descriptionElement.classList.add('left');

        var dateElement = window.document.createElement('span');
        dateElement.classList.add('right');

        var clearElement = window.document.createElement('div');
        clearElement.classList.add('clear');

        // set the inner HTML of the elements
        descriptionElement.innerHTML = order.size + ' pizza with a ' + order.crust + ' crust and a topping of: ' + ingredientsList + '.';
        dateElement.innerHTML = moment(order.created).fromNow();

        // add the elements to the list
        window.document.querySelector('#history').appendChild(descriptionElement);
        window.document.querySelector('#history').appendChild(dateElement);
        window.document.querySelector('#history').appendChild(clearElement);
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
        reset: reset,
        isValid: isValid,
        loadConfigurationIfExists: loadConfigurationIfExists,
        loadHistoryIfExists: loadHistoryIfExists,
        save: save
    }
})(window);