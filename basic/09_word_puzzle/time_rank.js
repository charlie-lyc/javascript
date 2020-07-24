var input = {};
input.words = ['hello', 'world', 'inflearn', 'code', 'squad', 'hypertext', 'stylesheet', 'javascript', 'nodejs', 'reactjs'];
input.reverseArray = function (array) {
  var result = array.reverse();
  return result;
};
input.rotateArrayL = function (array) {
  array.push(array.shift());
  return array;
};
input.rotateArrayR = function (array) {
  array.unshift(array.pop());
  return array;
};
input.randomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};
input.getRandomWord = function (array) {
  return array[this.randomIndex(array)];
};
input.randomShift = function (string) {
  var chars = string.split('');
  var toggle = Math.floor(Math.random() * 2);
  if (toggle) {
    chars = this.reverseArray(chars);
  }
  var shuffle = Math.ceil(Math.random() * (chars.length-1));
  for (let i = 0; i < shuffle; i++) {
    chars = this.rotateArrayL(chars);
  }
  return chars;
};

////////////////////////////////////////////////////////////////////////////////

var game = {};
game.word = '';
game.maxPlay = 3;
game.finishPlay = 0;
game.makeButtons = function (string) {
  var chars = input.randomShift(string);
  for (let i = 0; i < chars.length; i++) {
    let char_btn = document.createElement('button');
    char_btn.id = 'charBtn' + i;
    document.getElementById('output1').appendChild(char_btn);
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  this.isIdenfied();
};
game.removeButtons = function () {
  var btns = document.getElementById('output1').getElementsByTagName('button');
  var length = btns.length;
  for (let i = 0; i < length; i++) {
    let char_btn = document.getElementById('charBtn' + i);
    document.getElementById('output1').removeChild(char_btn);
  }
};
game.initialize = function () {
  this.word = input.getRandomWord(input.words);
  this.removeButtons();
  this.makeButtons(this.word);
};
game.checkProgress = function () {
  if (this.finishPlay === 1) {
    document.getElementById('check').innerHTML = ' O ';
  } else if (this.finishPlay === 2) {
    document.getElementById('check').innerHTML = ' O O ';
  } else if (this.finishPlay === this.maxPlay) {
    document.getElementById('check').innerHTML = 'Good! Thank you for playing!';
  }
};
game.getChars = function () {
  var btns = document.getElementById('output1').getElementsByTagName('button');
  var chars = [];
  for (let i = 0; i < btns.length; i++) {
    let char = document.getElementById('charBtn' + i).innerHTML;
    chars.push(char);
  }
  return chars;
};
game.isIdenfied = function () {
  var chars = this.getChars();
  var str = chars.join('');
  if (this.word === str) {
    document.getElementById('output2').innerHTML = '일치합니다!!!';
    this.finishPlay ++;
    this.checkProgress();
    if (this.finishPlay === this.maxPlay) {
      /* 게임 완료할 때 시간 측정 */
      rank.finishTime = Date.now();
      /* 게임 완료하는 데 걸린 시간 출력 */
      rank.measureTime();
      /* 게임중 경과시간 지속 출력 종료 */
      rank.stopTimes();
      /* 순위 1~10 랭크 업데이트 */
      rank.updateRanks();
      return;
    }
    this.initialize();
  } else {
    document.getElementById('output2').innerHTML = '일치하지 않습니다.';
  }
};
game.reverseBtns = function () {
  var chars = this.getChars();
  var rev_chars = input.reverseArray(chars);
  for (let i = 0; i < rev_chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = rev_chars[i];
  }
  this.isIdenfied();
};
game.rotateBtnsL = function () {
  var chars = this.getChars();
  chars = input.rotateArrayL(chars);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  this.isIdenfied();
};
game.rotateBtnsR = function () {
  var chars = this.getChars();
  chars = input.rotateArrayR(chars);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  this.isIdenfied();
};

///////////////////////////////////////////////////////////////////////////////

// rank 객체 생성
var rank = {};
// 속성 생성 : 선언 및 초기화
rank.startTime = 0;
rank.finishTime = 0;
rank.displayTime;
// 속성 추가 생성
rank.timeRank = {};
// 메소드 생성
/* 게임 완료하는 데 걸린 시간 출력 */
rank.measureTime = function () {
  var past_time = this.finishTime - this.startTime;
  document.getElementById('time').innerHTML = (past_time / 1000) + '초 소요';
};
/* 게임 중 경과한 시간 계산해서 출력 */
rank.pastTime = function () {
  var current_time = Date.now();
  /*** [ rank.startTime ] 왜 'this.startTime'이 아닌가? : 추측 컨데 "setInterval"함수 안에서 'this.pastTime'함수가 사용되기 때문인 듯,
                        다시말해 "setInterval" 함수에서 'this.this.startTime' 이 되지않기 위해서인 듯??? 잘 모르겠다...***/
  var past_time = current_time - rank.startTime;
  document.getElementById('time').innerHTML = Math.round(past_time / 1000) + '초 경과';
};
/* 게임 중 경과한 시간 일정간격으로 지속 출력 */
rank.displayTimes = function () {
  this.displayTime = setInterval(this.pastTime, 1000);
};
/* 게임중 경과시간 지속 출력 종료 */
rank.stopTimes = function() {
  clearInterval(this.displayTime);
};
// 메소드 추가 생성
/* 랭크에 추가하기 */
rank.addRank = function (past_time, name) {
  this.timeRank[past_time] = name;
};
/* 랭크에서 제거하기 */
rank.removeRank = function (past_time) {
  delete this.timeRank[past_time];
};
/* 값이 순서대로 정렬된 배열에서 비교대상 보다 큰 값이 있는지 확인 */
rank.isRanked = function (past_time, array) {
  var count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > past_time) {
      count ++;
      break;
    }
  }
  if (count === 0) {
    return false;
  }
  return true;
};
/* 순위 1~10 랭크 업데이트 */
rank.updateRanks = function () {
  var keys = Object.keys(this.timeRank);
  if (keys.length < 10) {
    var past_time = (this.finishTime - this.startTime)/1000;
    var name = prompt('당신의 이름은 무엇입니까?');
    this.addRank(past_time, name);
  } else {
    keys.sort();
    if (this.isRanked(past_time, keys)) {
      var past_time = this.finishTime - this.startTime;
      var name = prompt('당신의 이름은 무엇입니까?');
      this.removeRank(keys[keys.lengh-1]);
      this.addRank(past_time, name);
    }
  }
};
/* 랭크 결과 출력 */
rank.displayRanks = function () {
  var keys = Object.keys(this.timeRank);
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    document.getElementById('rank').innerHTML += (i+1) + '위  -  이름 : ' + this.timeRank[keys[i]] + '  -  소요시간 : ' + keys[i] + '초<br>';
  }
  game.removeButtons();
  document.getElementById('check').innerHTML = '';
  document.getElementById('output2').innerHTML = '';
  document.getElementById('time').innerHTML = '';
};

///////////////////////////////////////////////////////////////////////////////

game.main = function () {
  document.getElementById('check').innerHTML = '';
  document.getElementById('output2').innerHTML = '';
  document.getElementById('time').innerHTML = '';
  document.getElementById('rank').innerHTML = '';
  game.finishPlay = 0;
  /* 게임 시작할 때 시간 측정 */
  rank.startTime = Date.now();
  /* 게임중 경과시간 지속 출력 시작 */
  rank.displayTimes();
  // 퍼즐 게임 실행
  game.initialize();
};

game.main();
