import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './tags.scss'

export default class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedIndex: -1,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        let obj = null;
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.data['id'] === e.target.value){
                this.state.selectedIndex = i;
                obj = this.state.data[i];
                break;
            }
        }
        this.props.onChange(e, obj);
    }

    render() {
        let {data, selectedIndex} = this.state;
        let list = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let checked = i === selectedIndex;
            list.push(
                <div className="tag-item" key={item.id}>
                    <input type="radio" id={item.id} name="radios" value={item.id} onChange={this.onChange}
                           checked={checked}></input>
                    <label htmlFor={item.id}>
                        <div className="name">{item.name}</div>
                    </label>
                </div>
            )
        }

        return (
            <div className="tag-list">
                {list}
            </div>
        )
    }
}

Tag.PropTypes = {
    data: PropTypes.array,
    onChanged: PropTypes.func,
}
