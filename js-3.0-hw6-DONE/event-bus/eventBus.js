// реализовывал самостоятельно, на основаниии статей
// после реализации сравнил, в принципе было очень схоже


class EventBus {
    constructor() {
        this.listenersContainer = {};
    }

    // check input parameters will have expected type
    validate(parameter1, parameter2, expectedType1, expectedType2) {
        if (typeof (parameter1) !== expectedType1 || typeof (parameter2) !== expectedType2) {
            // throw new Error('Bad input parameters');
            throw new TypeError('Bad input parameters');
        }
        return true;
    }

    on(eventName, listener) {
        this.validate(
            eventName,
            listener,
            "string",
            "function");


        if (
            !this.listenersContainer[eventName] ||
            this.listenersContainer[eventName].length < 1)
        {
            this.listenersContainer[eventName] = [];
        }

        this.listenersContainer[eventName].push(listener);
    }

    emit(eventName, data) {
        this.validate(
            eventName,
            data,
            "string",
            "object");

        if (
            !this.listenersContainer[eventName] ||
            this.listenersContainer.length < 1)
        {

            return false;
        }

        this.listenersContainer[eventName].forEach( (listener) => {
            listener(data);
        })
    }

    removeListener(eventName) {
        if (
            !this.listenersContainer[eventName] ||
            this.listenersContainer[eventName].length < 1) {
            return false
        }


        // delete listener by event name
        delete this.listenersContainer[eventName];
    };

}



const eventBus = new EventBus();

try {
    eventBus.on('stateUpdated', (state) => {
        console.log('first state listener'); // first state listener
        console.log(state); // { newState: 'is here' }
    });
    eventBus.on('stateUpdated', (state) => {
        console.log('second state listener'); // first state listener
        console.log(state); // { newState: 'is here' }
    });
    eventBus.on('stateUpdated', (state) => {
        console.log('third state listener'); // first state listener
        console.log(state); // { newState: 'is here' }
    });
    eventBus.on('requestFulfilled', (data) => {
        console.log('first request listener'); // first request listener
        console.log(data); // { request: 'data' }
    });
    eventBus.on('requestFulfilled', (data) => {
        console.log('second request listener'); // first request listener
        console.log(data); // { request: 'data' }
    });
    eventBus.on('requestFulfilled', (data) => {
        console.log('third request listener'); // first request listener
        console.log(data); // { request: 'data' }
    });
    eventBus.on('toRemove', (data) => {
        console.log('will be removed'); // first request listener
        console.log(data); // { request: 'data' }
    });
    eventBus.removeListener("toRemove");

    eventBus.on('foo', () => {
        console.log("this message won't be shown");
    });

    // Uncomment this to get 'TypeError: bad input parameters
    //eventBus.on('foo', "Now we get error");

    try {
        eventBus.emit('stateUpdated', { newState: 'is here' });
        eventBus.emit('requestFulfilled', { request: 'data' });
        eventBus.emit('bar', { foo: 'bar' });
        eventBus.emit('toRemove', {data: "some data"});

        // Uncomment this to get 'TypeError: bad input parameters
        //eventBus.emit(123, 123);
    } catch (e) {
        console.log(e.name)
        console.log(e.message);
    }

} catch (e) {
    console.log(e.name)
    console.log(e.message);
}

module.exports = {EventBus};
