import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push  } from 'react-router-redux'
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import { URL_CATEGORIES_LIST,URL_VIEW_RECORD } from '../../links';

class CategoryButton extends Component {
  linkTo = (url) => this.props.linkTo(url)

  render() {
    let logoStyle = {height: 50,marginTop:10,marginLeft:5}
    let category = this.props.category

    let subcategories = this.props.subcategories.map(
      (subcategory, index) => (
        <MenuItem
          key={index}
          primaryText={subcategory}
          onClick={() => this.linkTo(URL_CATEGORIES_LIST + category + '/' + subcategory)}
        />
      )
    );

    if ( this.props.shortcuts[category] ) {
      subcategories = Object.keys(this.props.shortcuts[category]).map(
        (subcategory, index) => (
          <MenuItem
            key={index}
            primaryText={subcategory}
            onClick={() => this.linkTo(URL_VIEW_RECORD +  this.props.shortcuts[category][subcategory] )}
          />
        )
      );
    }


    return (
      <div style={{display: 'inline-block'}}>
       <Link to={URL_CATEGORIES_LIST + category} style={{ textDecoration: 'none'}}>
         <FlatButton
           label={category}
         />
       </Link>
       <IconMenu
          iconButtonElement={(
            <IconButton
              style={{
                paddingTop: 10,
                paddingLeft: 0,
                paddingBottom: 0,
              }}
            >
              <ArrowDropDown />
            </IconButton>
          )}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          animated={true}
          style={{
            top: 8,
            right: 10,
          }}

        >
          {subcategories}
        </IconMenu>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => ({
  linkTo: (url) => dispatch(push(url)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryButton);
