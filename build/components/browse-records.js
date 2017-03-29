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

var _GridList = require('material-ui/GridList');

var _colors = require('material-ui/styles/colors');

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _links = require('../links');

var _SearchResults = require('./SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _QueryStore = require('./QueryStore');

var _QueryStore2 = _interopRequireDefault(_QueryStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowseRecords = function (_Component) {
  (0, _inherits3.default)(BrowseRecords, _Component);

  function BrowseRecords(props) {
    (0, _classCallCheck3.default)(this, BrowseRecords);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowseRecords.__proto__ || (0, _getPrototypeOf2.default)(BrowseRecords)).call(this, props));

    _this.categoryData = {
      "Academia": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoAcademy.jpeg',
        orderIndex: 2,
        copyrightNotice: "(Courtesy of QM Archives)" },
      "Civil Service": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoCivilService.jpg', orderIndex: 4, copyrightNotice: "(Courtesy of IP Office)" },
      "Policy Formation": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPolicyFormation.jpg', orderIndex: 3, copyrightNotice: "(Courtesy of M. Freegard)" },
      "Publications": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPublications.jpg', orderIndex: 5, copyrightNotice: "(Courtesy of Henry Blanco White)" },
      "Solicitors and Agents": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoSolicitorsandAgents.jpg', orderIndex: 1, copyrightNotice: "(Courtesy of Bird&Bird)" },
      "The Bar": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/PhotoTheBar.jpg', orderIndex: 0, copyrightNotice: "(Courtesy of Metropolitan Archives)" }
    };

    _this.state = {
      isAMobile: navigator.userAgent.indexOf('Mobile') > -1 ? true : false,
      searchbox: _QueryStore2.default.getQuery()
    };
    return _this;
  }

  (0, _createClass3.default)(BrowseRecords, [{
    key: 'handleChange',
    value: function handleChange(event, value, index) {
      _QueryStore2.default.setQuery(value);
      this.setState({ searchbox: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        margin: 12
      };

      var results = _react2.default.createElement(
        'div',
        { style: { textAlign: "center" } },
        _react2.default.createElement(
          _GridList.GridList,
          {
            cols: this.state.isAMobile ? 2 : 3,
            cellHeight: 250,
            style: { width: "80%", marginLeft: "10%" }
          },
          this.props.templateList && (0, _keys2.default)(this.props.templateList).sort(function (a, b) {
            return _this2.categoryData[a].orderIndex > _this2.categoryData[b].orderIndex;
          }).map(function (e, index) {
            return _react2.default.createElement(
              _reactRouter.Link,
              { key: index, to: _links.URL_CATEGORIES_LIST + e, style: { textDecoration: 'none' } },
              _react2.default.createElement(
                _GridList.GridTile,
                {
                  key: index,
                  title: _react2.default.createElement(
                    'span',
                    { style: { fontSize: 25 } },
                    e
                  ),
                  subtitle: _this2.categoryData[e].copyrightNotice,
                  style: { backgroundColor: "rgb(204, 204, 204)" }
                },
                _react2.default.createElement(
                  'span',
                  { style: { width: "100%", height: "100%", textAlign: "center", verticalAlign: "middle" } },
                  _react2.default.createElement('img', { style: { width: "100%" }, src: _this2.categoryData[e].src ? _this2.categoryData[e].src : baseAvatarImage })
                )
              )
            );
          })
        )
      );

      if (this.state.searchbox && this.state.searchbox.length > 1) {
        results = _react2.default.createElement(_SearchResults2.default, { searchText: this.state.searchbox });
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          { style: { paddingTop: 20, paddingBottom: 10 } },
          _react2.default.createElement(
            _Card.Card,
            { style: { width: "80%", marginLeft: "10%", marginBottom: 20 } },
            _react2.default.createElement(_search2.default, { style: { width: 30, height: 30, marginTop: 5, marginLeft: 5 }, color: _colors.grey700 }),
            _react2.default.createElement(_TextField2.default, {
              id: 'search-box',
              hintText: 'Type to search',
              style: { marginLeft: 10, position: "absolute", width: "40%", height: 43 },
              defaultValue: this.state.searchbox,
              onChange: function onChange(event, value, index) {
                return _this2.handleChange(event, value, index);
              }
            })
          ),
          results,
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
                  'span',
                  { style: { marginLeft: 10 } },
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