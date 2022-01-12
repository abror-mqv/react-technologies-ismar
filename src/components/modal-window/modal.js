import React, {Component} from 'react';
import Loading from '../loading';
import './style.css';

export default class ModalWindow extends Component {
	
	render() {

		const {modalVisible, onCloseWindow, modalContent, modalContent:{email, first_name, last_name, avatar}} = this.props;
		let content, body;
		// console.log(modalContent);

		if(modalContent.length !== 0){
			body = <Content first_name={first_name} last_name={last_name} onCloseWindow={onCloseWindow} avatar={avatar} email={email}/>
		} else {
			body = <Loading/>
		}


		if(modalVisible){
			content = <div className="modal">
						<div className="modal-dialog">
							{body}
						</div>
					</div>
		} else {
			content = null
		}

		return (content);
	}
}

const Content = ({first_name, last_name, onCloseWindow, avatar, email}) => {
	

	React.useEffect(() => {
        const params = window.location.pathname
        let id = params.substring(1);
        if(id === ""){
			onCloseWindow()
        }else{}   
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])

	return(
		<>
			<div className="modal-header">
					<h3 className="modal-title">{first_name} {last_name}</h3>
					<span className="modal-close" onClick={onCloseWindow}>×</span>
				</div>
				<div className="modal-body">
					<div className="modal-content">
						<img src={avatar} alt={first_name} width="150" height="150"/>
						<p>{first_name} {last_name}</p>
						<p><a href={"mailto:" + email}>{email}</a></p>
					</div>
				</div>
				<div className="modal-footer">
					<button onClick={onCloseWindow}>Закрыть</button>
			</div>
		</>
	)
}