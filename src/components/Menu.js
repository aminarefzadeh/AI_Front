import React from "react";
import Weel from "./Weel"
import Parrot from "./Parrot"


export default class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {page:"parrot",open:true};
  }
  change_page(page){
    this.setState({"page":page});
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    var mainElement;
    var buttons;
    const classes = styles(this.props.theme);
    if (this.state.page == "parrot"){
      mainElement = <Parrot token={this.props.person.token}  logoutHandler={this.props.logoutHandler} theme={this.props.theme}/>;
      buttons = <div>
                  <Button variant="contained" color="primary" style={classes.button} onClick={()=>{this.setState({page:"weel"});}}>
                    Wheel
                  </Button>
                </div>;
    }
    else if(this.state.page == "weel"){
      mainElement = <Weel token={this.props.person.token}  logoutHandler={this.props.logoutHandler} theme={this.props.theme}/>;
      buttons = <div>
                  <Button variant="contained" color="primary" style={classes.button} onClick={()=>{this.setState({page:"parrot"});}}>
                    Parrot
                  </Button>
                </div>;
    }

    return (
      <div style={classes.root}>
        <CssBaseline />
        <Grid container spacing={0} style={classes.mainGrid}>
          <Grid item xs={12} style={classes.appBarGrid}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                style={classes.title}
                >
                  Artificial Intelligence Lab
                </Typography>

              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={2} style={classes.menuGrid}>
            <div style={classes.griditem}>
              <Typography component="p">
                Command Menu
              </Typography>
              <br/>
              <Divider />
              <br/>
              {buttons}
              <br/>
              <Divider />
              <br/>
              <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.logoutHandler}>
                LogOut
              </Button>
              <br/>
            </div>
          </Grid>
          <Grid item xs={10} style={classes.mainGrid}>
            <div style={classes.griditem}>
              <div style={classes.appBarSpacer} />
              <Typography component="div">
                {mainElement}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const drawerWidth = 75;

const styles = theme => {
  return({
    root: {
    },
    appBar: {
      zIndex: 10,
    },
    menuGrid:{
      padding : "0px",
      background : 'snow',
    },
    mainGrid:{
      padding : "0px",
      background : 'aliceblue',
    },
    appBarGrid:{
      padding : "0px",
      align : "center",
    },
    griditem:{
      padding:"10px",
      paddingLeft : "20px",
    },
    title: {
      padding : "20px",
    },
    appBarSpacer: theme.mixins.toolbar,
  });
}
