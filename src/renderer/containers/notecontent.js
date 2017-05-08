import React, {Component} from 'react'
import SplitPane from 'react-split-pane'

export default class NoteContent extends Component {
    render() {
        return (
            <SplitPane split="vertical" minSize={270} defaultSize={300}>
                <div className="nb_list">
                </div>
                <div className="nb_content"></div>
            </SplitPane>
        );
    }
}