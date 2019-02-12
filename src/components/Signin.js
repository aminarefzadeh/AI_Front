import React from "react";
import {postData,urls} from "../lib/request";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';



export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {status:1,
                  response:null,  //for errors
                  person:{
                    first_name:null,
                    last_name:null,
                    phone_number:null,
                    age:null,
                  }};
    // there is 5 status -> 1.login_page 2.create_page (paylod with nessecary info of user got in login_page) handle other things in .then
  }

  get_login_form(){
    var error = "";
    if(this.state.response){
      if(this.state.response.errors){
        error = this.state.response.errors;
      }
    }
    const classes = styles(this.props.theme);
    return (
      <Grid item xs={6} style={classes.main}>
        <CssBaseline />
        <Paper style={classes.paper}>
          <Avatar style={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form style={classes.form} onSubmit={this.loginHandler.bind(this)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input id="first_name_input" name="first_name" autoComplete="First Name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input id="last_name_input" name="last_name" autoComplete="Last Name" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
              <Input name="phone_number" id="phone_number_input" autoComplete="Phone Number" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
            >
              Sign in
            </Button>
          </form>
          <Button
            fullWidth
            variant="contained"
            color="danger"
            style={classes.submit}
            onClick={()=>{this.setState({status:2,person:null,response:null});}}
          >
            not have account?Signup
          </Button>
          <label>
            {error}
          </label>
        </Paper>
      </Grid>
    );
  } // with errors
  get_signup_form(){
    var phone_number_error = "";
    var non_field_error = "";
    var first_name_error = "";
    var last_name_error = "";
    var age_error = "";
    if(this.state.response){
      if(this.state.response.phone_number){
        phone_number_error = this.state.response.phone_number[0];
      }
      if(this.state.response.age){
        age_error = this.state.response.age[0];
      }
      if(this.state.response.first_name){
        first_name_error = this.state.response.first_name[0];
      }
      if(this.state.response.last_name){
        last_name_error = this.state.response.last_name[0];
      }
      if(this.state.response.non_field_errors){
        non_field_error = "another user with this information exist";
      }
    }
    const classes = styles(this.props.theme);
    return (
      <Grid item xs={6} style={classes.main}>
        <CssBaseline />
        <Paper style={classes.paper}>
          <Avatar style={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form style={classes.form} onSubmit={this.signupHandler.bind(this)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input id="first_name_input" name="first_name" autoComplete="First Name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input id="last_name_input" name="last_name" autoComplete="Last Name"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
              <Input name="phone_number" id="phone_number_input" autoComplete="Phone Number"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="age">Your Age</InputLabel>
              <Input name="age" id="age_input" autoComplete="Age"/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
            >
              Sign up
            </Button>
          </form>
          <Button
            fullWidth
            variant="contained"
            color="danger"
            style={classes.submit}
            onClick={()=>{this.setState({status:1,person:null,response:null});}}
          >
            have account ? SingIn
          </Button>
        </Paper>
      </Grid>
    );
  } // with errors
  loginHandler(event){
    console.log("login Handler");
    event.preventDefault();
    const first_name = document.getElementById("first_name_input").value;
    const last_name = document.getElementById("last_name_input").value;
    const phone_number = document.getElementById("phone_number_input").value;
    this.login_person(first_name,last_name,phone_number);
  }
  signupHandler(event){
    console.log("signup Handler");
    event.preventDefault();
    const first_name = document.getElementById("first_name_input").value;
    const last_name = document.getElementById("last_name_input").value;
    const phone_number = document.getElementById("phone_number_input").value;
    const age = Number(document.getElementById("age_input").value);
    this.create_person(first_name,last_name,phone_number,age);
  }
  login_person(first_name,last_name,phone_number){
    postData(urls.login,{first_name:first_name,last_name:last_name,phone_number:phone_number})
    .then((res)=>{
      console.log(res);
      if(res.status==200){
        res.json().then((val)=>{
          console.log(val);
          this.props.loginHandler(first_name,last_name,phone_number,val.token);
        })
      }
      else if(res.status == 400){
        res.json().then((val)=>{
          console.log(val);
          this.setState({response:val,
            person:{
              first_name:first_name,
              last_name:last_name,
              phone_number:phone_number,
            },
          });
        })
      }
      else if (res.status == 401){
        this.setState({
          status:2,
          person:{
            first_name:first_name,
            last_name:last_name,
            phone_number:phone_number,
          },
          response:null,
        });
      }
    });
  }
  create_person(first_name,last_name,phone_number,age){
    postData(urls.create_user,{first_name:first_name,last_name:last_name,phone_number:phone_number,age:age})
    .then((res)=>{
      console.log(res);
      if(res.status == 200){
        postData(urls.login,{first_name:first_name,last_name:last_name,phone_number:phone_number})
        .then((res)=>{
          console.log(res);
          if(res.status==200){
            res.json().then((val)=>{
              this.props.loginHandler(first_name,last_name,phone_number,val.token);
            })
          }
          else if(res.status == 400){
            res.json().then((val)=>{
              this.setState({response:val,
                person:{
                  first_name:first_name,
                  last_name:last_name,
                  phone_number:phone_number,
                },
                status:1,
              });
            })
          }
        });
      }
      else if (res.status == 400){
        res.json().then((val)=>{
          console.log(val);
          this.setState({
            person:{
              first_name:first_name,
              last_name:last_name,
              phone_number:phone_number,
              age:age,
            },
            response:val,
          });
        });
      }
    });
  }
  render() {
    console.log(this.state);
    if(this.state.status == 1){
      var output = this.get_login_form();
    }
    else if (this.state.status == 2){
      var output = this.get_signup_form();
    }
    return (
      <div>
        {output}
      </div>
    );
  }
}



const styles = theme => {
  return (
    {
      main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      paper: {
        marginTop: theme.spacing.unit * 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
      avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
      },
      submit: {
        marginTop: theme.spacing.unit * 3,
      },
    }
  )
}
