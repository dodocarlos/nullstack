

import context from './context';
import server from './server';
import registry from './registry';
import generator from './generator';
import element from '../shared/element';
import instanceProxyHandler from './instanceProxyHandler';
import project from './project';
import environment from './environment';

context.server = server;
context.project = project;
context.environment = environment;

class Nullstack {

  static registry = registry;
  static element = element;

  static async start(Starter) {
    if(this.name === 'Nullstack') {
      generator.starter = () => element(Starter);
      typeof(Starter.start) === 'function' && await Starter.start(context);
      server.start();
    }
  }

  constructor(scope) {
    this._request = () => scope.request;
    this._response = () => scope.response;
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const proxy = new Proxy(this, instanceProxyHandler);
    for(const method of methods) {
      if(method !== '_request' && method !== '_response' && method !== 'constructor' && typeof(this[method]) === 'function') {
        this[method] = this[method].bind(proxy);
      }
    }
    return proxy;
  }

  serialize() {
    const serialized = {};
    for(const name of Object.getOwnPropertyNames(this)) {
      if(typeof(this[name]) !== 'function') {
        serialized[name] = this[name];
      }
    }
    return serialized;
  }


  render() {
    return false;
  }

}

export default Nullstack;