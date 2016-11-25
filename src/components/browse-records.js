import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import capitalize from './stringTools'

class BrowseRecords extends Component {

  categoryPhotos = {
    "academia" : "images/PhotoAcademy.jpeg",
    "civil service" : "images/PhotoCivilService.jpg",
    "policy formation" : "images/PhotoPolicyFormation.jpg",
    "publications" : "images/PhotoPublications.jpg",
    "solicitors and agents" : "images/PhotoSolicitorsandAgents.jpg",
    "the bar" : "images/PhotoTheBar.jpg",
  }


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

        {/* <div>
          <TextField
            hintText="Search"
          />
          <br />
        </div> */}

        <Card style = {{paddingTop:30,marginBottom:50,paddingBottom:10}}>
          <div style={{textAlign:"center"}} >
          {
            this.props.templateList && Object.keys(this.props.templateList).map( (e, index) => (
              <Link key={index} to={'categories/list/'+e} style={{ textDecoration: 'none' }}>
                <Card

                  style={{
                    width: '30%',
                    display: 'inline-block',
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                  expanded={false}
                  initiallyExpanded={false}
                >
                  <CardMedia
                    overlay={<CardTitle title={capitalize(e)} />}
                  >
                    <img style={{width : 500, height: 300}} src={"http://localhost:3001/"+this.categoryPhotos[e]} />
                  </CardMedia>

                </Card>
              </Link>
            ))
          }
          </div>

          <h2 style={{paddingTop:50, paddingLeft:50}}>Some text about the page?</h2>

          <div style={{paddingLeft:50,paddingRight:50}}>
          Lorem ipsum dolor sit amet, pri paulo tamquam perpetua ei, purto laudem aliquam ut vis! Debet graeci epicuri ei cum, ius at iuvaret inimicus tractatos? Wisi alienum mediocritatem per id, an nam accusamus eloquentiam, an persecuti philosophia nec. Ei quo laoreet salutandi, eum petentium eloquentiam ut, te labore quaerendum has. Te option oporteat duo.

          Tantas putant fabulas cum eu, sit ne amet summo? Et inani decore cum, ne propriae adipisci sed. Nostro numquam mea id, pro et veniam populo essent! Erat quodsi sea ad, sea lucilius constituto efficiantur te.

          Atqui quaeque delenit ius eu. Saepe verterem consequat et sed, libris legimus ex his? Dolore nominati sea at, elitr nominavi efficiantur nam at. Mundi timeam latine usu ex.

          Laudem nominati eu mei, noster splendide adolescens sit at, nonumes neglegentur complectitur ad sea. Quidam recusabo mea ne, hinc suscipit te vix, everti epicurei in vel. Et vocent invenire vel, detraxit referrentur vituperatoribus eam ut, ea blandit adipisci eam? An eos solum fabulas! Ad per laudem accumsan instructior, usu at tota invidunt adversarium, ad eos placerat dignissim. Usu detraxit partiendo torquatos te, cibo idque honestatis ne eam. Lorem homero an eam?

          Mea ex doming menandri. Stet labitur intellegat in mei, purto fuisset te has? Ut duo soluta vocibus senserit. Ad per mnesarchum cotidieque, duo ut inermis explicari constituam! Ea eam legere intellegam delicatissimi, modus semper sea no, aeterno eruditi quo an? No audiam eripuit facilisis vel, at his tantas ridens commune.

          Case hendrerit ex vim, his eu rebum definiebas? Ea est eirmod consectetuer. Affert invenire duo ei. Usu eu dicant vivendo, ad ius etiam minim definitiones, duo vocent inciderint no. Timeam imperdiet mei te, nec id periculis disputando, luptatum appellantur pro at? Ad sed consul bonorum necessitatibus, liber elitr quaerendum ad est.

          At ocurreret prodesset est, hinc essent philosophia mel ut. Te indoctum accusamus vix? Vis eu aeterno elaboraret suscipiantur. Usu esse autem et!

          Ne nec recteque elaboraret, mei ex eros mentitum salutatus. No sea solet alterum, ut ius utinam repudiandae complectitur. An usu deserunt gubergren, pri in summo aliquid recusabo. Pri cu posse choro, ei vis congue repudiare? Duo in graeco virtute civibus, no est definiebas inciderint.
        </div>

        <hr style={{margin:30}}/>
        <div style={{margin:30}}>

            <span>
              <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={{height:100}} />
            </span>

            <span>
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png" style={{height:100}} />
            </span>

            <span>
              <img src="http://www.gla.ac.uk/media/media_434161_en.jpg" style={{height:100}} />
            </span>

            <span>
              <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={{height:100}} />
            </span>

            <span>
              <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={{height:100}} />
            </span>


        </div>

        </Card>
{/*
        <Link to={'/record/create'} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Add Record" primary={true} style={style} />
        </Link>
        <Link to={`/record/hola/mlk`} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Go to a record" primary={true} style={style} />
        </Link> */}
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
