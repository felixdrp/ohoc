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

    _this.categoryPhotos = {
      "academia": _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoAcademy.jpeg',
      "civil service": _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoCivilService.jpg',
      "policy formation": _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPolicyFormation.jpg',
      "publications": _links.URL_BASE_MULTIMEDIA_IMAGES + "/PhotoPublications.jpg",
      "solicitors and agents": _links.URL_BASE_MULTIMEDIA_IMAGES + "/PhotoSolicitorsandAgents.jpg",
      "the bar": _links.URL_BASE_MULTIMEDIA_IMAGES + "/PhotoTheBar.jpg"
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
            { style: { marginTop: 5, marginLeft: 80, marginBottom: 50, fontSize: 35, fontWeight: "bold" } },
            _react2.default.createElement(
              'span',
              { style: { color: "black" } },
              'Intellectual Property :'
            ),
            ' ',
            _react2.default.createElement(
              'span',
              { style: { color: "#155196" } },
              'Oral History Project'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: "center" } },
            this.props.templateList && (0, _keys2.default)(this.props.templateList).sort(function (a, b) {
              return _this2.categoryOrderIndex[a] > _this2.categoryOrderIndex[b];
            }).map(function (e, index) {
              return _react2.default.createElement(
                _reactRouter.Link,
                { key: index, to: _links.URL_CATEGORIES_LIST + e, style: { textDecoration: 'none' } },
                _react2.default.createElement(
                  _Card.Card,
                  {

                    style: {
                      width: 400,
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
                          { style: { color: "white", fontSize: 14 } },
                          ' ',
                          _this2.copyrightNotice[e]
                        ),
                        ' '
                      )
                    },
                    _react2.default.createElement(
                      'span',
                      { style: { width: 400, height: 250 } },
                      _react2.default.createElement('img', { style: { maxHeight: 250, maxWidth: 400 }, src: _this2.categoryPhotos[e] })
                    )
                  )
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { marginLeft: 60, fontSize: 18 } },
            _react2.default.createElement(
              'div',
              { style: { marginTop: 50, paddingLeft: 80, paddingRight: 50, width: "85%", textAlign: "justify" } },
              'There are many layers and paths in the recent history of British intellectual property, particularly in its development throughout the second half of the twentieth century. These were important decades in which the subject became a full academic discipline; international offices in Munich and Alicante were established; the domestic Patent Office moved to Wales and the Patent Bar was renamed as the Intellectual Property Bar. This project is an attempt to trace these and many other histories by recording recollections of those who participated in one way or another in them. Current and retired academics, barristers, solicitors, policy makers, activists and agents recall here their background and reflect on the personal and professional challenges and encounters. Moreover, they talk about what they see now, in retrospect, as the main changes in the law and practice of British intellectual property. The project is funded by a grant from CREATe (University of Glasgow) and the interviews were carried out by Jose Bellido (University of Kent) and Lionel Bently (University of Cambridge).',
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
                  'Dr Jos\xE9 Bellido, University of Kent ',
                  _react2.default.createElement(
                    'a',
                    { href: 'mailto:j.a.bellido@kent.ac.uk' },
                    'j.a.bellido@kent.ac.uk'
                  ),
                  ' and ',
                  _react2.default.createElement('br', null),
                  'Professor Lionel Bently, University of Cambridge ',
                  _react2.default.createElement(
                    'a',
                    { href: 'mailto:lb329@cam.ac.uk' },
                    '\u200Blb329@cam.ac.uk'
                  )
                )
              )
            )
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