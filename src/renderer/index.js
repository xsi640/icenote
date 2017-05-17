import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Main from './containers/main'
import reducers from './reducers/'

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const {logger} = require(`redux-logger`);
    middlewares.push(logger);
}
middlewares.push(thunk)

const store = createStore(reducers, applyMiddleware(...middlewares));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))