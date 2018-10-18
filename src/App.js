import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import {NativeModules} from 'react-native';
//import imageSearch from "react-native-google-image-search";

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			currentTodo: '',
			todos: [],
			argument: '',
			parole: ["maserati","astuccio","banana","lenovo","materasso","balcone","aereo","lego"],
			imgs: ["immagini/maserati.jpg","/immagini/astuccio.jpg","/immagini/banana.jpg","/immagini/lenovo.jpg","/immagini/materasso.jpg","/immagini/balcone.jpg","/immagini/aereo.jpg","/immagini/lego.jpg","/immagini/not found.jpg"],
			immagine: [],
			buttonClicked: false,
			searchBar: false
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmitText = this.onSubmitText.bind(this);
		this.ottieniLink=this.ottieniLink.bind(this);
		this.onLink=this.onLink.bind(this);
		this.onSubmitArgument = this.onSubmitArgument.bind(this);
	}
	
	onChange(event) {
		this.setState({ currentTodo: event.target.value });
	  }
	  onSubmitText(event) {
		event.preventDefault();
		this.setState({
		  currentTodo: '',
		  todos: [...this.state.todos, this.state.currentTodo],
		});
	  }
	  
	  ottieniLink = (event) => {
		this.setState({buttonClicked:true});
	  }
	  renderForm = () => {
		  if(this.state.buttonClicked)
			  document.getElementById("form1").style.display="block";
	  }
	  onLink (event){
		var elem=event.target.value;
		var k=false;
		var url=[];
		var res,conta=0;
		for(var i=0;i<8;i++){
			res= this.state.parole[i].substring(0,elem.length);
			if(res===elem){
				url[conta]=this.state.imgs[i];
				console.log("true");
				conta++;
				k=true;
			}
		}
		if(!k)
			url=this.state.imgs[8];
		document.getElementById("visualizzaImg").style.display="block";
		this.setState({ argument: event.target.value });
		this.setState({immagine: url})
	  }
	  
	  cercaBarra= (event)=>{
		  this.setState({ searchBar: true });
	  }
	  
	  displaySearchBar= ()=>{
			if(this.state.searchBar){
				document.getElementById("search").style.display="block";
			}
	  }
	  aggiorna = ()=>{
		  for(var i=0;i<this.state.immagine.length;i++){
				document.getElementById(""+i).src=this.state.immagine[i];
				document.getElementById(""+i).style.display="block";
		  }
		  
	  }

	  onSubmitArgument= (event)=>{
			event.preventDefault();
			var k=false;
			var url="none";
			var res,conta=0;
			for(var i=0;i<8;i++){
				res= this.state.parole[i].substring(0,this.state.argument.length)
				if(res===this.state.argument){
					url[conta]=this.state.imgs[i];
					conta++;
					k=true;
				}
			}
			if(!k)
				url=this.state.imgs[8];
			document.getElementById("visualizzaImg").style.display="block";
			this.setState({immagine: url});
	  }
	  
	  render() {
		return (
		  <div id="root">
			<form onSubmit={this.onSubmitText} className="form" name="form">
			  <input value={this.state.currentTodo} type="text" onChange={this.onChange}/>
			  <button>Submit</button>
			</form>
			<div className="lista">
				<ol>
					{
					  this.state.todos.map((todo, index) => <li onClick={(event,index)=>{
						  this.state.todos.splice(index,1);
						  this.setState({todos: this.state.todos});}
						} key={index}>{todo}</li>)
					}
				</ol>
			</div>
			<button id="buttonImg" onClick={this.ottieniLink} >Giochino Magazzino</button>
			{
				this.renderForm()
			}
			<form id="form1" onSubmit={this.onSubmitArgument}>
				<input type="text" onChange={this.onLink}></input>
				<button>Invia</button>
			</form>
			<div id="visualizzaImg">
				<img className="immagine" id="0"></img>
				<img className="immagine" id="1"></img>
				<img className="immagine" id="2"></img>
				<img className="immagine" id="3"></img>
				<img className="immagine" id="4"></img>
				<img className="immagine" id="5"></img>
				<img className="immagine" id="6"></img>
				<img className="immagine" id="7"></img>
			{
				this.aggiorna()
			}
			</div>
			<button id="buttonSearch" onClick={this.cercaBarra}>Display Search Bar</button>
			{
				this.displaySearchBar()
			}
			<div id="search">
				<iframe src="https://cse.google.com/cse?cx=012092573928844433338:71v1aoluof0"></iframe>
			</div>
		  </div>
		);
	  }
}

export default App;
