import React from "react";
import {getReq,urls} from "../lib/request";
import Button from '@material-ui/core/Button';

export default class Parrot extends React.Component {

  constructor(props){
    super(props);
    this.state = {payload:null,
                  status:"waiting"};
    this.get_commands();
  }

  perform_commands(id){
    getReq(urls.perform_command+id+"/perform/",this.props.token)
    .then((res)=>{
      console.log(res.status);
      if(res.status!=200){
        this.props.logoutHandler();
      }
    })
  }

  get_commands(){
    getReq(urls.parrot_command,this.props.token)
    .then((val)=>{
      if(val.status == 200){
        val.json().then((json_data)=>{
          this.setState({payload:json_data,
                        status:"fullfiled"});
        });
      }
      else{
        this.props.logoutHandler();
      }
    });
  }

  render() {
    const classes = styles(this.props.theme);
    if (this.state.status=="waiting"){
      return (
        <div>
          <h2> Wait for loading commands </h2>
        </div>
      );
    }
    else if(this.state.status=="fullfiled"){
      const PS1_buttons = this.state.payload["Parrot Senario 1"].map( x => {
         return (<Button variant="contained" color="primary" style={classes.button} key={x.id} onClick={()=>{this.perform_commands(x.id)}}>{x.name}</Button>);
      });
      const PS2_buttons = this.state.payload["Parrot Senario 2"].map( x => {
         return(<Button variant="contained" color="primary" style={classes.button} key={x.id} onClick={()=>{this.perform_commands(x.id)}}>{x.name}</Button>);
      });
      const PM_buttons = this.state.payload["Parrot Movment"].map( x => {
         return(<Button variant="contained" color="primary" style={classes.button} key={x.id} onClick={()=>{this.perform_commands(x.id);}}>{x.name}</Button>);
      });
      console.log(PS1_buttons);
      return(
        <div>
          <h1 style={classes.h1}> Parrot </h1>
          <div style={classes.innerDiv}>
            <h3> senario 1 </h3>
            <div style={classes.div}>
              {PS1_buttons}
            </div>
            <h3> senario 2 </h3>
            <div style={classes.div}>
            {PS2_buttons}
            </div>
            <h3> movment </h3>
            <div style={classes.div}>
            {PM_buttons}
            </div>
          </div>
        </div>
      );
    }
  }
}

const styles = theme => {
  return({
    div: {
      maxWidth : '450px',
    },
    innerDiv:{
      marginLeft : "75px",
    },
    h1:{
      marginBottom : '70px',
      marginLeft : '30px',
    },
    button:{
      margin : '25px',
    },
  });
}
