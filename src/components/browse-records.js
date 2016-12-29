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

  categoryOrderIndex = {
    "academia" : 2,
    "civil service" : 4,
    "policy formation" : 3,
    "publications" : 5,
    "solicitors and agents" : 1,
    "the bar" : 0,
  }

  copyrightNotice = {
    "academia" : "(Courtesy of QM Archives)",
    "civil service" : "(Courtesy of IP Office)",
    "policy formation" : "(Courtesy of M. Freegard)",
    "publications" : "(Courtesy of Henry Blanco White)",
    "solicitors and agents" : "(Courtesy of Bird&Bird)",
    "the bar" : "(Courtesy of Metropolitan Archives)",
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
            this.props.templateList && Object.keys(this.props.templateList).sort( (a,b) => this.categoryOrderIndex[a] > this.categoryOrderIndex[b]).map( (e, index) => (
              <Link key={index} to={'ohoc/categories/list/'+e} style={{ textDecoration: 'none' }}>
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
                    overlay={<CardTitle title={capitalize(e)} style={{margin:0,padding:4}} > <span style={{color:"white",fontSize:14}}> {this.copyrightNotice[e]}</span> </CardTitle>}
                  >
                    <img style={{width : 500, height: 300}} src={this.categoryPhotos[e]} />
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
