//식별자 모음
let menuButton = document.querySelector(".menu-button");
let xButton = document.querySelector(".fa-xmark");
let underLine = document.getElementById("under-line");
let sideButton = document.querySelectorAll(".hidden-list button");
let data = {};
let apiList = "";

//api요청
let goGetOil = async () => {
  let url = new URL(
    "http://data.ex.co.kr/openapi/business/curStateStation?key=0502293500&type=json&oilCompany=AD&numOfRows=10&pageNo=1"
  );

  let response = await fetch(url);
  data = await response.json();
  console.log(response);
  console.log(data);
  apiList = data.list;
  console.log(apiList);
  render();
};
//요청함수 실행
goGetOil();

//함수 모음
let hidden = () => {
  document.getElementById("hidden-menu").style.width = "250px";
};
let close = () => {
  document.getElementById("hidden-menu").style.width = "0px";
};
let sideClick = () => {
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
  underLine.style.left = event.currentTarget.offsetX + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
};
let render = () => {
  let list = apiList;
  let apiHTML = "";
  console.log("list는", list);

  for (let i = 0; i < list.length; i++) {
    if (list[i].routeName == "" || list[i].routeName == null) {
      list[i].routeName = "일반도로";
    }

    apiHTML += `<div id="api-body">
  <div id="content-title">
    ${list[i].oilCompany}
  </div>
  <div class="content-info">
 <span>노선명: ${list[i].routeName}<br>방향: ${list[i].direction} <br>전화번호: <br>010-8585-7999 </span> 
    <span class="oil-price row">
      휘발유:${list[i].gasolinePrice}<br> 경유:${list[i].diselPrice}<br> LPG:${list[i].lpgPrice}, LPG여부: ${list[i].lpgYn}
    </span>
  </div>
  </div>`;
  }
  document.getElementById("content-body").innerHTML = apiHTML;
};

//이벤트 모음
menuButton.addEventListener("click", hidden);
xButton.addEventListener("click", close);
sideButton.forEach((item) => {
  item.addEventListener("click", sideClick);
});

// google.charts.load('current', {'packages':['corechart']});
//      google.charts.setOnLoadCallback(drawChart);

//      function drawChart() {

//        var data = google.visualization.arrayToDataTable([
//          ['Oil', 'Day per Price'],
//          ['고급유', 1],
//          ['휘발유',  7],
//          ['경유',  5],
//          ['등유',  4],

//        ]);

//        var options = {
//          title: 'Daily Price Trends'
//        };

//        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

//        chart.draw(data, options);
//      }
