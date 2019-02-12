import React from "react";
import {getReq,urls} from "../lib/request";
import Button from '@material-ui/core/Button';

export default class Weel extends React.Component {
  constructor(props){
    super(props);
    this.state = {payload:null,
                  status:"waiting"};
    console.log("hello boy");
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
    getReq(urls.weel_command,this.props.token)
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
      const buttons = this.state.payload.map( x => {
         return(<Button variant="contained" color="primary" style={classes.button} key={x.id} onClick={()=>{this.perform_commands(x.id);}}>{x.name}</Button>);
      });
      return(
        <div>
          <h1 style={classes.h1}> Wheel </h1>
          <div style={classes.div}>
            {buttons}
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
      marginLeft : '75px',
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
