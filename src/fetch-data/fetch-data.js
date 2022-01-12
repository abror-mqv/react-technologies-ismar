export default class FetchData {

	constructor() {
		this._urlBase = "https://reqres.in/api";
	}

	async fetchData(url) {
		
		const res = await fetch(`${this._urlBase}${url}`);
	
		if(!res.ok){
			throw new Error(`Ссылка сломанная ${url}, статус ${res.status}`);
		}

		const json = await res.json()
	
		return json;
	}

	getAllpost() {
		return this.fetchData('/users?page=1');
	}
	
	getPostById(id) {
		return this.fetchData(`/users/${id}`);
	}

}

// const get = new getData();

// get.getAllpost()
// 	.then((res) => {
// 		res.forEach( item => console.log(item.title));
// 	});

// get.getPostById(10)
// .then((res) => console.log(res))