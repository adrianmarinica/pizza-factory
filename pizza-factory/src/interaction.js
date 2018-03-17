document.addEventListener('DOMContentLoaded', function () {
    function showPrice() {
        document.getElementById('price').innerHTML = '$' + order.getTotal();
    }

    document.querySelectorAll('.pizza-size').forEach(function (sizeElement) {
        sizeElement.addEventListener('click', function () {
            var name = sizeElement.getAttribute('data-pizza-size');

            document.querySelectorAll('.pizza-size').forEach(function (element) {
                element.classList.remove('selected');
            });

            if (!order.isSize(name)) {
                sizeElement.classList.add('selected');
            }

            order.toggleSize(name);
        });
    });

    document.querySelectorAll('.pizza-crust').forEach(function (crustElement) {
        crustElement.addEventListener('click', function () {
            var name = crustElement.getAttribute('data-pizza-crust');

            document.querySelectorAll('.pizza-crust').forEach(function (element) {
                element.classList.remove('selected');
            });

            if (!order.isCrust(name)) {
                crustElement.classList.add('selected');
            }

            order.toggleCrust(name);
        });
    });

    document.querySelectorAll('.pizza-ingredient').forEach(function (ingredientElement) {
        ingredientElement.addEventListener('click', function () {
            ingredientElement.classList.toggle('selected');
            order.toggleIngredient(ingredientElement.getAttribute('data-pizza-ingredient'));
            showPrice();
        });
    });

    document.querySelector('#order').addEventListener('click', function () {
        if (order.isValid()) {
            alert('Thank you for your order!');
            order.save();
            order.reset();

            document.querySelector('.pizza-size.selected').classList.remove('selected');
            document.querySelector('.pizza-crust.selected').classList.remove('selected');
            document.querySelectorAll('.pizza-ingredient').forEach(function (ingredientElement) {
                ingredientElement.classList.remove('selected');
            });

            showPrice();
        } else {
            alert('Please select a size, a type of crust and at least 3 ingredients.');
        }        
    });

    var storedPizza = order.loadConfigurationIfExists();

    if (storedPizza) {
        if (storedPizza.size != null) {
            document.querySelector('[data-pizza-size=' + storedPizza.size + ']').classList.add('selected');
        }

        if (storedPizza.crust != null) {
            document.querySelector('[data-pizza-crust=' + storedPizza.crust + ']').classList.add('selected');
        }

        for (var i in storedPizza.ingredients) {
            if (storedPizza.ingredients[i]) {
                document.querySelector('[data-pizza-ingredient=' + i + ']').classList.add('selected');
            }
        }
    }

    order.loadHistoryIfExists();
    showPrice();
});