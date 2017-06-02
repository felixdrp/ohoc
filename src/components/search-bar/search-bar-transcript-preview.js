import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SearchIcon from 'material-ui/svg-icons/action/search';
import BackspaceIcon from 'material-ui/svg-icons/content/backspace';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


import {grey700} from 'material-ui/styles/colors';

import SearchResults from '../search-results';
import QueryStore from '../query-store';
// import fetchData from '../../network/fetch-data';

import { URL_CATEGORIES_LIST } from '../../links';

class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAMobile: (navigator.userAgent.indexOf('Mobile') > -1)? true : false,
      searchbox: QueryStore.getQuery()
    };
  }

  render() {
    return (
      <span>This is a transcript result</span>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  categoryData: state.categoryData || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
