function handler(request, success, error) {
    if (request.readyState == 4) {
        if (request.status < 300 && request.status >= 200) {
            success(request.responseText);
        } else {
            error(request.responseText);
        }
    }
};

function get(url, success, error) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        handler(request, success, error);
    }

    request.open('GET', url, true);

    request.send(null);
};

function post(url, body, success, error) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        handler(request, success, error);
    }

    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(body));
};

export default {
    get: get,
    post: post
};