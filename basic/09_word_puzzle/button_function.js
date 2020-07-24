
// 최초 입력된 문자열을 저장하기 위함 메모리 할당
var str1;

// inputBtn 버튼의 함수 : 입력된 문자열을 문자별로 나누어 버튼을 생성한다.
var makeBtns = function () {
  str1 = document.getElementById('input').value;
  document.getElementById('input').value = '';
  var chars = str1.split('');
  for (let i = 0; i < chars.length; i++) {
    let char_btn = document.createElement('button');
    char_btn.id = 'charBtn' + i;
    document.getElementById('output1').appendChild(char_btn);
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
};

// 생성된 문자별 버튼의 문자값을 모아 배열로 반환 하는 함수
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
  var rev_chars = chars.reverse();
  for (let i = 0; i < rev_chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = rev_chars[i];
  }
  isIdenfied();
};

// rotateBtnL 버튼의 함수 : 문자별 버튼 중 첫번째 버튼을 제일 뒤로 옮긴다. 왼쪽으로 밀어내기.
var rotateBtnsL = function () {
  var chars = getChars();
  var shifted_char = chars.shift();
  chars.push(shifted_char);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  isIdenfied();
};

// rotateBtnR 버튼의 함수 : 문자별 버튼 중 마지막 버튼을 제일 앞으로 옮긴다. 오른쪽으로 밀어내기.
var rotateBtnsR = function () {
  var chars = getChars();
  var popped_char = chars.pop();
  chars.unshift(popped_char);
  for (let i = 0; i < chars.length; i++) {
    document.getElementById('charBtn' + i).innerHTML = chars[i];
  }
  isIdenfied();
};
