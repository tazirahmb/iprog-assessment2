// === variable prep
const productDummyImage =
  "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Range-Desktop-LHD.jpg";
const carData = window.localStorage.getItem("car");
const parsedCarData = JSON.parse(carData);
const initCarQty = window.localStorage.getItem("qty");
let initStartDate = window.localStorage.getItem("startDate");
let initEndDate = window.localStorage.getItem("endDate");
const todayDate = luxon.DateTime.now().toISODate();
const tomorrowDate = luxon.DateTime.now().plus({ days: 1 }).toISODate();
// === form validation

const errorMessageList = {
  required: "This field is Required",
  invalidPhoneNumber: "Please input phone number between 0 to 10 digits",
  invalidEmail: "Please input valid email",
  lessThanMinDateToday: "Minimum input of today's date",
  lessThanMinDateTomorrow: "Minimum input of a day after pick up date",
};

const validationSchema = {
  firstName: { valueMissing: errorMessageList.required },
  lastName: { valueMissing: errorMessageList.required },
  phoneNumber: {
    valueMissing: errorMessageList.required,
    patternMismatch: errorMessageList.invalidPhoneNumber,
  },
  email: {
    valueMissing: errorMessageList.required,
    typeMismatch: errorMessageList.invalidEmail,
  },
  driverLicense: {
    valueMissing: errorMessageList.required,
  },
  qty: {
    valueMissing: errorMessageList.required,
  },
  startDate: {
    valueMissing: errorMessageList.required,
    rangeUnderflow: errorMessageList.lessThanMinDateToday,
  },
  endDate: {
    valueMissing: errorMessageList.required,
    rangeUnderflow: errorMessageList.lessThanMinDateTomorrow,
  },
};

