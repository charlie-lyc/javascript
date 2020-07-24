// input 객체 생성
var input = {};
// 속성 생성
input.words = ['hello', 'world', 'inflearn', 'code', 'squad', 'hypertext', 'stylesheet', 'javascript', 'nodejs', 'reactjs'];
// 메소드 생성
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

// game 객체 생성
var game = {};
// 속성 생성 : 선언 및 초기화
game.word = '';
game.maxPlay = 3;
game.finishPlay = 0;
// 메소드 생성
game.makeButtons = function (string) {
  var chars = input.randomShift(string);
  for (let i = 0; i < chars.length; i++) {
    let char_btn = document.createElement('button');
    char_btn.id = 'charBtn' + i;
    document.getElementById('output1').appendChild(char_btn);
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  /*** Hoisting : 자바스크립트의 파워!!! ***/
  this.isIdenfied();
};
/* 생성된 버튼들을 제거하는 메소드 추가 */
game.removeButtons = function () {
  var btns = document.getElementById('output1').getElementsByTagName('button');
  var length = btns.length;
  for (let i = 0; i < length; i++) {
    let char_btn = document.getElementById('charBtn' + i);
    document.getElementById('output1').removeChild(char_btn);
  }
};
/* 새로운 게임을 위해 초기화 하는 메소드 추가 */
game.initialize = function () {
  this.word = input.getRandomWord(input.words);
  this.removeButtons();
  this.makeButtons(this.word);
};
/* 완료한 게임의 횟수에 따라 각각의 상태를 출력하는 메소드 추가 */
game.checkProgress = function () {
  if (this.finishPlay === 1) {
    document.getElementById('check').innerHTML = ' O ';
  } else if (this.finishPlay === 2) {
    document.getElementById('check').innerHTML = ' O O ';
  } else if (this.finishPlay === this.maxPlay) {
    document.getElementById('check').innerHTML = 'Good! Thank you for playing! Reload to play more.';
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
/* 기본적으로 일치 여부를 출력한다.
  추가적으로 일치할때 마다 'O'를 출력하고 새로운 게임을 시작한다.
  세번 맞추면 지정된 문자열 출력하고 새로운 게임은 시작하지 않는다. */
game.isIdenfied = function () {
  var chars = this.getChars();
  var str = chars.join('');
  if (this.word === str) {
    document.getElementById('output2').innerHTML = '일치합니다!!!';
    this.finishPlay ++;
    this.checkProgress();
    if (this.finishPlay === this.maxPlay) {
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

// 퍼즐 게임 실행
game.initialize();
