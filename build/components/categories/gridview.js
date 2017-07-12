'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _starBorder = require('material-ui/svg-icons/toggle/star-border');

var _starBorder2 = _interopRequireDefault(_starBorder);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _links = require('../../links');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridView = function (_Component) {
  (0, _inherits3.default)(GridView, _Component);

  function GridView() {
    (0, _classCallCheck3.default)(this, GridView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridView.__proto__ || (0, _getPrototypeOf2.default)(GridView)).call(this));

    _this.prepareTiles = function (entries) {
      var tiles = [];
      for (var a in entries) {
        tiles.push({
          img: entries[a].data.featuredImage,
          title: entries[a].data.recordName,
          src: _links.URL_VIEW_RECORD + entries[a].id
        });
      }
      return tiles;
    };

    _this.adjustImage = function (image) {

      return _react2.default.createElement(
        _reactMeasure2.default,
        {
          onMeasure: function onMeasure(dimensions) {
            var dims = _this.state.imgDimensions;
            dims[image] = dimensions;
            _this.setState({ imgDimensions: dims });
          }
        },
        _react2.default.createElement('img', {
          style: _this.state.imgDimensions[image] ? _this.state.imgDimensions[image].width > _this.state.imgDimensions[image].height ? { width: "100%" } : { height: "100%" } : {},
          src: image ? _links.URL_MULTIMEDIA + image : baseAvatarImage
        })
      );
    };

    _this.state = {
      imgDimensions: {}
    };

    return _this;
  }

  (0, _createClass3.default)(GridView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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

      var tilesData = this.prepareTiles(this.props.entries);

      var baseAvatarImage = _links.URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg';

      return _react2.default.createElement(
        _reactMeasure2.default,
        {
          onMeasure: function onMeasure(dimensions) {
            _this2.setState({ dimensions: dimensions });
          }
        },
        _react2.default.createElement(
          _GridList.GridList,
          {
            cols: this.state.dimensions ? Math.floor(this.state.dimensions.width / 150) : 4,
            style: styles.gridList
          },
          tilesData.sort(function (a, b) {
            if (!a.title || !b.title) {
              return 0;
            }
            return a.title.trim().localeCompare(b.title.trim());
          }).map(function (tile, i) {
            return _react2.default.createElement(
              _reactRouter.Link,
              { key: i, to: tile.src, style: { textDecoration: 'none' } },
              _react2.default.createElement(
                _GridList.GridTile,
                {
                  key: tile.img,
                  title: tile.title,
                  subtitle: ""
                },
                _react2.default.createElement(
                  'div',
                  { style: { width: "100%", height: "100%", textAlign: "center"
                    } },
                  _react2.default.createElement('img', { style: { height: "100%" }, src: tile.img ? _links.URL_MULTIMEDIA + tile.img : baseAvatarImage })
                )
              )
            );
          })
        )
      );
    }
  }]);
  return GridView;
}(_react.Component);

exports.default = GridView;