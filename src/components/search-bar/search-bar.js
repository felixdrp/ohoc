import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SearchIcon from 'material-ui/svg-icons/action/search';
import BackspaceIcon from 'material-ui/svg-icons/content/backspace';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


import {grey700} from 'material-ui/styles/colors';

import SearchResults from './search-results';
import QueryStore from '../query-store';
// import fetchData from '../../network/fetch-data';

import Measure from 'react-measure';


import { URL_CATEGORIES_LIST } from '../../links';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAMobile: (navigator.userAgent.indexOf('Mobile') > -1)? true : false,
      searchbox: QueryStore.getQuery()
    };
  }

  handleChange(event, value, index) {
    QueryStore.setQuery(value);
    this.setState({searchbox : value})
  };

  cleanQuery = () => this.setState({searchbox: ''})

  render() {
    let results = ''
    if ( this.state.searchbox && this.state.searchbox.length > 1  ) {
      results = <SearchResults searchText={this.state.searchbox} clearQuery={this.cleanQuery} customWith={this.state.dimensions ? this.state.dimensions.width*0.99 : null} />
    }

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
      <div>
        <Card
          style={{
            position: 'relative',
            width:"80%",
            marginLeft:"10%",
            marginBottom:20,
            marginTop:10,
          }}
        >
          <SearchIcon style={{width:30,height:30, marginTop:5, marginLeft:5}} color={grey700}/>
          <TextField
            id="search-box"
            hintText="Type to search"
            style={{marginLeft:10, position: "absolute",width:"80%",height: 43}}
            // defaultValue={this.state.searchbox}
            value={this.state.searchbox}
            onChange={ (event, value, index)=>this.handleChange(event, value, index) }
            onKeyDown={ (event,k,i ) => { (event.which || event.keyCode) == 27 ? this.cleanQuery() : null }}
          />
          <IconButton
            //  iconStyle={{position: 'absolute',top: 0}}
             style={{
               position: 'absolute',
               bottom: -4,
               right: 0
             }}
             onClick={this.cleanQuery}
           >
             <BackspaceIcon />
           </IconButton>
        </Card>

        {results}
      </div>
      </Measure>
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
)(SearchBar);
