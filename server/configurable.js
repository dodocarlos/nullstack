import {camelize} from '../shared/string';

export function proxyConfigurable(target, label) {
  const loader = function() {
    for(const key in process.env) {
      const lookup = `NULLSTACK_${label}_`;
      if(key.startsWith(lookup)) {
        const camelCaseKey = camelize(key.substring(lookup.length));
        target[camelCaseKey] = process.env[key];
      }
    }
  }
  return {target, loader};
}

export function freezeConfigurable(target) {
  Object.freeze(target);
}