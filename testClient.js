(function () {

    console.log('test client');
    var socket = io('http://127.0.0.1:8081');

    socket.on('login', function (data) {
            console.log(data);
        }
    );

    socket.on('registration', function (data) {
            console.log(data);
        }
    );

    socket.on('message', function (data) {
            console.log(data);
        }
    );

    var unique = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    var user = {
        email: unique + '@gmail.com',
        username: unique,
        password: 'test'
    };

    document.getElementById('reg').addEventListener('click', function () {
        console.log('registration');
        socket.emit('registration', user);
    });


    document.getElementById('log').addEventListener('click', function () {
        console.log('login');
        user.password = md5(user.password);
        socket.emit('login', user);
    });
})();
