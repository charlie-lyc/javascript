    // 사용자 입력 및 계산 결과 확인용 출력 객체 할당
    var output = document.getElementById('output');
    // 버퍼용 메모리 할당
    var str = '';

    // 버튼별 함수 할당 : 모든 버튼에 각각의 함수를 할당하는 것이 아니라,
    // 숫자와 연산자에 대해서는 '클릭'하는 "이벤트의 대상"인 태그 내의 값을 취하면 심플한 코드가 된다.
    var clickNumbers = function (event) {
      str += event.target.innerHTML;
      output.innerHTML = str;
    };
    var clickOperators = function (event) {
      str += event.target.innerHTML;
      output.innerHTML = str;
    };

    // 'Clear' 버튼 함수 할당 : 클릭하면 버퍼메모리를 비우고 '0'을 출력
    var allClear = function () {
      str = '';
      output.innerHTML = '0';
    };

    // 'Delete' 버튼 함수 할당 : 클릭하면 버퍼메모리에서 직전 입력 값을 지우고, 그 결과를 출력.
    //  만약 출력할 값이 없으면 버퍼메모리를 비우고 '0'을 출력.
    var backDelete = function () {
      var input = str.split('');
      input.pop();
      if (input.length === 0){
        str = '';
        output.innerHTML = '0';
      } else {
        str = input.join('');
        output.innerHTML = str;
      }
    };

    // 입력된 문자열로부터 숫자와 연산자들로 구성된 배열을 구하는 함수
    var getNumsOpers = function (string) {
      var characters = string.split('');
      var numsOpers = [];
      var numOper = '';
      for (var i = 0; i < characters.length; i++) {
        if (isNaN(characters[i])) {
          numsOpers.push(numOper);
          numOper = '';
          numsOpers.push(characters[i]);
        } else if (i === characters.length - 1) {
          numOper += characters[i];
          numsOpers.push(numOper);
        } else {
          numOper += characters[i];
        }
      }
      return numsOpers;
    };
    // 숫자와 연산자들로 구성된 배열을 순서대로 계산하여 결과를 구하는 함수
    var calc = function (numsOpers) {
      while (numsOpers.length >= 3) {
        var equation = numsOpers.splice(0, 3);
        if (equation[1] === '+') {
          numsOpers.unshift(Number(equation[0]) + Number(equation[2]));
        } else if (equation[1] === '-') {
          numsOpers.unshift(Number(equation[0]) - Number(equation[2]));
        } else if (equation[1] === '*') {
          numsOpers.unshift(Number(equation[0]) * Number(equation[2]));
        } else if (equation[1] === '/') {
          numsOpers.unshift(Number(equation[0]) / Number(equation[2]));
        }
      }
      return numsOpers[0];
    }
    // '=' 버튼 함수 할당 : 클릭하면 계산 결과가 출력
    var equalEnter = function () {
      // 버퍼메모리에 저장되어 있는 문자열 얻기
      var string = str;
      // 문자열을 얻은 후 버퍼메모리 비우기
      str = '';
      // 문자열로 부터 숫자와 연산자들로 구성된 배열 얻기
      var numsOpers = getNumsOpers(string);
      // (중간 확인 출력)
      console.log(numsOpers);
      // 숫자와 연산자들로 구성된 배열내의 요소들을 순서대로 계산하여 결과 얻기
      var result = calc(numsOpers);
      // 얻은 결과 출력 하기
      output.innerHTML = result;
    };
