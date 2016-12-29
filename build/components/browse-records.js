'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Card = require('material-ui/Card');

var _stringTools = require('./stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowseRecords = function (_Component) {
  (0, _inherits3.default)(BrowseRecords, _Component);

  function BrowseRecords(props) {
    (0, _classCallCheck3.default)(this, BrowseRecords);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowseRecords.__proto__ || (0, _getPrototypeOf2.default)(BrowseRecords)).call(this, props));

    _this.categoryPhotos = {
      "academia": "images/PhotoAcademy.jpeg",
      "civil service": "images/PhotoCivilService.jpg",
      "policy formation": "images/PhotoPolicyFormation.jpg",
      "publications": "images/PhotoPublications.jpg",
      "solicitors and agents": "images/PhotoSolicitorsandAgents.jpg",
      "the bar": "images/PhotoTheBar.jpg"
    };
    _this.categoryOrderIndex = {
      "academia": 2,
      "civil service": 4,
      "policy formation": 3,
      "publications": 5,
      "solicitors and agents": 1,
      "the bar": 0
    };
    _this.copyrightNotice = {
      "academia": "(Courtesy of QM Archives)",
      "civil service": "(Courtesy of IP Office)",
      "policy formation": "(Courtesy of M. Freegard)",
      "publications": "(Courtesy of Henry Blanco White)",
      "solicitors and agents": "(Courtesy of Bird&Bird)",
      "the bar": "(Courtesy of Metropolitan Archives)"
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(BrowseRecords, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        margin: 12
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          { style: { paddingTop: 30, marginBottom: 50, paddingBottom: 10 } },
          _react2.default.createElement(
            'div',
            { style: { textAlign: "center" } },
            this.props.templateList && (0, _keys2.default)(this.props.templateList).sort(function (a, b) {
              return _this2.categoryOrderIndex[a] > _this2.categoryOrderIndex[b];
            }).map(function (e, index) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { key: index, to: 'categories/list/' + e, style: { textDecoration: 'none' } },
                _react2.default.createElement(
                  _Card.Card,
                  {

                    style: {
                      width: '30%',
                      display: 'inline-block',
                      marginBottom: 10,
                      marginRight: 10
                    },
                    expanded: false,
                    initiallyExpanded: false
                  },
                  _react2.default.createElement(
                    _Card.CardMedia,
                    {
                      overlay: _react2.default.createElement(
                        _Card.CardTitle,
                        { title: (0, _stringTools2.default)(e), style: { margin: 0, padding: 4 } },
                        ' ',
                        _react2.default.createElement(
                          'span',
                          { style: { color: "white", fontSize: 14 } },
                          ' ',
                          _this2.copyrightNotice[e]
                        ),
                        ' '
                      )
                    },
                    _react2.default.createElement('img', { style: { width: 500, height: 300 }, src: _this2.categoryPhotos[e] })
                  )
                )
              );
            })
          ),
          _react2.default.createElement(
            'h2',
            { style: { paddingTop: 50, paddingLeft: 50 } },
            'Some text about the page?'
          ),
          _react2.default.createElement(
            'div',
            { style: { paddingLeft: 50, paddingRight: 50 } },
            'Lorem ipsum dolor sit amet, pri paulo tamquam perpetua ei, purto laudem aliquam ut vis! Debet graeci epicuri ei cum, ius at iuvaret inimicus tractatos? Wisi alienum mediocritatem per id, an nam accusamus eloquentiam, an persecuti philosophia nec. Ei quo laoreet salutandi, eum petentium eloquentiam ut, te labore quaerendum has. Te option oporteat duo. Tantas putant fabulas cum eu, sit ne amet summo? Et inani decore cum, ne propriae adipisci sed. Nostro numquam mea id, pro et veniam populo essent! Erat quodsi sea ad, sea lucilius constituto efficiantur te. Atqui quaeque delenit ius eu. Saepe verterem consequat et sed, libris legimus ex his? Dolore nominati sea at, elitr nominavi efficiantur nam at. Mundi timeam latine usu ex. Laudem nominati eu mei, noster splendide adolescens sit at, nonumes neglegentur complectitur ad sea. Quidam recusabo mea ne, hinc suscipit te vix, everti epicurei in vel. Et vocent invenire vel, detraxit referrentur vituperatoribus eam ut, ea blandit adipisci eam? An eos solum fabulas! Ad per laudem accumsan instructior, usu at tota invidunt adversarium, ad eos placerat dignissim. Usu detraxit partiendo torquatos te, cibo idque honestatis ne eam. Lorem homero an eam? Mea ex doming menandri. Stet labitur intellegat in mei, purto fuisset te has? Ut duo soluta vocibus senserit. Ad per mnesarchum cotidieque, duo ut inermis explicari constituam! Ea eam legere intellegam delicatissimi, modus semper sea no, aeterno eruditi quo an? No audiam eripuit facilisis vel, at his tantas ridens commune. Case hendrerit ex vim, his eu rebum definiebas? Ea est eirmod consectetuer. Affert invenire duo ei. Usu eu dicant vivendo, ad ius etiam minim definitiones, duo vocent inciderint no. Timeam imperdiet mei te, nec id periculis disputando, luptatum appellantur pro at? Ad sed consul bonorum necessitatibus, liber elitr quaerendum ad est. At ocurreret prodesset est, hinc essent philosophia mel ut. Te indoctum accusamus vix? Vis eu aeterno elaboraret suscipiantur. Usu esse autem et! Ne nec recteque elaboraret, mei ex eros mentitum salutatus. No sea solet alterum, ut ius utinam repudiandae complectitur. An usu deserunt gubergren, pri in summo aliquid recusabo. Pri cu posse choro, ei vis congue repudiare? Duo in graeco virtute civibus, no est definiebas inciderint.'
          ),
          _react2.default.createElement('hr', { style: { margin: 30 } })
        )
      );
    }
  }]);
  return BrowseRecords;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    templateList: state.templateList || null,
    params: ownProps.params,
    location: ownProps.location
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BrowseRecords);