import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push  } from 'react-router-redux'
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import { URL_CATEGORIES_LIST } from '../../links';

class CategoryButton extends Component {
  linkTo = (url) => this.props.linkTo(url)

  render() {
    let logoStyle = {height: 50,marginTop:10,marginLeft:5}
    let category = this.props.category

    return (
      <span>
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
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          style={{
            top: 8,
            right: 10,
          }}

        >
          {
           this.props.subcategories.map(
             (subcategory, index) => (
               <MenuItem
                 key={index}
                 primaryText={subcategory}
                 onClick={() => this.linkTo(URL_CATEGORIES_LIST + category + '/' + subcategory)}
               />
             )
           )
          }
        </IconMenu>
      </span>
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
