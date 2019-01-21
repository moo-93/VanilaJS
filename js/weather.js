const weather = document.querySelector(".js-weather"); 
const API_KEY = '68b6991405ffcc95d738f927e2f49be7';
const COORDS = 'coords'; //coordinate : 좌표(중세 라틴어)

function getWeather(lat, lng){
    // By geographic coordinates
    // fetch()는 jQuery.ajax()와 유사한 비동기 네트워크 통신을 한다.
    // jQuery.ajax()와 다른 점
    //  1. jQeury.ajax()와는 다르게 HTTP error 상태를 reject하지 않는다.
    //     대신 ok 상태가 false가 반환되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환된다.
    //  2. fetch는 쿠키를 보내거나 받지 않는다. 따라서 사이트에서 사용자 세션을 유지 관리해야 하는 경우
    //     인증 되지 않는 요청이 발생한다. 쿠키를 전송하기 위해서는 credentials(자격증명) 옵션을 설정하자.
    //     https://yuddomack.tistory.com/entry/RESTful-API%EC%97%90-Express-Session-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0 참고
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ // fetch가 다 진행 된 후 다음 함수 실행(then)
        return response.json(); // response중 json 형식으로 지정된 json 응답을 보낸다.
    }).then(function(json){ // response에 대한 pendding이 끝났으면 다음 함수 실행(then)
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    // 주의 then() 함수를 사용하지 않을경우 오류를 발생 할 수 있음!
    // 위에 사용된 fetch()나 json()이 완료되지 않고 다음 구문을 진행하는 경우가 있음!
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) { //좌표값 저장
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 객체의 키와 값이 같으면 다음과 같이 쓸 수 있다.
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleHeoError() {
    console.log('위치를 알 수 없습니다.');
}

function askForCoords() {
    // navigator 객체의 geolocation 프로퍼티를 이용하여 현재위치에 관한 data를 받는다.
    navigator.geolocation.getCurrentPosition(
        handleGeoSucces, handleHeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();