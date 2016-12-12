import React from 'react';

function isNativeSupport() {
  return typeof document.body.style.webkitLineClamp !== 'undefined';
}

function getLineHeight(el) {
  const computedStyle = getComputedStyle(el);
  const computedLineHeight = computedStyle['line-height'];
  return /px/.test(computedLineHeight) ?
    Number(computedLineHeight.replace('px', '')) :
    Number(computedLineHeight) * Number(computedStyle['font-size'].replace('px', ''));
}

function apply(el, content, bite, lines, fill) {
  el.innerHTML = content.slice(0, bite) + (lines > 1 ? fill : '');
}

function truncate() {
  const fill = this.props.fill;
  const container = this.refs.container;
  const lineHeight = getLineHeight(container);
  const maxLine = this.props.lines;
  const content = this.props.children;
  const chunk = this.props.chunk;
  let lines = 1;
  let bite = chunk;

  while (bite < content.length) {
    apply(container, content, bite, lines, fill);
    lines = Math.floor(container.clientHeight / lineHeight);
    if (lines > maxLine) {
      bite -= chunk;
      break;
    }
    bite += chunk;
  }
  apply(container, content, bite, lines, fill);
}

function getNativeClampStyle(lines) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden'
  };
}

export default class Trunk8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!isNativeSupport()) {
      this.onResize = () => {
        truncate.apply(this);
      };
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  }

  componentWillUnmount() {
    if (!isNativeSupport()) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  render() {
    return isNativeSupport() ? (
      <div ref="container" style={getNativeClampStyle(this.props.lines)}>
        {this.props.children}
      </div>
    ) : <div ref="container" />;
  }
}

Trunk8.defaultProps = {
  fill: '&hellip;',
  lines: 3,
  chunk: 1
};
