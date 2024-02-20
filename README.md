<img width="80" alt="img_logo" src="https://github.com/k-wisdom/Todo/assets/122950644/57ad0a27-0c6b-401e-8202-dba7180c6b76">


# 식물을 키우는 TodoList
리액트의 상태 관리에 대해 공부하고자 제작한 사이트입니다.  
오늘의집의 "오늘의 가든", 올웨이즈의 "올팜" 같은 작물이나 식물키우는 시스템에 아이디어를 얻어 비슷하게 구현해보았습니다.  
json-server 라이브러리를 사용해 Mock API를 생성해 회원가입과 로그인, 식물 정보, Todolist를 구현했습니다.
<br/><br/><br/>
<b>요약</b>  
- json-server를 사용한 로그인, 회원가입 페이지 구현
- 식물 물주기, 영양제 주기 버튼 클릭 시 모션 제작
- Redux-toolkit을 활용한 식물 및 TodoList 상태 관리
- useCallback을 사용해서 함수 메모이제이션

<br/><br/><br/>
## 기술 및 사용 라이브러리 
React.js  
Typescript  
Redux-toolkit  
styled-component  
json-server & json-server-auth  
react-router-dom  
EsLint  
Prettier

<br/><br/><br/>
  
## 프로젝트 실행 방법
```
$ npm install
$ npm run server      // json-server-auth 실행  
$ npm run start       // react 실행
```
<br/><br/>
[테스트 계정]  
email : test@test.com  
password : qwer1234@@  

(회원가입 후 테스트도 가능합니다.)
  
<br/><br/><br/>

## 프로젝트 구조 
📦src  
 ┣ 📂assets              //  css파일과 image파일이 들어있습니다.  
 ┣ 📂components           //  재사용가능한 컴포넌트들을 분류했습니다.    
 ┃ ┣ 📂buttons  
 ┃ ┣ 📂frame  
 ┃ ┣ 📂items  
 ┃ ┣ 📂layout  
 ┃ ┣ 📂popup  
 ┃ ┣ 📂styles  
 ┣ 📂db                //  회원가입, 로그인 시 MockData를 생성해서 db.json에 저장했습니다.  
 ┃ ┗ 📜db.json  
 ┣ 📂group  
 ┃ ┣ 📂plantCard  
 ┃ ┗ 📂todoList  
 ┣ 📂pages  
 ┃ ┣ 📜Home.tsx  
 ┃ ┣ 📜MyPlants.tsx  
 ┃ ┣ 📜NotFound.tsx  
 ┃ ┣ 📜SelectPlant.tsx  
 ┃ ┣ 📜SignIn.tsx  
 ┃ ┣ 📜SignUp.tsx  
 ┃ ┗ 📜index.tsx  
 ┣ 📂store  
 ┃ ┣ 📜index.tsx  
 ┃ ┣ 📜plantsSlice.tsx  
 ┃ ┗ 📜todoSlice.tsx  
 ┣ 📂styles              //  css-in-js 방식으로 공용으로 사용하거나, 페이지별로 사용되는 스타일 컴포넌트가 있습니다.  
 ┣ 📂utils               //  util이 들어있는 폴더입니다.   
 ┃ ┣ 📜API.tsx  
 ┃ ┣ 📜Constant.ts  
 ┃ ┗ 📜utils.tsx  
 ┣ 📜App.css  
 ┣ 📜App.tsx  
 ┣ 📜index.tsx  
<br/><br/><br/>

