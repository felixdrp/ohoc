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

var _links = require('../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowseRecords = function (_Component) {
  (0, _inherits3.default)(BrowseRecords, _Component);

  function BrowseRecords(props) {
    (0, _classCallCheck3.default)(this, BrowseRecords);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowseRecords.__proto__ || (0, _getPrototypeOf2.default)(BrowseRecords)).call(this, props));

    _this.categoryData = {
      "academia": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoAcademy.jpeg',
        orderIndex: 2,
        copyrightNotice: "(Courtesy of QM Archives)" },
      "civil service": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoCivilService.jpg', orderIndex: 4, copyrightNotice: "(Courtesy of IP Office)" },
      "policy formation": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPolicyFormation.jpg', orderIndex: 3, copyrightNotice: "(Courtesy of M. Freegard)" },
      "publications": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPublications.jpg', orderIndex: 5, copyrightNotice: "(Courtesy of Henry Blanco White)" },
      "solicitors and agents": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoSolicitorsandAgents.jpg', orderIndex: 1, copyrightNotice: "(Courtesy of Bird&Bird)" },
      "the bar": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoTheBar.jpg', orderIndex: 0, copyrightNotice: "(Courtesy of Metropolitan Archives)" }
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
          { style: { paddingTop: 20, paddingBottom: 10 } },
          _react2.default.createElement(
            'div',
            { style: { textAlign: "center" } },
            this.props.templateList && (0, _keys2.default)(this.props.templateList).sort(function (a, b) {
              return _this2.categoryData[a].orderIndex > _this2.categoryData[b].orderIndex;
            }).map(function (e, index) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { key: index, to: _links.URL_CATEGORIES_LIST + e, style: { textDecoration: 'none' } },
                _react2.default.createElement(
                  _Card.Card,
                  {

                    style: {
                      width: "26%",
                      display: 'inline-block',
                      marginBottom: 10,
                      marginRight: 10,
                      height: 250,
                      backgroundColor: "#cccccc"
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
                          { style: { color: "white", fontSize: 10 } },
                          ' ',
                          _this2.categoryData[e].copyrightNotice
                        ),
                        ' '
                      )
                    },
                    _react2.default.createElement(
                      'span',
                      { style: { width: 400, height: 250 } },
                      _react2.default.createElement('img', { style: { maxHeight: 250, maxWidth: "100%" }, src: _this2.categoryData[e].src })
                    )
                  )
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { marginLeft: "10%", fontSize: 18 } },
            _react2.default.createElement(
              'div',
              { style: { marginTop: 30, paddingLeft: 0, paddingRight: 50, width: "88%", textAlign: "justify" } },
              'The twentieth-century has been a largely unexplored historical period, often consigned to brief references in textbooks or newspapers, and it is our aim to explore the different and dynamic ways in which intellectual property has  evolved in the United Kingdom in recent years. Using personal recollections, artefacts and opinions of those who participated in the making of intellectual property in their different professional capacities as barristers, clerks, civil servants or lecturers this project will augment historical understanding of intellectual property through the creation of a digital archive of open and publicly accessible material that records, preserves and transcribes oral interviews with intellectual property practitioners, lobbyists and civil servants. The archive will be of value to anyone with an interest in contemporary legal history and intellectual property.\u200B',
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'span',
                { style: { fontSize: 15 } },
                _react2.default.createElement(
                  'b',
                  null,
                  'Contact details:'
                ),
                _react2.default.createElement(
                  'div',
                  { style: { margin: 20 } },
                  'Jos\xE9 Bellido, University of Kent ',
                  _react2.default.createElement(
                    'a',
                    { href: 'mailto:j.a.bellido@kent.ac.uk' },
                    'j.a.bellido@kent.ac.uk'
                  ),
                  ' and Lionel Bently, University of Cambridge ',
                  _react2.default.createElement(
                    'a',
                    { href: 'mailto:lb329@cam.ac.uk' },
                    '\u200Blb329@cam.ac.uk'
                  )
                )
              )
            )
          )
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