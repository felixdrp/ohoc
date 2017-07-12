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

import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

import QueryStore from '../query-store';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      // categories: [],
    };
  }

  async componentDidMount() {
    this.setState({paragraph : null})
    let fetch = new fetchData();
    var tempList = await fetch.templateListGet()
    var shortcuts = {}

    for ( var i in tempList.templateList ){
      if ( tempList.templateList[i].length == 1 ){

          var catLists = await this.loadCategoriesList(i,tempList.templateList[i][0])
          var items = {};

          for ( var j in catLists.recordsByType){
              items[catLists.recordsByType[j].data.recordName] = catLists.recordsByType[j].id
          }

          shortcuts[i] = items
      }
    }

    this.setState({shortcuts})
  }

  async loadCategoriesList(categoryId,subCategory) {
    let fetch = new fetchData();
    let categoriesList
    let paragraph

    try {
      categoriesList = await fetch.getRecordsByType(categoryId)
      return categoriesList
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
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

    if ( !this.state.shortcuts ){
      return <div></div>
    }

    return (
      <span>
        <Link to={"/"}>
          <IconButton
             style={{
               bottom: -5,
               marginRight: 5,
               marginLeft: 5,
             }}
             onClick={() => QueryStore.setQuery("")}
           >
             <ActionHome />
           </IconButton>
         </Link>
        {
         this.props.templateList &&
         Object.keys(this.props.templateList)
         .sort(
           (a,b) => this.props.categoryData[a].orderIndex > this.props.categoryData[b].orderIndex)
         .map(
           (e, index) => (
             <CategoryButton key={index} category={e} subcategories={this.props.templateList[e].sort()} shortcuts={this.state.shortcuts}/>
           )
         )
        }
      </span>
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
