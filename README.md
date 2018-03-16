# Module 1:
*A pizza only becomes a pizza if the baker knows a size, a crust type and at least 3 ingredients.*
* Whenever the ORDER NOW button is pressed, before confirming the order, check if the configuration is valid

\* solved here: https://github.com/adrianmarinica/pizza-factory/tree/m1
# Module 2:
*If the page is refreshed or the tab is closed while configuring a pizza, make it so that when the page is loaded, the configuration is restored.*

* Every time a change is made to the active configuration, save it in local storage
* When the application is opened, check for a saved configuration and apply it
* When the order is dispatched, clear the saved configuration

\* solved here: https://github.com/adrianmarinica/pizza-factory/tree/m2
# Module 3:
*Whenever a pizza order is sent, make it visible in the application. Save the history even after the page is refreshed or the tab is closed.*

* When ordering a pizza, add the order details to a list in localStorage
* When the application is opened, check for a saved list and show it

\* solved here: https://github.com/adrianmarinica/pizza-factory/tree/m3
# Module 4:
*For every order in the list, also show when it was added (e.g. two minutes ago, three hours ago).*

* Save the date with every order submitted
* Using an external library (moment.js), show the relative adding time

\* solved here: https://github.com/adrianmarinica/pizza-factory/tree/m4
# Module 5:
*Every time an order is placed, the customer should be aware of the final cost of the pizza they configured.*

+ Set a default price for an empty pizza (e.g. $5)
+ Have a live price label when configuring a pizza
   - each ingredient has a price
   - when you select an ingredient, the live price increases
   - when you deselect an ingredient, the live price decreases
+ Store the final price in the order history list

\* solved here: https://github.com/adrianmarinica/pizza-factory/tree/m5