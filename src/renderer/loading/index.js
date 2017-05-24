import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ReactLoaders from './react-loaders'
import './index.scss'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="tips">
                    Please wait...loading...
                </div>
                <div className="react-loaders">
                    <ReactLoaders type="pacman"/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))