import '../css/style.css';

/**
 * Toggles the class for playing/stopping the spinner animation.
 * @param {*} event
 */
const onChangeAnimate = (event) => {
  const spinner = document.getElementById('spinner_secondary_circle');
  if (event.target.checked) {
    spinner.classList.add('svg-animate');
  } else {
    spinner.classList.remove('svg-animate');
  }
};

/**
 * Toggles the class for hiding/showing the spinner.
 * @param {*} event
 */
const onChangeHide = (event) => {
  const spinner = document.getElementById('svg');
  if (event.target.checked) {
    spinner.classList.add('svg-hide');
  } else {
    spinner.classList.remove('svg-hide');
  }
};

/**
 * Changes the fill percentage of the spinner
 * @param {*} event 
 */
const onChangeValue = (event) => {
  if (event.target.value > 100) event.target.value = 100;
  if (event.target.value < 0) event.target.value = 0;
  if (!/^[0-9]+$/.test(event.target.value)) event.target.value = 0;
  setSpinnerProperty(event.target.value);
};

/**
 * Changes the properties of the spinner element to display the desired percentage
 * @param {Number} percent значение от 0 до 100
 */
const setSpinnerProperty = (percent) => {
  const spinnerElMain = document.getElementById('spinner_main_circle');
  const spinnerElMainRadius = spinnerElMain.getAttribute('r');

  const spinnerEl = document.getElementById('spinner_secondary_circle');
  const spinnerElRadius = spinnerEl.getAttribute('r');
  
  if (spinnerElMainRadius !== spinnerElRadius) {
    spinnerEl.setAttribute('r', spinnerElMainRadius);
  }

  const actualPerimeterCircle = 2 * Math.PI * spinnerElMain.r.baseVal.value;

  const valueCalc = actualPerimeterCircle - (actualPerimeterCircle * percent / 100);

  const spinner = document.getElementById('spinner_secondary_circle');
  spinner.style.setProperty('--circle-perimeter', actualPerimeterCircle);
  spinner.style.setProperty('--current-circle-perimeter', valueCalc);
};

window.onload = () => {
  const percentEl = document.getElementById('change-percent');
  const switchAnimateEl = document.getElementById('switch-animate');
  const switchHideEl = document.getElementById('switch-hide');

  setSpinnerProperty(percentEl.value);

  percentEl.addEventListener('change', onChangeValue);

  percentEl.addEventListener('click', (e) => {
    e.target.select();
  });

  switchAnimateEl.addEventListener('click', onChangeAnimate);

  switchHideEl.addEventListener('click', onChangeHide);
};