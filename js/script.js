const form = document.querySelector('form');
const cardName = document.querySelector('.cardholder-name');
const cardNumber = document.querySelector('.card-number');
const cardMonth = document.querySelector('.month');
const cardYear = document.querySelector('.year');
const cardCvc = document.querySelector('.cvc');
const confirm = document.querySelector('.confirm');
const continueBtn = document.querySelector('.continue');

const cardDisplayNumber = document.querySelector('.card-display');
const cardFrontName = document.querySelector('.card-front-name');
const cardFrontDate = document.querySelector('.card-front-date');
const cardBackCvc = document.querySelector('.card-back-cvc');

const numberError = document.querySelector('.number-error');
const dateError = document.querySelector('.date-error');
const cvcError = document.querySelector('.cvc-error');

const completed = document.querySelector('.completed-state');

function inputChanges() {
  function handleName() {
    cardFrontName.innerText = `${cardName.value}`;
  }
  function handleNumber() {
    cardDisplayNumber.innerHTML = `${cardNumber.value}`;
  }
  function handleDate() {
    cardFrontDate.innerHTML = `${cardMonth.value}/${cardYear.value}`;
  }
  function handleCvc() {
    cardBackCvc.innerHTML = `${cardCvc.value}`;
  }
  cardName.addEventListener('keyup', handleName);
  cardNumber.addEventListener('keyup', handleNumber);
  cardMonth.addEventListener('keyup', handleDate);
  cardYear.addEventListener('keyup', handleDate);
  cardCvc.addEventListener('keyup', handleCvc);
}
inputChanges();

function formValidation() {
  function checkInputs() {
    const cardNumberValid = Number(cardNumber.value);
    const monthValid = Number(cardMonth.value);
    const yearValid = Number(cardYear.value);
    const cvcValid = Number(cardCvc.value);

    if (cardName.value === '') {
      cardName.classList.add('error');
    } else {
      cardName.classList.remove('error');
      cardName.classList.add('valid');
    }

    if (!cardNumberValid) {
      cardNumber.classList.add('error');
      numberError.innerHTML = `<p>Wrong format, numbers only <p/>`;
    } else {
      cardNumber.classList.remove('error');
      numberError.innerHTML = ` `;
      cardNumber.classList.add('valid');
    }

    const date = new Date();
    const month = date.getMonth() + 1;
    let year = date.getFullYear();
    year = year - 2000;

    if (!monthValid && !yearValid) {
      cardMonth.classList.add('error');
      cardYear.classList.add('error');
      dateError.innerHTML = `<p>Can't be blank</p>`;
    } else if (yearValid < year) {
      cardYear.classList.add('error');
      dateError.innerHTML = `<p>Card must not be expired</p>`;
    } else {
      cardMonth.classList.remove('error');
      cardYear.classList.remove('error');
      dateError.innerHTML = ``;
      cardMonth.classList.add('valid');
      cardYear.classList.add('valid');
    }

    if (!cvcValid) {
      cardCvc.classList.add('error');
      cvcError.innerHTML = `<p>Can't be blank</p>`;
    } else {
      cardCvc.classList.remove('error');
      cvcError.innerHTML = ``;
      cardCvc.classList.add('valid');
      confirm.classList.add('valid');
    }
    const inputs = [...form];
    const validForm = inputs.every((input) =>
      input.classList.contains('valid'),
    );
    if (validForm) {
      confirm.addEventListener('click', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        completed.style.display = 'flex';
      });
    }
    continueBtn.addEventListener('click', () => {
      completed.style.display = 'none';
      form.style.display = 'block';
      inputs.forEach((input) => {
        input.value = '';
      });
      cardFrontName.innerText = `Jane Appleseed`;
      cardDisplayNumber.innerHTML = `0000 0000 0000 0000`;
      cardFrontDate.innerHTML = `00/00`;
      cardBackCvc.innerHTML = `000`;
    });
  }

  form.addEventListener('change', checkInputs);
}

formValidation();
