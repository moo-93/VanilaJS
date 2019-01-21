const API_KEY = '68b6991405ffcc95d738f927e2f49be7';
const COORDS = 'coords'; //coordinate : 좌표(중세 라틴어)

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
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCoords();
    } else {
        // getWeather
    }
}

function init() {
    loadCoords();
}

init();