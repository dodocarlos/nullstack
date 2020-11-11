let redirectTimer = null;

class Router {

  _changed = false

  _redirect(target) {
    clearTimeout(redirectTimer);
    redirectTimer = setTimeout(() => {
      history.pushState({}, document.title, target);
      window.dispatchEvent(new Event('popstate'));
      this._changed = true;
    }, 0);
  }

  get url() {
    return window.location.pathname+window.location.search;
  }

  set url(target) {
    this._redirect(target);
  }

  get path() {
    return window.location.pathname;
  }

  set path(target) {
    this._redirect(target+window.location.search);
  }

}

const router = new Router();

export default router;