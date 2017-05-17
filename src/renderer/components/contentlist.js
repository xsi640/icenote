import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './contentlist.scss'

export default class ContentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let {dataSource} = this.props;
        let obj = null;
        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource['_id'] === e.target.value) {
                this.state.selectedIndex = i;
                obj = dataSource[i];
                break;
            }
        }
        this.props.onSelect(e, obj);
    }

    render() {
        let {selectedIndex} = this.state;
        let {dataSource} = this.props;
        let list = [];
        for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
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
    dataSource: PropTypes.array,
    onSelect: PropTypes.func
}

ContentList.defaultProps = {
    dataSource: [],
}