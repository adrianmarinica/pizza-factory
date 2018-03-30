export default function pizza(config) {
    var prices = {
        salami: 2,
        prosciutto: 5,
        ham: 4,
        pollo: 3,
        mozzarella: 2,
        parmesan: 3,
        gorgonzola: 5,
        tomatoes: 1,
        onions: 1,
        olives: 2,
        corn: 2
    }

    var configuration = config || {
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

    function get() {
        return configuration;
    }

    function setSize(size) {
        configuration.size = size;
    }

    function getSize() {
        return configuration.size;
    }

    function setCrust(crust) {
        configuration.crust = crust;
    }

    function getCrust() {
        return configuration.crust;
    }

    function setIngredient(name, value) {
        configuration.ingredients[name] = value;
    }

    function getIngredient(name) {
        return configuration.ingredients[name];
    }

    function getIngredientsPrice() {
        var price = 0;

        for (var i in configuration.ingredients) {
            if (configuration.ingredients[i])
                price += prices[i];
        }

        return price;
    }

    function removeAllIngredients() {
        for (var i in configuration.ingredients) {
            configuration.ingredients[i] = false;
        }
    }

    function getNumberOfIngredients() {
        var count = 0;
        for (var i in configuration.ingredients) {
            if (configuration.ingredients[i]) {
                count++;
            }
        }
        return count;
    }

    return {
        get: get,
        setSize: setSize,
        getSize: getSize,
        setCrust: setCrust,
        getCrust: getCrust,
        setIngredient: setIngredient,
        getIngredient: getIngredient,
        removeAllIngredients: removeAllIngredients,
        getIngredientsPrice: getIngredientsPrice,
        getNumberOfIngredients: getNumberOfIngredients
    }
};