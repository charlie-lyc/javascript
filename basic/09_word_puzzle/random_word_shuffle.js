// 10개의 단어들을 포함하는 배열
var words = ['hello', 'world', 'inflearn', 'code', 'squad', 'hypertext', 'stylesheet', 'javascript', 'nodejs', 'reactjs'];

// *** 배열'array'의 임의의 인덱스를 얻는 함수 ***
var randomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// 문자열에서 문자들의 위치를 임의로 배치하게 위해 필요한 배열 조작을 위한 함수들
var reverseArray = function (array) {
  var result = array.reverse();
  return result;
};
var rotateArrayL = function (array) {
  array.push(array.shift());
  return array;
};
var rotateArrayR = function (array) {
  array.unshift(array.pop());
  return array;
};

/* 주어진 문자열을 문자들의 배열로 바꾸고, 각 문자들의 위치를 reverse 또는 rotate
  개념을 적용하여 임의로 재배치(임의의 횟수 만큼 reverse 또는 rotate 실행)한 뒤,
  그 배열을 반환하는 함수 */
var randomShift = function (string) {
  var chars = string.split('');
  // '1/2'의 확률로 뒤집기가 발생하는 알고리즘
  var toggle = Math.floor(Math.random() * 2);
  if (toggle) {
    chars = reverseArray(chars);
  }
  // '1 ~ (문자열길이-1)'회 밀어내기가 발생하는 알고리즘 
  var shuffle = Math.ceil(Math.random() * (chars.length-1));
  for (let i = 0; i < shuffle; i++) {
    chars = rotateArrayL(chars);
  }
  return chars;
};

////////////////////////////////////////////////////////////////////////////////

// 실행 코드 1: randomIndex 함수를 이용하여 임의로 단어를 선택하고, 메모리에 최초 저장
var str1 = words[randomIndex(words)];

// 실행 코드 2: randomShift 함수를 이용해 문자들의 위치를 바꾸고, 문자들을 각각 한개의 버튼에 할당하여 웹페이지에 출력
var chars = randomShift(str1);
for (let i = 0; i < chars.length; i++) {
  let char_btn = document.createElement('button');
  char_btn.id = 'charBtn' + i;
  document.getElementById('output1').appendChild(char_btn);
  document.getElementById('charBtn' + i).innerHTML = chars[i];
}

// 생성된 문자별 버튼의 문자들을 모아 배열로 반환 하는 함수
var getChars = function () {
  var btns = document.getElementById('output1').getElementsByTagName('button');
  var chars = [];
  for (let i = 0; i < btns.length; i++) {
    let char = document.getElementById('charBtn' + i).innerHTML;
    chars.push(char);
  }
  return chars;
};

// 입력된 문자열과 배치된 버튼들의 문자들 간의 일치 여부를 출력하는 함수
var isIdenfied = function () {
  var chars = getChars();
  var str2 = chars.join('');
  if (str1 === str2) {
    document.getElementById('output2').innerHTML = '일치합니다!!!';
  } else {
    document.getElementById('output2').innerHTML = '일치하지 않습니다.';
  }
};

// reverseBtn 버튼의 함수 : 생성된 문자별 버튼을 반대로 뒤집는다.
var reverseBtns = function () {
  var chars = getChars();
  var rev_chars = reverseArray(chars);
  for (let i = 0; i < rev_chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = rev_chars[i];
  }
  isIdenfied();
};

// rotateBtnL 버튼의 함수 : 문자별 버튼 중 첫번째 버튼을 제일 뒤로 옮긴다. 왼쪽으로 밀어내기.
var rotateBtnsL = function () {
  var chars = getChars();
  chars = rotateArrayL(chars);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  isIdenfied();
};

// rotateBtnR 버튼의 함수 : 문자별 버튼 중 마지막 버튼을 제일 앞으로 옮긴다. 오른쪽으로 밀어내기.
var rotateBtnsR = function () {
  var chars = getChars();
  chars = rotateArrayR(chars);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  isIdenfied();
};
