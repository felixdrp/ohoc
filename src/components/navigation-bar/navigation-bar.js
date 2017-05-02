import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import CategoryButton from './category-button';

import fetchData from '../../network/fetch-data';

import { URL_CATEGORIES_LIST } from '../../links';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      // categories: [],
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        {
         this.props.templateList &&
         Object.keys(this.props.templateList)
         .sort(
           (a,b) => this.props.categoryData[a].orderIndex > this.props.categoryData[b].orderIndex)
         .map(
           (e, index) => (
             <CategoryButton key={index} category={e} subcategories={this.props.templateList[e].sort()} />
           )
         )
        }
      </div>
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
