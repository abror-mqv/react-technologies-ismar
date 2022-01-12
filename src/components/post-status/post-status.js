import React, {Component} from 'react';
import './post-satus.css';


export default class PostStatusFilter extends Component{
    constructor(props){
        super(props);
        this.button = [
            {
                name: "all", label:"Все"  
            },
            {
                name: "like", label:"Понравившиеся"  
            }
        ]
    }

    render(){

        const btns = this.button.map(({name, label}) => {
            const {filter, onUpdateFilter} = this.props;
            
            const active = filter === name;
            const activeClass = active ? 'btn-all btn-info' : 'btn-outline-secondary';

            return (
                <button key={name} type="button" className={`btn ${activeClass}`} onClick={()=>onUpdateFilter(name)}>{label}</button>
            )
        });

        return (
            <div className="btn-group">
                {btns}
            </div>
        )
    }

}