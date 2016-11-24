import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class BrowseRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>


        <h3> Browse Records </h3>

        <div>
          <TextField
            hintText="Search"
          />
          <br />
        </div>

        <div>
          {
            this.props.templateList && Object.keys(this.props.templateList).map( (e, index) => (
              <Card
                key={index}
                style={{
                  width: '20%',
                  display: 'inline-block',
                }}
                expanded={false}
                initiallyExpanded={false}
              >
                <CardTitle
                  title={e}
                  // subtitle={"Card subtitle" + e}
                />
              </Card>
            ))
          }
        </div>

        <Link to={'/record/create'} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Add Record" primary={true} style={style} />
        </Link>
        <Link to={`/record/hola/mlk`} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Go to a record" primary={true} style={style} />
        </Link>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseRecords);
