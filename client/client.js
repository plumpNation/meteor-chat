// Template.<templateName>.<templateVariable>
Template.messages.messages = function () {
    // find( query, options );
    return Messages.find({}, { 'sort': { 'time': +1 } });;
};

Template.messages.rendered = function () {
    // No matter how many messages, stay at the bottom to see the input
    if (document.body.scrollHeight > window.innerHeight) {
        window.scrollTo(0, document.body.offsetHeight);
    }
};

Meteor.subscribe("messages");

var ENTER_KEY = 13,

    userColorCache = {},

    getRandomColor = function () {
        return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
    },

    getUserColor = function (username) {
        return userColorCache[username] || (function (username) {
            userColorCache[username] = getRandomColor();
            return userColorCache[username];
        }(username));
    };

Template.input.events = {
    'keydown #message': function (e) {
        var name,
            message;

        if (event.which === ENTER_KEY) {
            name = Meteor.user() ?
                Meteor.user().profile.name :
                'John Doe';

            message = document.getElementById('message');

            if (message.value) {
                Messages.insert({
                    'name': name,
                    'message': message.value,
                    'time': Date.now(),
                    'color': getUserColor(name)
                });
            }

            message.value = '';
        }
    }
};
