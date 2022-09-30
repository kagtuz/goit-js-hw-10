import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { renderOneCountry } from './renderFunctions';
const DEBOUNCE_DELAY = 500;
const MAX_LENGTH = 10;
let countryList = document.querySelector('.country-list');
let oneCountry = document.querySelector('.country-info');

document
  .getElementById('search-box')
  .addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  if (e.target.value.trim() === '')
    return (countryList.innerHTML = ''), (oneCountry.innerHTML = '');
  else {
    fetchCountries(e.target.value.trim())
      .then(renderCountry)
      .catch(err => {
        Notiflix.Notify.failure(
          'Oops, there is no country with that name',
          err
        );
      });
  }
}

function renderCountry(countries) {
  countryList.innerHTML = '';
  oneCountry.innerHTML = '';
  if (countries.length > MAX_LENGTH) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    oneCountry.insertAdjacentHTML('beforeend', renderOneCountry(countries));
    console.log(oneCountry);
  }
}