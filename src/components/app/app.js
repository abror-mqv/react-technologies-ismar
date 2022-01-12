import React, {Component} from 'react';
import AppHeader from '../app-header';
import SeachPanel from '../search-panel';
import PostStatusFilter from '../post-status';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import ModalWindow from '../modal-window';
import FetchData from '../../fetch-data';
import Loading from '../loading';
import ErrorMsg from '../errorMsg';
import './app.css';

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: [],
			searchValue: "",
			filter: "all",
			modalVisible: false,
			modal: [],
			loading: true,
			error: false
		}
		
		this.getAllData();
		this.onDelete = this.onDelete.bind(this);
		this.addItem = this.addItem.bind(this);
		this.onToggleImportant = this.onToggleImportant.bind(this);
		this.onToggleLike = this.onToggleLike.bind(this);
		this.onUpdateSearchPanel = this.onUpdateSearchPanel.bind(this);
		this.onUpdateFilter = this.onUpdateFilter.bind(this);
		this.savePost = this.savePost.bind(this)

		this.id = 4;

	}
	
	onDelete(id) {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);

			const before = data.slice(0, index);
			const after = data.slice(index + 1);

			const newData = [...before, ...after];

			return {
				data: newData
			}

			
		});
	}

	addItem(text){
		const newItem = {
			first_name:text,
			important: false,
			id:this.id++
		}

		this.setState(({data}) => {
			const newArr = [...data, newItem];

			return {
				data: newArr
			}
		})
	}

	onToggleImportant(id){
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);

			const before = data[index];
			const newLike = {...before, important: !before.important};

			const newData = [...data.slice(0, index), newLike, ...data.slice(index + 1)];

			return {
				data: newData
			}

			
		});
	}

	onToggleLike(id){
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);

			const before = data[index];
			const newLike = {...before, like: !before.like};

			const newData = [...data.slice(0, index), newLike, ...data.slice(index + 1)];

			return {
				data: newData
			}

			
		});
	}

	searchPost(items, searchValue){

		if(searchValue.length === 0){
			return items
		}

		return items.filter((item) => {
			return item.first_name.indexOf(searchValue) > -1
		});

	}
	
	onUpdateSearchPanel(value) {
		this.setState({
			searchValue: value
		})
	}

	filterPost(items, filter){
		if (filter === "like"){
			return items.filter(item => item.like)
		} else {
			return items
		}
	}

	onUpdateFilter(value) {
		this.setState({
			filter: value
		})
	}

	// Fetch-Data
	getdata = new FetchData();

	modalData = (data) => {
		
		this.setState({
			modal: data.data
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	onOpenWindow = async (id) => {

		this.setState({
			modalVisible: !this.state.modalVisible
		})

		const responce = await (await fetch(`http://localhost:3002/data/${id}`)).json()
		console.log(responce)

		if(!responce.id) {
			this.getdata.getPostById(id)
			.then(singleData => {
				console.log(singleData)
				this.savePost(singleData.data)
				this.modalData(singleData)
			})
			.catch(this.onError)
		}else {
			const responce = await (await fetch(`http://localhost:3002/data/${id}`, {
			})).json()
			console.log(responce)
			this.modalData({data: responce})
		}		
	}

	savePost = async data => {	
		console.log(data)
		fetch("http://localhost:3002/data", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data)
		})
	}

	onCloseWindow = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
			modal: []
		})
	}

	getAllData(){
		this.getdata.getAllpost()
		.then(alldata => {
			this.setState({
				data: alldata.data,
				loading: false
			})
		})
		.catch(this.onError);
	}
	
	
	render(){
		const {data, searchValue, filter, modalVisible, modal, loading, error} = this.state;

		const likes = data.filter(item => item.like).length;
		const searchPost = this.filterPost(this.searchPost(data, searchValue), filter);
		const allItems = searchPost.length;

		const errorMsg = error ? <ErrorMsg/> : null;
		const spinner = loading ? <Loading/> : null;
		const content = !(error || loading) ? <PostList posts={searchPost} onDelete={this.onDelete} onToggleImportant={this.onToggleImportant} onToggleLike={this.onToggleLike} onOpenWindow={this.onOpenWindow}/> : null;

		return (

			<div className="blockPanel">

				<AppHeader
					allPost={allItems}
					likes={likes}
				/>
				<div className="search-panel d-flex">
					<SeachPanel
						onUpdateSearchPanel={this.onUpdateSearchPanel}
					/>
					<PostStatusFilter
						filter={filter}
						onUpdateFilter={this.onUpdateFilter}
					/>
				</div>

				{errorMsg}
				{spinner}
				{content}

				<PostAddForm
					addItem={this.addItem}
				/>

				<ModalWindow 
					modalVisible={modalVisible}
					onCloseWindow={this.onCloseWindow}
					modalContent={modal}
				/>

			</div>
			
		)
	}
}