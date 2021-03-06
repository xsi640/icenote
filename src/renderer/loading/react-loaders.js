import React, {Component} from 'react'
import 'loaders.css/loaders.css';

var LoaderTypes = {
    "ball-pulse": 3,
    "ball-grid-pulse": 9,
    "ball-clip-rotate": 1,
    "ball-clip-rotate-pulse": 2,
    "square-spin": 1,
    "ball-clip-rotate-multiple": 2,
    "ball-pulse-rise": 5,
    "ball-rotate": 1,
    "cube-transition": 2,
    "ball-zig-zag": 2,
    "ball-zig-zag-deflect": 2,
    "ball-triangle-path": 3,
    "ball-scale": 1,
    "line-scale": 5,
    "line-scale-party": 4,
    "ball-scale-multiple": 3,
    "ball-pulse-sync": 3,
    "ball-beat": 3,
    "line-scale-pulse-out": 5,
    "line-scale-pulse-out-rapid": 5,
    "ball-scale-ripple": 1,
    "ball-scale-ripple-multiple": 3,
    "ball-spin-fade-loader": 8,
    "line-spin-fade-loader": 8,
    "triangle-skew-spin": 1,
    "pacman": 5,
    "ball-grid-beat": 9,
    "semi-circle-spin": 1
};

export default class ReactLoaders extends Component {
    renderInnerDivs() {
        var divs = Array.apply(null, Array(LoaderTypes[this.props.type]));
        return divs.map(() => {
            return <div></div>;
        });
    }

    render() {
        var cssClass = "loader-inner " + this.props.type;
        return (
            <div className={cssClass}>
                {this.renderInnerDivs()}
            </div>
        )
    }
}