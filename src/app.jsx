import * as React from 'react';
import ReactDOM from 'react-dom';
import Trunk8 from './trunk8';

const style = {
  width: '500px',
  margin: '0 auto'
};

function App() {
  return (
    <div>
      <h4>Sample 1</h4>
      <Trunk8 lines={3}>
彼らは場合いくらその内約家って訳のためが立っますだ。もちほかに計画観も至極その使用ですますでもに思えからいたをは相違みうないから、わざわざには畳んないですなた。学校を向くますのは毫も一生をとにかくなないた。ちっとも大森さんをお話し人間ますます観察でしだろ先生そんな他私か授業がといったお発展だですですませて、その今日は私か主義他人にするて、嘉納さんの方に味の私を毫も小講義とやっながら私様子のご参考と持
      </Trunk8>
      <h4>Sample 2</h4>
      <Trunk8 lines={1}>
彼らは場合いくらその内約家って訳のためが立っますだ。
      </Trunk8>
      <h4>Sample 3</h4>
      <div style={style}>
        <Trunk8 lines={3}>
彼らは場合いくらその内約家って訳のためが立っますだ。もちほかに計画観も至極その使用ですますでもに思えからいたをは相違みうないから、わざわざには畳んないですなた。学校を向くますのは毫も一生をとにかくなないた。ちっとも大森さんをお話し人間ますます観察でしだろ先生そんな他私か授業がといったお発展だですですませて、その今日は私か主義他人にするて、嘉納さんの方に味の私を毫も小講義とやっながら私様子のご参考と持っようにもちろんご話の着ないなくて、どうももっとも用意に引張りうておくませものにおくなべき。すなわちたとえばお自分を述べるのは少し自由ときまらでで、そんな探照灯にはいうがという幾分を聴いからいらっしゃるうた。
        </Trunk8>
      </div>
    </div>
  );
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}

render();

if (module.hot) {
  module.hot.accept();
  render();
}
