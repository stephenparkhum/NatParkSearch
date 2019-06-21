// API KEY
// rl6MLieQdYUdYd5keg4Wcrjcc0cd9Nv6ZxOIeecd

// GOOGLE API
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

// REFERENCE
// 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'

const api_Key = 'rl6MLieQdYUdYd5keg4Wcrjcc0cd9Nv6ZxOIeecd';

function parkSearch(key, state, num) {
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${num}&api_key=${key}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayFindings(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


const displayFindings = (responseJson) => {
    $('.results').empty();
    $('.results').removeClass('hidden');
    $('.results').append('<h2>Results</h2>');
    for (let i = 0; i < responseJson.data.length; i++) {
        $(`.results`).append(
            `
            <div class="results-card">
            <h3>${responseJson.data[i].fullName}</h3>
            <a href=${responseJson.data[i].url} target="_blank">Website</a>
            <p>${responseJson.data[i].description}</p>
            </div>
            `
        );
        console.log(responseJson.data[i].fullName);
    }
};


const mainApp = () => {
    $('input[type=submit]').on('click', function() {
        event.preventDefault();
        let userInput = $('input[type=text').val();
        let numInput = $('input[type=number').val();
        if (numInput == 0) {
            numInput = 10;
        }
        parkSearch(api_Key, userInput, numInput);
    });
    
};

mainApp();