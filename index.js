'use strict';

var countries = require('./data');

// Define mappings
var namesMapping = {};
var codesMapping = {};

countries.forEach(function(country) {
  namesMapping[country.name.toLowerCase()] = { alpha2Code: country.alpha2Code, alpha3Code: country.alpha3Code };
  codesMapping[country.alpha2Code.toLowerCase()] = country.name;
  codesMapping[country.alpha3Code.toLowerCase()] = country.name;
});


module.exports = {
  getCountries,
  getMapping,
  getCountryName,
  getCountryCode,
  getAllCountryCodes,
  getAllCountryNames
};


function normalizeString(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str.trim().toLowerCase();
}

function normalizeCountryCodeFormat(preferredFormat) {
  var format = (normalizeString(preferredFormat) || 'alpha2') + 'Code';

  return format === 'alpha3Code' ? format : 'alpha2Code';
}

function getCountryCode(countryName, preferredFormat) {
  if (typeof countryName !== 'string') {
    return null;
  }

  var normalizedCountryName = normalizeString(countryName);
  var country = namesMapping[normalizedCountryName] || {};

  var format = normalizeCountryCodeFormat(preferredFormat);
  return country[format] || null;
}

function getCountryName(countryCode) {
  var code = normalizeString(countryCode);
  return codesMapping[code] || null;
}

function getAllCountryNames() {
  return countries.map(function(country) {
    return country['name'];
  });
}

function getAllCountryCodes(preferredFormat) {
  var format = normalizeCountryCodeFormat(preferredFormat);

  return countries.map(function(country) {
    return country[format];
  });
}

function getMapping(preferredFormat) {
  var format = normalizeCountryCodeFormat(preferredFormat);

  return countries.map(function(country) {
    return { [country[format]]: country['name'] }
  });
}

function getCountries() {
  return countries;
}