// === function
function validateInput(e, inputName) {
  if (!e.currentTarget.validity.valid) {
    const inputValidity = e.currentTarget.validity;
    let errorMsg = "Invalid Input";
    if (inputValidity.valueMissing)
      errorMsg = validationSchema[inputName].valueMissing;
    else if (inputValidity.patternMismatch)
      errorMsg = validationSchema[inputName].patternMismatch;
    else if (inputValidity.typeMismatch)
      errorMsg = validationSchema[inputName].typeMismatch;
    else if (inputValidity.rangeUnderflow)
      errorMsg = validationSchema[inputName].rangeUnderflow;

    document.querySelector(
      `[name="${inputName}"] + .input__error-msg`
    ).innerHTML = errorMsg;
  } else {
    document.querySelector(
      `[name="${inputName}"] + .input__error-msg`
    ).innerHTML = "";
  }
}
function handleBlurValidate(e) {
  // e required, e validity
  const inputName = e.currentTarget.name;
  const inputElement = document.forms["reservation-form"][inputName];
  inputElement.touched = true;
  validateInput(e, inputName);
}
function handleChangeValidate(e) {
  const inputName = e.currentTarget.name;
  const inputElement = document.forms["reservation-form"][inputName];
  if (inputElement.touched) {
    validateInput(e, inputName);
  }
}
function handleCountDayDifference(startDate, endDate) {
  var end = luxon.DateTime.fromISO(endDate);
  var start = luxon.DateTime.fromISO(startDate);

  return end.diff(start, "days").as("days");
}
function setInitStartAndEndDate(startDate, endDate) {
  const _startDate =
    handleCountDayDifference(startDate, todayDate) >= 0 ? startDate : todayDate;
  const _endDate =
    handleCountDayDifference(tomorrowDate, endDate) >= 0
      ? endDate
      : tomorrowDate;

  document.getElementById("car__start-date").setAttribute("min", todayDate);
  document.getElementById("car__end-date").setAttribute("min", _startDate);
  document.getElementById("car__start-date").value = _startDate;
  document.getElementById("car__end-date").value = _endDate;
}
function countTotalPrice() {
  const carQty = parseInt(window.localStorage.getItem("qty"), 10);
  const startDate = window.localStorage.getItem("startDate");
  const endDate = window.localStorage.getItem("endDate");
  const daysTotal = handleCountDayDifference(startDate, endDate);
  const carPricePerDay = parseInt(parsedCarData.price, 10);
  console.log(daysTotal);
  let totalPrice = carQty * daysTotal * carPricePerDay;
  if (isNaN(totalPrice)) totalPrice = "-";
  document.getElementById("car__total-price").innerHTML = totalPrice;
}
function handleUpdateQtyInput(currentQty) {
  const parsedCurrentQty = parseInt(currentQty, 10);

  document.getElementById("car__qty").value = parsedCurrentQty;
  if (parsedCurrentQty <= 1)
    document
      .querySelector(".cart-item__count__button-min")
      .setAttribute("disabled", "");
  else
    document
      .querySelector(".cart-item__count__button-min")
      .removeAttribute("disabled");

  if (parsedCurrentQty >= parseInt(parsedCarData.stock, 10))
    document
      .querySelector(".cart-item__count__button-plus")
      .setAttribute("disabled", "");
  else
    document
      .querySelector(".cart-item__count__button-plus")
      .removeAttribute("disabled");
}
function getCurrentCarQty() {
  const currentValue = document.getElementById("car__qty").value;

  return parseInt(currentValue, 10);
}
function handleQtyChange(qty) {
  let newCarQty = qty;
  const maximumStock = parseInt(parsedCarData.stock, 10);

  if (newCarQty <= 0 || isNaN(newCarQty)) newCarQty = 1;
  else if (newCarQty > maximumStock) newCarQty = maximumStock;

  window.localStorage.setItem("qty", newCarQty);

  handleUpdateQtyInput(newCarQty);
  countTotalPrice();
}
function modifyCarInputQuantity(e) {
  let newCarQty = parseInt(e.currentTarget.value, 10);

  handleQtyChange(newCarQty);
}
function addCarQuantity(e) {
  e.preventDefault();
  const newCarQty = getCurrentCarQty() + 1;

  handleQtyChange(newCarQty);
}
function reduceCarQuantity(e) {
  e.preventDefault();
  const newCarQty = getCurrentCarQty() - 1;
  handleQtyChange(newCarQty);
}
function handleStartDateChange(e) {
  handleChangeValidate(e);
  const currentStartDate = e.currentTarget.value;
  window.localStorage.setItem("startDate", currentStartDate);

  const minEndDate = luxon.DateTime.fromISO(currentStartDate).plus({ days: 1 });
  const currentEndDate = luxon.DateTime.fromISO(
    document.getElementById("car__end-date").value
  );
  let newEndDate = currentEndDate;

  if (currentEndDate.diff(minEndDate).as("days") <= 0) {
    newEndDate = minEndDate;
    window.localStorage.setItem("endDate", newEndDate.toISODate());
  }

  document.getElementById("car__end-date").value = newEndDate.toISODate();
  document
    .getElementById("car__end-date")
    .setAttribute("min", newEndDate.toISODate());
  document.getElementById("car__end-date").removeAttribute("disabled");
  countTotalPrice();
}
function handleEndDateChange(e) {
  handleChangeValidate(e);
  const currentEndDate = e.currentTarget.value;
  window.localStorage.setItem("endDate", currentEndDate);
  countTotalPrice();
}
function handleCancelReservation() {
  let confirmCancelReservation = window.confirm(
    "are you sure you want to cancel your current car reservation? This will remove all of your current reservation data."
  );

  if (confirmCancelReservation) {
    // remove localstorage
    window.localStorage.removeItem("car");
    window.localStorage.removeItem("qty");
    window.localStorage.removeItem("startDate");
    window.localStorage.removeItem("endDate");

    window.location.href = "/";
  }
}

// === set default event listener
document
  .querySelector(".cart-item__count__button-min")
  .addEventListener("click", reduceCarQuantity);
document
  .querySelector(".cart-item__count__button-plus")
  .addEventListener("click", addCarQuantity);
document
  .getElementById("reservation__cancel-reservation")
  .addEventListener("click", handleCancelReservation);

// input filter
let inputsArray = document.querySelectorAll("input");

inputsArray.forEach(function (elem) {
  elem.addEventListener("blur", handleBlurValidate);
  elem.addEventListener("input", handleChangeValidate);
});
// manually set input validation for below input
document
  .getElementById("car__qty")
  .addEventListener("input", modifyCarInputQuantity);
document
  .getElementById("car__start-date")
  .addEventListener("input", handleStartDateChange);
document
  .getElementById("car__end-date")
  .addEventListener("input", handleEndDateChange);

// === document ready
if (parsedCarData) {
  const { image = productDummyImage } = parsedCarData;

  // set default settings for input
  document.getElementById("car__img").setAttribute("src", image);
  document.getElementById("car__name").innerHTML = parsedCarData.name;
  document.getElementById("car__price").innerHTML = parsedCarData.price;

  setInitStartAndEndDate(initStartDate, initEndDate);
  handleUpdateQtyInput(initCarQty);
  countTotalPrice();
} else {
  window.alert("Please add car reservation first.");

  window.location.href = "/";
}