## 페이지 구성
### 로그인 & 회원가입
![page_signin](https://github.com/k-wisdom/Todo/assets/122950644/b4e5954a-7ddd-4697-9eb1-fa7997a48291)

<b>로그인(/signin)</b>
- 이메일과 비밀번호 입력 시 로그인 버튼 활성화
- json-server-auth 라이브러리를 사용
  - './login' API 호출 시 자동으로 회원 가입된 정보 체크 후 로그인
  - response data로 JWT토큰 전달
- localStorage에 JWT토큰과 사용자 이름 저장



<b>회원가입(/signup)</b>
- 이름, 이메일, 비밀번호, 회원가입 버튼이 있는 폼 형태
- input의 onChange 이벤트가 들어올 때마다 정규식을 사용한 유효성 검사를 실행하여 폼 하단에 에러 메세지를 표시
  - 이름 : 문자만 허용
  - 이메일 : 이메일 형식
  - 비밀번호 : 8자 이상의 대소문자, 숫자, 특수문자
```
const regex = {
  name: /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  password:
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])[a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]{8,}$/
};
```

 <hr/> 
App.tsx의 Route를 AuthLayout과 NotAuthLayout으로 구분하여  
로그인이 필요한 서비스와 로그인 후 접근이 제한되는 페이지를 분류하여 로그인 여부에 따라 올바른 페이지로 리다이렉트 처리할 수 있게 작업했습니다. 


<br/><br/>
### 식물 선택 페이지(/selectPlant)
![page_selectPlant](https://github.com/k-wisdom/Todo/assets/122950644/bb9ce4e3-72e3-4551-8418-8a5656b0f93f)
1. 회원가입 후 로그인 첫 진입 시 노출
2. 기존 식물을 성장 완료 시킨 경우 다시 식물을 선택할 수 있도록 진입
3. 식물 선택 후 이름 짓기를 통해 등록

<br/>
<br/>

### 홈(/)  

- localStorage에 저장된 사용자 이름을 가져와서 환영 메세지 적용
- 식물 기르기 섹션과 TodoList 섹션으로 구성

  <b>식물기르기</b>
  ![section_plant](https://github.com/k-wisdom/Todo/assets/122950644/95d16b08-bca4-4457-b3f4-6778f690be17)
  - 영양제 주기, 물 주기 시 모션 적용
    - ❗️이슈사항 : 버튼을 연속으로 클릭하면 해당 모션이 중첩되고 자연스럽지 않은 현상
    - 💡해결 : 쓰로틀링(throttle)기법을 사용해 해결, 모션이 동작 중(1000ms)에는 버튼 클릭 시 return 처리
  - 이름 변경 기능 추가
  - 레벨업 시 보상 팝업 노출
  <br/>
  
  ![code_plant](https://github.com/k-wisdom/Todo/assets/122950644/1af2d01f-d030-4467-b293-852b54c3f4c5)
  Redux-toolkit의 createAsyncThunk를 사용해 비동기적으로 서버로 부터 데이터를 가져와서 상태에 저장

  <br/>
  <br/>
  <b>TodoList</b>

  ![section_todo](https://github.com/k-wisdom/Todo/assets/122950644/389692d2-88d1-42c6-9eee-89d681c761e8)

<br/><br/><br/>

### 나의 식물(/myPlants)  

- 성장 완료된 식물 표시
  ![page_myPlants](https://github.com/k-wisdom/Todo/assets/122950644/8515a30c-d244-4688-a96b-8eec4dbc710e)

<br/>
<br/>

## 개선사항  

### Lighthouse
<b>개선 전</b>
<br/>
<img width="549" alt="lighthouse_v1" src="https://github.com/k-wisdom/Todo/assets/122950644/d2637720-8466-4da1-8d38-3c22dfbcff79">  
<br/>
[Accessibility]  
- ❗️이슈사항 : Form elements do not have associated labels  
  - Labels ensure that form controls are announced properly by assistive technologies, like screen readers  
  - 💡해결 : checkbox의 label, input 올바르게 설정  

  
```
  <CheckBox>
    <input
      type="checkbox"
      id={inputId}
      className="hide"
      defaultChecked={isChecked}
      onChange={(e) => onChange(e)}
      disabled={getReward}
    />
    <label htmlFor={inputId}>{text}</label>
  </CheckBox>
```  

- ❗️이슈사항 : Background and foreground colors do not have a sufficient contrast ratio.  
  - 전반적인 메인 컬러 변경 필요하므로 보류  

[SEO]  

- ❗️이슈사항 : Document does not have a meta description
  - 💡해결 : 메타태그 추가
```
  <meta name="description" content="todoList를 완료하여 보상을 얻고 식물을 키워보세요."/>
```

#### 개선 후  
<img width="542" alt="lighthouse_v2" src="https://github.com/k-wisdom/Todo/assets/122950644/6f806fa6-1e26-40a9-89b8-98ec9a348461">  
<br/><br/>

### 성능개선  


![section_todo_before](https://github.com/k-wisdom/Todo/assets/122950644/5921a21e-2a65-4a4e-bf66-fad616e3608d)


❗️이슈사항 : TodoList의 list 상태 업데이트 시 전체 리스트 항목 리렌더링 현상
💡해결  
1. React.memo 사용
   - Todo.tsx의 Todo를 React memo를 통해 컴포넌트 메모이제이션
   - 전달받은 Props의 값의 변화에 따라 리렌더링 하도록 처리
   - ❗️이슈사항 : React.memo를 사용했지만 전체 리스트의 리렌더링 발생
   - ❓원인 파악 : 부모 컴포넌트(TodoList)에서 자식컴포넌트(Todo)로 전달되는 handleChange와 같은 함수의 업데이트 문제
       - 함수는 컴포넌트가 리렌더링 될 때마다 기본적으로 새로 생성
       - memo한 Todo 컴포넌트에 전달되는 함수가 기존의 함수와 다른 값으로 취급되기 때문에 Todo 컴포넌트 리렌더링 발생
   - 💡해결 : React의 useCallback hook을 사용해 함수 메모이제이션

결과<br/>
![section_todo_next](https://github.com/k-wisdom/Todo/assets/122950644/a1dfce4d-82bd-4f73-9af5-a9a130164623)   
특정 리스트만 렌더링 발생  

<br/><br/><br/>
### 회고
Redux-toolkit을 통해 상태 관리를 해보는 경험이 되었지만 보다 구체적인 학습을 통하여 코드 리팩토링이 필요할 것으로 보인다.  
TodoList의 리스트 전체 리렌더링 현상을 개선하면서 개념만 알고 있던 useCallback을 사용해볼 수 있었고 함수는 컴포넌트가 리렌더링 될 때마다 기본적으로 새로 생성된다는 개념에 대해 다시 숙지할 수 있는 계기가 되었다.
역시 이론적으로 학습하는 것보다 직접 문제 사항을 마주하고 해결하며 실행해 보면서 숙지하는 것이 더 기억에 남고 더 이해되는 것 같다.  
json-sever를 통해 만들었지만 추후 백엔드 개발에 대해 공부해 볼 기회가 된다면, 이 프로젝트의 실제 API를 만들고 DataBase를 구축하여 실제 운영되는 웹 사이트로 만들어 보는 것도 도움이 될 것으로 보인다.



