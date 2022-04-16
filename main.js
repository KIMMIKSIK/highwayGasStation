//식별자 모음
let menuButton = document.querySelector(".menu-button");
let xButton = document.querySelector(".fa-xmark");
let underLine = document.getElementById("under-line");
let sideButton = document.querySelectorAll(".hidden-list button");
let data = {};
let adCombi = document.getElementById("ad-button");
let apiList = "";
let oilCard = document.querySelectorAll(".oil-card .card");
let oilCompanyButton = document.querySelectorAll(".oilCompany-btn .oil-btn");
let pagination = document.getElementById("pagination");
let input = document.querySelector(".input");
let sideInput = document.querySelector(".input2");
let mainRoute = document.getElementById("main-route");
let mainDir = document.getElementById("main-dir");
let subRoute = document.getElementById("sub-route");
let subDir = document.getElementById("sub-dir");
let oilId = "S";
let page = 1;
let totalPage = "";
let countRow = 0;
// let routeName = ''
let searchSomeEnter = false;
let routeOrDirName = "";
let clickOilCompany = true;
let clickOilCompanyPage = "";

//api요청
let goGetOil = async (i) => {
  // searchSomeEnter 오일회사 버튼과 노선명,방향 버튼을 번갈아 눌러도 겹치지 않도록 하기 위한 변수
  searchSomeEnter = false;
  let url;
  page = i;
  if (clickOilCompany == true) {
    url = new URL(
      `http://data.ex.co.kr/openapi/business/curStateStation?key=0502293500&type=json&oilCompany=${oilId}&numOfRows=8&pageNo=${page}`
    );

    clickOilCompany = false;

    //기름회사 클릭후 검색하고 다시 회사버튼 클릭할때 페이지네이션에서도 잘 작동하기 위해서 만듬 다시 검색을 하게된다면 clickOilCompanyPage=''으로 reset됨
    clickOilCompanyPage += "a";
  } else {
    if (routeOrDirName == "Route") {
      url = new URL(
        `http://data.ex.co.kr/openapi/business/curStateStation?key=0502293500&type=json&numOfRows=8&pageNo=${page}&routeName=${
          sideInput.value.length > 0 ? sideInput.value : input.value
        }`
      );
    } else {
      url = new URL(
        `http://data.ex.co.kr/openapi/business/curStateStation?key=0502293500&type=json&numOfRows=8&pageNo=${page}&direction=${
          sideInput.value.length > 0 ? sideInput.value : input.value
        }`
      );
    }
    searchSomeEnter = true;
    clickOilCompanyPage = "";
  }

  let response = await fetch(url);
  data = await response.json();
  console.log(response);
  console.log("data는", data);

  page = data.pageNo;
  totalPage = data.pageSize;
  apiList = data.list;
  console.log("apiList는", apiList);
  render();

  paginationRender();
};

//API요청함수 실행
goGetOil(page);

