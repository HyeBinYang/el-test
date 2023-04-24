# 과제 테스트

## 이름

양혜빈

## 프로젝트 구동 방법

```zsh
npm install // node package install
npm start // react start
```

기본 포트 값은 3000번 입니다.

## 기능 설명
### 1. 차트 페이지 (/chart)

<img width="1440" alt="스크린샷 2023-04-25 오전 5 54 14" src="https://user-images.githubusercontent.com/60453738/234115318-82e16051-3420-455f-b7e3-2ae9f007bd5e.png">

- 최초로 렌더링 했을 때는 랭킹순으로 정렬되어있습니다.
- 오름차순 or 내림차순 버튼을 클릭하면 해당 방식으로 정렬됩니다.
- 해당 곡을 클릭하면 상세 페이지로 이동됩니다.
- 검색기능은 노래제목에 해당 문자열이 포함되면 검색됩니다.
- 빈 칸으로 검색하면 전체 값이 나옵니다.

### 2. 상세 페이지 (/detail/:id)

<img width="1440" alt="스크린샷 2023-04-25 오전 5 54 18" src="https://user-images.githubusercontent.com/60453738/234115284-5f5ee19f-a98f-4865-83d3-fc0aab96a72a.png">

- 해당 데이터에 대한 정보를 렌더링합니다.
- 엘범 사진을 클릭하면 해당 엘범정보의 apple music 사이트로 이동됩니다.
- 가수 이름을 클릭하면 해당 가수정보의 apple music 사이트로 이동됩니다.
- 가수 이름에 대한 링크가 없으면 클릭이 안됩니다.
