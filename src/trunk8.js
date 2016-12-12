var React = require('react');

function isNativeSupport() {
  return typeof document.body.style.webkitLineClamp !== 'undefined';
}

function getLineHeight(el) {
  var computedStyle = getComputedStyle(el);
  var computedLineHeight = computedStyle['line-height'];
  return /px/.test(computedLineHeight) ?
    Number(computedLineHeight.replace('px', '')) :
    Number(computedLineHeight) * Number(computedStyle['font-size'].replace('px', ''));
}

function apply(el, content, bite, fill) {
  el.innerHTML = content.slice(0, bite) + (fill ? fill : '');
}

function truncate() {
  var fill = this.props.fill;
  var container = this.refs.container;
  var lineHeight = getLineHeight(container);
  var maxHeight = lineHeight * this.props.lines;
  var maxLine = this.props.lines;
  var content = this.props.children;
  var chunk = this.props.chunk;
  var bite = chunk;

  while (bite < content.length) {
    apply(container, content, bite, fill);
    if (container.clientHeight > maxHeight) {
      bite -= chunk;
      break;
    }
    bite += chunk;
  }
  apply(container, content, bite, bite < content.length ? fill : '');
}

function getNativeClampStyle(lines) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden'
  };
}

function Trunk8() {
}

Trunk8.prototype = Object.create(React.Component.prototype);

Trunk8.prototype.componentDidMount = function () {
  var self = this;
  if (!isNativeSupport()) {
    this.onResize = function() {
      truncate.apply(self);
    };
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
};

Trunk8.prototype.componentWillUnmount = function () {
  if (!isNativeSupport()) {
    window.removeEventListener('resize', this.onResize);
  }
};

Trunk8.prototype.render = function () {
  return isNativeSupport() ?
    React.createElement(
      'div',
      {
        ref: 'container',
        style: getNativeClampStyle(this.props.lines)
      },
      this.props.children
    ) :
    React.createElement(
      'div',
      {
        ref: 'container'
      }
    );
}

Trunk8.defaultProps = {
  fill: '&hellip;',
  lines: 3,
  chunk: 1
};

module.exports = Trunk8;
