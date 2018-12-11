import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';



// second component
class Display extends Component{
  constructor(props){
    super(props);
    // create state for style
    this.state ={checked:false};

    this.handleChecked = this.handleChecked.bind(this);
  }
  
  handleChecked(e){

    if(this.state.checked === false){
      // this.setState({checked:false});
          this.setState({checked:true});

    }
    else{
    this.setState({checked:false});
    }

  }
  
  render(){
    return (
      <ul>
        <li>
          <input type="checkbox" onChange={this.handleChecked} />
          <span className={this.state.checked ?"checked":""}>{this.props.item}</span>
        </li>
      </ul>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {items:[] };
    
    this.handleSubmit = this.handleSubmit.bind(this);
      
//  make use of refs in getting user input
    this.inputItem= React.createRef();
    
  }
  
  handleSubmit(e){
    // prevent loading to the server
    e.preventDefault();

    // get user value
    let inputValue =this.inputItem.current.value;

    if(inputValue.trim().length > 0){
        // update the state 
        this.setState({items: this.state.items.concat(inputValue)});
        
        // reset value
        this.inputItem.current.value ="";
    }
    
  }  
    
  render() {
    let display = this.state.items.map(
      (item, index)=>{

      return (<Display item={item} index={index} />)
      }); 
    
    return (
      <div>
        <h2>Todo List</h2>

        <form onSubmit={this.handleSubmit}>
          <input type="text" className="todo_text" placeholder="Enter Items..." ref={this.inputItem} />
        
          <button className="btn-Add">Add</button>
        </form>

        <hr />
          {display}
       </div>
    ); 
  }
  
}
  

ReactDOM.render(<App />, document.getElementById('root'));