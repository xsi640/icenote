import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as TagsActions from '../actions/tagsactions'
import './tags.scss'

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
        }
        this.onChange = this.onChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.props.list();
    }


    onChange(e) {
        let obj = null;
        let {dataSource} = this.props;
        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource[i]._id === e.target.value) {
                this.state.selectedIndex = i;
                obj = dataSource[i];
                break;
            }
        }
        this.props.onChange(e, obj);
    }

    refresh() {
        console.log('refresh')
        this.props.list();
    }

    render() {
        let {selectedIndex} = this.state;
        let {dataSource} = this.props;
        let list = [];
        for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
            let checked = i === selectedIndex;
            console.log(item._id)
            list.push(
                <div className="tag-item" key={item._id}>
                    <input type="radio" id={item._id} name="radios" value={item._id} onChange={this.onChange}
                           checked={checked}></input>
                    <label htmlFor={item._id}>
                        <div className="name">{item.text} ({item.count})</div>
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

Tags.propTypes = {
    onChanged: PropTypes.func,
}

Tags.defaultProps = {
    dataSource: []
}

const mapStateToProps = (state) => {
    return state.TagsReducer;
}

export default connect(mapStateToProps, TagsActions, null, {withRef: true})(Tags)