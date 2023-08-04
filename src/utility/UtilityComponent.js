import React from 'react';

export function mask(str, mask) {
  let newstr = '';
  if (typeof str === 'string' || typeof str === 'number') {
    str = String(str).replace(/[^0-9]/g, '');
    let k = 0;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '#') {
        newstr = newstr + replaceMask(k, str);
        k = k + 1;
      } else {
        newstr = newstr + mask[i];
      }
    }
  }
  return newstr;
}

export function replaceMask(index, str) {
  if (str[index]) {
    return str[index];
  } else {
    return '#';
  }
}

function UtilityComponent() {
  return null; // UtilityComponent doesn't render any JSX
}

export default UtilityComponent;
