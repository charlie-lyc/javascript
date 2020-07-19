console.log('Hello')
document.write('<h2>', "This is 'h2' heaging.", '</h2>')

// <h1>This is a heading</h1> 컨텐츠 바꾸기
var list = document.getElementsByTagName('h1');
list[0].innerHTML = "Hello";

// <p id='main'>This is a paragraph.</p> 컨텐츠 바꾸기
var p = document.getElementById('main');
p.innerHTML = "World";
