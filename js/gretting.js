const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    let MAE = new String();
    MAE = clockContainer.innerText;
    if(MAE.substr(0,2) >= 12){
        greeting.innerText = `Good afternoon ${text}`;
    } else if(MAE.sub(0,2) >= 18){
        greeting.innerText = `Good evening ${text}`;
    } else {
        greeting.innerText = `Good morning ${text}`;
    }
    
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // 유저가 없는경우
        askForName();
    } else{
        // 있는 경우
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();