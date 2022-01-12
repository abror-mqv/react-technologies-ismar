import React, {Component} from 'react';
import './search-panel.css';

export default class SeachPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
        
        this.onSearchPost = this.onSearchPost.bind(this);
    }

    onSearchPost(e) {
        const value = e.target.value

        this.setState({
            text: value
        });

        this.props.onUpdateSearchPanel(value);
    }

    render(){
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Поиск записей"
                onChange={this.onSearchPost}
            />
        )
    }

}