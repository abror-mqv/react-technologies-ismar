import React, {Component} from 'react';
import './post-list-item.css';

export default class PostListItem extends Component {

	render() {

		const {avatar, first_name, last_name, onOpenWindow, onDelete, onToggleImportant, onToggleLike, important, like} = this.props;

		let classNames = "app-list-item d-flex justify-content-between";
		if (important) {
			classNames += " important";
		}
		
		if (like) {
			classNames += " like";
		}
		

		return (
			<div className={classNames}>
				<img src={avatar} alt="img" width="50" height="50"></img>
				<span className="app-list-item-label" onClick={onToggleLike}>
					{first_name} {last_name}
				</span>
				<div className="d-flex justify-content-center align-items-center">
					<button className="btn-star btn-sm" onClick={onToggleImportant}>
						<i className="fa fa-star"></i>
					</button>
					<button className="btn-trash btn-sm" onClick={onDelete}>
						<i className="far fa-trash-alt"></i>
					</button>
					<button className="btn-trash btn-sm" onClick={onOpenWindow}>
						<i className="fas fa-arrow-right"></i>
					</button>
					<i className="fa fa-heart"></i>
				</div>
			</div>
		)

	}

}