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

function getText(content) {
  var text = '';
  if (content instanceof Array) {
    text += getText(content[0]);
    if (content.length > 0) {
      text += getText(content.slice(1));
    }
  } else if (typeof content === 'object' && content.props) {
    text += getText(content.props.children);
  } else if (typeof content === 'string') {
    text += content;
  }
  return text;
}

function apply(el, context, bite, fill) {
  el.innerText = context.slice(0, bite) + (fill ? fill : '');
}

function truncate() {
  var fill = this.props.fill;
  var container = this.refs.container;
  var lineHeight = getLineHeight(container);
  var maxHeight = lineHeight * this.props.lines;
  var context = this.state.context;
  var chunk = this.props.chunk;
  var bite = chunk;

  while (bite < context.length) {
    apply(container, context, bite, fill);
    if (container.clientHeight > maxHeight) {
      bite -= chunk;
      break;
    }
    bite += chunk;
  }
  apply(container, context, bite, bite < context.length ? fill : '');
}

function getNativeClampStyle(lines) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden'
  };
}

function Trunk8(props) {
  this.state = {
    context: getText(props.children)
  };
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
  fill: '\u2026',
  lines: 3,
  chunk: 1
};

module.exports = Trunk8;
