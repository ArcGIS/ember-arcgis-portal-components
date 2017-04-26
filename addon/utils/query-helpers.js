import Ember from 'ember';
/**
 * blah
 */
function createQuery (catalog, searchString) {
  const queryParts = Ember.A([]);
  const queryObj = catalog.params.query;

  if (searchString) {
    queryParts.push(`title:${searchString}`);
  }

  for (let prop in queryObj) {
    // If it's an array handle it as such..
    if (Array.isArray(queryObj[prop])) {
      if (queryObj[prop].length) {
        queryParts.push(getFieldQuery(prop, queryObj[prop]));
      }
    }
    // If it's a string handle it as such.
    if (typeof queryObj[prop] === 'string') {
      // Right now we are assuming the consuming application will supply
      // owner and orgid in those props.
      queryParts.push(`${prop}:${queryObj[prop]}`);
    }
  }

  return queryParts.join(' AND ');
}

function getFieldQuery (fieldName, fieldArray) {
  // Filter out all the ones that do not have dashes
  // and remove those dashes.
  const removeParts = excludedParams(fieldName, fieldArray);
  // Normal search params.
  const addParts = includedParams(fieldName, fieldArray);

  // collect parts into an array so we can cleanly join them
  const q = Ember.A([]);
  if (addParts.length) {
    q.push(`( ${addParts.join(' OR ')} )`);
  }
  if (removeParts.length) {
    q.push(`( ${removeParts.join(' OR ')} )`);
  }

  const query = q.join(' AND ');

  return query;
}

// Search params that will not be included in the search results.
// EX: ((type:Web Map) AND (-type:\"Web Mapping Application\"))
// Will return all Web Maps that are not Web Mapping Applications
function excludedParams (fieldName, fieldArray) {
  return fieldArray
    .filter(startsWithDash)
    .map(val => {
      const stripped = val.replace('-', '');
      return `-${fieldName}:"${stripped}"`;
    });
}

// normal search params
function includedParams (fieldName, fieldArray) {
  return fieldArray
    .filter(startsWithoutDash)
    .map(val => {
      return `${fieldName}:"${val}"`;
    });
}

// Does it start with a dash..
function startsWithDash (str) {
  return str[0] === '-';
}

// Does it not start with a dash..
function startsWithoutDash (str) {
  return !startsWithDash(str);
}

export default {
  createQuery
};