//함수 모음
const hidden = () => {
  document.getElementById("hidden-menu").style.width = "250px";
};
const close = () => {
  document.getElementById("hidden-menu").style.width = "0px";
};
const sideClick = () => {
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
  underLine.style.left = event.currentTarget.offsetX + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
};
let render = () => {
  let list = apiList;
  let apiHTML = "";
  let count = 0;
  console.log("list는", list);

  for (let i = 0; i < list.length; i++) {
    if (list[i].routeName == "" || list[i].routeName == null) {
      list[i].routeName = "일반도로";
    }
    if (list[i].serviceAreaName == "" || list[i].serviceAreaName == null) {
      list[i].serviceAreaName = "미등록";
    }
    if (searchSomeEnter == true) {
      apiHTML += `<div id="api-body">
  <div id="content-title">
    ${
      list[i].oilCompany == "S" ? "S-OIL" : list[i].oilCompany
    } &nbsp <span id="oilcompany-name">주유소명:${
        list[i].serviceAreaName
      }</span>
  </div>
  <div class="content-info">
<span>노선명: ${list[i].routeName}<br>방향: ${
        list[i].direction
      } <br>전화번호: <br>${list[i].telNo} </span> 
    <span class="oil-price row">
      휘발유:${list[i].gasolinePrice}<br> 경유:${list[i].diselPrice}<br> LPG:${
        list[i].lpgPrice
      }, LPG여부: ${list[i].lpgYn}
    </span>
  </div>
  </div>`;
      count++;
    } else {
      if (list[i].oilCompany === oilId) {
        apiHTML += `<div id="api-body">
  <div id="content-title">
    ${
      list[i].oilCompany == "S" ? "S-OIL" : list[i].oilCompany
    } &nbsp <span id="oilcompany-name">주유소명:${
          list[i].serviceAreaName
        }</span>
  </div>
  <div class="content-info">
<span>노선명: ${list[i].routeName}<br>방향: ${
          list[i].direction
        } <br>전화번호: <br>${list[i].telNo} </span> 
    <span class="oil-price row">
      휘발유:${list[i].gasolinePrice}<br> 경유:${list[i].diselPrice}<br> LPG:${
          list[i].lpgPrice
        }, LPG여부: ${list[i].lpgYn}
    </span>
  </div>
  </div>`;
        count++;
      }
    }
  }

  console.log("count는", count);
  countRow = count;

  if (list.length == 0 || list.length == null || countRow == 0) {
    apiHTML = `<div id="api-body">  <div id="content-title">해당 
페이지에는 내용이 없습니다.<br> 아래 보이는 페이지를 선택해 이동해주세요</div></div>`;
  }
  document.getElementById("content-body").innerHTML = apiHTML;
};

let paginationRender = () => {
  if (clickOilCompanyPage.length >= 1) {
    clickOilCompany = true;
  }

  let pageGroup = Math.ceil(page / 3);
  let last = pageGroup * 3;
  let first = last - 2;

  if (first < 1) {
    first == 1;
  }
  let pagiHTML = "";

  if (pageGroup != 1) {
    pagiHTML += `<li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick="goGetOil(${1})">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
   <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick="goGetOil(${
        page - 1
      })">
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>`;
  }
  for (let i = first; i <= last; i++) {
    if (i <= totalPage) {
      pagiHTML += `<li class="page-item ${
        page == i ? "active" : ""
      }"><a class="page-link"  href="#" onclick="goGetOil(${i})">${i}</a></li>`;
    }
  }
  if (last < totalPage && countRow >= 8) {
    pagiHTML += `<li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick="goGetOil(${
        page + 1
      })">
        <span aria-hidden="true">&gt;</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick="goGetOil(${totalPage})">
        <span aria-hidden="true">	
&raquo;</span>
      </a>
    </li>`;
  }
  pagination.innerHTML = pagiHTML;
};

let choiceCompany = (e) => {
  clickOilCompany = true;
  if (e.currentTarget.id == "ad-button") {
    oilId = "AD";
  } else {
    oilId = e.currentTarget.id;
  }

  console.log("id는", oilId);
  console.log(oilCard);

  goGetOil(page);
};

const valueReset = (e) => {
  e.target.value = "";
};

const goSearch = (e) => {
  clickOilCompany = false;
  routeOrDirName = e.target.textContent;

  goGetOil(page);
};

//이벤트 모음

oilCard.forEach((item) => {
  item.addEventListener("click", choiceCompany);
});
oilCompanyButton.forEach((item) => {
  item.addEventListener("click", choiceCompany);
});
adCombi.addEventListener("click", choiceCompany);
menuButton.addEventListener("click", hidden);
input.addEventListener("click", valueReset);
sideInput.addEventListener("click", valueReset);
xButton.addEventListener("click", close);
sideButton.forEach((item) => {
  item.addEventListener("click", sideClick);
});
mainRoute.addEventListener("click", goSearch);
mainDir.addEventListener("click", goSearch);
subRoute.addEventListener("click", goSearch);
subDir.addEventListener("click", goSearch);
