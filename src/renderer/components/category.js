import React, {Component} from 'react'

export default class Category extends Component {
    render() {
        return (
            <div className="category">
                {this.props.icon ? <img src={this.props.icon} className="icon"/> : null}
                {this.props.name}
            </div>
        );
    }
}