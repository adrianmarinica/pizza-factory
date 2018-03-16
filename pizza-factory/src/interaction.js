document.addEventListener('DOMContentLoaded', function () {
    function showPrice() {
        document.getElementById('price').innerHTML = '$' + pizza.getPrice();
    }

    document.querySelectorAll('.pizza-size').forEach(function (sizeElement) {
        sizeElement.addEventListener('click', function () {
            pizza.toggleSize(sizeElement.getAttribute('data-pizza-size'));
        });
    });

    document.querySelectorAll('.pizza-crust').forEach(function (crustElement) {
        crustElement.addEventListener('click', function () {
            pizza.toggleCrust(crustElement.getAttribute('data-pizza-crust'));
        });
    });

    document.querySelectorAll('.pizza-ingredient').forEach(function (ingredientElement) {
        ingredientElement.addEventListener('click', function () {
            pizza.toggleIngredient(ingredientElement.getAttribute('data-pizza-ingredient'));
            showPrice();
        });
    });

    document.querySelector('#order').addEventListener('click', function () {
        if (pizza.isValid()) {
            alert('Thank you for your order!');
            pizza.save();
            pizza.reset();
            showPrice();
        } else {
            alert('Please select a size, a type of crust and at least 3 ingredients.');
        }        
    });

    pizza.loadConfigurationIfExists();
    pizza.loadHistoryIfExists();
    showPrice();
});