import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './notelist.scss'

const dataSource = [{
    id: 1,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 2,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 3,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 4,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 5,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 6,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 7,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 8,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 9,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 10,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 11,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 12,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 13,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}, {
    id: 14,
    title: '萨大大缩短',
    summary: '萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog萨大大滴哦计算方式苏打撒旦平奥克破发颇感开放度高pod个富婆功夫派哦商品房共商品房共披散的加工费isgfijs欧兜水培公司fog ',
    isCheck: false
}]


export default class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: dataSource,
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
            <div className="radio-toolbar">
                {list}
            </div>
        )
    }
}

NoteList.PropTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func
}