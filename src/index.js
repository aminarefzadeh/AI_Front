import React from "react"
import ReactDOM from "react-dom"

import Layout from "./components/Layout"
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const app = document.getElementById('app')

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

ReactDOM.render(
    <Layout theme={theme}/>
  ,app);
