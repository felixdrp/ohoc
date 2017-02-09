'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _reactRouter = require('react-router');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Card = require('material-ui/Card');

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _navigateNext = require('material-ui/svg-icons/image/navigate-next');

var _navigateNext2 = _interopRequireDefault(_navigateNext);

var _GridList = require('material-ui/GridList');

var _stringTools = require('../stringTools');

var _stringTools2 = _interopRequireDefault(_stringTools);

var _gridview = require('./gridview');

var _gridview2 = _interopRequireDefault(_gridview);

var _listview = require('./listview');

var _listview2 = _interopRequireDefault(_listview);

var _fetchData = require('../../network/fetch-data');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoriesView = function (_Component) {
  (0, _inherits3.default)(CategoriesView, _Component);

  function CategoriesView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CategoriesView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CategoriesView.__proto__ || (0, _getPrototypeOf2.default)(CategoriesView)).call.apply(_ref, [this].concat(args))), _this), _this.subCategoryData = {
      "Practice": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Practice/Grays Inn Gateway.jpg', orderIndex: 2, copyrightNotice: "" },
      "The Bench": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Bench/PortadaBench.jpg', orderIndex: 2, copyrightNotice: "" },
      "Solicitors and Agents": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Solicitors and Agents/GraysInnSquare001BirdandBird.jpg', orderIndex: 2, copyrightNotice: "" },
      "Textbooks": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Textbooks/Photograph1.jpg', orderIndex: 2, copyrightNotice: "" },
      "Barristers": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Barristers/barristers.jpg', orderIndex: 2, copyrightNotice: "" },
      "Treatises": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Treatises/ShelleyOnPatents.jpg', orderIndex: 2, copyrightNotice: "" },
      "Clerks": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Clerks/PortadaClerks.jpg', orderIndex: 2, copyrightNotice: "" },
      "Universities & Polytechnics ": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Academia/PortadaAcademia.jpg', orderIndex: 2, copyrightNotice: "" },
      "Law Reports": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Law Reports/FSPLR.png', orderIndex: 2, copyrightNotice: "" },
      "Chambers": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Chambers/6PumpCourtTres.jpg', orderIndex: 2, copyrightNotice: "" },
      "Groups and Associations": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Groups and Associations/JB_Photos16_0010.jpg', orderIndex: 2, copyrightNotice: "" },
      "EIPR": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/EIPR/PropertyReview.jpg', orderIndex: 2, copyrightNotice: "" },
      "Civil Service": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Civil Service/PatentOfficeLibrary.jpg', orderIndex: 2, copyrightNotice: "" },
      "Magazines": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Magazines/TW_0002.jpg', orderIndex: 2, copyrightNotice: "" },
      "Campaigns": { src: _links.URL_BASE_MULTIMEDIA_IMAGES + '/cat/Campaigns/PublicLendingRight2.jpg', orderIndex: 2, copyrightNotice: "" }
    }, _this.entriesToSubtypeGroups = function (list) {

      var groupedEntries = {};
      for (var entry in list) {
        entry = list[entry];
        if (!groupedEntries[entry.subtype]) {
          groupedEntries[entry.subtype] = [];
        }

        groupedEntries[entry.subtype].push(entry);
      }

      return groupedEntries;
    }, _this.prepareTiles = function (entries) {
      var tiles = [];

      var subtypesInTiles = [];

      for (var a in entries) {

        if (!subtypesInTiles.includes(entries[a].subtype)) {

          tiles.push({
            img: _links.URL_BASE_MULTIMEDIA_IMAGES + 'institution-default.jpg',
            title: entries[a].subtype,
            src: _links.URL_CATEGORIES_LIST + _this.props.params.categoryId + "/" + entries[a].subtype
          });

          subtypesInTiles.push(entries[a].subtype);
        }
      }
      return tiles;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CategoriesView, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fetch, categoriesList;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch = new _fetchData2.default();

                categoriesList = void 0;
                _context.prev = 2;
                _context.next = 5;
                return fetch.getRecordsByType(this.props.params.categoryId);

              case 5:
                categoriesList = _context.sent;

                this.setState({ categoriesList: categoriesList });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                console.error('fetching record data > ' + _context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        margin: 12
      };

      var baseAvatarImage = _links.URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg';

      if (!this.state || !this.state.categoriesList) {
        return _react2.default.createElement('div', null);
      }

      var styles = {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        },
        gridList: {

          overflowY: 'auto'
        }
      };

      var list = this.state.categoriesList.recordsByType;
      var tilesData = this.prepareTiles(list);

      var subtypes = {};
      for (var l in list) {
        subtypes[list[l].subtype] = "";
      }
      var onlyOneCategory = (0, _keys2.default)(subtypes).length == 1;

      if (onlyOneCategory || this.props.params.subcategoryId) {

        var entriesBySubtype = this.entriesToSubtypeGroups(list);
        var selectedType = this.props.params.subcategoryId ? this.props.params.subcategoryId : (0, _keys2.default)(subtypes)[0];
        var selectedSubCategory = entriesBySubtype[selectedType];
        var showAsGrid = true;

        return _react2.default.createElement(
          _Card.Card,
          { style: { paddingBottom: 30, minHeight: 600 } },
          _react2.default.createElement(
            _Card.CardTitle,
            { style: { marginLeft: 40 } },
            ' ',
            _react2.default.createElement(
              'h1',
              null,
              ' ',
              (0, _stringTools2.default)(this.props.params.subcategoryId),
              ' '
            ),
            ' '
          ),
          _react2.default.createElement(
            _Card.Card,
            { style: { marginLeft: 50, marginRight: 50, padding: 5 } },
            _react2.default.createElement(_gridview2.default, { subcategoryId: this.props.params.subcategoryId, entries: selectedSubCategory })
          )
        );
      } else {
        return _react2.default.createElement(
          _Card.Card,
          { style: { paddingBottom: 30, minHeight: 600 } },
          _react2.default.createElement(
            _Card.CardTitle,
            { style: { marginLeft: 50 } },
            ' ',
            _react2.default.createElement(
              'h1',
              null,
              ' ',
              (0, _stringTools2.default)(this.props.params.categoryId),
              ' '
            ),
            ' '
          ),
          _react2.default.createElement(
            _Card.Card,
            { style: { marginLeft: 50, marginRight: 50 } },
            _react2.default.createElement(
              _Card.CardText,
              null,
              _react2.default.createElement(
                _GridList.GridList,
                {
                  cols: 3,
                  style: styles.gridList,
                  cellHeight: 250
                },
                tilesData.map(function (tile, i) {
                  return _react2.default.createElement(
                    _reactRouter.Link,
                    { key: i, to: tile.src, style: { textDecoration: 'none' } },
                    _react2.default.createElement(
                      _GridList.GridTile,
                      {

                        title: tile.title,
                        subtitle: _this2.subCategoryData[tile.title] ? _this2.subCategoryData[tile.title].copyrightNotice : ""
                      },
                      _react2.default.createElement(
                        'div',
                        { style: { textAlign: "center", backgroundColor: "#cccccc" } },
                        _react2.default.createElement('img', { style: { maxHeight: 250 }, src: _this2.subCategoryData[tile.title] ? _this2.subCategoryData[tile.title].src : baseAvatarImage })
                      )
                    )
                  );
                })
              )
            )
          )
        );
      }
    }
  }]);
  return CategoriesView;
}(_react.Component);

exports.default = CategoriesView;