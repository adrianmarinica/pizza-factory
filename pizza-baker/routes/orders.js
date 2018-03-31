var express = require('express');
var uuidv1 = require('uuid/v1');

var storage = require('node-persist');

var router = express.Router();

/* GET orders by ID. */
router.get('/:id', function (req, res, next) {
    var orders = storage.getItemSync('orders');

    if (typeof orders != 'undefined') {
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].id == req.params.id) {
                res.status(200).send(JSON.stringify(orders[i]));
                return;
            }
        }
    }

    res.status(404).send('Not found');
});

/* GET all orders. */
router.get('/', function (req, res, next) {
    var orders = storage.getItemSync('orders');
    if (typeof orders != 'undefined') {
        res.status(200).send(JSON.stringify(orders));
    } else {
        res.status(204).send('');
    }
});

/* Add order. */
router.post('/', function (req, res, next) {
    var orders = storage.getItemSync('orders');
    if (typeof orders == 'undefined') {
        orders = [];
    }

    var newOrder = req.body;
    newOrder.id = uuidv1();
    newOrder.time = 60;

    orders.push(newOrder);

    storage.setItemSync('orders', orders);
    res.status(200).send(JSON.stringify(newOrder))
});

/* DELETE all orders. */
router.delete('/', function (req, res, next) {
    storage.removeItemSync('orders');
    res.status(204).send();
});

module.exports = router;
