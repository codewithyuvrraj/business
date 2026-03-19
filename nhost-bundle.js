var NhostSDK = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/fetch-ponyfill/build/fetch-browser.js
  var require_fetch_browser = __commonJS({
    "node_modules/fetch-ponyfill/build/fetch-browser.js"(exports, module) {
      (function(global2) {
        "use strict";
        function fetchPonyfill(options) {
          var Promise2 = options && options.Promise || global2.Promise;
          var XMLHttpRequest2 = options && options.XMLHttpRequest || global2.XMLHttpRequest;
          return (function() {
            var globalThis2 = Object.create(global2, {
              fetch: {
                value: void 0,
                writable: true
              }
            });
            (function(global3, factory) {
              typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global3.WHATWGFetch = {});
            })(this, (function(exports2) {
              "use strict";
              var global3 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || typeof global3 !== "undefined" && global3;
              var support = {
                searchParams: "URLSearchParams" in global3,
                iterable: "Symbol" in global3 && "iterator" in Symbol,
                blob: "FileReader" in global3 && "Blob" in global3 && (function() {
                  try {
                    new Blob();
                    return true;
                  } catch (e2) {
                    return false;
                  }
                })(),
                formData: "FormData" in global3,
                arrayBuffer: "ArrayBuffer" in global3
              };
              function isDataView(obj) {
                return obj && DataView.prototype.isPrototypeOf(obj);
              }
              if (support.arrayBuffer) {
                var viewClasses = [
                  "[object Int8Array]",
                  "[object Uint8Array]",
                  "[object Uint8ClampedArray]",
                  "[object Int16Array]",
                  "[object Uint16Array]",
                  "[object Int32Array]",
                  "[object Uint32Array]",
                  "[object Float32Array]",
                  "[object Float64Array]"
                ];
                var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                  return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
                };
              }
              function normalizeName(name) {
                if (typeof name !== "string") {
                  name = String(name);
                }
                if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
                  throw new TypeError("Invalid character in header field name");
                }
                return name.toLowerCase();
              }
              function normalizeValue(value) {
                if (typeof value !== "string") {
                  value = String(value);
                }
                return value;
              }
              function iteratorFor(items) {
                var iterator = {
                  next: function() {
                    var value = items.shift();
                    return { done: value === void 0, value };
                  }
                };
                if (support.iterable) {
                  iterator[Symbol.iterator] = function() {
                    return iterator;
                  };
                }
                return iterator;
              }
              function Headers(headers) {
                this.map = {};
                if (headers instanceof Headers) {
                  headers.forEach(function(value, name) {
                    this.append(name, value);
                  }, this);
                } else if (Array.isArray(headers)) {
                  headers.forEach(function(header) {
                    this.append(header[0], header[1]);
                  }, this);
                } else if (headers) {
                  Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                  }, this);
                }
              }
              Headers.prototype.append = function(name, value) {
                name = normalizeName(name);
                value = normalizeValue(value);
                var oldValue = this.map[name];
                this.map[name] = oldValue ? oldValue + ", " + value : value;
              };
              Headers.prototype["delete"] = function(name) {
                delete this.map[normalizeName(name)];
              };
              Headers.prototype.get = function(name) {
                name = normalizeName(name);
                return this.has(name) ? this.map[name] : null;
              };
              Headers.prototype.has = function(name) {
                return this.map.hasOwnProperty(normalizeName(name));
              };
              Headers.prototype.set = function(name, value) {
                this.map[normalizeName(name)] = normalizeValue(value);
              };
              Headers.prototype.forEach = function(callback, thisArg) {
                for (var name in this.map) {
                  if (this.map.hasOwnProperty(name)) {
                    callback.call(thisArg, this.map[name], name, this);
                  }
                }
              };
              Headers.prototype.keys = function() {
                var items = [];
                this.forEach(function(value, name) {
                  items.push(name);
                });
                return iteratorFor(items);
              };
              Headers.prototype.values = function() {
                var items = [];
                this.forEach(function(value) {
                  items.push(value);
                });
                return iteratorFor(items);
              };
              Headers.prototype.entries = function() {
                var items = [];
                this.forEach(function(value, name) {
                  items.push([name, value]);
                });
                return iteratorFor(items);
              };
              if (support.iterable) {
                Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
              }
              function consumed(body) {
                if (body.bodyUsed) {
                  return Promise2.reject(new TypeError("Already read"));
                }
                body.bodyUsed = true;
              }
              function fileReaderReady(reader) {
                return new Promise2(function(resolve, reject) {
                  reader.onload = function() {
                    resolve(reader.result);
                  };
                  reader.onerror = function() {
                    reject(reader.error);
                  };
                });
              }
              function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                var promise = fileReaderReady(reader);
                reader.readAsArrayBuffer(blob);
                return promise;
              }
              function readBlobAsText(blob) {
                var reader = new FileReader();
                var promise = fileReaderReady(reader);
                reader.readAsText(blob);
                return promise;
              }
              function readArrayBufferAsText(buf) {
                var view = new Uint8Array(buf);
                var chars = new Array(view.length);
                for (var i = 0; i < view.length; i++) {
                  chars[i] = String.fromCharCode(view[i]);
                }
                return chars.join("");
              }
              function bufferClone(buf) {
                if (buf.slice) {
                  return buf.slice(0);
                } else {
                  var view = new Uint8Array(buf.byteLength);
                  view.set(new Uint8Array(buf));
                  return view.buffer;
                }
              }
              function Body() {
                this.bodyUsed = false;
                this._initBody = function(body) {
                  this.bodyUsed = this.bodyUsed;
                  this._bodyInit = body;
                  if (!body) {
                    this._bodyText = "";
                  } else if (typeof body === "string") {
                    this._bodyText = body;
                  } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                    this._bodyBlob = body;
                  } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                    this._bodyFormData = body;
                  } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this._bodyText = body.toString();
                  } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    this._bodyInit = new Blob([this._bodyArrayBuffer]);
                  } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                    this._bodyArrayBuffer = bufferClone(body);
                  } else {
                    this._bodyText = body = Object.prototype.toString.call(body);
                  }
                  if (!this.headers.get("content-type")) {
                    if (typeof body === "string") {
                      this.headers.set("content-type", "text/plain;charset=UTF-8");
                    } else if (this._bodyBlob && this._bodyBlob.type) {
                      this.headers.set("content-type", this._bodyBlob.type);
                    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                      this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                    }
                  }
                };
                if (support.blob) {
                  this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) {
                      return rejected;
                    }
                    if (this._bodyBlob) {
                      return Promise2.resolve(this._bodyBlob);
                    } else if (this._bodyArrayBuffer) {
                      return Promise2.resolve(new Blob([this._bodyArrayBuffer]));
                    } else if (this._bodyFormData) {
                      throw new Error("could not read FormData body as blob");
                    } else {
                      return Promise2.resolve(new Blob([this._bodyText]));
                    }
                  };
                  this.arrayBuffer = function() {
                    if (this._bodyArrayBuffer) {
                      var isConsumed = consumed(this);
                      if (isConsumed) {
                        return isConsumed;
                      }
                      if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                        return Promise2.resolve(
                          this._bodyArrayBuffer.buffer.slice(
                            this._bodyArrayBuffer.byteOffset,
                            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                          )
                        );
                      } else {
                        return Promise2.resolve(this._bodyArrayBuffer);
                      }
                    } else {
                      return this.blob().then(readBlobAsArrayBuffer);
                    }
                  };
                }
                this.text = function() {
                  var rejected = consumed(this);
                  if (rejected) {
                    return rejected;
                  }
                  if (this._bodyBlob) {
                    return readBlobAsText(this._bodyBlob);
                  } else if (this._bodyArrayBuffer) {
                    return Promise2.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                  } else if (this._bodyFormData) {
                    throw new Error("could not read FormData body as text");
                  } else {
                    return Promise2.resolve(this._bodyText);
                  }
                };
                if (support.formData) {
                  this.formData = function() {
                    return this.text().then(decode);
                  };
                }
                this.json = function() {
                  return this.text().then(JSON.parse);
                };
                return this;
              }
              var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
              function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
              }
              function Request(input, options2) {
                if (!(this instanceof Request)) {
                  throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                }
                options2 = options2 || {};
                var body = options2.body;
                if (input instanceof Request) {
                  if (input.bodyUsed) {
                    throw new TypeError("Already read");
                  }
                  this.url = input.url;
                  this.credentials = input.credentials;
                  if (!options2.headers) {
                    this.headers = new Headers(input.headers);
                  }
                  this.method = input.method;
                  this.mode = input.mode;
                  this.signal = input.signal;
                  if (!body && input._bodyInit != null) {
                    body = input._bodyInit;
                    input.bodyUsed = true;
                  }
                } else {
                  this.url = String(input);
                }
                this.credentials = options2.credentials || this.credentials || "same-origin";
                if (options2.headers || !this.headers) {
                  this.headers = new Headers(options2.headers);
                }
                this.method = normalizeMethod(options2.method || this.method || "GET");
                this.mode = options2.mode || this.mode || null;
                this.signal = options2.signal || this.signal;
                this.referrer = null;
                if ((this.method === "GET" || this.method === "HEAD") && body) {
                  throw new TypeError("Body not allowed for GET or HEAD requests");
                }
                this._initBody(body);
                if (this.method === "GET" || this.method === "HEAD") {
                  if (options2.cache === "no-store" || options2.cache === "no-cache") {
                    var reParamSearch = /([?&])_=[^&]*/;
                    if (reParamSearch.test(this.url)) {
                      this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
                    } else {
                      var reQueryString = /\?/;
                      this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
                    }
                  }
                }
              }
              Request.prototype.clone = function() {
                return new Request(this, { body: this._bodyInit });
              };
              function decode(body) {
                var form = new FormData();
                body.trim().split("&").forEach(function(bytes) {
                  if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                  }
                });
                return form;
              }
              function parseHeaders(rawHeaders) {
                var headers = new Headers();
                var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
                preProcessedHeaders.split("\r").map(function(header) {
                  return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
                }).forEach(function(line) {
                  var parts = line.split(":");
                  var key = parts.shift().trim();
                  if (key) {
                    var value = parts.join(":").trim();
                    headers.append(key, value);
                  }
                });
                return headers;
              }
              Body.call(Request.prototype);
              function Response(bodyInit, options2) {
                if (!(this instanceof Response)) {
                  throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                }
                if (!options2) {
                  options2 = {};
                }
                this.type = "default";
                this.status = options2.status === void 0 ? 200 : options2.status;
                this.ok = this.status >= 200 && this.status < 300;
                this.statusText = "statusText" in options2 ? options2.statusText : "";
                this.headers = new Headers(options2.headers);
                this.url = options2.url || "";
                this._initBody(bodyInit);
              }
              Body.call(Response.prototype);
              Response.prototype.clone = function() {
                return new Response(this._bodyInit, {
                  status: this.status,
                  statusText: this.statusText,
                  headers: new Headers(this.headers),
                  url: this.url
                });
              };
              Response.error = function() {
                var response = new Response(null, { status: 0, statusText: "" });
                response.type = "error";
                return response;
              };
              var redirectStatuses = [301, 302, 303, 307, 308];
              Response.redirect = function(url, status) {
                if (redirectStatuses.indexOf(status) === -1) {
                  throw new RangeError("Invalid status code");
                }
                return new Response(null, { status, headers: { location: url } });
              };
              exports2.DOMException = global3.DOMException;
              try {
                new exports2.DOMException();
              } catch (err) {
                exports2.DOMException = function(message, name) {
                  this.message = message;
                  this.name = name;
                  var error3 = Error(message);
                  this.stack = error3.stack;
                };
                exports2.DOMException.prototype = Object.create(Error.prototype);
                exports2.DOMException.prototype.constructor = exports2.DOMException;
              }
              function fetch(input, init3) {
                return new Promise2(function(resolve, reject) {
                  var request = new Request(input, init3);
                  if (request.signal && request.signal.aborted) {
                    return reject(new exports2.DOMException("Aborted", "AbortError"));
                  }
                  var xhr = new XMLHttpRequest2();
                  function abortXhr() {
                    xhr.abort();
                  }
                  xhr.onload = function() {
                    var options2 = {
                      status: xhr.status,
                      statusText: xhr.statusText,
                      headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                    };
                    options2.url = "responseURL" in xhr ? xhr.responseURL : options2.headers.get("X-Request-URL");
                    var body = "response" in xhr ? xhr.response : xhr.responseText;
                    setTimeout(function() {
                      resolve(new Response(body, options2));
                    }, 0);
                  };
                  xhr.onerror = function() {
                    setTimeout(function() {
                      reject(new TypeError("Network request failed"));
                    }, 0);
                  };
                  xhr.ontimeout = function() {
                    setTimeout(function() {
                      reject(new TypeError("Network request failed"));
                    }, 0);
                  };
                  xhr.onabort = function() {
                    setTimeout(function() {
                      reject(new exports2.DOMException("Aborted", "AbortError"));
                    }, 0);
                  };
                  function fixUrl(url) {
                    try {
                      return url === "" && global3.location.href ? global3.location.href : url;
                    } catch (e2) {
                      return url;
                    }
                  }
                  xhr.open(request.method, fixUrl(request.url), true);
                  if (request.credentials === "include") {
                    xhr.withCredentials = true;
                  } else if (request.credentials === "omit") {
                    xhr.withCredentials = false;
                  }
                  if ("responseType" in xhr) {
                    if (support.blob) {
                      xhr.responseType = "blob";
                    } else if (support.arrayBuffer && request.headers.get("Content-Type") && request.headers.get("Content-Type").indexOf("application/octet-stream") !== -1) {
                      xhr.responseType = "arraybuffer";
                    }
                  }
                  if (init3 && typeof init3.headers === "object" && !(init3.headers instanceof Headers)) {
                    Object.getOwnPropertyNames(init3.headers).forEach(function(name) {
                      xhr.setRequestHeader(name, normalizeValue(init3.headers[name]));
                    });
                  } else {
                    request.headers.forEach(function(value, name) {
                      xhr.setRequestHeader(name, value);
                    });
                  }
                  if (request.signal) {
                    request.signal.addEventListener("abort", abortXhr);
                    xhr.onreadystatechange = function() {
                      if (xhr.readyState === 4) {
                        request.signal.removeEventListener("abort", abortXhr);
                      }
                    };
                  }
                  xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
                });
              }
              fetch.polyfill = true;
              if (!global3.fetch) {
                global3.fetch = fetch;
                global3.Headers = Headers;
                global3.Request = Request;
                global3.Response = Response;
              }
              exports2.Headers = Headers;
              exports2.Request = Request;
              exports2.Response = Response;
              exports2.fetch = fetch;
              Object.defineProperty(exports2, "__esModule", { value: true });
            }));
            return {
              fetch: globalThis2.fetch,
              Headers: globalThis2.Headers,
              Request: globalThis2.Request,
              Response: globalThis2.Response,
              DOMException: globalThis2.DOMException
            };
          })();
        }
        if (typeof define === "function" && define.amd) {
          define(function() {
            return fetchPonyfill;
          });
        } else if (typeof exports === "object") {
          module.exports = fetchPonyfill;
        } else {
          global2.fetchPonyfill = fetchPonyfill;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : exports);
    }
  });

  // node_modules/form-data/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/form-data/lib/browser.js"(exports, module) {
      "use strict";
      module.exports = typeof self === "object" ? self.FormData : window.FormData;
    }
  });

  // node_modules/unfetch/dist/unfetch.js
  var require_unfetch = __commonJS({
    "node_modules/unfetch/dist/unfetch.js"(exports, module) {
      module.exports = function(e2, n2) {
        return n2 = n2 || {}, new Promise(function(t2, r2) {
          var s = new XMLHttpRequest(), o2 = [], u2 = [], i = {}, a = function() {
            return { ok: 2 == (s.status / 100 | 0), statusText: s.statusText, status: s.status, url: s.responseURL, text: function() {
              return Promise.resolve(s.responseText);
            }, json: function() {
              return Promise.resolve(s.responseText).then(JSON.parse);
            }, blob: function() {
              return Promise.resolve(new Blob([s.response]));
            }, clone: a, headers: { keys: function() {
              return o2;
            }, entries: function() {
              return u2;
            }, get: function(e3) {
              return i[e3.toLowerCase()];
            }, has: function(e3) {
              return e3.toLowerCase() in i;
            } } };
          };
          for (var l in s.open(n2.method || "get", e2, true), s.onload = function() {
            s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e3, n3, t3) {
              o2.push(n3 = n3.toLowerCase()), u2.push([n3, t3]), i[n3] = i[n3] ? i[n3] + "," + t3 : t3;
            }), t2(a());
          }, s.onerror = r2, s.withCredentials = "include" == n2.credentials, n2.headers) s.setRequestHeader(l, n2.headers[l]);
          s.send(n2.body || null);
        });
      };
    }
  });

  // node_modules/isomorphic-unfetch/browser.js
  var require_browser2 = __commonJS({
    "node_modules/isomorphic-unfetch/browser.js"(exports, module) {
      module.exports = self.fetch || (self.fetch = require_unfetch().default || require_unfetch());
    }
  });

  // node_modules/@nhost/nhost-js/dist/index.esm.js
  var index_esm_exports = {};
  __export(index_esm_exports, {
    AuthClient: () => ae,
    AuthClientSSR: () => cr,
    AuthCookieClient: () => $e,
    CodifiedError: () => U,
    EMAIL_NEEDS_VERIFICATION: () => ke,
    HasuraAuthClient: () => dr,
    HasuraStorageApi: () => x2,
    HasuraStorageClient: () => j2,
    INITIAL_FILE_CONTEXT: () => D2,
    INITIAL_MACHINE_CONTEXT: () => G,
    INVALID_EMAIL_ERROR: () => A,
    INVALID_MFA_CODE_ERROR: () => me,
    INVALID_MFA_TICKET_ERROR: () => Ee,
    INVALID_MFA_TYPE_ERROR: () => he,
    INVALID_PASSWORD_ERROR: () => $,
    INVALID_PHONE_NUMBER_ERROR: () => Y,
    INVALID_REFRESH_TOKEN: () => ye,
    INVALID_SIGN_IN_METHOD: () => Se,
    MIN_PASSWORD_LENGTH: () => de,
    NETWORK_ERROR_CODE: () => Z,
    NHOST_JWT_EXPIRES_AT_KEY: () => R,
    NHOST_REFRESH_TOKEN_ID_KEY: () => N,
    NHOST_REFRESH_TOKEN_KEY: () => O,
    NO_MFA_TICKET_ERROR: () => ge,
    NO_REFRESH_TOKEN: () => Te,
    NhostClient: () => _3,
    NhostFunctionsClient: () => v2,
    OTHER_ERROR_CODE: () => J,
    REFRESH_TOKEN_MAX_ATTEMPTS: () => H,
    STATE_ERROR_CODE: () => C,
    TOKEN_REFRESHER_RUNNING_ERROR: () => pe,
    TOKEN_REFRESH_MARGIN_SECONDS: () => fe,
    USER_ALREADY_SIGNED_IN: () => y,
    USER_NOT_ANONYMOUS: () => or,
    USER_UNAUTHENTICATED: () => we,
    VALIDATION_ERROR_CODE: () => k,
    activateMfaPromise: () => lr,
    addSecurityKeyPromise: () => qe,
    appendImageTransformationParameters: () => F2,
    changeEmailPromise: () => We,
    changePasswordPromise: () => je,
    createAuthClient: () => S2,
    createAuthMachine: () => Me,
    createChangeEmailMachine: () => Ke,
    createChangePasswordMachine: () => Ve,
    createEnableMfaMachine: () => ar,
    createFileUploadMachine: () => b,
    createFunctionsClient: () => $2,
    createGraphqlClient: () => C2,
    createMultipleFilesUploadMachine: () => H2,
    createNhostClient: () => H3,
    createResetPasswordMachine: () => Ge,
    createSendVerificationEmailMachine: () => Le,
    createStorageClient: () => E2,
    encodeQueryParameters: () => oe,
    generateQrCodePromise: () => ur,
    getAuthenticationResult: () => v,
    getFetch: () => De,
    getParameterByName: () => D,
    getSession: () => x,
    isBrowser: () => q,
    isValidEmail: () => I,
    isValidPassword: () => W,
    isValidPhoneNumber: () => z,
    isValidTicket: () => Ue,
    localStorageGetter: () => Ne,
    localStorageSetter: () => xe,
    postFetch: () => S,
    removeParameterFromWindow: () => F,
    resetPasswordPromise: () => He,
    rewriteRedirectTo: () => w,
    sendVerificationEmailPromise: () => Ye,
    signInAnonymousPromise: () => Fe,
    signInEmailPasswordPromise: () => ze,
    signInEmailPasswordlessPromise: () => Q,
    signInEmailSecurityKeyPromise: () => Qe,
    signInMfaTotpPromise: () => Be,
    signInPATPromise: () => Xe,
    signInSmsPasswordlessOtpPromise: () => Ze,
    signInSmsPasswordlessPromise: () => B,
    signOutPromise: () => Je,
    signUpEmailPasswordPromise: () => X,
    signUpEmailSecurityKeyPromise: () => er,
    uploadFilePromise: () => z2,
    uploadMultipleFilesPromise: () => G2,
    urlFromSubdomain: () => d
  });

  // node_modules/jwt-decode/build/jwt-decode.esm.js
  function e(e2) {
    this.message = e2;
  }
  e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
  var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(r2) {
    var t2 = String(r2).replace(/=+$/, "");
    if (t2.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
    for (var n2, o2, a = 0, i = 0, c = ""; o2 = t2.charAt(i++); ~o2 && (n2 = a % 4 ? 64 * n2 + o2 : o2, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0) o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o2);
    return c;
  };
  function t(e2) {
    var t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
    switch (t2.length % 4) {
      case 0:
        break;
      case 2:
        t2 += "==";
        break;
      case 3:
        t2 += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }
    try {
      return (function(e3) {
        return decodeURIComponent(r(e3).replace(/(.)/g, (function(e4, r2) {
          var t3 = r2.charCodeAt(0).toString(16).toUpperCase();
          return t3.length < 2 && (t3 = "0" + t3), "%" + t3;
        })));
      })(t2);
    } catch (e3) {
      return r(t2);
    }
  }
  function n(e2) {
    this.message = e2;
  }
  function o(e2, r2) {
    if ("string" != typeof e2) throw new n("Invalid token specified");
    var o2 = true === (r2 = r2 || {}).header ? 0 : 1;
    try {
      return JSON.parse(t(e2.split(".")[o2]));
    } catch (e3) {
      throw new n("Invalid token specified: " + e3.message);
    }
  }
  n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
  var jwt_decode_esm_default = o;

  // node_modules/xstate/es/actions.js
  var actions_exports = {};
  __export(actions_exports, {
    actionTypes: () => actionTypes_exports,
    after: () => after2,
    assign: () => assign2,
    cancel: () => cancel2,
    choose: () => choose2,
    done: () => done,
    doneInvoke: () => doneInvoke,
    error: () => error2,
    escalate: () => escalate,
    forwardTo: () => forwardTo,
    getActionFunction: () => getActionFunction,
    initEvent: () => initEvent,
    isActionObject: () => isActionObject,
    log: () => log2,
    pure: () => pure2,
    raise: () => raise2,
    resolveActions: () => resolveActions,
    resolveLog: () => resolveLog,
    resolveRaise: () => resolveRaise,
    resolveSend: () => resolveSend,
    resolveStop: () => resolveStop,
    respond: () => respond,
    send: () => send2,
    sendParent: () => sendParent,
    sendTo: () => sendTo,
    sendUpdate: () => sendUpdate,
    start: () => start2,
    stop: () => stop2,
    toActionObject: () => toActionObject,
    toActionObjects: () => toActionObjects,
    toActivityDefinition: () => toActivityDefinition
  });

  // node_modules/xstate/es/_virtual/_tslib.js
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e2) {
    var t2 = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
      t2[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t2[p[i]] = s[p[i]];
      }
    return t2;
  }
  function __values(o2) {
    var s = typeof Symbol === "function" && Symbol.iterator, m4 = s && o2[s], i = 0;
    if (m4) return m4.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i >= o2.length) o2 = void 0;
        return { value: o2 && o2[i++], done: !o2 };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o2, n2) {
    var m4 = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m4) return o2;
    var i = m4.call(o2), r2, ar2 = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done) ar2.push(r2.value);
    } catch (error3) {
      e2 = { error: error3 };
    } finally {
      try {
        if (r2 && !r2.done && (m4 = i["return"])) m4.call(i);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar2;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
      if (ar2 || !(i in from)) {
        if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
        ar2[i] = from[i];
      }
    }
    return to.concat(ar2 || Array.prototype.slice.call(from));
  }

  // node_modules/xstate/es/types.js
  var ActionTypes;
  (function(ActionTypes2) {
    ActionTypes2["Start"] = "xstate.start";
    ActionTypes2["Stop"] = "xstate.stop";
    ActionTypes2["Raise"] = "xstate.raise";
    ActionTypes2["Send"] = "xstate.send";
    ActionTypes2["Cancel"] = "xstate.cancel";
    ActionTypes2["NullEvent"] = "";
    ActionTypes2["Assign"] = "xstate.assign";
    ActionTypes2["After"] = "xstate.after";
    ActionTypes2["DoneState"] = "done.state";
    ActionTypes2["DoneInvoke"] = "done.invoke";
    ActionTypes2["Log"] = "xstate.log";
    ActionTypes2["Init"] = "xstate.init";
    ActionTypes2["Invoke"] = "xstate.invoke";
    ActionTypes2["ErrorExecution"] = "error.execution";
    ActionTypes2["ErrorCommunication"] = "error.communication";
    ActionTypes2["ErrorPlatform"] = "error.platform";
    ActionTypes2["ErrorCustom"] = "xstate.error";
    ActionTypes2["Update"] = "xstate.update";
    ActionTypes2["Pure"] = "xstate.pure";
    ActionTypes2["Choose"] = "xstate.choose";
  })(ActionTypes || (ActionTypes = {}));
  var SpecialTargets;
  (function(SpecialTargets2) {
    SpecialTargets2["Parent"] = "#_parent";
    SpecialTargets2["Internal"] = "#_internal";
  })(SpecialTargets || (SpecialTargets = {}));

  // node_modules/xstate/es/actionTypes.js
  var actionTypes_exports = {};
  __export(actionTypes_exports, {
    after: () => after,
    assign: () => assign,
    cancel: () => cancel,
    choose: () => choose,
    doneState: () => doneState,
    error: () => error,
    errorExecution: () => errorExecution,
    errorPlatform: () => errorPlatform,
    init: () => init,
    invoke: () => invoke,
    log: () => log,
    nullEvent: () => nullEvent,
    pure: () => pure,
    raise: () => raise,
    send: () => send,
    start: () => start,
    stop: () => stop,
    update: () => update
  });
  var start = ActionTypes.Start;
  var stop = ActionTypes.Stop;
  var raise = ActionTypes.Raise;
  var send = ActionTypes.Send;
  var cancel = ActionTypes.Cancel;
  var nullEvent = ActionTypes.NullEvent;
  var assign = ActionTypes.Assign;
  var after = ActionTypes.After;
  var doneState = ActionTypes.DoneState;
  var log = ActionTypes.Log;
  var init = ActionTypes.Init;
  var invoke = ActionTypes.Invoke;
  var errorExecution = ActionTypes.ErrorExecution;
  var errorPlatform = ActionTypes.ErrorPlatform;
  var error = ActionTypes.ErrorCustom;
  var update = ActionTypes.Update;
  var choose = ActionTypes.Choose;
  var pure = ActionTypes.Pure;

  // node_modules/xstate/es/constants.js
  var STATE_DELIMITER = ".";
  var EMPTY_ACTIVITY_MAP = {};
  var DEFAULT_GUARD_TYPE = "xstate.guard";
  var TARGETLESS_KEY = "";

  // node_modules/xstate/es/environment.js
  var IS_PRODUCTION = false;

  // node_modules/xstate/es/utils.js
  var _a;
  function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) {
      delimiter = STATE_DELIMITER;
    }
    var parentStateValue = toStateValue(parentStateId, delimiter);
    var childStateValue = toStateValue(childStateId, delimiter);
    if (isString(childStateValue)) {
      if (isString(parentStateValue)) {
        return childStateValue === parentStateValue;
      }
      return false;
    }
    if (isString(parentStateValue)) {
      return parentStateValue in childStateValue;
    }
    return Object.keys(parentStateValue).every(function(key) {
      if (!(key in childStateValue)) {
        return false;
      }
      return matchesState(parentStateValue[key], childStateValue[key]);
    });
  }
  function getEventType(event2) {
    try {
      return isString(event2) || typeof event2 === "number" ? "".concat(event2) : event2.type;
    } catch (e2) {
      throw new Error("Events must be strings or objects with a string event.type property.");
    }
  }
  function toStatePath(stateId, delimiter) {
    try {
      if (isArray(stateId)) {
        return stateId;
      }
      return stateId.toString().split(delimiter);
    } catch (e2) {
      throw new Error("'".concat(stateId, "' is not a valid state path."));
    }
  }
  function isStateLike(state) {
    return typeof state === "object" && "value" in state && "context" in state && "event" in state && "_event" in state;
  }
  function toStateValue(stateValue, delimiter) {
    if (isStateLike(stateValue)) {
      return stateValue.value;
    }
    if (isArray(stateValue)) {
      return pathToStateValue(stateValue);
    }
    if (typeof stateValue !== "string") {
      return stateValue;
    }
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
  }
  function pathToStateValue(statePath) {
    if (statePath.length === 1) {
      return statePath[0];
    }
    var value = {};
    var marker = value;
    for (var i = 0; i < statePath.length - 1; i++) {
      if (i === statePath.length - 2) {
        marker[statePath[i]] = statePath[i + 1];
      } else {
        marker[statePath[i]] = {};
        marker = marker[statePath[i]];
      }
    }
    return value;
  }
  function mapValues(collection, iteratee) {
    var result = {};
    var collectionKeys = Object.keys(collection);
    for (var i = 0; i < collectionKeys.length; i++) {
      var key = collectionKeys[i];
      result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
  }
  function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a2;
    var result = {};
    try {
      for (var _b = __values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        var item = collection[key];
        if (!predicate(item)) {
          continue;
        }
        result[key] = iteratee(item, key, collection);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return result;
  }
  var path = function(props) {
    return function(object) {
      var e_2, _a2;
      var result = object;
      try {
        for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
          var prop = props_1_1.value;
          result = result[prop];
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (props_1_1 && !props_1_1.done && (_a2 = props_1.return)) _a2.call(props_1);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      return result;
    };
  };
  function nestedPath(props, accessorProp) {
    return function(object) {
      var e_3, _a2;
      var result = object;
      try {
        for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
          var prop = props_2_1.value;
          result = result[accessorProp][prop];
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (props_2_1 && !props_2_1.done && (_a2 = props_2.return)) _a2.call(props_2);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
      return result;
    };
  }
  function toStatePaths(stateValue) {
    if (!stateValue) {
      return [[]];
    }
    if (isString(stateValue)) {
      return [[stateValue]];
    }
    var result = flatten(Object.keys(stateValue).map(function(key) {
      var subStateValue = stateValue[key];
      if (typeof subStateValue !== "string" && (!subStateValue || !Object.keys(subStateValue).length)) {
        return [[key]];
      }
      return toStatePaths(stateValue[key]).map(function(subPath) {
        return [key].concat(subPath);
      });
    }));
    return result;
  }
  function flatten(array) {
    var _a2;
    return (_a2 = []).concat.apply(_a2, __spreadArray([], __read(array), false));
  }
  function toArrayStrict(value) {
    if (isArray(value)) {
      return value;
    }
    return [value];
  }
  function toArray(value) {
    if (value === void 0) {
      return [];
    }
    return toArrayStrict(value);
  }
  function mapContext(mapper, context, _event) {
    var e_5, _a2;
    if (isFunction(mapper)) {
      return mapper(context, _event.data);
    }
    var result = {};
    try {
      for (var _b = __values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        var subMapper = mapper[key];
        if (isFunction(subMapper)) {
          result[key] = subMapper(context, _event.data);
        } else {
          result[key] = subMapper;
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
    return result;
  }
  function isBuiltInEvent(eventType) {
    return /^(done|error)\./.test(eventType);
  }
  function isPromiseLike(value) {
    if (value instanceof Promise) {
      return true;
    }
    if (value !== null && (isFunction(value) || typeof value === "object") && isFunction(value.then)) {
      return true;
    }
    return false;
  }
  function isBehavior(value) {
    return value !== null && typeof value === "object" && "transition" in value && typeof value.transition === "function";
  }
  function partition(items, predicate) {
    var e_6, _a2;
    var _b = __read([[], []], 2), truthy = _b[0], falsy = _b[1];
    try {
      for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
        var item = items_1_1.value;
        if (predicate(item)) {
          truthy.push(item);
        } else {
          falsy.push(item);
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (items_1_1 && !items_1_1.done && (_a2 = items_1.return)) _a2.call(items_1);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
    return [truthy, falsy];
  }
  function updateHistoryStates(hist, stateValue) {
    return mapValues(hist.states, function(subHist, key) {
      if (!subHist) {
        return void 0;
      }
      var subStateValue = (isString(stateValue) ? void 0 : stateValue[key]) || (subHist ? subHist.current : void 0);
      if (!subStateValue) {
        return void 0;
      }
      return {
        current: subStateValue,
        states: updateHistoryStates(subHist, subStateValue)
      };
    });
  }
  function updateHistoryValue(hist, stateValue) {
    return {
      current: stateValue,
      states: updateHistoryStates(hist, stateValue)
    };
  }
  function updateContext(context, _event, assignActions, state) {
    if (!IS_PRODUCTION) {
      warn(!!context, "Attempting to update undefined context");
    }
    var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
      var e_7, _a2;
      var assignment = assignAction.assignment;
      var meta = {
        state,
        action: assignAction,
        _event
      };
      var partialUpdate = {};
      if (isFunction(assignment)) {
        partialUpdate = assignment(acc, _event.data, meta);
      } else {
        try {
          for (var _b = __values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var propAssignment = assignment[key];
            partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_7) throw e_7.error;
          }
        }
      }
      return Object.assign({}, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
  }
  var warn = function() {
  };
  if (!IS_PRODUCTION) {
    warn = function(condition, message) {
      var error3 = condition instanceof Error ? condition : void 0;
      if (!error3 && condition) {
        return;
      }
      if (console !== void 0) {
        var args = ["Warning: ".concat(message)];
        if (error3) {
          args.push(error3);
        }
        console.warn.apply(console, args);
      }
    };
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isString(value) {
    return typeof value === "string";
  }
  function toGuard(condition, guardMap) {
    if (!condition) {
      return void 0;
    }
    if (isString(condition)) {
      return {
        type: DEFAULT_GUARD_TYPE,
        name: condition,
        predicate: guardMap ? guardMap[condition] : void 0
      };
    }
    if (isFunction(condition)) {
      return {
        type: DEFAULT_GUARD_TYPE,
        name: condition.name,
        predicate: condition
      };
    }
    return condition;
  }
  function isObservable(value) {
    try {
      return "subscribe" in value && isFunction(value.subscribe);
    } catch (e2) {
      return false;
    }
  }
  var symbolObservable = /* @__PURE__ */ (function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  })();
  var interopSymbols = (_a = {}, _a[symbolObservable] = function() {
    return this;
  }, _a[Symbol.observable] = function() {
    return this;
  }, _a);
  function isMachine(value) {
    return !!value && "__xstatenode" in value;
  }
  function isActor(value) {
    return !!value && typeof value.send === "function";
  }
  var uniqueId = /* @__PURE__ */ (function() {
    var currentId = 0;
    return function() {
      currentId++;
      return currentId.toString(16);
    };
  })();
  function toEventObject(event2, payload) {
    if (isString(event2) || typeof event2 === "number") {
      return __assign({
        type: event2
      }, payload);
    }
    return event2;
  }
  function toSCXMLEvent(event2, scxmlEvent) {
    if (!isString(event2) && "$$type" in event2 && event2.$$type === "scxml") {
      return event2;
    }
    var eventObject = toEventObject(event2);
    return __assign({
      name: eventObject.type,
      data: eventObject,
      $$type: "scxml",
      type: "external"
    }, scxmlEvent);
  }
  function toTransitionConfigArray(event2, configLike) {
    var transitions = toArrayStrict(configLike).map(function(transitionLike) {
      if (typeof transitionLike === "undefined" || typeof transitionLike === "string" || isMachine(transitionLike)) {
        return {
          target: transitionLike,
          event: event2
        };
      }
      return __assign(__assign({}, transitionLike), {
        event: event2
      });
    });
    return transitions;
  }
  function normalizeTarget(target) {
    if (target === void 0 || target === TARGETLESS_KEY) {
      return void 0;
    }
    return toArray(target);
  }
  function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
    if (!IS_PRODUCTION) {
      var originalStackTrace = originalError.stack ? " Stacktrace was '".concat(originalError.stack, "'") : "";
      if (originalError === currentError) {
        console.error("Missing onError handler for invocation '".concat(id, "', error was '").concat(originalError, "'.").concat(originalStackTrace));
      } else {
        var stackTrace = currentError.stack ? " Stacktrace was '".concat(currentError.stack, "'") : "";
        console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '".concat(id, "'. ") + "Original error: '".concat(originalError, "'. ").concat(originalStackTrace, " Current error is '").concat(currentError, "'.").concat(stackTrace));
      }
    }
  }
  function evaluateGuard(machine, guard, context, _event, state) {
    var guards = machine.options.guards;
    var guardMeta = {
      state,
      cond: guard,
      _event
    };
    if (guard.type === DEFAULT_GUARD_TYPE) {
      return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
    }
    var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
    if (!condFn) {
      throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine.id, "'."));
    }
    return condFn(context, _event.data, guardMeta);
  }
  function toInvokeSource(src) {
    if (typeof src === "string") {
      return {
        type: src
      };
    }
    return src;
  }
  function toObserver(nextHandler, errorHandler, completionHandler) {
    var noop = function() {
    };
    var isObserver = typeof nextHandler === "object";
    var self2 = isObserver ? nextHandler : null;
    return {
      next: ((isObserver ? nextHandler.next : nextHandler) || noop).bind(self2),
      error: ((isObserver ? nextHandler.error : errorHandler) || noop).bind(self2),
      complete: ((isObserver ? nextHandler.complete : completionHandler) || noop).bind(self2)
    };
  }
  function createInvokeId(stateNodeId, index) {
    return "".concat(stateNodeId, ":invocation[").concat(index, "]");
  }
  function isRaisableAction(action) {
    return (action.type === raise || action.type === send && action.to === SpecialTargets.Internal) && typeof action.delay !== "number";
  }

  // node_modules/xstate/es/actions.js
  var initEvent = /* @__PURE__ */ toSCXMLEvent({
    type: init
  });
  function getActionFunction(actionType, actionFunctionMap) {
    return actionFunctionMap ? actionFunctionMap[actionType] || void 0 : void 0;
  }
  function toActionObject(action, actionFunctionMap) {
    var actionObject;
    if (isString(action) || typeof action === "number") {
      var exec = getActionFunction(action, actionFunctionMap);
      if (isFunction(exec)) {
        actionObject = {
          type: action,
          exec
        };
      } else if (exec) {
        actionObject = exec;
      } else {
        actionObject = {
          type: action,
          exec: void 0
        };
      }
    } else if (isFunction(action)) {
      actionObject = {
        // Convert action to string if unnamed
        type: action.name || action.toString(),
        exec: action
      };
    } else {
      var exec = getActionFunction(action.type, actionFunctionMap);
      if (isFunction(exec)) {
        actionObject = __assign(__assign({}, action), {
          exec
        });
      } else if (exec) {
        var actionType = exec.type || action.type;
        actionObject = __assign(__assign(__assign({}, exec), action), {
          type: actionType
        });
      } else {
        actionObject = action;
      }
    }
    return actionObject;
  }
  var toActionObjects = function(action, actionFunctionMap) {
    if (!action) {
      return [];
    }
    var actions = isArray(action) ? action : [action];
    return actions.map(function(subAction) {
      return toActionObject(subAction, actionFunctionMap);
    });
  };
  function toActivityDefinition(action) {
    var actionObject = toActionObject(action);
    return __assign(__assign({
      id: isString(action) ? action : actionObject.id
    }, actionObject), {
      type: actionObject.type
    });
  }
  function raise2(event2, options) {
    return {
      type: raise,
      event: typeof event2 === "function" ? event2 : toEventObject(event2),
      delay: options ? options.delay : void 0,
      id: options === null || options === void 0 ? void 0 : options.id
    };
  }
  function resolveRaise(action, ctx, _event, delaysMap) {
    var meta = {
      _event
    };
    var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
    var resolvedDelay;
    if (isString(action.delay)) {
      var configDelay = delaysMap && delaysMap[action.delay];
      resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
    } else {
      resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
    }
    return __assign(__assign({}, action), {
      type: raise,
      _event: resolvedEvent,
      delay: resolvedDelay
    });
  }
  function send2(event2, options) {
    return {
      to: options ? options.to : void 0,
      type: send,
      event: isFunction(event2) ? event2 : toEventObject(event2),
      delay: options ? options.delay : void 0,
      // TODO: don't auto-generate IDs here like that
      // there is too big chance of the ID collision
      id: options && options.id !== void 0 ? options.id : isFunction(event2) ? event2.name : getEventType(event2)
    };
  }
  function resolveSend(action, ctx, _event, delaysMap) {
    var meta = {
      _event
    };
    var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
    var resolvedDelay;
    if (isString(action.delay)) {
      var configDelay = delaysMap && delaysMap[action.delay];
      resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
    } else {
      resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
    }
    var resolvedTarget = isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
    return __assign(__assign({}, action), {
      to: resolvedTarget,
      _event: resolvedEvent,
      event: resolvedEvent.data,
      delay: resolvedDelay
    });
  }
  function sendParent(event2, options) {
    return send2(event2, __assign(__assign({}, options), {
      to: SpecialTargets.Parent
    }));
  }
  function sendTo(actor, event2, options) {
    return send2(event2, __assign(__assign({}, options), {
      to: actor
    }));
  }
  function sendUpdate() {
    return sendParent(update);
  }
  function respond(event2, options) {
    return send2(event2, __assign(__assign({}, options), {
      to: function(_4, __, _a2) {
        var _event = _a2._event;
        return _event.origin;
      }
    }));
  }
  var defaultLogExpr = function(context, event2) {
    return {
      context,
      event: event2
    };
  };
  function log2(expr, label) {
    if (expr === void 0) {
      expr = defaultLogExpr;
    }
    return {
      type: log,
      label,
      expr
    };
  }
  var resolveLog = function(action, ctx, _event) {
    return __assign(__assign({}, action), {
      value: isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
        _event
      })
    });
  };
  var cancel2 = function(sendId) {
    return {
      type: cancel,
      sendId
    };
  };
  function start2(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
      type: ActionTypes.Start,
      activity: activityDef,
      exec: void 0
    };
  }
  function stop2(actorRef) {
    var activity = isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
    return {
      type: ActionTypes.Stop,
      activity,
      exec: void 0
    };
  }
  function resolveStop(action, context, _event) {
    var actorRefOrString = isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
    var resolvedActorRef = typeof actorRefOrString === "string" ? {
      id: actorRefOrString
    } : actorRefOrString;
    var actionObject = {
      type: ActionTypes.Stop,
      activity: resolvedActorRef
    };
    return actionObject;
  }
  var assign2 = function(assignment) {
    return {
      type: assign,
      assignment
    };
  };
  function isActionObject(action) {
    return typeof action === "object" && "type" in action;
  }
  function after2(delayRef, id) {
    var idSuffix = id ? "#".concat(id) : "";
    return "".concat(ActionTypes.After, "(").concat(delayRef, ")").concat(idSuffix);
  }
  function done(id, data) {
    var type = "".concat(ActionTypes.DoneState, ".").concat(id);
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function doneInvoke(id, data) {
    var type = "".concat(ActionTypes.DoneInvoke, ".").concat(id);
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function error2(id, data) {
    var type = "".concat(ActionTypes.ErrorPlatform, ".").concat(id);
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function pure2(getActions) {
    return {
      type: ActionTypes.Pure,
      get: getActions
    };
  }
  function forwardTo(target, options) {
    if (!IS_PRODUCTION && (!target || typeof target === "function")) {
      var originalTarget_1 = target;
      target = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var resolvedTarget = typeof originalTarget_1 === "function" ? originalTarget_1.apply(void 0, __spreadArray([], __read(args), false)) : originalTarget_1;
        if (!resolvedTarget) {
          throw new Error("Attempted to forward event to undefined actor. This risks an infinite loop in the sender.");
        }
        return resolvedTarget;
      };
    }
    return send2(function(_4, event2) {
      return event2;
    }, __assign(__assign({}, options), {
      to: target
    }));
  }
  function escalate(errorData, options) {
    return sendParent(function(context, event2, meta) {
      return {
        type: error,
        data: isFunction(errorData) ? errorData(context, event2, meta) : errorData
      };
    }, __assign(__assign({}, options), {
      to: SpecialTargets.Parent
    }));
  }
  function choose2(conds) {
    return {
      type: ActionTypes.Choose,
      conds
    };
  }
  var pluckAssigns = function(actionBlocks) {
    var e_1, _a2;
    var assignActions = [];
    try {
      for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
        var block2 = actionBlocks_1_1.value;
        var i = 0;
        while (i < block2.actions.length) {
          if (block2.actions[i].type === assign) {
            assignActions.push(block2.actions[i]);
            block2.actions.splice(i, 1);
            continue;
          }
          i++;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return)) _a2.call(actionBlocks_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return assignActions;
  };
  function resolveActions(machine, currentState, currentContext, _event, actionBlocks, predictableExec, preserveActionOrder) {
    if (preserveActionOrder === void 0) {
      preserveActionOrder = false;
    }
    var assignActions = preserveActionOrder ? [] : pluckAssigns(actionBlocks);
    var updatedContext = assignActions.length ? updateContext(currentContext, _event, assignActions, currentState) : currentContext;
    var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
    var deferredToBlockEnd = [];
    function handleAction(blockType, actionObject) {
      var _a2;
      switch (actionObject.type) {
        case raise: {
          var raisedAction = resolveRaise(actionObject, updatedContext, _event, machine.options.delays);
          if (predictableExec && typeof raisedAction.delay === "number") {
            predictableExec(raisedAction, updatedContext, _event);
          }
          return raisedAction;
        }
        case send:
          var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays);
          if (!IS_PRODUCTION) {
            var configuredDelay = actionObject.delay;
            warn(
              !isString(configuredDelay) || typeof sendAction.delay === "number",
              // tslint:disable-next-line:max-line-length
              "No delay reference for delay expression '".concat(configuredDelay, "' was found on machine '").concat(machine.id, "'")
            );
          }
          if (predictableExec && sendAction.to !== SpecialTargets.Internal) {
            if (blockType === "entry") {
              deferredToBlockEnd.push(sendAction);
            } else {
              predictableExec(sendAction, updatedContext, _event);
            }
          }
          return sendAction;
        case log: {
          var resolved = resolveLog(actionObject, updatedContext, _event);
          predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, updatedContext, _event);
          return resolved;
        }
        case choose: {
          var chooseAction = actionObject;
          var matchedActions = (_a2 = chooseAction.conds.find(function(condition) {
            var guard = toGuard(condition.cond, machine.options.guards);
            return !guard || evaluateGuard(machine, guard, updatedContext, _event, !predictableExec ? currentState : void 0);
          })) === null || _a2 === void 0 ? void 0 : _a2.actions;
          if (!matchedActions) {
            return [];
          }
          var _b = __read(resolveActions(machine, currentState, updatedContext, _event, [{
            type: blockType,
            actions: toActionObjects(toArray(matchedActions), machine.options.actions)
          }], predictableExec, preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
          updatedContext = resolvedContextFromChoose;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromChoose;
        }
        case pure: {
          var matchedActions = actionObject.get(updatedContext, _event.data);
          if (!matchedActions) {
            return [];
          }
          var _c = __read(resolveActions(machine, currentState, updatedContext, _event, [{
            type: blockType,
            actions: toActionObjects(toArray(matchedActions), machine.options.actions)
          }], predictableExec, preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
          updatedContext = resolvedContext;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromPure;
        }
        case stop: {
          var resolved = resolveStop(actionObject, updatedContext, _event);
          predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, currentContext, _event);
          return resolved;
        }
        case assign: {
          updatedContext = updateContext(updatedContext, _event, [actionObject], !predictableExec ? currentState : void 0);
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          break;
        }
        default:
          var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
          var exec_1 = resolvedActionObject.exec;
          if (predictableExec) {
            predictableExec(resolvedActionObject, updatedContext, _event);
          } else if (exec_1 && preservedContexts) {
            var contextIndex_1 = preservedContexts.length - 1;
            var wrapped = __assign(__assign({}, resolvedActionObject), {
              exec: function(_ctx) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
                }
                exec_1.apply(void 0, __spreadArray([preservedContexts[contextIndex_1]], __read(args), false));
              }
            });
            resolvedActionObject = wrapped;
          }
          return resolvedActionObject;
      }
    }
    function processBlock(block2) {
      var e_2, _a2;
      var resolvedActions2 = [];
      try {
        for (var _b = __values(block2.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
          var action = _c.value;
          var resolved = handleAction(block2.type, action);
          if (resolved) {
            resolvedActions2 = resolvedActions2.concat(resolved);
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      deferredToBlockEnd.forEach(function(action2) {
        predictableExec(action2, updatedContext, _event);
      });
      deferredToBlockEnd.length = 0;
      return resolvedActions2;
    }
    var resolvedActions = flatten(actionBlocks.map(processBlock));
    return [resolvedActions, updatedContext];
  }

  // node_modules/xstate/es/serviceScope.js
  var serviceStack = [];
  var provide = function(service, fn) {
    serviceStack.push(service);
    var result = fn(service);
    serviceStack.pop();
    return result;
  };
  var consume = function(fn) {
    return fn(serviceStack[serviceStack.length - 1]);
  };

  // node_modules/xstate/es/Actor.js
  function createNullActor(id) {
    var _a2;
    return _a2 = {
      id,
      send: function() {
        return void 0;
      },
      subscribe: function() {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      },
      getSnapshot: function() {
        return void 0;
      },
      toJSON: function() {
        return {
          id
        };
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2;
  }
  function createInvocableActor(invokeDefinition, machine, context, _event) {
    var _a2;
    var invokeSrc = toInvokeSource(invokeDefinition.src);
    var serviceCreator = (_a2 = machine === null || machine === void 0 ? void 0 : machine.options.services) === null || _a2 === void 0 ? void 0 : _a2[invokeSrc.type];
    var resolvedData = invokeDefinition.data ? mapContext(invokeDefinition.data, context, _event) : void 0;
    var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id);
    tempActor.meta = invokeDefinition;
    return tempActor;
  }
  function createDeferredActor(entity, id, data) {
    var tempActor = createNullActor(id);
    tempActor.deferred = true;
    if (isMachine(entity)) {
      var initialState_1 = tempActor.state = provide(void 0, function() {
        return (data ? entity.withContext(data) : entity).initialState;
      });
      tempActor.getSnapshot = function() {
        return initialState_1;
      };
    }
    return tempActor;
  }
  function isActor2(item) {
    try {
      return typeof item.send === "function";
    } catch (e2) {
      return false;
    }
  }
  function isSpawnedActor(item) {
    return isActor2(item) && "id" in item;
  }
  function toActorRef(actorRefLike) {
    var _a2;
    return __assign((_a2 = {
      subscribe: function() {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      },
      id: "anonymous",
      getSnapshot: function() {
        return void 0;
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2), actorRefLike);
  }

  // node_modules/xstate/es/stateUtils.js
  var isLeafNode = function(stateNode) {
    return stateNode.type === "atomic" || stateNode.type === "final";
  };
  function getAllChildren(stateNode) {
    return Object.keys(stateNode.states).map(function(key) {
      return stateNode.states[key];
    });
  }
  function getChildren(stateNode) {
    return getAllChildren(stateNode).filter(function(sn) {
      return sn.type !== "history";
    });
  }
  function getAllStateNodes(stateNode) {
    var stateNodes = [stateNode];
    if (isLeafNode(stateNode)) {
      return stateNodes;
    }
    return stateNodes.concat(flatten(getChildren(stateNode).map(getAllStateNodes)));
  }
  function getConfiguration(prevStateNodes, stateNodes) {
    var e_1, _a2, e_2, _b, e_3, _c, e_4, _d;
    var prevConfiguration = new Set(prevStateNodes);
    var prevAdjList = getAdjList(prevConfiguration);
    var configuration = new Set(stateNodes);
    try {
      for (var configuration_1 = __values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
        var s = configuration_1_1.value;
        var m4 = s.parent;
        while (m4 && !configuration.has(m4)) {
          configuration.add(m4);
          m4 = m4.parent;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (configuration_1_1 && !configuration_1_1.done && (_a2 = configuration_1.return)) _a2.call(configuration_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    var adjList = getAdjList(configuration);
    try {
      for (var configuration_2 = __values(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
        var s = configuration_2_1.value;
        if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
          if (prevAdjList.get(s)) {
            prevAdjList.get(s).forEach(function(sn) {
              return configuration.add(sn);
            });
          } else {
            s.initialStateNodes.forEach(function(sn) {
              return configuration.add(sn);
            });
          }
        } else {
          if (s.type === "parallel") {
            try {
              for (var _e2 = (e_3 = void 0, __values(getChildren(s))), _f = _e2.next(); !_f.done; _f = _e2.next()) {
                var child = _f.value;
                if (!configuration.has(child)) {
                  configuration.add(child);
                  if (prevAdjList.get(child)) {
                    prevAdjList.get(child).forEach(function(sn) {
                      return configuration.add(sn);
                    });
                  } else {
                    child.initialStateNodes.forEach(function(sn) {
                      return configuration.add(sn);
                    });
                  }
                }
              }
            } catch (e_3_1) {
              e_3 = {
                error: e_3_1
              };
            } finally {
              try {
                if (_f && !_f.done && (_c = _e2.return)) _c.call(_e2);
              } finally {
                if (e_3) throw e_3.error;
              }
            }
          }
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return)) _b.call(configuration_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    try {
      for (var configuration_3 = __values(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
        var s = configuration_3_1.value;
        var m4 = s.parent;
        while (m4 && !configuration.has(m4)) {
          configuration.add(m4);
          m4 = m4.parent;
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return)) _d.call(configuration_3);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    return configuration;
  }
  function getValueFromAdj(baseNode, adjList) {
    var childStateNodes = adjList.get(baseNode);
    if (!childStateNodes) {
      return {};
    }
    if (baseNode.type === "compound") {
      var childStateNode = childStateNodes[0];
      if (childStateNode) {
        if (isLeafNode(childStateNode)) {
          return childStateNode.key;
        }
      } else {
        return {};
      }
    }
    var stateValue = {};
    childStateNodes.forEach(function(csn) {
      stateValue[csn.key] = getValueFromAdj(csn, adjList);
    });
    return stateValue;
  }
  function getAdjList(configuration) {
    var e_5, _a2;
    var adjList = /* @__PURE__ */ new Map();
    try {
      for (var configuration_4 = __values(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()) {
        var s = configuration_4_1.value;
        if (!adjList.has(s)) {
          adjList.set(s, []);
        }
        if (s.parent) {
          if (!adjList.has(s.parent)) {
            adjList.set(s.parent, []);
          }
          adjList.get(s.parent).push(s);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (configuration_4_1 && !configuration_4_1.done && (_a2 = configuration_4.return)) _a2.call(configuration_4);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
    return adjList;
  }
  function getValue(rootNode, configuration) {
    var config = getConfiguration([rootNode], configuration);
    return getValueFromAdj(rootNode, getAdjList(config));
  }
  function has(iterable, item) {
    if (Array.isArray(iterable)) {
      return iterable.some(function(member) {
        return member === item;
      });
    }
    if (iterable instanceof Set) {
      return iterable.has(item);
    }
    return false;
  }
  function nextEvents(configuration) {
    return __spreadArray([], __read(new Set(flatten(__spreadArray([], __read(configuration.map(function(sn) {
      return sn.ownEvents;
    })), false)))), false);
  }
  function isInFinalState(configuration, stateNode) {
    if (stateNode.type === "compound") {
      return getChildren(stateNode).some(function(s) {
        return s.type === "final" && has(configuration, s);
      });
    }
    if (stateNode.type === "parallel") {
      return getChildren(stateNode).every(function(sn) {
        return isInFinalState(configuration, sn);
      });
    }
    return false;
  }
  function getMeta(configuration) {
    if (configuration === void 0) {
      configuration = [];
    }
    return configuration.reduce(function(acc, stateNode) {
      if (stateNode.meta !== void 0) {
        acc[stateNode.id] = stateNode.meta;
      }
      return acc;
    }, {});
  }
  function getTagsFromConfiguration(configuration) {
    return new Set(flatten(configuration.map(function(sn) {
      return sn.tags;
    })));
  }

  // node_modules/xstate/es/State.js
  function stateValuesEqual(a, b3) {
    if (a === b3) {
      return true;
    }
    if (a === void 0 || b3 === void 0) {
      return false;
    }
    if (isString(a) || isString(b3)) {
      return a === b3;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b3);
    return aKeys.length === bKeys.length && aKeys.every(function(key) {
      return stateValuesEqual(a[key], b3[key]);
    });
  }
  function isStateConfig(state) {
    if (typeof state !== "object" || state === null) {
      return false;
    }
    return "value" in state && "_event" in state;
  }
  function bindActionToState(action, state) {
    var exec = action.exec;
    var boundAction = __assign(__assign({}, action), {
      exec: exec !== void 0 ? function() {
        return exec(state.context, state.event, {
          action,
          state,
          _event: state._event
        });
      } : void 0
    });
    return boundAction;
  }
  var State = (
    /** @class */
    /* @__PURE__ */ (function() {
      function State2(config) {
        var _this = this;
        var _a2;
        this.actions = [];
        this.activities = EMPTY_ACTIVITY_MAP;
        this.meta = {};
        this.events = [];
        this.value = config.value;
        this.context = config.context;
        this._event = config._event;
        this._sessionid = config._sessionid;
        this.event = this._event.data;
        this.historyValue = config.historyValue;
        this.history = config.history;
        this.actions = config.actions || [];
        this.activities = config.activities || EMPTY_ACTIVITY_MAP;
        this.meta = getMeta(config.configuration);
        this.events = config.events || [];
        this.matches = this.matches.bind(this);
        this.toStrings = this.toStrings.bind(this);
        this.configuration = config.configuration;
        this.transitions = config.transitions;
        this.children = config.children;
        this.done = !!config.done;
        this.tags = (_a2 = Array.isArray(config.tags) ? new Set(config.tags) : config.tags) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ new Set();
        this.machine = config.machine;
        Object.defineProperty(this, "nextEvents", {
          get: function() {
            return nextEvents(_this.configuration);
          }
        });
      }
      State2.from = function(stateValue, context) {
        if (stateValue instanceof State2) {
          if (stateValue.context !== context) {
            return new State2({
              value: stateValue.value,
              context,
              _event: stateValue._event,
              _sessionid: null,
              historyValue: stateValue.historyValue,
              history: stateValue.history,
              actions: [],
              activities: stateValue.activities,
              meta: {},
              events: [],
              configuration: [],
              transitions: [],
              children: {}
            });
          }
          return stateValue;
        }
        var _event = initEvent;
        return new State2({
          value: stateValue,
          context,
          _event,
          _sessionid: null,
          historyValue: void 0,
          history: void 0,
          actions: [],
          activities: void 0,
          meta: void 0,
          events: [],
          configuration: [],
          transitions: [],
          children: {}
        });
      };
      State2.create = function(config) {
        return new State2(config);
      };
      State2.inert = function(stateValue, context) {
        if (stateValue instanceof State2) {
          if (!stateValue.actions.length) {
            return stateValue;
          }
          var _event = initEvent;
          return new State2({
            value: stateValue.value,
            context,
            _event,
            _sessionid: null,
            historyValue: stateValue.historyValue,
            history: stateValue.history,
            activities: stateValue.activities,
            configuration: stateValue.configuration,
            transitions: [],
            children: {}
          });
        }
        return State2.from(stateValue, context);
      };
      State2.prototype.toStrings = function(stateValue, delimiter) {
        var _this = this;
        if (stateValue === void 0) {
          stateValue = this.value;
        }
        if (delimiter === void 0) {
          delimiter = ".";
        }
        if (isString(stateValue)) {
          return [stateValue];
        }
        var valueKeys = Object.keys(stateValue);
        return valueKeys.concat.apply(valueKeys, __spreadArray([], __read(valueKeys.map(function(key) {
          return _this.toStrings(stateValue[key], delimiter).map(function(s) {
            return key + delimiter + s;
          });
        })), false));
      };
      State2.prototype.toJSON = function() {
        var _a2 = this;
        _a2.configuration;
        _a2.transitions;
        var tags = _a2.tags;
        _a2.machine;
        var jsonValues = __rest(_a2, ["configuration", "transitions", "tags", "machine"]);
        return __assign(__assign({}, jsonValues), {
          tags: Array.from(tags)
        });
      };
      State2.prototype.matches = function(parentStateValue) {
        return matchesState(parentStateValue, this.value);
      };
      State2.prototype.hasTag = function(tag) {
        return this.tags.has(tag);
      };
      State2.prototype.can = function(event2) {
        var _a2;
        if (IS_PRODUCTION) {
          warn(!!this.machine, "state.can(...) used outside of a machine-created State object; this will always return false.");
        }
        var transitionData = (_a2 = this.machine) === null || _a2 === void 0 ? void 0 : _a2.getTransitionData(this, event2);
        return !!(transitionData === null || transitionData === void 0 ? void 0 : transitionData.transitions.length) && // Check that at least one transition is not forbidden
        transitionData.transitions.some(function(t2) {
          return t2.target !== void 0 || t2.actions.length;
        });
      };
      return State2;
    })()
  );

  // node_modules/xstate/es/scheduler.js
  var defaultOptions = {
    deferEvents: false
  };
  var Scheduler = (
    /** @class */
    /* @__PURE__ */ (function() {
      function Scheduler2(options) {
        this.processingEvent = false;
        this.queue = [];
        this.initialized = false;
        this.options = __assign(__assign({}, defaultOptions), options);
      }
      Scheduler2.prototype.initialize = function(callback) {
        this.initialized = true;
        if (callback) {
          if (!this.options.deferEvents) {
            this.schedule(callback);
            return;
          }
          this.process(callback);
        }
        this.flushEvents();
      };
      Scheduler2.prototype.schedule = function(task) {
        if (!this.initialized || this.processingEvent) {
          this.queue.push(task);
          return;
        }
        if (this.queue.length !== 0) {
          throw new Error("Event queue should be empty when it is not processing events");
        }
        this.process(task);
        this.flushEvents();
      };
      Scheduler2.prototype.clear = function() {
        this.queue = [];
      };
      Scheduler2.prototype.flushEvents = function() {
        var nextCallback = this.queue.shift();
        while (nextCallback) {
          this.process(nextCallback);
          nextCallback = this.queue.shift();
        }
      };
      Scheduler2.prototype.process = function(callback) {
        this.processingEvent = true;
        try {
          callback();
        } catch (e2) {
          this.clear();
          throw e2;
        } finally {
          this.processingEvent = false;
        }
      };
      return Scheduler2;
    })()
  );

  // node_modules/xstate/es/registry.js
  var children = /* @__PURE__ */ new Map();
  var sessionIdIndex = 0;
  var registry = {
    bookId: function() {
      return "x:".concat(sessionIdIndex++);
    },
    register: function(id, actor) {
      children.set(id, actor);
      return id;
    },
    get: function(id) {
      return children.get(id);
    },
    free: function(id) {
      children.delete(id);
    }
  };

  // node_modules/xstate/es/devTools.js
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (!IS_PRODUCTION) {
      console.warn("XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues");
    }
  }
  function getDevTools() {
    var global2 = getGlobal();
    if (global2 && "__xstate__" in global2) {
      return global2.__xstate__;
    }
    return void 0;
  }
  function registerService(service) {
    if (!getGlobal()) {
      return;
    }
    var devTools = getDevTools();
    if (devTools) {
      devTools.register(service);
    }
  }

  // node_modules/xstate/es/behaviors.js
  function spawnBehavior(behavior, options) {
    if (options === void 0) {
      options = {};
    }
    var state = behavior.initialState;
    var observers = /* @__PURE__ */ new Set();
    var mailbox = [];
    var flushing = false;
    var flush = function() {
      if (flushing) {
        return;
      }
      flushing = true;
      while (mailbox.length > 0) {
        var event_1 = mailbox.shift();
        state = behavior.transition(state, event_1, actorCtx);
        observers.forEach(function(observer) {
          return observer.next(state);
        });
      }
      flushing = false;
    };
    var actor = toActorRef({
      id: options.id,
      send: function(event2) {
        mailbox.push(event2);
        flush();
      },
      getSnapshot: function() {
        return state;
      },
      subscribe: function(next, handleError, complete) {
        var observer = toObserver(next, handleError, complete);
        observers.add(observer);
        observer.next(state);
        return {
          unsubscribe: function() {
            observers.delete(observer);
          }
        };
      }
    });
    var actorCtx = {
      parent: options.parent,
      self: actor,
      id: options.id || "anonymous",
      observers
    };
    state = behavior.start ? behavior.start(actorCtx) : state;
    return actor;
  }

  // node_modules/xstate/es/interpreter.js
  var DEFAULT_SPAWN_OPTIONS = {
    sync: false,
    autoForward: false
  };
  var InterpreterStatus;
  (function(InterpreterStatus2) {
    InterpreterStatus2[InterpreterStatus2["NotStarted"] = 0] = "NotStarted";
    InterpreterStatus2[InterpreterStatus2["Running"] = 1] = "Running";
    InterpreterStatus2[InterpreterStatus2["Stopped"] = 2] = "Stopped";
  })(InterpreterStatus || (InterpreterStatus = {}));
  var Interpreter = (
    /** @class */
    /* @__PURE__ */ (function() {
      function Interpreter2(machine, options) {
        if (options === void 0) {
          options = Interpreter2.defaultOptions;
        }
        var _this = this;
        this.machine = machine;
        this.delayedEventsMap = {};
        this.listeners = /* @__PURE__ */ new Set();
        this.contextListeners = /* @__PURE__ */ new Set();
        this.stopListeners = /* @__PURE__ */ new Set();
        this.doneListeners = /* @__PURE__ */ new Set();
        this.eventListeners = /* @__PURE__ */ new Set();
        this.sendListeners = /* @__PURE__ */ new Set();
        this.initialized = false;
        this.status = InterpreterStatus.NotStarted;
        this.children = /* @__PURE__ */ new Map();
        this.forwardTo = /* @__PURE__ */ new Set();
        this._outgoingQueue = [];
        this.init = this.start;
        this.send = function(event2, payload) {
          if (isArray(event2)) {
            _this.batch(event2);
            return _this.state;
          }
          var _event = toSCXMLEvent(toEventObject(event2, payload));
          if (_this.status === InterpreterStatus.Stopped) {
            if (!IS_PRODUCTION) {
              warn(false, 'Event "'.concat(_event.name, '" was sent to stopped service "').concat(_this.machine.id, '". This service has already reached its final state, and will not transition.\nEvent: ').concat(JSON.stringify(_event.data)));
            }
            return _this.state;
          }
          if (_this.status !== InterpreterStatus.Running && !_this.options.deferEvents) {
            throw new Error('Event "'.concat(_event.name, '" was sent to uninitialized service "').concat(
              _this.machine.id,
              '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: '
            ).concat(JSON.stringify(_event.data)));
          }
          _this.scheduler.schedule(function() {
            _this.forward(_event);
            var nextState = _this._nextState(_event);
            _this.update(nextState, _event);
          });
          return _this._state;
        };
        this.sendTo = function(event2, to, immediate) {
          var isParent = _this.parent && (to === SpecialTargets.Parent || _this.parent.id === to);
          var target = isParent ? _this.parent : isString(to) ? to === SpecialTargets.Internal ? _this : _this.children.get(to) || registry.get(to) : isActor(to) ? to : void 0;
          if (!target) {
            if (!isParent) {
              throw new Error("Unable to send event to child '".concat(to, "' from service '").concat(_this.id, "'."));
            }
            if (!IS_PRODUCTION) {
              warn(false, "Service '".concat(_this.id, "' has no parent: unable to send event ").concat(event2.type));
            }
            return;
          }
          if ("machine" in target) {
            if (_this.status !== InterpreterStatus.Stopped || _this.parent !== target || // we need to send events to the parent from exit handlers of a machine that reached its final state
            _this.state.done) {
              var scxmlEvent = __assign(__assign({}, event2), {
                name: event2.name === error ? "".concat(error2(_this.id)) : event2.name,
                origin: _this.sessionId
              });
              if (!immediate && _this.machine.config.predictableActionArguments) {
                _this._outgoingQueue.push([target, scxmlEvent]);
              } else {
                target.send(scxmlEvent);
              }
            }
          } else {
            if (!immediate && _this.machine.config.predictableActionArguments) {
              _this._outgoingQueue.push([target, event2.data]);
            } else {
              target.send(event2.data);
            }
          }
        };
        this._exec = function(action, context, _event, actionFunctionMap) {
          if (actionFunctionMap === void 0) {
            actionFunctionMap = _this.machine.options.actions;
          }
          var actionOrExec = action.exec || getActionFunction(action.type, actionFunctionMap);
          var exec = isFunction(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;
          if (exec) {
            try {
              return exec(context, _event.data, !_this.machine.config.predictableActionArguments ? {
                action,
                state: _this.state,
                _event
              } : {
                action,
                _event
              });
            } catch (err) {
              if (_this.parent) {
                _this.parent.send({
                  type: "xstate.error",
                  data: err
                });
              }
              throw err;
            }
          }
          switch (action.type) {
            case raise: {
              var sendAction_1 = action;
              _this.defer(sendAction_1);
              break;
            }
            case send:
              var sendAction = action;
              if (typeof sendAction.delay === "number") {
                _this.defer(sendAction);
                return;
              } else {
                if (sendAction.to) {
                  _this.sendTo(sendAction._event, sendAction.to, _event === initEvent);
                } else {
                  _this.send(sendAction._event);
                }
              }
              break;
            case cancel:
              _this.cancel(action.sendId);
              break;
            case start: {
              if (_this.status !== InterpreterStatus.Running) {
                return;
              }
              var activity = action.activity;
              if (
                // in v4 with `predictableActionArguments` invokes are called eagerly when the `this.state` still points to the previous state
                !_this.machine.config.predictableActionArguments && !_this.state.activities[activity.id || activity.type]
              ) {
                break;
              }
              if (activity.type === ActionTypes.Invoke) {
                var invokeSource = toInvokeSource(activity.src);
                var serviceCreator = _this.machine.options.services ? _this.machine.options.services[invokeSource.type] : void 0;
                var id2 = activity.id, data = activity.data;
                if (!IS_PRODUCTION) {
                  warn(
                    !("forward" in activity),
                    // tslint:disable-next-line:max-line-length
                    "`forward` property is deprecated (found in invocation of '".concat(activity.src, "' in in machine '").concat(_this.machine.id, "'). ") + "Please use `autoForward` instead."
                  );
                }
                var autoForward = "autoForward" in activity ? activity.autoForward : !!activity.forward;
                if (!serviceCreator) {
                  if (!IS_PRODUCTION) {
                    warn(false, "No service found for invocation '".concat(activity.src, "' in machine '").concat(_this.machine.id, "'."));
                  }
                  return;
                }
                var resolvedData = data ? mapContext(data, context, _event) : void 0;
                if (typeof serviceCreator === "string") {
                  return;
                }
                var source = isFunction(serviceCreator) ? serviceCreator(context, _event.data, {
                  data: resolvedData,
                  src: invokeSource,
                  meta: activity.meta
                }) : serviceCreator;
                if (!source) {
                  return;
                }
                var options2 = void 0;
                if (isMachine(source)) {
                  source = resolvedData ? source.withContext(resolvedData) : source;
                  options2 = {
                    autoForward
                  };
                }
                _this.spawn(source, id2, options2);
              } else {
                _this.spawnActivity(activity);
              }
              break;
            }
            case stop: {
              _this.stopChild(action.activity.id);
              break;
            }
            case log:
              var _a2 = action, label = _a2.label, value = _a2.value;
              if (label) {
                _this.logger(label, value);
              } else {
                _this.logger(value);
              }
              break;
            default:
              if (!IS_PRODUCTION) {
                warn(false, "No implementation found for action type '".concat(action.type, "'"));
              }
              break;
          }
        };
        var resolvedOptions = __assign(__assign({}, Interpreter2.defaultOptions), options);
        var clock = resolvedOptions.clock, logger = resolvedOptions.logger, parent = resolvedOptions.parent, id = resolvedOptions.id;
        var resolvedId = id !== void 0 ? id : machine.id;
        this.id = resolvedId;
        this.logger = logger;
        this.clock = clock;
        this.parent = parent;
        this.options = resolvedOptions;
        this.scheduler = new Scheduler({
          deferEvents: this.options.deferEvents
        });
        this.sessionId = registry.bookId();
      }
      Object.defineProperty(Interpreter2.prototype, "initialState", {
        get: function() {
          var _this = this;
          if (this._initialState) {
            return this._initialState;
          }
          return provide(this, function() {
            _this._initialState = _this.machine.initialState;
            return _this._initialState;
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Interpreter2.prototype, "state", {
        /**
         * @deprecated Use `.getSnapshot()` instead.
         */
        get: function() {
          if (!IS_PRODUCTION) {
            warn(this.status !== InterpreterStatus.NotStarted, "Attempted to read state from uninitialized service '".concat(this.id, "'. Make sure the service is started first."));
          }
          return this._state;
        },
        enumerable: false,
        configurable: true
      });
      Interpreter2.prototype.execute = function(state, actionsConfig) {
        var e_1, _a2;
        try {
          for (var _b = __values(state.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
            var action = _c.value;
            this.exec(action, state, actionsConfig);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      };
      Interpreter2.prototype.update = function(state, _event) {
        var e_2, _a2, e_3, _b, e_4, _c, e_5, _d;
        var _this = this;
        state._sessionid = this.sessionId;
        this._state = state;
        if ((!this.machine.config.predictableActionArguments || // this is currently required to execute initial actions as the `initialState` gets cached
        // we can't just recompute it (and execute actions while doing so) because we try to preserve identity of actors created within initial assigns
        _event === initEvent) && this.options.execute) {
          this.execute(this.state);
        } else {
          var item = void 0;
          while (item = this._outgoingQueue.shift()) {
            item[0].send(item[1]);
          }
        }
        this.children.forEach(function(child) {
          _this.state.children[child.id] = child;
        });
        if (this.devTools) {
          this.devTools.send(_event.data, state);
        }
        if (state.event) {
          try {
            for (var _e2 = __values(this.eventListeners), _f = _e2.next(); !_f.done; _f = _e2.next()) {
              var listener = _f.value;
              listener(state.event);
            }
          } catch (e_2_1) {
            e_2 = {
              error: e_2_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_a2 = _e2.return)) _a2.call(_e2);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
        try {
          for (var _g = __values(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()) {
            var listener = _h.value;
            listener(state, state.event);
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        try {
          for (var _j = __values(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()) {
            var contextListener = _k.value;
            contextListener(this.state.context, this.state.history ? this.state.history.context : void 0);
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        } finally {
          try {
            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        if (this.state.done) {
          var finalChildStateNode = state.configuration.find(function(sn) {
            return sn.type === "final" && sn.parent === _this.machine;
          });
          var doneData = finalChildStateNode && finalChildStateNode.doneData ? mapContext(finalChildStateNode.doneData, state.context, _event) : void 0;
          this._doneEvent = doneInvoke(this.id, doneData);
          try {
            for (var _l = __values(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()) {
              var listener = _m.value;
              listener(this._doneEvent);
            }
          } catch (e_5_1) {
            e_5 = {
              error: e_5_1
            };
          } finally {
            try {
              if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
            } finally {
              if (e_5) throw e_5.error;
            }
          }
          this._stop();
          this._stopChildren();
          registry.free(this.sessionId);
        }
      };
      Interpreter2.prototype.onTransition = function(listener) {
        this.listeners.add(listener);
        if (this.status === InterpreterStatus.Running) {
          listener(this.state, this.state.event);
        }
        return this;
      };
      Interpreter2.prototype.subscribe = function(nextListenerOrObserver, _4, completeListener) {
        var _this = this;
        var observer = toObserver(nextListenerOrObserver, _4, completeListener);
        this.listeners.add(observer.next);
        if (this.status !== InterpreterStatus.NotStarted) {
          observer.next(this.state);
        }
        var completeOnce = function() {
          _this.doneListeners.delete(completeOnce);
          _this.stopListeners.delete(completeOnce);
          observer.complete();
        };
        if (this.status === InterpreterStatus.Stopped) {
          observer.complete();
        } else {
          this.onDone(completeOnce);
          this.onStop(completeOnce);
        }
        return {
          unsubscribe: function() {
            _this.listeners.delete(observer.next);
            _this.doneListeners.delete(completeOnce);
            _this.stopListeners.delete(completeOnce);
          }
        };
      };
      Interpreter2.prototype.onEvent = function(listener) {
        this.eventListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onSend = function(listener) {
        this.sendListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onChange = function(listener) {
        this.contextListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onStop = function(listener) {
        this.stopListeners.add(listener);
        return this;
      };
      Interpreter2.prototype.onDone = function(listener) {
        if (this.status === InterpreterStatus.Stopped && this._doneEvent) {
          listener(this._doneEvent);
        } else {
          this.doneListeners.add(listener);
        }
        return this;
      };
      Interpreter2.prototype.off = function(listener) {
        this.listeners.delete(listener);
        this.eventListeners.delete(listener);
        this.sendListeners.delete(listener);
        this.stopListeners.delete(listener);
        this.doneListeners.delete(listener);
        this.contextListeners.delete(listener);
        return this;
      };
      Interpreter2.prototype.start = function(initialState) {
        var _this = this;
        if (this.status === InterpreterStatus.Running) {
          return this;
        }
        this.machine._init();
        registry.register(this.sessionId, this);
        this.initialized = true;
        this.status = InterpreterStatus.Running;
        var resolvedState = initialState === void 0 ? this.initialState : provide(this, function() {
          return isStateConfig(initialState) ? _this.machine.resolveState(initialState) : _this.machine.resolveState(State.from(initialState, _this.machine.context));
        });
        if (this.options.devTools) {
          this.attachDev();
        }
        this.scheduler.initialize(function() {
          _this.update(resolvedState, initEvent);
        });
        return this;
      };
      Interpreter2.prototype._stopChildren = function() {
        this.children.forEach(function(child) {
          if (isFunction(child.stop)) {
            child.stop();
          }
        });
        this.children.clear();
      };
      Interpreter2.prototype._stop = function() {
        var e_6, _a2, e_7, _b, e_8, _c, e_9, _d, e_10, _e2;
        try {
          for (var _f = __values(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()) {
            var listener = _g.value;
            this.listeners.delete(listener);
          }
        } catch (e_6_1) {
          e_6 = {
            error: e_6_1
          };
        } finally {
          try {
            if (_g && !_g.done && (_a2 = _f.return)) _a2.call(_f);
          } finally {
            if (e_6) throw e_6.error;
          }
        }
        try {
          for (var _h = __values(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()) {
            var listener = _j.value;
            listener();
            this.stopListeners.delete(listener);
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
          } finally {
            if (e_7) throw e_7.error;
          }
        }
        try {
          for (var _k = __values(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()) {
            var listener = _l.value;
            this.contextListeners.delete(listener);
          }
        } catch (e_8_1) {
          e_8 = {
            error: e_8_1
          };
        } finally {
          try {
            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
          } finally {
            if (e_8) throw e_8.error;
          }
        }
        try {
          for (var _m = __values(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()) {
            var listener = _o.value;
            this.doneListeners.delete(listener);
          }
        } catch (e_9_1) {
          e_9 = {
            error: e_9_1
          };
        } finally {
          try {
            if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
          } finally {
            if (e_9) throw e_9.error;
          }
        }
        if (!this.initialized) {
          return this;
        }
        this.initialized = false;
        this.status = InterpreterStatus.Stopped;
        this._initialState = void 0;
        try {
          for (var _p = __values(Object.keys(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()) {
            var key = _q.value;
            this.clock.clearTimeout(this.delayedEventsMap[key]);
          }
        } catch (e_10_1) {
          e_10 = {
            error: e_10_1
          };
        } finally {
          try {
            if (_q && !_q.done && (_e2 = _p.return)) _e2.call(_p);
          } finally {
            if (e_10) throw e_10.error;
          }
        }
        this.scheduler.clear();
        this.scheduler = new Scheduler({
          deferEvents: this.options.deferEvents
        });
      };
      Interpreter2.prototype.stop = function() {
        var _this = this;
        var scheduler = this.scheduler;
        this._stop();
        scheduler.schedule(function() {
          var _a2;
          if ((_a2 = _this._state) === null || _a2 === void 0 ? void 0 : _a2.done) {
            return;
          }
          var _event = toSCXMLEvent({
            type: "xstate.stop"
          });
          var nextState = provide(_this, function() {
            var exitActions = flatten(__spreadArray([], __read(_this.state.configuration), false).sort(function(a, b3) {
              return b3.order - a.order;
            }).map(function(stateNode) {
              return toActionObjects(stateNode.onExit, _this.machine.options.actions);
            }));
            var _a3 = __read(resolveActions(_this.machine, _this.state, _this.state.context, _event, [{
              type: "exit",
              actions: exitActions
            }], _this.machine.config.predictableActionArguments ? _this._exec : void 0, _this.machine.config.predictableActionArguments || _this.machine.config.preserveActionOrder), 2), resolvedActions = _a3[0], updatedContext = _a3[1];
            var newState = new State({
              value: _this.state.value,
              context: updatedContext,
              _event,
              _sessionid: _this.sessionId,
              historyValue: void 0,
              history: _this.state,
              actions: resolvedActions.filter(function(action) {
                return !isRaisableAction(action);
              }),
              activities: {},
              events: [],
              configuration: [],
              transitions: [],
              children: {},
              done: _this.state.done,
              tags: _this.state.tags,
              machine: _this.machine
            });
            newState.changed = true;
            return newState;
          });
          _this.update(nextState, _event);
          _this._stopChildren();
          registry.free(_this.sessionId);
        });
        return this;
      };
      Interpreter2.prototype.batch = function(events) {
        var _this = this;
        if (this.status === InterpreterStatus.NotStarted && this.options.deferEvents) {
          if (!IS_PRODUCTION) {
            warn(false, "".concat(events.length, ' event(s) were sent to uninitialized service "').concat(this.machine.id, '" and are deferred. Make sure .start() is called for this service.\nEvent: ').concat(JSON.stringify(event)));
          }
        } else if (this.status !== InterpreterStatus.Running) {
          throw new Error(
            // tslint:disable-next-line:max-line-length
            "".concat(events.length, ' event(s) were sent to uninitialized service "').concat(this.machine.id, '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.')
          );
        }
        if (!events.length) {
          return;
        }
        var exec = !!this.machine.config.predictableActionArguments && this._exec;
        this.scheduler.schedule(function() {
          var e_11, _a2;
          var nextState = _this.state;
          var batchChanged = false;
          var batchedActions = [];
          var _loop_1 = function(event_12) {
            var _event = toSCXMLEvent(event_12);
            _this.forward(_event);
            nextState = provide(_this, function() {
              return _this.machine.transition(nextState, _event, void 0, exec || void 0);
            });
            batchedActions.push.apply(batchedActions, __spreadArray([], __read(_this.machine.config.predictableActionArguments ? nextState.actions : nextState.actions.map(function(a) {
              return bindActionToState(a, nextState);
            })), false));
            batchChanged = batchChanged || !!nextState.changed;
          };
          try {
            for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
              var event_1 = events_1_1.value;
              _loop_1(event_1);
            }
          } catch (e_11_1) {
            e_11 = {
              error: e_11_1
            };
          } finally {
            try {
              if (events_1_1 && !events_1_1.done && (_a2 = events_1.return)) _a2.call(events_1);
            } finally {
              if (e_11) throw e_11.error;
            }
          }
          nextState.changed = batchChanged;
          nextState.actions = batchedActions;
          _this.update(nextState, toSCXMLEvent(events[events.length - 1]));
        });
      };
      Interpreter2.prototype.sender = function(event2) {
        return this.send.bind(this, event2);
      };
      Interpreter2.prototype._nextState = function(event2, exec) {
        var _this = this;
        if (exec === void 0) {
          exec = !!this.machine.config.predictableActionArguments && this._exec;
        }
        var _event = toSCXMLEvent(event2);
        if (_event.name.indexOf(errorPlatform) === 0 && !this.state.nextEvents.some(function(nextEvent) {
          return nextEvent.indexOf(errorPlatform) === 0;
        })) {
          throw _event.data.data;
        }
        var nextState = provide(this, function() {
          return _this.machine.transition(_this.state, _event, void 0, exec || void 0);
        });
        return nextState;
      };
      Interpreter2.prototype.nextState = function(event2) {
        return this._nextState(event2, false);
      };
      Interpreter2.prototype.forward = function(event2) {
        var e_12, _a2;
        try {
          for (var _b = __values(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()) {
            var id = _c.value;
            var child = this.children.get(id);
            if (!child) {
              throw new Error("Unable to forward event '".concat(event2, "' from interpreter '").concat(this.id, "' to nonexistant child '").concat(id, "'."));
            }
            child.send(event2);
          }
        } catch (e_12_1) {
          e_12 = {
            error: e_12_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_12) throw e_12.error;
          }
        }
      };
      Interpreter2.prototype.defer = function(sendAction) {
        var _this = this;
        var timerId = this.clock.setTimeout(function() {
          if ("to" in sendAction && sendAction.to) {
            _this.sendTo(sendAction._event, sendAction.to, true);
          } else {
            _this.send(sendAction._event);
          }
        }, sendAction.delay);
        if (sendAction.id) {
          this.delayedEventsMap[sendAction.id] = timerId;
        }
      };
      Interpreter2.prototype.cancel = function(sendId) {
        this.clock.clearTimeout(this.delayedEventsMap[sendId]);
        delete this.delayedEventsMap[sendId];
      };
      Interpreter2.prototype.exec = function(action, state, actionFunctionMap) {
        if (actionFunctionMap === void 0) {
          actionFunctionMap = this.machine.options.actions;
        }
        this._exec(action, state.context, state._event, actionFunctionMap);
      };
      Interpreter2.prototype.removeChild = function(childId) {
        var _a2;
        this.children.delete(childId);
        this.forwardTo.delete(childId);
        (_a2 = this.state) === null || _a2 === void 0 ? true : delete _a2.children[childId];
      };
      Interpreter2.prototype.stopChild = function(childId) {
        var child = this.children.get(childId);
        if (!child) {
          return;
        }
        this.removeChild(childId);
        if (isFunction(child.stop)) {
          child.stop();
        }
      };
      Interpreter2.prototype.spawn = function(entity, name, options) {
        if (this.status !== InterpreterStatus.Running) {
          return createDeferredActor(entity, name);
        }
        if (isPromiseLike(entity)) {
          return this.spawnPromise(Promise.resolve(entity), name);
        } else if (isFunction(entity)) {
          return this.spawnCallback(entity, name);
        } else if (isSpawnedActor(entity)) {
          return this.spawnActor(entity, name);
        } else if (isObservable(entity)) {
          return this.spawnObservable(entity, name);
        } else if (isMachine(entity)) {
          return this.spawnMachine(entity, __assign(__assign({}, options), {
            id: name
          }));
        } else if (isBehavior(entity)) {
          return this.spawnBehavior(entity, name);
        } else {
          throw new Error('Unable to spawn entity "'.concat(name, '" of type "').concat(typeof entity, '".'));
        }
      };
      Interpreter2.prototype.spawnMachine = function(machine, options) {
        var _this = this;
        if (options === void 0) {
          options = {};
        }
        var childService = new Interpreter2(machine, __assign(__assign({}, this.options), {
          parent: this,
          id: options.id || machine.id
        }));
        var resolvedOptions = __assign(__assign({}, DEFAULT_SPAWN_OPTIONS), options);
        if (resolvedOptions.sync) {
          childService.onTransition(function(state) {
            _this.send(update, {
              state,
              id: childService.id
            });
          });
        }
        var actor = childService;
        this.children.set(childService.id, actor);
        if (resolvedOptions.autoForward) {
          this.forwardTo.add(childService.id);
        }
        childService.onDone(function(doneEvent) {
          _this.removeChild(childService.id);
          _this.send(toSCXMLEvent(doneEvent, {
            origin: childService.id
          }));
        }).start();
        return actor;
      };
      Interpreter2.prototype.spawnBehavior = function(behavior, id) {
        var actorRef = spawnBehavior(behavior, {
          id,
          parent: this
        });
        this.children.set(id, actorRef);
        return actorRef;
      };
      Interpreter2.prototype.spawnPromise = function(promise, id) {
        var _a2;
        var _this = this;
        var canceled = false;
        var resolvedData;
        promise.then(function(response) {
          if (!canceled) {
            resolvedData = response;
            _this.removeChild(id);
            _this.send(toSCXMLEvent(doneInvoke(id, response), {
              origin: id
            }));
          }
        }, function(errorData) {
          if (!canceled) {
            _this.removeChild(id);
            var errorEvent = error2(id, errorData);
            try {
              _this.send(toSCXMLEvent(errorEvent, {
                origin: id
              }));
            } catch (error3) {
              reportUnhandledExceptionOnInvocation(errorData, error3, id);
              if (_this.devTools) {
                _this.devTools.send(errorEvent, _this.state);
              }
              if (_this.machine.strict) {
                _this.stop();
              }
            }
          }
        });
        var actor = (_a2 = {
          id,
          send: function() {
            return void 0;
          },
          subscribe: function(next, handleError, complete) {
            var observer = toObserver(next, handleError, complete);
            var unsubscribed = false;
            promise.then(function(response) {
              if (unsubscribed) {
                return;
              }
              observer.next(response);
              if (unsubscribed) {
                return;
              }
              observer.complete();
            }, function(err) {
              if (unsubscribed) {
                return;
              }
              observer.error(err);
            });
            return {
              unsubscribe: function() {
                return unsubscribed = true;
              }
            };
          },
          stop: function() {
            canceled = true;
          },
          toJSON: function() {
            return {
              id
            };
          },
          getSnapshot: function() {
            return resolvedData;
          }
        }, _a2[symbolObservable] = function() {
          return this;
        }, _a2);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnCallback = function(callback, id) {
        var _a2;
        var _this = this;
        var canceled = false;
        var receivers = /* @__PURE__ */ new Set();
        var listeners = /* @__PURE__ */ new Set();
        var emitted;
        var receive = function(e2) {
          emitted = e2;
          listeners.forEach(function(listener) {
            return listener(e2);
          });
          if (canceled) {
            return;
          }
          _this.send(toSCXMLEvent(e2, {
            origin: id
          }));
        };
        var callbackStop;
        try {
          callbackStop = callback(receive, function(newListener) {
            receivers.add(newListener);
          });
        } catch (err) {
          this.send(error2(id, err));
        }
        if (isPromiseLike(callbackStop)) {
          return this.spawnPromise(callbackStop, id);
        }
        var actor = (_a2 = {
          id,
          send: function(event2) {
            return receivers.forEach(function(receiver) {
              return receiver(event2);
            });
          },
          subscribe: function(next) {
            var observer = toObserver(next);
            listeners.add(observer.next);
            return {
              unsubscribe: function() {
                listeners.delete(observer.next);
              }
            };
          },
          stop: function() {
            canceled = true;
            if (isFunction(callbackStop)) {
              callbackStop();
            }
          },
          toJSON: function() {
            return {
              id
            };
          },
          getSnapshot: function() {
            return emitted;
          }
        }, _a2[symbolObservable] = function() {
          return this;
        }, _a2);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnObservable = function(source, id) {
        var _a2;
        var _this = this;
        var emitted;
        var subscription = source.subscribe(function(value) {
          emitted = value;
          _this.send(toSCXMLEvent(value, {
            origin: id
          }));
        }, function(err) {
          _this.removeChild(id);
          _this.send(toSCXMLEvent(error2(id, err), {
            origin: id
          }));
        }, function() {
          _this.removeChild(id);
          _this.send(toSCXMLEvent(doneInvoke(id), {
            origin: id
          }));
        });
        var actor = (_a2 = {
          id,
          send: function() {
            return void 0;
          },
          subscribe: function(next, handleError, complete) {
            return source.subscribe(next, handleError, complete);
          },
          stop: function() {
            return subscription.unsubscribe();
          },
          getSnapshot: function() {
            return emitted;
          },
          toJSON: function() {
            return {
              id
            };
          }
        }, _a2[symbolObservable] = function() {
          return this;
        }, _a2);
        this.children.set(id, actor);
        return actor;
      };
      Interpreter2.prototype.spawnActor = function(actor, name) {
        this.children.set(name, actor);
        return actor;
      };
      Interpreter2.prototype.spawnActivity = function(activity) {
        var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : void 0;
        if (!implementation) {
          if (!IS_PRODUCTION) {
            warn(false, "No implementation found for activity '".concat(activity.type, "'"));
          }
          return;
        }
        var dispose = implementation(this.state.context, activity);
        this.spawnEffect(activity.id, dispose);
      };
      Interpreter2.prototype.spawnEffect = function(id, dispose) {
        var _a2;
        this.children.set(id, (_a2 = {
          id,
          send: function() {
            return void 0;
          },
          subscribe: function() {
            return {
              unsubscribe: function() {
                return void 0;
              }
            };
          },
          stop: dispose || void 0,
          getSnapshot: function() {
            return void 0;
          },
          toJSON: function() {
            return {
              id
            };
          }
        }, _a2[symbolObservable] = function() {
          return this;
        }, _a2));
      };
      Interpreter2.prototype.attachDev = function() {
        var global2 = getGlobal();
        if (this.options.devTools && global2) {
          if (global2.__REDUX_DEVTOOLS_EXTENSION__) {
            var devToolsOptions = typeof this.options.devTools === "object" ? this.options.devTools : void 0;
            this.devTools = global2.__REDUX_DEVTOOLS_EXTENSION__.connect(__assign(__assign({
              name: this.id,
              autoPause: true,
              stateSanitizer: function(state) {
                return {
                  value: state.value,
                  context: state.context,
                  actions: state.actions
                };
              }
            }, devToolsOptions), {
              features: __assign({
                jump: false,
                skip: false
              }, devToolsOptions ? devToolsOptions.features : void 0)
            }), this.machine);
            this.devTools.init(this.state);
          }
          registerService(this);
        }
      };
      Interpreter2.prototype.toJSON = function() {
        return {
          id: this.id
        };
      };
      Interpreter2.prototype[symbolObservable] = function() {
        return this;
      };
      Interpreter2.prototype.getSnapshot = function() {
        if (this.status === InterpreterStatus.NotStarted) {
          return this.initialState;
        }
        return this._state;
      };
      Interpreter2.defaultOptions = {
        execute: true,
        deferEvents: true,
        clock: {
          setTimeout: function(fn, ms) {
            return setTimeout(fn, ms);
          },
          clearTimeout: function(id) {
            return clearTimeout(id);
          }
        },
        logger: /* @__PURE__ */ console.log.bind(console),
        devTools: false
      };
      Interpreter2.interpret = interpret;
      return Interpreter2;
    })()
  );
  var resolveSpawnOptions = function(nameOrOptions) {
    if (isString(nameOrOptions)) {
      return __assign(__assign({}, DEFAULT_SPAWN_OPTIONS), {
        name: nameOrOptions
      });
    }
    return __assign(__assign(__assign({}, DEFAULT_SPAWN_OPTIONS), {
      name: uniqueId()
    }), nameOrOptions);
  };
  function spawn(entity, nameOrOptions) {
    var resolvedOptions = resolveSpawnOptions(nameOrOptions);
    return consume(function(service) {
      if (!IS_PRODUCTION) {
        var isLazyEntity = isMachine(entity) || isFunction(entity);
        warn(!!service || isLazyEntity, 'Attempted to spawn an Actor (ID: "'.concat(isMachine(entity) ? entity.id : "undefined", '") outside of a service. This will have no effect.'));
      }
      if (service) {
        return service.spawn(entity, resolvedOptions.name, resolvedOptions);
      } else {
        return createDeferredActor(entity, resolvedOptions.name);
      }
    });
  }
  function interpret(machine, options) {
    var interpreter = new Interpreter(machine, options);
    return interpreter;
  }

  // node_modules/xstate/es/invokeUtils.js
  function toInvokeSource2(src) {
    if (typeof src === "string") {
      var simpleSrc = {
        type: src
      };
      simpleSrc.toString = function() {
        return src;
      };
      return simpleSrc;
    }
    return src;
  }
  function toInvokeDefinition(invokeConfig) {
    return __assign(__assign({
      type: invoke
    }, invokeConfig), {
      toJSON: function() {
        invokeConfig.onDone;
        invokeConfig.onError;
        var invokeDef = __rest(invokeConfig, ["onDone", "onError"]);
        return __assign(__assign({}, invokeDef), {
          type: invoke,
          src: toInvokeSource2(invokeConfig.src)
        });
      }
    });
  }

  // node_modules/xstate/es/StateNode.js
  var NULL_EVENT = "";
  var STATE_IDENTIFIER = "#";
  var WILDCARD = "*";
  var EMPTY_OBJECT = {};
  var isStateId = function(str) {
    return str[0] === STATE_IDENTIFIER;
  };
  var createDefaultOptions = function() {
    return {
      actions: {},
      guards: {},
      services: {},
      activities: {},
      delays: {}
    };
  };
  var validateArrayifiedTransitions = function(stateNode, event2, transitions) {
    var hasNonLastUnguardedTarget = transitions.slice(0, -1).some(function(transition) {
      return !("cond" in transition) && !("in" in transition) && (isString(transition.target) || isMachine(transition.target));
    });
    var eventText = event2 === NULL_EVENT ? "the transient event" : "event '".concat(event2, "'");
    warn(!hasNonLastUnguardedTarget, "One or more transitions for ".concat(eventText, " on state '").concat(stateNode.id, "' are unreachable. ") + "Make sure that the default transition is the last one defined.");
  };
  var StateNode = (
    /** @class */
    /* @__PURE__ */ (function() {
      function StateNode2(config, options, _context, _stateInfo) {
        if (_context === void 0) {
          _context = "context" in config ? config.context : void 0;
        }
        var _this = this;
        var _a2;
        this.config = config;
        this._context = _context;
        this.order = -1;
        this.__xstatenode = true;
        this.__cache = {
          events: void 0,
          relativeValue: /* @__PURE__ */ new Map(),
          initialStateValue: void 0,
          initialState: void 0,
          on: void 0,
          transitions: void 0,
          candidates: {},
          delayedTransitions: void 0
        };
        this.idMap = {};
        this.tags = [];
        this.options = Object.assign(createDefaultOptions(), options);
        this.parent = _stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.parent;
        this.key = this.config.key || (_stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.key) || this.config.id || "(machine)";
        this.machine = this.parent ? this.parent.machine : this;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER);
        this.id = this.config.id || __spreadArray([this.machine.key], __read(this.path), false).join(this.delimiter);
        this.version = this.parent ? this.parent.version : this.config.version;
        this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
        this.schema = this.parent ? this.machine.schema : (_a2 = this.config.schema) !== null && _a2 !== void 0 ? _a2 : {};
        this.description = this.config.description;
        if (!IS_PRODUCTION) {
          warn(!("parallel" in this.config), 'The "parallel" property is deprecated and will be removed in version 4.1. '.concat(this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '".concat(this.type, "'`"), " in the config for state node '").concat(this.id, "' instead."));
        }
        this.initial = this.config.initial;
        this.states = this.config.states ? mapValues(this.config.states, function(stateConfig, key) {
          var _a3;
          var stateNode = new StateNode2(stateConfig, {}, void 0, {
            parent: _this,
            key
          });
          Object.assign(_this.idMap, __assign((_a3 = {}, _a3[stateNode.id] = stateNode, _a3), stateNode.idMap));
          return stateNode;
        }) : EMPTY_OBJECT;
        var order = 0;
        function dfs(stateNode) {
          var e_1, _a3;
          stateNode.order = order++;
          try {
            for (var _b = __values(getAllChildren(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()) {
              var child = _c.value;
              dfs(child);
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        dfs(this);
        this.history = this.config.history === true ? "shallow" : this.config.history || false;
        this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function(_a3) {
          var event2 = _a3.event;
          return event2 === NULL_EVENT;
        }) : NULL_EVENT in this.config.on);
        this.strict = !!this.config.strict;
        this.onEntry = toArray(this.config.entry || this.config.onEntry).map(function(action) {
          return toActionObject(action);
        });
        this.onExit = toArray(this.config.exit || this.config.onExit).map(function(action) {
          return toActionObject(action);
        });
        this.meta = this.config.meta;
        this.doneData = this.type === "final" ? this.config.data : void 0;
        this.invoke = toArray(this.config.invoke).map(function(invokeConfig, i) {
          var _a3, _b;
          if (isMachine(invokeConfig)) {
            var invokeId = createInvokeId(_this.id, i);
            _this.machine.options.services = __assign((_a3 = {}, _a3[invokeId] = invokeConfig, _a3), _this.machine.options.services);
            return toInvokeDefinition({
              src: invokeId,
              id: invokeId
            });
          } else if (isString(invokeConfig.src)) {
            var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
            return toInvokeDefinition(__assign(__assign({}, invokeConfig), {
              id: invokeId,
              src: invokeConfig.src
            }));
          } else if (isMachine(invokeConfig.src) || isFunction(invokeConfig.src)) {
            var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
            _this.machine.options.services = __assign((_b = {}, _b[invokeId] = invokeConfig.src, _b), _this.machine.options.services);
            return toInvokeDefinition(__assign(__assign({
              id: invokeId
            }, invokeConfig), {
              src: invokeId
            }));
          } else {
            var invokeSource = invokeConfig.src;
            return toInvokeDefinition(__assign(__assign({
              id: createInvokeId(_this.id, i)
            }, invokeConfig), {
              src: invokeSource
            }));
          }
        });
        this.activities = toArray(this.config.activities).concat(this.invoke).map(function(activity) {
          return toActivityDefinition(activity);
        });
        this.transition = this.transition.bind(this);
        this.tags = toArray(this.config.tags);
      }
      StateNode2.prototype._init = function() {
        if (this.__cache.transitions) {
          return;
        }
        getAllStateNodes(this).forEach(function(stateNode) {
          return stateNode.on;
        });
      };
      StateNode2.prototype.withConfig = function(options, context) {
        var _a2 = this.options, actions = _a2.actions, activities = _a2.activities, guards = _a2.guards, services = _a2.services, delays = _a2.delays;
        return new StateNode2(this.config, {
          actions: __assign(__assign({}, actions), options.actions),
          activities: __assign(__assign({}, activities), options.activities),
          guards: __assign(__assign({}, guards), options.guards),
          services: __assign(__assign({}, services), options.services),
          delays: __assign(__assign({}, delays), options.delays)
        }, context !== null && context !== void 0 ? context : this.context);
      };
      StateNode2.prototype.withContext = function(context) {
        return new StateNode2(this.config, this.options, context);
      };
      Object.defineProperty(StateNode2.prototype, "context", {
        get: function() {
          return isFunction(this._context) ? this._context() : this._context;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "definition", {
        /**
         * The well-structured state node definition.
         */
        get: function() {
          return {
            id: this.id,
            key: this.key,
            version: this.version,
            context: this.context,
            type: this.type,
            initial: this.initial,
            history: this.history,
            states: mapValues(this.states, function(state) {
              return state.definition;
            }),
            on: this.on,
            transitions: this.transitions,
            entry: this.onEntry,
            exit: this.onExit,
            activities: this.activities || [],
            meta: this.meta,
            order: this.order || -1,
            data: this.doneData,
            invoke: this.invoke,
            description: this.description,
            tags: this.tags
          };
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.toJSON = function() {
        return this.definition;
      };
      Object.defineProperty(StateNode2.prototype, "on", {
        /**
         * The mapping of events to transitions.
         */
        get: function() {
          if (this.__cache.on) {
            return this.__cache.on;
          }
          var transitions = this.transitions;
          return this.__cache.on = transitions.reduce(function(map, transition) {
            map[transition.eventType] = map[transition.eventType] || [];
            map[transition.eventType].push(transition);
            return map;
          }, {});
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "after", {
        get: function() {
          return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "transitions", {
        /**
         * All the transitions that can be taken from this state node.
         */
        get: function() {
          return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.getCandidates = function(eventName) {
        if (this.__cache.candidates[eventName]) {
          return this.__cache.candidates[eventName];
        }
        var transient = eventName === NULL_EVENT;
        var candidates = this.transitions.filter(function(transition) {
          var sameEventType = transition.eventType === eventName;
          return transient ? sameEventType : sameEventType || transition.eventType === WILDCARD;
        });
        this.__cache.candidates[eventName] = candidates;
        return candidates;
      };
      StateNode2.prototype.getDelayedTransitions = function() {
        var _this = this;
        var afterConfig = this.config.after;
        if (!afterConfig) {
          return [];
        }
        var mutateEntryExit = function(delay, i) {
          var delayRef = isFunction(delay) ? "".concat(_this.id, ":delay[").concat(i, "]") : delay;
          var eventType = after2(delayRef, _this.id);
          _this.onEntry.push(send2(eventType, {
            delay
          }));
          _this.onExit.push(cancel2(eventType));
          return eventType;
        };
        var delayedTransitions = isArray(afterConfig) ? afterConfig.map(function(transition, i) {
          var eventType = mutateEntryExit(transition.delay, i);
          return __assign(__assign({}, transition), {
            event: eventType
          });
        }) : flatten(Object.keys(afterConfig).map(function(delay, i) {
          var configTransition = afterConfig[delay];
          var resolvedTransition = isString(configTransition) ? {
            target: configTransition
          } : configTransition;
          var resolvedDelay = !isNaN(+delay) ? +delay : delay;
          var eventType = mutateEntryExit(resolvedDelay, i);
          return toArray(resolvedTransition).map(function(transition) {
            return __assign(__assign({}, transition), {
              event: eventType,
              delay: resolvedDelay
            });
          });
        }));
        return delayedTransitions.map(function(delayedTransition) {
          var delay = delayedTransition.delay;
          return __assign(__assign({}, _this.formatTransition(delayedTransition)), {
            delay
          });
        });
      };
      StateNode2.prototype.getStateNodes = function(state) {
        var _a2;
        var _this = this;
        if (!state) {
          return [];
        }
        var stateValue = state instanceof State ? state.value : toStateValue(state, this.delimiter);
        if (isString(stateValue)) {
          var initialStateValue = this.getStateNode(stateValue).initial;
          return initialStateValue !== void 0 ? this.getStateNodes((_a2 = {}, _a2[stateValue] = initialStateValue, _a2)) : [this, this.states[stateValue]];
        }
        var subStateKeys = Object.keys(stateValue);
        var subStateNodes = [this];
        subStateNodes.push.apply(subStateNodes, __spreadArray([], __read(flatten(subStateKeys.map(function(subStateKey) {
          return _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
        }))), false));
        return subStateNodes;
      };
      StateNode2.prototype.handles = function(event2) {
        var eventType = getEventType(event2);
        return this.events.includes(eventType);
      };
      StateNode2.prototype.resolveState = function(state) {
        var stateFromConfig = state instanceof State ? state : State.create(state);
        var configuration = Array.from(getConfiguration([], this.getStateNodes(stateFromConfig.value)));
        return new State(__assign(__assign({}, stateFromConfig), {
          value: this.resolve(stateFromConfig.value),
          configuration,
          done: isInFinalState(configuration, this),
          tags: getTagsFromConfiguration(configuration),
          machine: this.machine
        }));
      };
      StateNode2.prototype.transitionLeafNode = function(stateValue, state, _event) {
        var stateNode = this.getStateNode(stateValue);
        var next = stateNode.next(state, _event);
        if (!next || !next.transitions.length) {
          return this.next(state, _event);
        }
        return next;
      };
      StateNode2.prototype.transitionCompoundNode = function(stateValue, state, _event) {
        var subStateKeys = Object.keys(stateValue);
        var stateNode = this.getStateNode(subStateKeys[0]);
        var next = stateNode._transition(stateValue[subStateKeys[0]], state, _event);
        if (!next || !next.transitions.length) {
          return this.next(state, _event);
        }
        return next;
      };
      StateNode2.prototype.transitionParallelNode = function(stateValue, state, _event) {
        var e_2, _a2;
        var transitionMap = {};
        try {
          for (var _b = __values(Object.keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var subStateKey = _c.value;
            var subStateValue = stateValue[subStateKey];
            if (!subStateValue) {
              continue;
            }
            var subStateNode = this.getStateNode(subStateKey);
            var next = subStateNode._transition(subStateValue, state, _event);
            if (next) {
              transitionMap[subStateKey] = next;
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        var stateTransitions = Object.keys(transitionMap).map(function(key) {
          return transitionMap[key];
        });
        var enabledTransitions = flatten(stateTransitions.map(function(st) {
          return st.transitions;
        }));
        var willTransition = stateTransitions.some(function(st) {
          return st.transitions.length > 0;
        });
        if (!willTransition) {
          return this.next(state, _event);
        }
        var configuration = flatten(Object.keys(transitionMap).map(function(key) {
          return transitionMap[key].configuration;
        }));
        return {
          transitions: enabledTransitions,
          exitSet: flatten(stateTransitions.map(function(t2) {
            return t2.exitSet;
          })),
          configuration,
          source: state,
          actions: flatten(Object.keys(transitionMap).map(function(key) {
            return transitionMap[key].actions;
          }))
        };
      };
      StateNode2.prototype._transition = function(stateValue, state, _event) {
        if (isString(stateValue)) {
          return this.transitionLeafNode(stateValue, state, _event);
        }
        if (Object.keys(stateValue).length === 1) {
          return this.transitionCompoundNode(stateValue, state, _event);
        }
        return this.transitionParallelNode(stateValue, state, _event);
      };
      StateNode2.prototype.getTransitionData = function(state, event2) {
        return this._transition(state.value, state, toSCXMLEvent(event2));
      };
      StateNode2.prototype.next = function(state, _event) {
        var e_3, _a2;
        var _this = this;
        var eventName = _event.name;
        var actions = [];
        var nextStateNodes = [];
        var selectedTransition;
        try {
          for (var _b = __values(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var candidate = _c.value;
            var cond = candidate.cond, stateIn = candidate.in;
            var resolvedContext = state.context;
            var isInState = stateIn ? isString(stateIn) && isStateId(stateIn) ? (
              // Check if in state by ID
              state.matches(toStateValue(this.getStateNodeById(stateIn).path, this.delimiter))
            ) : (
              // Check if in state by relative grandparent
              matchesState(toStateValue(stateIn, this.delimiter), path(this.path.slice(0, -2))(state.value))
            ) : true;
            var guardPassed = false;
            try {
              guardPassed = !cond || evaluateGuard(this.machine, cond, resolvedContext, _event, state);
            } catch (err) {
              throw new Error("Unable to evaluate guard '".concat(cond.name || cond.type, "' in transition for event '").concat(eventName, "' in state node '").concat(this.id, "':\n").concat(err.message));
            }
            if (guardPassed && isInState) {
              if (candidate.target !== void 0) {
                nextStateNodes = candidate.target;
              }
              actions.push.apply(actions, __spreadArray([], __read(candidate.actions), false));
              selectedTransition = candidate;
              break;
            }
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        if (!selectedTransition) {
          return void 0;
        }
        if (!nextStateNodes.length) {
          return {
            transitions: [selectedTransition],
            exitSet: [],
            configuration: state.value ? [this] : [],
            source: state,
            actions
          };
        }
        var allNextStateNodes = flatten(nextStateNodes.map(function(stateNode) {
          return _this.getRelativeStateNodes(stateNode, state.historyValue);
        }));
        var isInternal = !!selectedTransition.internal;
        return {
          transitions: [selectedTransition],
          exitSet: isInternal ? [] : flatten(nextStateNodes.map(function(targetNode) {
            return _this.getPotentiallyReenteringNodes(targetNode);
          })),
          configuration: allNextStateNodes,
          source: state,
          actions
        };
      };
      StateNode2.prototype.getPotentiallyReenteringNodes = function(targetNode) {
        if (this.order < targetNode.order) {
          return [this];
        }
        var nodes = [];
        var marker = this;
        var possibleAncestor = targetNode;
        while (marker && marker !== possibleAncestor) {
          nodes.push(marker);
          marker = marker.parent;
        }
        if (marker !== possibleAncestor) {
          return [];
        }
        nodes.push(possibleAncestor);
        return nodes;
      };
      StateNode2.prototype.getActions = function(resolvedConfig, isDone, transition, currentContext, _event, prevState, predictableExec) {
        var e_4, _a2, e_5, _b;
        var _this = this;
        var prevConfig = prevState ? getConfiguration([], this.getStateNodes(prevState.value)) : [];
        var entrySet = /* @__PURE__ */ new Set();
        try {
          for (var _c = __values(Array.from(resolvedConfig).sort(function(a, b3) {
            return a.order - b3.order;
          })), _d = _c.next(); !_d.done; _d = _c.next()) {
            var sn = _d.value;
            if (!has(prevConfig, sn) || has(transition.exitSet, sn) || sn.parent && entrySet.has(sn.parent)) {
              entrySet.add(sn);
            }
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return)) _a2.call(_c);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        try {
          for (var prevConfig_1 = __values(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()) {
            var sn = prevConfig_1_1.value;
            if (!has(resolvedConfig, sn) || has(transition.exitSet, sn.parent)) {
              transition.exitSet.push(sn);
            }
          }
        } catch (e_5_1) {
          e_5 = {
            error: e_5_1
          };
        } finally {
          try {
            if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return)) _b.call(prevConfig_1);
          } finally {
            if (e_5) throw e_5.error;
          }
        }
        transition.exitSet.sort(function(a, b3) {
          return b3.order - a.order;
        });
        var entryStates = Array.from(entrySet).sort(function(a, b3) {
          return a.order - b3.order;
        });
        var exitStates = new Set(transition.exitSet);
        var doneEvents = flatten(entryStates.map(function(sn2) {
          var events = [];
          if (sn2.type !== "final") {
            return events;
          }
          var parent = sn2.parent;
          if (!parent.parent) {
            return events;
          }
          events.push(
            done(sn2.id, sn2.doneData),
            // TODO: deprecate - final states should not emit done events for their own state.
            done(parent.id, sn2.doneData ? mapContext(sn2.doneData, currentContext, _event) : void 0)
          );
          var grandparent = parent.parent;
          if (grandparent.type === "parallel") {
            if (getChildren(grandparent).every(function(parentNode) {
              return isInFinalState(transition.configuration, parentNode);
            })) {
              events.push(done(grandparent.id));
            }
          }
          return events;
        }));
        var entryActions = entryStates.map(function(stateNode) {
          var entryActions2 = stateNode.onEntry;
          var invokeActions = stateNode.activities.map(function(activity) {
            return start2(activity);
          });
          return {
            type: "entry",
            actions: toActionObjects(predictableExec ? __spreadArray(__spreadArray([], __read(entryActions2), false), __read(invokeActions), false) : __spreadArray(__spreadArray([], __read(invokeActions), false), __read(entryActions2), false), _this.machine.options.actions)
          };
        }).concat({
          type: "state_done",
          actions: doneEvents.map(function(event2) {
            return raise2(event2);
          })
        });
        var exitActions = Array.from(exitStates).map(function(stateNode) {
          return {
            type: "exit",
            actions: toActionObjects(__spreadArray(__spreadArray([], __read(stateNode.onExit), false), __read(stateNode.activities.map(function(activity) {
              return stop2(activity);
            })), false), _this.machine.options.actions)
          };
        });
        var actions = exitActions.concat({
          type: "transition",
          actions: toActionObjects(transition.actions, this.machine.options.actions)
        }).concat(entryActions);
        if (isDone) {
          var stopActions = toActionObjects(flatten(__spreadArray([], __read(resolvedConfig), false).sort(function(a, b3) {
            return b3.order - a.order;
          }).map(function(stateNode) {
            return stateNode.onExit;
          })), this.machine.options.actions).filter(function(action) {
            return !isRaisableAction(action);
          });
          return actions.concat({
            type: "stop",
            actions: stopActions
          });
        }
        return actions;
      };
      StateNode2.prototype.transition = function(state, event2, context, exec) {
        if (state === void 0) {
          state = this.initialState;
        }
        var _event = toSCXMLEvent(event2);
        var currentState;
        if (state instanceof State) {
          currentState = context === void 0 ? state : this.resolveState(State.from(state, context));
        } else {
          var resolvedStateValue = isString(state) ? this.resolve(pathToStateValue(this.getResolvedPath(state))) : this.resolve(state);
          var resolvedContext = context !== null && context !== void 0 ? context : this.machine.context;
          currentState = this.resolveState(State.from(resolvedStateValue, resolvedContext));
        }
        if (!IS_PRODUCTION && _event.name === WILDCARD) {
          throw new Error("An event cannot have the wildcard type ('".concat(WILDCARD, "')"));
        }
        if (this.strict) {
          if (!this.events.includes(_event.name) && !isBuiltInEvent(_event.name)) {
            throw new Error("Machine '".concat(this.id, "' does not accept event '").concat(_event.name, "'"));
          }
        }
        var stateTransition = this._transition(currentState.value, currentState, _event) || {
          transitions: [],
          configuration: [],
          exitSet: [],
          source: currentState,
          actions: []
        };
        var prevConfig = getConfiguration([], this.getStateNodes(currentState.value));
        var resolvedConfig = stateTransition.configuration.length ? getConfiguration(prevConfig, stateTransition.configuration) : prevConfig;
        stateTransition.configuration = __spreadArray([], __read(resolvedConfig), false);
        return this.resolveTransition(stateTransition, currentState, currentState.context, exec, _event);
      };
      StateNode2.prototype.resolveRaisedTransition = function(state, _event, originalEvent, predictableExec) {
        var _a2;
        var currentActions = state.actions;
        state = this.transition(state, _event, void 0, predictableExec);
        state._event = originalEvent;
        state.event = originalEvent.data;
        (_a2 = state.actions).unshift.apply(_a2, __spreadArray([], __read(currentActions), false));
        return state;
      };
      StateNode2.prototype.resolveTransition = function(stateTransition, currentState, context, predictableExec, _event) {
        var e_6, _a2, e_7, _b;
        var _this = this;
        if (_event === void 0) {
          _event = initEvent;
        }
        var configuration = stateTransition.configuration;
        var willTransition = !currentState || stateTransition.transitions.length > 0;
        var resolvedConfiguration = willTransition ? stateTransition.configuration : currentState ? currentState.configuration : [];
        var isDone = isInFinalState(resolvedConfiguration, this);
        var resolvedStateValue = willTransition ? getValue(this.machine, configuration) : void 0;
        var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : void 0 : void 0;
        var actionBlocks = this.getActions(new Set(resolvedConfiguration), isDone, stateTransition, context, _event, currentState, predictableExec);
        var activities = currentState ? __assign({}, currentState.activities) : {};
        try {
          for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
            var block2 = actionBlocks_1_1.value;
            try {
              for (var _c = (e_7 = void 0, __values(block2.actions)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var action = _d.value;
                if (action.type === start) {
                  activities[action.activity.id || action.activity.type] = action;
                } else if (action.type === stop) {
                  activities[action.activity.id || action.activity.type] = false;
                }
              }
            } catch (e_7_1) {
              e_7 = {
                error: e_7_1
              };
            } finally {
              try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
              } finally {
                if (e_7) throw e_7.error;
              }
            }
          }
        } catch (e_6_1) {
          e_6 = {
            error: e_6_1
          };
        } finally {
          try {
            if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return)) _a2.call(actionBlocks_1);
          } finally {
            if (e_6) throw e_6.error;
          }
        }
        var _e2 = __read(resolveActions(this, currentState, context, _event, actionBlocks, predictableExec, this.machine.config.predictableActionArguments || this.machine.config.preserveActionOrder), 2), resolvedActions = _e2[0], updatedContext = _e2[1];
        var _f = __read(partition(resolvedActions, isRaisableAction), 2), raisedEvents = _f[0], nonRaisedActions = _f[1];
        var invokeActions = resolvedActions.filter(function(action2) {
          var _a3;
          return action2.type === start && ((_a3 = action2.activity) === null || _a3 === void 0 ? void 0 : _a3.type) === invoke;
        });
        var children2 = invokeActions.reduce(function(acc, action2) {
          acc[action2.activity.id] = createInvocableActor(action2.activity, _this.machine, updatedContext, _event);
          return acc;
        }, currentState ? __assign({}, currentState.children) : {});
        var nextState = new State({
          value: resolvedStateValue || currentState.value,
          context: updatedContext,
          _event,
          // Persist _sessionid between states
          _sessionid: currentState ? currentState._sessionid : null,
          historyValue: resolvedStateValue ? historyValue ? updateHistoryValue(historyValue, resolvedStateValue) : void 0 : currentState ? currentState.historyValue : void 0,
          history: !resolvedStateValue || stateTransition.source ? currentState : void 0,
          actions: resolvedStateValue ? nonRaisedActions : [],
          activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
          events: [],
          configuration: resolvedConfiguration,
          transitions: stateTransition.transitions,
          children: children2,
          done: isDone,
          tags: getTagsFromConfiguration(resolvedConfiguration),
          machine: this
        });
        var didUpdateContext = context !== updatedContext;
        nextState.changed = _event.name === update || didUpdateContext;
        var history = nextState.history;
        if (history) {
          delete history.history;
        }
        var hasAlwaysTransitions = !isDone && (this._transient || configuration.some(function(stateNode) {
          return stateNode._transient;
        }));
        if (!willTransition && (!hasAlwaysTransitions || _event.name === NULL_EVENT)) {
          return nextState;
        }
        var maybeNextState = nextState;
        if (!isDone) {
          if (hasAlwaysTransitions) {
            maybeNextState = this.resolveRaisedTransition(maybeNextState, {
              type: nullEvent
            }, _event, predictableExec);
          }
          while (raisedEvents.length) {
            var raisedEvent = raisedEvents.shift();
            maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event, predictableExec);
          }
        }
        var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !stateValuesEqual(maybeNextState.value, history.value) : void 0);
        maybeNextState.changed = changed;
        maybeNextState.history = history;
        return maybeNextState;
      };
      StateNode2.prototype.getStateNode = function(stateKey) {
        if (isStateId(stateKey)) {
          return this.machine.getStateNodeById(stateKey);
        }
        if (!this.states) {
          throw new Error("Unable to retrieve child state '".concat(stateKey, "' from '").concat(this.id, "'; no child states exist."));
        }
        var result = this.states[stateKey];
        if (!result) {
          throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
        }
        return result;
      };
      StateNode2.prototype.getStateNodeById = function(stateId) {
        var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
        if (resolvedStateId === this.id) {
          return this;
        }
        var stateNode = this.machine.idMap[resolvedStateId];
        if (!stateNode) {
          throw new Error("Child state node '#".concat(resolvedStateId, "' does not exist on machine '").concat(this.id, "'"));
        }
        return stateNode;
      };
      StateNode2.prototype.getStateNodeByPath = function(statePath) {
        if (typeof statePath === "string" && isStateId(statePath)) {
          try {
            return this.getStateNodeById(statePath.slice(1));
          } catch (e2) {
          }
        }
        var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
        var currentStateNode = this;
        while (arrayStatePath.length) {
          var key = arrayStatePath.shift();
          if (!key.length) {
            break;
          }
          currentStateNode = currentStateNode.getStateNode(key);
        }
        return currentStateNode;
      };
      StateNode2.prototype.resolve = function(stateValue) {
        var _a2;
        var _this = this;
        if (!stateValue) {
          return this.initialStateValue || EMPTY_OBJECT;
        }
        switch (this.type) {
          case "parallel":
            return mapValues(this.initialStateValue, function(subStateValue, subStateKey) {
              return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
            });
          case "compound":
            if (isString(stateValue)) {
              var subStateNode = this.getStateNode(stateValue);
              if (subStateNode.type === "parallel" || subStateNode.type === "compound") {
                return _a2 = {}, _a2[stateValue] = subStateNode.initialStateValue, _a2;
              }
              return stateValue;
            }
            if (!Object.keys(stateValue).length) {
              return this.initialStateValue || {};
            }
            return mapValues(stateValue, function(subStateValue, subStateKey) {
              return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
            });
          default:
            return stateValue || EMPTY_OBJECT;
        }
      };
      StateNode2.prototype.getResolvedPath = function(stateIdentifier) {
        if (isStateId(stateIdentifier)) {
          var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
          if (!stateNode) {
            throw new Error("Unable to find state node '".concat(stateIdentifier, "'"));
          }
          return stateNode.path;
        }
        return toStatePath(stateIdentifier, this.delimiter);
      };
      Object.defineProperty(StateNode2.prototype, "initialStateValue", {
        get: function() {
          var _a2;
          if (this.__cache.initialStateValue) {
            return this.__cache.initialStateValue;
          }
          var initialStateValue;
          if (this.type === "parallel") {
            initialStateValue = mapFilterValues(this.states, function(state) {
              return state.initialStateValue || EMPTY_OBJECT;
            }, function(stateNode) {
              return !(stateNode.type === "history");
            });
          } else if (this.initial !== void 0) {
            if (!this.states[this.initial]) {
              throw new Error("Initial state '".concat(this.initial, "' not found on '").concat(this.key, "'"));
            }
            initialStateValue = isLeafNode(this.states[this.initial]) ? this.initial : (_a2 = {}, _a2[this.initial] = this.states[this.initial].initialStateValue, _a2);
          } else {
            initialStateValue = {};
          }
          this.__cache.initialStateValue = initialStateValue;
          return this.__cache.initialStateValue;
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.getInitialState = function(stateValue, context) {
        this._init();
        var configuration = this.getStateNodes(stateValue);
        return this.resolveTransition({
          configuration,
          exitSet: [],
          transitions: [],
          source: void 0,
          actions: []
        }, void 0, context !== null && context !== void 0 ? context : this.machine.context, void 0);
      };
      Object.defineProperty(StateNode2.prototype, "initialState", {
        /**
         * The initial State instance, which includes all actions to be executed from
         * entering the initial state.
         */
        get: function() {
          var initialStateValue = this.initialStateValue;
          if (!initialStateValue) {
            throw new Error("Cannot retrieve initial state from simple state '".concat(this.id, "'."));
          }
          return this.getInitialState(initialStateValue);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "target", {
        /**
         * The target state value of the history state node, if it exists. This represents the
         * default state value to transition to if no history value exists yet.
         */
        get: function() {
          var target;
          if (this.type === "history") {
            var historyConfig = this.config;
            if (isString(historyConfig.target)) {
              target = isStateId(historyConfig.target) ? pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
            } else {
              target = historyConfig.target;
            }
          }
          return target;
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.getRelativeStateNodes = function(relativeStateId, historyValue, resolve) {
        if (resolve === void 0) {
          resolve = true;
        }
        return resolve ? relativeStateId.type === "history" ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [relativeStateId];
      };
      Object.defineProperty(StateNode2.prototype, "initialStateNodes", {
        get: function() {
          var _this = this;
          if (isLeafNode(this)) {
            return [this];
          }
          if (this.type === "compound" && !this.initial) {
            if (!IS_PRODUCTION) {
              warn(false, "Compound state node '".concat(this.id, "' has no initial state."));
            }
            return [this];
          }
          var initialStateNodePaths = toStatePaths(this.initialStateValue);
          return flatten(initialStateNodePaths.map(function(initialPath) {
            return _this.getFromRelativePath(initialPath);
          }));
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.getFromRelativePath = function(relativePath) {
        if (!relativePath.length) {
          return [this];
        }
        var _a2 = __read(relativePath), stateKey = _a2[0], childStatePath = _a2.slice(1);
        if (!this.states) {
          throw new Error("Cannot retrieve subPath '".concat(stateKey, "' from node with no states"));
        }
        var childStateNode = this.getStateNode(stateKey);
        if (childStateNode.type === "history") {
          return childStateNode.resolveHistory();
        }
        if (!this.states[stateKey]) {
          throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
        }
        return this.states[stateKey].getFromRelativePath(childStatePath);
      };
      StateNode2.prototype.historyValue = function(relativeStateValue) {
        if (!Object.keys(this.states).length) {
          return void 0;
        }
        return {
          current: relativeStateValue || this.initialStateValue,
          states: mapFilterValues(this.states, function(stateNode, key) {
            if (!relativeStateValue) {
              return stateNode.historyValue();
            }
            var subStateValue = isString(relativeStateValue) ? void 0 : relativeStateValue[key];
            return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
          }, function(stateNode) {
            return !stateNode.history;
          })
        };
      };
      StateNode2.prototype.resolveHistory = function(historyValue) {
        var _this = this;
        if (this.type !== "history") {
          return [this];
        }
        var parent = this.parent;
        if (!historyValue) {
          var historyTarget = this.target;
          return historyTarget ? flatten(toStatePaths(historyTarget).map(function(relativeChildPath) {
            return parent.getFromRelativePath(relativeChildPath);
          })) : parent.initialStateNodes;
        }
        var subHistoryValue = nestedPath(parent.path, "states")(historyValue).current;
        if (isString(subHistoryValue)) {
          return [parent.getStateNode(subHistoryValue)];
        }
        return flatten(toStatePaths(subHistoryValue).map(function(subStatePath) {
          return _this.history === "deep" ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
        }));
      };
      Object.defineProperty(StateNode2.prototype, "stateIds", {
        /**
         * All the state node IDs of this state node and its descendant state nodes.
         */
        get: function() {
          var _this = this;
          var childStateIds = flatten(Object.keys(this.states).map(function(stateKey) {
            return _this.states[stateKey].stateIds;
          }));
          return [this.id].concat(childStateIds);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "events", {
        /**
         * All the event types accepted by this state node and its descendants.
         */
        get: function() {
          var e_8, _a2, e_9, _b;
          if (this.__cache.events) {
            return this.__cache.events;
          }
          var states = this.states;
          var events = new Set(this.ownEvents);
          if (states) {
            try {
              for (var _c = __values(Object.keys(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var stateId = _d.value;
                var state = states[stateId];
                if (state.states) {
                  try {
                    for (var _e2 = (e_9 = void 0, __values(state.events)), _f = _e2.next(); !_f.done; _f = _e2.next()) {
                      var event_1 = _f.value;
                      events.add("".concat(event_1));
                    }
                  } catch (e_9_1) {
                    e_9 = {
                      error: e_9_1
                    };
                  } finally {
                    try {
                      if (_f && !_f.done && (_b = _e2.return)) _b.call(_e2);
                    } finally {
                      if (e_9) throw e_9.error;
                    }
                  }
                }
              }
            } catch (e_8_1) {
              e_8 = {
                error: e_8_1
              };
            } finally {
              try {
                if (_d && !_d.done && (_a2 = _c.return)) _a2.call(_c);
              } finally {
                if (e_8) throw e_8.error;
              }
            }
          }
          return this.__cache.events = Array.from(events);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(StateNode2.prototype, "ownEvents", {
        /**
         * All the events that have transitions directly from this state node.
         *
         * Excludes any inert events.
         */
        get: function() {
          var events = new Set(this.transitions.filter(function(transition) {
            return !(!transition.target && !transition.actions.length && transition.internal);
          }).map(function(transition) {
            return transition.eventType;
          }));
          return Array.from(events);
        },
        enumerable: false,
        configurable: true
      });
      StateNode2.prototype.resolveTarget = function(_target) {
        var _this = this;
        if (_target === void 0) {
          return void 0;
        }
        return _target.map(function(target) {
          if (!isString(target)) {
            return target;
          }
          var isInternalTarget = target[0] === _this.delimiter;
          if (isInternalTarget && !_this.parent) {
            return _this.getStateNodeByPath(target.slice(1));
          }
          var resolvedTarget = isInternalTarget ? _this.key + target : target;
          if (_this.parent) {
            try {
              var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
              return targetStateNode;
            } catch (err) {
              throw new Error("Invalid transition definition for state node '".concat(_this.id, "':\n").concat(err.message));
            }
          } else {
            return _this.getStateNodeByPath(resolvedTarget);
          }
        });
      };
      StateNode2.prototype.formatTransition = function(transitionConfig) {
        var _this = this;
        var normalizedTarget = normalizeTarget(transitionConfig.target);
        var internal = "internal" in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function(_target) {
          return isString(_target) && _target[0] === _this.delimiter;
        }) : true;
        var guards = this.machine.options.guards;
        var target = this.resolveTarget(normalizedTarget);
        var transition = __assign(__assign({}, transitionConfig), {
          actions: toActionObjects(toArray(transitionConfig.actions)),
          cond: toGuard(transitionConfig.cond, guards),
          target,
          source: this,
          internal,
          eventType: transitionConfig.event,
          toJSON: function() {
            return __assign(__assign({}, transition), {
              target: transition.target ? transition.target.map(function(t2) {
                return "#".concat(t2.id);
              }) : void 0,
              source: "#".concat(_this.id)
            });
          }
        });
        return transition;
      };
      StateNode2.prototype.formatTransitions = function() {
        var e_10, _a2;
        var _this = this;
        var onConfig;
        if (!this.config.on) {
          onConfig = [];
        } else if (Array.isArray(this.config.on)) {
          onConfig = this.config.on;
        } else {
          var _b = this.config.on, _c = WILDCARD, _d = _b[_c], wildcardConfigs = _d === void 0 ? [] : _d, strictTransitionConfigs_1 = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
          onConfig = flatten(Object.keys(strictTransitionConfigs_1).map(function(key) {
            if (!IS_PRODUCTION && key === NULL_EVENT) {
              warn(false, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + 'Please check the `on` configuration for "#'.concat(_this.id, '".'));
            }
            var transitionConfigArray = toTransitionConfigArray(key, strictTransitionConfigs_1[key]);
            if (!IS_PRODUCTION) {
              validateArrayifiedTransitions(_this, key, transitionConfigArray);
            }
            return transitionConfigArray;
          }).concat(toTransitionConfigArray(WILDCARD, wildcardConfigs)));
        }
        var eventlessConfig = this.config.always ? toTransitionConfigArray("", this.config.always) : [];
        var doneConfig = this.config.onDone ? toTransitionConfigArray(String(done(this.id)), this.config.onDone) : [];
        if (!IS_PRODUCTION) {
          warn(!(this.config.onDone && !this.parent), 'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(this.id, '".'));
        }
        var invokeConfig = flatten(this.invoke.map(function(invokeDef) {
          var settleTransitions = [];
          if (invokeDef.onDone) {
            settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(doneInvoke(invokeDef.id)), invokeDef.onDone)), false));
          }
          if (invokeDef.onError) {
            settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(error2(invokeDef.id)), invokeDef.onError)), false));
          }
          return settleTransitions;
        }));
        var delayedTransitions = this.after;
        var formattedTransitions = flatten(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(doneConfig), false), __read(invokeConfig), false), __read(onConfig), false), __read(eventlessConfig), false).map(function(transitionConfig) {
          return toArray(transitionConfig).map(function(transition) {
            return _this.formatTransition(transition);
          });
        }));
        try {
          for (var delayedTransitions_1 = __values(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
            var delayedTransition = delayedTransitions_1_1.value;
            formattedTransitions.push(delayedTransition);
          }
        } catch (e_10_1) {
          e_10 = {
            error: e_10_1
          };
        } finally {
          try {
            if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a2 = delayedTransitions_1.return)) _a2.call(delayedTransitions_1);
          } finally {
            if (e_10) throw e_10.error;
          }
        }
        return formattedTransitions;
      };
      return StateNode2;
    })()
  );

  // node_modules/xstate/es/Machine.js
  var warned = false;
  function createMachine(config, options) {
    if (!IS_PRODUCTION && !("predictableActionArguments" in config) && !warned) {
      warned = true;
      console.warn("It is highly recommended to set `predictableActionArguments` to `true` when using `createMachine`. https://xstate.js.org/docs/guides/actions.html");
    }
    return new StateNode(config, options);
  }

  // node_modules/xstate/es/index.js
  var assign3 = assign2;
  var send3 = send2;

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign4(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init2(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign4({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e2) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign4({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init2(this.converter, assign4({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init2(assign4({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init2(defaultConverter, { path: "/" });

  // node_modules/@nhost/hasura-auth-js/dist/index.esm.js
  var import_fetch_ponyfill = __toESM(require_fetch_browser());
  var O = "nhostRefreshToken";
  var N = "nhostRefreshTokenId";
  var R = "nhostRefreshTokenExpiresAt";
  var de = 3;
  var fe = 60;
  var H = 5;
  var Z = 0;
  var J = 1;
  var k = 10;
  var C = 20;
  var U = class extends Error {
    constructor(e2) {
      super(e2.message), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), e2 instanceof Error ? (this.name = e2.name, this.error = {
        error: e2.name,
        status: J,
        message: e2.message
      }) : (this.name = e2.error, this.error = e2);
    }
  };
  var A = {
    status: k,
    error: "invalid-email",
    message: "Email is incorrectly formatted"
  };
  var he = {
    status: k,
    error: "invalid-mfa-type",
    message: "MFA type is invalid"
  };
  var me = {
    status: k,
    error: "invalid-mfa-code",
    message: "MFA code is invalid"
  };
  var $ = {
    status: k,
    error: "invalid-password",
    message: "Password is incorrectly formatted"
  };
  var Y = {
    status: k,
    error: "invalid-phone-number",
    message: "Phone number is incorrectly formatted"
  };
  var Ee = {
    status: k,
    error: "invalid-mfa-ticket",
    message: "MFA ticket is invalid"
  };
  var ge = {
    status: k,
    error: "no-mfa-ticket",
    message: "No MFA ticket has been provided"
  };
  var Te = {
    status: k,
    error: "no-refresh-token",
    message: "No refresh token has been provided"
  };
  var pe = {
    status: C,
    error: "refresher-already-running",
    message: "The token refresher is already running. You must wait until is has finished before submitting a new token."
  };
  var y = {
    status: C,
    error: "already-signed-in",
    message: "User is already signed in"
  };
  var we = {
    status: C,
    error: "unauthenticated-user",
    message: "User is not authenticated"
  };
  var or = {
    status: C,
    error: "user-not-anonymous",
    message: "User is not anonymous"
  };
  var ke = {
    status: C,
    error: "unverified-user",
    message: "Email needs verification"
  };
  var ye = {
    status: k,
    error: "invalid-refresh-token",
    message: "Invalid or expired refresh token"
  };
  var Se = {
    status: J,
    error: "invalid-sign-in-method",
    message: "Invalid sign-in method"
  };
  var G = {
    user: null,
    mfa: null,
    accessToken: {
      value: null,
      expiresAt: null,
      expiresInSeconds: 15
    },
    refreshTimer: {
      startedAt: null,
      attempts: 0,
      lastAttempt: null
    },
    refreshToken: {
      value: null
    },
    importTokenAttempts: 0,
    errors: {}
  };
  function ve(t2) {
    return new TextEncoder().encode(t2);
  }
  function _(t2) {
    const e2 = new Uint8Array(t2);
    let n2 = "";
    for (const s of e2)
      n2 += String.fromCharCode(s);
    return btoa(n2).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  function j(t2) {
    const e2 = t2.replace(/-/g, "+").replace(/_/g, "/"), n2 = (4 - e2.length % 4) % 4, r2 = e2.padEnd(e2.length + n2, "="), s = atob(r2), i = new ArrayBuffer(s.length), c = new Uint8Array(i);
    for (let d2 = 0; d2 < s.length; d2++)
      c[d2] = s.charCodeAt(d2);
    return i;
  }
  function ee() {
    return (window == null ? void 0 : window.PublicKeyCredential) !== void 0 && typeof window.PublicKeyCredential == "function";
  }
  function re(t2) {
    const { id: e2 } = t2;
    return {
      ...t2,
      id: j(e2),
      transports: t2.transports
    };
  }
  function ne(t2) {
    return t2 === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t2);
  }
  var g = class extends Error {
    constructor(e2, n2 = "WebAuthnError") {
      super(e2), this.name = n2;
    }
  };
  function Ae({ error: t2, options: e2 }) {
    var n2, r2;
    const { publicKey: s } = e2;
    if (!s)
      throw Error("options was missing required publicKey property");
    if (t2.name === "AbortError") {
      if (e2.signal === new AbortController().signal)
        return new g("Registration ceremony was sent an abort signal", "AbortError");
    } else if (t2.name === "ConstraintError") {
      if (((n2 = s.authenticatorSelection) === null || n2 === void 0 ? void 0 : n2.requireResidentKey) === true)
        return new g("Discoverable credentials were required but no available authenticator supported it", "ConstraintError");
      if (((r2 = s.authenticatorSelection) === null || r2 === void 0 ? void 0 : r2.userVerification) === "required")
        return new g("User verification was required but no available authenticator supported it", "ConstraintError");
    } else {
      if (t2.name === "InvalidStateError")
        return new g("The authenticator was previously registered", "InvalidStateError");
      if (t2.name === "NotAllowedError")
        return new g("User clicked cancel, or the registration ceremony timed out", "NotAllowedError");
      if (t2.name === "NotSupportedError")
        return s.pubKeyCredParams.filter((c) => c.type === "public-key").length === 0 ? new g('No entry in pubKeyCredParams was of type "public-key"', "NotSupportedError") : new g("No available authenticator supported any of the specified pubKeyCredParams algorithms", "NotSupportedError");
      if (t2.name === "SecurityError") {
        const i = window.location.hostname;
        if (ne(i)) {
          if (s.rp.id !== i)
            return new g(`The RP ID "${s.rp.id}" is invalid for this domain`, "SecurityError");
        } else
          return new g(`${window.location.hostname} is an invalid domain`, "SecurityError");
      } else if (t2.name === "TypeError") {
        if (s.user.id.byteLength < 1 || s.user.id.byteLength > 64)
          return new g("User ID was not between 1 and 64 characters", "TypeError");
      } else if (t2.name === "UnknownError")
        return new g("The authenticator was unable to process the specified options, or could not create a new credential", "UnknownError");
    }
    return t2;
  }
  var Ie = class {
    createNewAbortSignal() {
      return this.controller && this.controller.abort(), this.controller = new AbortController(), this.controller.signal;
    }
    reset() {
      this.controller = void 0;
    }
  };
  var K = new Ie();
  async function te(t2) {
    if (!ee())
      throw new Error("WebAuthn is not supported in this browser");
    const n2 = { publicKey: {
      ...t2,
      challenge: j(t2.challenge),
      user: {
        ...t2.user,
        id: ve(t2.user.id)
      },
      excludeCredentials: t2.excludeCredentials.map(re)
    } };
    n2.signal = K.createNewAbortSignal();
    let r2;
    try {
      r2 = await navigator.credentials.create(n2);
    } catch (h) {
      throw Ae({ error: h, options: n2 });
    } finally {
      K.reset();
    }
    if (!r2)
      throw new Error("Registration was not completed");
    const { id: s, rawId: i, response: c, type: d2 } = r2, f = {
      id: s,
      rawId: _(i),
      response: {
        attestationObject: _(c.attestationObject),
        clientDataJSON: _(c.clientDataJSON)
      },
      type: d2,
      clientExtensionResults: r2.getClientExtensionResults(),
      authenticatorAttachment: r2.authenticatorAttachment
    };
    return typeof c.getTransports == "function" && (f.transports = c.getTransports()), f;
  }
  function _e(t2) {
    return new TextDecoder("utf-8").decode(t2);
  }
  async function Re() {
    if (navigator.credentials.conditionalMediationSupported)
      return true;
    const t2 = window.PublicKeyCredential;
    return t2.isConditionalMediationAvailable !== void 0 && t2.isConditionalMediationAvailable();
  }
  function Pe({ error: t2, options: e2 }) {
    var n2;
    const { publicKey: r2 } = e2;
    if (!r2)
      throw Error("options was missing required publicKey property");
    if (t2.name === "AbortError") {
      if (e2.signal === new AbortController().signal)
        return new g("Authentication ceremony was sent an abort signal", "AbortError");
    } else {
      if (t2.name === "NotAllowedError")
        return !((n2 = r2.allowCredentials) === null || n2 === void 0) && n2.length ? new g("No available authenticator recognized any of the allowed credentials", "NotAllowedError") : new g("User clicked cancel, or the authentication ceremony timed out", "NotAllowedError");
      if (t2.name === "SecurityError") {
        const s = window.location.hostname;
        if (ne(s)) {
          if (r2.rpId !== s)
            return new g(`The RP ID "${r2.rpId}" is invalid for this domain`, "SecurityError");
        } else
          return new g(`${window.location.hostname} is an invalid domain`, "SecurityError");
      } else if (t2.name === "UnknownError")
        return new g("The authenticator was unable to process the specified options, or could not create a new assertion signature", "UnknownError");
    }
    return t2;
  }
  async function Oe(t2, e2 = false) {
    var n2, r2;
    if (!ee())
      throw new Error("WebAuthn is not supported in this browser");
    let s;
    ((n2 = t2.allowCredentials) === null || n2 === void 0 ? void 0 : n2.length) !== 0 && (s = (r2 = t2.allowCredentials) === null || r2 === void 0 ? void 0 : r2.map(re));
    const i = {
      ...t2,
      challenge: j(t2.challenge),
      allowCredentials: s
    }, c = {};
    if (e2) {
      if (!await Re())
        throw Error("Browser does not support WebAuthn autofill");
      if (document.querySelectorAll("input[autocomplete*='webauthn']").length < 1)
        throw Error('No <input> with `"webauthn"` in its `autocomplete` attribute was detected');
      c.mediation = "conditional", i.allowCredentials = [];
    }
    c.publicKey = i, c.signal = K.createNewAbortSignal();
    let d2;
    try {
      d2 = await navigator.credentials.get(c);
    } catch (l) {
      throw Pe({ error: l, options: c });
    } finally {
      K.reset();
    }
    if (!d2)
      throw new Error("Authentication was not completed");
    const { id: f, rawId: h, response: a, type: o2 } = d2;
    let u2;
    return a.userHandle && (u2 = _e(a.userHandle)), {
      id: f,
      rawId: _(h),
      response: {
        authenticatorData: _(a.authenticatorData),
        clientDataJSON: _(a.clientDataJSON),
        signature: _(a.signature),
        userHandle: u2
      },
      type: o2,
      clientExtensionResults: d2.getClientExtensionResults(),
      authenticatorAttachment: d2.authenticatorAttachment
    };
  }
  var V = typeof window != "undefined";
  var M = /* @__PURE__ */ new Map();
  var be = (t2) => {
    var e2;
    return V && typeof localStorage != "undefined" ? localStorage.getItem(t2) : (e2 = M.get(t2)) != null ? e2 : null;
  };
  var Ce = (t2, e2) => {
    V && typeof localStorage != "undefined" ? e2 ? localStorage.setItem(t2, e2) : localStorage.removeItem(t2) : e2 ? M.set(t2, e2) : M.has(t2) && M.delete(t2);
  };
  var Ne = (t2, e2) => {
    if (t2 === "localStorage" || t2 === "web")
      return be;
    if (t2 === "cookie")
      return (n2) => {
        var r2;
        return V && (r2 = api.get(n2)) != null ? r2 : null;
      };
    if (!e2)
      throw Error(
        `clientStorageType is set to '${t2}' but no clientStorage has been given`
      );
    if (t2 === "react-native")
      return (n2) => {
        var r2;
        return (r2 = e2.getItem) == null ? void 0 : r2.call(e2, n2);
      };
    if (t2 === "capacitor")
      return (n2) => {
        var r2;
        return (r2 = e2.get) == null ? void 0 : r2.call(e2, { key: n2 });
      };
    if (t2 === "expo-secure-storage")
      return (n2) => {
        var r2;
        return (r2 = e2.getItemAsync) == null ? void 0 : r2.call(e2, n2);
      };
    if (t2 === "custom") {
      if (e2.getItem && e2.removeItem)
        return e2.getItem;
      if (e2.getItemAsync)
        return e2.getItemAsync;
      throw Error(
        `clientStorageType is set to 'custom' but clientStorage is missing either "getItem" and "removeItem" properties or "getItemAsync" property`
      );
    }
    throw Error(`Unknown storage type: ${t2}`);
  };
  var xe = (t2, e2) => {
    if (t2 === "localStorage" || t2 === "web")
      return Ce;
    if (t2 === "cookie")
      return (n2, r2) => {
        V && (r2 ? api.set(n2, r2, { expires: 30, sameSite: "lax", httpOnly: false }) : api.remove(n2));
      };
    if (!e2)
      throw Error(
        `clientStorageType is set to '${t2}' but no clienStorage has been given`
      );
    if (t2 === "react-native")
      return (n2, r2) => {
        var s, i;
        return r2 ? (s = e2.setItem) == null ? void 0 : s.call(e2, n2, r2) : (i = e2.removeItem) == null ? void 0 : i.call(e2, n2);
      };
    if (t2 === "capacitor")
      return (n2, r2) => {
        var s, i;
        return r2 ? (s = e2.set) == null ? void 0 : s.call(e2, { key: n2, value: r2 }) : (i = e2.remove) == null ? void 0 : i.call(e2, { key: n2 });
      };
    if (t2 === "expo-secure-storage")
      return async (n2, r2) => {
        var s, i;
        return r2 ? (s = e2.setItemAsync) == null ? void 0 : s.call(e2, n2, r2) : (i = e2.deleteItemAsync) == null ? void 0 : i.call(e2, n2);
      };
    if (t2 === "custom") {
      if (!e2.removeItem)
        throw Error(
          "clientStorageType is set to 'custom' but clientStorage is missing a removeItem property"
        );
      if (e2.setItem)
        return (n2, r2) => {
          var s, i;
          return r2 ? (s = e2.setItem) == null ? void 0 : s.call(e2, n2, r2) : (i = e2.removeItem) == null ? void 0 : i.call(e2, n2);
        };
      if (e2.setItemAsync)
        return async (n2, r2) => {
          var s, i;
          return r2 ? (s = e2.setItemAsync) == null ? void 0 : s.call(e2, n2, r2) : (i = e2.removeItem) == null ? void 0 : i.call(e2, n2);
        };
      throw Error(
        "clientStorageType is set to 'custom' but clientStorage is missing setItem or setItemAsync property"
      );
    }
    throw Error(`Unknown storage type: ${t2}`);
  };
  var x = (t2) => !t2 || !t2.accessToken.value || !t2.accessToken.expiresAt || !t2.user ? null : {
    accessToken: t2.accessToken.value,
    accessTokenExpiresIn: (t2.accessToken.expiresAt.getTime() - Date.now()) / 1e3,
    refreshToken: t2.refreshToken.value,
    user: t2.user
  };
  var v = ({
    accessToken: t2,
    refreshToken: e2,
    isError: n2,
    user: r2,
    error: s
  }) => n2 ? {
    session: null,
    error: s
  } : r2 && t2 ? {
    // TODO either return the refresh token or remove it from the session type
    session: { accessToken: t2, accessTokenExpiresIn: 0, refreshToken: e2, user: r2 },
    error: null
  } : { session: null, error: null };
  var q = () => typeof window != "undefined";
  var se = globalThis.fetch;
  typeof EdgeRuntime != "string" && (se = (0, import_fetch_ponyfill.default)().fetch);
  var ie = async (t2, e2, { token: n2, body: r2 } = {}) => {
    const s = {
      "Content-Type": "application/json",
      Accept: "*/*"
    };
    n2 && (s.Authorization = `Bearer ${n2}`);
    const i = {
      method: e2,
      headers: s
    };
    r2 && (i.body = JSON.stringify(r2));
    try {
      const c = await se(t2, i);
      if (!c.ok) {
        const d2 = await c.json();
        return Promise.reject({ error: d2 });
      }
      try {
        return { data: await c.json(), error: null };
      } catch {
        return console.warn(`Unexpected response: can't parse the response of the server at ${t2}`), { data: "OK", error: null };
      }
    } catch {
      const d2 = {
        message: "Network Error",
        status: Z,
        error: "network"
      };
      return Promise.reject({ error: d2 });
    }
  };
  var S = async (t2, e2, n2) => ie(t2, "POST", { token: n2, body: e2 });
  var De = (t2, e2) => ie(t2, "GET", { token: e2 });
  var oe = (t2, e2) => {
    const n2 = e2 && Object.entries(e2).map(([r2, s]) => {
      const i = Array.isArray(s) ? s.join(",") : typeof s == "object" ? JSON.stringify(s) : s;
      return `${r2}=${encodeURIComponent(i)}`;
    }).join("&");
    return n2 ? `${t2}?${n2}` : t2;
  };
  var w = (t2, e2) => {
    if (!(e2 != null && e2.redirectTo))
      return e2;
    const { redirectTo: n2, ...r2 } = e2;
    if (!t2)
      return n2.startsWith("/") ? r2 : e2;
    const s = new URL(t2), i = Object.fromEntries(new URLSearchParams(s.search)), c = new URL(n2.startsWith("/") ? s.origin + n2 : n2), d2 = new URLSearchParams(c.search);
    let f = Object.fromEntries(d2);
    n2.startsWith("/") && (f = { ...i, ...f });
    let h = s.pathname;
    return c.pathname.length > 1 && (h += c.pathname.slice(1)), {
      ...r2,
      redirectTo: oe(c.origin + h, f)
    };
  };
  function D(t2, e2) {
    var s;
    if (!e2) {
      if (typeof window == "undefined")
        return;
      e2 = ((s = window.location) == null ? void 0 : s.href) || "";
    }
    t2 = t2.replace(/[\[\]]/g, "\\$&");
    const n2 = new RegExp("[?&#]" + t2 + "(=([^&#]*)|&|#|$)"), r2 = n2.exec(e2);
    return r2 ? r2[2] ? decodeURIComponent(r2[2].replace(/\+/g, " ")) : "" : null;
  }
  function F(t2) {
    var n2;
    if (typeof window == "undefined")
      return;
    const e2 = window == null ? void 0 : window.location;
    if (e2 && e2) {
      const r2 = new URLSearchParams(e2.search), s = new URLSearchParams((n2 = e2.hash) == null ? void 0 : n2.slice(1));
      r2.delete(t2), s.delete(t2);
      let i = window.location.pathname;
      Array.from(r2).length && (i += `?${r2.toString()}`), Array.from(s).length && (i += `#${s.toString()}`), window.history.pushState({}, "", i);
    }
  }
  var I = (t2) => !!t2 && typeof t2 == "string" && !!String(t2).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  var W = (t2) => !!t2 && typeof t2 == "string" && t2.length >= de;
  var z = (t2) => !!t2 && typeof t2 == "string";
  var Ue = (t2) => t2 && typeof t2 == "string" && t2.match(/^mfaTotp:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  var Me = ({
    backendUrl: t2,
    clientUrl: e2,
    clientStorageType: n2 = "web",
    clientStorage: r2,
    refreshIntervalTime: s,
    autoRefreshToken: i = true,
    autoSignIn: c = true
  }) => {
    const d2 = Ne(n2, r2), f = xe(n2, r2), h = async (a, o2, u2) => (await S(`${t2}${a}`, o2, u2)).data;
    return createMachine(
      {
        schema: {
          context: {},
          events: {},
          services: {}
        },
        tsTypes: {},
        context: G,
        predictableActionArguments: true,
        id: "nhost",
        type: "parallel",
        states: {
          authentication: {
            initial: "starting",
            on: {
              SESSION_UPDATE: [
                {
                  cond: "hasSession",
                  actions: ["saveSession", "resetTimer", "reportTokenChanged"],
                  target: ".signedIn"
                }
              ]
            },
            states: {
              starting: {
                tags: ["loading"],
                always: { cond: "isSignedIn", target: "signedIn" },
                invoke: {
                  id: "importRefreshToken",
                  src: "importRefreshToken",
                  onDone: [
                    {
                      cond: "hasSession",
                      actions: ["saveSession", "reportTokenChanged"],
                      target: "signedIn"
                    },
                    {
                      target: "signedOut"
                    }
                  ],
                  onError: [
                    {
                      cond: "shouldRetryImportToken",
                      actions: "incrementTokenImportAttempts",
                      target: "retryTokenImport"
                    },
                    { actions: ["saveAuthenticationError"], target: "signedOut" }
                  ]
                }
              },
              retryTokenImport: {
                tags: ["loading"],
                after: {
                  RETRY_IMPORT_TOKEN_DELAY: "starting"
                }
              },
              signedOut: {
                initial: "noErrors",
                entry: "reportSignedOut",
                states: {
                  noErrors: {},
                  success: {},
                  needsSmsOtp: {},
                  needsMfa: {},
                  failed: {},
                  signingOut: {
                    entry: ["clearContextExceptRefreshToken"],
                    exit: ["destroyRefreshToken", "reportTokenChanged"],
                    invoke: {
                      src: "signout",
                      id: "signingOut",
                      onDone: {
                        target: "success"
                      },
                      onError: {
                        target: "failed",
                        actions: ["saveAuthenticationError"]
                      }
                    }
                  }
                },
                on: {
                  SIGNIN_PASSWORD: "authenticating.password",
                  SIGNIN_ANONYMOUS: "authenticating.anonymous",
                  SIGNIN_SECURITY_KEY_EMAIL: "authenticating.securityKeyEmail",
                  SIGNIN_MFA_TOTP: "authenticating.mfa.totp",
                  SIGNIN_PAT: "authenticating.pat"
                }
              },
              authenticating: {
                entry: "resetErrors",
                states: {
                  password: {
                    invoke: {
                      src: "signInPassword",
                      id: "authenticateUserWithPassword",
                      onDone: [
                        {
                          cond: "hasMfaTicket",
                          actions: ["saveMfaTicket"],
                          target: "#nhost.authentication.signedOut.needsMfa"
                        },
                        {
                          actions: ["saveSession", "reportTokenChanged"],
                          target: "#nhost.authentication.signedIn"
                        }
                      ],
                      onError: [
                        {
                          cond: "unverified",
                          target: [
                            "#nhost.authentication.signedOut",
                            "#nhost.registration.incomplete.needsEmailVerification"
                          ]
                        },
                        {
                          actions: "saveAuthenticationError",
                          target: "#nhost.authentication.signedOut.failed"
                        }
                      ]
                    }
                  },
                  pat: {
                    invoke: {
                      src: "signInPAT",
                      id: "authenticateWithPAT",
                      onDone: {
                        actions: ["savePATSession", "reportTokenChanged"],
                        target: "#nhost.authentication.signedIn"
                      },
                      onError: {
                        actions: "saveAuthenticationError",
                        target: "#nhost.authentication.signedOut.failed"
                      }
                    }
                  },
                  anonymous: {
                    invoke: {
                      src: "signInAnonymous",
                      id: "authenticateAnonymously",
                      onDone: {
                        actions: ["saveSession", "reportTokenChanged"],
                        target: "#nhost.authentication.signedIn"
                      },
                      onError: {
                        actions: "saveAuthenticationError",
                        target: "#nhost.authentication.signedOut.failed"
                      }
                    }
                  },
                  mfa: {
                    states: {
                      totp: {
                        invoke: {
                          src: "signInMfaTotp",
                          id: "signInMfaTotp",
                          onDone: {
                            actions: ["saveSession", "reportTokenChanged"],
                            target: "#nhost.authentication.signedIn"
                          },
                          onError: {
                            actions: ["saveAuthenticationError"],
                            target: "#nhost.authentication.signedOut.failed"
                          }
                        }
                      }
                    }
                  },
                  securityKeyEmail: {
                    invoke: {
                      src: "signInSecurityKeyEmail",
                      id: "authenticateUserWithSecurityKey",
                      onDone: {
                        actions: ["saveSession", "reportTokenChanged"],
                        target: "#nhost.authentication.signedIn"
                      },
                      onError: [
                        {
                          cond: "unverified",
                          target: [
                            "#nhost.authentication.signedOut",
                            "#nhost.registration.incomplete.needsEmailVerification"
                          ]
                        },
                        {
                          actions: "saveAuthenticationError",
                          target: "#nhost.authentication.signedOut.failed"
                        }
                      ]
                    }
                  }
                }
              },
              signedIn: {
                type: "parallel",
                entry: ["reportSignedIn", "cleanUrl", "broadcastToken", "resetErrors"],
                on: {
                  SIGNOUT: "signedOut.signingOut"
                },
                states: {
                  refreshTimer: {
                    id: "timer",
                    initial: "idle",
                    states: {
                      disabled: { type: "final" },
                      stopped: {
                        always: {
                          cond: "noToken",
                          target: "idle"
                        }
                      },
                      idle: {
                        always: [
                          { cond: "isAutoRefreshDisabled", target: "disabled" },
                          { cond: "isRefreshTokenPAT", target: "disabled" },
                          { cond: "hasRefreshToken", target: "running" }
                        ]
                      },
                      running: {
                        initial: "pending",
                        entry: "resetTimer",
                        states: {
                          pending: {
                            after: {
                              1e3: {
                                internal: false,
                                target: "pending"
                              }
                            },
                            always: {
                              cond: "refreshTimerShouldRefresh",
                              target: "refreshing"
                            }
                          },
                          refreshing: {
                            invoke: {
                              src: "refreshToken",
                              id: "refreshToken",
                              onDone: {
                                actions: ["saveSession", "resetTimer", "reportTokenChanged"],
                                target: "pending"
                              },
                              onError: [{ actions: "saveRefreshAttempt", target: "pending" }]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          token: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  TRY_TOKEN: "running"
                },
                initial: "noErrors",
                states: { noErrors: {}, error: {} }
              },
              running: {
                invoke: {
                  src: "refreshToken",
                  id: "authenticateWithToken",
                  onDone: {
                    actions: ["saveSession", "reportTokenChanged"],
                    target: ["#nhost.authentication.signedIn", "idle.noErrors"]
                  },
                  onError: [
                    { cond: "isSignedIn", target: "idle.error" },
                    {
                      actions: "saveAuthenticationError",
                      target: ["#nhost.authentication.signedOut.failed", "idle.error"]
                    }
                  ]
                }
              }
            }
          },
          registration: {
            initial: "incomplete",
            on: {
              SIGNED_IN: [{ cond: "isAnonymous", target: ".incomplete" }, ".complete"]
            },
            states: {
              incomplete: {
                on: {
                  SIGNUP_EMAIL_PASSWORD: "emailPassword",
                  SIGNUP_SECURITY_KEY: "securityKey",
                  PASSWORDLESS_EMAIL: "passwordlessEmail",
                  PASSWORDLESS_SMS: "passwordlessSms",
                  PASSWORDLESS_SMS_OTP: "passwordlessSmsOtp"
                },
                initial: "noErrors",
                states: {
                  noErrors: {},
                  needsEmailVerification: {},
                  needsOtp: {},
                  failed: {}
                }
              },
              emailPassword: {
                entry: ["resetErrors"],
                invoke: {
                  src: "signUpEmailPassword",
                  id: "signUpEmailPassword",
                  onDone: [
                    {
                      cond: "hasSession",
                      actions: ["saveSession", "reportTokenChanged"],
                      target: "#nhost.authentication.signedIn"
                    },
                    {
                      actions: "clearContext",
                      target: ["#nhost.authentication.signedOut", "incomplete.needsEmailVerification"]
                    }
                  ],
                  onError: [
                    {
                      cond: "unverified",
                      target: "incomplete.needsEmailVerification"
                    },
                    {
                      actions: "saveRegistrationError",
                      target: "incomplete.failed"
                    }
                  ]
                }
              },
              securityKey: {
                entry: ["resetErrors"],
                invoke: {
                  src: "signUpSecurityKey",
                  id: "signUpSecurityKey",
                  onDone: [
                    {
                      cond: "hasSession",
                      actions: ["saveSession", "reportTokenChanged"],
                      target: "#nhost.authentication.signedIn"
                    },
                    {
                      actions: "clearContext",
                      target: ["#nhost.authentication.signedOut", "incomplete.needsEmailVerification"]
                    }
                  ],
                  onError: [
                    {
                      cond: "unverified",
                      target: "incomplete.needsEmailVerification"
                    },
                    {
                      actions: "saveRegistrationError",
                      target: "incomplete.failed"
                    }
                  ]
                }
              },
              passwordlessEmail: {
                entry: ["resetErrors"],
                invoke: {
                  src: "passwordlessEmail",
                  id: "passwordlessEmail",
                  onDone: {
                    actions: "clearContext",
                    target: ["#nhost.authentication.signedOut", "incomplete.needsEmailVerification"]
                  },
                  onError: {
                    actions: "saveRegistrationError",
                    target: "incomplete.failed"
                  }
                }
              },
              passwordlessSms: {
                entry: ["resetErrors"],
                invoke: {
                  src: "passwordlessSms",
                  id: "passwordlessSms",
                  onDone: {
                    actions: "clearContext",
                    target: ["#nhost.authentication.signedOut", "incomplete.needsOtp"]
                  },
                  onError: {
                    actions: "saveRegistrationError",
                    target: "incomplete.failed"
                  }
                }
              },
              passwordlessSmsOtp: {
                entry: ["resetErrors"],
                invoke: {
                  src: "passwordlessSmsOtp",
                  id: "passwordlessSmsOtp",
                  onDone: {
                    actions: ["saveSession", "reportTokenChanged"],
                    target: "#nhost.authentication.signedIn"
                  },
                  onError: {
                    actions: "saveRegistrationError",
                    target: "incomplete.failed"
                  }
                }
              },
              complete: {
                on: {
                  SIGNED_OUT: "incomplete"
                }
              }
            }
          }
        }
      },
      {
        actions: {
          reportSignedIn: send3("SIGNED_IN"),
          reportSignedOut: send3("SIGNED_OUT"),
          reportTokenChanged: send3("TOKEN_CHANGED"),
          incrementTokenImportAttempts: assign3({
            importTokenAttempts: ({ importTokenAttempts: a }) => a + 1
          }),
          clearContext: assign3(() => (f(R, null), f(O, null), f(N, null), {
            ...G
          })),
          clearContextExceptRefreshToken: assign3(({ refreshToken: { value: a } }) => (f(R, null), {
            ...G,
            refreshToken: { value: a }
          })),
          // * Save session in the context, and persist the refresh token and the jwt expiration outside of the machine
          saveSession: assign3({
            user: (a, { data: o2 }) => {
              var u2;
              return ((u2 = o2 == null ? void 0 : o2.session) == null ? void 0 : u2.user) || null;
            },
            accessToken: (a, { data: o2 }) => {
              if (o2.session) {
                const { accessTokenExpiresIn: u2, accessToken: l } = o2.session, m4 = new Date(Date.now() + u2 * 1e3);
                return f(R, m4.toISOString()), {
                  value: l,
                  expiresAt: m4,
                  expiresInSeconds: u2
                };
              }
              return f(R, null), {
                value: null,
                expiresAt: null,
                expiresInSeconds: null
              };
            },
            refreshToken: (a, { data: o2 }) => {
              var m4, p;
              const u2 = ((m4 = o2.session) == null ? void 0 : m4.refreshToken) || null, l = ((p = o2.session) == null ? void 0 : p.refreshTokenId) || null;
              return u2 && f(O, u2), l && f(N, l), { value: u2 };
            }
          }),
          savePATSession: assign3({
            user: (a, { data: o2 }) => {
              var u2;
              return ((u2 = o2 == null ? void 0 : o2.session) == null ? void 0 : u2.user) || null;
            },
            accessToken: (a, { data: o2 }) => {
              if (o2.session) {
                const { accessTokenExpiresIn: u2, accessToken: l } = o2.session, m4 = new Date(Date.now() + u2 * 1e3);
                return f(R, m4.toISOString()), {
                  value: l,
                  expiresAt: m4,
                  expiresInSeconds: u2
                };
              }
              return f(R, null), {
                value: null,
                expiresAt: null,
                expiresInSeconds: null
              };
            },
            refreshToken: (a, { data: o2 }) => {
              var m4, p;
              const u2 = ((m4 = o2.session) == null ? void 0 : m4.refreshToken) || null, l = ((p = o2.session) == null ? void 0 : p.refreshTokenId) || null;
              return u2 && f(O, u2), l && f(N, l), { value: u2, isPAT: true };
            }
          }),
          saveMfaTicket: assign3({
            mfa: (a, o2) => {
              var u2;
              return (u2 = o2.data) == null ? void 0 : u2.mfa;
            }
          }),
          resetTimer: assign3({
            refreshTimer: (a) => ({
              startedAt: /* @__PURE__ */ new Date(),
              attempts: 0,
              lastAttempt: null
            })
          }),
          saveRefreshAttempt: assign3({
            refreshTimer: (a, o2) => ({
              startedAt: a.refreshTimer.startedAt,
              attempts: a.refreshTimer.attempts + 1,
              lastAttempt: /* @__PURE__ */ new Date()
            })
          }),
          // * Authentication errors
          saveAuthenticationError: assign3({
            // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
            errors: ({ errors: a }, { data: { error: o2 } }) => ({
              ...a,
              authentication: o2
            })
          }),
          resetErrors: assign3({
            errors: (a) => ({}),
            importTokenAttempts: (a) => 0
          }),
          saveRegistrationError: assign3({
            // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
            errors: ({ errors: a }, { data: { error: o2 } }) => ({ ...a, registration: o2 })
          }),
          destroyRefreshToken: assign3({
            refreshToken: (a) => (f(O, null), f(N, null), { value: null })
          }),
          // * Clean the browser url when `autoSignIn` is activated
          cleanUrl: () => {
            c && D("refreshToken") && (F("refreshToken"), F("type"));
          },
          // * Broadcast the token to other tabs when `autoSignIn` is activated
          broadcastToken: (a) => {
            if (c)
              try {
                new BroadcastChannel("nhost").postMessage(a.refreshToken.value);
              } catch {
              }
          }
        },
        guards: {
          isAnonymous: (a, o2) => {
            var u2;
            return !!((u2 = a.user) != null && u2.isAnonymous);
          },
          isSignedIn: (a) => !!a.user && !!a.accessToken.value,
          noToken: (a) => !a.refreshToken.value,
          isRefreshTokenPAT: (a) => {
            var o2;
            return !!((o2 = a.refreshToken) != null && o2.isPAT);
          },
          hasRefreshToken: (a) => !!a.refreshToken.value,
          isAutoRefreshDisabled: () => !i,
          refreshTimerShouldRefresh: (a) => {
            const { expiresAt: o2 } = a.accessToken;
            if (!o2)
              return false;
            if (a.refreshTimer.lastAttempt)
              return a.refreshTimer.attempts > H ? false : Date.now() - a.refreshTimer.lastAttempt.getTime() > Math.pow(2, a.refreshTimer.attempts - 1) * 5e3;
            if (s && Date.now() - a.refreshTimer.startedAt.getTime() > s * 1e3)
              return true;
            const u2 = a.accessToken.expiresInSeconds;
            return u2 ? o2.getTime() - Date.now() - 1e3 * Math.min(fe, u2 * 0.5) <= 0 : false;
          },
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          /** Shoud retry to import the token on network error or any internal server error.
           * Don't retry more than REFRESH_TOKEN_MAX_ATTEMPTS times.
           */
          shouldRetryImportToken: (a, o2) => a.importTokenAttempts < H && (o2.data.error.status === Z || o2.data.error.status >= 500),
          // * Authentication errors
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          unverified: (a, { data: { error: o2 } }) => o2.status === 401 && // * legacy: don't use the message contents to determine if the email is unverified, but the error type (error.error)
          (o2.message === "Email is not verified" || o2.error === "unverified-user"),
          // * Event guards
          hasSession: (a, o2) => {
            var u2;
            return !!((u2 = o2.data) != null && u2.session);
          },
          hasMfaTicket: (a, o2) => {
            var u2;
            return !!((u2 = o2.data) != null && u2.mfa);
          }
        },
        services: {
          signInPassword: (a, { email: o2, password: u2 }) => I(o2) ? W(u2) ? h("/signin/email-password", {
            email: o2,
            password: u2
          }) : Promise.reject({ error: $ }) : Promise.reject({ error: A }),
          signInPAT: (a, { pat: o2 }) => h("/signin/pat", {
            personalAccessToken: o2
          }),
          passwordlessSms: (a, { phoneNumber: o2, options: u2 }) => {
            var l;
            return z(o2) ? (l = a.user) != null && l.isAnonymous ? (console.warn(
              "Deanonymisation from a phone number is not yet implemented in hasura-auth"
            ), h(
              "/user/deanonymize",
              {
                signInMethod: "passwordless",
                connection: "sms",
                phoneNumber: o2,
                options: w(e2, u2)
              },
              a.accessToken.value
            )) : h("/signin/passwordless/sms", {
              phoneNumber: o2,
              options: w(e2, u2)
            }) : Promise.reject({ error: Y });
          },
          passwordlessSmsOtp: (a, { phoneNumber: o2, otp: u2 }) => z(o2) ? h("/signin/passwordless/sms/otp", {
            phoneNumber: o2,
            otp: u2
          }) : Promise.reject({ error: Y }),
          passwordlessEmail: (a, { email: o2, options: u2 }) => {
            var l;
            return I(o2) ? (l = a.user) != null && l.isAnonymous ? h(
              "/user/deanonymize",
              {
                signInMethod: "passwordless",
                connection: "email",
                email: o2,
                options: w(e2, u2)
              },
              a.accessToken.value
            ) : h("/signin/passwordless/email", {
              email: o2,
              options: w(e2, u2)
            }) : Promise.reject({ error: A });
          },
          signInAnonymous: (a) => h("/signin/anonymous"),
          signInMfaTotp: (a, o2) => {
            var l;
            const u2 = o2.ticket || ((l = a.mfa) == null ? void 0 : l.ticket);
            return u2 ? Ue(u2) ? h("/signin/mfa/totp", {
              ticket: u2,
              otp: o2.otp
            }) : Promise.reject({ error: Ee }) : Promise.reject({ error: ge });
          },
          signInSecurityKeyEmail: async (a, { email: o2 }) => {
            if (!I(o2))
              throw new U(A);
            const u2 = await h(
              "/signin/webauthn",
              { email: o2 }
            );
            let l;
            try {
              l = await Oe(u2);
            } catch (m4) {
              throw new U(m4);
            }
            return h("/signin/webauthn/verify", { email: o2, credential: l });
          },
          refreshToken: async (a, o2) => {
            const u2 = o2.type === "TRY_TOKEN" ? o2.token : a.refreshToken.value;
            return { session: await h("/token", {
              refreshToken: u2
            }), error: null };
          },
          signout: (a, o2) => h("/signout", {
            refreshToken: a.refreshToken.value,
            all: !!o2.all
          }),
          signUpEmailPassword: async (a, { email: o2, password: u2, options: l }) => {
            var m4;
            return I(o2) ? W(u2) ? (m4 = a.user) != null && m4.isAnonymous ? h(
              "/user/deanonymize",
              {
                signInMethod: "email-password",
                email: o2,
                password: u2,
                options: w(e2, l)
              },
              a.accessToken.value
            ) : h("/signup/email-password", {
              email: o2,
              password: u2,
              options: w(e2, l)
            }) : Promise.reject({ error: $ }) : Promise.reject({ error: A });
          },
          signUpSecurityKey: async (a, { email: o2, options: u2 }) => {
            if (!I(o2))
              return Promise.reject({ error: A });
            const l = u2 == null ? void 0 : u2.nickname;
            l && delete u2.nickname;
            const m4 = await h(
              "/signup/webauthn",
              { email: o2, options: u2 }
            );
            let p;
            try {
              p = await te(m4);
            } catch (ce) {
              throw new U(ce);
            }
            return h("/signup/webauthn/verify", {
              credential: p,
              options: {
                redirectTo: u2 == null ? void 0 : u2.redirectTo,
                nickname: l
              }
            });
          },
          importRefreshToken: async (a) => {
            if (a.user && a.refreshToken.value && a.accessToken.value && a.accessToken.expiresAt)
              return {
                session: {
                  accessToken: a.accessToken.value,
                  accessTokenExpiresIn: a.accessToken.expiresAt.getTime() - Date.now(),
                  refreshToken: a.refreshToken.value,
                  user: a.user
                },
                error: null
              };
            let o2 = null;
            if (c) {
              const l = D("refreshToken") || null;
              if (l)
                try {
                  return { session: await h("/token", {
                    refreshToken: l
                  }), error: null };
                } catch (m4) {
                  o2 = m4.error;
                }
              else {
                const m4 = D("error");
                if (m4)
                  return Promise.reject({
                    session: null,
                    error: {
                      status: k,
                      error: m4,
                      message: D("errorDescription") || m4
                    }
                  });
              }
            }
            const u2 = await d2(O);
            if (u2)
              try {
                return { session: await h("/token", {
                  refreshToken: u2
                }), error: null };
              } catch (l) {
                o2 = l.error;
              }
            return o2 ? Promise.reject({ error: o2, session: null }) : { error: null, session: null };
          }
        },
        delays: {
          RETRY_IMPORT_TOKEN_DELAY: ({ importTokenAttempts: a }) => Math.pow(2, a - 1) * 5e3
        }
      }
    );
  };
  var Ke = ({ backendUrl: t2, clientUrl: e2, interpreter: n2 }) => createMachine(
    {
      schema: {
        context: {},
        events: {},
        services: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      id: "changeEmail",
      initial: "idle",
      context: { error: null },
      states: {
        idle: {
          on: {
            REQUEST: [
              {
                cond: "invalidEmail",
                actions: "saveInvalidEmailError",
                target: ".error"
              },
              {
                target: "requesting"
              }
            ]
          },
          initial: "initial",
          states: {
            initial: {},
            success: {},
            error: {}
          }
        },
        requesting: {
          invoke: {
            src: "requestChange",
            id: "requestChange",
            onDone: { target: "idle.success", actions: "reportSuccess" },
            onError: { actions: ["saveRequestError", "reportError"], target: "idle.error" }
          }
        }
      }
    },
    {
      actions: {
        saveInvalidEmailError: assign3({ error: (r2) => A }),
        saveRequestError: assign3({
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          error: (r2, { data: { error: s } }) => s
        }),
        reportError: send3((r2) => ({ type: "ERROR", error: r2.error })),
        // TODO change email in the main machine (context.user.email)
        reportSuccess: send3("SUCCESS")
      },
      guards: {
        invalidEmail: (r2, { email: s }) => !I(s)
      },
      services: {
        requestChange: async (r2, { email: s, options: i }) => (await S(
          `${t2}/user/email/change`,
          { newEmail: s, options: w(e2, i) },
          n2 == null ? void 0 : n2.getSnapshot().context.accessToken.value
        )).data
      }
    }
  );
  var Ve = ({ backendUrl: t2, interpreter: e2 }) => createMachine(
    {
      schema: {
        context: {},
        events: {},
        services: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      id: "changePassword",
      initial: "idle",
      context: { error: null },
      states: {
        idle: {
          on: {
            REQUEST: [
              {
                cond: "invalidPassword",
                actions: "saveInvalidPasswordError",
                target: ".error"
              },
              {
                target: "requesting"
              }
            ]
          },
          initial: "initial",
          states: {
            initial: {},
            success: {},
            error: {}
          }
        },
        requesting: {
          invoke: {
            src: "requestChange",
            id: "requestChange",
            onDone: { target: "idle.success", actions: "reportSuccess" },
            onError: { actions: ["saveRequestError", "reportError"], target: "idle.error" }
          }
        }
      }
    },
    {
      actions: {
        saveInvalidPasswordError: assign3({ error: (n2) => $ }),
        saveRequestError: assign3({
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          error: (n2, { data: { error: r2 } }) => r2
        }),
        reportError: send3((n2) => ({ type: "ERROR", error: n2.error })),
        reportSuccess: send3("SUCCESS")
      },
      guards: {
        invalidPassword: (n2, { password: r2 }) => !W(r2)
      },
      services: {
        requestChange: (n2, { password: r2, ticket: s }) => S(
          `${t2}/user/password`,
          { newPassword: r2, ticket: s },
          e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
        )
      }
    }
  );
  var ar = ({ backendUrl: t2, interpreter: e2 }) => createMachine(
    {
      schema: {
        context: {},
        events: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      id: "enableMfa",
      initial: "idle",
      context: { error: null, imageUrl: null, secret: null },
      states: {
        idle: {
          initial: "initial",
          on: {
            GENERATE: "generating"
          },
          states: {
            initial: {},
            error: {}
          }
        },
        generating: {
          invoke: {
            src: "generate",
            id: "generate",
            onDone: { target: "generated", actions: ["reportGeneratedSuccess", "saveGeneration"] },
            onError: { actions: ["saveError", "reportGeneratedError"], target: "idle.error" }
          }
        },
        generated: {
          initial: "idle",
          states: {
            idle: {
              initial: "idle",
              on: {
                ACTIVATE: [
                  {
                    cond: "invalidMfaType",
                    actions: "saveInvalidMfaTypeError",
                    target: ".error"
                  },
                  {
                    cond: "invalidMfaCode",
                    actions: "saveInvalidMfaCodeError",
                    target: ".error"
                  },
                  {
                    target: "activating"
                  }
                ]
              },
              states: { idle: {}, error: {} }
            },
            activating: {
              invoke: {
                src: "activate",
                id: "activate",
                onDone: { target: "activated", actions: "reportSuccess" },
                onError: { actions: ["saveError", "reportError"], target: "idle.error" }
              }
            },
            activated: { type: "final" }
          }
        }
      }
    },
    {
      actions: {
        saveInvalidMfaTypeError: assign3({ error: (n2) => he }),
        saveInvalidMfaCodeError: assign3({ error: (n2) => me }),
        saveError: assign3({
          error: (n2, { data: { error: r2 } }) => r2
        }),
        saveGeneration: assign3({
          imageUrl: (n2, { data: { imageUrl: r2 } }) => r2,
          secret: (n2, { data: { totpSecret: r2 } }) => r2
        }),
        reportError: send3((n2, r2) => (console.log("REPORT", n2, r2), { type: "ERROR", error: n2.error })),
        reportSuccess: send3("SUCCESS"),
        reportGeneratedSuccess: send3("GENERATED"),
        reportGeneratedError: send3((n2) => ({ type: "GENERATED_ERROR", error: n2.error }))
      },
      guards: {
        invalidMfaCode: (n2, { code: r2 }) => !r2,
        invalidMfaType: (n2, { activeMfaType: r2 }) => !r2 || r2 !== "totp"
      },
      services: {
        generate: async (n2) => {
          const { data: r2 } = await De(
            `${t2}/mfa/totp/generate`,
            e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
          );
          return r2;
        },
        activate: (n2, { code: r2, activeMfaType: s }) => S(
          `${t2}/user/mfa`,
          { code: r2, activeMfaType: s },
          e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
        )
      }
    }
  );
  var Ge = ({ backendUrl: t2, clientUrl: e2 }) => createMachine(
    {
      schema: {
        context: {},
        events: {},
        services: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      id: "changePassword",
      initial: "idle",
      context: { error: null },
      states: {
        idle: {
          on: {
            REQUEST: [
              {
                cond: "invalidEmail",
                actions: "saveInvalidEmailError",
                target: ".error"
              },
              {
                target: "requesting"
              }
            ]
          },
          initial: "initial",
          states: {
            initial: {},
            success: {},
            error: {}
          }
        },
        requesting: {
          invoke: {
            src: "requestChange",
            id: "requestChange",
            onDone: { target: "idle.success", actions: "reportSuccess" },
            onError: { actions: ["saveRequestError", "reportError"], target: "idle.error" }
          }
        }
      }
    },
    {
      actions: {
        saveInvalidEmailError: assign3({ error: (n2) => A }),
        saveRequestError: assign3({
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          error: (n2, { data: { error: r2 } }) => r2
        }),
        reportError: send3((n2) => ({ type: "ERROR", error: n2.error })),
        reportSuccess: send3("SUCCESS")
      },
      guards: {
        invalidEmail: (n2, { email: r2 }) => !I(r2)
      },
      services: {
        requestChange: (n2, { email: r2, options: s }) => S(`${t2}/user/password/reset`, {
          email: r2,
          options: w(e2, s)
        })
      }
    }
  );
  var Le = ({ backendUrl: t2, clientUrl: e2 }) => createMachine(
    {
      schema: {
        context: {},
        events: {},
        services: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      id: "sendVerificationEmail",
      initial: "idle",
      context: { error: null },
      states: {
        idle: {
          on: {
            REQUEST: [
              {
                cond: "invalidEmail",
                actions: "saveInvalidEmailError",
                target: ".error"
              },
              {
                target: "requesting"
              }
            ]
          },
          initial: "initial",
          states: {
            initial: {},
            success: {},
            error: {}
          }
        },
        requesting: {
          invoke: {
            src: "request",
            id: "request",
            onDone: { target: "idle.success", actions: "reportSuccess" },
            onError: { actions: ["saveRequestError", "reportError"], target: "idle.error" }
          }
        }
      }
    },
    {
      actions: {
        saveInvalidEmailError: assign3({ error: (n2) => A }),
        saveRequestError: assign3({
          // * Untyped action payload. See https://github.com/statelyai/xstate/issues/3037
          error: (n2, { data: { error: r2 } }) => r2
        }),
        reportError: send3((n2) => ({ type: "ERROR", error: n2.error })),
        reportSuccess: send3("SUCCESS")
      },
      guards: {
        invalidEmail: (n2, { email: r2 }) => !I(r2)
      },
      services: {
        request: async (n2, { email: r2, options: s }) => (await S(
          `${t2}/user/email/send-verification-email`,
          { email: r2, options: w(e2, s) }
        )).data
      }
    }
  );
  var ae = class {
    constructor({
      clientStorageType: e2 = "web",
      autoSignIn: n2 = true,
      autoRefreshToken: r2 = true,
      start: s = true,
      backendUrl: i,
      clientUrl: c,
      devTools: d2,
      ...f
    }) {
      if (this._started = false, this._subscriptionsQueue = /* @__PURE__ */ new Set(), this._subscriptions = /* @__PURE__ */ new Set(), this.backendUrl = i, this.clientUrl = c, this._machine = Me({
        ...f,
        backendUrl: i,
        clientUrl: c,
        clientStorageType: e2,
        autoSignIn: n2,
        autoRefreshToken: r2
      }), s && this.start({ devTools: d2 }), typeof window != "undefined" && n2)
        try {
          this._channel = new BroadcastChannel("nhost"), this._channel.addEventListener("message", (h) => {
            var o2;
            const a = (o2 = this.interpreter) == null ? void 0 : o2.getSnapshot().context.refreshToken.value;
            this.interpreter && h.data !== a && this.interpreter.send("TRY_TOKEN", { token: h.data });
          });
        } catch {
        }
    }
    start({
      devTools: e2 = false,
      initialSession: n2,
      interpreter: r2
    } = {}) {
      var c, d2;
      const s = { ...this.machine.context };
      n2 && (s.user = n2.user, s.refreshToken.value = (c = n2.refreshToken) != null ? c : null, s.accessToken.value = (d2 = n2.accessToken) != null ? d2 : null, s.accessToken.expiresAt = new Date(
        Date.now() + n2.accessTokenExpiresIn * 1e3
      ));
      const i = this.machine.withContext(s);
      this._interpreter || (this._interpreter = r2 || interpret(i, { devTools: e2 })), (!this._started || typeof window == "undefined") && (this._interpreter.initialized && (this._interpreter.stop(), this._subscriptions.forEach((f) => f())), this._interpreter.start(i.initialState), this._subscriptionsQueue.forEach((f) => f(this))), this._started = true;
    }
    get machine() {
      return this._machine;
    }
    get interpreter() {
      return this._interpreter;
    }
    get started() {
      return this._started;
    }
    subscribe(e2) {
      if (this.started) {
        const n2 = e2(this);
        return this._subscriptions.add(n2), n2;
      } else
        return this._subscriptionsQueue.add(e2), () => {
          console.log(
            "onTokenChanged was added before the interpreter started. Cannot unsubscribe listener."
          );
        };
    }
  };
  var $e = class extends ae {
    constructor({
      ...e2
    }) {
      super({
        ...e2,
        autoSignIn: q() && e2.autoSignIn,
        autoRefreshToken: q() && e2.autoRefreshToken,
        clientStorageType: "cookie"
      });
    }
  };
  var cr = $e;
  var qe = async ({ backendUrl: t2, interpreter: e2 }, n2) => {
    try {
      const { data: r2 } = await S(
        `${t2}/user/webauthn/add`,
        {},
        e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
      );
      let s;
      try {
        s = await te(r2);
      } catch (c) {
        throw new U(c);
      }
      const { data: i } = await S(
        `${t2}/user/webauthn/verify`,
        { credential: s, nickname: n2 },
        e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
      );
      return { key: i, isError: false, error: null, isSuccess: true };
    } catch (r2) {
      const { error: s } = r2;
      return { isError: true, error: s, isSuccess: false };
    }
  };
  var We = async (t2, e2, n2) => new Promise((r2) => {
    t2.send("REQUEST", {
      email: e2,
      options: n2
    }), t2.onTransition((s) => {
      s.matches({ idle: "error" }) ? r2({ error: s.context.error, isError: true, needsEmailVerification: false }) : s.matches({ idle: "success" }) && r2({ error: null, isError: false, needsEmailVerification: true });
    });
  });
  var je = async (t2, e2, n2) => new Promise((r2) => {
    t2.send("REQUEST", {
      password: e2,
      ticket: n2
    }), t2.onTransition((s) => {
      s.matches({ idle: "error" }) ? r2({ error: s.context.error, isError: true, isSuccess: false }) : s.matches({ idle: "success" }) && r2({ error: null, isError: false, isSuccess: true });
    });
  });
  var ur = (t2) => new Promise((e2) => {
    t2.send("GENERATE"), t2.onTransition((n2) => {
      n2.matches("generated") ? e2({
        error: null,
        isError: false,
        isGenerated: true,
        qrCodeDataUrl: n2.context.imageUrl || ""
      }) : n2.matches({ idle: "error" }) && e2({
        error: n2.context.error || null,
        isError: true,
        isGenerated: false,
        qrCodeDataUrl: ""
      });
    });
  });
  var lr = (t2, e2) => new Promise((n2) => {
    t2.send("ACTIVATE", {
      activeMfaType: "totp",
      code: e2
    }), t2.onTransition((r2) => {
      r2.matches({ generated: "activated" }) ? n2({ error: null, isActivated: true, isError: false }) : r2.matches({ generated: { idle: "error" } }) && n2({ error: r2.context.error, isActivated: false, isError: true });
    });
  });
  var He = async (t2, e2, n2) => new Promise((r2) => {
    t2.send("REQUEST", {
      email: e2,
      options: n2
    }), t2.onTransition((s) => {
      s.matches({ idle: "error" }) ? r2({ error: s.context.error, isError: true, isSent: false }) : s.matches({ idle: "success" }) && r2({ error: null, isError: false, isSent: true });
    });
  });
  var Ye = (t2, e2, n2) => new Promise((r2) => {
    t2.send("REQUEST", {
      email: e2,
      options: n2
    }), t2.onTransition((s) => {
      s.matches({ idle: "error" }) ? r2({ error: s.context.error, isError: true, isSent: false }) : s.matches({ idle: "success" }) && r2({ error: null, isError: false, isSent: true });
    });
  });
  var Fe = (t2) => new Promise((e2) => {
    const { changed: n2 } = t2.send("SIGNIN_ANONYMOUS");
    n2 || e2({
      isSuccess: false,
      isError: true,
      error: y,
      user: null,
      accessToken: null,
      refreshToken: null
    }), t2.onTransition((r2) => {
      r2.matches({ authentication: "signedIn" }) && e2({
        isSuccess: true,
        isError: false,
        error: null,
        user: r2.context.user,
        accessToken: r2.context.accessToken.value,
        refreshToken: r2.context.refreshToken.value
      }), r2.matches({ authentication: { signedOut: "failed" } }) && e2({
        isSuccess: false,
        isError: true,
        error: r2.context.errors.authentication || null,
        user: null,
        accessToken: null,
        refreshToken: null
      });
    });
  });
  var ze = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s, context: i } = t2.send("SIGNIN_PASSWORD", {
      email: e2,
      password: n2
    });
    if (!s)
      return r2({
        accessToken: i.accessToken.value,
        refreshToken: i.refreshToken.value,
        error: y,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        needsMfaOtp: false,
        mfa: null,
        user: i.user
      });
    t2.onTransition((c) => {
      c.matches({
        authentication: { signedOut: "noErrors" },
        registration: { incomplete: "needsEmailVerification" }
      }) ? r2({
        accessToken: null,
        refreshToken: null,
        error: null,
        isError: false,
        isSuccess: false,
        needsEmailVerification: true,
        needsMfaOtp: false,
        mfa: null,
        user: null
      }) : c.matches({ authentication: { signedOut: "needsMfa" } }) ? r2({
        accessToken: null,
        refreshToken: null,
        error: null,
        isError: false,
        isSuccess: false,
        needsEmailVerification: false,
        needsMfaOtp: true,
        mfa: c.context.mfa,
        user: null
      }) : c.matches({ authentication: { signedOut: "failed" } }) ? r2({
        accessToken: null,
        refreshToken: null,
        error: c.context.errors.authentication || null,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        needsMfaOtp: false,
        mfa: null,
        user: null
      }) : c.matches({ authentication: "signedIn" }) && r2({
        accessToken: c.context.accessToken.value,
        refreshToken: c.context.refreshToken.value,
        error: null,
        isError: false,
        isSuccess: true,
        needsEmailVerification: false,
        needsMfaOtp: false,
        mfa: null,
        user: c.context.user
      });
    });
  });
  var Q = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s } = t2.send("PASSWORDLESS_EMAIL", {
      email: e2,
      options: n2
    });
    if (!s)
      return r2({
        error: y,
        isError: true,
        isSuccess: false
      });
    t2.onTransition((i) => {
      i.matches("registration.incomplete.failed") ? r2({
        error: i.context.errors.registration || null,
        isError: true,
        isSuccess: false
      }) : i.matches({
        authentication: { signedOut: "noErrors" },
        registration: { incomplete: "needsEmailVerification" }
      }) && r2({ error: null, isError: false, isSuccess: true });
    });
  });
  var Qe = (t2, e2) => new Promise((n2) => {
    const { changed: r2, context: s } = t2.send({ type: "SIGNIN_SECURITY_KEY_EMAIL", email: e2 });
    if (!r2)
      return n2({
        accessToken: s.accessToken.value,
        refreshToken: s.refreshToken.value,
        error: y,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: s.user
      });
    t2.onTransition((i) => {
      i.matches({
        authentication: { signedOut: "noErrors" },
        registration: { incomplete: "needsEmailVerification" }
      }) ? n2({
        accessToken: null,
        refreshToken: null,
        error: null,
        isError: false,
        isSuccess: false,
        needsEmailVerification: true,
        user: null
      }) : i.matches({ authentication: { signedOut: "failed" } }) ? n2({
        accessToken: null,
        refreshToken: null,
        error: i.context.errors.authentication || null,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: null
      }) : i.matches({ authentication: "signedIn" }) && n2({
        accessToken: i.context.accessToken.value,
        refreshToken: i.context.refreshToken.value,
        error: null,
        isError: false,
        isSuccess: true,
        needsEmailVerification: false,
        user: i.context.user
      });
    });
  });
  var Be = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s, context: i } = t2.send("SIGNIN_MFA_TOTP", {
      otp: e2,
      ticket: n2
    });
    if (!s)
      return r2({
        accessToken: i.accessToken.value,
        refreshToken: i.refreshToken.value,
        error: y,
        isError: true,
        isSuccess: false,
        user: i.user
      });
    t2.onTransition((c) => {
      c.matches({ authentication: { signedOut: "failed" } }) ? r2({
        accessToken: null,
        refreshToken: null,
        error: c.context.errors.authentication || null,
        isError: true,
        isSuccess: false,
        user: null
      }) : c.matches({ authentication: "signedIn" }) && r2({
        accessToken: c.context.accessToken.value,
        refreshToken: c.context.refreshToken.value,
        error: null,
        isError: false,
        isSuccess: true,
        user: c.context.user
      });
    });
  });
  var Xe = (t2, e2) => new Promise((n2) => {
    const { changed: r2 } = t2.send("SIGNIN_PAT", { pat: e2 });
    r2 || n2({
      isSuccess: false,
      isError: true,
      error: y,
      user: null,
      accessToken: null,
      refreshToken: null
    }), t2.onTransition((s) => {
      if (s.matches({ authentication: { signedOut: "failed" } }))
        return n2({
          accessToken: null,
          refreshToken: null,
          user: null,
          error: s.context.errors.authentication || null,
          isError: true,
          isSuccess: false
        });
      if (s.matches({ authentication: "signedIn" }))
        return n2({
          accessToken: s.context.accessToken.value,
          refreshToken: s.context.refreshToken.value,
          user: s.context.user,
          error: null,
          isError: false,
          isSuccess: true
        });
    });
  });
  var B = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s } = t2.send("PASSWORDLESS_SMS", { phoneNumber: e2, options: n2 });
    if (!s)
      return r2({
        error: y,
        isError: true,
        isSuccess: false,
        needsOtp: false
      });
    t2.onTransition((i) => {
      i.matches("registration.incomplete.needsOtp") ? r2({
        error: null,
        isError: false,
        isSuccess: false,
        needsOtp: true
      }) : i.matches("registration.incomplete.failed") && r2({
        error: i.context.errors.authentication || null,
        isError: true,
        isSuccess: false,
        needsOtp: false
      });
    });
  });
  var Ze = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s } = t2.send({ type: "PASSWORDLESS_SMS_OTP", phoneNumber: e2, otp: n2 });
    if (!s)
      return r2({
        error: y,
        isError: true,
        isSuccess: false,
        user: null,
        accessToken: null,
        refreshToken: null
      });
    t2.onTransition((i) => {
      i.matches({ authentication: "signedIn" }) ? r2({
        error: null,
        isError: false,
        isSuccess: true,
        user: i.context.user,
        accessToken: i.context.accessToken.value,
        refreshToken: i.context.refreshToken.value
      }) : i.matches({ registration: { incomplete: "failed" } }) && r2({
        error: i.context.errors.authentication || null,
        isError: true,
        isSuccess: false,
        user: null,
        accessToken: null,
        refreshToken: null
      });
    });
  });
  var Je = async (t2, e2) => new Promise((n2) => {
    const { event: r2 } = t2.send("SIGNOUT", { all: e2 });
    if (r2.type !== "SIGNED_OUT")
      return n2({ isSuccess: false, isError: true, error: we });
    t2.onTransition((s) => {
      s.matches({ authentication: { signedOut: "success" } }) ? n2({ isSuccess: true, isError: false, error: null }) : s.matches("authentication.signedOut.failed") && n2({ isSuccess: false, isError: true, error: s.context.errors.signout || null });
    });
  });
  var X = (t2, e2, n2, r2) => new Promise((s) => {
    const { changed: i, context: c } = t2.send("SIGNUP_EMAIL_PASSWORD", {
      email: e2,
      password: n2,
      options: r2
    });
    if (!i)
      return s({
        error: y,
        accessToken: c.accessToken.value,
        refreshToken: c.refreshToken.value,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: c.user
      });
    t2.onTransition((d2) => {
      d2.matches("registration.incomplete.failed") ? s({
        accessToken: null,
        refreshToken: null,
        error: d2.context.errors.registration || null,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: null
      }) : d2.matches({
        authentication: { signedOut: "noErrors" },
        registration: { incomplete: "needsEmailVerification" }
      }) ? s({
        accessToken: null,
        refreshToken: null,
        error: null,
        isError: false,
        isSuccess: false,
        needsEmailVerification: true,
        user: null
      }) : d2.matches({ authentication: "signedIn", registration: "complete" }) && s({
        accessToken: d2.context.accessToken.value,
        refreshToken: d2.context.refreshToken.value,
        error: null,
        isError: false,
        isSuccess: true,
        needsEmailVerification: false,
        user: d2.context.user
      });
    });
  });
  var er = (t2, e2, n2) => new Promise((r2) => {
    const { changed: s, context: i } = t2.send("SIGNUP_SECURITY_KEY", {
      email: e2,
      options: n2
    });
    if (!s)
      return r2({
        error: y,
        accessToken: i.accessToken.value,
        refreshToken: i.refreshToken.value,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: i.user
      });
    t2.onTransition((c) => {
      c.matches("registration.incomplete.failed") ? r2({
        accessToken: null,
        refreshToken: null,
        error: c.context.errors.registration || null,
        isError: true,
        isSuccess: false,
        needsEmailVerification: false,
        user: null
      }) : c.matches({
        authentication: { signedOut: "noErrors" },
        registration: { incomplete: "needsEmailVerification" }
      }) ? r2({
        accessToken: null,
        refreshToken: null,
        error: null,
        isError: false,
        isSuccess: false,
        needsEmailVerification: true,
        user: null
      }) : c.matches({ authentication: "signedIn", registration: "complete" }) && r2({
        accessToken: c.context.accessToken.value,
        refreshToken: c.context.refreshToken.value,
        error: null,
        isError: false,
        isSuccess: true,
        needsEmailVerification: false,
        user: c.context.user
      });
    });
  });
  var rr = async ({ backendUrl: t2, interpreter: e2 }, { expiresAt: n2, metadata: r2 }) => {
    try {
      const { data: s } = await S(
        `${t2}/pat`,
        { expiresAt: n2.toUTCString(), metadata: r2 },
        e2 == null ? void 0 : e2.getSnapshot().context.accessToken.value
      );
      return {
        data: s ? {
          id: s.id || null,
          personalAccessToken: s.personalAccessToken || null
        } : null,
        isError: false,
        error: null,
        isSuccess: true
      };
    } catch (s) {
      const { error: i } = s;
      return { isError: true, error: i, isSuccess: false, data: null };
    }
  };
  var dr = class {
    constructor({
      url: e2,
      autoRefreshToken: n2 = true,
      autoSignIn: r2 = true,
      clientStorage: s,
      clientStorageType: i,
      refreshIntervalTime: c,
      start: d2 = true
    }) {
      var f;
      this.url = e2, this._client = new ae({
        backendUrl: e2,
        clientUrl: typeof window != "undefined" && ((f = window.location) == null ? void 0 : f.origin) || "",
        autoRefreshToken: n2,
        autoSignIn: r2,
        start: d2,
        clientStorage: s,
        clientStorageType: i,
        refreshIntervalTime: c
      });
    }
    /**
     * Use `nhost.auth.signUp` to sign up a user using email and password. If you want to sign up a user using passwordless email (Magic Link), SMS, or an OAuth provider, use the `signIn` function instead.
     *
     * @example
     * ### Sign up with an email and password
     * ```ts
     * nhost.auth.signUp({
     *   email: 'joe@example.com',
     *   password: 'secret-password'
     * })
     * ```
     *
     * @example
     * ### Sign up with a security key
     * ```ts
     * nhost.auth.signUp({
     *   email: 'joe@example.com',
     *   securityKey: true
     * })
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/sign-up
     */
    async signUp(e2) {
      const n2 = await this.waitUntilReady(), { email: r2, options: s } = e2;
      return "securityKey" in e2 ? v(
        await er(n2, r2, s)
      ) : v(
        await X(n2, r2, e2.password, s)
      );
    }
    /**
     * Use `nhost.auth.signIn` to sign in a user using email and password, passwordless (email or sms) or an external provider. `signIn` can be used to sign in a user in various ways depending on the parameters.
     *
     * @example
     * ### Sign in a user using email and password
     * ```ts
     * nhost.auth.signIn({
     *   email: 'joe@example.com',
     *   password: 'secret-password'
     * })
     * ```
     *
     * @example
     * ### Sign in a user using an OAuth provider (e.g: Google or Facebook)
     * ```ts
     * nhost.auth.signIn({ provider: 'google' })
     * ```
     *
     * @example
     * ### Sign in a user using passwordless email (Magic Link)
     * ```ts
     * nhost.auth.signIn({ email: 'joe@example.com' })
     * ```
     *
     * @example
     * ### Sign in a user using passwordless SMS
     * ```ts
     * // [step 1/2] Passwordless sign in using SMS
     * nhost.auth.signIn({ phoneNumber: '+11233213123' })
     *
     * // [step 2/2] Finish passwordless sign in using SMS (OTP)
     * nhost.auth.signIn({ phoneNumber: '+11233213123', otp: '123456' })
     * ```
     *
     * @example
     * ### Sign in anonymously
     * ```ts
     * // Sign in anonymously
     * nhost.auth.signIn()
     *
     * // Later in the application, the user can complete their registration
     * nhost.auth.signUp({
     *   email: 'joe@example.com',
     *   password: 'secret-password'
     * })
     * ```
     *
     * @example
     * ### Sign in with a security key
     * ```ts
     * nhost.auth.signIn({
     *   email: 'joe@example.com',
     *   securityKey: true
     * })
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/sign-in
     */
    async signIn(e2) {
      const n2 = await this.waitUntilReady();
      if (!e2) {
        const r2 = await Fe(n2);
        return { ...v(r2), mfa: null };
      }
      if ("provider" in e2) {
        const { provider: r2, options: s } = e2, i = oe(
          `${this._client.backendUrl}/signin/provider/${r2}`,
          w(this._client.clientUrl, s)
        );
        return q() && (window.location.href = i), { providerUrl: i, provider: r2, session: null, mfa: null, error: null };
      }
      if ("email" in e2 && "password" in e2) {
        const r2 = await ze(n2, e2.email, e2.password);
        return r2.needsEmailVerification ? { session: null, mfa: null, error: ke } : r2.needsMfaOtp ? {
          session: null,
          mfa: r2.mfa,
          error: null
        } : { ...v(r2), mfa: null };
      }
      if ("email" in e2 && "securityKey" in e2) {
        if (e2.securityKey !== true)
          throw Error("securityKey must be true");
        const r2 = await Qe(n2, e2.email);
        return { ...v(r2), mfa: null };
      }
      if ("email" in e2) {
        const { email: r2, options: s } = e2, { error: i } = await Q(n2, r2, s);
        return {
          session: null,
          mfa: null,
          error: i
        };
      }
      if ("phoneNumber" in e2 && "otp" in e2) {
        const r2 = await Ze(n2, e2.phoneNumber, e2.otp);
        return { ...v(r2), mfa: null };
      }
      if ("phoneNumber" in e2) {
        const { error: r2 } = await B(
          n2,
          e2.phoneNumber,
          e2.options
        );
        return { error: r2, mfa: null, session: null };
      }
      if ("otp" in e2) {
        const r2 = await Be(n2, e2.otp, e2.ticket);
        return { ...v(r2), mfa: null };
      }
      return { error: Se, mfa: null, session: null };
    }
    /**
     * Use `nhost.auth.signInPAT` to sign in with a personal access token (PAT).
     *
     * @example
     * ```ts
     * nhost.auth.signInPAT('34f74930-09c0-4af5-a8d5-28fad78e3415')
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/sign-in-pat
     *
     * @param personalAccessToken - The personal access token to sign in with
     */
    async signInPAT(e2) {
      const n2 = await this.waitUntilReady(), r2 = await Xe(n2, e2);
      return v(r2);
    }
    /**
     * Use `nhost.auth.signOut` to sign out the user.
     *
     * @example
     * ### Sign out the user from current device
     * ```ts
     * nhost.auth.signOut()
     * ```
     *
     * @example
     * ### Sign out the user from all devices
     * ```ts
     * nhost.auth.signOut({all: true})
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/sign-out
     */
    async signOut(e2) {
      const n2 = await this.waitUntilReady(), { error: r2 } = await Je(n2, e2 == null ? void 0 : e2.all);
      return { error: r2 };
    }
    /**
     * Use `nhost.auth.resetPassword` to reset the password for a user. This will send a reset-password link in an email to the user. When the user clicks the reset-password link the user is automatically signed-in. Once signed-in, the user can change their password using `nhost.auth.changePassword()`.
     *
     * @example
     * ```ts
     * nhost.auth.resetPassword({email: 'joe@example.com' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/reset-password
     */
    async resetPassword({ email: e2, options: n2 }) {
      const r2 = interpret(Ge(this._client)).start(), { error: s } = await He(r2, e2, n2);
      return { error: s };
    }
    /**
     * Use `nhost.auth.changePassword` to change the password for the signed-in user. The old password is not needed. In case the user is not signed-in, a password reset ticket needs to be provided.
     *
     * @example
     * ```ts
     * nhost.auth.changePassword({ newPassword: 'new-secret-password' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/change-password
     */
    async changePassword({
      newPassword: e2,
      ticket: n2
    }) {
      const r2 = interpret(Ve(this._client)).start(), { error: s } = await je(r2, e2, n2);
      return { error: s };
    }
    /**
     * Use `nhost.auth.sendVerificationEmail` to send a verification email to the specified email. The email contains a verification-email link. When the user clicks the verification-email link their email is verified.
     *
     * @example
     * ```ts
     * nhost.auth.sendVerificationEmail({ email: 'joe@example.com' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/send-verification-email
     */
    async sendVerificationEmail({
      email: e2,
      options: n2
    }) {
      const r2 = interpret(Le(this._client)).start(), { error: s } = await Ye(r2, e2, n2);
      return { error: s };
    }
    /**
     * Use `nhost.auth.changeEmail` to change a user's email. This will send a confirm-email-change link in an email to the new email. Once the user clicks on the confirm-email-change link the email will be change to the new email.
     *
     * @example
     * ```ts
     * nhost.auth.changeEmail({ newEmail: 'doe@example.com' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/change-email
     */
    async changeEmail({ newEmail: e2, options: n2 }) {
      const r2 = interpret(Ke(this._client)).start(), { error: s } = await We(r2, e2, n2);
      return { error: s };
    }
    /**
     * Use `nhost.auth.deanonymize` to deanonymize a user.
     *
     * @example
     * ```ts
     * nhost.auth.deanonymize({signInMethod: 'email-password', email: 'joe@example.com' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/deanonymize
     */
    async deanonymize(e2) {
      const n2 = await this.waitUntilReady();
      if (e2.signInMethod === "passwordless") {
        if (e2.connection === "email") {
          const { error: r2 } = await Q(
            n2,
            e2.email,
            e2.options
          );
          return { error: r2 };
        }
        if (e2.connection === "sms") {
          const { error: r2 } = await B(
            n2,
            e2.phoneNumber,
            e2.options
          );
          return { error: r2 };
        }
      }
      if (e2.signInMethod === "email-password") {
        const { error: r2 } = await X(
          n2,
          e2.email,
          e2.password,
          e2.options
        );
        return { error: r2 };
      }
      throw Error("Unknown deanonymization method");
    }
    /**
     * Use `nhost.auth.addSecurityKey to add a security key to the user, using the WebAuthn API.
     * @param nickname optional human-readable nickname for the security key
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/add-security-key
     */
    async addSecurityKey(e2) {
      const { error: n2, key: r2 } = await qe(this._client, e2);
      return { error: n2, key: r2 };
    }
    /**
     * Use `nhost.auth.createPAT` to create a personal access token for the user.
     *
     * @param expiresAt Expiration date for the token
     * @param metadata Optional metadata to store with the token
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/create-pat
     */
    async createPAT(e2, n2) {
      return rr(this._client, { expiresAt: e2, metadata: n2 });
    }
    /**
     * Use `nhost.auth.onTokenChanged` to add a custom function that runs every time the access or refresh token is changed.
     *
     *
     * @example
     * ```ts
     * nhost.auth.onTokenChanged(() => console.log('The access and refresh token has changed'));
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/on-token-changed
     */
    onTokenChanged(e2) {
      return this._client.subscribe(() => {
        var r2;
        const n2 = (r2 = this._client.interpreter) == null ? void 0 : r2.onTransition(({ event: s, context: i }) => {
          s.type === "TOKEN_CHANGED" && e2(x(i));
        });
        return () => n2 == null ? void 0 : n2.stop();
      });
    }
    /**
     * Use `nhost.auth.onAuthStateChanged` to add a custom function that runs every time the authentication status of the user changes. E.g. add a custom function that runs every time the authentication status changes from signed-in to signed-out.
     *
     * @example
     * ```ts
     * nhost.auth.onAuthStateChanged((event, session) => {
     *   console.log(`The auth state has changed. State is now ${event} with session: ${session}`)
     * });
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/on-auth-state-changed
     */
    onAuthStateChanged(e2) {
      return this._client.subscribe(() => {
        var r2;
        const n2 = (r2 = this._client.interpreter) == null ? void 0 : r2.onTransition(({ event: s, context: i }) => {
          (s.type === "SIGNED_IN" || s.type === "SIGNED_OUT") && e2(s.type, x(i));
        });
        return () => n2 == null ? void 0 : n2.stop();
      });
    }
    /**
     * Use `nhost.auth.isAuthenticated` to check if the user is authenticated or not.
     *
     * Note: `nhost.auth.isAuthenticated()` can return `false` for two reasons:
     * 1. The user is not authenticated
     * 2. The user is not authenticated but _might_ be authenticated soon (loading) because there is a network request in transit.
     *
     * Use `nhost.auth.getAuthenticationStatus` to get both authentication and loading status.
     *
     * @example
     * ```ts
     * const isAuthenticated = nhost.auth.isAuthenticated();
     *
     * if (isAuthenticated) {
     *   console.log('User is authenticated');
     * }
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/is-authenticated
     */
    isAuthenticated() {
      var e2;
      return !!((e2 = this._client.interpreter) != null && e2.getSnapshot().matches({ authentication: "signedIn" }));
    }
    /**
     * Use `nhost.auth.isAuthenticatedAsync` to wait (await) for any internal authentication network requests to finish and then return the authentication status.
     *
     * The promise won't resolve until the authentication status is known.
     * Attention: when using auto-signin and a refresh token is present in the client storage, the promise won't resolve if the server can't be reached (e.g. offline) or if it returns an internal error.
     *
     * @example
     * ```ts
     * const isAuthenticated  = await nhost.auth.isAuthenticatedAsync();
     *
     * if (isAuthenticated) {
     *   console.log('User is authenticated');
     * }
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/is-authenticated-async
     */
    async isAuthenticatedAsync() {
      return (await this.waitUntilReady()).getSnapshot().matches({ authentication: "signedIn" });
    }
    /**
     * Use `nhost.auth.getAuthenticationStatus` to get the authentication status of the user.
     *
     * If `isLoading` is `true`, the client doesn't know whether the user is authenticated yet or not
     * because some internal authentication network requests have not been resolved yet.
     *
     * The `connectionAttempts` returns the number of times the client has tried to connect to the server with no success (offline, or the server retruned an internal error).
     *
     * @example
     * ```ts
     * const { isAuthenticated, isLoading } = nhost.auth.getAuthenticationStatus();
     *
     * if (isLoading) {
     *   console.log('Loading...')
     * }
     *
     * if (isAuthenticated) {
     *   console.log('User is authenticated');
     * }
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/get-authentication-status
     */
    getAuthenticationStatus() {
      var n2;
      const e2 = ((n2 = this.client.interpreter) == null ? void 0 : n2.getSnapshot().context.importTokenAttempts) || 0;
      return this.isReady() ? { isAuthenticated: this.isAuthenticated(), isLoading: false, connectionAttempts: e2 } : {
        isAuthenticated: false,
        isLoading: true,
        connectionAttempts: e2
      };
    }
    /**
     * Use `nhost.auth.getAccessToken` to get the access token of the user.
     *
     * @example
     * ```ts
     * const accessToken = nhost.auth.getAccessToken();
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/get-access-token
     */
    getAccessToken() {
      var e2, n2;
      return (n2 = (e2 = this._client.interpreter) == null ? void 0 : e2.getSnapshot().context.accessToken.value) != null ? n2 : void 0;
    }
    /**
     * Use `nhost.auth.getDecodedAccessToken` to get the decoded access token of the user.
     *
     * @example
     * ```ts
     * const decodedAccessToken = nhost.auth.getDecodedAccessToken();
     * ```
     *
     * @see {@link https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/| Hasura documentation}
     * @docs https://docs.nhost.io/reference/javascript/auth/get-decoded-access-token
     */
    getDecodedAccessToken() {
      const e2 = this.getAccessToken();
      return e2 ? jwt_decode_esm_default(e2) : null;
    }
    /**
     * Use `nhost.auth.getHasuraClaims` to get the Hasura claims of the user.
     *
     * @example
     * ```ts
     * const hasuraClaims = nhost.auth.getHasuraClaims();
     * ```
     *
     * @see {@link https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/| Hasura documentation}
     * @docs https://docs.nhost.io/reference/javascript/auth/get-hasura-claims
     */
    getHasuraClaims() {
      var e2;
      return ((e2 = this.getDecodedAccessToken()) == null ? void 0 : e2["https://hasura.io/jwt/claims"]) || null;
    }
    /**
     * Use `nhost.auth.getHasuraClaim` to get the value of a specific Hasura claim of the user.
     *
     * @example
     * ```ts
     * // if `x-hasura-company-id` exists as a custom claim
     * const companyId = nhost.auth.getHsauraClaim('company-id')
     * ```
     *
     * @param name Name of the variable. You don't have to specify `x-hasura-`.
     *
     * @see {@link https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/| Hasura documentation}
     * @docs https://docs.nhost.io/reference/javascript/auth/get-hasura-claim
     */
    getHasuraClaim(e2) {
      var n2;
      return ((n2 = this.getHasuraClaims()) == null ? void 0 : n2[e2.startsWith("x-hasura-") ? e2 : `x-hasura-${e2}`]) || null;
    }
    /**
     *
     * Use `nhost.auth.refreshSession` to refresh the session with either the current internal refresh token or an external refresh token.
     *
     * Note: The Nhost client automatically refreshes the session when the user is authenticated but `nhost.auth.refreshSession` can be useful in some special cases.
     *
     * @example
     * ```ts
     * // Refresh the session with the the current internal refresh token.
     * nhost.auth.refreshToken();
     *
     * // Refresh the session with an external refresh token.
     * nhost.auth.refreshToken(refreshToken);
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/refresh-session
     */
    async refreshSession(e2) {
      try {
        const n2 = await this.waitUntilReady();
        return new Promise((r2) => {
          const s = e2 || n2.getSnapshot().context.refreshToken.value;
          if (!s)
            return r2({ session: null, error: Te });
          const { changed: i } = n2.send("TRY_TOKEN", { token: s });
          if (!i)
            return r2({ session: null, error: pe });
          n2.onTransition((c) => {
            c.matches({ token: { idle: "error" } }) ? r2({
              session: null,
              // * TODO get the error from xstate once it is implemented
              error: ye
            }) : c.event.type === "TOKEN_CHANGED" && r2({ session: x(c.context), error: null });
          });
        });
      } catch (n2) {
        return { session: null, error: n2.message };
      }
    }
    /**
     *
     * Use `nhost.auth.getSession()` to get the session of the user.
     *
     * @example
     * ```ts
     * const session = nhost.auth.getSession();
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/get-session
     */
    getSession() {
      var e2, n2;
      return x((n2 = (e2 = this._client.interpreter) == null ? void 0 : e2.getSnapshot()) == null ? void 0 : n2.context);
    }
    /**
     *
     * Use `nhost.auth.getUser()` to get the signed-in user.
     *
     * @example
     * ```ts
     * const user = nhost.auth.getUser();
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/auth/get-user
     */
    getUser() {
      var e2, n2, r2;
      return ((r2 = (n2 = (e2 = this._client.interpreter) == null ? void 0 : e2.getSnapshot()) == null ? void 0 : n2.context) == null ? void 0 : r2.user) || null;
    }
    /**
     * Make sure the state machine is set, and wait for it to be ready
     * @returns
     */
    waitUntilReady() {
      const n2 = this._client.interpreter;
      if (!n2)
        throw Error("Auth interpreter not set");
      return n2.getSnapshot().hasTag("loading") ? new Promise((r2, s) => {
        let i = setTimeout(
          () => s("The state machine is not yet ready after 15 seconds."),
          15e3
        );
        n2.onTransition((c) => {
          if (!c.hasTag("loading"))
            return clearTimeout(i), r2(n2);
        });
      }) : Promise.resolve(n2);
    }
    isReady() {
      var e2, n2;
      return !((n2 = (e2 = this._client.interpreter) == null ? void 0 : e2.getSnapshot()) != null && n2.hasTag("loading"));
    }
    get client() {
      return this._client;
    }
  };

  // node_modules/@nhost/hasura-storage-js/dist/index.esm.js
  var import_fetch_ponyfill2 = __toESM(require_fetch_browser());
  var import_form_data = __toESM(require_browser());
  var _2 = globalThis.fetch;
  var y2 = async (t2, e2, {
    accessToken: r2,
    name: s,
    fileId: o2,
    bucketId: a,
    adminSecret: n2,
    onUploadProgress: d2,
    headers: u2 = {}
  } = {}) => {
    var L;
    const p = {
      ...u2
    };
    a && e2.append("bucket-id", a), n2 && (p["x-hasura-admin-secret"] = n2), r2 && (p.Authorization = `Bearer ${r2}`);
    const U3 = `${t2}/files`;
    if (typeof XMLHttpRequest == "undefined")
      try {
        e2 instanceof import_form_data.default && (_2 = (0, import_fetch_ponyfill2.default)().fetch);
        const c = await _2(U3, {
          method: "POST",
          headers: p,
          body: e2
          // * https://github.com/form-data/form-data/issues/513
        }), i = await c.json();
        return c.ok ? { fileMetadata: i, error: null } : { error: {
          status: c.status,
          message: ((L = i == null ? void 0 : i.error) == null ? void 0 : L.message) || c.statusText,
          // * errors from hasura-storage are not codified
          error: c.statusText
        }, fileMetadata: null };
      } catch (c) {
        return { error: {
          status: 0,
          message: c.message,
          error: c.message
        }, fileMetadata: null };
      }
    return new Promise((c) => {
      let i = new XMLHttpRequest();
      i.responseType = "json", i.onload = () => {
        var f, h, T3, S3, w3;
        return i.status < 200 || i.status >= 300 ? c({
          fileMetadata: null,
          error: {
            error: (h = (f = i.response) == null ? void 0 : f.error) != null ? h : i.response,
            message: (w3 = (S3 = (T3 = i.response) == null ? void 0 : T3.error) == null ? void 0 : S3.message) != null ? w3 : i.response,
            status: i.status
          }
        }) : c({ fileMetadata: i.response, error: null });
      }, i.onerror = () => c({
        fileMetadata: null,
        error: { error: i.statusText, message: i.statusText, status: i.status }
      }), d2 && i.upload.addEventListener("progress", d2, false), i.open("POST", U3, true), Object.entries(p).forEach(([f, h]) => {
        i.setRequestHeader(f, h);
      }), i.send(e2);
    });
  };
  var m;
  typeof m == "undefined" && (m = (0, import_fetch_ponyfill2.default)().fetch);
  var x2 = class {
    constructor({ url: e2 }) {
      this.url = e2;
    }
    async uploadFormData({
      formData: e2,
      headers: r2,
      bucketId: s
    }) {
      const { error: o2, fileMetadata: a } = await y2(this.url, e2, {
        accessToken: this.accessToken,
        adminSecret: this.adminSecret,
        bucketId: s,
        headers: r2
      });
      return o2 ? { fileMetadata: null, error: o2 } : a && !("processedFiles" in a) ? {
        fileMetadata: {
          processedFiles: [a]
        },
        error: null
      } : { fileMetadata: a, error: null };
    }
    async uploadFile({
      file: e2,
      bucketId: r2,
      id: s,
      name: o2
    }) {
      const a = typeof window == "undefined" ? new import_form_data.default() : new FormData();
      a.append("file[]", e2), a.append("metadata[]", JSON.stringify({ id: s, name: o2 }));
      const { error: n2, fileMetadata: d2 } = await y2(this.url, a, {
        accessToken: this.accessToken,
        adminSecret: this.adminSecret,
        bucketId: r2,
        fileId: s,
        name: o2
      });
      return n2 ? { fileMetadata: null, error: n2 } : d2 && "processedFiles" in d2 ? {
        fileMetadata: d2.processedFiles[0],
        error: null
      } : { fileMetadata: d2, error: null };
    }
    async getPresignedUrl(e2) {
      try {
        const { fileId: r2 } = e2, s = await m(`${this.url}/files/${r2}/presignedurl`, {
          method: "GET",
          headers: this.generateAuthHeaders()
        });
        if (!s.ok)
          throw new Error(await s.text());
        return { presignedUrl: await s.json(), error: null };
      } catch (r2) {
        return { presignedUrl: null, error: r2 };
      }
    }
    async delete(e2) {
      try {
        const { fileId: r2 } = e2, s = await m(`${this.url}/files/${r2}`, {
          method: "DELETE",
          headers: this.generateAuthHeaders()
        });
        if (!s.ok)
          throw new Error(await s.text());
        return { error: null };
      } catch (r2) {
        return { error: r2 };
      }
    }
    /**
     * Set the access token to use for authentication.
     *
     * @param accessToken Access token
     * @returns Hasura Storage API instance
     */
    setAccessToken(e2) {
      return this.accessToken = e2, this;
    }
    /**
     * Set the admin secret to use for authentication.
     *
     * @param adminSecret Hasura admin secret
     * @returns Hasura Storage API instance
     */
    setAdminSecret(e2) {
      return this.adminSecret = e2, this;
    }
    generateAuthHeaders() {
      if (!(!this.adminSecret && !this.accessToken))
        return this.adminSecret ? {
          "x-hasura-admin-secret": this.adminSecret
        } : {
          Authorization: `Bearer ${this.accessToken}`
        };
    }
  };
  function F2(t2, e2) {
    if (!e2 || Object.keys(e2).length === 0)
      return t2;
    const r2 = new URL(t2), s = Object.entries(e2).reduce(
      (o2, [a, n2]) => ({ ...o2, [a.charAt(0)]: n2 }),
      {}
    );
    return Object.entries(s).forEach(([o2, a]) => {
      a && r2.searchParams.set(o2, a);
    }), r2.toString();
  }
  var j2 = class {
    constructor({ url: e2, adminSecret: r2 }) {
      this.url = e2, this.api = new x2({ url: e2 }), this.setAdminSecret(r2);
    }
    async upload(e2) {
      return "file" in e2 ? this.api.uploadFile(e2) : this.api.uploadFormData(e2);
    }
    /**
     * Use `nhost.storage.getPublicUrl` to get the public URL of a file. The public URL can be used for un-authenticated users to access files. To access public files the `public` role must have permissions to select the file in the `storage.files` table.
     *
     * @example
     * ```ts
     * const publicUrl = nhost.storage.getPublicUrl({ fileId: '<File-ID>' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/storage/get-public-url
     */
    getPublicUrl(e2) {
      const { fileId: r2, ...s } = e2;
      return F2(
        `${this.url}/files/${r2}`,
        s
      );
    }
    /**
     * Use `nhost.storage.getPresignedUrl` to get a presigned URL of a file. To get a presigned URL the user must have permission to select the file in the `storage.files` table.
     *
     * @example
     * ```ts
     * const { presignedUrl, error} = await nhost.storage.getPresignedUrl({ fileId: '<File-ID>' })
     *
     * if (error) {
     *   throw error;
     * }
     *
     * console.log('url: ', presignedUrl.url)
     * console.log('expiration: ', presignedUrl.expiration)
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/storage/get-presigned-url
     */
    async getPresignedUrl(e2) {
      const { fileId: r2, ...s } = e2, { presignedUrl: o2, error: a } = await this.api.getPresignedUrl(e2);
      if (a)
        return { presignedUrl: null, error: a };
      if (!o2)
        return { presignedUrl: null, error: new Error("Invalid file id") };
      const n2 = F2(
        o2.url,
        s
      );
      return {
        presignedUrl: {
          ...o2,
          url: n2
        },
        error: null
      };
    }
    /**
     * Use `nhost.storage.delete` to delete a file. To delete a file the user must have permissions to delete the file in the `storage.files` table. Deleting the file using `nhost.storage.delete()` will delete both the file and its metadata.
     *
     * @example
     * ```ts
     * const { error } = await nhost.storage.delete({ fileId: 'uuid' })
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/storage/delete
     */
    async delete(e2) {
      const { error: r2 } = await this.api.delete(e2);
      return r2 ? { error: r2 } : { error: null };
    }
    /**
     * Use `nhost.storage.setAccessToken` to a set an access token to be used in subsequent storage requests. Note that if you're signin in users with `nhost.auth.signIn()` the access token will be set automatically.
     *
     * @example
     * ```ts
     * nhost.storage.setAccessToken('some-access-token')
     * ```
     *
     * @param accessToken Access token
     *
     * @docs https://docs.nhost.io/reference/javascript/storage/set-access-token
     */
    setAccessToken(e2) {
      return this.api.setAccessToken(e2), this;
    }
    /**
     * Use `nhost.storage.adminSecret` to set the admin secret to be used for subsequent storage requests. This is useful if you want to run storage in "admin mode".
     *
     * @example
     * ```ts
     * nhost.storage.setAdminSecret('some-admin-secret')
     * ```
     *
     * @param adminSecret Hasura admin secret
     *
     * @docs https://docs.nhost.io/reference/javascript/storage/set-admin-secret
     */
    setAdminSecret(e2) {
      return this.api.setAdminSecret(e2), this;
    }
  };
  var E;
  typeof E == "undefined" && (E = import_form_data.default);
  var D2 = {
    progress: null,
    loaded: 0,
    error: null,
    bucketId: void 0,
    file: void 0,
    id: void 0
  };
  var b = () => createMachine(
    {
      predictableActionArguments: true,
      schema: {
        context: {},
        events: {}
      },
      tsTypes: {},
      context: { ...D2 },
      initial: "idle",
      on: {
        DESTROY: { actions: "sendDestroy", target: "stopped" }
      },
      states: {
        idle: {
          on: {
            ADD: { actions: "addFile" },
            UPLOAD: { cond: "hasFile", target: "uploading" }
          }
        },
        uploading: {
          entry: "resetProgress",
          on: {
            UPLOAD_PROGRESS: { actions: ["incrementProgress", "sendProgress"] },
            UPLOAD_DONE: "uploaded",
            UPLOAD_ERROR: "error",
            CANCEL: "idle"
          },
          invoke: { src: "uploadFile" }
        },
        uploaded: {
          entry: ["setFileMetadata", "sendDone"],
          on: {
            ADD: { actions: "addFile", target: "idle" },
            UPLOAD: { actions: "resetContext", target: "uploading" }
          }
        },
        error: {
          entry: ["setError", "sendError"],
          on: {
            ADD: { actions: "addFile", target: "idle" },
            UPLOAD: { actions: "resetContext", target: "uploading" }
          }
        },
        stopped: { type: "final" }
      }
    },
    {
      guards: {
        hasFile: (t2, e2) => !!t2.file || !!e2.file
      },
      actions: {
        incrementProgress: assign3({
          loaded: (t2, { loaded: e2 }) => e2,
          progress: (t2, { progress: e2 }) => e2
        }),
        setFileMetadata: assign3({
          id: (t2, { id: e2 }) => e2,
          bucketId: (t2, { bucketId: e2 }) => e2,
          progress: (t2) => 100
        }),
        setError: assign3({ error: (t2, { error: e2 }) => e2 }),
        sendProgress: () => {
        },
        sendError: () => {
        },
        sendDestroy: () => {
        },
        sendDone: () => {
        },
        resetProgress: assign3({ progress: (t2) => null, loaded: (t2) => 0 }),
        resetContext: assign3((t2) => D2),
        addFile: assign3({
          file: (t2, { file: e2 }) => e2,
          bucketId: (t2, { bucketId: e2 }) => e2,
          id: (t2, { id: e2 }) => e2
        })
      },
      services: {
        uploadFile: (t2, e2) => (r2) => {
          const s = e2.file || t2.file, o2 = new E();
          o2.append("file[]", s);
          let a = 0;
          return y2(e2.url, o2, {
            fileId: e2.id || t2.id,
            bucketId: e2.bucketId || t2.bucketId,
            accessToken: e2.accessToken,
            adminSecret: e2.adminSecret,
            name: e2.name || s.name,
            onUploadProgress: (n2) => {
              const d2 = n2.total ? Math.round(n2.loaded * s.size / n2.total) : 0, u2 = d2 - a;
              a = d2, r2({
                type: "UPLOAD_PROGRESS",
                progress: n2.total ? Math.round(d2 * 100 / n2.total) : 0,
                loaded: d2,
                additions: u2
              });
            }
          }).then(({ fileMetadata: n2, error: d2 }) => {
            if (d2 && r2({ type: "UPLOAD_ERROR", error: d2 }), n2 && !("processedFiles" in n2)) {
              const { id: u2, bucketId: p } = n2;
              r2({ type: "UPLOAD_DONE", id: u2, bucketId: p });
            }
            if (n2 && "processedFiles" in n2) {
              const { id: u2, bucketId: p } = n2.processedFiles[0];
              r2({ type: "UPLOAD_DONE", id: u2, bucketId: p });
            }
          }), () => {
          };
        }
      }
    }
  );
  var { pure: P, sendParent: g2 } = actions_exports;
  var H2 = () => createMachine(
    {
      id: "files-list",
      schema: {
        context: {},
        events: {}
      },
      tsTypes: {},
      predictableActionArguments: true,
      context: {
        progress: null,
        files: [],
        loaded: 0,
        total: 0
      },
      initial: "idle",
      on: {
        UPLOAD: { cond: "hasFileToDownload", actions: "addItem", target: "uploading" },
        ADD: { actions: "addItem" },
        REMOVE: { actions: "removeItem" }
      },
      states: {
        idle: {
          entry: ["resetProgress", "resetLoaded", "resetTotal"],
          on: {
            CLEAR: { actions: "clearList", target: "idle" }
          }
        },
        uploading: {
          entry: ["upload", "startProgress", "resetLoaded", "resetTotal"],
          on: {
            UPLOAD_PROGRESS: { actions: ["incrementProgress"] },
            UPLOAD_DONE: [
              { cond: "isAllUploaded", target: "uploaded" },
              { cond: "isAllUploadedOrError", target: "error" }
            ],
            UPLOAD_ERROR: [
              { cond: "isAllUploaded", target: "uploaded" },
              { cond: "isAllUploadedOrError", target: "error" }
            ],
            CANCEL: { actions: "cancel", target: "idle" }
          }
        },
        uploaded: {
          entry: "setUploaded",
          on: {
            CLEAR: { actions: "clearList", target: "idle" }
          }
        },
        error: {
          on: {
            CLEAR: { actions: "clearList", target: "idle" }
          }
        }
      }
    },
    {
      guards: {
        hasFileToDownload: (t2, e2) => t2.files.some((r2) => r2.getSnapshot().matches("idle")) || !!e2.files,
        isAllUploaded: (t2) => t2.files.every((e2) => {
          var r2;
          return (r2 = e2.getSnapshot()) == null ? void 0 : r2.matches("uploaded");
        }),
        isAllUploadedOrError: (t2) => t2.files.every((e2) => {
          const r2 = e2.getSnapshot();
          return (r2 == null ? void 0 : r2.matches("error")) || (r2 == null ? void 0 : r2.matches("uploaded"));
        })
      },
      actions: {
        incrementProgress: assign3((t2, e2) => {
          const r2 = t2.loaded + e2.additions, s = Math.round(r2 * 100 / t2.total);
          return { ...t2, loaded: r2, progress: s };
        }),
        setUploaded: assign3({
          progress: (t2) => 100,
          loaded: ({ files: t2 }) => t2.map((e2) => e2.getSnapshot()).filter((e2) => e2.matches("uploaded")).reduce((e2, r2) => {
            var s;
            return e2 + ((s = r2.context.file) == null ? void 0 : s.size);
          }, 0)
        }),
        resetTotal: assign3({
          total: ({ files: t2 }) => t2.map((e2) => e2.getSnapshot()).filter((e2) => !e2.matches("uploaded")).reduce((e2, r2) => {
            var s;
            return e2 + ((s = r2.context.file) == null ? void 0 : s.size);
          }, 0)
        }),
        resetLoaded: assign3({ loaded: (t2) => 0 }),
        startProgress: assign3({ progress: (t2) => 0 }),
        resetProgress: assign3({ progress: (t2) => null }),
        addItem: assign3((t2, { files: e2, bucketId: r2 }) => {
          const s = e2 ? Array.isArray(e2) ? e2 : "item" in e2 ? Array.from(e2) : [e2] : [], o2 = t2.total + s.reduce((n2, d2) => n2 + d2.size, 0), a = Math.round(t2.loaded * 100 / o2);
          return {
            files: [
              ...t2.files,
              ...s.map(
                (n2) => spawn(
                  b().withConfig({
                    actions: {
                      sendProgress: g2((d2, { additions: u2 }) => ({
                        type: "UPLOAD_PROGRESS",
                        additions: u2
                      })),
                      sendDone: g2("UPLOAD_DONE"),
                      sendError: g2("UPLOAD_ERROR"),
                      sendDestroy: g2("REMOVE")
                    }
                  }).withContext({ ...D2, file: n2, bucketId: r2 }),
                  { sync: true }
                )
              )
            ],
            total: o2,
            loaded: t2.loaded,
            progress: a
          };
        }),
        removeItem: assign3({
          files: (t2) => t2.files.filter((e2) => {
            var s, o2;
            const r2 = (s = e2.getSnapshot()) == null ? void 0 : s.matches("stopped");
            return r2 && ((o2 = e2.stop) == null || o2.call(e2)), !r2;
          })
        }),
        clearList: P(
          (t2) => t2.files.map((e2) => send3({ type: "DESTROY" }, { to: e2.id }))
        ),
        upload: P((t2, e2) => t2.files.map((r2) => send3(e2, { to: r2.id }))),
        cancel: P(
          (t2) => t2.files.map((e2) => send3({ type: "CANCEL" }, { to: e2.id }))
        )
      }
    }
  );
  var z2 = async (t2, e2) => new Promise((r2) => {
    e2.send({
      type: "UPLOAD",
      ...t2
    }), e2.subscribe((s) => {
      var o2;
      s.matches("error") ? r2({
        error: s.context.error,
        isError: true,
        isUploaded: false
      }) : s.matches("uploaded") && r2({
        error: null,
        isError: false,
        isUploaded: true,
        id: s.context.id,
        bucketId: s.context.id,
        name: (o2 = s.context.file) == null ? void 0 : o2.name
      });
    });
  });
  var G2 = async (t2, e2) => new Promise((r2) => {
    e2.send({
      type: "UPLOAD",
      ...t2,
      files: t2.files
    }), e2.onTransition((s) => {
      s.matches("error") ? r2({
        errors: s.context.files.filter((o2) => {
          var a;
          return (a = o2.getSnapshot()) == null ? void 0 : a.context.error;
        }),
        isError: true,
        files: []
      }) : s.matches("uploaded") && r2({ errors: [], isError: false, files: s.context.files });
    });
  });

  // node_modules/@nhost/nhost-js/dist/index.esm.js
  var import_isomorphic_unfetch2 = __toESM(require_browser2());

  // node_modules/@nhost/graphql-js/dist/index.esm.js
  var import_isomorphic_unfetch = __toESM(require_browser2());

  // node_modules/graphql/jsutils/devAssert.mjs
  function devAssert(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
      throw new Error(message);
    }
  }

  // node_modules/graphql/jsutils/isObjectLike.mjs
  function isObjectLike(value) {
    return typeof value == "object" && value !== null;
  }

  // node_modules/graphql/jsutils/invariant.mjs
  function invariant(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
      throw new Error(
        message != null ? message : "Unexpected invariant triggered."
      );
    }
  }

  // node_modules/graphql/language/location.mjs
  var LineRegExp = /\r\n|[\n\r]/g;
  function getLocation(source, position) {
    let lastLineStart = 0;
    let line = 1;
    for (const match of source.body.matchAll(LineRegExp)) {
      typeof match.index === "number" || invariant(false);
      if (match.index >= position) {
        break;
      }
      lastLineStart = match.index + match[0].length;
      line += 1;
    }
    return {
      line,
      column: position + 1 - lastLineStart
    };
  }

  // node_modules/graphql/language/printLocation.mjs
  function printLocation(location) {
    return printSourceLocation(
      location.source,
      getLocation(location.source, location.start)
    );
  }
  function printSourceLocation(source, sourceLocation) {
    const firstLineColumnOffset = source.locationOffset.column - 1;
    const body = "".padStart(firstLineColumnOffset) + source.body;
    const lineIndex = sourceLocation.line - 1;
    const lineOffset = source.locationOffset.line - 1;
    const lineNum = sourceLocation.line + lineOffset;
    const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
    const columnNum = sourceLocation.column + columnOffset;
    const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
    const lines = body.split(/\r\n|[\n\r]/g);
    const locationLine = lines[lineIndex];
    if (locationLine.length > 120) {
      const subLineIndex = Math.floor(columnNum / 80);
      const subLineColumnNum = columnNum % 80;
      const subLines = [];
      for (let i = 0; i < locationLine.length; i += 80) {
        subLines.push(locationLine.slice(i, i + 80));
      }
      return locationStr + printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
        ["|", "^".padStart(subLineColumnNum)],
        ["|", subLines[subLineIndex + 1]]
      ]);
    }
    return locationStr + printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ["|", "^".padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]]
    ]);
  }
  function printPrefixedLines(lines) {
    const existingLines = lines.filter(([_4, line]) => line !== void 0);
    const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
    return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
  }

  // node_modules/graphql/error/GraphQLError.mjs
  function toNormalizedOptions(args) {
    const firstArg = args[0];
    if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
      return {
        nodes: firstArg,
        source: args[1],
        positions: args[2],
        path: args[3],
        originalError: args[4],
        extensions: args[5]
      };
    }
    return firstArg;
  }
  var GraphQLError = class _GraphQLError extends Error {
    /**
     * An array of `{ line, column }` locations within the source GraphQL document
     * which correspond to this error.
     *
     * Errors during validation often contain multiple locations, for example to
     * point out two things with the same name. Errors during execution include a
     * single location, the field which produced the error.
     *
     * Enumerable, and appears in the result of JSON.stringify().
     */
    /**
     * An array describing the JSON-path into the execution response which
     * corresponds to this error. Only included for errors during execution.
     *
     * Enumerable, and appears in the result of JSON.stringify().
     */
    /**
     * An array of GraphQL AST Nodes corresponding to this error.
     */
    /**
     * The source GraphQL document for the first location of this error.
     *
     * Note that if this Error represents more than one node, the source may not
     * represent nodes after the first node.
     */
    /**
     * An array of character offsets within the source GraphQL document
     * which correspond to this error.
     */
    /**
     * The original error thrown from a field resolver during execution.
     */
    /**
     * Extension fields to add to the formatted error.
     */
    /**
     * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
     */
    constructor(message, ...rawArgs) {
      var _this$nodes, _nodeLocations$, _ref;
      const { nodes, source, positions, path: path2, originalError, extensions } = toNormalizedOptions(rawArgs);
      super(message);
      this.name = "GraphQLError";
      this.path = path2 !== null && path2 !== void 0 ? path2 : void 0;
      this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
      this.nodes = undefinedIfEmpty(
        Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
      );
      const nodeLocations = undefinedIfEmpty(
        (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
      );
      this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
      this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
      this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
      const originalExtensions = isObjectLike(
        originalError === null || originalError === void 0 ? void 0 : originalError.extensions
      ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
      this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
      Object.defineProperties(this, {
        message: {
          writable: true,
          enumerable: true
        },
        name: {
          enumerable: false
        },
        nodes: {
          enumerable: false
        },
        source: {
          enumerable: false
        },
        positions: {
          enumerable: false
        },
        originalError: {
          enumerable: false
        }
      });
      if (originalError !== null && originalError !== void 0 && originalError.stack) {
        Object.defineProperty(this, "stack", {
          value: originalError.stack,
          writable: true,
          configurable: true
        });
      } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, _GraphQLError);
      } else {
        Object.defineProperty(this, "stack", {
          value: Error().stack,
          writable: true,
          configurable: true
        });
      }
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
    toString() {
      let output = this.message;
      if (this.nodes) {
        for (const node of this.nodes) {
          if (node.loc) {
            output += "\n\n" + printLocation(node.loc);
          }
        }
      } else if (this.source && this.locations) {
        for (const location of this.locations) {
          output += "\n\n" + printSourceLocation(this.source, location);
        }
      }
      return output;
    }
    toJSON() {
      const formattedError = {
        message: this.message
      };
      if (this.locations != null) {
        formattedError.locations = this.locations;
      }
      if (this.path != null) {
        formattedError.path = this.path;
      }
      if (this.extensions != null && Object.keys(this.extensions).length > 0) {
        formattedError.extensions = this.extensions;
      }
      return formattedError;
    }
  };
  function undefinedIfEmpty(array) {
    return array === void 0 || array.length === 0 ? void 0 : array;
  }

  // node_modules/graphql/error/syntaxError.mjs
  function syntaxError(source, position, description) {
    return new GraphQLError(`Syntax Error: ${description}`, {
      source,
      positions: [position]
    });
  }

  // node_modules/graphql/language/ast.mjs
  var Location = class {
    /**
     * The character offset at which this Node begins.
     */
    /**
     * The character offset at which this Node ends.
     */
    /**
     * The Token at which this Node begins.
     */
    /**
     * The Token at which this Node ends.
     */
    /**
     * The Source document the AST represents.
     */
    constructor(startToken, endToken, source) {
      this.start = startToken.start;
      this.end = endToken.end;
      this.startToken = startToken;
      this.endToken = endToken;
      this.source = source;
    }
    get [Symbol.toStringTag]() {
      return "Location";
    }
    toJSON() {
      return {
        start: this.start,
        end: this.end
      };
    }
  };
  var Token = class {
    /**
     * The kind of Token.
     */
    /**
     * The character offset at which this Node begins.
     */
    /**
     * The character offset at which this Node ends.
     */
    /**
     * The 1-indexed line number on which this Token appears.
     */
    /**
     * The 1-indexed column number at which this Token begins.
     */
    /**
     * For non-punctuation tokens, represents the interpreted value of the token.
     *
     * Note: is undefined for punctuation tokens, but typed as string for
     * convenience in the parser.
     */
    /**
     * Tokens exist as nodes in a double-linked-list amongst all tokens
     * including ignored tokens. <SOF> is always the first node and <EOF>
     * the last.
     */
    constructor(kind, start3, end, line, column, value) {
      this.kind = kind;
      this.start = start3;
      this.end = end;
      this.line = line;
      this.column = column;
      this.value = value;
      this.prev = null;
      this.next = null;
    }
    get [Symbol.toStringTag]() {
      return "Token";
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column
      };
    }
  };
  var QueryDocumentKeys = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "description",
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: [
      "description",
      "variable",
      "type",
      "defaultValue",
      "directives"
    ],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "description",
      "name",
      // Note: fragment variable definitions are deprecated and will removed in v17.0.0
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
    TypeCoordinate: ["name"],
    MemberCoordinate: ["name", "memberName"],
    ArgumentCoordinate: ["name", "fieldName", "argumentName"],
    DirectiveCoordinate: ["name"],
    DirectiveArgumentCoordinate: ["name", "argumentName"]
  };
  var kindValues = new Set(Object.keys(QueryDocumentKeys));
  function isNode(maybeNode) {
    const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
    return typeof maybeKind === "string" && kindValues.has(maybeKind);
  }
  var OperationTypeNode;
  (function(OperationTypeNode2) {
    OperationTypeNode2["QUERY"] = "query";
    OperationTypeNode2["MUTATION"] = "mutation";
    OperationTypeNode2["SUBSCRIPTION"] = "subscription";
  })(OperationTypeNode || (OperationTypeNode = {}));

  // node_modules/graphql/language/directiveLocation.mjs
  var DirectiveLocation;
  (function(DirectiveLocation2) {
    DirectiveLocation2["QUERY"] = "QUERY";
    DirectiveLocation2["MUTATION"] = "MUTATION";
    DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
    DirectiveLocation2["FIELD"] = "FIELD";
    DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
    DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
    DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
    DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
    DirectiveLocation2["SCHEMA"] = "SCHEMA";
    DirectiveLocation2["SCALAR"] = "SCALAR";
    DirectiveLocation2["OBJECT"] = "OBJECT";
    DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
    DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
    DirectiveLocation2["INTERFACE"] = "INTERFACE";
    DirectiveLocation2["UNION"] = "UNION";
    DirectiveLocation2["ENUM"] = "ENUM";
    DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
    DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
    DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
  })(DirectiveLocation || (DirectiveLocation = {}));

  // node_modules/graphql/language/kinds.mjs
  var Kind;
  (function(Kind2) {
    Kind2["NAME"] = "Name";
    Kind2["DOCUMENT"] = "Document";
    Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
    Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
    Kind2["SELECTION_SET"] = "SelectionSet";
    Kind2["FIELD"] = "Field";
    Kind2["ARGUMENT"] = "Argument";
    Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
    Kind2["INLINE_FRAGMENT"] = "InlineFragment";
    Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
    Kind2["VARIABLE"] = "Variable";
    Kind2["INT"] = "IntValue";
    Kind2["FLOAT"] = "FloatValue";
    Kind2["STRING"] = "StringValue";
    Kind2["BOOLEAN"] = "BooleanValue";
    Kind2["NULL"] = "NullValue";
    Kind2["ENUM"] = "EnumValue";
    Kind2["LIST"] = "ListValue";
    Kind2["OBJECT"] = "ObjectValue";
    Kind2["OBJECT_FIELD"] = "ObjectField";
    Kind2["DIRECTIVE"] = "Directive";
    Kind2["NAMED_TYPE"] = "NamedType";
    Kind2["LIST_TYPE"] = "ListType";
    Kind2["NON_NULL_TYPE"] = "NonNullType";
    Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
    Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
    Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
    Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
    Kind2["FIELD_DEFINITION"] = "FieldDefinition";
    Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
    Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
    Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
    Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
    Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
    Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
    Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
    Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
    Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
    Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
    Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
    Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
    Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
    Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    Kind2["TYPE_COORDINATE"] = "TypeCoordinate";
    Kind2["MEMBER_COORDINATE"] = "MemberCoordinate";
    Kind2["ARGUMENT_COORDINATE"] = "ArgumentCoordinate";
    Kind2["DIRECTIVE_COORDINATE"] = "DirectiveCoordinate";
    Kind2["DIRECTIVE_ARGUMENT_COORDINATE"] = "DirectiveArgumentCoordinate";
  })(Kind || (Kind = {}));

  // node_modules/graphql/language/characterClasses.mjs
  function isWhiteSpace(code) {
    return code === 9 || code === 32;
  }
  function isDigit(code) {
    return code >= 48 && code <= 57;
  }
  function isLetter(code) {
    return code >= 97 && code <= 122 || // A-Z
    code >= 65 && code <= 90;
  }
  function isNameStart(code) {
    return isLetter(code) || code === 95;
  }
  function isNameContinue(code) {
    return isLetter(code) || isDigit(code) || code === 95;
  }

  // node_modules/graphql/language/blockString.mjs
  function dedentBlockStringLines(lines) {
    var _firstNonEmptyLine2;
    let commonIndent = Number.MAX_SAFE_INTEGER;
    let firstNonEmptyLine = null;
    let lastNonEmptyLine = -1;
    for (let i = 0; i < lines.length; ++i) {
      var _firstNonEmptyLine;
      const line = lines[i];
      const indent2 = leadingWhitespace(line);
      if (indent2 === line.length) {
        continue;
      }
      firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
      lastNonEmptyLine = i;
      if (i !== 0 && indent2 < commonIndent) {
        commonIndent = indent2;
      }
    }
    return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
      lastNonEmptyLine + 1
    );
  }
  function leadingWhitespace(str) {
    let i = 0;
    while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
      ++i;
    }
    return i;
  }
  function printBlockString(value, options) {
    const escapedValue = value.replace(/"""/g, '\\"""');
    const lines = escapedValue.split(/\r\n|[\n\r]/g);
    const isSingleLine = lines.length === 1;
    const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
    const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
    const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
    const hasTrailingSlash = value.endsWith("\\");
    const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
    const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
    let result = "";
    const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
    if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
      result += "\n";
    }
    result += escapedValue;
    if (printAsMultipleLines || forceTrailingNewline) {
      result += "\n";
    }
    return '"""' + result + '"""';
  }

  // node_modules/graphql/language/tokenKind.mjs
  var TokenKind;
  (function(TokenKind2) {
    TokenKind2["SOF"] = "<SOF>";
    TokenKind2["EOF"] = "<EOF>";
    TokenKind2["BANG"] = "!";
    TokenKind2["DOLLAR"] = "$";
    TokenKind2["AMP"] = "&";
    TokenKind2["PAREN_L"] = "(";
    TokenKind2["PAREN_R"] = ")";
    TokenKind2["DOT"] = ".";
    TokenKind2["SPREAD"] = "...";
    TokenKind2["COLON"] = ":";
    TokenKind2["EQUALS"] = "=";
    TokenKind2["AT"] = "@";
    TokenKind2["BRACKET_L"] = "[";
    TokenKind2["BRACKET_R"] = "]";
    TokenKind2["BRACE_L"] = "{";
    TokenKind2["PIPE"] = "|";
    TokenKind2["BRACE_R"] = "}";
    TokenKind2["NAME"] = "Name";
    TokenKind2["INT"] = "Int";
    TokenKind2["FLOAT"] = "Float";
    TokenKind2["STRING"] = "String";
    TokenKind2["BLOCK_STRING"] = "BlockString";
    TokenKind2["COMMENT"] = "Comment";
  })(TokenKind || (TokenKind = {}));

  // node_modules/graphql/language/lexer.mjs
  var Lexer = class {
    /**
     * The previously focused non-ignored token.
     */
    /**
     * The currently focused non-ignored token.
     */
    /**
     * The (1-indexed) line containing the current token.
     */
    /**
     * The character offset at which the current line begins.
     */
    constructor(source) {
      const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
      this.source = source;
      this.lastToken = startOfFileToken;
      this.token = startOfFileToken;
      this.line = 1;
      this.lineStart = 0;
    }
    get [Symbol.toStringTag]() {
      return "Lexer";
    }
    /**
     * Advances the token stream to the next non-ignored token.
     */
    advance() {
      this.lastToken = this.token;
      const token = this.token = this.lookahead();
      return token;
    }
    /**
     * Looks ahead and returns the next non-ignored token, but does not change
     * the state of Lexer.
     */
    lookahead() {
      let token = this.token;
      if (token.kind !== TokenKind.EOF) {
        do {
          if (token.next) {
            token = token.next;
          } else {
            const nextToken = readNextToken(this, token.end);
            token.next = nextToken;
            nextToken.prev = token;
            token = nextToken;
          }
        } while (token.kind === TokenKind.COMMENT);
      }
      return token;
    }
  };
  function isPunctuatorTokenKind(kind) {
    return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.DOT || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
  }
  function isUnicodeScalarValue(code) {
    return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
  }
  function isSupplementaryCodePoint(body, location) {
    return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
  }
  function isLeadingSurrogate(code) {
    return code >= 55296 && code <= 56319;
  }
  function isTrailingSurrogate(code) {
    return code >= 56320 && code <= 57343;
  }
  function printCodePointAt(lexer, location) {
    const code = lexer.source.body.codePointAt(location);
    if (code === void 0) {
      return TokenKind.EOF;
    } else if (code >= 32 && code <= 126) {
      const char = String.fromCodePoint(code);
      return char === '"' ? `'"'` : `"${char}"`;
    }
    return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
  }
  function createToken(lexer, kind, start3, end, value) {
    const line = lexer.line;
    const col = 1 + start3 - lexer.lineStart;
    return new Token(kind, start3, end, line, col, value);
  }
  function readNextToken(lexer, start3) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start3;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      switch (code) {
        // Ignored ::
        //   - UnicodeBOM
        //   - WhiteSpace
        //   - LineTerminator
        //   - Comment
        //   - Comma
        //
        // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
        //
        // WhiteSpace ::
        //   - "Horizontal Tab (U+0009)"
        //   - "Space (U+0020)"
        //
        // Comma :: ,
        case 65279:
        // <BOM>
        case 9:
        // \t
        case 32:
        // <space>
        case 44:
          ++position;
          continue;
        // LineTerminator ::
        //   - "New Line (U+000A)"
        //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
        //   - "Carriage Return (U+000D)" "New Line (U+000A)"
        case 10:
          ++position;
          ++lexer.line;
          lexer.lineStart = position;
          continue;
        case 13:
          if (body.charCodeAt(position + 1) === 10) {
            position += 2;
          } else {
            ++position;
          }
          ++lexer.line;
          lexer.lineStart = position;
          continue;
        // Comment
        case 35:
          return readComment(lexer, position);
        // Token ::
        //   - Punctuator
        //   - Name
        //   - IntValue
        //   - FloatValue
        //   - StringValue
        //
        // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
        case 33:
          return createToken(lexer, TokenKind.BANG, position, position + 1);
        case 36:
          return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
        case 38:
          return createToken(lexer, TokenKind.AMP, position, position + 1);
        case 40:
          return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
        case 41:
          return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
        case 46:
          if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
            return createToken(lexer, TokenKind.SPREAD, position, position + 3);
          }
          break;
        case 58:
          return createToken(lexer, TokenKind.COLON, position, position + 1);
        case 61:
          return createToken(lexer, TokenKind.EQUALS, position, position + 1);
        case 64:
          return createToken(lexer, TokenKind.AT, position, position + 1);
        case 91:
          return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
        case 93:
          return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
        case 123:
          return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
        case 124:
          return createToken(lexer, TokenKind.PIPE, position, position + 1);
        case 125:
          return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
        // StringValue
        case 34:
          if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
            return readBlockString(lexer, position);
          }
          return readString(lexer, position);
      }
      if (isDigit(code) || code === 45) {
        return readNumber(lexer, position, code);
      }
      if (isNameStart(code)) {
        return readName(lexer, position);
      }
      throw syntaxError(
        lexer.source,
        position,
        code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
      );
    }
    return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
  }
  function readComment(lexer, start3) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start3 + 1;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 10 || code === 13) {
        break;
      }
      if (isUnicodeScalarValue(code)) {
        ++position;
      } else if (isSupplementaryCodePoint(body, position)) {
        position += 2;
      } else {
        break;
      }
    }
    return createToken(
      lexer,
      TokenKind.COMMENT,
      start3,
      position,
      body.slice(start3 + 1, position)
    );
  }
  function readNumber(lexer, start3, firstCode) {
    const body = lexer.source.body;
    let position = start3;
    let code = firstCode;
    let isFloat = false;
    if (code === 45) {
      code = body.charCodeAt(++position);
    }
    if (code === 48) {
      code = body.charCodeAt(++position);
      if (isDigit(code)) {
        throw syntaxError(
          lexer.source,
          position,
          `Invalid number, unexpected digit after 0: ${printCodePointAt(
            lexer,
            position
          )}.`
        );
      }
    } else {
      position = readDigits(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 46) {
      isFloat = true;
      code = body.charCodeAt(++position);
      position = readDigits(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 69 || code === 101) {
      isFloat = true;
      code = body.charCodeAt(++position);
      if (code === 43 || code === 45) {
        code = body.charCodeAt(++position);
      }
      position = readDigits(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 46 || isNameStart(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, expected digit but got: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
    return createToken(
      lexer,
      isFloat ? TokenKind.FLOAT : TokenKind.INT,
      start3,
      position,
      body.slice(start3, position)
    );
  }
  function readDigits(lexer, start3, firstCode) {
    if (!isDigit(firstCode)) {
      throw syntaxError(
        lexer.source,
        start3,
        `Invalid number, expected digit but got: ${printCodePointAt(
          lexer,
          start3
        )}.`
      );
    }
    const body = lexer.source.body;
    let position = start3 + 1;
    while (isDigit(body.charCodeAt(position))) {
      ++position;
    }
    return position;
  }
  function readString(lexer, start3) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start3 + 1;
    let chunkStart = position;
    let value = "";
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 34) {
        value += body.slice(chunkStart, position);
        return createToken(lexer, TokenKind.STRING, start3, position + 1, value);
      }
      if (code === 92) {
        value += body.slice(chunkStart, position);
        const escape2 = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
        value += escape2.value;
        position += escape2.size;
        chunkStart = position;
        continue;
      }
      if (code === 10 || code === 13) {
        break;
      }
      if (isUnicodeScalarValue(code)) {
        ++position;
      } else if (isSupplementaryCodePoint(body, position)) {
        position += 2;
      } else {
        throw syntaxError(
          lexer.source,
          position,
          `Invalid character within String: ${printCodePointAt(
            lexer,
            position
          )}.`
        );
      }
    }
    throw syntaxError(lexer.source, position, "Unterminated string.");
  }
  function readEscapedUnicodeVariableWidth(lexer, position) {
    const body = lexer.source.body;
    let point = 0;
    let size = 3;
    while (size < 12) {
      const code = body.charCodeAt(position + size++);
      if (code === 125) {
        if (size < 5 || !isUnicodeScalarValue(point)) {
          break;
        }
        return {
          value: String.fromCodePoint(point),
          size
        };
      }
      point = point << 4 | readHexDigit(code);
      if (point < 0) {
        break;
      }
    }
    throw syntaxError(
      lexer.source,
      position,
      `Invalid Unicode escape sequence: "${body.slice(
        position,
        position + size
      )}".`
    );
  }
  function readEscapedUnicodeFixedWidth(lexer, position) {
    const body = lexer.source.body;
    const code = read16BitHexCode(body, position + 2);
    if (isUnicodeScalarValue(code)) {
      return {
        value: String.fromCodePoint(code),
        size: 6
      };
    }
    if (isLeadingSurrogate(code)) {
      if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
        const trailingCode = read16BitHexCode(body, position + 8);
        if (isTrailingSurrogate(trailingCode)) {
          return {
            value: String.fromCodePoint(code, trailingCode),
            size: 12
          };
        }
      }
    }
    throw syntaxError(
      lexer.source,
      position,
      `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
    );
  }
  function read16BitHexCode(body, position) {
    return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
  }
  function readHexDigit(code) {
    return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
  }
  function readEscapedCharacter(lexer, position) {
    const body = lexer.source.body;
    const code = body.charCodeAt(position + 1);
    switch (code) {
      case 34:
        return {
          value: '"',
          size: 2
        };
      case 92:
        return {
          value: "\\",
          size: 2
        };
      case 47:
        return {
          value: "/",
          size: 2
        };
      case 98:
        return {
          value: "\b",
          size: 2
        };
      case 102:
        return {
          value: "\f",
          size: 2
        };
      case 110:
        return {
          value: "\n",
          size: 2
        };
      case 114:
        return {
          value: "\r",
          size: 2
        };
      case 116:
        return {
          value: "	",
          size: 2
        };
    }
    throw syntaxError(
      lexer.source,
      position,
      `Invalid character escape sequence: "${body.slice(
        position,
        position + 2
      )}".`
    );
  }
  function readBlockString(lexer, start3) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let lineStart = lexer.lineStart;
    let position = start3 + 3;
    let chunkStart = position;
    let currentLine = "";
    const blockLines = [];
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
        currentLine += body.slice(chunkStart, position);
        blockLines.push(currentLine);
        const token = createToken(
          lexer,
          TokenKind.BLOCK_STRING,
          start3,
          position + 3,
          // Return a string of the lines joined with U+000A.
          dedentBlockStringLines(blockLines).join("\n")
        );
        lexer.line += blockLines.length - 1;
        lexer.lineStart = lineStart;
        return token;
      }
      if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
        currentLine += body.slice(chunkStart, position);
        chunkStart = position + 1;
        position += 4;
        continue;
      }
      if (code === 10 || code === 13) {
        currentLine += body.slice(chunkStart, position);
        blockLines.push(currentLine);
        if (code === 13 && body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        currentLine = "";
        chunkStart = position;
        lineStart = position;
        continue;
      }
      if (isUnicodeScalarValue(code)) {
        ++position;
      } else if (isSupplementaryCodePoint(body, position)) {
        position += 2;
      } else {
        throw syntaxError(
          lexer.source,
          position,
          `Invalid character within String: ${printCodePointAt(
            lexer,
            position
          )}.`
        );
      }
    }
    throw syntaxError(lexer.source, position, "Unterminated string.");
  }
  function readName(lexer, start3) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start3 + 1;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (isNameContinue(code)) {
        ++position;
      } else {
        break;
      }
    }
    return createToken(
      lexer,
      TokenKind.NAME,
      start3,
      position,
      body.slice(start3, position)
    );
  }

  // node_modules/graphql/jsutils/inspect.mjs
  var MAX_ARRAY_LENGTH = 10;
  var MAX_RECURSIVE_DEPTH = 2;
  function inspect(value) {
    return formatValue(value, []);
  }
  function formatValue(value, seenValues) {
    switch (typeof value) {
      case "string":
        return JSON.stringify(value);
      case "function":
        return value.name ? `[function ${value.name}]` : "[function]";
      case "object":
        return formatObjectValue(value, seenValues);
      default:
        return String(value);
    }
  }
  function formatObjectValue(value, previouslySeenValues) {
    if (value === null) {
      return "null";
    }
    if (previouslySeenValues.includes(value)) {
      return "[Circular]";
    }
    const seenValues = [...previouslySeenValues, value];
    if (isJSONable(value)) {
      const jsonValue = value.toJSON();
      if (jsonValue !== value) {
        return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
      }
    } else if (Array.isArray(value)) {
      return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
  }
  function isJSONable(value) {
    return typeof value.toJSON === "function";
  }
  function formatObject(object, seenValues) {
    const entries = Object.entries(object);
    if (entries.length === 0) {
      return "{}";
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
      return "[" + getObjectTag(object) + "]";
    }
    const properties = entries.map(
      ([key, value]) => key + ": " + formatValue(value, seenValues)
    );
    return "{ " + properties.join(", ") + " }";
  }
  function formatArray(array, seenValues) {
    if (array.length === 0) {
      return "[]";
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
      return "[Array]";
    }
    const len = Math.min(MAX_ARRAY_LENGTH, array.length);
    const remaining = array.length - len;
    const items = [];
    for (let i = 0; i < len; ++i) {
      items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
      items.push("... 1 more item");
    } else if (remaining > 1) {
      items.push(`... ${remaining} more items`);
    }
    return "[" + items.join(", ") + "]";
  }
  function getObjectTag(object) {
    const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
    if (tag === "Object" && typeof object.constructor === "function") {
      const name = object.constructor.name;
      if (typeof name === "string" && name !== "") {
        return name;
      }
    }
    return tag;
  }

  // node_modules/graphql/jsutils/instanceOf.mjs
  var isProduction = globalThis.process && // eslint-disable-next-line no-undef
  false;
  var instanceOf = (
    /* c8 ignore next 6 */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317
    isProduction ? function instanceOf2(value, constructor) {
      return value instanceof constructor;
    } : function instanceOf3(value, constructor) {
      if (value instanceof constructor) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        var _value$constructor;
        const className = constructor.prototype[Symbol.toStringTag];
        const valueClassName = (
          // We still need to support constructor's name to detect conflicts with older versions of this library.
          Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
        );
        if (className === valueClassName) {
          const stringifiedValue = inspect(value);
          throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
      }
      return false;
    }
  );

  // node_modules/graphql/language/source.mjs
  var Source = class {
    constructor(body, name = "GraphQL request", locationOffset = {
      line: 1,
      column: 1
    }) {
      typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
      this.body = body;
      this.name = name;
      this.locationOffset = locationOffset;
      this.locationOffset.line > 0 || devAssert(
        false,
        "line in locationOffset is 1-indexed and must be positive."
      );
      this.locationOffset.column > 0 || devAssert(
        false,
        "column in locationOffset is 1-indexed and must be positive."
      );
    }
    get [Symbol.toStringTag]() {
      return "Source";
    }
  };
  function isSource(source) {
    return instanceOf(source, Source);
  }

  // node_modules/graphql/language/parser.mjs
  function parse(source, options) {
    const parser = new Parser(source, options);
    const document2 = parser.parseDocument();
    Object.defineProperty(document2, "tokenCount", {
      enumerable: false,
      value: parser.tokenCount
    });
    return document2;
  }
  var Parser = class {
    constructor(source, options = {}) {
      const { lexer, ..._options } = options;
      if (lexer) {
        this._lexer = lexer;
      } else {
        const sourceObj = isSource(source) ? source : new Source(source);
        this._lexer = new Lexer(sourceObj);
      }
      this._options = _options;
      this._tokenCounter = 0;
    }
    get tokenCount() {
      return this._tokenCounter;
    }
    /**
     * Converts a name lex token into a name parse node.
     */
    parseName() {
      const token = this.expectToken(TokenKind.NAME);
      return this.node(token, {
        kind: Kind.NAME,
        value: token.value
      });
    }
    // Implements the parsing rules in the Document section.
    /**
     * Document : Definition+
     */
    parseDocument() {
      return this.node(this._lexer.token, {
        kind: Kind.DOCUMENT,
        definitions: this.many(
          TokenKind.SOF,
          this.parseDefinition,
          TokenKind.EOF
        )
      });
    }
    /**
     * Definition :
     *   - ExecutableDefinition
     *   - TypeSystemDefinition
     *   - TypeSystemExtension
     *
     * ExecutableDefinition :
     *   - OperationDefinition
     *   - FragmentDefinition
     *
     * TypeSystemDefinition :
     *   - SchemaDefinition
     *   - TypeDefinition
     *   - DirectiveDefinition
     *
     * TypeDefinition :
     *   - ScalarTypeDefinition
     *   - ObjectTypeDefinition
     *   - InterfaceTypeDefinition
     *   - UnionTypeDefinition
     *   - EnumTypeDefinition
     *   - InputObjectTypeDefinition
     */
    parseDefinition() {
      if (this.peek(TokenKind.BRACE_L)) {
        return this.parseOperationDefinition();
      }
      const hasDescription = this.peekDescription();
      const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
      if (hasDescription && keywordToken.kind === TokenKind.BRACE_L) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are not supported on shorthand queries."
        );
      }
      if (keywordToken.kind === TokenKind.NAME) {
        switch (keywordToken.value) {
          case "schema":
            return this.parseSchemaDefinition();
          case "scalar":
            return this.parseScalarTypeDefinition();
          case "type":
            return this.parseObjectTypeDefinition();
          case "interface":
            return this.parseInterfaceTypeDefinition();
          case "union":
            return this.parseUnionTypeDefinition();
          case "enum":
            return this.parseEnumTypeDefinition();
          case "input":
            return this.parseInputObjectTypeDefinition();
          case "directive":
            return this.parseDirectiveDefinition();
        }
        switch (keywordToken.value) {
          case "query":
          case "mutation":
          case "subscription":
            return this.parseOperationDefinition();
          case "fragment":
            return this.parseFragmentDefinition();
        }
        if (hasDescription) {
          throw syntaxError(
            this._lexer.source,
            this._lexer.token.start,
            "Unexpected description, only GraphQL definitions support descriptions."
          );
        }
        switch (keywordToken.value) {
          case "extend":
            return this.parseTypeSystemExtension();
        }
      }
      throw this.unexpected(keywordToken);
    }
    // Implements the parsing rules in the Operations section.
    /**
     * OperationDefinition :
     *  - SelectionSet
     *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
     */
    parseOperationDefinition() {
      const start3 = this._lexer.token;
      if (this.peek(TokenKind.BRACE_L)) {
        return this.node(start3, {
          kind: Kind.OPERATION_DEFINITION,
          operation: OperationTypeNode.QUERY,
          description: void 0,
          name: void 0,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet()
        });
      }
      const description = this.parseDescription();
      const operation = this.parseOperationType();
      let name;
      if (this.peek(TokenKind.NAME)) {
        name = this.parseName();
      }
      return this.node(start3, {
        kind: Kind.OPERATION_DEFINITION,
        operation,
        description,
        name,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * OperationType : one of query mutation subscription
     */
    parseOperationType() {
      const operationToken = this.expectToken(TokenKind.NAME);
      switch (operationToken.value) {
        case "query":
          return OperationTypeNode.QUERY;
        case "mutation":
          return OperationTypeNode.MUTATION;
        case "subscription":
          return OperationTypeNode.SUBSCRIPTION;
      }
      throw this.unexpected(operationToken);
    }
    /**
     * VariableDefinitions : ( VariableDefinition+ )
     */
    parseVariableDefinitions() {
      return this.optionalMany(
        TokenKind.PAREN_L,
        this.parseVariableDefinition,
        TokenKind.PAREN_R
      );
    }
    /**
     * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
     */
    parseVariableDefinition() {
      return this.node(this._lexer.token, {
        kind: Kind.VARIABLE_DEFINITION,
        description: this.parseDescription(),
        variable: this.parseVariable(),
        type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
        directives: this.parseConstDirectives()
      });
    }
    /**
     * Variable : $ Name
     */
    parseVariable() {
      const start3 = this._lexer.token;
      this.expectToken(TokenKind.DOLLAR);
      return this.node(start3, {
        kind: Kind.VARIABLE,
        name: this.parseName()
      });
    }
    /**
     * ```
     * SelectionSet : { Selection+ }
     * ```
     */
    parseSelectionSet() {
      return this.node(this._lexer.token, {
        kind: Kind.SELECTION_SET,
        selections: this.many(
          TokenKind.BRACE_L,
          this.parseSelection,
          TokenKind.BRACE_R
        )
      });
    }
    /**
     * Selection :
     *   - Field
     *   - FragmentSpread
     *   - InlineFragment
     */
    parseSelection() {
      return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
    }
    /**
     * Field : Alias? Name Arguments? Directives? SelectionSet?
     *
     * Alias : Name :
     */
    parseField() {
      const start3 = this._lexer.token;
      const nameOrAlias = this.parseName();
      let alias;
      let name;
      if (this.expectOptionalToken(TokenKind.COLON)) {
        alias = nameOrAlias;
        name = this.parseName();
      } else {
        name = nameOrAlias;
      }
      return this.node(start3, {
        kind: Kind.FIELD,
        alias,
        name,
        arguments: this.parseArguments(false),
        directives: this.parseDirectives(false),
        selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
      });
    }
    /**
     * Arguments[Const] : ( Argument[?Const]+ )
     */
    parseArguments(isConst) {
      const item = isConst ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
    }
    /**
     * Argument[Const] : Name : Value[?Const]
     */
    parseArgument(isConst = false) {
      const start3 = this._lexer.token;
      const name = this.parseName();
      this.expectToken(TokenKind.COLON);
      return this.node(start3, {
        kind: Kind.ARGUMENT,
        name,
        value: this.parseValueLiteral(isConst)
      });
    }
    parseConstArgument() {
      return this.parseArgument(true);
    }
    // Implements the parsing rules in the Fragments section.
    /**
     * Corresponds to both FragmentSpread and InlineFragment in the spec.
     *
     * FragmentSpread : ... FragmentName Directives?
     *
     * InlineFragment : ... TypeCondition? Directives? SelectionSet
     */
    parseFragment() {
      const start3 = this._lexer.token;
      this.expectToken(TokenKind.SPREAD);
      const hasTypeCondition = this.expectOptionalKeyword("on");
      if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
        return this.node(start3, {
          kind: Kind.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(false)
        });
      }
      return this.node(start3, {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentDefinition :
     *   - fragment FragmentName on TypeCondition Directives? SelectionSet
     *
     * TypeCondition : NamedType
     */
    parseFragmentDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("fragment");
      if (this._options.allowLegacyFragmentVariables === true) {
        return this.node(start3, {
          kind: Kind.FRAGMENT_DEFINITION,
          description,
          name: this.parseFragmentName(),
          variableDefinitions: this.parseVariableDefinitions(),
          typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      return this.node(start3, {
        kind: Kind.FRAGMENT_DEFINITION,
        description,
        name: this.parseFragmentName(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentName : Name but not `on`
     */
    parseFragmentName() {
      if (this._lexer.token.value === "on") {
        throw this.unexpected();
      }
      return this.parseName();
    }
    // Implements the parsing rules in the Values section.
    /**
     * Value[Const] :
     *   - [~Const] Variable
     *   - IntValue
     *   - FloatValue
     *   - StringValue
     *   - BooleanValue
     *   - NullValue
     *   - EnumValue
     *   - ListValue[?Const]
     *   - ObjectValue[?Const]
     *
     * BooleanValue : one of `true` `false`
     *
     * NullValue : `null`
     *
     * EnumValue : Name but not `true`, `false` or `null`
     */
    parseValueLiteral(isConst) {
      const token = this._lexer.token;
      switch (token.kind) {
        case TokenKind.BRACKET_L:
          return this.parseList(isConst);
        case TokenKind.BRACE_L:
          return this.parseObject(isConst);
        case TokenKind.INT:
          this.advanceLexer();
          return this.node(token, {
            kind: Kind.INT,
            value: token.value
          });
        case TokenKind.FLOAT:
          this.advanceLexer();
          return this.node(token, {
            kind: Kind.FLOAT,
            value: token.value
          });
        case TokenKind.STRING:
        case TokenKind.BLOCK_STRING:
          return this.parseStringLiteral();
        case TokenKind.NAME:
          this.advanceLexer();
          switch (token.value) {
            case "true":
              return this.node(token, {
                kind: Kind.BOOLEAN,
                value: true
              });
            case "false":
              return this.node(token, {
                kind: Kind.BOOLEAN,
                value: false
              });
            case "null":
              return this.node(token, {
                kind: Kind.NULL
              });
            default:
              return this.node(token, {
                kind: Kind.ENUM,
                value: token.value
              });
          }
        case TokenKind.DOLLAR:
          if (isConst) {
            this.expectToken(TokenKind.DOLLAR);
            if (this._lexer.token.kind === TokenKind.NAME) {
              const varName = this._lexer.token.value;
              throw syntaxError(
                this._lexer.source,
                token.start,
                `Unexpected variable "$${varName}" in constant value.`
              );
            } else {
              throw this.unexpected(token);
            }
          }
          return this.parseVariable();
        default:
          throw this.unexpected();
      }
    }
    parseConstValueLiteral() {
      return this.parseValueLiteral(true);
    }
    parseStringLiteral() {
      const token = this._lexer.token;
      this.advanceLexer();
      return this.node(token, {
        kind: Kind.STRING,
        value: token.value,
        block: token.kind === TokenKind.BLOCK_STRING
      });
    }
    /**
     * ListValue[Const] :
     *   - [ ]
     *   - [ Value[?Const]+ ]
     */
    parseList(isConst) {
      const item = () => this.parseValueLiteral(isConst);
      return this.node(this._lexer.token, {
        kind: Kind.LIST,
        values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
      });
    }
    /**
     * ```
     * ObjectValue[Const] :
     *   - { }
     *   - { ObjectField[?Const]+ }
     * ```
     */
    parseObject(isConst) {
      const item = () => this.parseObjectField(isConst);
      return this.node(this._lexer.token, {
        kind: Kind.OBJECT,
        fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
      });
    }
    /**
     * ObjectField[Const] : Name : Value[?Const]
     */
    parseObjectField(isConst) {
      const start3 = this._lexer.token;
      const name = this.parseName();
      this.expectToken(TokenKind.COLON);
      return this.node(start3, {
        kind: Kind.OBJECT_FIELD,
        name,
        value: this.parseValueLiteral(isConst)
      });
    }
    // Implements the parsing rules in the Directives section.
    /**
     * Directives[Const] : Directive[?Const]+
     */
    parseDirectives(isConst) {
      const directives = [];
      while (this.peek(TokenKind.AT)) {
        directives.push(this.parseDirective(isConst));
      }
      return directives;
    }
    parseConstDirectives() {
      return this.parseDirectives(true);
    }
    /**
     * ```
     * Directive[Const] : @ Name Arguments[?Const]?
     * ```
     */
    parseDirective(isConst) {
      const start3 = this._lexer.token;
      this.expectToken(TokenKind.AT);
      return this.node(start3, {
        kind: Kind.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(isConst)
      });
    }
    // Implements the parsing rules in the Types section.
    /**
     * Type :
     *   - NamedType
     *   - ListType
     *   - NonNullType
     */
    parseTypeReference() {
      const start3 = this._lexer.token;
      let type;
      if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
        const innerType = this.parseTypeReference();
        this.expectToken(TokenKind.BRACKET_R);
        type = this.node(start3, {
          kind: Kind.LIST_TYPE,
          type: innerType
        });
      } else {
        type = this.parseNamedType();
      }
      if (this.expectOptionalToken(TokenKind.BANG)) {
        return this.node(start3, {
          kind: Kind.NON_NULL_TYPE,
          type
        });
      }
      return type;
    }
    /**
     * NamedType : Name
     */
    parseNamedType() {
      return this.node(this._lexer.token, {
        kind: Kind.NAMED_TYPE,
        name: this.parseName()
      });
    }
    // Implements the parsing rules in the Type Definition section.
    peekDescription() {
      return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
    }
    /**
     * Description : StringValue
     */
    parseDescription() {
      if (this.peekDescription()) {
        return this.parseStringLiteral();
      }
    }
    /**
     * ```
     * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
     * ```
     */
    parseSchemaDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("schema");
      const directives = this.parseConstDirectives();
      const operationTypes = this.many(
        TokenKind.BRACE_L,
        this.parseOperationTypeDefinition,
        TokenKind.BRACE_R
      );
      return this.node(start3, {
        kind: Kind.SCHEMA_DEFINITION,
        description,
        directives,
        operationTypes
      });
    }
    /**
     * OperationTypeDefinition : OperationType : NamedType
     */
    parseOperationTypeDefinition() {
      const start3 = this._lexer.token;
      const operation = this.parseOperationType();
      this.expectToken(TokenKind.COLON);
      const type = this.parseNamedType();
      return this.node(start3, {
        kind: Kind.OPERATION_TYPE_DEFINITION,
        operation,
        type
      });
    }
    /**
     * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
     */
    parseScalarTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("scalar");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      return this.node(start3, {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        description,
        name,
        directives
      });
    }
    /**
     * ObjectTypeDefinition :
     *   Description?
     *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
     */
    parseObjectTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("type");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      return this.node(start3, {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        description,
        name,
        interfaces,
        directives,
        fields
      });
    }
    /**
     * ImplementsInterfaces :
     *   - implements `&`? NamedType
     *   - ImplementsInterfaces & NamedType
     */
    parseImplementsInterfaces() {
      return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
    }
    /**
     * ```
     * FieldsDefinition : { FieldDefinition+ }
     * ```
     */
    parseFieldsDefinition() {
      return this.optionalMany(
        TokenKind.BRACE_L,
        this.parseFieldDefinition,
        TokenKind.BRACE_R
      );
    }
    /**
     * FieldDefinition :
     *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
     */
    parseFieldDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseName();
      const args = this.parseArgumentDefs();
      this.expectToken(TokenKind.COLON);
      const type = this.parseTypeReference();
      const directives = this.parseConstDirectives();
      return this.node(start3, {
        kind: Kind.FIELD_DEFINITION,
        description,
        name,
        arguments: args,
        type,
        directives
      });
    }
    /**
     * ArgumentsDefinition : ( InputValueDefinition+ )
     */
    parseArgumentDefs() {
      return this.optionalMany(
        TokenKind.PAREN_L,
        this.parseInputValueDef,
        TokenKind.PAREN_R
      );
    }
    /**
     * InputValueDefinition :
     *   - Description? Name : Type DefaultValue? Directives[Const]?
     */
    parseInputValueDef() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseName();
      this.expectToken(TokenKind.COLON);
      const type = this.parseTypeReference();
      let defaultValue;
      if (this.expectOptionalToken(TokenKind.EQUALS)) {
        defaultValue = this.parseConstValueLiteral();
      }
      const directives = this.parseConstDirectives();
      return this.node(start3, {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description,
        name,
        type,
        defaultValue,
        directives
      });
    }
    /**
     * InterfaceTypeDefinition :
     *   - Description? interface Name Directives[Const]? FieldsDefinition?
     */
    parseInterfaceTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("interface");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      return this.node(start3, {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        description,
        name,
        interfaces,
        directives,
        fields
      });
    }
    /**
     * UnionTypeDefinition :
     *   - Description? union Name Directives[Const]? UnionMemberTypes?
     */
    parseUnionTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("union");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const types = this.parseUnionMemberTypes();
      return this.node(start3, {
        kind: Kind.UNION_TYPE_DEFINITION,
        description,
        name,
        directives,
        types
      });
    }
    /**
     * UnionMemberTypes :
     *   - = `|`? NamedType
     *   - UnionMemberTypes | NamedType
     */
    parseUnionMemberTypes() {
      return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
    }
    /**
     * EnumTypeDefinition :
     *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
     */
    parseEnumTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("enum");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const values = this.parseEnumValuesDefinition();
      return this.node(start3, {
        kind: Kind.ENUM_TYPE_DEFINITION,
        description,
        name,
        directives,
        values
      });
    }
    /**
     * ```
     * EnumValuesDefinition : { EnumValueDefinition+ }
     * ```
     */
    parseEnumValuesDefinition() {
      return this.optionalMany(
        TokenKind.BRACE_L,
        this.parseEnumValueDefinition,
        TokenKind.BRACE_R
      );
    }
    /**
     * EnumValueDefinition : Description? EnumValue Directives[Const]?
     */
    parseEnumValueDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseEnumValueName();
      const directives = this.parseConstDirectives();
      return this.node(start3, {
        kind: Kind.ENUM_VALUE_DEFINITION,
        description,
        name,
        directives
      });
    }
    /**
     * EnumValue : Name but not `true`, `false` or `null`
     */
    parseEnumValueName() {
      if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          `${getTokenDesc(
            this._lexer.token
          )} is reserved and cannot be used for an enum value.`
        );
      }
      return this.parseName();
    }
    /**
     * InputObjectTypeDefinition :
     *   - Description? input Name Directives[Const]? InputFieldsDefinition?
     */
    parseInputObjectTypeDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("input");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const fields = this.parseInputFieldsDefinition();
      return this.node(start3, {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description,
        name,
        directives,
        fields
      });
    }
    /**
     * ```
     * InputFieldsDefinition : { InputValueDefinition+ }
     * ```
     */
    parseInputFieldsDefinition() {
      return this.optionalMany(
        TokenKind.BRACE_L,
        this.parseInputValueDef,
        TokenKind.BRACE_R
      );
    }
    /**
     * TypeSystemExtension :
     *   - SchemaExtension
     *   - TypeExtension
     *
     * TypeExtension :
     *   - ScalarTypeExtension
     *   - ObjectTypeExtension
     *   - InterfaceTypeExtension
     *   - UnionTypeExtension
     *   - EnumTypeExtension
     *   - InputObjectTypeDefinition
     */
    parseTypeSystemExtension() {
      const keywordToken = this._lexer.lookahead();
      if (keywordToken.kind === TokenKind.NAME) {
        switch (keywordToken.value) {
          case "schema":
            return this.parseSchemaExtension();
          case "scalar":
            return this.parseScalarTypeExtension();
          case "type":
            return this.parseObjectTypeExtension();
          case "interface":
            return this.parseInterfaceTypeExtension();
          case "union":
            return this.parseUnionTypeExtension();
          case "enum":
            return this.parseEnumTypeExtension();
          case "input":
            return this.parseInputObjectTypeExtension();
        }
      }
      throw this.unexpected(keywordToken);
    }
    /**
     * ```
     * SchemaExtension :
     *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
     *  - extend schema Directives[Const]
     * ```
     */
    parseSchemaExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("schema");
      const directives = this.parseConstDirectives();
      const operationTypes = this.optionalMany(
        TokenKind.BRACE_L,
        this.parseOperationTypeDefinition,
        TokenKind.BRACE_R
      );
      if (directives.length === 0 && operationTypes.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.SCHEMA_EXTENSION,
        directives,
        operationTypes
      });
    }
    /**
     * ScalarTypeExtension :
     *   - extend scalar Name Directives[Const]
     */
    parseScalarTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("scalar");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      if (directives.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.SCALAR_TYPE_EXTENSION,
        name,
        directives
      });
    }
    /**
     * ObjectTypeExtension :
     *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend type Name ImplementsInterfaces? Directives[Const]
     *  - extend type Name ImplementsInterfaces
     */
    parseObjectTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("type");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.OBJECT_TYPE_EXTENSION,
        name,
        interfaces,
        directives,
        fields
      });
    }
    /**
     * InterfaceTypeExtension :
     *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend interface Name ImplementsInterfaces? Directives[Const]
     *  - extend interface Name ImplementsInterfaces
     */
    parseInterfaceTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("interface");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.INTERFACE_TYPE_EXTENSION,
        name,
        interfaces,
        directives,
        fields
      });
    }
    /**
     * UnionTypeExtension :
     *   - extend union Name Directives[Const]? UnionMemberTypes
     *   - extend union Name Directives[Const]
     */
    parseUnionTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("union");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const types = this.parseUnionMemberTypes();
      if (directives.length === 0 && types.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.UNION_TYPE_EXTENSION,
        name,
        directives,
        types
      });
    }
    /**
     * EnumTypeExtension :
     *   - extend enum Name Directives[Const]? EnumValuesDefinition
     *   - extend enum Name Directives[Const]
     */
    parseEnumTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("enum");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const values = this.parseEnumValuesDefinition();
      if (directives.length === 0 && values.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.ENUM_TYPE_EXTENSION,
        name,
        directives,
        values
      });
    }
    /**
     * InputObjectTypeExtension :
     *   - extend input Name Directives[Const]? InputFieldsDefinition
     *   - extend input Name Directives[Const]
     */
    parseInputObjectTypeExtension() {
      const start3 = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("input");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const fields = this.parseInputFieldsDefinition();
      if (directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start3, {
        kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name,
        directives,
        fields
      });
    }
    /**
     * ```
     * DirectiveDefinition :
     *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
     * ```
     */
    parseDirectiveDefinition() {
      const start3 = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("directive");
      this.expectToken(TokenKind.AT);
      const name = this.parseName();
      const args = this.parseArgumentDefs();
      const repeatable = this.expectOptionalKeyword("repeatable");
      this.expectKeyword("on");
      const locations = this.parseDirectiveLocations();
      return this.node(start3, {
        kind: Kind.DIRECTIVE_DEFINITION,
        description,
        name,
        arguments: args,
        repeatable,
        locations
      });
    }
    /**
     * DirectiveLocations :
     *   - `|`? DirectiveLocation
     *   - DirectiveLocations | DirectiveLocation
     */
    parseDirectiveLocations() {
      return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
    }
    /*
     * DirectiveLocation :
     *   - ExecutableDirectiveLocation
     *   - TypeSystemDirectiveLocation
     *
     * ExecutableDirectiveLocation : one of
     *   `QUERY`
     *   `MUTATION`
     *   `SUBSCRIPTION`
     *   `FIELD`
     *   `FRAGMENT_DEFINITION`
     *   `FRAGMENT_SPREAD`
     *   `INLINE_FRAGMENT`
     *
     * TypeSystemDirectiveLocation : one of
     *   `SCHEMA`
     *   `SCALAR`
     *   `OBJECT`
     *   `FIELD_DEFINITION`
     *   `ARGUMENT_DEFINITION`
     *   `INTERFACE`
     *   `UNION`
     *   `ENUM`
     *   `ENUM_VALUE`
     *   `INPUT_OBJECT`
     *   `INPUT_FIELD_DEFINITION`
     */
    parseDirectiveLocation() {
      const start3 = this._lexer.token;
      const name = this.parseName();
      if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
        return name;
      }
      throw this.unexpected(start3);
    }
    // Schema Coordinates
    /**
     * SchemaCoordinate :
     *   - Name
     *   - Name . Name
     *   - Name . Name ( Name : )
     *   - \@ Name
     *   - \@ Name ( Name : )
     */
    parseSchemaCoordinate() {
      const start3 = this._lexer.token;
      const ofDirective = this.expectOptionalToken(TokenKind.AT);
      const name = this.parseName();
      let memberName;
      if (!ofDirective && this.expectOptionalToken(TokenKind.DOT)) {
        memberName = this.parseName();
      }
      let argumentName;
      if ((ofDirective || memberName) && this.expectOptionalToken(TokenKind.PAREN_L)) {
        argumentName = this.parseName();
        this.expectToken(TokenKind.COLON);
        this.expectToken(TokenKind.PAREN_R);
      }
      if (ofDirective) {
        if (argumentName) {
          return this.node(start3, {
            kind: Kind.DIRECTIVE_ARGUMENT_COORDINATE,
            name,
            argumentName
          });
        }
        return this.node(start3, {
          kind: Kind.DIRECTIVE_COORDINATE,
          name
        });
      } else if (memberName) {
        if (argumentName) {
          return this.node(start3, {
            kind: Kind.ARGUMENT_COORDINATE,
            name,
            fieldName: memberName,
            argumentName
          });
        }
        return this.node(start3, {
          kind: Kind.MEMBER_COORDINATE,
          name,
          memberName
        });
      }
      return this.node(start3, {
        kind: Kind.TYPE_COORDINATE,
        name
      });
    }
    // Core parsing utility functions
    /**
     * Returns a node that, if configured to do so, sets a "loc" field as a
     * location object, used to identify the place in the source that created a
     * given parsed object.
     */
    node(startToken, node) {
      if (this._options.noLocation !== true) {
        node.loc = new Location(
          startToken,
          this._lexer.lastToken,
          this._lexer.source
        );
      }
      return node;
    }
    /**
     * Determines if the next token is of a given kind
     */
    peek(kind) {
      return this._lexer.token.kind === kind;
    }
    /**
     * If the next token is of the given kind, return that token after advancing the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */
    expectToken(kind) {
      const token = this._lexer.token;
      if (token.kind === kind) {
        this.advanceLexer();
        return token;
      }
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
      );
    }
    /**
     * If the next token is of the given kind, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */
    expectOptionalToken(kind) {
      const token = this._lexer.token;
      if (token.kind === kind) {
        this.advanceLexer();
        return true;
      }
      return false;
    }
    /**
     * If the next token is a given keyword, advance the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */
    expectKeyword(value) {
      const token = this._lexer.token;
      if (token.kind === TokenKind.NAME && token.value === value) {
        this.advanceLexer();
      } else {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Expected "${value}", found ${getTokenDesc(token)}.`
        );
      }
    }
    /**
     * If the next token is a given keyword, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */
    expectOptionalKeyword(value) {
      const token = this._lexer.token;
      if (token.kind === TokenKind.NAME && token.value === value) {
        this.advanceLexer();
        return true;
      }
      return false;
    }
    /**
     * Helper function for creating an error when an unexpected lexed token is encountered.
     */
    unexpected(atToken) {
      const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
      return syntaxError(
        this._lexer.source,
        token.start,
        `Unexpected ${getTokenDesc(token)}.`
      );
    }
    /**
     * Returns a possibly empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    any(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      const nodes = [];
      while (!this.expectOptionalToken(closeKind)) {
        nodes.push(parseFn.call(this));
      }
      return nodes;
    }
    /**
     * Returns a list of parse nodes, determined by the parseFn.
     * It can be empty only if open token is missing otherwise it will always return non-empty list
     * that begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    optionalMany(openKind, parseFn, closeKind) {
      if (this.expectOptionalToken(openKind)) {
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));
        return nodes;
      }
      return [];
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    many(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
     * Advances the parser to the next lex token after last item in the list.
     */
    delimitedMany(delimiterKind, parseFn) {
      this.expectOptionalToken(delimiterKind);
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (this.expectOptionalToken(delimiterKind));
      return nodes;
    }
    advanceLexer() {
      const { maxTokens } = this._options;
      const token = this._lexer.advance();
      if (token.kind !== TokenKind.EOF) {
        ++this._tokenCounter;
        if (maxTokens !== void 0 && this._tokenCounter > maxTokens) {
          throw syntaxError(
            this._lexer.source,
            token.start,
            `Document contains more that ${maxTokens} tokens. Parsing aborted.`
          );
        }
      }
    }
  };
  function getTokenDesc(token) {
    const value = token.value;
    return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
  }
  function getTokenKindDesc(kind) {
    return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
  }

  // node_modules/graphql/language/printString.mjs
  function printString(str) {
    return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
  }
  var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
  function escapedReplacer(str) {
    return escapeSequences[str.charCodeAt(0)];
  }
  var escapeSequences = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000B",
    "\\f",
    "\\r",
    "\\u000E",
    "\\u000F",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001A",
    "\\u001B",
    "\\u001C",
    "\\u001D",
    "\\u001E",
    "\\u001F",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 2F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 3F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 4F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\",
    "",
    "",
    "",
    // 5F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 6F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\u007F",
    "\\u0080",
    "\\u0081",
    "\\u0082",
    "\\u0083",
    "\\u0084",
    "\\u0085",
    "\\u0086",
    "\\u0087",
    "\\u0088",
    "\\u0089",
    "\\u008A",
    "\\u008B",
    "\\u008C",
    "\\u008D",
    "\\u008E",
    "\\u008F",
    "\\u0090",
    "\\u0091",
    "\\u0092",
    "\\u0093",
    "\\u0094",
    "\\u0095",
    "\\u0096",
    "\\u0097",
    "\\u0098",
    "\\u0099",
    "\\u009A",
    "\\u009B",
    "\\u009C",
    "\\u009D",
    "\\u009E",
    "\\u009F"
  ];

  // node_modules/graphql/language/visitor.mjs
  var BREAK = Object.freeze({});
  function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
    const enterLeaveMap = /* @__PURE__ */ new Map();
    for (const kind of Object.values(Kind)) {
      enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
    }
    let stack = void 0;
    let inArray = Array.isArray(root);
    let keys = [root];
    let index = -1;
    let edits = [];
    let node = root;
    let key = void 0;
    let parent = void 0;
    const path2 = [];
    const ancestors = [];
    do {
      index++;
      const isLeaving = index === keys.length;
      const isEdited = isLeaving && edits.length !== 0;
      if (isLeaving) {
        key = ancestors.length === 0 ? void 0 : path2[path2.length - 1];
        node = parent;
        parent = ancestors.pop();
        if (isEdited) {
          if (inArray) {
            node = node.slice();
            let editOffset = 0;
            for (const [editKey, editValue] of edits) {
              const arrayKey = editKey - editOffset;
              if (editValue === null) {
                node.splice(arrayKey, 1);
                editOffset++;
              } else {
                node[arrayKey] = editValue;
              }
            }
          } else {
            node = { ...node };
            for (const [editKey, editValue] of edits) {
              node[editKey] = editValue;
            }
          }
        }
        index = stack.index;
        keys = stack.keys;
        edits = stack.edits;
        inArray = stack.inArray;
        stack = stack.prev;
      } else if (parent) {
        key = inArray ? index : keys[index];
        node = parent[key];
        if (node === null || node === void 0) {
          continue;
        }
        path2.push(key);
      }
      let result;
      if (!Array.isArray(node)) {
        var _enterLeaveMap$get, _enterLeaveMap$get2;
        isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
        const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
        result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path2, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path2.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path2.pop();
              continue;
            }
          }
        }
      }
      if (result === void 0 && isEdited) {
        edits.push([key, node]);
      }
      if (isLeaving) {
        path2.pop();
      } else {
        var _node$kind;
        stack = {
          inArray,
          index,
          keys,
          edits,
          prev: stack
        };
        inArray = Array.isArray(node);
        keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
        index = -1;
        edits = [];
        if (parent) {
          ancestors.push(parent);
        }
        parent = node;
      }
    } while (stack !== void 0);
    if (edits.length !== 0) {
      return edits[edits.length - 1][1];
    }
    return root;
  }
  function getEnterLeaveForKind(visitor, kind) {
    const kindVisitor = visitor[kind];
    if (typeof kindVisitor === "object") {
      return kindVisitor;
    } else if (typeof kindVisitor === "function") {
      return {
        enter: kindVisitor,
        leave: void 0
      };
    }
    return {
      enter: visitor.enter,
      leave: visitor.leave
    };
  }

  // node_modules/graphql/language/printer.mjs
  function print(ast) {
    return visit(ast, printDocASTReducer);
  }
  var MAX_LINE_LENGTH = 80;
  var printDocASTReducer = {
    Name: {
      leave: (node) => node.value
    },
    Variable: {
      leave: (node) => "$" + node.name
    },
    // Document
    Document: {
      leave: (node) => join(node.definitions, "\n\n")
    },
    OperationDefinition: {
      leave(node) {
        const varDefs = hasMultilineItems(node.variableDefinitions) ? wrap("(\n", join(node.variableDefinitions, "\n"), "\n)") : wrap("(", join(node.variableDefinitions, ", "), ")");
        const prefix = wrap("", node.description, "\n") + join(
          [
            node.operation,
            join([node.name, varDefs]),
            join(node.directives, " ")
          ],
          " "
        );
        return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable, type, defaultValue, directives, description }) => wrap("", description, "\n") + variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
    },
    SelectionSet: {
      leave: ({ selections }) => block(selections)
    },
    Field: {
      leave({ alias, name, arguments: args, directives, selectionSet }) {
        const prefix = wrap("", alias, ": ") + name;
        let argsLine = prefix + wrap("(", join(args, ", "), ")");
        if (argsLine.length > MAX_LINE_LENGTH) {
          argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
        }
        return join([argsLine, join(directives, " "), selectionSet], " ");
      }
    },
    Argument: {
      leave: ({ name, value }) => name + ": " + value
    },
    // Fragments
    FragmentSpread: {
      leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition, directives, selectionSet }) => join(
        [
          "...",
          wrap("on ", typeCondition),
          join(directives, " "),
          selectionSet
        ],
        " "
      )
    },
    FragmentDefinition: {
      leave: ({
        name,
        typeCondition,
        variableDefinitions,
        directives,
        selectionSet,
        description
      }) => wrap("", description, "\n") + // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
    },
    // Value
    IntValue: {
      leave: ({ value }) => value
    },
    FloatValue: {
      leave: ({ value }) => value
    },
    StringValue: {
      leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
    },
    BooleanValue: {
      leave: ({ value }) => value ? "true" : "false"
    },
    NullValue: {
      leave: () => "null"
    },
    EnumValue: {
      leave: ({ value }) => value
    },
    ListValue: {
      leave: ({ values }) => "[" + join(values, ", ") + "]"
    },
    ObjectValue: {
      leave: ({ fields }) => "{" + join(fields, ", ") + "}"
    },
    ObjectField: {
      leave: ({ name, value }) => name + ": " + value
    },
    // Directive
    Directive: {
      leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
    },
    // Type
    NamedType: {
      leave: ({ name }) => name
    },
    ListType: {
      leave: ({ type }) => "[" + type + "]"
    },
    NonNullType: {
      leave: ({ type }) => type + "!"
    },
    // Type System Definitions
    SchemaDefinition: {
      leave: ({ description, directives, operationTypes }) => wrap("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
    },
    OperationTypeDefinition: {
      leave: ({ operation, type }) => operation + ": " + type
    },
    ScalarTypeDefinition: {
      leave: ({ description, name, directives }) => wrap("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
    },
    ObjectTypeDefinition: {
      leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
        [
          "type",
          name,
          wrap("implements ", join(interfaces, " & ")),
          join(directives, " "),
          block(fields)
        ],
        " "
      )
    },
    FieldDefinition: {
      leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, "\n") + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
    },
    InputValueDefinition: {
      leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, "\n") + join(
        [name + ": " + type, wrap("= ", defaultValue), join(directives, " ")],
        " "
      )
    },
    InterfaceTypeDefinition: {
      leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
        [
          "interface",
          name,
          wrap("implements ", join(interfaces, " & ")),
          join(directives, " "),
          block(fields)
        ],
        " "
      )
    },
    UnionTypeDefinition: {
      leave: ({ description, name, directives, types }) => wrap("", description, "\n") + join(
        ["union", name, join(directives, " "), wrap("= ", join(types, " | "))],
        " "
      )
    },
    EnumTypeDefinition: {
      leave: ({ description, name, directives, values }) => wrap("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description, name, directives }) => wrap("", description, "\n") + join([name, join(directives, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description, name, directives, fields }) => wrap("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
    },
    DirectiveDefinition: {
      leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
    },
    SchemaExtension: {
      leave: ({ directives, operationTypes }) => join(
        ["extend schema", join(directives, " "), block(operationTypes)],
        " "
      )
    },
    ScalarTypeExtension: {
      leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name, interfaces, directives, fields }) => join(
        [
          "extend type",
          name,
          wrap("implements ", join(interfaces, " & ")),
          join(directives, " "),
          block(fields)
        ],
        " "
      )
    },
    InterfaceTypeExtension: {
      leave: ({ name, interfaces, directives, fields }) => join(
        [
          "extend interface",
          name,
          wrap("implements ", join(interfaces, " & ")),
          join(directives, " "),
          block(fields)
        ],
        " "
      )
    },
    UnionTypeExtension: {
      leave: ({ name, directives, types }) => join(
        [
          "extend union",
          name,
          join(directives, " "),
          wrap("= ", join(types, " | "))
        ],
        " "
      )
    },
    EnumTypeExtension: {
      leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
    },
    // Schema Coordinates
    TypeCoordinate: {
      leave: ({ name }) => name
    },
    MemberCoordinate: {
      leave: ({ name, memberName }) => join([name, wrap(".", memberName)])
    },
    ArgumentCoordinate: {
      leave: ({ name, fieldName, argumentName }) => join([name, wrap(".", fieldName), wrap("(", argumentName, ":)")])
    },
    DirectiveCoordinate: {
      leave: ({ name }) => join(["@", name])
    },
    DirectiveArgumentCoordinate: {
      leave: ({ name, argumentName }) => join(["@", name, wrap("(", argumentName, ":)")])
    }
  };
  function join(maybeArray, separator = "") {
    var _maybeArray$filter$jo;
    return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x3) => x3).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
  }
  function block(array) {
    return wrap("{\n", indent(join(array, "\n")), "\n}");
  }
  function wrap(start3, maybeString, end = "") {
    return maybeString != null && maybeString !== "" ? start3 + maybeString + end : "";
  }
  function indent(str) {
    return wrap("  ", str.replace(/\n/g, "\n  "));
  }
  function hasMultilineItems(maybeArray) {
    var _maybeArray$some;
    return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
  }

  // node_modules/@nhost/graphql-js/dist/index.esm.js
  function y3(e2, r2, t2) {
    return e2.document ? e2 : {
      document: e2,
      variables: r2,
      config: t2
    };
  }
  function u(e2) {
    var s;
    let r2;
    const t2 = e2.definitions.filter(
      (a) => a.kind === "OperationDefinition"
    );
    return t2.length === 1 && (r2 = (s = t2[0].name) == null ? void 0 : s.value), r2;
  }
  function T(e2) {
    if (typeof e2 == "string") {
      let t2;
      try {
        const s = parse(e2);
        t2 = u(s);
      } catch {
      }
      return { query: e2, operationName: t2 };
    }
    const r2 = u(e2);
    return { query: print(e2), operationName: r2 };
  }
  var q2 = class {
    constructor(r2) {
      const { url: t2, adminSecret: s } = r2;
      this._url = t2, this.accessToken = null, this.adminSecret = s;
    }
    async request(r2, ...t2) {
      const [s, a] = t2, c = y3(r2, s, a), { headers: l, ...h } = a || {}, { query: p, operationName: f } = T(c.document);
      try {
        const o2 = await (0, import_isomorphic_unfetch.default)(this.httpUrl, {
          method: "POST",
          body: JSON.stringify({
            operationName: f,
            query: p,
            variables: s
          }),
          headers: {
            "Content-Type": "application/json",
            ...this.generateAccessTokenHeaders(),
            ...l
          },
          ...h
        });
        if (!o2.ok)
          return {
            data: null,
            error: {
              error: o2.statusText,
              message: o2.statusText,
              status: o2.status
            }
          };
        const { data: n2, errors: i } = await o2.json();
        return i ? {
          data: null,
          error: i
        } : typeof n2 != "object" || Array.isArray(n2) || n2 === null ? {
          data: null,
          error: {
            error: "invalid-response",
            message: "incorrect response data from GraphQL server",
            status: 0
          }
        } : { data: n2, error: null };
      } catch (o2) {
        const n2 = o2;
        return {
          data: null,
          error: {
            message: n2.message,
            status: n2.name === "AbortError" ? 0 : 500,
            error: n2.name === "AbortError" ? "abort-error" : "unknown"
          }
        };
      }
    }
    /**
     * Use `nhost.graphql.httpUrl` to get the GraphQL HTTP URL.
     * @example
     * ```ts
     * const url = nhost.graphql.httpUrl;
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/graphql/get-http-url
     */
    get httpUrl() {
      return this._url;
    }
    /**
     * Use `nhost.graphql.wsUrl` to get the GraphQL WebSocket URL.
     * @example
     * ```ts
     * const url = nhost.graphql.wsUrl;
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/graphql/get-ws-url
     */
    get wsUrl() {
      return this._url.replace(/^(http)(s?):\/\//, "ws$2://");
    }
    /**
     * Use `nhost.graphql.url` to get the GraphQL URL.
     * @deprecated Use `nhost.graphql.httpUrl` and `nhost.graphql.wsUrl` instead.
     */
    get url() {
      return this._url;
    }
    /**
     * Use `nhost.graphql.getUrl()` to get the GraphQL URL.
     * @deprecated Use `nhost.graphql.httpUrl` and `nhost.graphql.wsUrl` instead.
     */
    getUrl() {
      return this._url;
    }
    /**
     * Use `nhost.graphql.setAccessToken` to a set an access token to be used in subsequent graphql requests. Note that if you're signin in users with `nhost.auth.signIn()` the access token will be set automatically.
     *
     * @example
     * ```ts
     * nhost.graphql.setAccessToken('some-access-token')
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/graphql/set-access-token
     */
    setAccessToken(r2) {
      if (!r2) {
        this.accessToken = null;
        return;
      }
      this.accessToken = r2;
    }
    generateAccessTokenHeaders() {
      return this.adminSecret ? {
        "x-hasura-admin-secret": this.adminSecret
      } : this.accessToken ? {
        Authorization: `Bearer ${this.accessToken}`
      } : {};
    }
  };

  // node_modules/@nhost/nhost-js/dist/index.esm.js
  var w2 = /^((?<protocol>http[s]?):\/\/)?(?<host>(localhost|local))(:(?<port>(\d+|__\w+__)))?$/;
  function d(e2, t2) {
    const { backendUrl: i, subdomain: o2, region: l } = e2;
    if (i)
      return `${i}/v1/${t2}`;
    if (!o2)
      throw new Error("Either `backendUrl` or `subdomain` must be set.");
    const a = o2.match(w2);
    if (a != null && a.groups) {
      const { protocol: s, host: h, port: r2 } = a.groups, n2 = U2(t2);
      return n2 || (h === "localhost" ? (console.warn(
        'The `subdomain` is set to "localhost". Support for this will be removed in a future release. Please use "local" instead.'
      ), `${s || "http"}://localhost:${r2 || 1337}/v1/${t2}`) : r2 ? `${s || "https"}://local.${t2}.nhost.run:${r2}/v1` : `${s || "https"}://local.${t2}.nhost.run/v1`);
    }
    if (!l)
      throw new Error('`region` must be set when using a `subdomain` other than "local".');
    return `https://${o2}.${t2}.${l}.nhost.run/v1`;
  }
  function b2() {
    return typeof window != "undefined";
  }
  function m3() {
    return typeof process != "undefined" && process.env;
  }
  function U2(e2) {
    return b2() || !m3() ? null : process.env[`NHOST_${e2.toUpperCase()}_URL`];
  }
  function A2(e2, t2) {
    const o2 = t2.startsWith("/") ? t2 : `/${t2}`;
    return e2 + o2;
  }
  function S2(e2) {
    const t2 = "subdomain" in e2 || "backendUrl" in e2 ? d(e2, "auth") : e2.authUrl;
    if (!t2)
      throw new Error("Please provide `subdomain` or `authUrl`.");
    return new dr({ url: t2, ...e2 });
  }
  function $2(e2) {
    const t2 = "subdomain" in e2 || "backendUrl" in e2 ? d(e2, "functions") : e2.functionsUrl;
    if (!t2)
      throw new Error("Please provide `subdomain` or `functionsUrl`.");
    return new v2({ url: t2, ...e2 });
  }
  var v2 = class {
    constructor(t2) {
      const { url: i, adminSecret: o2 } = t2;
      this.url = i, this.accessToken = null, this.adminSecret = o2;
    }
    /**
     * Use `nhost.functions.call` to call (sending a POST request to) a serverless function. Use generic
     * types to specify the expected response data, request body and error message.
     *
     * @example
     * ### Without generic types
     * ```ts
     * await nhost.functions.call('send-welcome-email', { email: 'joe@example.com', name: 'Joe Doe' })
     * ```
     *
     * @example
     * ### Using generic types
     * ```ts
     * type Data = {
     *   message: string
     * }
     *
     * type Body = {
     *   email: string
     *   name: string
     * }
     *
     * type ErrorMessage = {
     *   details: string
     * }
     *
     * // The function will only accept a body of type `Body`
     * const { res, error } = await nhost.functions.call<Data, Body, ErrorMessage>(
     *   'send-welcome-email',
     *   { email: 'joe@example.com', name: 'Joe Doe' }
     * )
     *
     * // Now the response data is typed as `Data`
     * console.log(res?.data.message)
     *
     * // Now the error message is typed as `ErrorMessage`
     * console.log(error?.message.details)
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/nhost-js/functions/call
     */
    async call(t2, i, o2) {
      var s, h;
      const l = {
        "Content-Type": "application/json",
        ...this.generateAccessTokenHeaders(),
        ...o2 == null ? void 0 : o2.headers
      }, a = A2(this.url, t2);
      try {
        const r2 = await (0, import_isomorphic_unfetch2.default)(a, {
          body: i ? JSON.stringify(i) : null,
          headers: l,
          method: "POST"
        });
        if (!r2.ok) {
          let c;
          return (s = r2.headers.get("content-type")) != null && s.includes("application/json") ? c = await r2.json() : c = await r2.text(), {
            res: null,
            error: {
              message: c,
              error: r2.statusText,
              status: r2.status
            }
          };
        }
        let n2;
        return (h = r2.headers.get("content-type")) != null && h.includes("application/json") ? n2 = await r2.json() : n2 = await r2.text(), {
          res: { data: n2, status: r2.status, statusText: r2.statusText },
          error: null
        };
      } catch (r2) {
        const n2 = r2;
        return {
          res: null,
          error: {
            message: n2.message,
            status: n2.name === "AbortError" ? 0 : 500,
            error: n2.name === "AbortError" ? "abort-error" : "unknown"
          }
        };
      }
    }
    /**
     * Use `nhost.functions.setAccessToken` to a set an access token to be used in subsequent functions requests. Note that if you're signin in users with `nhost.auth.signIn()` the access token will be set automatically.
     *
     * @example
     * ```ts
     * nhost.functions.setAccessToken('some-access-token')
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript/nhost-js/functions/set-access-token
     */
    setAccessToken(t2) {
      if (!t2) {
        this.accessToken = null;
        return;
      }
      this.accessToken = t2;
    }
    generateAccessTokenHeaders() {
      return this.adminSecret ? {
        "x-hasura-admin-secret": this.adminSecret
      } : this.accessToken ? {
        Authorization: `Bearer ${this.accessToken}`
      } : {};
    }
  };
  function C2(e2) {
    const t2 = "subdomain" in e2 || "backendUrl" in e2 ? d(e2, "graphql") : e2.graphqlUrl;
    if (!t2)
      throw new Error("Please provide `subdomain` or `graphqlUrl`.");
    return new q2({ url: t2, ...e2 });
  }
  function E2(e2) {
    const t2 = "subdomain" in e2 || "backendUrl" in e2 ? d(e2, "storage") : e2.storageUrl;
    if (!t2)
      throw new Error("Please provide `subdomain` or `storageUrl`.");
    return new j2({ url: t2, ...e2 });
  }
  var H3 = (e2) => new _3(e2);
  var _3 = class {
    /**
     * Nhost Client
     *
     * @example
     * ```ts
     * const nhost = new NhostClient({ subdomain, region });
     * ```
     *
     * @docs https://docs.nhost.io/reference/javascript
     */
    constructor({
      refreshIntervalTime: t2,
      clientStorage: i,
      clientStorageType: o2,
      autoRefreshToken: l,
      autoSignIn: a,
      adminSecret: s,
      devTools: h,
      start: r2 = true,
      ...n2
    }) {
      this.auth = S2({
        refreshIntervalTime: t2,
        clientStorage: i,
        clientStorageType: o2,
        autoRefreshToken: l,
        autoSignIn: a,
        start: r2,
        ...n2
      }), this.storage = E2({ adminSecret: s, ...n2 }), this.functions = $2({ adminSecret: s, ...n2 }), this.graphql = C2({ adminSecret: s, ...n2 }), this.auth.onAuthStateChanged((c, u2) => {
        if (c === "SIGNED_OUT") {
          this.storage.setAccessToken(void 0), this.functions.setAccessToken(void 0), this.graphql.setAccessToken(void 0);
          return;
        }
        const f = u2 == null ? void 0 : u2.accessToken;
        this.storage.setAccessToken(f), this.functions.setAccessToken(f), this.graphql.setAccessToken(f);
      }), this.auth.onTokenChanged((c) => {
        const u2 = c == null ? void 0 : c.accessToken;
        this.storage.setAccessToken(u2), this.functions.setAccessToken(u2), this.graphql.setAccessToken(u2);
      }), this._adminSecret = s, this.devTools = h;
    }
    get adminSecret() {
      return this._adminSecret;
    }
    set adminSecret(t2) {
      this._adminSecret = t2, this.storage.setAdminSecret(t2);
    }
  };
  return __toCommonJS(index_esm_exports);
})();
/*! Bundled license information:

xstate/es/_virtual/_tslib.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
