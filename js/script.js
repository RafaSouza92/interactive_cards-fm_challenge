class inputChanges {
  constructor(inputField, display, event) {
    this.inputField = document.querySelector(inputField);
    this.display = document.querySelector(display);
    if (event === undefined) this.event = 'keyup';

    this.handleInputChanges = this.handleInputChanges.bind(this);
  }
  handleInputChanges() {
    this.display.innerText = this.inputField.value;
  }
  inputEvents() {
    this.inputField.addEventListener(this.event, this.handleInputChanges);
  }

  init() {
    if (this.inputField && this.display) {
      this.inputEvents();
    }
    return this;
  }
}
const nameChanges = new inputChanges('.cardholder-name', '.card-front-name');
nameChanges.init();
const numberChanges = new inputChanges('.card-number', '.card-display');
numberChanges.init();
const monthChanges = new inputChanges('.month', '.card-front-date-month');
monthChanges.init();
const yearChanges = new inputChanges('.year', '.card-front-date-year');
yearChanges.init();
const cvcChanges = new inputChanges('.cvc', '.card-back-cvc');
cvcChanges.init();

const inputs = {
  name: document.querySelector('.cardholder-name'),
  cardNumber: document.querySelector('.card-number'),
  dateMonth: document.querySelector('.month'),
  dateYear: document.querySelector('.year'),
  cvc: document.querySelector('.cvc'),
  completed: document.querySelector('.completed-state'),
};
const errorsField = {
  nameError: document.querySelector('.name-error'),
  numberError: document.querySelector('.number-error'),
  dateError: document.querySelector('.date-error'),
  cvcError: document.querySelector('.cvc-error'),
};

const errors = [];
const { name, cardNumber, dateMonth, dateYear, cvc, completed } = inputs;

const numberValidate = () => {
  const { numberError } = errorsField;
  const validNumber = Number(cardNumber.value);

  if (!validNumber || cardNumber.value.length < 16) {
    numberError.innerHTML = `<p>Wrong format, numbers only <p/>`;
    errors.push('Number error');
    return;
  } else {
    errors.pop();
    numberError.innerHTML = ``;
  }
};
cardNumber.addEventListener('change', numberValidate);

const dateValidate = () => {
  const { dateError } = errorsField;
  const monthValid = Number(dateMonth.value);
  const yearValid = Number(dateYear.value);
  const date = new Date();
  const thisYear = date.getFullYear();

  if (!monthValid || !yearValid || monthValid > 12) {
    dateError.innerHTML = `<p>Can't be blank</p>`;
    errors.push('Date Error');
    return;
  } else {
    errors.pop();
  }
  if (yearValid < thisYear - 2000) {
    dateError.innerHTML = `<p>Card expired</p>`;
    errors.push('Date Error');
    return;
  } else {
    errors.pop();
    dateError.innerHTML = ``;
  }
};
dateMonth.addEventListener('change', dateValidate);
dateYear.addEventListener('change', dateValidate);

const cvcValidate = () => {
  const { cvcError } = errorsField;
  const cvcValid = Number(cvc.value);

  if (!cvcValid || cvc.value.length < 3) {
    cvcError.innerHTML = `<p>Can't be blank</p>`;
    errors.push('Cvc error');
    return;
  } else {
    errors.pop();
    cvcError.innerHTML = ``;
  }
};
cvc.addEventListener('change', cvcValidate);

const form = document.querySelector('form');

function formValidate(event) {
  event.preventDefault();
  if (errors.length > 0) {
    console.log('CHECK ERROR FIELDS');
    console.log(errors);
  } else {
    form.style.display = 'none';
    completed.style.display = 'flex';
  }
}
form.addEventListener('submit', formValidate);

const cardsDisplay = {
  cardNumberDisplay: document.querySelector('.card-display'),
  cardNameDisplay: document.querySelector('.card-front-name'),
  cardDateMonthDisplay: document.querySelector('.card-front-date-month'),
  cardDateYearDisplay: document.querySelector('.card-front-date-year'),
  cardCvcDisplay: document.querySelector('.card-front-date-year'),
};

function clearCardDisplay() {
  const {
    cardNumberDisplay,
    cardNameDisplay,
    cardDateMonthDisplay,
    cardDateYearDisplay,
    cardCvcDisplay,
  } = cardsDisplay;

  cardNumberDisplay.innerHTML = `<p>0000 0000 0000 0000</p>`;
  cardNameDisplay.innerHTML = `<span>Jane Appleseed</span>`;
  cardDateMonthDisplay.innerHTML = `<span>00</span>`;
  cardDateYearDisplay.innerHTML = `<span>00</span>`;
  cardCvcDisplay.innerHTML = `<span>00</span>`;
}

const continueButton = document.querySelector('.continue');

continueButton.addEventListener('click', () => {
  form.style.display = 'block';
  completed.style.display = 'none';

  Object.keys(inputs).forEach((input) => {
    inputs[input].value = '';
  });

  clearCardDisplay();
});
