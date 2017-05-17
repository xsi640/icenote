import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './contentlist.scss'

export default class ContentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedIndex: 0,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
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
                <div className="note-item" key={item.id}>
                    <input type="radio" id={item.id} name="radios" value={item.id} onChange={this.onChange}
                           checked={checked}></input>
                    <label htmlFor={item.id}>
                        <div className="title">{item.title}</div>
                        <div className="summary">{item.summary}</div>
                    </label>
                </div>
            )
        }

        return (
            <div className="note-list">
                {list}
            </div>
        )
    }
}

ContentList.PropTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func
}