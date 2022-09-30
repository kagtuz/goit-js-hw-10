function fetchCountries(nameCountry) {
    const urlAddress = 'https://restcountries.com/v3.1/name/';
    const args = `?fields=name,capital,population,flags,languages`;
    const url = `${urlAddress}${nameCountry}${args}`;
    console.log(url);
    return fetch(url).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
  export { fetchCountries };