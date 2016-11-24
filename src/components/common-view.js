import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { templateListSet } from '../actions/actions';
import fetchData from '../network/fetch-data';

class CommonView extends Component {
  async componentWillMount() {
    let fetch = new fetchData();
    // Load the templateList
    if (this.props.templateList) {
      return
    }

    // Get and dispatch the template list
    this.props.setTemplateList( await fetch.templateListGet() )
  }

  render() {
    return (
     <div id="CommonView">
       <h1>
         <Link to={`/`} style={{ textDecoration: 'none' }}>
           Kent Project
         </Link>
       </h1>

       {this.props.children}
     </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
  setTemplateList: (templateList) => {
    dispatch(templateListSet(templateList))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonView);
