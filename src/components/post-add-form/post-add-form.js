import React, {Component} from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: ''
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeValue(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {

        e.preventDefault();
        this.props.addItem(this.state.text);
        this.setState({
            text: ''
        })
    }
    
    render(){
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
    
                <input
                    type="text"
                    placeholder="Введите мысль."
                    className="form-control new-post-label"
                    onChange={this.onChangeValue}
                    value={this.state.text}
                />
    
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    >
                    Добавить
                </button>
    
            </form>
        )
    }

    
}