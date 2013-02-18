function EventBus() {
    var subscribers = {};
    var types = [];

    this.fire = function(event) {
        subscribers[event.type].forEach(function(subscriber) {
            subscriber.respond(event);
        })
    }

    this.subscribe = function(subscriber, type) {
        if (! _.contains(types, type)) types.push(type);
        if (subscribers.type === undefined) subscribers[type] = [];
        subscribers[type].push(subscriber)
    }
}