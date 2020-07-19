// 메뉴 추가하기 in JS
var menu_div = document.getElementById('test');
var menu = document.createElement('ul');

var item1 = document.createElement('li');
item1.innerHTML = '설렁탕';
menu.appendChild(item1);
menu_div.appendChild(menu);

var item2 = document.createElement('li');
item2.innerHTML = '추어탕';
menu.appendChild(item2);

// 사용자입력 추가하기 in js
var input1 = document.createElement('input');
input1.id = 'input1';
input1.type= 'text';
menu_div.appendChild(input1);

var readInput = function() {
  var input = document.getElementById('input1');
  console.log(input.value)
};

// 버튼 추가하기 in JS
var btn1 = document.createElement('button');
btn1.onclick = readInput;
btn1.id = 'btn1';
btn1.innerHTML = '확인';
menu_div.appendChild(btn1);
