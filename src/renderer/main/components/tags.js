import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppContext from '../context/appcontext'
import _ from 'underscore'
import './tags.scss'

export default class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedIndex: -1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    componentDidMount() {
        AppContext.loadTags(() => {
            if (!_.isUndefined(AppContext.TagList))
                this.setState({dataSource: AppContext.TagList})
        })

        AppContext.onTagListChanged(() => {
            if (!_.isUndefined(AppContext.TagList))
                this.setState({dataSource: AppContext.TagList})
        })
    }

    setSelectedIndex(index) {
        this.setState({selectedIndex: index})
    }

    handleChange(e) {
        let obj = null;
        let {dataSource} = this.state;
        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource[i]._id === e.target.value) {
                this.setState({selectedIndex: i})
                obj = dataSource[i];
                break;
            }
        }
        this.props.onSelected(e, obj);
    }

    render() {
        let {selectedIndex} = this.state;
        let {dataSource} = this.state;
        let list = [];
        if (!_.isUndefined(dataSource)) {
            for (let i = 0; i < dataSource.length; i++) {
                let item = dataSource[i];
                let checked = i === selectedIndex;
                list.push(
                    <div className="tag-item" key={item._id}>
                        <input type="radio" id={item._id} name="radios" value={item._id} onChange={this.handleChange}
                               checked={checked}></input>
                        <label htmlFor={item._id}>
                            <div className="name">{item.text} ({item.count})</div>
                        </label>
                    </div>
                )
            }
        }

        return (
            <div className="tag-list">
                {list}
            </div>
        )
    }
}

Tags.PropTypes = {
    onSelected: PropTypes.func,
    setSelectedIndex: PropTypes.func,
}