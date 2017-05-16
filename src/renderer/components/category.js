import React, {Component} from 'react'
import PropTypes from 'prop-types';

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

Category.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
}