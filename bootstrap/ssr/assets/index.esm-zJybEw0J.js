import { a as __toCommonJS, i as __require, n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-BMI-E3GI.js";
import { s as require_react } from "./jsx-runtime-BC7GUiKv.js";
import util from "util";
import crypto from "crypto";
import stream, { Readable } from "stream";
import { resolve } from "path";
import http from "http";
import https from "https";
import url from "url";
import { EventEmitter } from "events";
import http2 from "http2";
import zlib from "zlib";
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.8";
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.development.js
/**
* @license React
* react-dom.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function noop() {}
		function testStringCoercion(value) {
			return "" + value;
		}
		function createPortal$1(children, containerInfo, implementation) {
			var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			try {
				testStringCoercion(key);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
			return {
				$$typeof: REACT_PORTAL_TYPE,
				key: null == key ? null : "" + key,
				children,
				containerInfo,
				implementation
			};
		}
		function getCrossOriginStringAs(as, input) {
			if ("font" === as) return "";
			if ("string" === typeof input) return "use-credentials" === input ? input : "";
		}
		function getValueDescriptorExpectingObjectForWarning(thing) {
			return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "something with type \"" + typeof thing + "\"";
		}
		function getValueDescriptorExpectingEnumForWarning(thing) {
			return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : "something with type \"" + typeof thing + "\"";
		}
		function resolveDispatcher() {
			var dispatcher = ReactSharedInternals.H;
			null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require_react(), Internals = {
			d: {
				f: noop,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: noop,
				C: noop,
				L: noop,
				m: noop,
				X: noop,
				S: noop,
				M: noop
			},
			p: 0,
			findDOMNode: null
		}, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		"function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
		exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
		exports.createPortal = function(children, container) {
			var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
			if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error("Target container is not a DOM element.");
			return createPortal$1(children, container, null, key);
		};
		exports.flushSync = function(fn) {
			var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
			try {
				if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
			} finally {
				ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		};
		exports.preconnect = function(href, options) {
			"string" === typeof href && href ? null != options && "object" !== typeof options ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : null != options && "string" !== typeof options.crossOrigin && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
		};
		exports.prefetchDNS = function(href) {
			if ("string" !== typeof href || !href) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			else if (1 < arguments.length) {
				var options = arguments[1];
				"object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
			}
			"string" === typeof href && Internals.d.D(href);
		};
		exports.preinit = function(href, options) {
			"string" === typeof href && href ? null == options || "object" !== typeof options ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : "style" !== options.as && "script" !== options.as && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			if ("string" === typeof href && options && "string" === typeof options.as) {
				var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
				"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
					crossOrigin,
					integrity,
					fetchPriority
				}) : "script" === as && Internals.d.X(href, {
					crossOrigin,
					integrity,
					fetchPriority,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		};
		exports.preinitModule = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
			if (encountered) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
			else switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
				case "script": break;
				default: encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", encountered, href);
			}
			if ("string" === typeof href) if ("object" === typeof options && null !== options) {
				if (null == options.as || "script" === options.as) encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
					crossOrigin: encountered,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			} else options ?? Internals.d.M(href);
		};
		exports.preload = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
			encountered && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", encountered);
			if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
				encountered = options.as;
				var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
				Internals.d.L(href, encountered, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					type: "string" === typeof options.type ? options.type : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
					referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
					imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
					imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
					media: "string" === typeof options.media ? options.media : void 0
				});
			}
		};
		exports.preloadModule = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
			encountered && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", encountered);
			"string" === typeof href && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin: encountered,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			})) : Internals.d.m(href));
		};
		exports.requestFormReset = function(form) {
			Internals.d.r(form);
		};
		exports.unstable_batchedUpdates = function(fn, a) {
			return fn(a);
		};
		exports.useFormState = function(action, initialState, permalink) {
			return resolveDispatcher().useFormState(action, initialState, permalink);
		};
		exports.useFormStatus = function() {
			return resolveDispatcher().useHostTransitionStatus();
		};
		exports.version = "19.2.8";
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		if (process.env.NODE_ENV !== "production") throw new Error("^_^");
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	if (process.env.NODE_ENV === "production") {
		checkDCE();
		module.exports = require_react_dom_production();
	} else module.exports = require_react_dom_development();
}));
//#endregion
//#region node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
//#endregion
//#region node_modules/lodash-es/_root.js
/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function("return this")();
//#endregion
//#region node_modules/lodash-es/_Symbol.js
/** Built-in value references. */
var Symbol$1 = root.Symbol;
//#endregion
//#region node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$14 = objectProto$4.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto$4.toString;
/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty$14.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) {
		if (isOwn) value[symToStringTag$1] = tag;
		else delete value[symToStringTag$1];
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_objectToString.js
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString = Object.prototype.toString;
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
/** `Object#toString` result references. */
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
//#endregion
//#region node_modules/lodash-es/isSymbol.js
/** `Object#toString` result references. */
var symbolTag$3 = "[object Symbol]";
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
//#endregion
//#region node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
//#endregion
//#region node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray$1 = Array.isArray;
//#endregion
//#region node_modules/lodash-es/_baseToString.js
/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;
/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0;
var symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray$1(value)) return arrayMap(value, baseToString) + "";
	if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
//#endregion
//#region node_modules/lodash-es/_trimmedEndIndex.js
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
* character of `string`.
*
* @private
* @param {string} string The string to inspect.
* @returns {number} Returns the index of the last non-whitespace character.
*/
function trimmedEndIndex(string) {
	var index = string.length;
	while (index-- && reWhitespace.test(string.charAt(index)));
	return index;
}
//#endregion
//#region node_modules/lodash-es/_baseTrim.js
/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;
/**
* The base implementation of `_.trim`.
*
* @private
* @param {string} string The string to trim.
* @returns {string} Returns the trimmed string.
*/
function baseTrim(string) {
	return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
//#endregion
//#region node_modules/lodash-es/isObject.js
/**
* Checks if `value` is the
* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an object, else `false`.
* @example
*
* _.isObject({});
* // => true
*
* _.isObject([1, 2, 3]);
* // => true
*
* _.isObject(_.noop);
* // => true
*
* _.isObject(null);
* // => false
*/
function isObject$1(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
//#endregion
//#region node_modules/lodash-es/toNumber.js
/** Used as references for various `Number` constants. */
var NAN = NaN;
/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;
/**
* Converts `value` to a number.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to process.
* @returns {number} Returns the number.
* @example
*
* _.toNumber(3.2);
* // => 3.2
*
* _.toNumber(Number.MIN_VALUE);
* // => 5e-324
*
* _.toNumber(Infinity);
* // => Infinity
*
* _.toNumber('3.2');
* // => 3.2
*/
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol(value)) return NAN;
	if (isObject$1(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject$1(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = baseTrim(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
//#endregion
//#region node_modules/lodash-es/identity.js
/**
* This method returns the first argument it receives.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Util
* @param {*} value Any value.
* @returns {*} Returns `value`.
* @example
*
* var object = { 'a': 1 };
*
* console.log(_.identity(object) === object);
* // => true
*/
function identity(value) {
	return value;
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]";
var funcTag$2 = "[object Function]";
var genTag$1 = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction$2(value) {
	if (!isObject$1(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
/** Used to detect overreaching core-js shims. */
var coreJsData = root["__core-js_shared__"];
//#endregion
//#region node_modules/lodash-es/_isMasked.js
/** Used to detect methods masquerading as native. */
var maskSrcKey = function() {
	var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
	return uid ? "Symbol(src)_1." + uid : "";
}();
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
//#endregion
//#region node_modules/lodash-es/_toSource.js
/** Used to resolve the decompiled source of functions. */
var funcToString$2 = Function.prototype.toString;
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$2.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
/**
* Used to match `RegExp`
* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
*/
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */
var funcProto$1 = Function.prototype;
var objectProto$3 = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$13 = objectProto$3.hasOwnProperty;
/** Used to detect if a method is native. */
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$13).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject$1(value) || isMasked(value)) return false;
	return (isFunction$2(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
//#endregion
//#region node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
//#endregion
//#region node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
//#endregion
//#region node_modules/lodash-es/_WeakMap.js
var WeakMap$1 = getNative(root, "WeakMap");
//#endregion
//#region node_modules/lodash-es/_baseCreate.js
/** Built-in value references. */
var objectCreate = Object.create;
/**
* The base implementation of `_.create` without support for assigning
* properties to the created object.
*
* @private
* @param {Object} proto The object to inherit from.
* @returns {Object} Returns the new object.
*/
var baseCreate = function() {
	function object() {}
	return function(proto) {
		if (!isObject$1(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
//#endregion
//#region node_modules/lodash-es/_apply.js
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
//#endregion
//#region node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_shortOut.js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
/**
* Creates a function that'll short out and invoke `identity` instead
* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
* milliseconds.
*
* @private
* @param {Function} func The function to restrict.
* @returns {Function} Returns the new shortable function.
*/
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
//#endregion
//#region node_modules/lodash-es/constant.js
/**
* Creates a function that returns `value`.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {*} value The value to return from the new function.
* @returns {Function} Returns the new constant function.
* @example
*
* var objects = _.times(2, _.constant({ 'a': 1 }));
*
* console.log(objects);
* // => [{ 'a': 1 }, { 'a': 1 }]
*
* console.log(objects[0] === objects[1]);
* // => true
*/
function constant(value) {
	return function() {
		return value;
	};
}
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
	try {
		var func = getNative(Object, "defineProperty");
		func({}, "", {});
		return func;
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/_setToString.js
/**
* Sets the `toString` method of `func` to return `string`.
*
* @private
* @param {Function} func The function to modify.
* @param {Function} string The `toString` result.
* @returns {Function} Returns `func`.
*/
var setToString = shortOut(!defineProperty ? identity : function(func, string) {
	return defineProperty(func, "toString", {
		"configurable": true,
		"enumerable": false,
		"value": constant(string),
		"writable": true
	});
});
//#endregion
//#region node_modules/lodash-es/_arrayEach.js
/**
* A specialized version of `_.forEach` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns `array`.
*/
function arrayEach(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (iteratee(array[index], index, array) === false) break;
	return array;
}
//#endregion
//#region node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
//#endregion
//#region node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
//#endregion
//#region node_modules/lodash-es/_assignValue.js
/** Used to check objects for own properties. */
var hasOwnProperty$12 = Object.prototype.hasOwnProperty;
/**
* Assigns `value` to `key` of `object` if the existing value is not equivalent
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$12.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/_copyObject.js
/**
* Copies properties of `source` to `object`.
*
* @private
* @param {Object} source The object to copy properties from.
* @param {Array} props The property identifiers to copy.
* @param {Object} [object={}] The object to copy properties to.
* @param {Function} [customizer] The function to customize copied values.
* @returns {Object} Returns `object`.
*/
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) baseAssignValue(object, key, newValue);
		else assignValue(object, key, newValue);
	}
	return object;
}
//#endregion
//#region node_modules/lodash-es/_overRest.js
var nativeMax$1 = Math.max;
/**
* A specialized version of `baseRest` which transforms the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @param {Function} transform The rest array transform.
* @returns {Function} Returns the new function.
*/
function overRest(func, start, transform) {
	start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return apply(func, this, otherArgs);
	};
}
//#endregion
//#region node_modules/lodash-es/_baseRest.js
/**
* The base implementation of `_.rest` which doesn't validate or coerce arguments.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @returns {Function} Returns the new function.
*/
function baseRest(func, start) {
	return setToString(overRest(func, start, identity), func + "");
}
//#endregion
//#region node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction$2(value);
}
//#endregion
//#region node_modules/lodash-es/_isIterateeCall.js
/**
* Checks if the given arguments are from an iteratee call.
*
* @private
* @param {*} value The potential iteratee value argument.
* @param {*} index The potential iteratee index or key argument.
* @param {*} object The potential iteratee object argument.
* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
*  else `false`.
*/
function isIterateeCall(value, index, object) {
	if (!isObject$1(object)) return false;
	var type = typeof index;
	if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
	return false;
}
//#endregion
//#region node_modules/lodash-es/_createAssigner.js
/**
* Creates a function like `_.assign`.
*
* @private
* @param {Function} assigner The function to assign values.
* @returns {Function} Returns the new assigner function.
*/
function createAssigner(assigner) {
	return baseRest(function(object, sources) {
		var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
		customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
		if (guard && isIterateeCall(sources[0], sources[1], guard)) {
			customizer = length < 3 ? void 0 : customizer;
			length = 1;
		}
		object = Object(object);
		while (++index < length) {
			var source = sources[index];
			if (source) assigner(object, source, index, customizer);
		}
		return object;
	});
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var objectProto$2 = Object.prototype;
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$2);
}
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
/** `Object#toString` result references. */
var argsTag$3 = "[object Arguments]";
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$1.hasOwnProperty;
/** Built-in value references. */
var propertyIsEnumerable$2 = objectProto$1.propertyIsEnumerable;
/**
* Checks if `value` is likely an `arguments` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*  else `false`.
* @example
*
* _.isArguments(function() { return arguments; }());
* // => true
*
* _.isArguments([1, 2, 3]);
* // => false
*/
var isArguments = baseIsArguments(function() {
	return arguments;
}()) ? baseIsArguments : function(value) {
	return isObjectLike(value) && hasOwnProperty$11.call(value, "callee") && !propertyIsEnumerable$2.call(value, "callee");
};
//#endregion
//#region node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
//#endregion
//#region node_modules/lodash-es/isBuffer.js
/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$2 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0;
/**
* Checks if `value` is a buffer.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
* @example
*
* _.isBuffer(new Buffer(2));
* // => true
*
* _.isBuffer(new Uint8Array(2));
* // => false
*/
var isBuffer$1 = (Buffer$2 ? Buffer$2.isBuffer : void 0) || stubFalse;
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/** `Object#toString` result references. */
var argsTag$2 = "[object Arguments]";
var arrayTag$2 = "[object Array]";
var boolTag$3 = "[object Boolean]";
var dateTag$3 = "[object Date]";
var errorTag$2 = "[object Error]";
var funcTag$1 = "[object Function]";
var mapTag$5 = "[object Map]";
var numberTag$3 = "[object Number]";
var objectTag$4 = "[object Object]";
var regexpTag$3 = "[object RegExp]";
var setTag$5 = "[object Set]";
var stringTag$3 = "[object String]";
var weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]";
var dataViewTag$4 = "[object DataView]";
var float32Tag$2 = "[object Float32Array]";
var float64Tag$2 = "[object Float64Array]";
var int8Tag$2 = "[object Int8Array]";
var int16Tag$2 = "[object Int16Array]";
var int32Tag$2 = "[object Int32Array]";
var uint8Tag$2 = "[object Uint8Array]";
var uint8ClampedTag$2 = "[object Uint8ClampedArray]";
var uint16Tag$2 = "[object Uint16Array]";
var uint32Tag$2 = "[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
/** Detect free variable `process` from Node.js. */
var freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process;
/** Used to access faster Node.js helpers. */
var nodeUtil = function() {
	try {
		var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
		if (types) return types;
		return freeProcess && freeProcess.binding && freeProcess.binding("util");
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
* Checks if `value` is classified as a typed array.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
* @example
*
* _.isTypedArray(new Uint8Array);
* // => true
*
* _.isTypedArray([]);
* // => false
*/
var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
//#endregion
//#region node_modules/lodash-es/_arrayLikeKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$10 = Object.prototype.hasOwnProperty;
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$10.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
//#endregion
//#region node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg(Object.keys, Object);
//#endregion
//#region node_modules/lodash-es/_baseKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$9 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeys(object) {
	if (!isPrototype(object)) return nativeKeys(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$9.call(object, key) && key != "constructor") result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keys.js
/**
* Creates an array of the own enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects. See the
* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* for more details.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keys(new Foo);
* // => ['a', 'b'] (iteration order is not guaranteed)
*
* _.keys('hi');
* // => ['0', '1']
*/
function keys(object) {
	return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
//#endregion
//#region node_modules/lodash-es/_nativeKeysIn.js
/**
* This function is like
* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* except that it includes inherited enumerable properties.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseKeysIn.js
/** Used to check objects for own properties. */
var hasOwnProperty$8 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeysIn(object) {
	if (!isObject$1(object)) return nativeKeysIn(object);
	var isProto = isPrototype(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty$8.call(object, key)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keysIn.js
/**
* Creates an array of the own and inherited enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keysIn(new Foo);
* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
*/
function keysIn(object) {
	return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
//#endregion
//#region node_modules/lodash-es/_isKey.js
/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
/**
* Checks if `value` is a property name and not a property path.
*
* @private
* @param {*} value The value to check.
* @param {Object} [object] The object to query keys on.
* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
*/
function isKey(value, object) {
	if (isArray$1(value)) return false;
	var type = typeof value;
	if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative(Object, "create");
//#endregion
//#region node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_hashGet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
/** Used to check objects for own properties. */
var hasOwnProperty$7 = Object.prototype.hasOwnProperty;
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$2 ? void 0 : result;
	}
	return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
//#endregion
//#region node_modules/lodash-es/_hashSet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
/** Built-in value references. */
var splice = Array.prototype.splice;
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
//#endregion
//#region node_modules/lodash-es/_Map.js
var Map$1 = getNative(root, "Map");
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
//#endregion
//#region node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
//#endregion
//#region node_modules/lodash-es/memoize.js
/** Error message constants. */
var FUNC_ERROR_TEXT$1 = "Expected a function";
/**
* Creates a function that memoizes the result of `func`. If `resolver` is
* provided, it determines the cache key for storing the result based on the
* arguments provided to the memoized function. By default, the first argument
* provided to the memoized function is used as the map cache key. The `func`
* is invoked with the `this` binding of the memoized function.
*
* **Note:** The cache is exposed as the `cache` property on the memoized
* function. Its creation may be customized by replacing the `_.memoize.Cache`
* constructor with one whose instances implement the
* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
* method interface of `clear`, `delete`, `get`, `has`, and `set`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to have its output memoized.
* @param {Function} [resolver] The function to resolve the cache key.
* @returns {Function} Returns the new memoized function.
* @example
*
* var object = { 'a': 1, 'b': 2 };
* var other = { 'c': 3, 'd': 4 };
*
* var values = _.memoize(_.values);
* values(object);
* // => [1, 2]
*
* values(other);
* // => [3, 4]
*
* object.a = 2;
* values(object);
* // => [1, 2]
*
* // Modify the result cache.
* values.cache.set(object, ['a', 'b']);
* values(object);
* // => ['a', 'b']
*
* // Replace `_.memoize.Cache`.
* _.memoize.Cache = WeakMap;
*/
function memoize(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT$1);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		memoized.cache = cache.set(key, result) || cache;
		return result;
	};
	memoized.cache = new (memoize.Cache || MapCache)();
	return memoized;
}
memoize.Cache = MapCache;
//#endregion
//#region node_modules/lodash-es/_memoizeCapped.js
/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;
/**
* A specialized version of `_.memoize` which clears the memoized function's
* cache when it exceeds `MAX_MEMOIZE_SIZE`.
*
* @private
* @param {Function} func The function to have its output memoized.
* @returns {Function} Returns the new memoized function.
*/
function memoizeCapped(func) {
	var result = memoize(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
		return key;
	});
	var cache = result.cache;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stringToPath.js
/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;
/**
* Converts `string` to a property path array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the property path array.
*/
var stringToPath = memoizeCapped(function(string) {
	var result = [];
	if (string.charCodeAt(0) === 46) result.push("");
	string.replace(rePropName, function(match, number, quote, subString) {
		result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
	});
	return result;
});
//#endregion
//#region node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString$1(value) {
	return value == null ? "" : baseToString(value);
}
//#endregion
//#region node_modules/lodash-es/_castPath.js
/**
* Casts `value` to a path array if it's not one.
*
* @private
* @param {*} value The value to inspect.
* @param {Object} [object] The object to query keys on.
* @returns {Array} Returns the cast property path array.
*/
function castPath(value, object) {
	if (isArray$1(value)) return value;
	return isKey(value, object) ? [value] : stringToPath(toString$1(value));
}
//#endregion
//#region node_modules/lodash-es/_toKey.js
/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
/**
* Converts `value` to a string key if it's not a string or symbol.
*
* @private
* @param {*} value The value to inspect.
* @returns {string|symbol} Returns the key.
*/
function toKey(value) {
	if (typeof value == "string" || isSymbol(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
//#endregion
//#region node_modules/lodash-es/_baseGet.js
/**
* The base implementation of `_.get` without support for default values.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @returns {*} Returns the resolved value.
*/
function baseGet(object, path) {
	path = castPath(path, object);
	var index = 0, length = path.length;
	while (object != null && index < length) object = object[toKey(path[index++])];
	return index && index == length ? object : void 0;
}
//#endregion
//#region node_modules/lodash-es/get.js
/**
* Gets the value at `path` of `object`. If the resolved value is
* `undefined`, the `defaultValue` is returned in its place.
*
* @static
* @memberOf _
* @since 3.7.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @param {*} [defaultValue] The value returned for `undefined` resolved values.
* @returns {*} Returns the resolved value.
* @example
*
* var object = { 'a': [{ 'b': { 'c': 3 } }] };
*
* _.get(object, 'a[0].b.c');
* // => 3
*
* _.get(object, ['a', '0', 'b', 'c']);
* // => 3
*
* _.get(object, 'a.b.c', 'default');
* // => 'default'
*/
function get(object, path, defaultValue) {
	var result = object == null ? void 0 : baseGet(object, path);
	return result === void 0 ? defaultValue : result;
}
//#endregion
//#region node_modules/lodash-es/_arrayPush.js
/**
* Appends the elements of `values` to `array`.
*
* @private
* @param {Array} array The array to modify.
* @param {Array} values The values to append.
* @returns {Array} Returns `array`.
*/
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);
//#endregion
//#region node_modules/lodash-es/isPlainObject.js
/** `Object#toString` result references. */
var objectTag$3 = "[object Object]";
/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);
/**
* Checks if `value` is a plain object, that is, an object created by the
* `Object` constructor or one with a `[[Prototype]]` of `null`.
*
* @static
* @memberOf _
* @since 0.8.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
* @example
*
* function Foo() {
*   this.a = 1;
* }
*
* _.isPlainObject(new Foo);
* // => false
*
* _.isPlainObject([1, 2, 3]);
* // => false
*
* _.isPlainObject({ 'x': 0, 'y': 0 });
* // => true
*
* _.isPlainObject(Object.create(null));
* // => true
*/
function isPlainObject$1(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty$5.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
//#endregion
//#region node_modules/lodash-es/_basePropertyOf.js
/**
* The base implementation of `_.propertyOf` without support for deep paths.
*
* @private
* @param {Object} object The object to query.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyOf(object) {
	return function(key) {
		return object == null ? void 0 : object[key];
	};
}
//#endregion
//#region node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
//#endregion
//#region node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
//#endregion
//#region node_modules/lodash-es/_stackSet.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	var data = this.__data__ = new ListCache(entries);
	this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
//#endregion
//#region node_modules/lodash-es/_baseAssign.js
/**
* The base implementation of `_.assign` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssign(object, source) {
	return object && copyObject(source, keys(source), object);
}
//#endregion
//#region node_modules/lodash-es/_baseAssignIn.js
/**
* The base implementation of `_.assignIn` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssignIn(object, source) {
	return object && copyObject(source, keysIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
/** Detect free variable `exports`. */
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$1 = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0;
var allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_arrayFilter.js
/**
* A specialized version of `_.filter` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/stubArray.js
/**
* This method returns a new empty array.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {Array} Returns the new empty array.
* @example
*
* var arrays = _.times(2, _.stubArray);
*
* console.log(arrays);
* // => [[], []]
*
* console.log(arrays[0] === arrays[1]);
* // => false
*/
function stubArray() {
	return [];
}
//#endregion
//#region node_modules/lodash-es/_getSymbols.js
/** Built-in value references. */
var propertyIsEnumerable$1 = Object.prototype.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
* Creates an array of the own enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	if (object == null) return [];
	object = Object(object);
	return arrayFilter(nativeGetSymbols(object), function(symbol) {
		return propertyIsEnumerable$1.call(object, symbol);
	});
};
//#endregion
//#region node_modules/lodash-es/_copySymbols.js
/**
* Copies own symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbols(source, object) {
	return copyObject(source, getSymbols(source), object);
}
//#endregion
//#region node_modules/lodash-es/_getSymbolsIn.js
/**
* Creates an array of the own and inherited enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbolsIn = !Object.getOwnPropertySymbols ? stubArray : function(object) {
	var result = [];
	while (object) {
		arrayPush(result, getSymbols(object));
		object = getPrototype(object);
	}
	return result;
};
//#endregion
//#region node_modules/lodash-es/_copySymbolsIn.js
/**
* Copies own and inherited symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbolsIn(source, object) {
	return copyObject(source, getSymbolsIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_baseGetAllKeys.js
/**
* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
* `keysFunc` and `symbolsFunc` to get the enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Function} keysFunc The function to get the keys of `object`.
* @param {Function} symbolsFunc The function to get the symbols of `object`.
* @returns {Array} Returns the array of property names and symbols.
*/
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
//#endregion
//#region node_modules/lodash-es/_getAllKeys.js
/**
* Creates an array of own enumerable property names and symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeys(object) {
	return baseGetAllKeys(object, keys, getSymbols);
}
//#endregion
//#region node_modules/lodash-es/_getAllKeysIn.js
/**
* Creates an array of own and inherited enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeysIn(object) {
	return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
//#endregion
//#region node_modules/lodash-es/_DataView.js
var DataView$1 = getNative(root, "DataView");
//#endregion
//#region node_modules/lodash-es/_Promise.js
var Promise$1 = getNative(root, "Promise");
//#endregion
//#region node_modules/lodash-es/_Set.js
var Set$1 = getNative(root, "Set");
//#endregion
//#region node_modules/lodash-es/_getTag.js
/** `Object#toString` result references. */
var mapTag$4 = "[object Map]";
var objectTag$2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag$4 = "[object Set]";
var weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1);
var mapCtorString = toSource(Map$1);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set$1);
var weakMapCtorString = toSource(WeakMap$1);
/**
* Gets the `toStringTag` of `value`.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$4 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) getTag = function(value) {
	var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
	if (ctorString) switch (ctorString) {
		case dataViewCtorString: return dataViewTag$3;
		case mapCtorString: return mapTag$4;
		case promiseCtorString: return promiseTag;
		case setCtorString: return setTag$4;
		case weakMapCtorString: return weakMapTag$1;
	}
	return result;
};
var _getTag_default = getTag;
//#endregion
//#region node_modules/lodash-es/_initCloneArray.js
/** Used to check objects for own properties. */
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
/**
* Initializes an array clone.
*
* @private
* @param {Array} array The array to clone.
* @returns {Array} Returns the initialized clone.
*/
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty$4.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
/** Built-in value references. */
var Uint8Array$1 = root.Uint8Array;
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneDataView.js
/**
* Creates a clone of `dataView`.
*
* @private
* @param {Object} dataView The data view to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned data view.
*/
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
//#endregion
//#region node_modules/lodash-es/_cloneRegExp.js
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
* Creates a clone of `regexp`.
*
* @private
* @param {Object} regexp The regexp to clone.
* @returns {Object} Returns the cloned regexp.
*/
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneSymbol.js
/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0;
var symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
/**
* Creates a clone of the `symbol` object.
*
* @private
* @param {Object} symbol The symbol object to clone.
* @returns {Object} Returns the cloned symbol object.
*/
function cloneSymbol(symbol) {
	return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneByTag.js
/** `Object#toString` result references. */
var boolTag$2 = "[object Boolean]";
var dateTag$2 = "[object Date]";
var mapTag$3 = "[object Map]";
var numberTag$2 = "[object Number]";
var regexpTag$2 = "[object RegExp]";
var setTag$3 = "[object Set]";
var stringTag$2 = "[object String]";
var symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]";
var dataViewTag$2 = "[object DataView]";
var float32Tag$1 = "[object Float32Array]";
var float64Tag$1 = "[object Float64Array]";
var int8Tag$1 = "[object Int8Array]";
var int16Tag$1 = "[object Int16Array]";
var int32Tag$1 = "[object Int32Array]";
var uint8Tag$1 = "[object Uint8Array]";
var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
var uint16Tag$1 = "[object Uint16Array]";
var uint32Tag$1 = "[object Uint32Array]";
/**
* Initializes an object clone based on its `toStringTag`.
*
* **Note:** This function only supports cloning values with tags of
* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
*
* @private
* @param {Object} object The object to clone.
* @param {string} tag The `toStringTag` of the object to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$2: return cloneArrayBuffer(object);
		case boolTag$2:
		case dateTag$2: return new Ctor(+object);
		case dataViewTag$2: return cloneDataView(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return cloneTypedArray(object, isDeep);
		case mapTag$3: return new Ctor();
		case numberTag$2:
		case stringTag$2: return new Ctor(object);
		case regexpTag$2: return cloneRegExp(object);
		case setTag$3: return new Ctor();
		case symbolTag$2: return cloneSymbol(object);
	}
}
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
//#endregion
//#region node_modules/lodash-es/_baseIsMap.js
/** `Object#toString` result references. */
var mapTag$2 = "[object Map]";
/**
* The base implementation of `_.isMap` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
*/
function baseIsMap(value) {
	return isObjectLike(value) && _getTag_default(value) == mapTag$2;
}
//#endregion
//#region node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil && nodeUtil.isMap;
/**
* Checks if `value` is classified as a `Map` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
* @example
*
* _.isMap(new Map);
* // => true
*
* _.isMap(new WeakMap);
* // => false
*/
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
//#endregion
//#region node_modules/lodash-es/_baseIsSet.js
/** `Object#toString` result references. */
var setTag$2 = "[object Set]";
/**
* The base implementation of `_.isSet` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
*/
function baseIsSet(value) {
	return isObjectLike(value) && _getTag_default(value) == setTag$2;
}
//#endregion
//#region node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil && nodeUtil.isSet;
/**
* Checks if `value` is classified as a `Set` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
* @example
*
* _.isSet(new Set);
* // => true
*
* _.isSet(new WeakSet);
* // => false
*/
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
//#endregion
//#region node_modules/lodash-es/_baseClone.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;
/** `Object#toString` result references. */
var argsTag$1 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var errorTag$1 = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag$1 = "[object Map]";
var numberTag$1 = "[object Number]";
var objectTag$1 = "[object Object]";
var regexpTag$1 = "[object RegExp]";
var setTag$1 = "[object Set]";
var stringTag$1 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
/**
* The base implementation of `_.clone` and `_.cloneDeep` which tracks
* traversed objects.
*
* @private
* @param {*} value The value to clone.
* @param {boolean} bitmask The bitmask flags.
*  1 - Deep clone
*  2 - Flatten inherited properties
*  4 - Clone symbols
* @param {Function} [customizer] The function to customize cloning.
* @param {string} [key] The key of `value`.
* @param {Object} [object] The parent object of `value`.
* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
* @returns {*} Returns the cloned value.
*/
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject$1(value)) return value;
	var isArr = isArray$1(value);
	if (isArr) {
		result = initCloneArray(value);
		if (!isDeep) return copyArray(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer$1(value)) return cloneBuffer(value, isDeep);
		if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
			result = isFlat || isFunc ? {} : initCloneObject(value);
			if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = initCloneByTag(value, tag, isDeep);
		}
	}
	stack || (stack = new Stack());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet$1(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap(value)) value.forEach(function(subValue, key) {
		result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
	arrayEach(props || value, function(subValue, key) {
		if (props) {
			key = subValue;
			subValue = value[key];
		}
		assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/cloneDeep.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;
/**
* This method is like `_.clone` except that it recursively clones `value`.
*
* @static
* @memberOf _
* @since 1.0.0
* @category Lang
* @param {*} value The value to recursively clone.
* @returns {*} Returns the deep cloned value.
* @see _.clone
* @example
*
* var objects = [{ 'a': 1 }, { 'b': 2 }];
*
* var deep = _.cloneDeep(objects);
* console.log(deep[0] === objects[0]);
* // => false
*/
function cloneDeep(value) {
	return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
//#endregion
//#region node_modules/lodash-es/_setCacheAdd.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";
/**
* Adds `value` to the array cache.
*
* @private
* @name add
* @memberOf SetCache
* @alias push
* @param {*} value The value to cache.
* @returns {Object} Returns the cache instance.
*/
function setCacheAdd(value) {
	this.__data__.set(value, HASH_UNDEFINED);
	return this;
}
//#endregion
//#region node_modules/lodash-es/_setCacheHas.js
/**
* Checks if `value` is in the array cache.
*
* @private
* @name has
* @memberOf SetCache
* @param {*} value The value to search for.
* @returns {boolean} Returns `true` if `value` is found, else `false`.
*/
function setCacheHas(value) {
	return this.__data__.has(value);
}
//#endregion
//#region node_modules/lodash-es/_SetCache.js
/**
*
* Creates an array cache object to store unique values.
*
* @private
* @constructor
* @param {Array} [values] The values to cache.
*/
function SetCache(values) {
	var index = -1, length = values == null ? 0 : values.length;
	this.__data__ = new MapCache();
	while (++index < length) this.add(values[index]);
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
//#endregion
//#region node_modules/lodash-es/_arraySome.js
/**
* A specialized version of `_.some` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
*/
function arraySome(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (predicate(array[index], index, array)) return true;
	return false;
}
//#endregion
//#region node_modules/lodash-es/_cacheHas.js
/**
* Checks if a `cache` value for `key` exists.
*
* @private
* @param {Object} cache The cache to query.
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function cacheHas(cache, key) {
	return cache.has(key);
}
//#endregion
//#region node_modules/lodash-es/_equalArrays.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;
/**
* A specialized version of `baseIsEqualDeep` for arrays with support for
* partial deep comparisons.
*
* @private
* @param {Array} array The array to compare.
* @param {Array} other The other array to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `array` and `other` objects.
* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
*/
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
	if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
	var arrStacked = stack.get(array);
	var othStacked = stack.get(other);
	if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
	var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
	stack.set(array, other);
	stack.set(other, array);
	while (++index < arrLength) {
		var arrValue = array[index], othValue = other[index];
		if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
		if (compared !== void 0) {
			if (compared) continue;
			result = false;
			break;
		}
		if (seen) {
			if (!arraySome(other, function(othValue, othIndex) {
				if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
			})) {
				result = false;
				break;
			}
		} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
			result = false;
			break;
		}
	}
	stack["delete"](array);
	stack["delete"](other);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_mapToArray.js
/**
* Converts `map` to its key-value pairs.
*
* @private
* @param {Object} map The map to convert.
* @returns {Array} Returns the key-value pairs.
*/
function mapToArray(map) {
	var index = -1, result = Array(map.size);
	map.forEach(function(value, key) {
		result[++index] = [key, value];
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/_setToArray.js
/**
* Converts `set` to an array of its values.
*
* @private
* @param {Object} set The set to convert.
* @returns {Array} Returns the values.
*/
function setToArray(set) {
	var index = -1, result = Array(set.size);
	set.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/_equalByTag.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
/**
* A specialized version of `baseIsEqualDeep` for comparing objects of
* the same `toStringTag`.
*
* **Note:** This function only supports comparing values with tags of
* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {string} tag The `toStringTag` of the objects to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	switch (tag) {
		case dataViewTag:
			if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
			object = object.buffer;
			other = other.buffer;
		case arrayBufferTag:
			if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) return false;
			return true;
		case boolTag:
		case dateTag:
		case numberTag: return eq(+object, +other);
		case errorTag: return object.name == other.name && object.message == other.message;
		case regexpTag:
		case stringTag: return object == other + "";
		case mapTag: var convert = mapToArray;
		case setTag:
			var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
			convert || (convert = setToArray);
			if (object.size != other.size && !isPartial) return false;
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			bitmask |= COMPARE_UNORDERED_FLAG;
			stack.set(object, other);
			var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
			stack["delete"](object);
			return result;
		case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
	}
	return false;
}
//#endregion
//#region node_modules/lodash-es/_equalObjects.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;
/** Used to check objects for own properties. */
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
/**
* A specialized version of `baseIsEqualDeep` for objects with support for
* partial deep comparisons.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length;
	if (objLength != getAllKeys(other).length && !isPartial) return false;
	var index = objLength;
	while (index--) {
		var key = objProps[index];
		if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) return false;
	}
	var objStacked = stack.get(object);
	var othStacked = stack.get(other);
	if (objStacked && othStacked) return objStacked == other && othStacked == object;
	var result = true;
	stack.set(object, other);
	stack.set(other, object);
	var skipCtor = isPartial;
	while (++index < objLength) {
		key = objProps[index];
		var objValue = object[key], othValue = other[key];
		if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
		if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
			result = false;
			break;
		}
		skipCtor || (skipCtor = key == "constructor");
	}
	if (result && !skipCtor) {
		var objCtor = object.constructor, othCtor = other.constructor;
		if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
	}
	stack["delete"](object);
	stack["delete"](other);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqualDeep.js
/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var objectTag = "[object Object]";
/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
* A specialized version of `baseIsEqual` for arrays and objects which performs
* deep comparisons and tracks traversed objects enabling objects with circular
* references to be compared.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} [stack] Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : _getTag_default(object), othTag = othIsArr ? arrayTag : _getTag_default(other);
	objTag = objTag == argsTag ? objectTag : objTag;
	othTag = othTag == argsTag ? objectTag : othTag;
	var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
	if (isSameTag && isBuffer$1(object)) {
		if (!isBuffer$1(other)) return false;
		objIsArr = true;
		objIsObj = false;
	}
	if (isSameTag && !objIsObj) {
		stack || (stack = new Stack());
		return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	}
	if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
		var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
		if (objIsWrapped || othIsWrapped) {
			var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
			stack || (stack = new Stack());
			return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		}
	}
	if (!isSameTag) return false;
	stack || (stack = new Stack());
	return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqual.js
/**
* The base implementation of `_.isEqual` which supports partial comparisons
* and tracks traversed objects.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @param {boolean} bitmask The bitmask flags.
*  1 - Unordered comparison
*  2 - Partial comparison
* @param {Function} [customizer] The function to customize comparisons.
* @param {Object} [stack] Tracks traversed `value` and `other` objects.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
*/
function baseIsEqual(value, other, bitmask, customizer, stack) {
	if (value === other) return true;
	if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
	return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
//#endregion
//#region node_modules/lodash-es/_hasPath.js
/**
* Checks if `path` exists on `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @param {Function} hasFunc The function to check properties.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
*/
function hasPath(object, path, hasFunc) {
	path = castPath(path, object);
	var index = -1, length = path.length, result = false;
	while (++index < length) {
		var key = toKey(path[index]);
		if (!(result = object != null && hasFunc(object, key))) break;
		object = object[key];
	}
	if (result || ++index != length) return result;
	length = object == null ? 0 : object.length;
	return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments(object));
}
//#endregion
//#region node_modules/lodash-es/_createBaseFor.js
/**
* Creates a base function for methods like `_.forIn` and `_.forOwn`.
*
* @private
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseFor(fromRight) {
	return function(object, iteratee, keysFunc) {
		var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
		while (length--) {
			var key = props[fromRight ? length : ++index];
			if (iteratee(iterable[key], key, iterable) === false) break;
		}
		return object;
	};
}
//#endregion
//#region node_modules/lodash-es/_baseFor.js
/**
* The base implementation of `baseForOwn` which iterates over `object`
* properties returned by `keysFunc` and invokes `iteratee` for each property.
* Iteratee functions may exit iteration early by explicitly returning `false`.
*
* @private
* @param {Object} object The object to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {Function} keysFunc The function to get the keys of `object`.
* @returns {Object} Returns `object`.
*/
var baseFor = createBaseFor();
//#endregion
//#region node_modules/lodash-es/now.js
/**
* Gets the timestamp of the number of milliseconds that have elapsed since
* the Unix epoch (1 January 1970 00:00:00 UTC).
*
* @static
* @memberOf _
* @since 2.4.0
* @category Date
* @returns {number} Returns the timestamp.
* @example
*
* _.defer(function(stamp) {
*   console.log(_.now() - stamp);
* }, _.now());
* // => Logs the number of milliseconds it took for the deferred invocation.
*/
var now = function() {
	return root.Date.now();
};
//#endregion
//#region node_modules/lodash-es/debounce.js
/** Error message constants. */
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max;
var nativeMin = Math.min;
/**
* Creates a debounced function that delays invoking `func` until after `wait`
* milliseconds have elapsed since the last time the debounced function was
* invoked. The debounced function comes with a `cancel` method to cancel
* delayed `func` invocations and a `flush` method to immediately invoke them.
* Provide `options` to indicate whether `func` should be invoked on the
* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
* with the last arguments provided to the debounced function. Subsequent
* calls to the debounced function return the result of the last `func`
* invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the debounced function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.debounce` and `_.throttle`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to debounce.
* @param {number} [wait=0] The number of milliseconds to delay.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=false]
*  Specify invoking on the leading edge of the timeout.
* @param {number} [options.maxWait]
*  The maximum time `func` is allowed to be delayed before it's invoked.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new debounced function.
* @example
*
* // Avoid costly calculations while the window size is in flux.
* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
*
* // Invoke `sendMail` when clicked, debouncing subsequent calls.
* jQuery(element).on('click', _.debounce(sendMail, 300, {
*   'leading': true,
*   'trailing': false
* }));
*
* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
* var source = new EventSource('/stream');
* jQuery(source).on('message', debounced);
*
* // Cancel the trailing debounced invocation.
* jQuery(window).on('popstate', debounced.cancel);
*/
function debounce$1(func, wait, options) {
	var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	wait = toNumber(wait) || 0;
	if (isObject$1(options)) {
		leading = !!options.leading;
		maxing = "maxWait" in options;
		maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	function invokeFunc(time) {
		var args = lastArgs, thisArg = lastThis;
		lastArgs = lastThis = void 0;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}
	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}
	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
		return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	}
	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
		return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	}
	function timerExpired() {
		var time = now();
		if (shouldInvoke(time)) return trailingEdge(time);
		timerId = setTimeout(timerExpired, remainingWait(time));
	}
	function trailingEdge(time) {
		timerId = void 0;
		if (trailing && lastArgs) return invokeFunc(time);
		lastArgs = lastThis = void 0;
		return result;
	}
	function cancel() {
		if (timerId !== void 0) clearTimeout(timerId);
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timerId = void 0;
	}
	function flush() {
		return timerId === void 0 ? result : trailingEdge(now());
	}
	function debounced() {
		var time = now(), isInvoking = shouldInvoke(time);
		lastArgs = arguments;
		lastThis = this;
		lastCallTime = time;
		if (isInvoking) {
			if (timerId === void 0) return leadingEdge(lastCallTime);
			if (maxing) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invokeFunc(lastCallTime);
			}
		}
		if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
		return result;
	}
	debounced.cancel = cancel;
	debounced.flush = flush;
	return debounced;
}
//#endregion
//#region node_modules/lodash-es/_assignMergeValue.js
/**
* This function is like `assignValue` except that it doesn't assign
* `undefined` values.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignMergeValue(object, key, value) {
	if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/isArrayLikeObject.js
/**
* This method is like `_.isArrayLike` except that it also checks if `value`
* is an object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array-like object,
*  else `false`.
* @example
*
* _.isArrayLikeObject([1, 2, 3]);
* // => true
*
* _.isArrayLikeObject(document.body.children);
* // => true
*
* _.isArrayLikeObject('abc');
* // => false
*
* _.isArrayLikeObject(_.noop);
* // => false
*/
function isArrayLikeObject(value) {
	return isObjectLike(value) && isArrayLike(value);
}
//#endregion
//#region node_modules/lodash-es/_safeGet.js
/**
* Gets the value at `key`, unless `key` is "__proto__" or "constructor".
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function safeGet(object, key) {
	if (key === "constructor" && typeof object[key] === "function") return;
	if (key == "__proto__") return;
	return object[key];
}
//#endregion
//#region node_modules/lodash-es/toPlainObject.js
/**
* Converts `value` to a plain object flattening inherited enumerable string
* keyed properties of `value` to own properties of the plain object.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {Object} Returns the converted plain object.
* @example
*
* function Foo() {
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.assign({ 'a': 1 }, new Foo);
* // => { 'a': 1, 'b': 2 }
*
* _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
* // => { 'a': 1, 'b': 2, 'c': 3 }
*/
function toPlainObject(value) {
	return copyObject(value, keysIn(value));
}
//#endregion
//#region node_modules/lodash-es/_baseMergeDeep.js
/**
* A specialized version of `baseMerge` for arrays and objects which performs
* deep merges and tracks traversed objects enabling objects with circular
* references to be merged.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @param {string} key The key of the value to merge.
* @param {number} srcIndex The index of `source`.
* @param {Function} mergeFunc The function to merge values.
* @param {Function} [customizer] The function to customize assigned values.
* @param {Object} [stack] Tracks traversed source values and their merged
*  counterparts.
*/
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
	if (stacked) {
		assignMergeValue(object, key, stacked);
		return;
	}
	var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
	var isCommon = newValue === void 0;
	if (isCommon) {
		var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
		newValue = srcValue;
		if (isArr || isBuff || isTyped) {
			if (isArray$1(objValue)) newValue = objValue;
			else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
			else if (isBuff) {
				isCommon = false;
				newValue = cloneBuffer(srcValue, true);
			} else if (isTyped) {
				isCommon = false;
				newValue = cloneTypedArray(srcValue, true);
			} else newValue = [];
		} else if (isPlainObject$1(srcValue) || isArguments(srcValue)) {
			newValue = objValue;
			if (isArguments(objValue)) newValue = toPlainObject(objValue);
			else if (!isObject$1(objValue) || isFunction$2(objValue)) newValue = initCloneObject(srcValue);
		} else isCommon = false;
	}
	if (isCommon) {
		stack.set(srcValue, newValue);
		mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		stack["delete"](srcValue);
	}
	assignMergeValue(object, key, newValue);
}
//#endregion
//#region node_modules/lodash-es/_baseMerge.js
/**
* The base implementation of `_.merge` without support for multiple sources.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @param {number} srcIndex The index of `source`.
* @param {Function} [customizer] The function to customize merged values.
* @param {Object} [stack] Tracks traversed source values and their merged
*  counterparts.
*/
function baseMerge(object, source, srcIndex, customizer, stack) {
	if (object === source) return;
	baseFor(source, function(srcValue, key) {
		stack || (stack = new Stack());
		if (isObject$1(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
		else {
			var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
			if (newValue === void 0) newValue = srcValue;
			assignMergeValue(object, key, newValue);
		}
	}, keysIn);
}
//#endregion
//#region node_modules/lodash-es/_escapeHtmlChar.js
/**
* Used by `_.escape` to convert characters to HTML entities.
*
* @private
* @param {string} chr The matched character to escape.
* @returns {string} Returns the escaped character.
*/
var escapeHtmlChar = basePropertyOf({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
});
//#endregion
//#region node_modules/lodash-es/escape.js
/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
/**
* Converts the characters "&", "<", ">", '"', and "'" in `string` to their
* corresponding HTML entities.
*
* **Note:** No other characters are escaped. To escape additional
* characters use a third-party library like [_he_](https://mths.be/he).
*
* Though the ">" character is escaped for symmetry, characters like
* ">" and "/" don't need escaping in HTML and have no special meaning
* unless they're part of a tag or unquoted attribute value. See
* [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
* (under "semi-related fun fact") for more details.
*
* When working with HTML you should always
* [quote attribute values](http://wonko.com/post/html-escaping) to reduce
* XSS vectors.
*
* @static
* @since 0.1.0
* @memberOf _
* @category String
* @param {string} [string=''] The string to escape.
* @returns {string} Returns the escaped string.
* @example
*
* _.escape('fred, barney, & pebbles');
* // => 'fred, barney, &amp; pebbles'
*/
function escape$1(string) {
	string = toString$1(string);
	return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}
//#endregion
//#region node_modules/lodash-es/_baseHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.has` without support for deep paths.
*
* @private
* @param {Object} [object] The object to query.
* @param {Array|string} key The key to check.
* @returns {boolean} Returns `true` if `key` exists, else `false`.
*/
function baseHas(object, key) {
	return object != null && hasOwnProperty$1.call(object, key);
}
//#endregion
//#region node_modules/lodash-es/has.js
/**
* Checks if `path` is a direct property of `object`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
* @example
*
* var object = { 'a': { 'b': 2 } };
* var other = _.create({ 'a': _.create({ 'b': 2 }) });
*
* _.has(object, 'a');
* // => true
*
* _.has(object, 'a.b');
* // => true
*
* _.has(object, ['a', 'b']);
* // => true
*
* _.has(other, 'a');
* // => false
*/
function has(object, path) {
	return object != null && hasPath(object, path, baseHas);
}
//#endregion
//#region node_modules/lodash-es/isEqual.js
/**
* Performs a deep comparison between two values to determine if they are
* equivalent.
*
* **Note:** This method supports comparing arrays, array buffers, booleans,
* date objects, error objects, maps, numbers, `Object` objects, regexes,
* sets, strings, symbols, and typed arrays. `Object` objects are compared
* by their own, not inherited, enumerable properties. Functions and DOM
* nodes are compared by strict equality, i.e. `===`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.isEqual(object, other);
* // => true
*
* object === other;
* // => false
*/
function isEqual(value, other) {
	return baseIsEqual(value, other);
}
//#endregion
//#region node_modules/lodash-es/merge.js
/**
* This method is like `_.assign` except that it recursively merges own and
* inherited enumerable string keyed properties of source objects into the
* destination object. Source properties that resolve to `undefined` are
* skipped if a destination value exists. Array and plain object properties
* are merged recursively. Other objects and value types are overridden by
* assignment. Source objects are applied from left to right. Subsequent
* sources overwrite property assignments of previous sources.
*
* **Note:** This method mutates `object`.
*
* @static
* @memberOf _
* @since 0.5.0
* @category Object
* @param {Object} object The destination object.
* @param {...Object} [sources] The source objects.
* @returns {Object} Returns `object`.
* @example
*
* var object = {
*   'a': [{ 'b': 2 }, { 'd': 4 }]
* };
*
* var other = {
*   'a': [{ 'c': 3 }, { 'e': 5 }]
* };
*
* _.merge(object, other);
* // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
*/
var merge$1 = createAssigner(function(object, source, srcIndex) {
	baseMerge(object, source, srcIndex);
});
//#endregion
//#region node_modules/lodash-es/_baseSet.js
/**
* The base implementation of `_.set`.
*
* @private
* @param {Object} object The object to modify.
* @param {Array|string} path The path of the property to set.
* @param {*} value The value to set.
* @param {Function} [customizer] The function to customize path creation.
* @returns {Object} Returns `object`.
*/
function baseSet(object, path, value, customizer) {
	if (!isObject$1(object)) return object;
	path = castPath(path, object);
	var index = -1, length = path.length, lastIndex = length - 1, nested = object;
	while (nested != null && ++index < length) {
		var key = toKey(path[index]), newValue = value;
		if (key === "__proto__" || key === "constructor" || key === "prototype") return object;
		if (index != lastIndex) {
			var objValue = nested[key];
			newValue = customizer ? customizer(objValue, key, nested) : void 0;
			if (newValue === void 0) newValue = isObject$1(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
		}
		assignValue(nested, key, newValue);
		nested = nested[key];
	}
	return object;
}
//#endregion
//#region node_modules/lodash-es/set.js
/**
* Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
* it's created. Arrays are created for missing index properties while objects
* are created for all other missing properties. Use `_.setWith` to customize
* `path` creation.
*
* **Note:** This method mutates `object`.
*
* @static
* @memberOf _
* @since 3.7.0
* @category Object
* @param {Object} object The object to modify.
* @param {Array|string} path The path of the property to set.
* @param {*} value The value to set.
* @returns {Object} Returns `object`.
* @example
*
* var object = { 'a': [{ 'b': { 'c': 3 } }] };
*
* _.set(object, 'a[0].b.c', 4);
* console.log(object.a[0].b.c);
* // => 4
*
* _.set(object, ['x', '0', 'y', 'z'], 5);
* console.log(object.x[0].y.z);
* // => 5
*/
function set(object, path, value) {
	return object == null ? object : baseSet(object, path, value);
}
//#endregion
//#region node_modules/es-errors/type.js
var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./type')} */
	module.exports = TypeError;
}));
//#endregion
//#region node_modules/object-inspect/util.inspect.js
var require_util_inspect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("util").inspect;
}));
//#endregion
//#region node_modules/object-inspect/index.js
var require_object_inspect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasMap = typeof Map === "function" && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === "function" && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var weakMapHas = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap.prototype.has : null;
	var weakSetHas = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet.prototype.has : null;
	var weakRefDeref = typeof WeakRef === "function" && WeakRef.prototype ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
	var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
		return O.__proto__;
	} : null);
	function addNumericSeparator(num, str) {
		if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
		var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof num === "number") {
			var int = num < 0 ? -$floor(-num) : $floor(num);
			if (int !== num) {
				var intStr = String(int);
				var dec = $slice.call(str, intStr.length + 1);
				return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return $replace.call(str, sepRegex, "$&_");
	}
	var utilInspect = require_util_inspect();
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
	var quotes = {
		__proto__: null,
		"double": "\"",
		single: "'"
	};
	var quoteREs = {
		__proto__: null,
		"double": /(["\\])/g,
		single: /(['\\])/g
	};
	module.exports = function inspect_(obj, options, depth, seen) {
		var opts = options || {};
		if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) throw new TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
		if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var numericSeparator = opts.numericSeparator;
		if (typeof obj === "undefined") return "undefined";
		if (obj === null) return "null";
		if (typeof obj === "boolean") return obj ? "true" : "false";
		if (typeof obj === "string") return inspectString(obj, opts);
		if (typeof obj === "number") {
			if (obj === 0) return Infinity / obj > 0 ? "0" : "-0";
			var str = String(obj);
			return numericSeparator ? addNumericSeparator(obj, str) : str;
		}
		if (typeof obj === "bigint") {
			var bigIntStr = String(obj) + "n";
			return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
		}
		var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
		if (typeof depth === "undefined") depth = 0;
		if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray(obj) ? "[Array]" : "[Object]";
		var indent = getIndent(opts, depth);
		if (typeof seen === "undefined") seen = [];
		else if (indexOf(seen, obj) >= 0) return "[Circular]";
		function inspect(value, from, noIndent) {
			if (from) {
				seen = $arrSlice.call(seen);
				seen.push(from);
			}
			if (noIndent) {
				var newOpts = { depth: opts.depth };
				if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
				return inspect_(value, newOpts, depth + 1, seen);
			}
			return inspect_(value, opts, depth + 1, seen);
		}
		if (typeof obj === "function" && !isRegExp(obj)) {
			var name = nameOf(obj);
			var keys = arrObjKeys(obj, inspect);
			return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
		}
		if (isSymbol(obj)) {
			var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
			return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
		}
		if (isElement(obj)) {
			var s = "<" + $toLowerCase.call(String(obj.nodeName));
			var attrs = obj.attributes || [];
			for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
			s += ">";
			if (obj.childNodes && obj.childNodes.length) s += "...";
			s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
			return s;
		}
		if (isArray(obj)) {
			if (obj.length === 0) return "[]";
			var xs = arrObjKeys(obj, inspect);
			if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
			return "[ " + $join.call(xs, ", ") + " ]";
		}
		if (isError(obj)) {
			var parts = arrObjKeys(obj, inspect);
			if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
			if (parts.length === 0) return "[" + String(obj) + "]";
			return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
		}
		if (typeof obj === "object" && customInspect) {
			if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, { depth: maxDepth - depth });
			else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
		}
		if (isMap(obj)) {
			var mapParts = [];
			if (mapForEach) mapForEach.call(obj, function(value, key) {
				mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
			});
			return collectionOf("Map", mapSize.call(obj), mapParts, indent);
		}
		if (isSet(obj)) {
			var setParts = [];
			if (setForEach) setForEach.call(obj, function(value) {
				setParts.push(inspect(value, obj));
			});
			return collectionOf("Set", setSize.call(obj), setParts, indent);
		}
		if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
		if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
		if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
		if (isNumber(obj)) return markBoxed(inspect(Number(obj)));
		if (isBigInt(obj)) return markBoxed(inspect(bigIntValueOf.call(obj)));
		if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
		if (isString(obj)) return markBoxed(inspect(String(obj)));
		if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
		if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) return "{ [object globalThis] }";
		if (!isDate(obj) && !isRegExp(obj)) {
			var ys = arrObjKeys(obj, inspect);
			var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
			var protoTag = obj instanceof Object ? "" : "null prototype";
			var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
			var tag = (isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "") + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
			if (ys.length === 0) return tag + "{}";
			if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
			return tag + "{ " + $join.call(ys, ", ") + " }";
		}
		return String(obj);
	};
	function wrapQuotes(s, defaultStyle, opts) {
		var quoteChar = quotes[opts.quoteStyle || defaultStyle];
		return quoteChar + s + quoteChar;
	}
	function quote(s) {
		return $replace.call(String(s), /"/g, "&quot;");
	}
	function canTrustToString(obj) {
		return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
	}
	function isArray(obj) {
		return toStr(obj) === "[object Array]" && canTrustToString(obj);
	}
	function isDate(obj) {
		return toStr(obj) === "[object Date]" && canTrustToString(obj);
	}
	function isRegExp(obj) {
		return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
	}
	function isError(obj) {
		return toStr(obj) === "[object Error]" && canTrustToString(obj);
	}
	function isString(obj) {
		return toStr(obj) === "[object String]" && canTrustToString(obj);
	}
	function isNumber(obj) {
		return toStr(obj) === "[object Number]" && canTrustToString(obj);
	}
	function isBoolean(obj) {
		return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
	}
	function isSymbol(obj) {
		if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
		if (typeof obj === "symbol") return true;
		if (!obj || typeof obj !== "object" || !symToString) return false;
		try {
			symToString.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	function isBigInt(obj) {
		if (!obj || typeof obj !== "object" || !bigIntValueOf) return false;
		try {
			bigIntValueOf.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	var hasOwn = Object.prototype.hasOwnProperty || function(key) {
		return key in this;
	};
	function has(obj, key) {
		return hasOwn.call(obj, key);
	}
	function toStr(obj) {
		return objectToString.call(obj);
	}
	function nameOf(f) {
		if (f.name) return f.name;
		var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
		if (m) return m[1];
		return null;
	}
	function indexOf(xs, x) {
		if (xs.indexOf) return xs.indexOf(x);
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
	function isMap(x) {
		if (!mapSize || !x || typeof x !== "object") return false;
		try {
			mapSize.call(x);
			try {
				setSize.call(x);
			} catch (s) {
				return true;
			}
			return x instanceof Map;
		} catch (e) {}
		return false;
	}
	function isWeakMap(x) {
		if (!weakMapHas || !x || typeof x !== "object") return false;
		try {
			weakMapHas.call(x, weakMapHas);
			try {
				weakSetHas.call(x, weakSetHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakMap;
		} catch (e) {}
		return false;
	}
	function isWeakRef(x) {
		if (!weakRefDeref || !x || typeof x !== "object") return false;
		try {
			weakRefDeref.call(x);
			return true;
		} catch (e) {}
		return false;
	}
	function isSet(x) {
		if (!setSize || !x || typeof x !== "object") return false;
		try {
			setSize.call(x);
			try {
				mapSize.call(x);
			} catch (m) {
				return true;
			}
			return x instanceof Set;
		} catch (e) {}
		return false;
	}
	function isWeakSet(x) {
		if (!weakSetHas || !x || typeof x !== "object") return false;
		try {
			weakSetHas.call(x, weakSetHas);
			try {
				weakMapHas.call(x, weakMapHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakSet;
		} catch (e) {}
		return false;
	}
	function isElement(x) {
		if (!x || typeof x !== "object") return false;
		if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
		return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
	}
	function inspectString(str, opts) {
		if (str.length > opts.maxStringLength) {
			var remaining = str.length - opts.maxStringLength;
			var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
			return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
		}
		var quoteRE = quoteREs[opts.quoteStyle || "single"];
		quoteRE.lastIndex = 0;
		return wrapQuotes($replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte), "single", opts);
	}
	function lowbyte(c) {
		var n = c.charCodeAt(0);
		var x = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[n];
		if (x) return "\\" + x;
		return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
	}
	function markBoxed(str) {
		return "Object(" + str + ")";
	}
	function weakCollectionOf(type) {
		return type + " { ? }";
	}
	function collectionOf(type, size, entries, indent) {
		var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
		return type + " (" + size + ") {" + joinedEntries + "}";
	}
	function singleLineValues(xs) {
		for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
		return true;
	}
	function getIndent(opts, depth) {
		var baseIndent;
		if (opts.indent === "	") baseIndent = "	";
		else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " ");
		else return null;
		return {
			base: baseIndent,
			prev: $join.call(Array(depth + 1), baseIndent)
		};
	}
	function indentedJoin(xs, indent) {
		if (xs.length === 0) return "";
		var lineJoiner = "\n" + indent.prev + indent.base;
		return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
	}
	function arrObjKeys(obj, inspect) {
		var isArr = isArray(obj);
		var xs = [];
		if (isArr) {
			xs.length = obj.length;
			for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
		}
		var syms = typeof gOPS === "function" ? gOPS(obj) : [];
		var symMap;
		if (hasShammedSymbols) {
			symMap = {};
			for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
		}
		for (var key in obj) {
			if (!has(obj, key)) continue;
			if (isArr && String(Number(key)) === key && key < obj.length) continue;
			if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue;
			else if ($test.call(/[^\w$]/, key)) xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
			else xs.push(key + ": " + inspect(obj[key], obj));
		}
		if (typeof gOPS === "function") {
			for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
		}
		return xs;
	}
}));
//#endregion
//#region node_modules/side-channel-list/index.js
var require_side_channel_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var inspect = require_object_inspect();
	var $TypeError = require_type();
	/** @type {import('./list.d.ts').listGetNode} */
	var listGetNode = function(list, key, isDelete) {
		/** @type {typeof list | NonNullable<(typeof list)['next']>} */
		var prev = list;
		/** @type {(typeof list)['next']} */
		var curr;
		for (; (curr = prev.next) != null; prev = curr) if (curr.key === key) {
			prev.next = curr.next;
			if (!isDelete) {
				curr.next = list.next;
				list.next = curr;
			}
			return curr;
		}
	};
	/** @type {import('./list.d.ts').listGet} */
	var listGet = function(objects, key) {
		if (!objects) return;
		var node = listGetNode(objects, key);
		return node && node.value;
	};
	/** @type {import('./list.d.ts').listSet} */
	var listSet = function(objects, key, value) {
		var node = listGetNode(objects, key);
		if (node) node.value = value;
		else objects.next = {
			key,
			next: objects.next,
			value
		};
	};
	/** @type {import('./list.d.ts').listHas} */
	var listHas = function(objects, key) {
		if (!objects) return false;
		return !!listGetNode(objects, key);
	};
	/** @type {import('./list.d.ts').listDelete} */
	var listDelete = function(objects, key) {
		if (objects) return listGetNode(objects, key, true);
	};
	/** @type {import('.')} */
	module.exports = function getSideChannelList() {
		/** @typedef {ReturnType<typeof getSideChannelList>} Channel */
		/** @typedef {Parameters<Channel['get']>[0]} K */
		/** @typedef {Parameters<Channel['set']>[1]} V */
		/** @type {import('./list.d.ts').RootNode<V, K> | undefined} */ var $o;
		/** @type {Channel} */
		var channel = {
			assert: function(key) {
				if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
			},
			"delete": function(key) {
				var deletedNode = listDelete($o, key);
				if (deletedNode && $o && !$o.next) $o = void 0;
				return !!deletedNode;
			},
			get: function(key) {
				return listGet($o, key);
			},
			has: function(key) {
				return listHas($o, key);
			},
			set: function(key, value) {
				if (!$o) $o = { next: void 0 };
				listSet($o, key, value);
			}
		};
		return channel;
	};
}));
//#endregion
//#region node_modules/es-object-atoms/index.js
var require_es_object_atoms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Object;
}));
//#endregion
//#region node_modules/es-errors/index.js
var require_es_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Error;
}));
//#endregion
//#region node_modules/es-errors/eval.js
var require_eval = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./eval')} */
	module.exports = EvalError;
}));
//#endregion
//#region node_modules/es-errors/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./range')} */
	module.exports = RangeError;
}));
//#endregion
//#region node_modules/es-errors/ref.js
var require_ref = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./ref')} */
	module.exports = ReferenceError;
}));
//#endregion
//#region node_modules/es-errors/syntax.js
var require_syntax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./syntax')} */
	module.exports = SyntaxError;
}));
//#endregion
//#region node_modules/es-errors/uri.js
var require_uri = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./uri')} */
	module.exports = URIError;
}));
//#endregion
//#region node_modules/math-intrinsics/abs.js
var require_abs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./abs')} */
	module.exports = Math.abs;
}));
//#endregion
//#region node_modules/math-intrinsics/floor.js
var require_floor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./floor')} */
	module.exports = Math.floor;
}));
//#endregion
//#region node_modules/math-intrinsics/max.js
var require_max = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./max')} */
	module.exports = Math.max;
}));
//#endregion
//#region node_modules/math-intrinsics/min.js
var require_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./min')} */
	module.exports = Math.min;
}));
//#endregion
//#region node_modules/math-intrinsics/pow.js
var require_pow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./pow')} */
	module.exports = Math.pow;
}));
//#endregion
//#region node_modules/math-intrinsics/round.js
var require_round = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./round')} */
	module.exports = Math.round;
}));
//#endregion
//#region node_modules/math-intrinsics/isNaN.js
var require_isNaN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./isNaN')} */
	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};
}));
//#endregion
//#region node_modules/math-intrinsics/sign.js
var require_sign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $isNaN = require_isNaN();
	/** @type {import('./sign')} */
	module.exports = function sign(number) {
		if ($isNaN(number) || number === 0) return number;
		return number < 0 ? -1 : 1;
	};
}));
//#endregion
//#region node_modules/gopd/gOPD.js
var require_gOPD = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./gOPD')} */
	module.exports = Object.getOwnPropertyDescriptor;
}));
//#endregion
//#region node_modules/gopd/index.js
var require_gopd = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $gOPD = require_gOPD();
	if ($gOPD) try {
		$gOPD([], "length");
	} catch (e) {
		$gOPD = null;
	}
	module.exports = $gOPD;
}));
//#endregion
//#region node_modules/es-define-property/index.js
var require_es_define_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $defineProperty = Object.defineProperty || false;
	if ($defineProperty) try {
		$defineProperty({}, "a", { value: 1 });
	} catch (e) {
		$defineProperty = false;
	}
	module.exports = $defineProperty;
}));
//#endregion
//#region node_modules/has-symbols/shams.js
var require_shams$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./shams')} */
	module.exports = function hasSymbols() {
		if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
		if (typeof Symbol.iterator === "symbol") return true;
		/** @type {{ [k in symbol]?: unknown }} */
		var obj = {};
		var sym = Symbol("test");
		var symObj = Object(sym);
		if (typeof sym === "string") return false;
		if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
		if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
		var symVal = 42;
		obj[sym] = symVal;
		for (var _ in obj) return false;
		if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
		if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) return false;
		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
		if (typeof Object.getOwnPropertyDescriptor === "function") {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
		}
		return true;
	};
}));
//#endregion
//#region node_modules/has-symbols/index.js
var require_has_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var origSymbol = typeof Symbol !== "undefined" && Symbol;
	var hasSymbolSham = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== "function") return false;
		if (typeof Symbol !== "function") return false;
		if (typeof origSymbol("foo") !== "symbol") return false;
		if (typeof Symbol("bar") !== "symbol") return false;
		return hasSymbolSham();
	};
}));
//#endregion
//#region node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Reflect.getPrototypeOf')} */
	module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
}));
//#endregion
//#region node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Object.getPrototypeOf')} */
	module.exports = require_es_object_atoms().getPrototypeOf || null;
}));
//#endregion
//#region node_modules/function-bind/implementation.js
var require_implementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
	var toStr = Object.prototype.toString;
	var max = Math.max;
	var funcType = "[object Function]";
	var concatty = function concatty(a, b) {
		var arr = [];
		for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
		for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
		return arr;
	};
	var slicy = function slicy(arrLike, offset) {
		var arr = [];
		for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
		return arr;
	};
	var joiny = function(arr, joiner) {
		var str = "";
		for (var i = 0; i < arr.length; i += 1) {
			str += arr[i];
			if (i + 1 < arr.length) str += joiner;
		}
		return str;
	};
	module.exports = function bind(that) {
		var target = this;
		if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
		var args = slicy(arguments, 1);
		var bound;
		var binder = function() {
			if (this instanceof bound) {
				var result = target.apply(this, concatty(args, arguments));
				if (Object(result) === result) return result;
				return this;
			}
			return target.apply(that, concatty(args, arguments));
		};
		var boundLength = max(0, target.length - args.length);
		var boundArgs = [];
		for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
		bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
		if (target.prototype) {
			var Empty = function Empty() {};
			Empty.prototype = target.prototype;
			bound.prototype = new Empty();
			Empty.prototype = null;
		}
		return bound;
	};
}));
//#endregion
//#region node_modules/function-bind/index.js
var require_function_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation = require_implementation();
	module.exports = Function.prototype.bind || implementation;
}));
//#endregion
//#region node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionCall')} */
	module.exports = Function.prototype.call;
}));
//#endregion
//#region node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionApply')} */
	module.exports = Function.prototype.apply;
}));
//#endregion
//#region node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./reflectApply')} */
	module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
}));
//#endregion
//#region node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	/** @type {import('./actualApply')} */
	module.exports = require_reflectApply() || bind.call($call, $apply);
}));
//#endregion
//#region node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $TypeError = require_type();
	var $call = require_functionCall();
	var $actualApply = require_actualApply();
	/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
	module.exports = function callBindBasic(args) {
		if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError("a function is required");
		return $actualApply(bind, $call, args);
	};
}));
//#endregion
//#region node_modules/dunder-proto/get.js
var require_get = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBind = require_call_bind_apply_helpers();
	var gOPD = require_gopd();
	var hasProtoAccessor;
	try {
		hasProtoAccessor = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
	var $Object = Object;
	var $getPrototypeOf = $Object.getPrototypeOf;
	/** @type {import('./get')} */
	module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
		return $getPrototypeOf(value == null ? value : $Object(value));
	} : false;
}));
//#endregion
//#region node_modules/get-proto/index.js
var require_get_proto = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reflectGetProto = require_Reflect_getPrototypeOf();
	var originalGetProto = require_Object_getPrototypeOf();
	var getDunderProto = require_get();
	/** @type {import('.')} */
	module.exports = reflectGetProto ? function getProto(O) {
		return reflectGetProto(O);
	} : originalGetProto ? function getProto(O) {
		if (!O || typeof O !== "object" && typeof O !== "function") throw new TypeError("getProto: not an object");
		return originalGetProto(O);
	} : getDunderProto ? function getProto(O) {
		return getDunderProto(O);
	} : null;
}));
//#endregion
//#region node_modules/hasown/index.js
var require_hasown = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	/** @type {import('.')} */
	module.exports = require_function_bind().call(call, $hasOwn);
}));
//#endregion
//#region node_modules/get-intrinsic/index.js
var require_get_intrinsic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var undefined;
	var $Object = require_es_object_atoms();
	var $Error = require_es_errors();
	var $EvalError = require_eval();
	var $RangeError = require_range();
	var $ReferenceError = require_ref();
	var $SyntaxError = require_syntax();
	var $TypeError = require_type();
	var $URIError = require_uri();
	var abs = require_abs();
	var floor = require_floor();
	var max = require_max();
	var min = require_min();
	var pow = require_pow();
	var round = require_round();
	var sign = require_sign();
	var $Function = Function;
	var getEvalledConstructor = function(expressionSyntax) {
		try {
			return $Function("\"use strict\"; return (" + expressionSyntax + ").constructor;")();
		} catch (e) {}
	};
	var $gOPD = require_gopd();
	var $defineProperty = require_es_define_property();
	var throwTypeError = function() {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD ? function() {
		try {
			arguments.callee;
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				return $gOPD(arguments, "callee").get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}() : throwTypeError;
	var hasSymbols = require_has_symbols()();
	var getProto = require_get_proto();
	var $ObjectGPO = require_Object_getPrototypeOf();
	var $ReflectGPO = require_Reflect_getPrototypeOf();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	var needsEval = {};
	var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined : getProto(Uint8Array);
	var INTRINSICS = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError === "undefined" ? undefined : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
		"%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
		"%AsyncFromSyncIteratorPrototype%": undefined,
		"%AsyncFunction%": needsEval,
		"%AsyncGenerator%": needsEval,
		"%AsyncGeneratorFunction%": needsEval,
		"%AsyncIteratorPrototype%": needsEval,
		"%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
		"%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
		"%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView === "undefined" ? undefined : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": $Error,
		"%eval%": eval,
		"%EvalError%": $EvalError,
		"%Float16Array%": typeof Float16Array === "undefined" ? undefined : Float16Array,
		"%Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
		"%Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined : FinalizationRegistry,
		"%Function%": $Function,
		"%GeneratorFunction%": needsEval,
		"%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
		"%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
		"%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
		"%JSON%": typeof JSON === "object" ? JSON : undefined,
		"%Map%": typeof Map === "undefined" ? undefined : Map,
		"%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": $Object,
		"%Object.getOwnPropertyDescriptor%": $gOPD,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise === "undefined" ? undefined : Promise,
		"%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
		"%RangeError%": $RangeError,
		"%ReferenceError%": $ReferenceError,
		"%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set === "undefined" ? undefined : Set,
		"%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
		"%Symbol%": hasSymbols ? Symbol : undefined,
		"%SyntaxError%": $SyntaxError,
		"%ThrowTypeError%": ThrowTypeError,
		"%TypedArray%": TypedArray,
		"%TypeError%": $TypeError,
		"%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
		"%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
		"%URIError%": $URIError,
		"%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
		"%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
		"%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,
		"%Function.prototype.call%": $call,
		"%Function.prototype.apply%": $apply,
		"%Object.defineProperty%": $defineProperty,
		"%Object.getPrototypeOf%": $ObjectGPO,
		"%Math.abs%": abs,
		"%Math.floor%": floor,
		"%Math.max%": max,
		"%Math.min%": min,
		"%Math.pow%": pow,
		"%Math.round%": round,
		"%Math.sign%": sign,
		"%Reflect.getPrototypeOf%": $ReflectGPO
	};
	if (getProto) try {
		null.error;
	} catch (e) {
		INTRINSICS["%Error.prototype%"] = getProto(getProto(e));
	}
	var doEval = function doEval(name) {
		var value;
		if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
		else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
		else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
		else if (name === "%AsyncGenerator%") {
			var fn = doEval("%AsyncGeneratorFunction%");
			if (fn) value = fn.prototype;
		} else if (name === "%AsyncIteratorPrototype%") {
			var gen = doEval("%AsyncGenerator%");
			if (gen && getProto) value = getProto(gen.prototype);
		}
		INTRINSICS[name] = value;
		return value;
	};
	var LEGACY_ALIASES = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	};
	var bind = require_function_bind();
	var hasOwn = require_hasown();
	var $concat = bind.call($call, Array.prototype.concat);
	var $spliceApply = bind.call($apply, Array.prototype.splice);
	var $replace = bind.call($call, String.prototype.replace);
	var $strSlice = bind.call($call, String.prototype.slice);
	var $exec = bind.call($call, RegExp.prototype.exec);
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
		else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
		var result = [];
		$replace(string, rePropName, function(match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
		});
		return result;
	};
	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = "%" + alias[0] + "%";
		}
		if (hasOwn(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) value = doEval(intrinsicName);
			if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
			return {
				alias,
				name: intrinsicName,
				value
			};
		}
		throw new $SyntaxError("intrinsic " + name + " does not exist!");
	};
	module.exports = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError("\"allowMissing\" argument must be a boolean");
		if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
		var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;
		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}
		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if ((first === "\"" || first === "'" || first === "`" || last === "\"" || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
			if (part === "constructor" || !isOwn) skipFurtherCaching = true;
			intrinsicBaseName += "." + part;
			intrinsicRealName = "%" + intrinsicBaseName + "%";
			if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
			else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
					return;
				}
				if ($gOPD && i + 1 >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;
					if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get;
					else value = value[part];
				} else {
					isOwn = hasOwn(value, part);
					value = value[part];
				}
				if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
			}
		}
		return value;
	};
}));
//#endregion
//#region node_modules/call-bound/index.js
var require_call_bound = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var callBindBasic = require_call_bind_apply_helpers();
	/** @type {(thisArg: string, searchString: string, position?: number) => number} */
	var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
	/** @type {import('.')} */
	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) return callBindBasic([intrinsic]);
		return intrinsic;
	};
}));
//#endregion
//#region node_modules/side-channel-map/index.js
var require_side_channel_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var callBound = require_call_bound();
	var inspect = require_object_inspect();
	var $TypeError = require_type();
	var $Map = GetIntrinsic("%Map%", true);
	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => V} */
	var $mapGet = callBound("Map.prototype.get", true);
	/** @type {<K, V>(thisArg: Map<K, V>, key: K, value: V) => void} */
	var $mapSet = callBound("Map.prototype.set", true);
	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */
	var $mapHas = callBound("Map.prototype.has", true);
	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */
	var $mapDelete = callBound("Map.prototype.delete", true);
	/** @type {<K, V>(thisArg: Map<K, V>) => number} */
	var $mapSize = callBound("Map.prototype.size", true);
	/** @type {import('.')} */
	module.exports = !!$Map && function getSideChannelMap() {
		/** @typedef {ReturnType<typeof getSideChannelMap>} Channel */
		/** @typedef {Parameters<Channel['get']>[0]} K */
		/** @typedef {Parameters<Channel['set']>[1]} V */
		/** @type {Map<K, V> | undefined} */ var $m;
		/** @type {Channel} */
		var channel = {
			assert: function(key) {
				if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
			},
			"delete": function(key) {
				if ($m) {
					var result = $mapDelete($m, key);
					if ($mapSize($m) === 0) $m = void 0;
					return result;
				}
				return false;
			},
			get: function(key) {
				if ($m) return $mapGet($m, key);
			},
			has: function(key) {
				if ($m) return $mapHas($m, key);
				return false;
			},
			set: function(key, value) {
				if (!$m) $m = new $Map();
				$mapSet($m, key, value);
			}
		};
		return channel;
	};
}));
//#endregion
//#region node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var callBound = require_call_bound();
	var inspect = require_object_inspect();
	var getSideChannelMap = require_side_channel_map();
	var $TypeError = require_type();
	var $WeakMap = GetIntrinsic("%WeakMap%", true);
	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => V} */
	var $weakMapGet = callBound("WeakMap.prototype.get", true);
	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K, value: V) => void} */
	var $weakMapSet = callBound("WeakMap.prototype.set", true);
	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */
	var $weakMapHas = callBound("WeakMap.prototype.has", true);
	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */
	var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
	/** @type {import('.')} */
	module.exports = $WeakMap ? function getSideChannelWeakMap() {
		/** @typedef {ReturnType<typeof getSideChannelWeakMap>} Channel */
		/** @typedef {Parameters<Channel['get']>[0]} K */
		/** @typedef {Parameters<Channel['set']>[1]} V */
		/** @type {WeakMap<K & object, V> | undefined} */ var $wm;
		/** @type {Channel | undefined} */ var $m;
		/** @type {Channel} */
		var channel = {
			assert: function(key) {
				if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
			},
			"delete": function(key) {
				if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
					if ($wm) return $weakMapDelete($wm, key);
				} else if (getSideChannelMap) {
					if ($m) return $m["delete"](key);
				}
				return false;
			},
			get: function(key) {
				if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
					if ($wm) return $weakMapGet($wm, key);
				}
				return $m && $m.get(key);
			},
			has: function(key) {
				if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
					if ($wm) return $weakMapHas($wm, key);
				}
				return !!$m && $m.has(key);
			},
			set: function(key, value) {
				if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
					if (!$wm) $wm = new $WeakMap();
					$weakMapSet($wm, key, value);
				} else if (getSideChannelMap) {
					if (!$m) $m = getSideChannelMap();
					/** @type {NonNullable<typeof $m>} */ $m.set(key, value);
				}
			}
		};
		return channel;
	} : getSideChannelMap;
}));
//#endregion
//#region node_modules/side-channel/index.js
var require_side_channel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $TypeError = require_type();
	var inspect = require_object_inspect();
	var getSideChannelList = require_side_channel_list();
	var getSideChannelMap = require_side_channel_map();
	var makeChannel = require_side_channel_weakmap() || getSideChannelMap || getSideChannelList;
	/** @type {import('.')} */
	module.exports = function getSideChannel() {
		/** @typedef {ReturnType<typeof getSideChannel>} Channel */
		/** @type {Channel | undefined} */ var $channelData;
		/** @type {Channel} */
		var channel = {
			assert: function(key) {
				if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + (key && Object(key) === key ? "the given object key" : inspect(key)));
			},
			"delete": function(key) {
				return !!$channelData && $channelData["delete"](key);
			},
			get: function(key) {
				return $channelData && $channelData.get(key);
			},
			has: function(key) {
				return !!$channelData && $channelData.has(key);
			},
			set: function(key, value) {
				if (!$channelData) $channelData = makeChannel();
				$channelData.set(key, value);
			}
		};
		return channel;
	};
}));
//#endregion
//#region node_modules/qs/lib/formats.js
var require_formats = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;
	var Format = {
		RFC1738: "RFC1738",
		RFC3986: "RFC3986"
	};
	module.exports = {
		"default": Format.RFC3986,
		formatters: {
			RFC1738: function(value) {
				return replace.call(value, percentTwenties, "+");
			},
			RFC3986: function(value) {
				return String(value);
			}
		},
		RFC1738: Format.RFC1738,
		RFC3986: Format.RFC3986
	};
}));
//#endregion
//#region node_modules/qs/lib/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var formats = require_formats();
	var getSideChannel = require_side_channel();
	var defineProperty = require_es_define_property();
	var has = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var overflowChannel = getSideChannel();
	var markOverflow = function markOverflow(obj, maxIndex) {
		overflowChannel.set(obj, maxIndex);
		return obj;
	};
	var isOverflow = function isOverflow(obj) {
		return overflowChannel.has(obj);
	};
	var getMaxIndex = function getMaxIndex(obj) {
		return overflowChannel.get(obj);
	};
	var setMaxIndex = function setMaxIndex(obj, maxIndex) {
		overflowChannel.set(obj, maxIndex);
	};
	var hexTable = function() {
		var array = [];
		for (var i = 0; i < 256; ++i) array[array.length] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
		return array;
	}();
	var compactQueue = function compactQueue(queue) {
		while (queue.length > 1) {
			var item = queue.pop();
			var obj = item.obj[item.prop];
			if (isArray(obj)) {
				var compacted = [];
				for (var j = 0; j < obj.length; ++j) if (typeof obj[j] !== "undefined") compacted[compacted.length] = obj[j];
				item.obj[item.prop] = compacted;
			}
		}
	};
	var arrayToObject = function arrayToObject(source, options) {
		var obj = options && options.plainObjects ? { __proto__: null } : {};
		for (var i = 0; i < source.length; ++i) if (typeof source[i] !== "undefined") obj[i] = source[i];
		return obj;
	};
	var setProperty = function setProperty(obj, key, value) {
		if (key === "__proto__" && defineProperty) defineProperty(obj, key, {
			configurable: true,
			enumerable: true,
			value,
			writable: true
		});
		else obj[key] = value;
	};
	var merge = function merge(target, source, options) {
		if (!source) return target;
		if (typeof source !== "object" && typeof source !== "function") {
			if (isArray(target)) {
				var nextIndex = target.length;
				if (options && typeof options.arrayLimit === "number" && nextIndex >= options.arrayLimit) {
					if (options.throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
					return markOverflow(arrayToObject(target.concat(source), options), nextIndex);
				}
				target[nextIndex] = source;
			} else if (target && typeof target === "object") {
				if (isOverflow(target)) {
					var newIndex = getMaxIndex(target) + 1;
					target[newIndex] = source;
					setMaxIndex(target, newIndex);
				} else if (options && options.strictMerge) return [target, source];
				else if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) target[source] = true;
			} else return [target, source];
			return target;
		}
		if (!target || typeof target !== "object") {
			if (isOverflow(source)) {
				var sourceKeys = Object.keys(source);
				var result = options && options.plainObjects ? {
					__proto__: null,
					0: target
				} : { 0: target };
				for (var m = 0; m < sourceKeys.length; m++) {
					var oldKey = parseInt(sourceKeys[m], 10);
					result[oldKey + 1] = source[sourceKeys[m]];
				}
				return markOverflow(result, getMaxIndex(source) + 1);
			}
			var combined = [target].concat(source);
			if (options && typeof options.arrayLimit === "number" && combined.length > options.arrayLimit) {
				if (options.throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
				return markOverflow(arrayToObject(combined, options), combined.length - 1);
			}
			return combined;
		}
		var mergeTarget = target;
		if (isArray(target) && !isArray(source)) mergeTarget = arrayToObject(target, options);
		if (isArray(target) && isArray(source)) {
			source.forEach(function(item, i) {
				if (has.call(target, i)) {
					var targetItem = target[i];
					if (targetItem && typeof targetItem === "object" && item && typeof item === "object") target[i] = merge(targetItem, item, options);
					else target[target.length] = item;
				} else target[i] = item;
			});
			if (options && typeof options.arrayLimit === "number" && target.length > options.arrayLimit) {
				if (options.throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
				return markOverflow(arrayToObject(target, options), target.length - 1);
			}
			return target;
		}
		return Object.keys(source).reduce(function(acc, key) {
			var value = source[key];
			if (has.call(acc, key)) setProperty(acc, key, merge(acc[key], value, options));
			else setProperty(acc, key, value);
			if (isOverflow(source) && !isOverflow(acc)) markOverflow(acc, getMaxIndex(source));
			if (isOverflow(acc)) {
				var keyNum = parseInt(key, 10);
				if (String(keyNum) === key && keyNum >= 0 && keyNum > getMaxIndex(acc)) setMaxIndex(acc, keyNum);
			}
			return acc;
		}, mergeTarget);
	};
	var assign = function assignSingleSource(target, source) {
		return Object.keys(source).reduce(function(acc, key) {
			setProperty(acc, key, source[key]);
			return acc;
		}, target);
	};
	var decode = function(str, defaultDecoder, charset) {
		var strWithoutPlus = str.replace(/\+/g, " ");
		if (charset === "iso-8859-1") return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
		try {
			return decodeURIComponent(strWithoutPlus);
		} catch (e) {
			return strWithoutPlus;
		}
	};
	var limit = 1024;
	module.exports = {
		arrayToObject,
		assign,
		combine: function combine(a, b, arrayLimit, plainObjects, throwOnLimitExceeded) {
			if (isOverflow(a)) {
				if (throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
				var newIndex = getMaxIndex(a) + 1;
				a[newIndex] = b;
				setMaxIndex(a, newIndex);
				return a;
			}
			var result = [].concat(a, b);
			if (result.length > arrayLimit) {
				if (throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
				return markOverflow(arrayToObject(result, { plainObjects }), result.length - 1);
			}
			return result;
		},
		compact: function compact(value) {
			var queue = [{
				obj: { o: value },
				prop: "o"
			}];
			var refs = getSideChannel();
			for (var i = 0; i < queue.length; ++i) {
				var item = queue[i];
				var obj = item.obj[item.prop];
				var keys = Object.keys(obj);
				for (var j = 0; j < keys.length; ++j) {
					var key = keys[j];
					var val = obj[key];
					if (typeof val === "object" && val !== null && !refs.has(val)) {
						queue[queue.length] = {
							obj,
							prop: key
						};
						refs.set(val, true);
					}
				}
			}
			compactQueue(queue);
			return value;
		},
		decode,
		encode: function encode(str, defaultEncoder, charset, kind, format) {
			if (str.length === 0) return str;
			var string = str;
			if (typeof str === "symbol") string = Symbol.prototype.toString.call(str);
			else if (typeof str !== "string") string = String(str);
			if (charset === "iso-8859-1") return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
				return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
			});
			var out = "";
			for (var j = 0; j < string.length; j += limit) {
				var segment = string.length >= limit ? string.slice(j, j + limit) : string;
				if (j + limit < string.length) {
					var last = segment.charCodeAt(segment.length - 1);
					if (last >= 55296 && last <= 56319) {
						segment = segment.slice(0, -1);
						j -= 1;
					}
				}
				var arr = [];
				for (var i = 0; i < segment.length; ++i) {
					var c = segment.charCodeAt(i);
					if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
						arr[arr.length] = segment.charAt(i);
						continue;
					}
					if (c < 128) {
						arr[arr.length] = hexTable[c];
						continue;
					}
					if (c < 2048) {
						arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
						continue;
					}
					if (c < 55296 || c >= 57344) {
						arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
						continue;
					}
					i += 1;
					c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
					arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
				}
				out += arr.join("");
			}
			return out;
		},
		isBuffer: function isBuffer(obj) {
			if (!obj || typeof obj !== "object") return false;
			return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
		},
		isOverflow,
		isRegExp: function isRegExp(obj) {
			return Object.prototype.toString.call(obj) === "[object RegExp]";
		},
		markOverflow,
		maybeMap: function maybeMap(val, fn) {
			if (isArray(val)) {
				var mapped = [];
				for (var i = 0; i < val.length; i += 1) mapped[mapped.length] = fn(val[i]);
				return mapped;
			}
			return fn(val);
		},
		merge
	};
}));
//#endregion
//#region node_modules/qs/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getSideChannel = require_side_channel();
	var utils = require_utils();
	var formats = require_formats();
	var has = Object.prototype.hasOwnProperty;
	var arrayPrefixGenerators = {
		brackets: function brackets(prefix) {
			return prefix + "[]";
		},
		comma: "comma",
		indices: function indices(prefix, key) {
			return prefix + "[" + key + "]";
		},
		repeat: function repeat(prefix) {
			return prefix;
		}
	};
	var isArray = Array.isArray;
	var push = Array.prototype.push;
	var pushToArray = function(arr, valueOrArray) {
		push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
	};
	var toISO = Date.prototype.toISOString;
	var defaultFormat = formats["default"];
	var defaults = {
		addQueryPrefix: false,
		allowDots: false,
		allowEmptyArrays: false,
		arrayFormat: "indices",
		charset: "utf-8",
		charsetSentinel: false,
		commaRoundTrip: false,
		delimiter: "&",
		encode: true,
		encodeDotInKeys: false,
		encoder: utils.encode,
		encodeValuesOnly: false,
		filter: void 0,
		format: defaultFormat,
		formatter: formats.formatters[defaultFormat],
		indices: false,
		serializeDate: function serializeDate(date) {
			return toISO.call(date);
		},
		skipNulls: false,
		strictNullHandling: false
	};
	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
		return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
	};
	var sentinel = {};
	var stringify = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
		var obj = object;
		var tmpSc = sideChannel;
		var step = 0;
		var findFlag = false;
		while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
			var pos = tmpSc.get(object);
			step += 1;
			if (typeof pos !== "undefined") {
				if (pos === step) throw new RangeError("Cyclic object value");
				else findFlag = true;
			}
			if (typeof tmpSc.get(sentinel) === "undefined") step = 0;
		}
		if (typeof filter === "function") obj = filter(prefix, obj);
		else if (obj instanceof Date) obj = serializeDate(obj);
		else if (generateArrayPrefix === "comma" && isArray(obj)) obj = utils.maybeMap(obj, function(value) {
			if (value instanceof Date) return serializeDate(value);
			return value;
		});
		if (obj === null) {
			if (strictNullHandling) return formatter(encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix);
			obj = "";
		}
		if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
			if (encoder) return [formatter(encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format)) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
			return [formatter(prefix) + "=" + formatter(String(obj))];
		}
		var values = [];
		if (typeof obj === "undefined") return values;
		var objKeys;
		if (generateArrayPrefix === "comma" && isArray(obj)) {
			if (encodeValuesOnly && encoder) obj = utils.maybeMap(obj, function(v) {
				return v == null ? v : encoder(v);
			});
			objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
		} else if (isArray(filter)) objKeys = filter;
		else {
			var keys = Object.keys(obj);
			objKeys = sort ? keys.sort(sort) : keys;
		}
		var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
		var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
		if (allowEmptyArrays && isArray(obj) && obj.length === 0) return adjustedPrefix + "[]";
		for (var j = 0; j < objKeys.length; ++j) {
			var key = objKeys[j];
			var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
			if (skipNulls && value === null) continue;
			var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
			var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
			sideChannel.set(object, step);
			var valueSideChannel = getSideChannel();
			valueSideChannel.set(sentinel, sideChannel);
			pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
		}
		return values;
	};
	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
		if (!opts) return defaults;
		if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
		if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
		if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") throw new TypeError("Encoder has to be a function.");
		var charset = opts.charset || defaults.charset;
		if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
		var format = formats["default"];
		if (typeof opts.format !== "undefined") {
			if (!has.call(formats.formatters, opts.format)) throw new TypeError("Unknown format option provided.");
			format = opts.format;
		}
		var formatter = formats.formatters[format];
		var filter = defaults.filter;
		if (typeof opts.filter === "function" || isArray(opts.filter)) filter = opts.filter;
		var arrayFormat;
		if (opts.arrayFormat in arrayPrefixGenerators) arrayFormat = opts.arrayFormat;
		else if ("indices" in opts) arrayFormat = opts.indices ? "indices" : "repeat";
		else arrayFormat = defaults.arrayFormat;
		if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
		var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
		return {
			addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
			allowDots,
			allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
			arrayFormat,
			charset,
			charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
			commaRoundTrip: !!opts.commaRoundTrip,
			delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
			encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
			encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
			encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
			encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
			filter,
			format,
			formatter,
			serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
			skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
			sort: typeof opts.sort === "function" ? opts.sort : null,
			strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
		};
	};
	module.exports = function(object, opts) {
		var obj = object;
		var options = normalizeStringifyOptions(opts);
		var objKeys;
		var filter;
		if (typeof options.filter === "function") {
			filter = options.filter;
			obj = filter("", obj);
		} else if (isArray(options.filter)) {
			filter = options.filter;
			objKeys = filter;
		}
		var keys = [];
		if (typeof obj !== "object" || obj === null) return "";
		var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
		var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
		if (!objKeys) objKeys = Object.keys(obj);
		if (options.sort) objKeys.sort(options.sort);
		var sideChannel = getSideChannel();
		for (var i = 0; i < objKeys.length; ++i) {
			var key = objKeys[i];
			if (typeof key === "undefined" || key === null) continue;
			var value = obj[key];
			if (options.skipNulls && value === null) continue;
			pushToArray(keys, stringify(value, key, generateArrayPrefix, commaRoundTrip, options.allowEmptyArrays, options.strictNullHandling, options.skipNulls, options.encodeDotInKeys, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
		}
		var joined = keys.join(options.delimiter);
		var prefix = options.addQueryPrefix === true ? "?" : "";
		if (options.charsetSentinel) {
			if (options.charset === "iso-8859-1") prefix += "utf8=%26%2310003%3B" + options.delimiter;
			else prefix += "utf8=%E2%9C%93" + options.delimiter;
		}
		return joined.length > 0 ? prefix + joined : "";
	};
}));
//#endregion
//#region node_modules/qs/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var utils = require_utils();
	var has = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var defaults = {
		allowDots: false,
		allowEmptyArrays: false,
		allowPrototypes: false,
		allowSparse: false,
		arrayLimit: 20,
		charset: "utf-8",
		charsetSentinel: false,
		comma: false,
		decodeDotInKeys: false,
		decoder: utils.decode,
		delimiter: "&",
		depth: 5,
		duplicates: "combine",
		ignoreQueryPrefix: false,
		interpretNumericEntities: false,
		parameterLimit: 1e3,
		parseArrays: true,
		plainObjects: false,
		strictDepth: false,
		strictMerge: true,
		strictNullHandling: false,
		throwOnLimitExceeded: false
	};
	var interpretNumericEntities = function(str) {
		return str.replace(/&#(\d+);/g, function($0, numberStr) {
			return String.fromCharCode(parseInt(numberStr, 10));
		});
	};
	var parseArrayValue = function(val, options, currentArrayLength, isFlatArrayValue) {
		if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
			if (isFlatArrayValue && options.throwOnLimitExceeded) {
				var commaCount = 0;
				var commaIndex = val.indexOf(",");
				while (commaIndex > -1) {
					commaCount += 1;
					if (commaCount >= options.arrayLimit) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
					commaIndex = val.indexOf(",", commaIndex + 1);
				}
			}
			return val.split(",");
		}
		if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
		return val;
	};
	var isoSentinel = "utf8=%26%2310003%3B";
	var charsetSentinel = "utf8=%E2%9C%93";
	var parseValues = function parseQueryStringValues(str, options) {
		var obj = { __proto__: null };
		var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
		cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
		var parts = cleanStr.split(options.delimiter, options.throwOnLimitExceeded && typeof limit !== "undefined" ? limit + 1 : limit);
		if (options.throwOnLimitExceeded && typeof limit !== "undefined" && parts.length > limit) throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
		var skipIndex = -1;
		var i;
		var charset = options.charset;
		if (options.charsetSentinel) {
			for (i = 0; i < parts.length; ++i) if (parts[i].indexOf("utf8=") === 0) {
				if (parts[i] === charsetSentinel) charset = "utf-8";
				else if (parts[i] === isoSentinel) charset = "iso-8859-1";
				skipIndex = i;
				i = parts.length;
			}
		}
		for (i = 0; i < parts.length; ++i) {
			if (i === skipIndex) continue;
			var part = parts[i];
			var bracketEqualsPos = part.indexOf("]=");
			var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
			var key;
			var val;
			if (pos === -1) {
				key = options.decoder(part, defaults.decoder, charset, "key");
				val = options.strictNullHandling ? null : "";
			} else {
				key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
				if (key !== null) val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options, isArray(obj[key]) ? obj[key].length : 0, part.indexOf("[]=") === -1), function(encodedVal) {
					return options.decoder(encodedVal, defaults.decoder, charset, "value");
				});
			}
			if (val && options.interpretNumericEntities && charset === "iso-8859-1") val = interpretNumericEntities(String(val));
			if (part.indexOf("[]=") > -1) val = isArray(val) ? [val] : val;
			if (options.comma && isArray(val) && val.length > options.arrayLimit) val = utils.combine([], val, options.arrayLimit, options.plainObjects, options.throwOnLimitExceeded);
			if (key !== null) {
				var existing = has.call(obj, key);
				if (existing && (options.duplicates === "combine" || part.indexOf("[]=") > -1)) obj[key] = utils.combine(obj[key], val, options.arrayLimit, options.plainObjects, options.throwOnLimitExceeded);
				else if (!existing || options.duplicates === "last") obj[key] = val;
			}
		}
		return obj;
	};
	var parseObject = function(chain, val, options, valuesParsed) {
		var currentArrayLength = 0;
		if (chain.length > 0 && chain[chain.length - 1] === "[]") {
			var parentKey = chain.slice(0, -1).join("");
			currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
		}
		var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
		for (var i = chain.length - 1; i >= 0; --i) {
			var obj;
			var root = chain[i];
			if (root === "[]" && options.parseArrays) {
				if (utils.isOverflow(leaf)) obj = leaf;
				else obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf, options.arrayLimit, options.plainObjects, options.throwOnLimitExceeded);
			} else {
				obj = options.plainObjects ? { __proto__: null } : {};
				var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
				var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
				var index = parseInt(decodedRoot, 10);
				var isValidArrayIndex = !isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays;
				if (!options.parseArrays && decodedRoot === "") obj = { 0: leaf };
				else if (isValidArrayIndex && index < options.arrayLimit) {
					obj = [];
					obj[index] = leaf;
				} else if (isValidArrayIndex && options.throwOnLimitExceeded) throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
				else if (isValidArrayIndex) {
					obj[index] = leaf;
					utils.markOverflow(obj, index);
				} else if (decodedRoot !== "__proto__") obj[decodedRoot] = leaf;
			}
			leaf = obj;
		}
		return leaf;
	};
	var splitKeyIntoSegments = function splitKeyIntoSegments(originalKey, options) {
		var key = options.allowDots ? originalKey.replace(/\.([^.[]+)/g, "[$1]") : originalKey;
		if (options.depth <= 0) {
			if (!options.plainObjects && has.call(Object.prototype, key)) {
				if (!options.allowPrototypes) return;
			}
			return [key];
		}
		var segments = [];
		var first = key.indexOf("[");
		var parent = first >= 0 ? key.slice(0, first) : key;
		if (parent) {
			if (!options.plainObjects && has.call(Object.prototype, parent)) {
				if (!options.allowPrototypes) return;
			}
			segments[segments.length] = parent;
		}
		var n = key.length;
		var open = first;
		var collected = 0;
		while (open >= 0 && collected < options.depth) {
			var level = 1;
			var i = open + 1;
			var close = -1;
			while (i < n && close < 0) {
				var cu = key.charCodeAt(i);
				if (cu === 91) level += 1;
				else if (cu === 93) {
					level -= 1;
					if (level === 0) close = i;
				}
				i += 1;
			}
			if (close < 0) {
				segments[segments.length] = "[" + key.slice(open) + "]";
				return segments;
			}
			var seg = key.slice(open, close + 1);
			var content = seg.slice(1, -1);
			if (!options.plainObjects && has.call(Object.prototype, content) && !options.allowPrototypes) return;
			segments[segments.length] = seg;
			collected += 1;
			open = key.indexOf("[", close + 1);
		}
		if (open >= 0) {
			if (options.strictDepth === true) throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
			segments[segments.length] = "[" + key.slice(open) + "]";
		}
		return segments;
	};
	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
		if (!givenKey) return;
		var keys = splitKeyIntoSegments(givenKey, options);
		if (!keys) return;
		return parseObject(keys, val, options, valuesParsed);
	};
	var normalizeParseOptions = function normalizeParseOptions(opts) {
		if (!opts) return defaults;
		if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
		if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
		if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") throw new TypeError("Decoder has to be a function.");
		if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
		if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
		var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
		var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
		if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") throw new TypeError("The duplicates option must be either combine, first, or last");
		return {
			allowDots: typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots,
			allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
			allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
			allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
			arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
			charset,
			charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
			comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
			decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
			decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
			delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
			depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
			duplicates,
			ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
			interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
			parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
			parseArrays: opts.parseArrays !== false,
			plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
			strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
			strictMerge: typeof opts.strictMerge === "boolean" ? !!opts.strictMerge : defaults.strictMerge,
			strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
			throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
		};
	};
	module.exports = function(str, opts) {
		var options = normalizeParseOptions(opts);
		if (str === "" || str === null || typeof str === "undefined") return options.plainObjects ? { __proto__: null } : {};
		var tempObj = typeof str === "string" ? parseValues(str, options) : str;
		var obj = options.plainObjects ? { __proto__: null } : {};
		var keys = Object.keys(tempObj);
		for (var i = 0; i < keys.length; ++i) {
			var key = keys[i];
			var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
			obj = utils.merge(obj, newObj, options);
		}
		if (options.allowSparse === true) return obj;
		return utils.compact(obj);
	};
}));
//#endregion
//#region node_modules/axios/lib/helpers/bind.js
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var stringify = require_stringify();
	var parse = require_parse();
	module.exports = {
		formats: require_formats(),
		parse,
		stringify
	};
})))(), 1);
/**
* Create a bound version of a function with a specified `this` context
*
* @param {Function} fn - The function to bind
* @param {*} thisArg - The value to be passed as the `this` parameter
* @returns {Function} A new function that will call the original function with the specified `this` context
*/
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
//#endregion
//#region node_modules/axios/lib/utils.js
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
/**
* Walk the prototype chain (excluding the shared Object.prototype) looking for
* an own `prop`. This distinguishes genuine own/inherited members — including
* class accessors and template prototypes — from members injected via
* Object.prototype pollution (e.g. `Object.prototype.username = '...'`), which
* live on Object.prototype itself and are therefore never matched.
*
* @param {*} thing The value whose chain to inspect
* @param {string|symbol} prop The property key to look for
*
* @returns {boolean} True when `prop` is owned below Object.prototype
*/
var hasOwnInPrototypeChain = (thing, prop) => {
	let obj = thing;
	const seen = [];
	while (obj != null && obj !== Object.prototype) {
		if (seen.indexOf(obj) !== -1) return false;
		seen.push(obj);
		if (hasOwnProperty(obj, prop)) return true;
		obj = getPrototypeOf(obj);
	}
	return false;
};
/**
* Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
* properties and members inherited from a non-Object.prototype source (a class
* instance or template object) are honored; a value reachable only through a
* polluted Object.prototype is ignored and `undefined` is returned.
*
* @param {*} obj The source object
* @param {string|symbol} prop The property key to read
*
* @returns {*} The resolved value, or undefined when unsafe/absent
*/
var getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
var kindOf = ((cache) => (thing) => {
	const str = toString.call(thing);
	return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
	type = type.toLowerCase();
	return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
/**
* Determine if a value is a non-null object
*
* @param {Object} val The value to test
*
* @returns {boolean} True if value is an Array, otherwise false
*/
var { isArray } = Array;
/**
* Determine if a value is undefined
*
* @param {*} val The value to test
*
* @returns {boolean} True if the value is undefined, otherwise false
*/
var isUndefined = typeOfTest("undefined");
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an ArrayBuffer, otherwise false
*/
var isArrayBuffer = kindOfTest("ArrayBuffer");
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Determine if a value is a String
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a String, otherwise false
*/
var isString = typeOfTest("string");
/**
* Determine if a value is a Function
*
* @param {*} val The value to test
* @returns {boolean} True if value is a Function, otherwise false
*/
var isFunction$1 = typeOfTest("function");
/**
* Determine if a value is a Number
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Number, otherwise false
*/
var isNumber = typeOfTest("number");
/**
* Determine if a value is an Object
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an Object, otherwise false
*/
var isObject = (thing) => thing !== null && typeof thing === "object";
/**
* Determine if a value is a Boolean
*
* @param {*} thing The value to test
* @returns {boolean} True if value is a Boolean, otherwise false
*/
var isBoolean = (thing) => thing === true || thing === false;
/**
* Determine if a value is a plain Object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a plain Object, otherwise false
*/
var isPlainObject = (val) => {
	if (!isObject(val)) return false;
	const prototype = getPrototypeOf(val);
	return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
};
/**
* Determine if a value is an empty object (safely handles Buffers)
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an empty object, otherwise false
*/
var isEmptyObject = (val) => {
	if (!isObject(val) || isBuffer(val)) return false;
	try {
		return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
	} catch (e) {
		return false;
	}
};
/**
* Determine if a value is a Date
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Date, otherwise false
*/
var isDate = kindOfTest("Date");
/**
* Determine if a value is a File
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a File, otherwise false
*/
var isFile$2 = kindOfTest("File");
/**
* Determine if a value is a React Native Blob
* React Native "blob": an object with a `uri` attribute. Optionally, it can
* also have a `name` and `type` attribute to specify filename and content type
*
* @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
*
* @param {*} value The value to test
*
* @returns {boolean} True if value is a React Native Blob, otherwise false
*/
var isReactNativeBlob = (value) => {
	return !!(value && typeof value.uri !== "undefined");
};
/**
* Determine if environment is React Native
* ReactNative `FormData` has a non-standard `getParts()` method
*
* @param {*} formData The formData to test
*
* @returns {boolean} True if environment is React Native, otherwise false
*/
var isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
/**
* Determine if a value is a Blob
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Blob, otherwise false
*/
var isBlob = kindOfTest("Blob");
/**
* Determine if a value is a FileList
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a FileList, otherwise false
*/
var isFileList = kindOfTest("FileList");
var isSet = kindOfTest("Set");
/**
* Determine if a value is a Stream
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Stream, otherwise false
*/
var isStream = (val) => isObject(val) && isFunction$1(val.pipe);
/**
* Determine if a value is a FormData
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an FormData, otherwise false
*/
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData$1 = (thing) => {
	if (!thing) return false;
	if (FormDataCtor && thing instanceof FormDataCtor) return true;
	const proto = getPrototypeOf(thing);
	if (!proto || proto === Object.prototype) return false;
	if (!isFunction$1(thing.append)) return false;
	const kind = kindOf(thing);
	return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
/**
* Determine if a value is a URLSearchParams object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a URLSearchParams object, otherwise false
*/
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(kindOfTest);
/**
* Trim excess whitespace off the beginning and end of a string
*
* @param {String} str The String to trim
*
* @returns {String} The String freed of excess whitespace
*/
var trim = (str) => {
	return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array<unknown>} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
/**
* Finds a key in an object, case-insensitive, returning the actual key name.
* Returns null if the object is a Buffer or if no match is found.
*
* @param {Object} obj - The object to search.
* @param {string} key - The key to find (case-insensitive).
* @returns {?string} The actual key name if found, otherwise null.
*/
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
var _global = (() => {
	if (typeof globalThis !== "undefined") return globalThis;
	return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* const result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) {
		const source = objs[i];
		if (!source || isBuffer(source)) continue;
		forEach(source, assignValue);
		if (typeof source !== "object" || isArray(source)) continue;
		const symbols = Object.getOwnPropertySymbols(source);
		for (let j = 0; j < symbols.length; j++) {
			const symbol = symbols[j];
			if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
		}
	}
	return result;
}
/**
* Extends object a by mutably adding to it the properties of object b.
*
* @param {Object} a The object to be extended
* @param {Object} b The object to copy properties from
* @param {Object} thisArg The object to bind function to
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys]
* @returns {Object} The resulting value of object a
*/
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
	forEach(b, (val, key) => {
		if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
			__proto__: null,
			value: bind(val, thisArg),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else Object.defineProperty(a, key, {
			__proto__: null,
			value: val,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}, { allOwnKeys });
	return a;
};
/**
* Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
*
* @param {string} content with BOM
*
* @returns {string} content value without BOM
*/
var stripBOM = (content) => {
	if (content.charCodeAt(0) === 65279) content = content.slice(1);
	return content;
};
/**
* Inherit the prototype methods from one constructor into another
* @param {function} constructor
* @param {function} superConstructor
* @param {object} [props]
* @param {object} [descriptors]
*
* @returns {void}
*/
var inherits = (constructor, superConstructor, props, descriptors) => {
	constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	Object.defineProperty(constructor.prototype, "constructor", {
		__proto__: null,
		value: constructor,
		writable: true,
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(constructor, "super", {
		__proto__: null,
		value: superConstructor.prototype
	});
	props && Object.assign(constructor.prototype, props);
};
/**
* Resolve object with deep prototype chain to a flat object
* @param {Object} sourceObj source object
* @param {Object} [destObj]
* @param {Function|Boolean} [filter]
* @param {Function} [propFilter]
*
* @returns {Object}
*/
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	let props;
	let i;
	let prop;
	const merged = {};
	destObj = destObj || {};
	if (sourceObj == null) return destObj;
	do {
		props = Object.getOwnPropertyNames(sourceObj);
		i = props.length;
		while (i-- > 0) {
			prop = props[i];
			if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
				destObj[prop] = sourceObj[prop];
				merged[prop] = true;
			}
		}
		sourceObj = filter !== false && getPrototypeOf(sourceObj);
	} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
	return destObj;
};
/**
* Determines whether a string ends with the characters of a specified string
*
* @param {String} str
* @param {String} searchString
* @param {Number} [position= 0]
*
* @returns {boolean}
*/
var endsWith = (str, searchString, position) => {
	str = String(str);
	if (position === void 0 || position > str.length) position = str.length;
	position -= searchString.length;
	const lastIndex = str.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};
/**
* Returns new array from array like object or null if failed
*
* @param {*} [thing]
*
* @returns {?Array}
*/
var toArray = (thing) => {
	if (!thing) return null;
	if (isArray(thing)) return thing;
	let i = thing.length;
	if (!isNumber(i)) return null;
	const arr = new Array(i);
	while (i-- > 0) arr[i] = thing[i];
	return arr;
};
/**
* Checking if the Uint8Array exists and if it does, it returns a function that checks if the
* thing passed in is an instance of Uint8Array
*
* @param {TypedArray}
*
* @returns {Array}
*/
var isTypedArray = ((TypedArray) => {
	return (thing) => {
		return TypedArray && thing instanceof TypedArray;
	};
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
/**
* For each entry in the object, call the function with the key and value.
*
* @param {Object<any, any>} obj - The object to iterate over.
* @param {Function} fn - The function to call for each entry.
*
* @returns {void}
*/
var forEachEntry = (obj, fn) => {
	const _iterator = (obj && obj[iterator]).call(obj);
	let result;
	while ((result = _iterator.next()) && !result.done) {
		const pair = result.value;
		fn.call(obj, pair[0], pair[1]);
	}
};
/**
* It takes a regular expression and a string, and returns an array of all the matches
*
* @param {string} regExp - The regular expression to match against.
* @param {string} str - The string to search.
*
* @returns {Array<boolean>}
*/
var matchAll = (regExp, str) => {
	let matches;
	const arr = [];
	while ((matches = regExp.exec(str)) !== null) arr.push(matches);
	return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
	return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
		return p1.toUpperCase() + p2;
	});
};
var { propertyIsEnumerable } = Object.prototype;
/**
* Determine if a value is a RegExp object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a RegExp object, otherwise false
*/
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
	const descriptors = Object.getOwnPropertyDescriptors(obj);
	const reducedDescriptors = {};
	forEach(descriptors, (descriptor, name) => {
		let ret;
		if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
	});
	Object.defineProperties(obj, reducedDescriptors);
};
/**
* Makes all methods read-only
* @param {Object} obj
*/
var freezeMethods = (obj) => {
	reduceDescriptors(obj, (descriptor, name) => {
		if (isFunction$1(obj) && [
			"arguments",
			"caller",
			"callee"
		].includes(name)) return false;
		const value = obj[name];
		if (!isFunction$1(value)) return;
		descriptor.enumerable = false;
		if ("writable" in descriptor) {
			descriptor.writable = false;
			return;
		}
		if (!descriptor.set) descriptor.set = () => {
			throw Error("Can not rewrite read-only method '" + name + "'");
		};
	});
};
/**
* Converts an array or a delimited string into an object set with values as keys and true as values.
* Useful for fast membership checks.
*
* @param {Array|string} arrayOrString - The array or string to convert.
* @param {string} delimiter - The delimiter to use if input is a string.
* @returns {Object} An object with keys from the array or string, values set to true.
*/
var toObjectSet = (arrayOrString, delimiter) => {
	const obj = {};
	const define = (arr) => {
		arr.forEach((value) => {
			obj[value] = true;
		});
	};
	isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
	return obj;
};
var noop$1 = () => {};
var toFiniteNumber = (value, defaultValue) => {
	return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
/**
* Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
*
* @param {Object} obj - The object to convert.
* @returns {Object} The JSON-compatible object.
*/
var toJSONObject = (obj) => {
	const visited = /* @__PURE__ */ new WeakSet();
	const visit = (source) => {
		if (isObject(source)) {
			if (visited.has(source)) return;
			if (isBuffer(source)) return source;
			if (!("toJSON" in source)) {
				visited.add(source);
				let target;
				if (isSet(source)) {
					target = [];
					for (const value of source) {
						const reducedValue = visit(value);
						!isUndefined(reducedValue) && target.push(reducedValue);
					}
				} else {
					target = isArray(source) ? [] : {};
					forEach(source, (value, key) => {
						const reducedValue = visit(value);
						!isUndefined(reducedValue) && (target[key] = reducedValue);
					});
				}
				visited.delete(source);
				return target;
			}
		}
		return source;
	};
	return visit(obj);
};
/**
* Determines if a value is an async function.
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is an async function, otherwise false.
*/
var isAsyncFn = kindOfTest("AsyncFunction");
/**
* Determines if a value is thenable (has then and catch methods).
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is thenable, otherwise false.
*/
var isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
/**
* Provides a cross-platform setImmediate implementation.
* Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
*
* @param {boolean} setImmediateSupported - Whether setImmediate is supported.
* @param {boolean} postMessageSupported - Whether postMessage is supported.
* @returns {Function} A function to schedule a callback asynchronously.
*/
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	if (setImmediateSupported) return setImmediate;
	return postMessageSupported ? ((token, callbacks) => {
		_global.addEventListener("message", ({ source, data }) => {
			if (source === _global && data === token) callbacks.length && callbacks.shift()();
		}, false);
		return (cb) => {
			callbacks.push(cb);
			_global.postMessage(token, "*");
		};
	})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
/**
* Schedules a microtask or asynchronous callback as soon as possible.
* Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
*
* @type {Function}
*/
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
/**
* Determine if a value is iterable via an iterator that is NOT sourced solely
* from a polluted Object.prototype. Use this instead of `isIterable` whenever
* the iterable comes from untrusted input (e.g. user-supplied header sources),
* so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
* into an attacker-controlled entries iterator.
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value has a non-polluted iterator
*/
var isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
var utils_default = {
	isArray,
	isArrayBuffer,
	isBuffer,
	isFormData: isFormData$1,
	isArrayBufferView,
	isString,
	isNumber,
	isBoolean,
	isObject,
	isPlainObject,
	isEmptyObject,
	isReadableStream,
	isRequest,
	isResponse,
	isHeaders,
	isUndefined,
	isDate,
	isFile: isFile$2,
	isReactNativeBlob,
	isReactNative,
	isBlob,
	isRegExp,
	isFunction: isFunction$1,
	isStream,
	isURLSearchParams,
	isTypedArray,
	isFileList,
	forEach,
	merge,
	extend,
	trim,
	stripBOM,
	inherits,
	toFlatObject,
	kindOf,
	kindOfTest,
	endsWith,
	toArray,
	forEachEntry,
	matchAll,
	isHTMLForm,
	hasOwnProperty,
	hasOwnProp: hasOwnProperty,
	hasOwnInPrototypeChain,
	getSafeProp,
	reduceDescriptors,
	freezeMethods,
	toObjectSet,
	toCamelCase,
	noop: noop$1,
	toFiniteNumber,
	findKey,
	global: _global,
	isContextDefined,
	isSpecCompliantForm,
	toJSONObject,
	isAsyncFn,
	isThenable,
	setImmediate: _setImmediate,
	asap,
	isIterable,
	isSafeIterable
};
//#endregion
//#region node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]);
/**
* Parse headers into an object
*
* ```
* Date: Wed, 27 Aug 2014 08:58:49 GMT
* Content-Type: application/json
* Connection: keep-alive
* Transfer-Encoding: chunked
* ```
*
* @param {String} rawHeaders Headers needing to be parsed
*
* @returns {Object} Headers parsed into an object
*/
var parseHeaders_default = (rawHeaders) => {
	const parsed = {};
	let key;
	let val;
	let i;
	rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
		i = line.indexOf(":");
		key = line.substring(0, i).trim().toLowerCase();
		val = line.substring(i + 1).trim();
		const hasKey = utils_default.hasOwnProp(parsed, key);
		if (!key || hasKey && utils_default.hasOwnProp(ignoreDuplicateOf, key)) return;
		if (key === "set-cookie") {
			if (hasKey) parsed[key].push(val);
			else parsed[key] = [val];
		} else parsed[key] = hasKey ? parsed[key] + ", " + val : val;
	});
	return parsed;
};
//#endregion
//#region node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
var INVALID_UNICODE_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
var INVALID_BYTE_STRING_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sanitizeValue(value, invalidChars) {
	if (utils_default.isArray(value)) return value.map((item) => sanitizeValue(item, invalidChars));
	return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
var sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
var sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
	const byteStringHeaders = Object.create(null);
	utils_default.forEach(headers.toJSON(), (value, header) => {
		byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
	});
	return byteStringHeaders;
}
//#endregion
//#region node_modules/axios/lib/core/AxiosHeaders.js
var $internals = Symbol("internals");
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
var parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function trimOWS(value) {
	let start = 0;
	let end = value.length;
	while (start < end) {
		const code = value.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = value.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === value.length ? value : value.slice(start, end);
}
function decodeQuotedString(value) {
	const last = value.length - 1;
	if (last < 1 || value.charCodeAt(0) !== 34 || value.charCodeAt(last) !== 34) return value;
	let decoded = "";
	for (let i = 1; i < last; i++) {
		const code = value.charCodeAt(i);
		if (code === 34) return value;
		if (code === 92) {
			i += 1;
			if (i >= last) return value;
		}
		decoded += value[i];
	}
	return decoded;
}
function parseParameters(value) {
	const parameters = Object.create(null);
	const str = String(value);
	let start = 0;
	let quoted = false;
	let escaped = false;
	function parseParameter(end) {
		const part = trimOWS(str.slice(start, end));
		const equals = part.indexOf("=");
		if (equals < 1) return;
		const name = trimOWS(part.slice(0, equals));
		if (!parameterNameRE.test(name)) return;
		const normalizedName = name.toLowerCase();
		if (normalizedName === "__proto__" || normalizedName === "constructor" || normalizedName === "prototype") return;
		const parameterValue = trimOWS(part.slice(equals + 1));
		parameters[normalizedName] = decodeQuotedString(parameterValue);
	}
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (quoted) {
			if (escaped) escaped = false;
			else if (code === 92) escaped = true;
			else if (code === 34) quoted = false;
		} else if (code === 34) quoted = true;
		else if (code === 44 || code === 59) {
			parseParameter(i);
			start = i + 1;
		}
	}
	parseParameter(str.length);
	return parameters;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var AxiosHeaders$1 = class {
	constructor(headers) {
		headers && this.set(headers);
	}
	set(header, valueOrRewrite, rewrite) {
		const self = this;
		function setHeader(_value, _header, _rewrite) {
			const lHeader = normalizeHeader(_header);
			if (!lHeader) return;
			const key = utils_default.findKey(self, lHeader);
			if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
		}
		const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
		if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
		else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
		else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
			let obj = Object.create(null), dest, key;
			for (const entry of header) {
				if (!utils_default.isArray(entry)) throw new TypeError("Object iterator must return a key-value pair");
				key = entry[0];
				if (utils_default.hasOwnProp(obj, key)) {
					dest = obj[key];
					obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
				} else obj[key] = entry[1];
			}
			setHeaders(obj, valueOrRewrite);
		} else header != null && setHeader(valueOrRewrite, header, rewrite);
		return this;
	}
	get(header, parser) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			if (key) {
				const value = this[key];
				if (!parser) return value;
				if (parser === true) return parseTokens(value);
				if (utils_default.isFunction(parser)) return parser.call(this, value, key);
				if (utils_default.isRegExp(parser)) return parser.exec(value);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(header, matcher) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
		}
		return false;
	}
	delete(header, matcher) {
		const self = this;
		let deleted = false;
		function deleteHeader(_header) {
			_header = normalizeHeader(_header);
			if (_header) {
				const key = utils_default.findKey(self, _header);
				if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
					delete self[key];
					deleted = true;
				}
			}
		}
		if (utils_default.isArray(header)) header.forEach(deleteHeader);
		else deleteHeader(header);
		return deleted;
	}
	clear(matcher) {
		const keys = Object.keys(this);
		let i = keys.length;
		let deleted = false;
		while (i--) {
			const key = keys[i];
			if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
				delete this[key];
				deleted = true;
			}
		}
		return deleted;
	}
	normalize(format) {
		const self = this;
		const headers = {};
		utils_default.forEach(this, (value, header) => {
			const key = utils_default.findKey(headers, header);
			if (key) {
				self[key] = normalizeValue(value);
				delete self[header];
				return;
			}
			const normalized = format ? formatHeader(header) : String(header).trim();
			if (normalized !== header) delete self[header];
			self[normalized] = normalizeValue(value);
			headers[normalized] = true;
		});
		return this;
	}
	concat(...targets) {
		return this.constructor.concat(this, ...targets);
	}
	toJSON(asStrings) {
		const obj = Object.create(null);
		utils_default.forEach(this, (value, header) => {
			value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
		});
		return obj;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
	}
	getSetCookie() {
		const value = this.get("set-cookie");
		return utils_default.isArray(value) ? value : value == null || value === false ? [] : [value];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(thing) {
		return thing instanceof this ? thing : new this(thing);
	}
	static parseParameters(value) {
		return parseParameters(value);
	}
	static concat(first, ...targets) {
		const computed = new this(first);
		targets.forEach((target) => computed.set(target));
		return computed;
	}
	static accessor(header) {
		const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
		const prototype = this.prototype;
		function defineAccessor(_header) {
			const lHeader = normalizeHeader(_header);
			if (!accessors[lHeader]) {
				buildAccessors(prototype, _header);
				accessors[lHeader] = true;
			}
		}
		utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
		return this;
	}
};
AxiosHeaders$1.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
	let mapped = key[0].toUpperCase() + key.slice(1);
	return {
		get: () => value,
		set(headerValue) {
			this[mapped] = headerValue;
		}
	};
});
utils_default.freezeMethods(AxiosHeaders$1);
//#endregion
//#region node_modules/axios/lib/core/AxiosError.js
var REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype = Object.getPrototypeOf(source);
	while (prototype && prototype !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype, "toJSON")) return true;
		prototype = Object.getPrototypeOf(prototype);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders$1) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
function stringifySafely$1(value) {
	try {
		return String(value);
	} catch (err) {
		return "";
	}
}
function aggregateErrorMessage(error) {
	return error.errors.map((entry) => {
		try {
			return entry && entry.message ? stringifySafely$1(entry.message) : stringifySafely$1(entry);
		} catch (err) {
			return "";
		}
	}).filter(Boolean).join("; ") || error.name || "AggregateError";
}
var AxiosError$1 = class AxiosError$1 extends Error {
	static from(error, code, config, request, response, customProps) {
		let message = error.message;
		if (!message && utils_default.isArray(error.errors) && error.errors.length) message = aggregateErrorMessage(error);
		const axiosError = new AxiosError$1(message, code || error.code, config, request, response);
		Object.defineProperty(axiosError, "cause", {
			__proto__: null,
			value: error,
			writable: true,
			enumerable: false,
			configurable: true
		});
		axiosError.name = error.name;
		if (error.status != null && axiosError.status == null) axiosError.status = error.status;
		customProps && Object.assign(axiosError, customProps);
		return axiosError;
	}
	/**
	* Create an Error with the specified message, config, error code, request and response.
	*
	* @param {string} message The error message.
	* @param {string} [code] The error code (for example, 'ECONNABORTED').
	* @param {Object} [config] The config.
	* @param {Object} [request] The request.
	* @param {Object} [response] The response.
	*
	* @returns {Error} The created error.
	*/
	constructor(message, code, config, request, response) {
		super(message);
		Object.defineProperty(this, "message", {
			__proto__: null,
			value: message,
			enumerable: true,
			writable: true,
			configurable: true
		});
		this.name = "AxiosError";
		this.isAxiosError = true;
		code && (this.code = code);
		config && (this.config = config);
		request && (this.request = request);
		if (response) {
			this.response = response;
			this.status = response.status;
		}
	}
	toJSON() {
		const config = this.config;
		const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
		const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: serializedConfig,
			code: this.code,
			status: this.status
		};
	}
};
AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError$1.ECONNABORTED = "ECONNABORTED";
AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
//#endregion
//#region node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$2 = __require("stream").Stream;
	var util$4 = __require("util");
	module.exports = DelayedStream;
	function DelayedStream() {
		this.source = null;
		this.dataSize = 0;
		this.maxDataSize = 1048576;
		this.pauseStream = true;
		this._maxDataSizeExceeded = false;
		this._released = false;
		this._bufferedEvents = [];
	}
	util$4.inherits(DelayedStream, Stream$2);
	DelayedStream.create = function(source, options) {
		var delayedStream = new this();
		options = options || {};
		for (var option in options) delayedStream[option] = options[option];
		delayedStream.source = source;
		var realEmit = source.emit;
		source.emit = function() {
			delayedStream._handleEmit(arguments);
			return realEmit.apply(source, arguments);
		};
		source.on("error", function() {});
		if (delayedStream.pauseStream) source.pause();
		return delayedStream;
	};
	Object.defineProperty(DelayedStream.prototype, "readable", {
		configurable: true,
		enumerable: true,
		get: function() {
			return this.source.readable;
		}
	});
	DelayedStream.prototype.setEncoding = function() {
		return this.source.setEncoding.apply(this.source, arguments);
	};
	DelayedStream.prototype.resume = function() {
		if (!this._released) this.release();
		this.source.resume();
	};
	DelayedStream.prototype.pause = function() {
		this.source.pause();
	};
	DelayedStream.prototype.release = function() {
		this._released = true;
		this._bufferedEvents.forEach(function(args) {
			this.emit.apply(this, args);
		}.bind(this));
		this._bufferedEvents = [];
	};
	DelayedStream.prototype.pipe = function() {
		var r = Stream$2.prototype.pipe.apply(this, arguments);
		this.resume();
		return r;
	};
	DelayedStream.prototype._handleEmit = function(args) {
		if (this._released) {
			this.emit.apply(this, args);
			return;
		}
		if (args[0] === "data") {
			this.dataSize += args[1].length;
			this._checkIfMaxDataSizeExceeded();
		}
		this._bufferedEvents.push(args);
	};
	DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
		if (this._maxDataSizeExceeded) return;
		if (this.dataSize <= this.maxDataSize) return;
		this._maxDataSizeExceeded = true;
		var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
		this.emit("error", new Error(message));
	};
}));
//#endregion
//#region node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$3 = __require("util");
	var Stream$1 = __require("stream").Stream;
	var DelayedStream = require_delayed_stream();
	module.exports = CombinedStream;
	function CombinedStream() {
		this.writable = false;
		this.readable = true;
		this.dataSize = 0;
		this.maxDataSize = 2097152;
		this.pauseStreams = true;
		this._released = false;
		this._streams = [];
		this._currentStream = null;
		this._insideLoop = false;
		this._pendingNext = false;
	}
	util$3.inherits(CombinedStream, Stream$1);
	CombinedStream.create = function(options) {
		var combinedStream = new this();
		options = options || {};
		for (var option in options) combinedStream[option] = options[option];
		return combinedStream;
	};
	CombinedStream.isStreamLike = function(stream) {
		return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
	};
	CombinedStream.prototype.append = function(stream) {
		if (CombinedStream.isStreamLike(stream)) {
			if (!(stream instanceof DelayedStream)) {
				var newStream = DelayedStream.create(stream, {
					maxDataSize: Infinity,
					pauseStream: this.pauseStreams
				});
				stream.on("data", this._checkDataSize.bind(this));
				stream = newStream;
			}
			this._handleErrors(stream);
			if (this.pauseStreams) stream.pause();
		}
		this._streams.push(stream);
		return this;
	};
	CombinedStream.prototype.pipe = function(dest, options) {
		Stream$1.prototype.pipe.call(this, dest, options);
		this.resume();
		return dest;
	};
	CombinedStream.prototype._getNext = function() {
		this._currentStream = null;
		if (this._insideLoop) {
			this._pendingNext = true;
			return;
		}
		this._insideLoop = true;
		try {
			do {
				this._pendingNext = false;
				this._realGetNext();
			} while (this._pendingNext);
		} finally {
			this._insideLoop = false;
		}
	};
	CombinedStream.prototype._realGetNext = function() {
		var stream = this._streams.shift();
		if (typeof stream == "undefined") {
			this.end();
			return;
		}
		if (typeof stream !== "function") {
			this._pipeNext(stream);
			return;
		}
		stream(function(stream) {
			if (CombinedStream.isStreamLike(stream)) {
				stream.on("data", this._checkDataSize.bind(this));
				this._handleErrors(stream);
			}
			this._pipeNext(stream);
		}.bind(this));
	};
	CombinedStream.prototype._pipeNext = function(stream) {
		this._currentStream = stream;
		if (CombinedStream.isStreamLike(stream)) {
			stream.on("end", this._getNext.bind(this));
			stream.pipe(this, { end: false });
			return;
		}
		var value = stream;
		this.write(value);
		this._getNext();
	};
	CombinedStream.prototype._handleErrors = function(stream) {
		var self = this;
		stream.on("error", function(err) {
			self._emitError(err);
		});
	};
	CombinedStream.prototype.write = function(data) {
		this.emit("data", data);
	};
	CombinedStream.prototype.pause = function() {
		if (!this.pauseStreams) return;
		if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
		this.emit("pause");
	};
	CombinedStream.prototype.resume = function() {
		if (!this._released) {
			this._released = true;
			this.writable = true;
			this._getNext();
		}
		if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
		this.emit("resume");
	};
	CombinedStream.prototype.end = function() {
		this._reset();
		this.emit("end");
	};
	CombinedStream.prototype.destroy = function() {
		this._reset();
		this.emit("close");
	};
	CombinedStream.prototype._reset = function() {
		this.writable = false;
		this._streams = [];
		this._currentStream = null;
	};
	CombinedStream.prototype._checkDataSize = function() {
		this._updateDataSize();
		if (this.dataSize <= this.maxDataSize) return;
		var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
		this._emitError(new Error(message));
	};
	CombinedStream.prototype._updateDataSize = function() {
		this.dataSize = 0;
		var self = this;
		this._streams.forEach(function(stream) {
			if (!stream.dataSize) return;
			self.dataSize += stream.dataSize;
		});
		if (this._currentStream && this._currentStream.dataSize) this.dataSize += this._currentStream.dataSize;
	};
	CombinedStream.prototype._emitError = function(err) {
		this._reset();
		this.emit("error", err);
	};
}));
//#endregion
//#region node_modules/mime-db/db.json
var db_exports = /* @__PURE__ */ __exportAll({ default: () => db_default });
var db_default;
var init_db = __esmMin((() => {
	db_default = {
		"application/1d-interleaved-parityfec": { "source": "iana" },
		"application/3gpdash-qoe-report+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/3gpp-ims+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/3gpphal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/3gpphalforms+json": {
			"source": "iana",
			"compressible": true
		},
		"application/a2l": { "source": "iana" },
		"application/ace+cbor": { "source": "iana" },
		"application/activemessage": { "source": "iana" },
		"application/activity+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-directory+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcost+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcostparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointprop+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointpropparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-error+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-updatestreamcontrol+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-updatestreamparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/aml": { "source": "iana" },
		"application/andrew-inset": {
			"source": "iana",
			"extensions": ["ez"]
		},
		"application/applefile": { "source": "iana" },
		"application/applixware": {
			"source": "apache",
			"extensions": ["aw"]
		},
		"application/at+jwt": { "source": "iana" },
		"application/atf": { "source": "iana" },
		"application/atfx": { "source": "iana" },
		"application/atom+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atom"]
		},
		"application/atomcat+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomcat"]
		},
		"application/atomdeleted+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomdeleted"]
		},
		"application/atomicmail": { "source": "iana" },
		"application/atomsvc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomsvc"]
		},
		"application/atsc-dwd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dwd"]
		},
		"application/atsc-dynamic-event-message": { "source": "iana" },
		"application/atsc-held+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["held"]
		},
		"application/atsc-rdt+json": {
			"source": "iana",
			"compressible": true
		},
		"application/atsc-rsat+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rsat"]
		},
		"application/atxml": { "source": "iana" },
		"application/auth-policy+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/bacnet-xdd+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/batch-smtp": { "source": "iana" },
		"application/bdoc": {
			"compressible": false,
			"extensions": ["bdoc"]
		},
		"application/beep+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/calendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/calendar+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xcs"]
		},
		"application/call-completion": { "source": "iana" },
		"application/cals-1840": { "source": "iana" },
		"application/captive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cbor": { "source": "iana" },
		"application/cbor-seq": { "source": "iana" },
		"application/cccex": { "source": "iana" },
		"application/ccmp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ccxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ccxml"]
		},
		"application/cdfx+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cdfx"]
		},
		"application/cdmi-capability": {
			"source": "iana",
			"extensions": ["cdmia"]
		},
		"application/cdmi-container": {
			"source": "iana",
			"extensions": ["cdmic"]
		},
		"application/cdmi-domain": {
			"source": "iana",
			"extensions": ["cdmid"]
		},
		"application/cdmi-object": {
			"source": "iana",
			"extensions": ["cdmio"]
		},
		"application/cdmi-queue": {
			"source": "iana",
			"extensions": ["cdmiq"]
		},
		"application/cdni": { "source": "iana" },
		"application/cea": { "source": "iana" },
		"application/cea-2018+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cellml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cfw": { "source": "iana" },
		"application/city+json": {
			"source": "iana",
			"compressible": true
		},
		"application/clr": { "source": "iana" },
		"application/clue+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/clue_info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cms": { "source": "iana" },
		"application/cnrp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/coap-group+json": {
			"source": "iana",
			"compressible": true
		},
		"application/coap-payload": { "source": "iana" },
		"application/commonground": { "source": "iana" },
		"application/conference-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cose": { "source": "iana" },
		"application/cose-key": { "source": "iana" },
		"application/cose-key-set": { "source": "iana" },
		"application/cpl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cpl"]
		},
		"application/csrattrs": { "source": "iana" },
		"application/csta+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cstadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/csvm+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cu-seeme": {
			"source": "apache",
			"extensions": ["cu"]
		},
		"application/cwt": { "source": "iana" },
		"application/cybercash": { "source": "iana" },
		"application/dart": { "compressible": true },
		"application/dash+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpd"]
		},
		"application/dash-patch+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpp"]
		},
		"application/dashdelta": { "source": "iana" },
		"application/davmount+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["davmount"]
		},
		"application/dca-rft": { "source": "iana" },
		"application/dcd": { "source": "iana" },
		"application/dec-dx": { "source": "iana" },
		"application/dialog-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dicom": { "source": "iana" },
		"application/dicom+json": {
			"source": "iana",
			"compressible": true
		},
		"application/dicom+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dii": { "source": "iana" },
		"application/dit": { "source": "iana" },
		"application/dns": { "source": "iana" },
		"application/dns+json": {
			"source": "iana",
			"compressible": true
		},
		"application/dns-message": { "source": "iana" },
		"application/docbook+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["dbk"]
		},
		"application/dots+cbor": { "source": "iana" },
		"application/dskpp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dssc+der": {
			"source": "iana",
			"extensions": ["dssc"]
		},
		"application/dssc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdssc"]
		},
		"application/dvcs": { "source": "iana" },
		"application/ecmascript": {
			"source": "iana",
			"compressible": true,
			"extensions": ["es", "ecma"]
		},
		"application/edi-consent": { "source": "iana" },
		"application/edi-x12": {
			"source": "iana",
			"compressible": false
		},
		"application/edifact": {
			"source": "iana",
			"compressible": false
		},
		"application/efi": { "source": "iana" },
		"application/elm+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/elm+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.cap+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/emergencycalldata.comment+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.deviceinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.ecall.msd": { "source": "iana" },
		"application/emergencycalldata.providerinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.serviceinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.veds+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emma+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["emma"]
		},
		"application/emotionml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["emotionml"]
		},
		"application/encaprtp": { "source": "iana" },
		"application/epp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/epub+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["epub"]
		},
		"application/eshop": { "source": "iana" },
		"application/exi": {
			"source": "iana",
			"extensions": ["exi"]
		},
		"application/expect-ct-report+json": {
			"source": "iana",
			"compressible": true
		},
		"application/express": {
			"source": "iana",
			"extensions": ["exp"]
		},
		"application/fastinfoset": { "source": "iana" },
		"application/fastsoap": { "source": "iana" },
		"application/fdt+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["fdt"]
		},
		"application/fhir+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/fhir+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/fido.trusted-apps+json": { "compressible": true },
		"application/fits": { "source": "iana" },
		"application/flexfec": { "source": "iana" },
		"application/font-sfnt": { "source": "iana" },
		"application/font-tdpfr": {
			"source": "iana",
			"extensions": ["pfr"]
		},
		"application/font-woff": {
			"source": "iana",
			"compressible": false
		},
		"application/framework-attributes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/geo+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["geojson"]
		},
		"application/geo+json-seq": { "source": "iana" },
		"application/geopackage+sqlite3": { "source": "iana" },
		"application/geoxacml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/gltf-buffer": { "source": "iana" },
		"application/gml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["gml"]
		},
		"application/gpx+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["gpx"]
		},
		"application/gxf": {
			"source": "apache",
			"extensions": ["gxf"]
		},
		"application/gzip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["gz"]
		},
		"application/h224": { "source": "iana" },
		"application/held+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/hjson": { "extensions": ["hjson"] },
		"application/http": { "source": "iana" },
		"application/hyperstudio": {
			"source": "iana",
			"extensions": ["stk"]
		},
		"application/ibe-key-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ibe-pkg-reply+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ibe-pp-data": { "source": "iana" },
		"application/iges": { "source": "iana" },
		"application/im-iscomposing+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/index": { "source": "iana" },
		"application/index.cmd": { "source": "iana" },
		"application/index.obj": { "source": "iana" },
		"application/index.response": { "source": "iana" },
		"application/index.vnd": { "source": "iana" },
		"application/inkml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ink", "inkml"]
		},
		"application/iotp": { "source": "iana" },
		"application/ipfix": {
			"source": "iana",
			"extensions": ["ipfix"]
		},
		"application/ipp": { "source": "iana" },
		"application/isup": { "source": "iana" },
		"application/its+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["its"]
		},
		"application/java-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			"source": "apache",
			"compressible": false,
			"extensions": ["ser"]
		},
		"application/java-vm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["class"]
		},
		"application/javascript": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["js", "mjs"]
		},
		"application/jf2feed+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jose": { "source": "iana" },
		"application/jose+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jrd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jscalendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["json", "map"]
		},
		"application/json-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json-seq": { "source": "iana" },
		"application/json5": { "extensions": ["json5"] },
		"application/jsonml+json": {
			"source": "apache",
			"compressible": true,
			"extensions": ["jsonml"]
		},
		"application/jwk+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwk-set+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwt": { "source": "iana" },
		"application/kpml-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/kpml-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ld+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["jsonld"]
		},
		"application/lgr+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lgr"]
		},
		"application/link-format": { "source": "iana" },
		"application/load-control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/lost+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lostxml"]
		},
		"application/lostsync+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/lpf+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/lxf": { "source": "iana" },
		"application/mac-binhex40": {
			"source": "iana",
			"extensions": ["hqx"]
		},
		"application/mac-compactpro": {
			"source": "apache",
			"extensions": ["cpt"]
		},
		"application/macwriteii": { "source": "iana" },
		"application/mads+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mads"]
		},
		"application/manifest+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["webmanifest"]
		},
		"application/marc": {
			"source": "iana",
			"extensions": ["mrc"]
		},
		"application/marcxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mrcx"]
		},
		"application/mathematica": {
			"source": "iana",
			"extensions": [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mathml"]
		},
		"application/mathml-content+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mathml-presentation+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-associated-procedure-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-deregister+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-envelope+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-msk+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-msk-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-protection-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-reception-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-register+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-register-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-schedule+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-user-service-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbox": {
			"source": "iana",
			"extensions": ["mbox"]
		},
		"application/media-policy-dataset+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpf"]
		},
		"application/media_control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mediaservercontrol+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mscml"]
		},
		"application/merge-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/metalink+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["metalink"]
		},
		"application/metalink4+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["meta4"]
		},
		"application/mets+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mets"]
		},
		"application/mf4": { "source": "iana" },
		"application/mikey": { "source": "iana" },
		"application/mipc": { "source": "iana" },
		"application/missing-blocks+cbor-seq": { "source": "iana" },
		"application/mmt-aei+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["maei"]
		},
		"application/mmt-usd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["musd"]
		},
		"application/mods+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mods"]
		},
		"application/moss-keys": { "source": "iana" },
		"application/moss-signature": { "source": "iana" },
		"application/mosskey-data": { "source": "iana" },
		"application/mosskey-request": { "source": "iana" },
		"application/mp21": {
			"source": "iana",
			"extensions": ["m21", "mp21"]
		},
		"application/mp4": {
			"source": "iana",
			"extensions": ["mp4s", "m4p"]
		},
		"application/mpeg4-generic": { "source": "iana" },
		"application/mpeg4-iod": { "source": "iana" },
		"application/mpeg4-iod-xmt": { "source": "iana" },
		"application/mrb-consumer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mrb-publish+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/msc-ivr+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/msc-mixer+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/msword": {
			"source": "iana",
			"compressible": false,
			"extensions": ["doc", "dot"]
		},
		"application/mud+json": {
			"source": "iana",
			"compressible": true
		},
		"application/multipart-core": { "source": "iana" },
		"application/mxf": {
			"source": "iana",
			"extensions": ["mxf"]
		},
		"application/n-quads": {
			"source": "iana",
			"extensions": ["nq"]
		},
		"application/n-triples": {
			"source": "iana",
			"extensions": ["nt"]
		},
		"application/nasdata": { "source": "iana" },
		"application/news-checkgroups": {
			"source": "iana",
			"charset": "US-ASCII"
		},
		"application/news-groupinfo": {
			"source": "iana",
			"charset": "US-ASCII"
		},
		"application/news-transmission": { "source": "iana" },
		"application/nlsml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/node": {
			"source": "iana",
			"extensions": ["cjs"]
		},
		"application/nss": { "source": "iana" },
		"application/oauth-authz-req+jwt": { "source": "iana" },
		"application/oblivious-dns-message": { "source": "iana" },
		"application/ocsp-request": { "source": "iana" },
		"application/ocsp-response": { "source": "iana" },
		"application/octet-stream": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			"source": "iana",
			"extensions": ["oda"]
		},
		"application/odm+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/odx": { "source": "iana" },
		"application/oebps-package+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["opf"]
		},
		"application/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ogx"]
		},
		"application/omdoc+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["omdoc"]
		},
		"application/onenote": {
			"source": "apache",
			"extensions": [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg"
			]
		},
		"application/opc-nodeset+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/oscore": { "source": "iana" },
		"application/oxps": {
			"source": "iana",
			"extensions": ["oxps"]
		},
		"application/p21": { "source": "iana" },
		"application/p21+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/p2p-overlay+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["relo"]
		},
		"application/parityfec": { "source": "iana" },
		"application/passport": { "source": "iana" },
		"application/patch-ops-error+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xer"]
		},
		"application/pdf": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pdf"]
		},
		"application/pdx": { "source": "iana" },
		"application/pem-certificate-chain": { "source": "iana" },
		"application/pgp-encrypted": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pgp"]
		},
		"application/pgp-keys": {
			"source": "iana",
			"extensions": ["asc"]
		},
		"application/pgp-signature": {
			"source": "iana",
			"extensions": ["asc", "sig"]
		},
		"application/pics-rules": {
			"source": "apache",
			"extensions": ["prf"]
		},
		"application/pidf+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/pidf-diff+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/pkcs10": {
			"source": "iana",
			"extensions": ["p10"]
		},
		"application/pkcs12": { "source": "iana" },
		"application/pkcs7-mime": {
			"source": "iana",
			"extensions": ["p7m", "p7c"]
		},
		"application/pkcs7-signature": {
			"source": "iana",
			"extensions": ["p7s"]
		},
		"application/pkcs8": {
			"source": "iana",
			"extensions": ["p8"]
		},
		"application/pkcs8-encrypted": { "source": "iana" },
		"application/pkix-attr-cert": {
			"source": "iana",
			"extensions": ["ac"]
		},
		"application/pkix-cert": {
			"source": "iana",
			"extensions": ["cer"]
		},
		"application/pkix-crl": {
			"source": "iana",
			"extensions": ["crl"]
		},
		"application/pkix-pkipath": {
			"source": "iana",
			"extensions": ["pkipath"]
		},
		"application/pkixcmp": {
			"source": "iana",
			"extensions": ["pki"]
		},
		"application/pls+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["pls"]
		},
		"application/poc-settings+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/postscript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/provenance+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["provx"]
		},
		"application/prs.alvestrand.titrax-sheet": { "source": "iana" },
		"application/prs.cww": {
			"source": "iana",
			"extensions": ["cww"]
		},
		"application/prs.cyn": {
			"source": "iana",
			"charset": "7-BIT"
		},
		"application/prs.hpub+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/prs.nprend": { "source": "iana" },
		"application/prs.plucker": { "source": "iana" },
		"application/prs.rdf-xml-crypt": { "source": "iana" },
		"application/prs.xsf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/pskc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["pskcxml"]
		},
		"application/pvd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/qsig": { "source": "iana" },
		"application/raml+yaml": {
			"compressible": true,
			"extensions": ["raml"]
		},
		"application/raptorfec": { "source": "iana" },
		"application/rdap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/rdf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rdf", "owl"]
		},
		"application/reginfo+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rif"]
		},
		"application/relax-ng-compact-syntax": {
			"source": "iana",
			"extensions": ["rnc"]
		},
		"application/remote-printing": { "source": "iana" },
		"application/reputon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/resource-lists+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rl"]
		},
		"application/resource-lists-diff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rld"]
		},
		"application/rfc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/riscos": { "source": "iana" },
		"application/rlmi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/rls-services+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rs"]
		},
		"application/route-apd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rapd"]
		},
		"application/route-s-tsid+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sls"]
		},
		"application/route-usd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rusd"]
		},
		"application/rpki-ghostbusters": {
			"source": "iana",
			"extensions": ["gbr"]
		},
		"application/rpki-manifest": {
			"source": "iana",
			"extensions": ["mft"]
		},
		"application/rpki-publication": { "source": "iana" },
		"application/rpki-roa": {
			"source": "iana",
			"extensions": ["roa"]
		},
		"application/rpki-updown": { "source": "iana" },
		"application/rsd+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["rsd"]
		},
		"application/rss+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["rss"]
		},
		"application/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtf"]
		},
		"application/rtploopback": { "source": "iana" },
		"application/rtx": { "source": "iana" },
		"application/samlassertion+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/samlmetadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sarif+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sarif-external-properties+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sbe": { "source": "iana" },
		"application/sbml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sbml"]
		},
		"application/scaip+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/scim+json": {
			"source": "iana",
			"compressible": true
		},
		"application/scvp-cv-request": {
			"source": "iana",
			"extensions": ["scq"]
		},
		"application/scvp-cv-response": {
			"source": "iana",
			"extensions": ["scs"]
		},
		"application/scvp-vp-request": {
			"source": "iana",
			"extensions": ["spq"]
		},
		"application/scvp-vp-response": {
			"source": "iana",
			"extensions": ["spp"]
		},
		"application/sdp": {
			"source": "iana",
			"extensions": ["sdp"]
		},
		"application/secevent+jwt": { "source": "iana" },
		"application/senml+cbor": { "source": "iana" },
		"application/senml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/senml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["senmlx"]
		},
		"application/senml-etch+cbor": { "source": "iana" },
		"application/senml-etch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/senml-exi": { "source": "iana" },
		"application/sensml+cbor": { "source": "iana" },
		"application/sensml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sensml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sensmlx"]
		},
		"application/sensml-exi": { "source": "iana" },
		"application/sep+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sep-exi": { "source": "iana" },
		"application/session-info": { "source": "iana" },
		"application/set-payment": { "source": "iana" },
		"application/set-payment-initiation": {
			"source": "iana",
			"extensions": ["setpay"]
		},
		"application/set-registration": { "source": "iana" },
		"application/set-registration-initiation": {
			"source": "iana",
			"extensions": ["setreg"]
		},
		"application/sgml": { "source": "iana" },
		"application/sgml-open-catalog": { "source": "iana" },
		"application/shf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["shf"]
		},
		"application/sieve": {
			"source": "iana",
			"extensions": ["siv", "sieve"]
		},
		"application/simple-filter+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/simple-message-summary": { "source": "iana" },
		"application/simplesymbolcontainer": { "source": "iana" },
		"application/sipc": { "source": "iana" },
		"application/slate": { "source": "iana" },
		"application/smil": { "source": "iana" },
		"application/smil+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["smi", "smil"]
		},
		"application/smpte336m": { "source": "iana" },
		"application/soap+fastinfoset": { "source": "iana" },
		"application/soap+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sparql-query": {
			"source": "iana",
			"extensions": ["rq"]
		},
		"application/sparql-results+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["srx"]
		},
		"application/spdx+json": {
			"source": "iana",
			"compressible": true
		},
		"application/spirits-event+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sql": { "source": "iana" },
		"application/srgs": {
			"source": "iana",
			"extensions": ["gram"]
		},
		"application/srgs+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["grxml"]
		},
		"application/sru+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sru"]
		},
		"application/ssdl+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ssdl"]
		},
		"application/ssml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ssml"]
		},
		"application/stix+json": {
			"source": "iana",
			"compressible": true
		},
		"application/swid+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["swidtag"]
		},
		"application/tamp-apex-update": { "source": "iana" },
		"application/tamp-apex-update-confirm": { "source": "iana" },
		"application/tamp-community-update": { "source": "iana" },
		"application/tamp-community-update-confirm": { "source": "iana" },
		"application/tamp-error": { "source": "iana" },
		"application/tamp-sequence-adjust": { "source": "iana" },
		"application/tamp-sequence-adjust-confirm": { "source": "iana" },
		"application/tamp-status-query": { "source": "iana" },
		"application/tamp-status-response": { "source": "iana" },
		"application/tamp-update": { "source": "iana" },
		"application/tamp-update-confirm": { "source": "iana" },
		"application/tar": { "compressible": true },
		"application/taxii+json": {
			"source": "iana",
			"compressible": true
		},
		"application/td+json": {
			"source": "iana",
			"compressible": true
		},
		"application/tei+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tei", "teicorpus"]
		},
		"application/tetra_isi": { "source": "iana" },
		"application/thraud+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tfi"]
		},
		"application/timestamp-query": { "source": "iana" },
		"application/timestamp-reply": { "source": "iana" },
		"application/timestamped-data": {
			"source": "iana",
			"extensions": ["tsd"]
		},
		"application/tlsrpt+gzip": { "source": "iana" },
		"application/tlsrpt+json": {
			"source": "iana",
			"compressible": true
		},
		"application/tnauthlist": { "source": "iana" },
		"application/token-introspection+jwt": { "source": "iana" },
		"application/toml": {
			"compressible": true,
			"extensions": ["toml"]
		},
		"application/trickle-ice-sdpfrag": { "source": "iana" },
		"application/trig": {
			"source": "iana",
			"extensions": ["trig"]
		},
		"application/ttml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ttml"]
		},
		"application/tve-trigger": { "source": "iana" },
		"application/tzif": { "source": "iana" },
		"application/tzif-leap": { "source": "iana" },
		"application/ubjson": {
			"compressible": false,
			"extensions": ["ubj"]
		},
		"application/ulpfec": { "source": "iana" },
		"application/urc-grpsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/urc-ressheet+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rsheet"]
		},
		"application/urc-targetdesc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["td"]
		},
		"application/urc-uisocketdesc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vemmi": { "source": "iana" },
		"application/vividence.scriptfile": { "source": "apache" },
		"application/vnd.1000minds.decision-model+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["1km"]
		},
		"application/vnd.3gpp-prose+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp-v2x-local-service-information": { "source": "iana" },
		"application/vnd.3gpp.5gnas": { "source": "iana" },
		"application/vnd.3gpp.access-transfer-events+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.bsf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.gmop+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.gtpc": { "source": "iana" },
		"application/vnd.3gpp.interworking-data": { "source": "iana" },
		"application/vnd.3gpp.lpp": { "source": "iana" },
		"application/vnd.3gpp.mc-signalling-ear": { "source": "iana" },
		"application/vnd.3gpp.mcdata-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-payload": { "source": "iana" },
		"application/vnd.3gpp.mcdata-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-signalling": { "source": "iana" },
		"application/vnd.3gpp.mcdata-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-floor-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-location-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-signed+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-ue-init-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-affiliation-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-location-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-transmission-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mid-call+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.ngap": { "source": "iana" },
		"application/vnd.3gpp.pfcp": { "source": "iana" },
		"application/vnd.3gpp.pic-bw-large": {
			"source": "iana",
			"extensions": ["plb"]
		},
		"application/vnd.3gpp.pic-bw-small": {
			"source": "iana",
			"extensions": ["psb"]
		},
		"application/vnd.3gpp.pic-bw-var": {
			"source": "iana",
			"extensions": ["pvb"]
		},
		"application/vnd.3gpp.s1ap": { "source": "iana" },
		"application/vnd.3gpp.sms": { "source": "iana" },
		"application/vnd.3gpp.sms+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.ussd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp2.sms": { "source": "iana" },
		"application/vnd.3gpp2.tcap": {
			"source": "iana",
			"extensions": ["tcap"]
		},
		"application/vnd.3lightssoftware.imagescal": { "source": "iana" },
		"application/vnd.3m.post-it-notes": {
			"source": "iana",
			"extensions": ["pwn"]
		},
		"application/vnd.accpac.simply.aso": {
			"source": "iana",
			"extensions": ["aso"]
		},
		"application/vnd.accpac.simply.imp": {
			"source": "iana",
			"extensions": ["imp"]
		},
		"application/vnd.acucobol": {
			"source": "iana",
			"extensions": ["acu"]
		},
		"application/vnd.acucorp": {
			"source": "iana",
			"extensions": ["atc", "acutc"]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			"source": "apache",
			"compressible": false,
			"extensions": ["air"]
		},
		"application/vnd.adobe.flash.movie": { "source": "iana" },
		"application/vnd.adobe.formscentral.fcdt": {
			"source": "iana",
			"extensions": ["fcdt"]
		},
		"application/vnd.adobe.fxp": {
			"source": "iana",
			"extensions": ["fxp", "fxpl"]
		},
		"application/vnd.adobe.partial-upload": { "source": "iana" },
		"application/vnd.adobe.xdp+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdp"]
		},
		"application/vnd.adobe.xfdf": {
			"source": "iana",
			"extensions": ["xfdf"]
		},
		"application/vnd.aether.imp": { "source": "iana" },
		"application/vnd.afpc.afplinedata": { "source": "iana" },
		"application/vnd.afpc.afplinedata-pagedef": { "source": "iana" },
		"application/vnd.afpc.cmoca-cmresource": { "source": "iana" },
		"application/vnd.afpc.foca-charset": { "source": "iana" },
		"application/vnd.afpc.foca-codedfont": { "source": "iana" },
		"application/vnd.afpc.foca-codepage": { "source": "iana" },
		"application/vnd.afpc.modca": { "source": "iana" },
		"application/vnd.afpc.modca-cmtable": { "source": "iana" },
		"application/vnd.afpc.modca-formdef": { "source": "iana" },
		"application/vnd.afpc.modca-mediummap": { "source": "iana" },
		"application/vnd.afpc.modca-objectcontainer": { "source": "iana" },
		"application/vnd.afpc.modca-overlay": { "source": "iana" },
		"application/vnd.afpc.modca-pagesegment": { "source": "iana" },
		"application/vnd.age": {
			"source": "iana",
			"extensions": ["age"]
		},
		"application/vnd.ah-barcode": { "source": "iana" },
		"application/vnd.ahead.space": {
			"source": "iana",
			"extensions": ["ahead"]
		},
		"application/vnd.airzip.filesecure.azf": {
			"source": "iana",
			"extensions": ["azf"]
		},
		"application/vnd.airzip.filesecure.azs": {
			"source": "iana",
			"extensions": ["azs"]
		},
		"application/vnd.amadeus+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.amazon.ebook": {
			"source": "apache",
			"extensions": ["azw"]
		},
		"application/vnd.amazon.mobi8-ebook": { "source": "iana" },
		"application/vnd.americandynamics.acc": {
			"source": "iana",
			"extensions": ["acc"]
		},
		"application/vnd.amiga.ami": {
			"source": "iana",
			"extensions": ["ami"]
		},
		"application/vnd.amundsen.maze+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.android.ota": { "source": "iana" },
		"application/vnd.android.package-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": ["apk"]
		},
		"application/vnd.anki": { "source": "iana" },
		"application/vnd.anser-web-certificate-issue-initiation": {
			"source": "iana",
			"extensions": ["cii"]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			"source": "apache",
			"extensions": ["fti"]
		},
		"application/vnd.antix.game-component": {
			"source": "iana",
			"extensions": ["atx"]
		},
		"application/vnd.apache.arrow.file": { "source": "iana" },
		"application/vnd.apache.arrow.stream": { "source": "iana" },
		"application/vnd.apache.thrift.binary": { "source": "iana" },
		"application/vnd.apache.thrift.compact": { "source": "iana" },
		"application/vnd.apache.thrift.json": { "source": "iana" },
		"application/vnd.api+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.aplextor.warrp+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apothekende.reservation+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apple.installer+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpkg"]
		},
		"application/vnd.apple.keynote": {
			"source": "iana",
			"extensions": ["key"]
		},
		"application/vnd.apple.mpegurl": {
			"source": "iana",
			"extensions": ["m3u8"]
		},
		"application/vnd.apple.numbers": {
			"source": "iana",
			"extensions": ["numbers"]
		},
		"application/vnd.apple.pages": {
			"source": "iana",
			"extensions": ["pages"]
		},
		"application/vnd.apple.pkpass": {
			"compressible": false,
			"extensions": ["pkpass"]
		},
		"application/vnd.arastra.swi": { "source": "iana" },
		"application/vnd.aristanetworks.swi": {
			"source": "iana",
			"extensions": ["swi"]
		},
		"application/vnd.artisan+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.artsquare": { "source": "iana" },
		"application/vnd.astraea-software.iota": {
			"source": "iana",
			"extensions": ["iota"]
		},
		"application/vnd.audiograph": {
			"source": "iana",
			"extensions": ["aep"]
		},
		"application/vnd.autopackage": { "source": "iana" },
		"application/vnd.avalon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.avistar+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.balsamiq.bmml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["bmml"]
		},
		"application/vnd.balsamiq.bmpr": { "source": "iana" },
		"application/vnd.banana-accounting": { "source": "iana" },
		"application/vnd.bbf.usp.error": { "source": "iana" },
		"application/vnd.bbf.usp.msg": { "source": "iana" },
		"application/vnd.bbf.usp.msg+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.bekitzur-stech+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.bint.med-content": { "source": "iana" },
		"application/vnd.biopax.rdf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.blink-idb-value-wrapper": { "source": "iana" },
		"application/vnd.blueice.multipass": {
			"source": "iana",
			"extensions": ["mpm"]
		},
		"application/vnd.bluetooth.ep.oob": { "source": "iana" },
		"application/vnd.bluetooth.le.oob": { "source": "iana" },
		"application/vnd.bmi": {
			"source": "iana",
			"extensions": ["bmi"]
		},
		"application/vnd.bpf": { "source": "iana" },
		"application/vnd.bpf3": { "source": "iana" },
		"application/vnd.businessobjects": {
			"source": "iana",
			"extensions": ["rep"]
		},
		"application/vnd.byu.uapi+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cab-jscript": { "source": "iana" },
		"application/vnd.canon-cpdl": { "source": "iana" },
		"application/vnd.canon-lips": { "source": "iana" },
		"application/vnd.capasystems-pg+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cendio.thinlinc.clientconf": { "source": "iana" },
		"application/vnd.century-systems.tcp_stream": { "source": "iana" },
		"application/vnd.chemdraw+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cdxml"]
		},
		"application/vnd.chess-pgn": { "source": "iana" },
		"application/vnd.chipnuts.karaoke-mmd": {
			"source": "iana",
			"extensions": ["mmd"]
		},
		"application/vnd.ciedi": { "source": "iana" },
		"application/vnd.cinderella": {
			"source": "iana",
			"extensions": ["cdy"]
		},
		"application/vnd.cirpack.isdn-ext": { "source": "iana" },
		"application/vnd.citationstyles.style+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["csl"]
		},
		"application/vnd.claymore": {
			"source": "iana",
			"extensions": ["cla"]
		},
		"application/vnd.cloanto.rp9": {
			"source": "iana",
			"extensions": ["rp9"]
		},
		"application/vnd.clonk.c4group": {
			"source": "iana",
			"extensions": [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			"source": "iana",
			"extensions": ["c11amc"]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			"source": "iana",
			"extensions": ["c11amz"]
		},
		"application/vnd.coffeescript": { "source": "iana" },
		"application/vnd.collabio.xodocuments.document": { "source": "iana" },
		"application/vnd.collabio.xodocuments.document-template": { "source": "iana" },
		"application/vnd.collabio.xodocuments.presentation": { "source": "iana" },
		"application/vnd.collabio.xodocuments.presentation-template": { "source": "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet": { "source": "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet-template": { "source": "iana" },
		"application/vnd.collection+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.doc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.next+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.comicbook+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.comicbook-rar": { "source": "iana" },
		"application/vnd.commerce-battelle": { "source": "iana" },
		"application/vnd.commonspace": {
			"source": "iana",
			"extensions": ["csp"]
		},
		"application/vnd.contact.cmsg": {
			"source": "iana",
			"extensions": ["cdbcmsg"]
		},
		"application/vnd.coreos.ignition+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cosmocaller": {
			"source": "iana",
			"extensions": ["cmc"]
		},
		"application/vnd.crick.clicker": {
			"source": "iana",
			"extensions": ["clkx"]
		},
		"application/vnd.crick.clicker.keyboard": {
			"source": "iana",
			"extensions": ["clkk"]
		},
		"application/vnd.crick.clicker.palette": {
			"source": "iana",
			"extensions": ["clkp"]
		},
		"application/vnd.crick.clicker.template": {
			"source": "iana",
			"extensions": ["clkt"]
		},
		"application/vnd.crick.clicker.wordbank": {
			"source": "iana",
			"extensions": ["clkw"]
		},
		"application/vnd.criticaltools.wbs+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wbs"]
		},
		"application/vnd.cryptii.pipe+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.crypto-shade-file": { "source": "iana" },
		"application/vnd.cryptomator.encrypted": { "source": "iana" },
		"application/vnd.cryptomator.vault": { "source": "iana" },
		"application/vnd.ctc-posml": {
			"source": "iana",
			"extensions": ["pml"]
		},
		"application/vnd.ctct.ws+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cups-pdf": { "source": "iana" },
		"application/vnd.cups-postscript": { "source": "iana" },
		"application/vnd.cups-ppd": {
			"source": "iana",
			"extensions": ["ppd"]
		},
		"application/vnd.cups-raster": { "source": "iana" },
		"application/vnd.cups-raw": { "source": "iana" },
		"application/vnd.curl": { "source": "iana" },
		"application/vnd.curl.car": {
			"source": "apache",
			"extensions": ["car"]
		},
		"application/vnd.curl.pcurl": {
			"source": "apache",
			"extensions": ["pcurl"]
		},
		"application/vnd.cyan.dean.root+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cybank": { "source": "iana" },
		"application/vnd.cyclonedx+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cyclonedx+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.d2l.coursepackage1p0+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.d3m-dataset": { "source": "iana" },
		"application/vnd.d3m-problem": { "source": "iana" },
		"application/vnd.dart": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dart"]
		},
		"application/vnd.data-vision.rdz": {
			"source": "iana",
			"extensions": ["rdz"]
		},
		"application/vnd.datapackage+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dataresource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dbf": {
			"source": "iana",
			"extensions": ["dbf"]
		},
		"application/vnd.debian.binary-package": { "source": "iana" },
		"application/vnd.dece.data": {
			"source": "iana",
			"extensions": [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["uvt", "uvvt"]
		},
		"application/vnd.dece.unspecified": {
			"source": "iana",
			"extensions": ["uvx", "uvvx"]
		},
		"application/vnd.dece.zip": {
			"source": "iana",
			"extensions": ["uvz", "uvvz"]
		},
		"application/vnd.denovo.fcselayout-link": {
			"source": "iana",
			"extensions": ["fe_launch"]
		},
		"application/vnd.desmume.movie": { "source": "iana" },
		"application/vnd.dir-bi.plate-dl-nosuffix": { "source": "iana" },
		"application/vnd.dm.delegation+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dna": {
			"source": "iana",
			"extensions": ["dna"]
		},
		"application/vnd.document+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dolby.mlp": {
			"source": "apache",
			"extensions": ["mlp"]
		},
		"application/vnd.dolby.mobile.1": { "source": "iana" },
		"application/vnd.dolby.mobile.2": { "source": "iana" },
		"application/vnd.doremir.scorecloud-binary-document": { "source": "iana" },
		"application/vnd.dpgraph": {
			"source": "iana",
			"extensions": ["dpg"]
		},
		"application/vnd.dreamfactory": {
			"source": "iana",
			"extensions": ["dfac"]
		},
		"application/vnd.drive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ds-keypoint": {
			"source": "apache",
			"extensions": ["kpxx"]
		},
		"application/vnd.dtg.local": { "source": "iana" },
		"application/vnd.dtg.local.flash": { "source": "iana" },
		"application/vnd.dtg.local.html": { "source": "iana" },
		"application/vnd.dvb.ait": {
			"source": "iana",
			"extensions": ["ait"]
		},
		"application/vnd.dvb.dvbisl+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.dvbj": { "source": "iana" },
		"application/vnd.dvb.esgcontainer": { "source": "iana" },
		"application/vnd.dvb.ipdcdftnotifaccess": { "source": "iana" },
		"application/vnd.dvb.ipdcesgaccess": { "source": "iana" },
		"application/vnd.dvb.ipdcesgaccess2": { "source": "iana" },
		"application/vnd.dvb.ipdcesgpdd": { "source": "iana" },
		"application/vnd.dvb.ipdcroaming": { "source": "iana" },
		"application/vnd.dvb.iptv.alfec-base": { "source": "iana" },
		"application/vnd.dvb.iptv.alfec-enhancement": { "source": "iana" },
		"application/vnd.dvb.notif-aggregate-root+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-container+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-generic+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-init+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.pfr": { "source": "iana" },
		"application/vnd.dvb.service": {
			"source": "iana",
			"extensions": ["svc"]
		},
		"application/vnd.dxr": { "source": "iana" },
		"application/vnd.dynageo": {
			"source": "iana",
			"extensions": ["geo"]
		},
		"application/vnd.dzr": { "source": "iana" },
		"application/vnd.easykaraoke.cdgdownload": { "source": "iana" },
		"application/vnd.ecdis-update": { "source": "iana" },
		"application/vnd.ecip.rlp": { "source": "iana" },
		"application/vnd.eclipse.ditto+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ecowin.chart": {
			"source": "iana",
			"extensions": ["mag"]
		},
		"application/vnd.ecowin.filerequest": { "source": "iana" },
		"application/vnd.ecowin.fileupdate": { "source": "iana" },
		"application/vnd.ecowin.series": { "source": "iana" },
		"application/vnd.ecowin.seriesrequest": { "source": "iana" },
		"application/vnd.ecowin.seriesupdate": { "source": "iana" },
		"application/vnd.efi.img": { "source": "iana" },
		"application/vnd.efi.iso": { "source": "iana" },
		"application/vnd.emclient.accessrequest+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.enliven": {
			"source": "iana",
			"extensions": ["nml"]
		},
		"application/vnd.enphase.envoy": { "source": "iana" },
		"application/vnd.eprints.data+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.epson.esf": {
			"source": "iana",
			"extensions": ["esf"]
		},
		"application/vnd.epson.msf": {
			"source": "iana",
			"extensions": ["msf"]
		},
		"application/vnd.epson.quickanime": {
			"source": "iana",
			"extensions": ["qam"]
		},
		"application/vnd.epson.salt": {
			"source": "iana",
			"extensions": ["slt"]
		},
		"application/vnd.epson.ssf": {
			"source": "iana",
			"extensions": ["ssf"]
		},
		"application/vnd.ericsson.quickcall": { "source": "iana" },
		"application/vnd.espass-espass+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.eszigno3+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["es3", "et3"]
		},
		"application/vnd.etsi.aoc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.asic-e+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.etsi.asic-s+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.etsi.cug+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvcommand+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvservice+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsync+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.mcid+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.mheg5": { "source": "iana" },
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.pstn+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.sci+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.simservs+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.timestamp-token": { "source": "iana" },
		"application/vnd.etsi.tsl+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.tsl.der": { "source": "iana" },
		"application/vnd.eu.kasparian.car+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.eudora.data": { "source": "iana" },
		"application/vnd.evolv.ecig.profile": { "source": "iana" },
		"application/vnd.evolv.ecig.settings": { "source": "iana" },
		"application/vnd.evolv.ecig.theme": { "source": "iana" },
		"application/vnd.exstream-empower+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.exstream-package": { "source": "iana" },
		"application/vnd.ezpix-album": {
			"source": "iana",
			"extensions": ["ez2"]
		},
		"application/vnd.ezpix-package": {
			"source": "iana",
			"extensions": ["ez3"]
		},
		"application/vnd.f-secure.mobile": { "source": "iana" },
		"application/vnd.familysearch.gedcom+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.fastcopy-disk-image": { "source": "iana" },
		"application/vnd.fdf": {
			"source": "iana",
			"extensions": ["fdf"]
		},
		"application/vnd.fdsn.mseed": {
			"source": "iana",
			"extensions": ["mseed"]
		},
		"application/vnd.fdsn.seed": {
			"source": "iana",
			"extensions": ["seed", "dataless"]
		},
		"application/vnd.ffsns": { "source": "iana" },
		"application/vnd.ficlab.flb+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.filmit.zfc": { "source": "iana" },
		"application/vnd.fints": { "source": "iana" },
		"application/vnd.firemonkeys.cloudcell": { "source": "iana" },
		"application/vnd.flographit": {
			"source": "iana",
			"extensions": ["gph"]
		},
		"application/vnd.fluxtime.clip": {
			"source": "iana",
			"extensions": ["ftc"]
		},
		"application/vnd.font-fontforge-sfd": { "source": "iana" },
		"application/vnd.framemaker": {
			"source": "iana",
			"extensions": [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.frogans.fnc": {
			"source": "iana",
			"extensions": ["fnc"]
		},
		"application/vnd.frogans.ltf": {
			"source": "iana",
			"extensions": ["ltf"]
		},
		"application/vnd.fsc.weblaunch": {
			"source": "iana",
			"extensions": ["fsc"]
		},
		"application/vnd.fujifilm.fb.docuworks": { "source": "iana" },
		"application/vnd.fujifilm.fb.docuworks.binder": { "source": "iana" },
		"application/vnd.fujifilm.fb.docuworks.container": { "source": "iana" },
		"application/vnd.fujifilm.fb.jfi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.fujitsu.oasys": {
			"source": "iana",
			"extensions": ["oas"]
		},
		"application/vnd.fujitsu.oasys2": {
			"source": "iana",
			"extensions": ["oa2"]
		},
		"application/vnd.fujitsu.oasys3": {
			"source": "iana",
			"extensions": ["oa3"]
		},
		"application/vnd.fujitsu.oasysgp": {
			"source": "iana",
			"extensions": ["fg5"]
		},
		"application/vnd.fujitsu.oasysprs": {
			"source": "iana",
			"extensions": ["bh2"]
		},
		"application/vnd.fujixerox.art-ex": { "source": "iana" },
		"application/vnd.fujixerox.art4": { "source": "iana" },
		"application/vnd.fujixerox.ddd": {
			"source": "iana",
			"extensions": ["ddd"]
		},
		"application/vnd.fujixerox.docuworks": {
			"source": "iana",
			"extensions": ["xdw"]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			"source": "iana",
			"extensions": ["xbd"]
		},
		"application/vnd.fujixerox.docuworks.container": { "source": "iana" },
		"application/vnd.fujixerox.hbpl": { "source": "iana" },
		"application/vnd.fut-misnet": { "source": "iana" },
		"application/vnd.futoin+cbor": { "source": "iana" },
		"application/vnd.futoin+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.fuzzysheet": {
			"source": "iana",
			"extensions": ["fzs"]
		},
		"application/vnd.genomatix.tuxedo": {
			"source": "iana",
			"extensions": ["txd"]
		},
		"application/vnd.gentics.grd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geo+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geocube+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geogebra.file": {
			"source": "iana",
			"extensions": ["ggb"]
		},
		"application/vnd.geogebra.slides": { "source": "iana" },
		"application/vnd.geogebra.tool": {
			"source": "iana",
			"extensions": ["ggt"]
		},
		"application/vnd.geometry-explorer": {
			"source": "iana",
			"extensions": ["gex", "gre"]
		},
		"application/vnd.geonext": {
			"source": "iana",
			"extensions": ["gxt"]
		},
		"application/vnd.geoplan": {
			"source": "iana",
			"extensions": ["g2w"]
		},
		"application/vnd.geospace": {
			"source": "iana",
			"extensions": ["g3w"]
		},
		"application/vnd.gerber": { "source": "iana" },
		"application/vnd.globalplatform.card-content-mgt": { "source": "iana" },
		"application/vnd.globalplatform.card-content-mgt-response": { "source": "iana" },
		"application/vnd.gmx": {
			"source": "iana",
			"extensions": ["gmx"]
		},
		"application/vnd.google-apps.document": {
			"compressible": false,
			"extensions": ["gdoc"]
		},
		"application/vnd.google-apps.presentation": {
			"compressible": false,
			"extensions": ["gslides"]
		},
		"application/vnd.google-apps.spreadsheet": {
			"compressible": false,
			"extensions": ["gsheet"]
		},
		"application/vnd.google-earth.kml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["kml"]
		},
		"application/vnd.google-earth.kmz": {
			"source": "iana",
			"compressible": false,
			"extensions": ["kmz"]
		},
		"application/vnd.gov.sk.e-form+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.gov.sk.e-form+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.grafeq": {
			"source": "iana",
			"extensions": ["gqf", "gqs"]
		},
		"application/vnd.gridmp": { "source": "iana" },
		"application/vnd.groove-account": {
			"source": "iana",
			"extensions": ["gac"]
		},
		"application/vnd.groove-help": {
			"source": "iana",
			"extensions": ["ghf"]
		},
		"application/vnd.groove-identity-message": {
			"source": "iana",
			"extensions": ["gim"]
		},
		"application/vnd.groove-injector": {
			"source": "iana",
			"extensions": ["grv"]
		},
		"application/vnd.groove-tool-message": {
			"source": "iana",
			"extensions": ["gtm"]
		},
		"application/vnd.groove-tool-template": {
			"source": "iana",
			"extensions": ["tpl"]
		},
		"application/vnd.groove-vcard": {
			"source": "iana",
			"extensions": ["vcg"]
		},
		"application/vnd.hal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hal+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["hal"]
		},
		"application/vnd.handheld-entertainment+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["zmm"]
		},
		"application/vnd.hbci": {
			"source": "iana",
			"extensions": ["hbci"]
		},
		"application/vnd.hc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hcl-bireports": { "source": "iana" },
		"application/vnd.hdt": { "source": "iana" },
		"application/vnd.heroku+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hhe.lesson-player": {
			"source": "iana",
			"extensions": ["les"]
		},
		"application/vnd.hl7cda+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.hl7v2+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.hp-hpgl": {
			"source": "iana",
			"extensions": ["hpgl"]
		},
		"application/vnd.hp-hpid": {
			"source": "iana",
			"extensions": ["hpid"]
		},
		"application/vnd.hp-hps": {
			"source": "iana",
			"extensions": ["hps"]
		},
		"application/vnd.hp-jlyt": {
			"source": "iana",
			"extensions": ["jlt"]
		},
		"application/vnd.hp-pcl": {
			"source": "iana",
			"extensions": ["pcl"]
		},
		"application/vnd.hp-pclxl": {
			"source": "iana",
			"extensions": ["pclxl"]
		},
		"application/vnd.httphone": { "source": "iana" },
		"application/vnd.hydrostatix.sof-data": {
			"source": "iana",
			"extensions": ["sfd-hdstx"]
		},
		"application/vnd.hyper+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hyper-item+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hyperdrive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hzn-3d-crossword": { "source": "iana" },
		"application/vnd.ibm.afplinedata": { "source": "iana" },
		"application/vnd.ibm.electronic-media": { "source": "iana" },
		"application/vnd.ibm.minipay": {
			"source": "iana",
			"extensions": ["mpy"]
		},
		"application/vnd.ibm.modcap": {
			"source": "iana",
			"extensions": [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			"source": "iana",
			"extensions": ["irm"]
		},
		"application/vnd.ibm.secure-container": {
			"source": "iana",
			"extensions": ["sc"]
		},
		"application/vnd.iccprofile": {
			"source": "iana",
			"extensions": ["icc", "icm"]
		},
		"application/vnd.ieee.1905": { "source": "iana" },
		"application/vnd.igloader": {
			"source": "iana",
			"extensions": ["igl"]
		},
		"application/vnd.imagemeter.folder+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.imagemeter.image+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.immervision-ivp": {
			"source": "iana",
			"extensions": ["ivp"]
		},
		"application/vnd.immervision-ivu": {
			"source": "iana",
			"extensions": ["ivu"]
		},
		"application/vnd.ims.imsccv1p1": { "source": "iana" },
		"application/vnd.ims.imsccv1p2": { "source": "iana" },
		"application/vnd.ims.imsccv1p3": { "source": "iana" },
		"application/vnd.ims.lis.v2.result+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informedcontrol.rms+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informix-visionary": { "source": "iana" },
		"application/vnd.infotech.project": { "source": "iana" },
		"application/vnd.infotech.project+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.innopath.wamp.notification": { "source": "iana" },
		"application/vnd.insors.igm": {
			"source": "iana",
			"extensions": ["igm"]
		},
		"application/vnd.intercon.formnet": {
			"source": "iana",
			"extensions": ["xpw", "xpx"]
		},
		"application/vnd.intergeo": {
			"source": "iana",
			"extensions": ["i2g"]
		},
		"application/vnd.intertrust.digibox": { "source": "iana" },
		"application/vnd.intertrust.nncp": { "source": "iana" },
		"application/vnd.intu.qbo": {
			"source": "iana",
			"extensions": ["qbo"]
		},
		"application/vnd.intu.qfx": {
			"source": "iana",
			"extensions": ["qfx"]
		},
		"application/vnd.iptc.g2.catalogitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ipunplugged.rcprofile": {
			"source": "iana",
			"extensions": ["rcprofile"]
		},
		"application/vnd.irepository.package+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["irp"]
		},
		"application/vnd.is-xpr": {
			"source": "iana",
			"extensions": ["xpr"]
		},
		"application/vnd.isac.fcs": {
			"source": "iana",
			"extensions": ["fcs"]
		},
		"application/vnd.iso11783-10+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.jam": {
			"source": "iana",
			"extensions": ["jam"]
		},
		"application/vnd.japannet-directory-service": { "source": "iana" },
		"application/vnd.japannet-jpnstore-wakeup": { "source": "iana" },
		"application/vnd.japannet-payment-wakeup": { "source": "iana" },
		"application/vnd.japannet-registration": { "source": "iana" },
		"application/vnd.japannet-registration-wakeup": { "source": "iana" },
		"application/vnd.japannet-setstore-wakeup": { "source": "iana" },
		"application/vnd.japannet-verification": { "source": "iana" },
		"application/vnd.japannet-verification-wakeup": { "source": "iana" },
		"application/vnd.jcp.javame.midlet-rms": {
			"source": "iana",
			"extensions": ["rms"]
		},
		"application/vnd.jisp": {
			"source": "iana",
			"extensions": ["jisp"]
		},
		"application/vnd.joost.joda-archive": {
			"source": "iana",
			"extensions": ["joda"]
		},
		"application/vnd.jsk.isdn-ngn": { "source": "iana" },
		"application/vnd.kahootz": {
			"source": "iana",
			"extensions": ["ktz", "ktr"]
		},
		"application/vnd.kde.karbon": {
			"source": "iana",
			"extensions": ["karbon"]
		},
		"application/vnd.kde.kchart": {
			"source": "iana",
			"extensions": ["chrt"]
		},
		"application/vnd.kde.kformula": {
			"source": "iana",
			"extensions": ["kfo"]
		},
		"application/vnd.kde.kivio": {
			"source": "iana",
			"extensions": ["flw"]
		},
		"application/vnd.kde.kontour": {
			"source": "iana",
			"extensions": ["kon"]
		},
		"application/vnd.kde.kpresenter": {
			"source": "iana",
			"extensions": ["kpr", "kpt"]
		},
		"application/vnd.kde.kspread": {
			"source": "iana",
			"extensions": ["ksp"]
		},
		"application/vnd.kde.kword": {
			"source": "iana",
			"extensions": ["kwd", "kwt"]
		},
		"application/vnd.kenameaapp": {
			"source": "iana",
			"extensions": ["htke"]
		},
		"application/vnd.kidspiration": {
			"source": "iana",
			"extensions": ["kia"]
		},
		"application/vnd.kinar": {
			"source": "iana",
			"extensions": ["kne", "knp"]
		},
		"application/vnd.koan": {
			"source": "iana",
			"extensions": [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			"source": "iana",
			"extensions": ["sse"]
		},
		"application/vnd.las": { "source": "iana" },
		"application/vnd.las.las+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.las.las+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lasxml"]
		},
		"application/vnd.laszip": { "source": "iana" },
		"application/vnd.leap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.liberty-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			"source": "iana",
			"extensions": ["lbd"]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lbe"]
		},
		"application/vnd.logipipe.circuit+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.loom": { "source": "iana" },
		"application/vnd.lotus-1-2-3": {
			"source": "iana",
			"extensions": ["123"]
		},
		"application/vnd.lotus-approach": {
			"source": "iana",
			"extensions": ["apr"]
		},
		"application/vnd.lotus-freelance": {
			"source": "iana",
			"extensions": ["pre"]
		},
		"application/vnd.lotus-notes": {
			"source": "iana",
			"extensions": ["nsf"]
		},
		"application/vnd.lotus-organizer": {
			"source": "iana",
			"extensions": ["org"]
		},
		"application/vnd.lotus-screencam": {
			"source": "iana",
			"extensions": ["scm"]
		},
		"application/vnd.lotus-wordpro": {
			"source": "iana",
			"extensions": ["lwp"]
		},
		"application/vnd.macports.portpkg": {
			"source": "iana",
			"extensions": ["portpkg"]
		},
		"application/vnd.mapbox-vector-tile": {
			"source": "iana",
			"extensions": ["mvt"]
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.license+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.mdcf": { "source": "iana" },
		"application/vnd.mason+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.maxar.archive.3tz+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.maxmind.maxmind-db": { "source": "iana" },
		"application/vnd.mcd": {
			"source": "iana",
			"extensions": ["mcd"]
		},
		"application/vnd.medcalcdata": {
			"source": "iana",
			"extensions": ["mc1"]
		},
		"application/vnd.mediastation.cdkey": {
			"source": "iana",
			"extensions": ["cdkey"]
		},
		"application/vnd.meridian-slingshot": { "source": "iana" },
		"application/vnd.mfer": {
			"source": "iana",
			"extensions": ["mwf"]
		},
		"application/vnd.mfmp": {
			"source": "iana",
			"extensions": ["mfm"]
		},
		"application/vnd.micro+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.micrografx.flo": {
			"source": "iana",
			"extensions": ["flo"]
		},
		"application/vnd.micrografx.igx": {
			"source": "iana",
			"extensions": ["igx"]
		},
		"application/vnd.microsoft.portable-executable": { "source": "iana" },
		"application/vnd.microsoft.windows.thumbnail-cache": { "source": "iana" },
		"application/vnd.miele+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.mif": {
			"source": "iana",
			"extensions": ["mif"]
		},
		"application/vnd.minisoft-hp3000-save": { "source": "iana" },
		"application/vnd.mitsubishi.misty-guard.trustweb": { "source": "iana" },
		"application/vnd.mobius.daf": {
			"source": "iana",
			"extensions": ["daf"]
		},
		"application/vnd.mobius.dis": {
			"source": "iana",
			"extensions": ["dis"]
		},
		"application/vnd.mobius.mbk": {
			"source": "iana",
			"extensions": ["mbk"]
		},
		"application/vnd.mobius.mqy": {
			"source": "iana",
			"extensions": ["mqy"]
		},
		"application/vnd.mobius.msl": {
			"source": "iana",
			"extensions": ["msl"]
		},
		"application/vnd.mobius.plc": {
			"source": "iana",
			"extensions": ["plc"]
		},
		"application/vnd.mobius.txf": {
			"source": "iana",
			"extensions": ["txf"]
		},
		"application/vnd.mophun.application": {
			"source": "iana",
			"extensions": ["mpn"]
		},
		"application/vnd.mophun.certificate": {
			"source": "iana",
			"extensions": ["mpc"]
		},
		"application/vnd.motorola.flexsuite": { "source": "iana" },
		"application/vnd.motorola.flexsuite.adsi": { "source": "iana" },
		"application/vnd.motorola.flexsuite.fis": { "source": "iana" },
		"application/vnd.motorola.flexsuite.gotap": { "source": "iana" },
		"application/vnd.motorola.flexsuite.kmr": { "source": "iana" },
		"application/vnd.motorola.flexsuite.ttc": { "source": "iana" },
		"application/vnd.motorola.flexsuite.wem": { "source": "iana" },
		"application/vnd.motorola.iprm": { "source": "iana" },
		"application/vnd.mozilla.xul+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xul"]
		},
		"application/vnd.ms-3mfdocument": { "source": "iana" },
		"application/vnd.ms-artgalry": {
			"source": "iana",
			"extensions": ["cil"]
		},
		"application/vnd.ms-asf": { "source": "iana" },
		"application/vnd.ms-cab-compressed": {
			"source": "iana",
			"extensions": ["cab"]
		},
		"application/vnd.ms-color.iccprofile": { "source": "apache" },
		"application/vnd.ms-excel": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlam"]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlsb"]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlsm"]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["xltm"]
		},
		"application/vnd.ms-fontobject": {
			"source": "iana",
			"compressible": true,
			"extensions": ["eot"]
		},
		"application/vnd.ms-htmlhelp": {
			"source": "iana",
			"extensions": ["chm"]
		},
		"application/vnd.ms-ims": {
			"source": "iana",
			"extensions": ["ims"]
		},
		"application/vnd.ms-lrm": {
			"source": "iana",
			"extensions": ["lrm"]
		},
		"application/vnd.ms-office.activex+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-officetheme": {
			"source": "iana",
			"extensions": ["thmx"]
		},
		"application/vnd.ms-opentype": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-outlook": {
			"compressible": false,
			"extensions": ["msg"]
		},
		"application/vnd.ms-package.obfuscated-opentype": { "source": "apache" },
		"application/vnd.ms-pki.seccat": {
			"source": "apache",
			"extensions": ["cat"]
		},
		"application/vnd.ms-pki.stl": {
			"source": "apache",
			"extensions": ["stl"]
		},
		"application/vnd.ms-playready.initiator+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-powerpoint": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			"source": "iana",
			"extensions": ["ppam"]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			"source": "iana",
			"extensions": ["pptm"]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			"source": "iana",
			"extensions": ["sldm"]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			"source": "iana",
			"extensions": ["ppsm"]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["potm"]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-printing.printticket+xml": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-printschematicket+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-project": {
			"source": "iana",
			"extensions": ["mpp", "mpt"]
		},
		"application/vnd.ms-tnef": { "source": "iana" },
		"application/vnd.ms-windows.devicepairing": { "source": "iana" },
		"application/vnd.ms-windows.nwprinting.oob": { "source": "iana" },
		"application/vnd.ms-windows.printerpairing": { "source": "iana" },
		"application/vnd.ms-windows.wsd.oob": { "source": "iana" },
		"application/vnd.ms-wmdrm.lic-chlg-req": { "source": "iana" },
		"application/vnd.ms-wmdrm.lic-resp": { "source": "iana" },
		"application/vnd.ms-wmdrm.meter-chlg-req": { "source": "iana" },
		"application/vnd.ms-wmdrm.meter-resp": { "source": "iana" },
		"application/vnd.ms-word.document.macroenabled.12": {
			"source": "iana",
			"extensions": ["docm"]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["dotm"]
		},
		"application/vnd.ms-works": {
			"source": "iana",
			"extensions": [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			"source": "iana",
			"extensions": ["wpl"]
		},
		"application/vnd.ms-xpsdocument": {
			"source": "iana",
			"compressible": false,
			"extensions": ["xps"]
		},
		"application/vnd.msa-disk-image": { "source": "iana" },
		"application/vnd.mseq": {
			"source": "iana",
			"extensions": ["mseq"]
		},
		"application/vnd.msign": { "source": "iana" },
		"application/vnd.multiad.creator": { "source": "iana" },
		"application/vnd.multiad.creator.cif": { "source": "iana" },
		"application/vnd.music-niff": { "source": "iana" },
		"application/vnd.musician": {
			"source": "iana",
			"extensions": ["mus"]
		},
		"application/vnd.muvee.style": {
			"source": "iana",
			"extensions": ["msty"]
		},
		"application/vnd.mynfc": {
			"source": "iana",
			"extensions": ["taglet"]
		},
		"application/vnd.nacamar.ybrid+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ncd.control": { "source": "iana" },
		"application/vnd.ncd.reference": { "source": "iana" },
		"application/vnd.nearst.inv+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nebumind.line": { "source": "iana" },
		"application/vnd.nervana": { "source": "iana" },
		"application/vnd.netfpx": { "source": "iana" },
		"application/vnd.neurolanguage.nlu": {
			"source": "iana",
			"extensions": ["nlu"]
		},
		"application/vnd.nimn": { "source": "iana" },
		"application/vnd.nintendo.nitro.rom": { "source": "iana" },
		"application/vnd.nintendo.snes.rom": { "source": "iana" },
		"application/vnd.nitf": {
			"source": "iana",
			"extensions": ["ntf", "nitf"]
		},
		"application/vnd.noblenet-directory": {
			"source": "iana",
			"extensions": ["nnd"]
		},
		"application/vnd.noblenet-sealer": {
			"source": "iana",
			"extensions": ["nns"]
		},
		"application/vnd.noblenet-web": {
			"source": "iana",
			"extensions": ["nnw"]
		},
		"application/vnd.nokia.catalogs": { "source": "iana" },
		"application/vnd.nokia.conml+wbxml": { "source": "iana" },
		"application/vnd.nokia.conml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.iptv.config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.isds-radio-presets": { "source": "iana" },
		"application/vnd.nokia.landmark+wbxml": { "source": "iana" },
		"application/vnd.nokia.landmark+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ac"]
		},
		"application/vnd.nokia.n-gage.data": {
			"source": "iana",
			"extensions": ["ngdat"]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			"source": "iana",
			"extensions": ["n-gage"]
		},
		"application/vnd.nokia.ncd": { "source": "iana" },
		"application/vnd.nokia.pcd+wbxml": { "source": "iana" },
		"application/vnd.nokia.pcd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.radio-preset": {
			"source": "iana",
			"extensions": ["rpst"]
		},
		"application/vnd.nokia.radio-presets": {
			"source": "iana",
			"extensions": ["rpss"]
		},
		"application/vnd.novadigm.edm": {
			"source": "iana",
			"extensions": ["edm"]
		},
		"application/vnd.novadigm.edx": {
			"source": "iana",
			"extensions": ["edx"]
		},
		"application/vnd.novadigm.ext": {
			"source": "iana",
			"extensions": ["ext"]
		},
		"application/vnd.ntt-local.content-share": { "source": "iana" },
		"application/vnd.ntt-local.file-transfer": { "source": "iana" },
		"application/vnd.ntt-local.ogw_remote-access": { "source": "iana" },
		"application/vnd.ntt-local.sip-ta_remote": { "source": "iana" },
		"application/vnd.ntt-local.sip-ta_tcp_stream": { "source": "iana" },
		"application/vnd.oasis.opendocument.chart": {
			"source": "iana",
			"extensions": ["odc"]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			"source": "iana",
			"extensions": ["otc"]
		},
		"application/vnd.oasis.opendocument.database": {
			"source": "iana",
			"extensions": ["odb"]
		},
		"application/vnd.oasis.opendocument.formula": {
			"source": "iana",
			"extensions": ["odf"]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			"source": "iana",
			"extensions": ["odft"]
		},
		"application/vnd.oasis.opendocument.graphics": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odg"]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			"source": "iana",
			"extensions": ["otg"]
		},
		"application/vnd.oasis.opendocument.image": {
			"source": "iana",
			"extensions": ["odi"]
		},
		"application/vnd.oasis.opendocument.image-template": {
			"source": "iana",
			"extensions": ["oti"]
		},
		"application/vnd.oasis.opendocument.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odp"]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			"source": "iana",
			"extensions": ["otp"]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ods"]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			"source": "iana",
			"extensions": ["ots"]
		},
		"application/vnd.oasis.opendocument.text": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odt"]
		},
		"application/vnd.oasis.opendocument.text-master": {
			"source": "iana",
			"extensions": ["odm"]
		},
		"application/vnd.oasis.opendocument.text-template": {
			"source": "iana",
			"extensions": ["ott"]
		},
		"application/vnd.oasis.opendocument.text-web": {
			"source": "iana",
			"extensions": ["oth"]
		},
		"application/vnd.obn": { "source": "iana" },
		"application/vnd.ocf+cbor": { "source": "iana" },
		"application/vnd.oci.image.manifest.v1+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oftn.l10n+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.cspg-hexbinary": { "source": "iana" },
		"application/vnd.oipf.dae.svg+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.pae.gem": { "source": "iana" },
		"application/vnd.oipf.spdiscovery+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.spdlist+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.ueprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.userprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.olpc-sugar": {
			"source": "iana",
			"extensions": ["xo"]
		},
		"application/vnd.oma-scws-config": { "source": "iana" },
		"application/vnd.oma-scws-http-request": { "source": "iana" },
		"application/vnd.oma-scws-http-response": { "source": "iana" },
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.imd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.ltkm": { "source": "iana" },
		"application/vnd.oma.bcast.notification+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.provisioningtrigger": { "source": "iana" },
		"application/vnd.oma.bcast.sgboot": { "source": "iana" },
		"application/vnd.oma.bcast.sgdd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.sgdu": { "source": "iana" },
		"application/vnd.oma.bcast.simple-symbol-container": { "source": "iana" },
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.sprov+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.stkm": { "source": "iana" },
		"application/vnd.oma.cab-address-book+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-pcc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.dcd": { "source": "iana" },
		"application/vnd.oma.dcdc": { "source": "iana" },
		"application/vnd.oma.dd2+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dd2"]
		},
		"application/vnd.oma.drm.risd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.group-usage-list+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.lwm2m+cbor": { "source": "iana" },
		"application/vnd.oma.lwm2m+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.lwm2m+tlv": { "source": "iana" },
		"application/vnd.oma.pal+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.final-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.groups+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.push": { "source": "iana" },
		"application/vnd.oma.scidm.messages+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.xcap-directory+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.omads-email+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omads-file+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omads-folder+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omaloc-supl-init": { "source": "iana" },
		"application/vnd.onepager": { "source": "iana" },
		"application/vnd.onepagertamp": { "source": "iana" },
		"application/vnd.onepagertamx": { "source": "iana" },
		"application/vnd.onepagertat": { "source": "iana" },
		"application/vnd.onepagertatp": { "source": "iana" },
		"application/vnd.onepagertatx": { "source": "iana" },
		"application/vnd.openblox.game+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["obgx"]
		},
		"application/vnd.openblox.game-binary": { "source": "iana" },
		"application/vnd.openeye.oeb": { "source": "iana" },
		"application/vnd.openofficeorg.extension": {
			"source": "apache",
			"extensions": ["oxt"]
		},
		"application/vnd.openstreetmap.data+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["osm"]
		},
		"application/vnd.opentimestamps.ots": { "source": "iana" },
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pptx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			"source": "iana",
			"extensions": ["sldx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			"source": "iana",
			"extensions": ["ppsx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			"source": "iana",
			"extensions": ["potx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			"source": "iana",
			"compressible": false,
			"extensions": ["xlsx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			"source": "iana",
			"extensions": ["xltx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": { "source": "iana" },
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			"source": "iana",
			"compressible": false,
			"extensions": ["docx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			"source": "iana",
			"extensions": ["dotx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oracle.resource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.orange.indata": { "source": "iana" },
		"application/vnd.osa.netdeploy": { "source": "iana" },
		"application/vnd.osgeo.mapguide.package": {
			"source": "iana",
			"extensions": ["mgp"]
		},
		"application/vnd.osgi.bundle": { "source": "iana" },
		"application/vnd.osgi.dp": {
			"source": "iana",
			"extensions": ["dp"]
		},
		"application/vnd.osgi.subsystem": {
			"source": "iana",
			"extensions": ["esa"]
		},
		"application/vnd.otps.ct-kip+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oxli.countgraph": { "source": "iana" },
		"application/vnd.pagerduty+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.palm": {
			"source": "iana",
			"extensions": [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": { "source": "iana" },
		"application/vnd.paos.xml": { "source": "iana" },
		"application/vnd.patentdive": { "source": "iana" },
		"application/vnd.patientecommsdoc": { "source": "iana" },
		"application/vnd.pawaafile": {
			"source": "iana",
			"extensions": ["paw"]
		},
		"application/vnd.pcos": { "source": "iana" },
		"application/vnd.pg.format": {
			"source": "iana",
			"extensions": ["str"]
		},
		"application/vnd.pg.osasli": {
			"source": "iana",
			"extensions": ["ei6"]
		},
		"application/vnd.piaccess.application-licence": { "source": "iana" },
		"application/vnd.picsel": {
			"source": "iana",
			"extensions": ["efif"]
		},
		"application/vnd.pmi.widget": {
			"source": "iana",
			"extensions": ["wg"]
		},
		"application/vnd.poc.group-advertisement+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.pocketlearn": {
			"source": "iana",
			"extensions": ["plf"]
		},
		"application/vnd.powerbuilder6": {
			"source": "iana",
			"extensions": ["pbd"]
		},
		"application/vnd.powerbuilder6-s": { "source": "iana" },
		"application/vnd.powerbuilder7": { "source": "iana" },
		"application/vnd.powerbuilder7-s": { "source": "iana" },
		"application/vnd.powerbuilder75": { "source": "iana" },
		"application/vnd.powerbuilder75-s": { "source": "iana" },
		"application/vnd.preminet": { "source": "iana" },
		"application/vnd.previewsystems.box": {
			"source": "iana",
			"extensions": ["box"]
		},
		"application/vnd.proteus.magazine": {
			"source": "iana",
			"extensions": ["mgz"]
		},
		"application/vnd.psfs": { "source": "iana" },
		"application/vnd.publishare-delta-tree": {
			"source": "iana",
			"extensions": ["qps"]
		},
		"application/vnd.pvi.ptid1": {
			"source": "iana",
			"extensions": ["ptid"]
		},
		"application/vnd.pwg-multiplexed": { "source": "iana" },
		"application/vnd.pwg-xhtml-print+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.qualcomm.brew-app-res": { "source": "iana" },
		"application/vnd.quarantainenet": { "source": "iana" },
		"application/vnd.quark.quarkxpress": {
			"source": "iana",
			"extensions": [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": { "source": "iana" },
		"application/vnd.radisys.moml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-conf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.rainstor.data": { "source": "iana" },
		"application/vnd.rapid": { "source": "iana" },
		"application/vnd.rar": {
			"source": "iana",
			"extensions": ["rar"]
		},
		"application/vnd.realvnc.bed": {
			"source": "iana",
			"extensions": ["bed"]
		},
		"application/vnd.recordare.musicxml": {
			"source": "iana",
			"extensions": ["mxl"]
		},
		"application/vnd.recordare.musicxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["musicxml"]
		},
		"application/vnd.renlearn.rlprint": { "source": "iana" },
		"application/vnd.resilient.logic": { "source": "iana" },
		"application/vnd.restful+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.rig.cryptonote": {
			"source": "iana",
			"extensions": ["cryptonote"]
		},
		"application/vnd.rim.cod": {
			"source": "apache",
			"extensions": ["cod"]
		},
		"application/vnd.rn-realmedia": {
			"source": "apache",
			"extensions": ["rm"]
		},
		"application/vnd.rn-realmedia-vbr": {
			"source": "apache",
			"extensions": ["rmvb"]
		},
		"application/vnd.route66.link66+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["link66"]
		},
		"application/vnd.rs-274x": { "source": "iana" },
		"application/vnd.ruckus.download": { "source": "iana" },
		"application/vnd.s3sms": { "source": "iana" },
		"application/vnd.sailingtracker.track": {
			"source": "iana",
			"extensions": ["st"]
		},
		"application/vnd.sar": { "source": "iana" },
		"application/vnd.sbm.cid": { "source": "iana" },
		"application/vnd.sbm.mid2": { "source": "iana" },
		"application/vnd.scribus": { "source": "iana" },
		"application/vnd.sealed.3df": { "source": "iana" },
		"application/vnd.sealed.csf": { "source": "iana" },
		"application/vnd.sealed.doc": { "source": "iana" },
		"application/vnd.sealed.eml": { "source": "iana" },
		"application/vnd.sealed.mht": { "source": "iana" },
		"application/vnd.sealed.net": { "source": "iana" },
		"application/vnd.sealed.ppt": { "source": "iana" },
		"application/vnd.sealed.tiff": { "source": "iana" },
		"application/vnd.sealed.xls": { "source": "iana" },
		"application/vnd.sealedmedia.softseal.html": { "source": "iana" },
		"application/vnd.sealedmedia.softseal.pdf": { "source": "iana" },
		"application/vnd.seemail": {
			"source": "iana",
			"extensions": ["see"]
		},
		"application/vnd.seis+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.sema": {
			"source": "iana",
			"extensions": ["sema"]
		},
		"application/vnd.semd": {
			"source": "iana",
			"extensions": ["semd"]
		},
		"application/vnd.semf": {
			"source": "iana",
			"extensions": ["semf"]
		},
		"application/vnd.shade-save-file": { "source": "iana" },
		"application/vnd.shana.informed.formdata": {
			"source": "iana",
			"extensions": ["ifm"]
		},
		"application/vnd.shana.informed.formtemplate": {
			"source": "iana",
			"extensions": ["itp"]
		},
		"application/vnd.shana.informed.interchange": {
			"source": "iana",
			"extensions": ["iif"]
		},
		"application/vnd.shana.informed.package": {
			"source": "iana",
			"extensions": ["ipk"]
		},
		"application/vnd.shootproof+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.shopkick+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.shp": { "source": "iana" },
		"application/vnd.shx": { "source": "iana" },
		"application/vnd.sigrok.session": { "source": "iana" },
		"application/vnd.simtech-mindmapper": {
			"source": "iana",
			"extensions": ["twd", "twds"]
		},
		"application/vnd.siren+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.smaf": {
			"source": "iana",
			"extensions": ["mmf"]
		},
		"application/vnd.smart.notebook": { "source": "iana" },
		"application/vnd.smart.teacher": {
			"source": "iana",
			"extensions": ["teacher"]
		},
		"application/vnd.snesdev-page-table": { "source": "iana" },
		"application/vnd.software602.filler.form+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["fo"]
		},
		"application/vnd.software602.filler.form-xml-zip": { "source": "iana" },
		"application/vnd.solent.sdkm+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sdkm", "sdkd"]
		},
		"application/vnd.spotfire.dxp": {
			"source": "iana",
			"extensions": ["dxp"]
		},
		"application/vnd.spotfire.sfs": {
			"source": "iana",
			"extensions": ["sfs"]
		},
		"application/vnd.sqlite3": { "source": "iana" },
		"application/vnd.sss-cod": { "source": "iana" },
		"application/vnd.sss-dtf": { "source": "iana" },
		"application/vnd.sss-ntf": { "source": "iana" },
		"application/vnd.stardivision.calc": {
			"source": "apache",
			"extensions": ["sdc"]
		},
		"application/vnd.stardivision.draw": {
			"source": "apache",
			"extensions": ["sda"]
		},
		"application/vnd.stardivision.impress": {
			"source": "apache",
			"extensions": ["sdd"]
		},
		"application/vnd.stardivision.math": {
			"source": "apache",
			"extensions": ["smf"]
		},
		"application/vnd.stardivision.writer": {
			"source": "apache",
			"extensions": ["sdw", "vor"]
		},
		"application/vnd.stardivision.writer-global": {
			"source": "apache",
			"extensions": ["sgl"]
		},
		"application/vnd.stepmania.package": {
			"source": "iana",
			"extensions": ["smzip"]
		},
		"application/vnd.stepmania.stepchart": {
			"source": "iana",
			"extensions": ["sm"]
		},
		"application/vnd.street-stream": { "source": "iana" },
		"application/vnd.sun.wadl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wadl"]
		},
		"application/vnd.sun.xml.calc": {
			"source": "apache",
			"extensions": ["sxc"]
		},
		"application/vnd.sun.xml.calc.template": {
			"source": "apache",
			"extensions": ["stc"]
		},
		"application/vnd.sun.xml.draw": {
			"source": "apache",
			"extensions": ["sxd"]
		},
		"application/vnd.sun.xml.draw.template": {
			"source": "apache",
			"extensions": ["std"]
		},
		"application/vnd.sun.xml.impress": {
			"source": "apache",
			"extensions": ["sxi"]
		},
		"application/vnd.sun.xml.impress.template": {
			"source": "apache",
			"extensions": ["sti"]
		},
		"application/vnd.sun.xml.math": {
			"source": "apache",
			"extensions": ["sxm"]
		},
		"application/vnd.sun.xml.writer": {
			"source": "apache",
			"extensions": ["sxw"]
		},
		"application/vnd.sun.xml.writer.global": {
			"source": "apache",
			"extensions": ["sxg"]
		},
		"application/vnd.sun.xml.writer.template": {
			"source": "apache",
			"extensions": ["stw"]
		},
		"application/vnd.sus-calendar": {
			"source": "iana",
			"extensions": ["sus", "susp"]
		},
		"application/vnd.svd": {
			"source": "iana",
			"extensions": ["svd"]
		},
		"application/vnd.swiftview-ics": { "source": "iana" },
		"application/vnd.sycle+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.syft+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.symbian.install": {
			"source": "apache",
			"extensions": ["sis", "sisx"]
		},
		"application/vnd.syncml+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["xsm"]
		},
		"application/vnd.syncml.dm+wbxml": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["bdm"]
		},
		"application/vnd.syncml.dm+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["xdm"]
		},
		"application/vnd.syncml.dm.notification": { "source": "iana" },
		"application/vnd.syncml.dmddf+wbxml": { "source": "iana" },
		"application/vnd.syncml.dmddf+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["ddf"]
		},
		"application/vnd.syncml.dmtnds+wbxml": { "source": "iana" },
		"application/vnd.syncml.dmtnds+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.syncml.ds.notification": { "source": "iana" },
		"application/vnd.tableschema+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tao.intent-module-archive": {
			"source": "iana",
			"extensions": ["tao"]
		},
		"application/vnd.tcpdump.pcap": {
			"source": "iana",
			"extensions": [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.think-cell.ppttc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tml": { "source": "iana" },
		"application/vnd.tmobile-livetv": {
			"source": "iana",
			"extensions": ["tmo"]
		},
		"application/vnd.tri.onesource": { "source": "iana" },
		"application/vnd.trid.tpt": {
			"source": "iana",
			"extensions": ["tpt"]
		},
		"application/vnd.triscape.mxs": {
			"source": "iana",
			"extensions": ["mxs"]
		},
		"application/vnd.trueapp": {
			"source": "iana",
			"extensions": ["tra"]
		},
		"application/vnd.truedoc": { "source": "iana" },
		"application/vnd.ubisoft.webplayer": { "source": "iana" },
		"application/vnd.ufdl": {
			"source": "iana",
			"extensions": ["ufd", "ufdl"]
		},
		"application/vnd.uiq.theme": {
			"source": "iana",
			"extensions": ["utz"]
		},
		"application/vnd.umajin": {
			"source": "iana",
			"extensions": ["umj"]
		},
		"application/vnd.unity": {
			"source": "iana",
			"extensions": ["unityweb"]
		},
		"application/vnd.uoml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["uoml"]
		},
		"application/vnd.uplanet.alert": { "source": "iana" },
		"application/vnd.uplanet.alert-wbxml": { "source": "iana" },
		"application/vnd.uplanet.bearer-choice": { "source": "iana" },
		"application/vnd.uplanet.bearer-choice-wbxml": { "source": "iana" },
		"application/vnd.uplanet.cacheop": { "source": "iana" },
		"application/vnd.uplanet.cacheop-wbxml": { "source": "iana" },
		"application/vnd.uplanet.channel": { "source": "iana" },
		"application/vnd.uplanet.channel-wbxml": { "source": "iana" },
		"application/vnd.uplanet.list": { "source": "iana" },
		"application/vnd.uplanet.list-wbxml": { "source": "iana" },
		"application/vnd.uplanet.listcmd": { "source": "iana" },
		"application/vnd.uplanet.listcmd-wbxml": { "source": "iana" },
		"application/vnd.uplanet.signal": { "source": "iana" },
		"application/vnd.uri-map": { "source": "iana" },
		"application/vnd.valve.source.material": { "source": "iana" },
		"application/vnd.vcx": {
			"source": "iana",
			"extensions": ["vcx"]
		},
		"application/vnd.vd-study": { "source": "iana" },
		"application/vnd.vectorworks": { "source": "iana" },
		"application/vnd.vel+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.verimatrix.vcas": { "source": "iana" },
		"application/vnd.veritone.aion+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.veryant.thin": { "source": "iana" },
		"application/vnd.ves.encrypted": { "source": "iana" },
		"application/vnd.vidsoft.vidconference": { "source": "iana" },
		"application/vnd.visio": {
			"source": "iana",
			"extensions": [
				"vsd",
				"vst",
				"vss",
				"vsw"
			]
		},
		"application/vnd.visionary": {
			"source": "iana",
			"extensions": ["vis"]
		},
		"application/vnd.vividence.scriptfile": { "source": "iana" },
		"application/vnd.vsf": {
			"source": "iana",
			"extensions": ["vsf"]
		},
		"application/vnd.wap.sic": { "source": "iana" },
		"application/vnd.wap.slc": { "source": "iana" },
		"application/vnd.wap.wbxml": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["wbxml"]
		},
		"application/vnd.wap.wmlc": {
			"source": "iana",
			"extensions": ["wmlc"]
		},
		"application/vnd.wap.wmlscriptc": {
			"source": "iana",
			"extensions": ["wmlsc"]
		},
		"application/vnd.webturbo": {
			"source": "iana",
			"extensions": ["wtb"]
		},
		"application/vnd.wfa.dpp": { "source": "iana" },
		"application/vnd.wfa.p2p": { "source": "iana" },
		"application/vnd.wfa.wsc": { "source": "iana" },
		"application/vnd.windows.devicepairing": { "source": "iana" },
		"application/vnd.wmc": { "source": "iana" },
		"application/vnd.wmf.bootstrap": { "source": "iana" },
		"application/vnd.wolfram.mathematica": { "source": "iana" },
		"application/vnd.wolfram.mathematica.package": { "source": "iana" },
		"application/vnd.wolfram.player": {
			"source": "iana",
			"extensions": ["nbp"]
		},
		"application/vnd.wordperfect": {
			"source": "iana",
			"extensions": ["wpd"]
		},
		"application/vnd.wqd": {
			"source": "iana",
			"extensions": ["wqd"]
		},
		"application/vnd.wrq-hp3000-labelled": { "source": "iana" },
		"application/vnd.wt.stf": {
			"source": "iana",
			"extensions": ["stf"]
		},
		"application/vnd.wv.csp+wbxml": { "source": "iana" },
		"application/vnd.wv.csp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.wv.ssp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xacml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xara": {
			"source": "iana",
			"extensions": ["xar"]
		},
		"application/vnd.xfdl": {
			"source": "iana",
			"extensions": ["xfdl"]
		},
		"application/vnd.xfdl.webform": { "source": "iana" },
		"application/vnd.xmi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xmpie.cpkg": { "source": "iana" },
		"application/vnd.xmpie.dpkg": { "source": "iana" },
		"application/vnd.xmpie.plan": { "source": "iana" },
		"application/vnd.xmpie.ppkg": { "source": "iana" },
		"application/vnd.xmpie.xlim": { "source": "iana" },
		"application/vnd.yamaha.hv-dic": {
			"source": "iana",
			"extensions": ["hvd"]
		},
		"application/vnd.yamaha.hv-script": {
			"source": "iana",
			"extensions": ["hvs"]
		},
		"application/vnd.yamaha.hv-voice": {
			"source": "iana",
			"extensions": ["hvp"]
		},
		"application/vnd.yamaha.openscoreformat": {
			"source": "iana",
			"extensions": ["osf"]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["osfpvg"]
		},
		"application/vnd.yamaha.remote-setup": { "source": "iana" },
		"application/vnd.yamaha.smaf-audio": {
			"source": "iana",
			"extensions": ["saf"]
		},
		"application/vnd.yamaha.smaf-phrase": {
			"source": "iana",
			"extensions": ["spf"]
		},
		"application/vnd.yamaha.through-ngn": { "source": "iana" },
		"application/vnd.yamaha.tunnel-udpencap": { "source": "iana" },
		"application/vnd.yaoweme": { "source": "iana" },
		"application/vnd.yellowriver-custom-menu": {
			"source": "iana",
			"extensions": ["cmp"]
		},
		"application/vnd.youtube.yt": { "source": "iana" },
		"application/vnd.zul": {
			"source": "iana",
			"extensions": ["zir", "zirz"]
		},
		"application/vnd.zzazz.deck+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["zaz"]
		},
		"application/voicexml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["vxml"]
		},
		"application/voucher-cms+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vq-rtcpxr": { "source": "iana" },
		"application/wasm": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wasm"]
		},
		"application/watcherinfo+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wif"]
		},
		"application/webpush-options+json": {
			"source": "iana",
			"compressible": true
		},
		"application/whoispp-query": { "source": "iana" },
		"application/whoispp-response": { "source": "iana" },
		"application/widget": {
			"source": "iana",
			"extensions": ["wgt"]
		},
		"application/winhlp": {
			"source": "apache",
			"extensions": ["hlp"]
		},
		"application/wita": { "source": "iana" },
		"application/wordperfect5.1": { "source": "iana" },
		"application/wsdl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wsdl"]
		},
		"application/wspolicy+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wspolicy"]
		},
		"application/x-7z-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": ["7z"]
		},
		"application/x-abiword": {
			"source": "apache",
			"extensions": ["abw"]
		},
		"application/x-ace-compressed": {
			"source": "apache",
			"extensions": ["ace"]
		},
		"application/x-amf": { "source": "apache" },
		"application/x-apple-diskimage": {
			"source": "apache",
			"extensions": ["dmg"]
		},
		"application/x-arj": {
			"compressible": false,
			"extensions": ["arj"]
		},
		"application/x-authorware-bin": {
			"source": "apache",
			"extensions": [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			"source": "apache",
			"extensions": ["aam"]
		},
		"application/x-authorware-seg": {
			"source": "apache",
			"extensions": ["aas"]
		},
		"application/x-bcpio": {
			"source": "apache",
			"extensions": ["bcpio"]
		},
		"application/x-bdoc": {
			"compressible": false,
			"extensions": ["bdoc"]
		},
		"application/x-bittorrent": {
			"source": "apache",
			"extensions": ["torrent"]
		},
		"application/x-blorb": {
			"source": "apache",
			"extensions": ["blb", "blorb"]
		},
		"application/x-bzip": {
			"source": "apache",
			"compressible": false,
			"extensions": ["bz"]
		},
		"application/x-bzip2": {
			"source": "apache",
			"compressible": false,
			"extensions": ["bz2", "boz"]
		},
		"application/x-cbr": {
			"source": "apache",
			"extensions": [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			"source": "apache",
			"extensions": ["vcd"]
		},
		"application/x-cfs-compressed": {
			"source": "apache",
			"extensions": ["cfs"]
		},
		"application/x-chat": {
			"source": "apache",
			"extensions": ["chat"]
		},
		"application/x-chess-pgn": {
			"source": "apache",
			"extensions": ["pgn"]
		},
		"application/x-chrome-extension": { "extensions": ["crx"] },
		"application/x-cocoa": {
			"source": "nginx",
			"extensions": ["cco"]
		},
		"application/x-compress": { "source": "apache" },
		"application/x-conference": {
			"source": "apache",
			"extensions": ["nsc"]
		},
		"application/x-cpio": {
			"source": "apache",
			"extensions": ["cpio"]
		},
		"application/x-csh": {
			"source": "apache",
			"extensions": ["csh"]
		},
		"application/x-deb": { "compressible": false },
		"application/x-debian-package": {
			"source": "apache",
			"extensions": ["deb", "udeb"]
		},
		"application/x-dgc-compressed": {
			"source": "apache",
			"extensions": ["dgc"]
		},
		"application/x-director": {
			"source": "apache",
			"extensions": [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			"source": "apache",
			"extensions": ["wad"]
		},
		"application/x-dtbncx+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ncx"]
		},
		"application/x-dtbook+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["dtb"]
		},
		"application/x-dtbresource+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["res"]
		},
		"application/x-dvi": {
			"source": "apache",
			"compressible": false,
			"extensions": ["dvi"]
		},
		"application/x-envoy": {
			"source": "apache",
			"extensions": ["evy"]
		},
		"application/x-eva": {
			"source": "apache",
			"extensions": ["eva"]
		},
		"application/x-font-bdf": {
			"source": "apache",
			"extensions": ["bdf"]
		},
		"application/x-font-dos": { "source": "apache" },
		"application/x-font-framemaker": { "source": "apache" },
		"application/x-font-ghostscript": {
			"source": "apache",
			"extensions": ["gsf"]
		},
		"application/x-font-libgrx": { "source": "apache" },
		"application/x-font-linux-psf": {
			"source": "apache",
			"extensions": ["psf"]
		},
		"application/x-font-pcf": {
			"source": "apache",
			"extensions": ["pcf"]
		},
		"application/x-font-snf": {
			"source": "apache",
			"extensions": ["snf"]
		},
		"application/x-font-speedo": { "source": "apache" },
		"application/x-font-sunos-news": { "source": "apache" },
		"application/x-font-type1": {
			"source": "apache",
			"extensions": [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": { "source": "apache" },
		"application/x-freearc": {
			"source": "apache",
			"extensions": ["arc"]
		},
		"application/x-futuresplash": {
			"source": "apache",
			"extensions": ["spl"]
		},
		"application/x-gca-compressed": {
			"source": "apache",
			"extensions": ["gca"]
		},
		"application/x-glulx": {
			"source": "apache",
			"extensions": ["ulx"]
		},
		"application/x-gnumeric": {
			"source": "apache",
			"extensions": ["gnumeric"]
		},
		"application/x-gramps-xml": {
			"source": "apache",
			"extensions": ["gramps"]
		},
		"application/x-gtar": {
			"source": "apache",
			"extensions": ["gtar"]
		},
		"application/x-gzip": { "source": "apache" },
		"application/x-hdf": {
			"source": "apache",
			"extensions": ["hdf"]
		},
		"application/x-httpd-php": {
			"compressible": true,
			"extensions": ["php"]
		},
		"application/x-install-instructions": {
			"source": "apache",
			"extensions": ["install"]
		},
		"application/x-iso9660-image": {
			"source": "apache",
			"extensions": ["iso"]
		},
		"application/x-iwork-keynote-sffkey": { "extensions": ["key"] },
		"application/x-iwork-numbers-sffnumbers": { "extensions": ["numbers"] },
		"application/x-iwork-pages-sffpages": { "extensions": ["pages"] },
		"application/x-java-archive-diff": {
			"source": "nginx",
			"extensions": ["jardiff"]
		},
		"application/x-java-jnlp-file": {
			"source": "apache",
			"compressible": false,
			"extensions": ["jnlp"]
		},
		"application/x-javascript": { "compressible": true },
		"application/x-keepass2": { "extensions": ["kdbx"] },
		"application/x-latex": {
			"source": "apache",
			"compressible": false,
			"extensions": ["latex"]
		},
		"application/x-lua-bytecode": { "extensions": ["luac"] },
		"application/x-lzh-compressed": {
			"source": "apache",
			"extensions": ["lzh", "lha"]
		},
		"application/x-makeself": {
			"source": "nginx",
			"extensions": ["run"]
		},
		"application/x-mie": {
			"source": "apache",
			"extensions": ["mie"]
		},
		"application/x-mobipocket-ebook": {
			"source": "apache",
			"extensions": ["prc", "mobi"]
		},
		"application/x-mpegurl": { "compressible": false },
		"application/x-ms-application": {
			"source": "apache",
			"extensions": ["application"]
		},
		"application/x-ms-shortcut": {
			"source": "apache",
			"extensions": ["lnk"]
		},
		"application/x-ms-wmd": {
			"source": "apache",
			"extensions": ["wmd"]
		},
		"application/x-ms-wmz": {
			"source": "apache",
			"extensions": ["wmz"]
		},
		"application/x-ms-xbap": {
			"source": "apache",
			"extensions": ["xbap"]
		},
		"application/x-msaccess": {
			"source": "apache",
			"extensions": ["mdb"]
		},
		"application/x-msbinder": {
			"source": "apache",
			"extensions": ["obd"]
		},
		"application/x-mscardfile": {
			"source": "apache",
			"extensions": ["crd"]
		},
		"application/x-msclip": {
			"source": "apache",
			"extensions": ["clp"]
		},
		"application/x-msdos-program": { "extensions": ["exe"] },
		"application/x-msdownload": {
			"source": "apache",
			"extensions": [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			"source": "apache",
			"extensions": [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			"source": "apache",
			"extensions": [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			"source": "apache",
			"extensions": ["mny"]
		},
		"application/x-mspublisher": {
			"source": "apache",
			"extensions": ["pub"]
		},
		"application/x-msschedule": {
			"source": "apache",
			"extensions": ["scd"]
		},
		"application/x-msterminal": {
			"source": "apache",
			"extensions": ["trm"]
		},
		"application/x-mswrite": {
			"source": "apache",
			"extensions": ["wri"]
		},
		"application/x-netcdf": {
			"source": "apache",
			"extensions": ["nc", "cdf"]
		},
		"application/x-ns-proxy-autoconfig": {
			"compressible": true,
			"extensions": ["pac"]
		},
		"application/x-nzb": {
			"source": "apache",
			"extensions": ["nzb"]
		},
		"application/x-perl": {
			"source": "nginx",
			"extensions": ["pl", "pm"]
		},
		"application/x-pilot": {
			"source": "nginx",
			"extensions": ["prc", "pdb"]
		},
		"application/x-pkcs12": {
			"source": "apache",
			"compressible": false,
			"extensions": ["p12", "pfx"]
		},
		"application/x-pkcs7-certificates": {
			"source": "apache",
			"extensions": ["p7b", "spc"]
		},
		"application/x-pkcs7-certreqresp": {
			"source": "apache",
			"extensions": ["p7r"]
		},
		"application/x-pki-message": { "source": "iana" },
		"application/x-rar-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": ["rar"]
		},
		"application/x-redhat-package-manager": {
			"source": "nginx",
			"extensions": ["rpm"]
		},
		"application/x-research-info-systems": {
			"source": "apache",
			"extensions": ["ris"]
		},
		"application/x-sea": {
			"source": "nginx",
			"extensions": ["sea"]
		},
		"application/x-sh": {
			"source": "apache",
			"compressible": true,
			"extensions": ["sh"]
		},
		"application/x-shar": {
			"source": "apache",
			"extensions": ["shar"]
		},
		"application/x-shockwave-flash": {
			"source": "apache",
			"compressible": false,
			"extensions": ["swf"]
		},
		"application/x-silverlight-app": {
			"source": "apache",
			"extensions": ["xap"]
		},
		"application/x-sql": {
			"source": "apache",
			"extensions": ["sql"]
		},
		"application/x-stuffit": {
			"source": "apache",
			"compressible": false,
			"extensions": ["sit"]
		},
		"application/x-stuffitx": {
			"source": "apache",
			"extensions": ["sitx"]
		},
		"application/x-subrip": {
			"source": "apache",
			"extensions": ["srt"]
		},
		"application/x-sv4cpio": {
			"source": "apache",
			"extensions": ["sv4cpio"]
		},
		"application/x-sv4crc": {
			"source": "apache",
			"extensions": ["sv4crc"]
		},
		"application/x-t3vm-image": {
			"source": "apache",
			"extensions": ["t3"]
		},
		"application/x-tads": {
			"source": "apache",
			"extensions": ["gam"]
		},
		"application/x-tar": {
			"source": "apache",
			"compressible": true,
			"extensions": ["tar"]
		},
		"application/x-tcl": {
			"source": "apache",
			"extensions": ["tcl", "tk"]
		},
		"application/x-tex": {
			"source": "apache",
			"extensions": ["tex"]
		},
		"application/x-tex-tfm": {
			"source": "apache",
			"extensions": ["tfm"]
		},
		"application/x-texinfo": {
			"source": "apache",
			"extensions": ["texinfo", "texi"]
		},
		"application/x-tgif": {
			"source": "apache",
			"extensions": ["obj"]
		},
		"application/x-ustar": {
			"source": "apache",
			"extensions": ["ustar"]
		},
		"application/x-virtualbox-hdd": {
			"compressible": true,
			"extensions": ["hdd"]
		},
		"application/x-virtualbox-ova": {
			"compressible": true,
			"extensions": ["ova"]
		},
		"application/x-virtualbox-ovf": {
			"compressible": true,
			"extensions": ["ovf"]
		},
		"application/x-virtualbox-vbox": {
			"compressible": true,
			"extensions": ["vbox"]
		},
		"application/x-virtualbox-vbox-extpack": {
			"compressible": false,
			"extensions": ["vbox-extpack"]
		},
		"application/x-virtualbox-vdi": {
			"compressible": true,
			"extensions": ["vdi"]
		},
		"application/x-virtualbox-vhd": {
			"compressible": true,
			"extensions": ["vhd"]
		},
		"application/x-virtualbox-vmdk": {
			"compressible": true,
			"extensions": ["vmdk"]
		},
		"application/x-wais-source": {
			"source": "apache",
			"extensions": ["src"]
		},
		"application/x-web-app-manifest+json": {
			"compressible": true,
			"extensions": ["webapp"]
		},
		"application/x-www-form-urlencoded": {
			"source": "iana",
			"compressible": true
		},
		"application/x-x509-ca-cert": {
			"source": "iana",
			"extensions": [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-x509-ca-ra-cert": { "source": "iana" },
		"application/x-x509-next-ca-cert": { "source": "iana" },
		"application/x-xfig": {
			"source": "apache",
			"extensions": ["fig"]
		},
		"application/x-xliff+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xlf"]
		},
		"application/x-xpinstall": {
			"source": "apache",
			"compressible": false,
			"extensions": ["xpi"]
		},
		"application/x-xz": {
			"source": "apache",
			"extensions": ["xz"]
		},
		"application/x-zmachine": {
			"source": "apache",
			"extensions": [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": { "source": "iana" },
		"application/xacml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xaml+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xaml"]
		},
		"application/xcap-att+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xav"]
		},
		"application/xcap-caps+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xca"]
		},
		"application/xcap-diff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdf"]
		},
		"application/xcap-el+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xel"]
		},
		"application/xcap-error+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xcap-ns+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xns"]
		},
		"application/xcon-conference-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xcon-conference-info-diff+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xenc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xenc"]
		},
		"application/xhtml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xhtml", "xht"]
		},
		"application/xhtml-voice+xml": {
			"source": "apache",
			"compressible": true
		},
		"application/xliff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xlf"]
		},
		"application/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dtd"]
		},
		"application/xml-external-parsed-entity": { "source": "iana" },
		"application/xml-patch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xmpp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xop+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xop"]
		},
		"application/xproc+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xpl"]
		},
		"application/xslt+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xsl", "xslt"]
		},
		"application/xspf+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xspf"]
		},
		"application/xv+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yang": {
			"source": "iana",
			"extensions": ["yang"]
		},
		"application/yang-data+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-data+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-patch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/yin+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["yin"]
		},
		"application/zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["zip"]
		},
		"application/zlib": { "source": "iana" },
		"application/zstd": { "source": "iana" },
		"audio/1d-interleaved-parityfec": { "source": "iana" },
		"audio/32kadpcm": { "source": "iana" },
		"audio/3gpp": {
			"source": "iana",
			"compressible": false,
			"extensions": ["3gpp"]
		},
		"audio/3gpp2": { "source": "iana" },
		"audio/aac": { "source": "iana" },
		"audio/ac3": { "source": "iana" },
		"audio/adpcm": {
			"source": "apache",
			"extensions": ["adp"]
		},
		"audio/amr": {
			"source": "iana",
			"extensions": ["amr"]
		},
		"audio/amr-wb": { "source": "iana" },
		"audio/amr-wb+": { "source": "iana" },
		"audio/aptx": { "source": "iana" },
		"audio/asc": { "source": "iana" },
		"audio/atrac-advanced-lossless": { "source": "iana" },
		"audio/atrac-x": { "source": "iana" },
		"audio/atrac3": { "source": "iana" },
		"audio/basic": {
			"source": "iana",
			"compressible": false,
			"extensions": ["au", "snd"]
		},
		"audio/bv16": { "source": "iana" },
		"audio/bv32": { "source": "iana" },
		"audio/clearmode": { "source": "iana" },
		"audio/cn": { "source": "iana" },
		"audio/dat12": { "source": "iana" },
		"audio/dls": { "source": "iana" },
		"audio/dsr-es201108": { "source": "iana" },
		"audio/dsr-es202050": { "source": "iana" },
		"audio/dsr-es202211": { "source": "iana" },
		"audio/dsr-es202212": { "source": "iana" },
		"audio/dv": { "source": "iana" },
		"audio/dvi4": { "source": "iana" },
		"audio/eac3": { "source": "iana" },
		"audio/encaprtp": { "source": "iana" },
		"audio/evrc": { "source": "iana" },
		"audio/evrc-qcp": { "source": "iana" },
		"audio/evrc0": { "source": "iana" },
		"audio/evrc1": { "source": "iana" },
		"audio/evrcb": { "source": "iana" },
		"audio/evrcb0": { "source": "iana" },
		"audio/evrcb1": { "source": "iana" },
		"audio/evrcnw": { "source": "iana" },
		"audio/evrcnw0": { "source": "iana" },
		"audio/evrcnw1": { "source": "iana" },
		"audio/evrcwb": { "source": "iana" },
		"audio/evrcwb0": { "source": "iana" },
		"audio/evrcwb1": { "source": "iana" },
		"audio/evs": { "source": "iana" },
		"audio/flexfec": { "source": "iana" },
		"audio/fwdred": { "source": "iana" },
		"audio/g711-0": { "source": "iana" },
		"audio/g719": { "source": "iana" },
		"audio/g722": { "source": "iana" },
		"audio/g7221": { "source": "iana" },
		"audio/g723": { "source": "iana" },
		"audio/g726-16": { "source": "iana" },
		"audio/g726-24": { "source": "iana" },
		"audio/g726-32": { "source": "iana" },
		"audio/g726-40": { "source": "iana" },
		"audio/g728": { "source": "iana" },
		"audio/g729": { "source": "iana" },
		"audio/g7291": { "source": "iana" },
		"audio/g729d": { "source": "iana" },
		"audio/g729e": { "source": "iana" },
		"audio/gsm": { "source": "iana" },
		"audio/gsm-efr": { "source": "iana" },
		"audio/gsm-hr-08": { "source": "iana" },
		"audio/ilbc": { "source": "iana" },
		"audio/ip-mr_v2.5": { "source": "iana" },
		"audio/isac": { "source": "apache" },
		"audio/l16": { "source": "iana" },
		"audio/l20": { "source": "iana" },
		"audio/l24": {
			"source": "iana",
			"compressible": false
		},
		"audio/l8": { "source": "iana" },
		"audio/lpc": { "source": "iana" },
		"audio/melp": { "source": "iana" },
		"audio/melp1200": { "source": "iana" },
		"audio/melp2400": { "source": "iana" },
		"audio/melp600": { "source": "iana" },
		"audio/mhas": { "source": "iana" },
		"audio/midi": {
			"source": "apache",
			"extensions": [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/mobile-xmf": {
			"source": "iana",
			"extensions": ["mxmf"]
		},
		"audio/mp3": {
			"compressible": false,
			"extensions": ["mp3"]
		},
		"audio/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": ["m4a", "mp4a"]
		},
		"audio/mp4a-latm": { "source": "iana" },
		"audio/mpa": { "source": "iana" },
		"audio/mpa-robust": { "source": "iana" },
		"audio/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": { "source": "iana" },
		"audio/musepack": { "source": "apache" },
		"audio/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"oga",
				"ogg",
				"spx",
				"opus"
			]
		},
		"audio/opus": { "source": "iana" },
		"audio/parityfec": { "source": "iana" },
		"audio/pcma": { "source": "iana" },
		"audio/pcma-wb": { "source": "iana" },
		"audio/pcmu": { "source": "iana" },
		"audio/pcmu-wb": { "source": "iana" },
		"audio/prs.sid": { "source": "iana" },
		"audio/qcelp": { "source": "iana" },
		"audio/raptorfec": { "source": "iana" },
		"audio/red": { "source": "iana" },
		"audio/rtp-enc-aescm128": { "source": "iana" },
		"audio/rtp-midi": { "source": "iana" },
		"audio/rtploopback": { "source": "iana" },
		"audio/rtx": { "source": "iana" },
		"audio/s3m": {
			"source": "apache",
			"extensions": ["s3m"]
		},
		"audio/scip": { "source": "iana" },
		"audio/silk": {
			"source": "apache",
			"extensions": ["sil"]
		},
		"audio/smv": { "source": "iana" },
		"audio/smv-qcp": { "source": "iana" },
		"audio/smv0": { "source": "iana" },
		"audio/sofa": { "source": "iana" },
		"audio/sp-midi": { "source": "iana" },
		"audio/speex": { "source": "iana" },
		"audio/t140c": { "source": "iana" },
		"audio/t38": { "source": "iana" },
		"audio/telephone-event": { "source": "iana" },
		"audio/tetra_acelp": { "source": "iana" },
		"audio/tetra_acelp_bb": { "source": "iana" },
		"audio/tone": { "source": "iana" },
		"audio/tsvcis": { "source": "iana" },
		"audio/uemclip": { "source": "iana" },
		"audio/ulpfec": { "source": "iana" },
		"audio/usac": { "source": "iana" },
		"audio/vdvi": { "source": "iana" },
		"audio/vmr-wb": { "source": "iana" },
		"audio/vnd.3gpp.iufp": { "source": "iana" },
		"audio/vnd.4sb": { "source": "iana" },
		"audio/vnd.audiokoz": { "source": "iana" },
		"audio/vnd.celp": { "source": "iana" },
		"audio/vnd.cisco.nse": { "source": "iana" },
		"audio/vnd.cmles.radio-events": { "source": "iana" },
		"audio/vnd.cns.anp1": { "source": "iana" },
		"audio/vnd.cns.inf1": { "source": "iana" },
		"audio/vnd.dece.audio": {
			"source": "iana",
			"extensions": ["uva", "uvva"]
		},
		"audio/vnd.digital-winds": {
			"source": "iana",
			"extensions": ["eol"]
		},
		"audio/vnd.dlna.adts": { "source": "iana" },
		"audio/vnd.dolby.heaac.1": { "source": "iana" },
		"audio/vnd.dolby.heaac.2": { "source": "iana" },
		"audio/vnd.dolby.mlp": { "source": "iana" },
		"audio/vnd.dolby.mps": { "source": "iana" },
		"audio/vnd.dolby.pl2": { "source": "iana" },
		"audio/vnd.dolby.pl2x": { "source": "iana" },
		"audio/vnd.dolby.pl2z": { "source": "iana" },
		"audio/vnd.dolby.pulse.1": { "source": "iana" },
		"audio/vnd.dra": {
			"source": "iana",
			"extensions": ["dra"]
		},
		"audio/vnd.dts": {
			"source": "iana",
			"extensions": ["dts"]
		},
		"audio/vnd.dts.hd": {
			"source": "iana",
			"extensions": ["dtshd"]
		},
		"audio/vnd.dts.uhd": { "source": "iana" },
		"audio/vnd.dvb.file": { "source": "iana" },
		"audio/vnd.everad.plj": { "source": "iana" },
		"audio/vnd.hns.audio": { "source": "iana" },
		"audio/vnd.lucent.voice": {
			"source": "iana",
			"extensions": ["lvp"]
		},
		"audio/vnd.ms-playready.media.pya": {
			"source": "iana",
			"extensions": ["pya"]
		},
		"audio/vnd.nokia.mobile-xmf": { "source": "iana" },
		"audio/vnd.nortel.vbk": { "source": "iana" },
		"audio/vnd.nuera.ecelp4800": {
			"source": "iana",
			"extensions": ["ecelp4800"]
		},
		"audio/vnd.nuera.ecelp7470": {
			"source": "iana",
			"extensions": ["ecelp7470"]
		},
		"audio/vnd.nuera.ecelp9600": {
			"source": "iana",
			"extensions": ["ecelp9600"]
		},
		"audio/vnd.octel.sbc": { "source": "iana" },
		"audio/vnd.presonus.multitrack": { "source": "iana" },
		"audio/vnd.qcelp": { "source": "iana" },
		"audio/vnd.rhetorex.32kadpcm": { "source": "iana" },
		"audio/vnd.rip": {
			"source": "iana",
			"extensions": ["rip"]
		},
		"audio/vnd.rn-realaudio": { "compressible": false },
		"audio/vnd.sealedmedia.softseal.mpeg": { "source": "iana" },
		"audio/vnd.vmx.cvsd": { "source": "iana" },
		"audio/vnd.wave": { "compressible": false },
		"audio/vorbis": {
			"source": "iana",
			"compressible": false
		},
		"audio/vorbis-config": { "source": "iana" },
		"audio/wav": {
			"compressible": false,
			"extensions": ["wav"]
		},
		"audio/wave": {
			"compressible": false,
			"extensions": ["wav"]
		},
		"audio/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["weba"]
		},
		"audio/x-aac": {
			"source": "apache",
			"compressible": false,
			"extensions": ["aac"]
		},
		"audio/x-aiff": {
			"source": "apache",
			"extensions": [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			"source": "apache",
			"compressible": false,
			"extensions": ["caf"]
		},
		"audio/x-flac": {
			"source": "apache",
			"extensions": ["flac"]
		},
		"audio/x-m4a": {
			"source": "nginx",
			"extensions": ["m4a"]
		},
		"audio/x-matroska": {
			"source": "apache",
			"extensions": ["mka"]
		},
		"audio/x-mpegurl": {
			"source": "apache",
			"extensions": ["m3u"]
		},
		"audio/x-ms-wax": {
			"source": "apache",
			"extensions": ["wax"]
		},
		"audio/x-ms-wma": {
			"source": "apache",
			"extensions": ["wma"]
		},
		"audio/x-pn-realaudio": {
			"source": "apache",
			"extensions": ["ram", "ra"]
		},
		"audio/x-pn-realaudio-plugin": {
			"source": "apache",
			"extensions": ["rmp"]
		},
		"audio/x-realaudio": {
			"source": "nginx",
			"extensions": ["ra"]
		},
		"audio/x-tta": { "source": "apache" },
		"audio/x-wav": {
			"source": "apache",
			"extensions": ["wav"]
		},
		"audio/xm": {
			"source": "apache",
			"extensions": ["xm"]
		},
		"chemical/x-cdx": {
			"source": "apache",
			"extensions": ["cdx"]
		},
		"chemical/x-cif": {
			"source": "apache",
			"extensions": ["cif"]
		},
		"chemical/x-cmdf": {
			"source": "apache",
			"extensions": ["cmdf"]
		},
		"chemical/x-cml": {
			"source": "apache",
			"extensions": ["cml"]
		},
		"chemical/x-csml": {
			"source": "apache",
			"extensions": ["csml"]
		},
		"chemical/x-pdb": { "source": "apache" },
		"chemical/x-xyz": {
			"source": "apache",
			"extensions": ["xyz"]
		},
		"font/collection": {
			"source": "iana",
			"extensions": ["ttc"]
		},
		"font/otf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["otf"]
		},
		"font/sfnt": { "source": "iana" },
		"font/ttf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ttf"]
		},
		"font/woff": {
			"source": "iana",
			"extensions": ["woff"]
		},
		"font/woff2": {
			"source": "iana",
			"extensions": ["woff2"]
		},
		"image/aces": {
			"source": "iana",
			"extensions": ["exr"]
		},
		"image/apng": {
			"compressible": false,
			"extensions": ["apng"]
		},
		"image/avci": {
			"source": "iana",
			"extensions": ["avci"]
		},
		"image/avcs": {
			"source": "iana",
			"extensions": ["avcs"]
		},
		"image/avif": {
			"source": "iana",
			"compressible": false,
			"extensions": ["avif"]
		},
		"image/bmp": {
			"source": "iana",
			"compressible": true,
			"extensions": ["bmp"]
		},
		"image/cgm": {
			"source": "iana",
			"extensions": ["cgm"]
		},
		"image/dicom-rle": {
			"source": "iana",
			"extensions": ["drle"]
		},
		"image/emf": {
			"source": "iana",
			"extensions": ["emf"]
		},
		"image/fits": {
			"source": "iana",
			"extensions": ["fits"]
		},
		"image/g3fax": {
			"source": "iana",
			"extensions": ["g3"]
		},
		"image/gif": {
			"source": "iana",
			"compressible": false,
			"extensions": ["gif"]
		},
		"image/heic": {
			"source": "iana",
			"extensions": ["heic"]
		},
		"image/heic-sequence": {
			"source": "iana",
			"extensions": ["heics"]
		},
		"image/heif": {
			"source": "iana",
			"extensions": ["heif"]
		},
		"image/heif-sequence": {
			"source": "iana",
			"extensions": ["heifs"]
		},
		"image/hej2k": {
			"source": "iana",
			"extensions": ["hej2"]
		},
		"image/hsj2": {
			"source": "iana",
			"extensions": ["hsj2"]
		},
		"image/ief": {
			"source": "iana",
			"extensions": ["ief"]
		},
		"image/jls": {
			"source": "iana",
			"extensions": ["jls"]
		},
		"image/jp2": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jp2", "jpg2"]
		},
		"image/jpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"jpeg",
				"jpg",
				"jpe"
			]
		},
		"image/jph": {
			"source": "iana",
			"extensions": ["jph"]
		},
		"image/jphc": {
			"source": "iana",
			"extensions": ["jhc"]
		},
		"image/jpm": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jpm"]
		},
		"image/jpx": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jpx", "jpf"]
		},
		"image/jxr": {
			"source": "iana",
			"extensions": ["jxr"]
		},
		"image/jxra": {
			"source": "iana",
			"extensions": ["jxra"]
		},
		"image/jxrs": {
			"source": "iana",
			"extensions": ["jxrs"]
		},
		"image/jxs": {
			"source": "iana",
			"extensions": ["jxs"]
		},
		"image/jxsc": {
			"source": "iana",
			"extensions": ["jxsc"]
		},
		"image/jxsi": {
			"source": "iana",
			"extensions": ["jxsi"]
		},
		"image/jxss": {
			"source": "iana",
			"extensions": ["jxss"]
		},
		"image/ktx": {
			"source": "iana",
			"extensions": ["ktx"]
		},
		"image/ktx2": {
			"source": "iana",
			"extensions": ["ktx2"]
		},
		"image/naplps": { "source": "iana" },
		"image/pjpeg": { "compressible": false },
		"image/png": {
			"source": "iana",
			"compressible": false,
			"extensions": ["png"]
		},
		"image/prs.btif": {
			"source": "iana",
			"extensions": ["btif"]
		},
		"image/prs.pti": {
			"source": "iana",
			"extensions": ["pti"]
		},
		"image/pwg-raster": { "source": "iana" },
		"image/sgi": {
			"source": "apache",
			"extensions": ["sgi"]
		},
		"image/svg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["svg", "svgz"]
		},
		"image/t38": {
			"source": "iana",
			"extensions": ["t38"]
		},
		"image/tiff": {
			"source": "iana",
			"compressible": false,
			"extensions": ["tif", "tiff"]
		},
		"image/tiff-fx": {
			"source": "iana",
			"extensions": ["tfx"]
		},
		"image/vnd.adobe.photoshop": {
			"source": "iana",
			"compressible": true,
			"extensions": ["psd"]
		},
		"image/vnd.airzip.accelerator.azv": {
			"source": "iana",
			"extensions": ["azv"]
		},
		"image/vnd.cns.inf2": { "source": "iana" },
		"image/vnd.dece.graphic": {
			"source": "iana",
			"extensions": [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			"source": "iana",
			"extensions": ["djvu", "djv"]
		},
		"image/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": ["sub"]
		},
		"image/vnd.dwg": {
			"source": "iana",
			"extensions": ["dwg"]
		},
		"image/vnd.dxf": {
			"source": "iana",
			"extensions": ["dxf"]
		},
		"image/vnd.fastbidsheet": {
			"source": "iana",
			"extensions": ["fbs"]
		},
		"image/vnd.fpx": {
			"source": "iana",
			"extensions": ["fpx"]
		},
		"image/vnd.fst": {
			"source": "iana",
			"extensions": ["fst"]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			"source": "iana",
			"extensions": ["mmr"]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			"source": "iana",
			"extensions": ["rlc"]
		},
		"image/vnd.globalgraphics.pgb": { "source": "iana" },
		"image/vnd.microsoft.icon": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ico"]
		},
		"image/vnd.mix": { "source": "iana" },
		"image/vnd.mozilla.apng": { "source": "iana" },
		"image/vnd.ms-dds": {
			"compressible": true,
			"extensions": ["dds"]
		},
		"image/vnd.ms-modi": {
			"source": "iana",
			"extensions": ["mdi"]
		},
		"image/vnd.ms-photo": {
			"source": "apache",
			"extensions": ["wdp"]
		},
		"image/vnd.net-fpx": {
			"source": "iana",
			"extensions": ["npx"]
		},
		"image/vnd.pco.b16": {
			"source": "iana",
			"extensions": ["b16"]
		},
		"image/vnd.radiance": { "source": "iana" },
		"image/vnd.sealed.png": { "source": "iana" },
		"image/vnd.sealedmedia.softseal.gif": { "source": "iana" },
		"image/vnd.sealedmedia.softseal.jpg": { "source": "iana" },
		"image/vnd.svf": { "source": "iana" },
		"image/vnd.tencent.tap": {
			"source": "iana",
			"extensions": ["tap"]
		},
		"image/vnd.valve.source.texture": {
			"source": "iana",
			"extensions": ["vtf"]
		},
		"image/vnd.wap.wbmp": {
			"source": "iana",
			"extensions": ["wbmp"]
		},
		"image/vnd.xiff": {
			"source": "iana",
			"extensions": ["xif"]
		},
		"image/vnd.zbrush.pcx": {
			"source": "iana",
			"extensions": ["pcx"]
		},
		"image/webp": {
			"source": "apache",
			"extensions": ["webp"]
		},
		"image/wmf": {
			"source": "iana",
			"extensions": ["wmf"]
		},
		"image/x-3ds": {
			"source": "apache",
			"extensions": ["3ds"]
		},
		"image/x-cmu-raster": {
			"source": "apache",
			"extensions": ["ras"]
		},
		"image/x-cmx": {
			"source": "apache",
			"extensions": ["cmx"]
		},
		"image/x-freehand": {
			"source": "apache",
			"extensions": [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ico"]
		},
		"image/x-jng": {
			"source": "nginx",
			"extensions": ["jng"]
		},
		"image/x-mrsid-image": {
			"source": "apache",
			"extensions": ["sid"]
		},
		"image/x-ms-bmp": {
			"source": "nginx",
			"compressible": true,
			"extensions": ["bmp"]
		},
		"image/x-pcx": {
			"source": "apache",
			"extensions": ["pcx"]
		},
		"image/x-pict": {
			"source": "apache",
			"extensions": ["pic", "pct"]
		},
		"image/x-portable-anymap": {
			"source": "apache",
			"extensions": ["pnm"]
		},
		"image/x-portable-bitmap": {
			"source": "apache",
			"extensions": ["pbm"]
		},
		"image/x-portable-graymap": {
			"source": "apache",
			"extensions": ["pgm"]
		},
		"image/x-portable-pixmap": {
			"source": "apache",
			"extensions": ["ppm"]
		},
		"image/x-rgb": {
			"source": "apache",
			"extensions": ["rgb"]
		},
		"image/x-tga": {
			"source": "apache",
			"extensions": ["tga"]
		},
		"image/x-xbitmap": {
			"source": "apache",
			"extensions": ["xbm"]
		},
		"image/x-xcf": { "compressible": false },
		"image/x-xpixmap": {
			"source": "apache",
			"extensions": ["xpm"]
		},
		"image/x-xwindowdump": {
			"source": "apache",
			"extensions": ["xwd"]
		},
		"message/cpim": { "source": "iana" },
		"message/delivery-status": { "source": "iana" },
		"message/disposition-notification": {
			"source": "iana",
			"extensions": ["disposition-notification"]
		},
		"message/external-body": { "source": "iana" },
		"message/feedback-report": { "source": "iana" },
		"message/global": {
			"source": "iana",
			"extensions": ["u8msg"]
		},
		"message/global-delivery-status": {
			"source": "iana",
			"extensions": ["u8dsn"]
		},
		"message/global-disposition-notification": {
			"source": "iana",
			"extensions": ["u8mdn"]
		},
		"message/global-headers": {
			"source": "iana",
			"extensions": ["u8hdr"]
		},
		"message/http": {
			"source": "iana",
			"compressible": false
		},
		"message/imdn+xml": {
			"source": "iana",
			"compressible": true
		},
		"message/news": { "source": "iana" },
		"message/partial": {
			"source": "iana",
			"compressible": false
		},
		"message/rfc822": {
			"source": "iana",
			"compressible": true,
			"extensions": ["eml", "mime"]
		},
		"message/s-http": { "source": "iana" },
		"message/sip": { "source": "iana" },
		"message/sipfrag": { "source": "iana" },
		"message/tracking-status": { "source": "iana" },
		"message/vnd.si.simp": { "source": "iana" },
		"message/vnd.wfa.wsc": {
			"source": "iana",
			"extensions": ["wsc"]
		},
		"model/3mf": {
			"source": "iana",
			"extensions": ["3mf"]
		},
		"model/e57": { "source": "iana" },
		"model/gltf+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["gltf"]
		},
		"model/gltf-binary": {
			"source": "iana",
			"compressible": true,
			"extensions": ["glb"]
		},
		"model/iges": {
			"source": "iana",
			"compressible": false,
			"extensions": ["igs", "iges"]
		},
		"model/mesh": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/mtl": {
			"source": "iana",
			"extensions": ["mtl"]
		},
		"model/obj": {
			"source": "iana",
			"extensions": ["obj"]
		},
		"model/step": { "source": "iana" },
		"model/step+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["stpx"]
		},
		"model/step+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["stpz"]
		},
		"model/step-xml+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["stpxz"]
		},
		"model/stl": {
			"source": "iana",
			"extensions": ["stl"]
		},
		"model/vnd.collada+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dae"]
		},
		"model/vnd.dwf": {
			"source": "iana",
			"extensions": ["dwf"]
		},
		"model/vnd.flatland.3dml": { "source": "iana" },
		"model/vnd.gdl": {
			"source": "iana",
			"extensions": ["gdl"]
		},
		"model/vnd.gs-gdl": { "source": "apache" },
		"model/vnd.gs.gdl": { "source": "iana" },
		"model/vnd.gtw": {
			"source": "iana",
			"extensions": ["gtw"]
		},
		"model/vnd.moml+xml": {
			"source": "iana",
			"compressible": true
		},
		"model/vnd.mts": {
			"source": "iana",
			"extensions": ["mts"]
		},
		"model/vnd.opengex": {
			"source": "iana",
			"extensions": ["ogex"]
		},
		"model/vnd.parasolid.transmit.binary": {
			"source": "iana",
			"extensions": ["x_b"]
		},
		"model/vnd.parasolid.transmit.text": {
			"source": "iana",
			"extensions": ["x_t"]
		},
		"model/vnd.pytha.pyox": { "source": "iana" },
		"model/vnd.rosette.annotated-data-model": { "source": "iana" },
		"model/vnd.sap.vds": {
			"source": "iana",
			"extensions": ["vds"]
		},
		"model/vnd.usdz+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["usdz"]
		},
		"model/vnd.valve.source.compiled-map": {
			"source": "iana",
			"extensions": ["bsp"]
		},
		"model/vnd.vtu": {
			"source": "iana",
			"extensions": ["vtu"]
		},
		"model/vrml": {
			"source": "iana",
			"compressible": false,
			"extensions": ["wrl", "vrml"]
		},
		"model/x3d+binary": {
			"source": "apache",
			"compressible": false,
			"extensions": ["x3db", "x3dbz"]
		},
		"model/x3d+fastinfoset": {
			"source": "iana",
			"extensions": ["x3db"]
		},
		"model/x3d+vrml": {
			"source": "apache",
			"compressible": false,
			"extensions": ["x3dv", "x3dvz"]
		},
		"model/x3d+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["x3d", "x3dz"]
		},
		"model/x3d-vrml": {
			"source": "iana",
			"extensions": ["x3dv"]
		},
		"multipart/alternative": {
			"source": "iana",
			"compressible": false
		},
		"multipart/appledouble": { "source": "iana" },
		"multipart/byteranges": { "source": "iana" },
		"multipart/digest": { "source": "iana" },
		"multipart/encrypted": {
			"source": "iana",
			"compressible": false
		},
		"multipart/form-data": {
			"source": "iana",
			"compressible": false
		},
		"multipart/header-set": { "source": "iana" },
		"multipart/mixed": { "source": "iana" },
		"multipart/multilingual": { "source": "iana" },
		"multipart/parallel": { "source": "iana" },
		"multipart/related": {
			"source": "iana",
			"compressible": false
		},
		"multipart/report": { "source": "iana" },
		"multipart/signed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/vnd.bint.med-plus": { "source": "iana" },
		"multipart/voice-message": { "source": "iana" },
		"multipart/x-mixed-replace": { "source": "iana" },
		"text/1d-interleaved-parityfec": { "source": "iana" },
		"text/cache-manifest": {
			"source": "iana",
			"compressible": true,
			"extensions": ["appcache", "manifest"]
		},
		"text/calendar": {
			"source": "iana",
			"extensions": ["ics", "ifb"]
		},
		"text/calender": { "compressible": true },
		"text/cmd": { "compressible": true },
		"text/coffeescript": { "extensions": ["coffee", "litcoffee"] },
		"text/cql": { "source": "iana" },
		"text/cql-expression": { "source": "iana" },
		"text/cql-identifier": { "source": "iana" },
		"text/css": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["css"]
		},
		"text/csv": {
			"source": "iana",
			"compressible": true,
			"extensions": ["csv"]
		},
		"text/csv-schema": { "source": "iana" },
		"text/directory": { "source": "iana" },
		"text/dns": { "source": "iana" },
		"text/ecmascript": { "source": "iana" },
		"text/encaprtp": { "source": "iana" },
		"text/enriched": { "source": "iana" },
		"text/fhirpath": { "source": "iana" },
		"text/flexfec": { "source": "iana" },
		"text/fwdred": { "source": "iana" },
		"text/gff3": { "source": "iana" },
		"text/grammar-ref-list": { "source": "iana" },
		"text/html": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": { "extensions": ["jade"] },
		"text/javascript": {
			"source": "iana",
			"compressible": true
		},
		"text/jcr-cnd": { "source": "iana" },
		"text/jsx": {
			"compressible": true,
			"extensions": ["jsx"]
		},
		"text/less": {
			"compressible": true,
			"extensions": ["less"]
		},
		"text/markdown": {
			"source": "iana",
			"compressible": true,
			"extensions": ["markdown", "md"]
		},
		"text/mathml": {
			"source": "nginx",
			"extensions": ["mml"]
		},
		"text/mdx": {
			"compressible": true,
			"extensions": ["mdx"]
		},
		"text/mizar": { "source": "iana" },
		"text/n3": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["n3"]
		},
		"text/parameters": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/parityfec": { "source": "iana" },
		"text/plain": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/prs.fallenstein.rst": { "source": "iana" },
		"text/prs.lines.tag": {
			"source": "iana",
			"extensions": ["dsc"]
		},
		"text/prs.prop.logic": { "source": "iana" },
		"text/raptorfec": { "source": "iana" },
		"text/red": { "source": "iana" },
		"text/rfc822-headers": { "source": "iana" },
		"text/richtext": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtx"]
		},
		"text/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtf"]
		},
		"text/rtp-enc-aescm128": { "source": "iana" },
		"text/rtploopback": { "source": "iana" },
		"text/rtx": { "source": "iana" },
		"text/sgml": {
			"source": "iana",
			"extensions": ["sgml", "sgm"]
		},
		"text/shaclc": { "source": "iana" },
		"text/shex": {
			"source": "iana",
			"extensions": ["shex"]
		},
		"text/slim": { "extensions": ["slim", "slm"] },
		"text/spdx": {
			"source": "iana",
			"extensions": ["spdx"]
		},
		"text/strings": { "source": "iana" },
		"text/stylus": { "extensions": ["stylus", "styl"] },
		"text/t140": { "source": "iana" },
		"text/tab-separated-values": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tsv"]
		},
		"text/troff": {
			"source": "iana",
			"extensions": [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["ttl"]
		},
		"text/ulpfec": { "source": "iana" },
		"text/uri-list": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			"source": "iana",
			"compressible": true,
			"extensions": ["vcard"]
		},
		"text/vnd.a": { "source": "iana" },
		"text/vnd.abc": { "source": "iana" },
		"text/vnd.ascii-art": { "source": "iana" },
		"text/vnd.curl": {
			"source": "iana",
			"extensions": ["curl"]
		},
		"text/vnd.curl.dcurl": {
			"source": "apache",
			"extensions": ["dcurl"]
		},
		"text/vnd.curl.mcurl": {
			"source": "apache",
			"extensions": ["mcurl"]
		},
		"text/vnd.curl.scurl": {
			"source": "apache",
			"extensions": ["scurl"]
		},
		"text/vnd.debian.copyright": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.dmclientscript": { "source": "iana" },
		"text/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": ["sub"]
		},
		"text/vnd.esmertec.theme-descriptor": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.familysearch.gedcom": {
			"source": "iana",
			"extensions": ["ged"]
		},
		"text/vnd.ficlab.flt": { "source": "iana" },
		"text/vnd.fly": {
			"source": "iana",
			"extensions": ["fly"]
		},
		"text/vnd.fmi.flexstor": {
			"source": "iana",
			"extensions": ["flx"]
		},
		"text/vnd.gml": { "source": "iana" },
		"text/vnd.graphviz": {
			"source": "iana",
			"extensions": ["gv"]
		},
		"text/vnd.hans": { "source": "iana" },
		"text/vnd.hgl": { "source": "iana" },
		"text/vnd.in3d.3dml": {
			"source": "iana",
			"extensions": ["3dml"]
		},
		"text/vnd.in3d.spot": {
			"source": "iana",
			"extensions": ["spot"]
		},
		"text/vnd.iptc.newsml": { "source": "iana" },
		"text/vnd.iptc.nitf": { "source": "iana" },
		"text/vnd.latex-z": { "source": "iana" },
		"text/vnd.motorola.reflex": { "source": "iana" },
		"text/vnd.ms-mediapackage": { "source": "iana" },
		"text/vnd.net2phone.commcenter.command": { "source": "iana" },
		"text/vnd.radisys.msml-basic-layout": { "source": "iana" },
		"text/vnd.senx.warpscript": { "source": "iana" },
		"text/vnd.si.uricatalogue": { "source": "iana" },
		"text/vnd.sosi": { "source": "iana" },
		"text/vnd.sun.j2me.app-descriptor": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["jad"]
		},
		"text/vnd.trolltech.linguist": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.wap.si": { "source": "iana" },
		"text/vnd.wap.sl": { "source": "iana" },
		"text/vnd.wap.wml": {
			"source": "iana",
			"extensions": ["wml"]
		},
		"text/vnd.wap.wmlscript": {
			"source": "iana",
			"extensions": ["wmls"]
		},
		"text/vtt": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["vtt"]
		},
		"text/x-asm": {
			"source": "apache",
			"extensions": ["s", "asm"]
		},
		"text/x-c": {
			"source": "apache",
			"extensions": [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			"source": "nginx",
			"extensions": ["htc"]
		},
		"text/x-fortran": {
			"source": "apache",
			"extensions": [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": { "compressible": true },
		"text/x-handlebars-template": { "extensions": ["hbs"] },
		"text/x-java-source": {
			"source": "apache",
			"extensions": ["java"]
		},
		"text/x-jquery-tmpl": { "compressible": true },
		"text/x-lua": { "extensions": ["lua"] },
		"text/x-markdown": {
			"compressible": true,
			"extensions": ["mkd"]
		},
		"text/x-nfo": {
			"source": "apache",
			"extensions": ["nfo"]
		},
		"text/x-opml": {
			"source": "apache",
			"extensions": ["opml"]
		},
		"text/x-org": {
			"compressible": true,
			"extensions": ["org"]
		},
		"text/x-pascal": {
			"source": "apache",
			"extensions": ["p", "pas"]
		},
		"text/x-processing": {
			"compressible": true,
			"extensions": ["pde"]
		},
		"text/x-sass": { "extensions": ["sass"] },
		"text/x-scss": { "extensions": ["scss"] },
		"text/x-setext": {
			"source": "apache",
			"extensions": ["etx"]
		},
		"text/x-sfv": {
			"source": "apache",
			"extensions": ["sfv"]
		},
		"text/x-suse-ymp": {
			"compressible": true,
			"extensions": ["ymp"]
		},
		"text/x-uuencode": {
			"source": "apache",
			"extensions": ["uu"]
		},
		"text/x-vcalendar": {
			"source": "apache",
			"extensions": ["vcs"]
		},
		"text/x-vcard": {
			"source": "apache",
			"extensions": ["vcf"]
		},
		"text/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xml"]
		},
		"text/xml-external-parsed-entity": { "source": "iana" },
		"text/yaml": {
			"compressible": true,
			"extensions": ["yaml", "yml"]
		},
		"video/1d-interleaved-parityfec": { "source": "iana" },
		"video/3gpp": {
			"source": "iana",
			"extensions": ["3gp", "3gpp"]
		},
		"video/3gpp-tt": { "source": "iana" },
		"video/3gpp2": {
			"source": "iana",
			"extensions": ["3g2"]
		},
		"video/av1": { "source": "iana" },
		"video/bmpeg": { "source": "iana" },
		"video/bt656": { "source": "iana" },
		"video/celb": { "source": "iana" },
		"video/dv": { "source": "iana" },
		"video/encaprtp": { "source": "iana" },
		"video/ffv1": { "source": "iana" },
		"video/flexfec": { "source": "iana" },
		"video/h261": {
			"source": "iana",
			"extensions": ["h261"]
		},
		"video/h263": {
			"source": "iana",
			"extensions": ["h263"]
		},
		"video/h263-1998": { "source": "iana" },
		"video/h263-2000": { "source": "iana" },
		"video/h264": {
			"source": "iana",
			"extensions": ["h264"]
		},
		"video/h264-rcdo": { "source": "iana" },
		"video/h264-svc": { "source": "iana" },
		"video/h265": { "source": "iana" },
		"video/iso.segment": {
			"source": "iana",
			"extensions": ["m4s"]
		},
		"video/jpeg": {
			"source": "iana",
			"extensions": ["jpgv"]
		},
		"video/jpeg2000": { "source": "iana" },
		"video/jpm": {
			"source": "apache",
			"extensions": ["jpm", "jpgm"]
		},
		"video/jxsv": { "source": "iana" },
		"video/mj2": {
			"source": "iana",
			"extensions": ["mj2", "mjp2"]
		},
		"video/mp1s": { "source": "iana" },
		"video/mp2p": { "source": "iana" },
		"video/mp2t": {
			"source": "iana",
			"extensions": ["ts"]
		},
		"video/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": { "source": "iana" },
		"video/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": { "source": "iana" },
		"video/mpv": { "source": "iana" },
		"video/nv": { "source": "iana" },
		"video/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ogv"]
		},
		"video/parityfec": { "source": "iana" },
		"video/pointer": { "source": "iana" },
		"video/quicktime": {
			"source": "iana",
			"compressible": false,
			"extensions": ["qt", "mov"]
		},
		"video/raptorfec": { "source": "iana" },
		"video/raw": { "source": "iana" },
		"video/rtp-enc-aescm128": { "source": "iana" },
		"video/rtploopback": { "source": "iana" },
		"video/rtx": { "source": "iana" },
		"video/scip": { "source": "iana" },
		"video/smpte291": { "source": "iana" },
		"video/smpte292m": { "source": "iana" },
		"video/ulpfec": { "source": "iana" },
		"video/vc1": { "source": "iana" },
		"video/vc2": { "source": "iana" },
		"video/vnd.cctv": { "source": "iana" },
		"video/vnd.dece.hd": {
			"source": "iana",
			"extensions": ["uvh", "uvvh"]
		},
		"video/vnd.dece.mobile": {
			"source": "iana",
			"extensions": ["uvm", "uvvm"]
		},
		"video/vnd.dece.mp4": { "source": "iana" },
		"video/vnd.dece.pd": {
			"source": "iana",
			"extensions": ["uvp", "uvvp"]
		},
		"video/vnd.dece.sd": {
			"source": "iana",
			"extensions": ["uvs", "uvvs"]
		},
		"video/vnd.dece.video": {
			"source": "iana",
			"extensions": ["uvv", "uvvv"]
		},
		"video/vnd.directv.mpeg": { "source": "iana" },
		"video/vnd.directv.mpeg-tts": { "source": "iana" },
		"video/vnd.dlna.mpeg-tts": { "source": "iana" },
		"video/vnd.dvb.file": {
			"source": "iana",
			"extensions": ["dvb"]
		},
		"video/vnd.fvt": {
			"source": "iana",
			"extensions": ["fvt"]
		},
		"video/vnd.hns.video": { "source": "iana" },
		"video/vnd.iptvforum.1dparityfec-1010": { "source": "iana" },
		"video/vnd.iptvforum.1dparityfec-2005": { "source": "iana" },
		"video/vnd.iptvforum.2dparityfec-1010": { "source": "iana" },
		"video/vnd.iptvforum.2dparityfec-2005": { "source": "iana" },
		"video/vnd.iptvforum.ttsavc": { "source": "iana" },
		"video/vnd.iptvforum.ttsmpeg2": { "source": "iana" },
		"video/vnd.motorola.video": { "source": "iana" },
		"video/vnd.motorola.videop": { "source": "iana" },
		"video/vnd.mpegurl": {
			"source": "iana",
			"extensions": ["mxu", "m4u"]
		},
		"video/vnd.ms-playready.media.pyv": {
			"source": "iana",
			"extensions": ["pyv"]
		},
		"video/vnd.nokia.interleaved-multimedia": { "source": "iana" },
		"video/vnd.nokia.mp4vr": { "source": "iana" },
		"video/vnd.nokia.videovoip": { "source": "iana" },
		"video/vnd.objectvideo": { "source": "iana" },
		"video/vnd.radgamettools.bink": { "source": "iana" },
		"video/vnd.radgamettools.smacker": { "source": "iana" },
		"video/vnd.sealed.mpeg1": { "source": "iana" },
		"video/vnd.sealed.mpeg4": { "source": "iana" },
		"video/vnd.sealed.swf": { "source": "iana" },
		"video/vnd.sealedmedia.softseal.mov": { "source": "iana" },
		"video/vnd.uvvu.mp4": {
			"source": "iana",
			"extensions": ["uvu", "uvvu"]
		},
		"video/vnd.vivo": {
			"source": "iana",
			"extensions": ["viv"]
		},
		"video/vnd.youtube.yt": { "source": "iana" },
		"video/vp8": { "source": "iana" },
		"video/vp9": { "source": "iana" },
		"video/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["webm"]
		},
		"video/x-f4v": {
			"source": "apache",
			"extensions": ["f4v"]
		},
		"video/x-fli": {
			"source": "apache",
			"extensions": ["fli"]
		},
		"video/x-flv": {
			"source": "apache",
			"compressible": false,
			"extensions": ["flv"]
		},
		"video/x-m4v": {
			"source": "apache",
			"extensions": ["m4v"]
		},
		"video/x-matroska": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			"source": "apache",
			"extensions": ["mng"]
		},
		"video/x-ms-asf": {
			"source": "apache",
			"extensions": ["asf", "asx"]
		},
		"video/x-ms-vob": {
			"source": "apache",
			"extensions": ["vob"]
		},
		"video/x-ms-wm": {
			"source": "apache",
			"extensions": ["wm"]
		},
		"video/x-ms-wmv": {
			"source": "apache",
			"compressible": false,
			"extensions": ["wmv"]
		},
		"video/x-ms-wmx": {
			"source": "apache",
			"extensions": ["wmx"]
		},
		"video/x-ms-wvx": {
			"source": "apache",
			"extensions": ["wvx"]
		},
		"video/x-msvideo": {
			"source": "apache",
			"extensions": ["avi"]
		},
		"video/x-sgi-movie": {
			"source": "apache",
			"extensions": ["movie"]
		},
		"video/x-smv": {
			"source": "apache",
			"extensions": ["smv"]
		},
		"x-conference/x-cooltalk": {
			"source": "apache",
			"extensions": ["ice"]
		},
		"x-shader/x-fragment": { "compressible": true },
		"x-shader/x-vertex": { "compressible": true }
	};
}));
//#endregion
//#region node_modules/mime-db/index.js
var require_mime_db = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* mime-db
	* Copyright(c) 2014 Jonathan Ong
	* Copyright(c) 2015-2022 Douglas Christopher Wilson
	* MIT Licensed
	*/
	/**
	* Module exports.
	*/
	module.exports = (init_db(), __toCommonJS(db_exports).default);
}));
//#endregion
//#region node_modules/mime-types/index.js
/*!
* mime-types
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_mime_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Module dependencies.
	* @private
	*/
	var db = require_mime_db();
	var extname = __require("path").extname;
	/**
	* Module variables.
	* @private
	*/
	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
	var TEXT_TYPE_REGEXP = /^text\//i;
	/**
	* Module exports.
	* @public
	*/
	exports.charset = charset;
	exports.charsets = { lookup: charset };
	exports.contentType = contentType;
	exports.extension = extension;
	exports.extensions = Object.create(null);
	exports.lookup = lookup;
	exports.types = Object.create(null);
	populateMaps(exports.extensions, exports.types);
	/**
	* Get the default charset for a MIME type.
	*
	* @param {string} type
	* @return {boolean|string}
	*/
	function charset(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var mime = match && db[match[1].toLowerCase()];
		if (mime && mime.charset) return mime.charset;
		if (match && TEXT_TYPE_REGEXP.test(match[1])) return "UTF-8";
		return false;
	}
	/**
	* Create a full Content-Type header given a MIME type or extension.
	*
	* @param {string} str
	* @return {boolean|string}
	*/
	function contentType(str) {
		if (!str || typeof str !== "string") return false;
		var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
		if (!mime) return false;
		if (mime.indexOf("charset") === -1) {
			var charset = exports.charset(mime);
			if (charset) mime += "; charset=" + charset.toLowerCase();
		}
		return mime;
	}
	/**
	* Get the default extension for a MIME type.
	*
	* @param {string} type
	* @return {boolean|string}
	*/
	function extension(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var exts = match && exports.extensions[match[1].toLowerCase()];
		if (!exts || !exts.length) return false;
		return exts[0];
	}
	/**
	* Lookup the MIME type for a file path/extension.
	*
	* @param {string} path
	* @return {boolean|string}
	*/
	function lookup(path) {
		if (!path || typeof path !== "string") return false;
		var extension = extname("x." + path).toLowerCase().substr(1);
		if (!extension) return false;
		return exports.types[extension] || false;
	}
	/**
	* Populate the extensions and types maps.
	* @private
	*/
	function populateMaps(extensions, types) {
		var preference = [
			"nginx",
			"apache",
			void 0,
			"iana"
		];
		Object.keys(db).forEach(function forEachMimeType(type) {
			var mime = db[type];
			var exts = mime.extensions;
			if (!exts || !exts.length) return;
			extensions[type] = exts;
			for (var i = 0; i < exts.length; i++) {
				var extension = exts[i];
				if (types[extension]) {
					var from = preference.indexOf(db[types[extension]].source);
					var to = preference.indexOf(mime.source);
					if (types[extension] !== "application/octet-stream" && (from > to || from === to && types[extension].substr(0, 12) === "application/")) continue;
				}
				types[extension] = type;
			}
		});
	}
}));
//#endregion
//#region node_modules/asynckit/lib/defer.js
var require_defer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = defer;
	/**
	* Runs provided function on next iteration of the event loop
	*
	* @param {function} fn - function to run
	*/
	function defer(fn) {
		var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
		if (nextTick) nextTick(fn);
		else setTimeout(fn, 0);
	}
}));
//#endregion
//#region node_modules/asynckit/lib/async.js
var require_async = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defer = require_defer();
	module.exports = async;
	/**
	* Runs provided callback asynchronously
	* even if callback itself is not
	*
	* @param   {function} callback - callback to invoke
	* @returns {function} - augmented callback
	*/
	function async(callback) {
		var isAsync = false;
		defer(function() {
			isAsync = true;
		});
		return function async_callback(err, result) {
			if (isAsync) callback(err, result);
			else defer(function nextTick_callback() {
				callback(err, result);
			});
		};
	}
}));
//#endregion
//#region node_modules/asynckit/lib/abort.js
var require_abort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = abort;
	/**
	* Aborts leftover active jobs
	*
	* @param {object} state - current state object
	*/
	function abort(state) {
		Object.keys(state.jobs).forEach(clean.bind(state));
		state.jobs = {};
	}
	/**
	* Cleans up leftover job by invoking abort function for the provided job id
	*
	* @this  state
	* @param {string|number} key - job id to abort
	*/
	function clean(key) {
		if (typeof this.jobs[key] == "function") this.jobs[key]();
	}
}));
//#endregion
//#region node_modules/asynckit/lib/iterate.js
var require_iterate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var async = require_async();
	var abort = require_abort();
	module.exports = iterate;
	/**
	* Iterates over each job object
	*
	* @param {array|object} list - array or object (named list) to iterate over
	* @param {function} iterator - iterator to run
	* @param {object} state - current job status
	* @param {function} callback - invoked when all elements processed
	*/
	function iterate(list, iterator, state, callback) {
		var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
		state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
			if (!(key in state.jobs)) return;
			delete state.jobs[key];
			if (error) abort(state);
			else state.results[key] = output;
			callback(error, state.results);
		});
	}
	/**
	* Runs iterator over provided job element
	*
	* @param   {function} iterator - iterator to invoke
	* @param   {string|number} key - key/index of the element in the list of jobs
	* @param   {mixed} item - job description
	* @param   {function} callback - invoked after iterator is done with the job
	* @returns {function|mixed} - job abort function or something else
	*/
	function runJob(iterator, key, item, callback) {
		var aborter;
		if (iterator.length == 2) aborter = iterator(item, async(callback));
		else aborter = iterator(item, key, async(callback));
		return aborter;
	}
}));
//#endregion
//#region node_modules/asynckit/lib/state.js
var require_state = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = state;
	/**
	* Creates initial state object
	* for iteration over list
	*
	* @param   {array|object} list - list to iterate over
	* @param   {function|null} sortMethod - function to use for keys sort,
	*                                     or `null` to keep them as is
	* @returns {object} - initial state object
	*/
	function state(list, sortMethod) {
		var isNamedList = !Array.isArray(list), initState = {
			index: 0,
			keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
			jobs: {},
			results: isNamedList ? {} : [],
			size: isNamedList ? Object.keys(list).length : list.length
		};
		if (sortMethod) initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
			return sortMethod(list[a], list[b]);
		});
		return initState;
	}
}));
//#endregion
//#region node_modules/asynckit/lib/terminator.js
var require_terminator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var abort = require_abort();
	var async = require_async();
	module.exports = terminator;
	/**
	* Terminates jobs in the attached state context
	*
	* @this  AsyncKitState#
	* @param {function} callback - final callback to invoke after termination
	*/
	function terminator(callback) {
		if (!Object.keys(this.jobs).length) return;
		this.index = this.size;
		abort(this);
		async(callback)(null, this.results);
	}
}));
//#endregion
//#region node_modules/asynckit/parallel.js
var require_parallel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var iterate = require_iterate();
	var initState = require_state();
	var terminator = require_terminator();
	module.exports = parallel;
	/**
	* Runs iterator over provided array elements in parallel
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function parallel(list, iterator, callback) {
		var state = initState(list);
		while (state.index < (state["keyedList"] || list).length) {
			iterate(list, iterator, state, function(error, result) {
				if (error) {
					callback(error, result);
					return;
				}
				if (Object.keys(state.jobs).length === 0) {
					callback(null, state.results);
					return;
				}
			});
			state.index++;
		}
		return terminator.bind(state, callback);
	}
}));
//#endregion
//#region node_modules/asynckit/serialOrdered.js
var require_serialOrdered = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var iterate = require_iterate();
	var initState = require_state();
	var terminator = require_terminator();
	module.exports = serialOrdered;
	module.exports.ascending = ascending;
	module.exports.descending = descending;
	/**
	* Runs iterator over provided sorted array elements in series
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} sortMethod - custom sort function
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function serialOrdered(list, iterator, sortMethod, callback) {
		var state = initState(list, sortMethod);
		iterate(list, iterator, state, function iteratorHandler(error, result) {
			if (error) {
				callback(error, result);
				return;
			}
			state.index++;
			if (state.index < (state["keyedList"] || list).length) {
				iterate(list, iterator, state, iteratorHandler);
				return;
			}
			callback(null, state.results);
		});
		return terminator.bind(state, callback);
	}
	/**
	* sort helper to sort array elements in ascending order
	*
	* @param   {mixed} a - an item to compare
	* @param   {mixed} b - an item to compare
	* @returns {number} - comparison result
	*/
	function ascending(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}
	/**
	* sort helper to sort array elements in descending order
	*
	* @param   {mixed} a - an item to compare
	* @param   {mixed} b - an item to compare
	* @returns {number} - comparison result
	*/
	function descending(a, b) {
		return -1 * ascending(a, b);
	}
}));
//#endregion
//#region node_modules/asynckit/serial.js
var require_serial = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var serialOrdered = require_serialOrdered();
	module.exports = serial;
	/**
	* Runs iterator over provided array elements in series
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function serial(list, iterator, callback) {
		return serialOrdered(list, iterator, null, callback);
	}
}));
//#endregion
//#region node_modules/asynckit/index.js
var require_asynckit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		parallel: require_parallel(),
		serial: require_serial(),
		serialOrdered: require_serialOrdered()
	};
}));
//#endregion
//#region node_modules/has-tostringtag/shams.js
var require_shams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasSymbols = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};
}));
//#endregion
//#region node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_get_intrinsic()("%Object.defineProperty%", true);
	var hasToStringTag = require_shams()();
	var hasOwn = require_hasown();
	var $TypeError = require_type();
	var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
	/** @type {import('.')} */
	module.exports = function setToStringTag(object, value) {
		var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
		var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
		if (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean" || typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean") throw new $TypeError("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
		if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
			if ($defineProperty) $defineProperty(object, toStringTag, {
				configurable: !nonConfigurable,
				enumerable: false,
				value,
				writable: false
			});
			else object[toStringTag] = value;
		}
	};
}));
//#endregion
//#region node_modules/form-data/lib/populate.js
var require_populate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(dst, src) {
		Object.keys(src).forEach(function(prop) {
			dst[prop] = dst[prop] || src[prop];
		});
		return dst;
	};
}));
var FormData_default = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CombinedStream = require_combined_stream();
	var util$2 = __require("util");
	var path = __require("path");
	var http$2 = __require("http");
	var https$2 = __require("https");
	var parseUrl$1 = __require("url").parse;
	var fs = __require("fs");
	var Stream = __require("stream").Stream;
	var crypto$1 = __require("crypto");
	var mime = require_mime_types();
	var asynckit = require_asynckit();
	var setToStringTag = require_es_set_tostringtag();
	var hasOwn = require_hasown();
	var populate = require_populate();
	/**
	* Escape CR, LF, and `"` in a multipart `name`/`filename` parameter, so a field
	* name or filename can not break out of its header line to inject headers or
	* smuggle additional parts. Matches the WHATWG HTML multipart/form-data encoding.
	*
	* @param {string} str - the parameter value to escape
	* @returns {string} the escaped value
	*/
	function escapeHeaderParam(str) {
		return String(str).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
	}
	/**
	* Create readable "multipart/form-data" streams.
	* Can be used to submit forms
	* and file uploads to other web applications.
	*
	* @constructor
	* @param {object} options - Properties to be added/overriden for FormData and CombinedStream
	*/
	function FormData(options) {
		if (!(this instanceof FormData)) return new FormData(options);
		this._overheadLength = 0;
		this._valueLength = 0;
		this._valuesToMeasure = [];
		CombinedStream.call(this);
		options = options || {};
		for (var option in options) this[option] = options[option];
	}
	util$2.inherits(FormData, CombinedStream);
	FormData.LINE_BREAK = "\r\n";
	FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream";
	FormData.prototype.append = function(field, value, options) {
		options = options || {};
		if (typeof options === "string") options = { filename: options };
		var append = CombinedStream.prototype.append.bind(this);
		if (typeof value === "number" || value == null) value = String(value);
		if (Array.isArray(value)) {
			this._error(/* @__PURE__ */ new Error("Arrays are not supported."));
			return;
		}
		var header = this._multiPartHeader(field, value, options);
		var footer = this._multiPartFooter();
		append(header);
		append(value);
		append(footer);
		this._trackLength(header, value, options);
	};
	FormData.prototype._trackLength = function(header, value, options) {
		var valueLength = 0;
		if (options.knownLength != null) valueLength += Number(options.knownLength);
		else if (Buffer.isBuffer(value)) valueLength = value.length;
		else if (typeof value === "string") valueLength = Buffer.byteLength(value);
		this._valueLength += valueLength;
		this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
		if (!value || !value.path && !(value.readable && hasOwn(value, "httpVersion")) && !(value instanceof Stream)) return;
		if (!options.knownLength) this._valuesToMeasure.push(value);
	};
	FormData.prototype._lengthRetriever = function(value, callback) {
		if (hasOwn(value, "fd")) {
			if (value.end != void 0 && value.end != Infinity && value.start != void 0) callback(null, value.end + 1 - (value.start ? value.start : 0));
			else fs.stat(value.path, function(err, stat) {
				if (err) {
					callback(err);
					return;
				}
				callback(null, stat.size - (value.start ? value.start : 0));
			});
		} else if (hasOwn(value, "httpVersion")) callback(null, Number(value.headers["content-length"]));
		else if (hasOwn(value, "httpModule")) {
			value.on("response", function(response) {
				value.pause();
				callback(null, Number(response.headers["content-length"]));
			});
			value.resume();
		} else callback("Unknown stream");
	};
	FormData.prototype._multiPartHeader = function(field, value, options) {
		if (typeof options.header === "string") return options.header;
		var contentDisposition = this._getContentDisposition(value, options);
		var contentType = this._getContentType(value, options);
		var contents = "";
		var headers = {
			"Content-Disposition": ["form-data", "name=\"" + escapeHeaderParam(field) + "\""].concat(contentDisposition || []),
			"Content-Type": [].concat(contentType || [])
		};
		if (typeof options.header === "object") populate(headers, options.header);
		var header;
		for (var prop in headers) if (hasOwn(headers, prop)) {
			header = headers[prop];
			if (header == null) continue;
			if (!Array.isArray(header)) header = [header];
			if (header.length) contents += prop + ": " + header.join("; ") + FormData.LINE_BREAK;
		}
		return "--" + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
	};
	FormData.prototype._getContentDisposition = function(value, options) {
		var filename;
		if (typeof options.filepath === "string") filename = path.normalize(options.filepath).replace(/\\/g, "/");
		else if (options.filename || value && (value.name || value.path)) filename = path.basename(options.filename || value && (value.name || value.path));
		else if (value && value.readable && hasOwn(value, "httpVersion")) filename = path.basename(value.client._httpMessage.path || "");
		if (filename) return "filename=\"" + escapeHeaderParam(filename) + "\"";
	};
	FormData.prototype._getContentType = function(value, options) {
		var contentType = options.contentType;
		if (!contentType && value && value.name) contentType = mime.lookup(value.name);
		if (!contentType && value && value.path) contentType = mime.lookup(value.path);
		if (!contentType && value && value.readable && hasOwn(value, "httpVersion")) contentType = value.headers["content-type"];
		if (!contentType && (options.filepath || options.filename)) contentType = mime.lookup(options.filepath || options.filename);
		if (!contentType && value && typeof value === "object") contentType = FormData.DEFAULT_CONTENT_TYPE;
		return contentType;
	};
	FormData.prototype._multiPartFooter = function() {
		return function(next) {
			var footer = FormData.LINE_BREAK;
			if (this._streams.length === 0) footer += this._lastBoundary();
			next(footer);
		}.bind(this);
	};
	FormData.prototype._lastBoundary = function() {
		return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
	};
	FormData.prototype.getHeaders = function(userHeaders) {
		var header;
		var formHeaders = { "content-type": "multipart/form-data; boundary=" + this.getBoundary() };
		for (header in userHeaders) if (hasOwn(userHeaders, header)) formHeaders[header.toLowerCase()] = userHeaders[header];
		return formHeaders;
	};
	FormData.prototype.setBoundary = function(boundary) {
		if (typeof boundary !== "string") throw new TypeError("FormData boundary must be a string");
		this._boundary = boundary;
	};
	FormData.prototype.getBoundary = function() {
		if (!this._boundary) this._generateBoundary();
		return this._boundary;
	};
	FormData.prototype.getBuffer = function() {
		var dataBuffer = new Buffer.alloc(0);
		var boundary = this.getBoundary();
		for (var i = 0, len = this._streams.length; i < len; i++) if (typeof this._streams[i] !== "function") {
			if (Buffer.isBuffer(this._streams[i])) dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
			else dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
			if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData.LINE_BREAK)]);
		}
		return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
	};
	FormData.prototype._generateBoundary = function() {
		this._boundary = "--------------------------" + crypto$1.randomBytes(12).toString("hex");
	};
	FormData.prototype.getLengthSync = function() {
		var knownLength = this._overheadLength + this._valueLength;
		if (this._streams.length) knownLength += this._lastBoundary().length;
		if (!this.hasKnownLength()) this._error(/* @__PURE__ */ new Error("Cannot calculate proper length in synchronous way."));
		return knownLength;
	};
	FormData.prototype.hasKnownLength = function() {
		var hasKnownLength = true;
		if (this._valuesToMeasure.length) hasKnownLength = false;
		return hasKnownLength;
	};
	FormData.prototype.getLength = function(cb) {
		var knownLength = this._overheadLength + this._valueLength;
		if (this._streams.length) knownLength += this._lastBoundary().length;
		if (!this._valuesToMeasure.length) {
			process.nextTick(cb.bind(this, null, knownLength));
			return;
		}
		asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
			if (err) {
				cb(err);
				return;
			}
			values.forEach(function(length) {
				knownLength += length;
			});
			cb(null, knownLength);
		});
	};
	FormData.prototype.submit = function(params, cb) {
		var request;
		var options;
		var defaults = { method: "post" };
		if (typeof params === "string") {
			params = parseUrl$1(params);
			options = populate({
				port: params.port,
				path: params.pathname,
				host: params.hostname,
				protocol: params.protocol
			}, defaults);
		} else {
			options = populate(params, defaults);
			if (!options.port) options.port = options.protocol === "https:" ? 443 : 80;
		}
		options.headers = this.getHeaders(params.headers);
		if (options.protocol === "https:") request = https$2.request(options);
		else request = http$2.request(options);
		this.getLength(function(err, length) {
			if (err && err !== "Unknown stream") {
				this._error(err);
				return;
			}
			if (length) request.setHeader("Content-Length", length);
			this.pipe(request);
			if (cb) {
				var onResponse;
				var callback = function(error, responce) {
					request.removeListener("error", callback);
					request.removeListener("response", onResponse);
					return cb.call(this, error, responce);
				};
				onResponse = callback.bind(this, null);
				request.on("error", callback);
				request.on("response", onResponse);
			}
		}.bind(this));
		return request;
	};
	FormData.prototype._error = function(err) {
		if (!this.error) {
			this.error = err;
			this.pause();
			this.emit("error", err);
		}
	};
	FormData.prototype.toString = function() {
		return "[object FormData]";
	};
	setToStringTag(FormData.prototype, "FormData");
	module.exports = FormData;
})))(), 1)).default;
//#endregion
//#region node_modules/axios/lib/platform/node/classes/Buffer.js
var Buffer_default = {
	isBufferAvailable() {
		return typeof Buffer !== "undefined";
	},
	from(value) {
		return Buffer.from(value);
	}
};
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
	return /^is[A-Z]/.test(prop);
});
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData$1(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new (FormData_default || FormData)();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
	const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	const stack = [];
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
			if (useBlob && typeof _Blob === "function") return new _Blob([value]);
			if (Buffer_default && Buffer_default.isBufferAvailable()) return Buffer_default.from(value);
			throw new AxiosError$1("Blob is not supported. Use a Buffer instead.", AxiosError$1.ERR_NOT_SUPPORT);
		}
		return value;
	}
	function throwIfMaxDepthExceeded(depth) {
		if (depth > maxDepth) throw new AxiosError$1("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function stringifyWithDepthLimit(value, depth) {
		if (maxDepth === Infinity) return JSON.stringify(value);
		const ancestors = [];
		return JSON.stringify(value, function limitDepth(_key, currentValue) {
			if (!utils_default.isObject(currentValue)) return currentValue;
			while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop();
			ancestors.push(currentValue);
			throwIfMaxDepthExceeded(depth + ancestors.length - 1);
			return currentValue;
		});
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = stringifyWithDepthLimit(value, 1);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		throwIfMaxDepthExceeded(depth);
		if (stack.indexOf(value) !== -1) throw new Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
function encode$1(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
		return charMap[match];
	});
}
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData$1(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
	this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
	const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
	return this._pairs.map(function each(pair) {
		return _encode(pair[0]) + "=" + _encode(pair[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
* their plain counterparts (`:`, `$`, `,`, `+`).
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	url = url || "";
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const _encode = utils_default.getSafeProp(_options, "encode") || encode;
	const serializeFn = utils_default.getSafeProp(_options, "serialize");
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
//#endregion
//#region node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager = class {
	constructor() {
		this.handlers = [];
	}
	/**
	* Add a new interceptor to the stack
	*
	* @param {Function} fulfilled The function to handle `then` for a `Promise`
	* @param {Function} rejected The function to handle `reject` for a `Promise`
	* @param {Object} options The options for the interceptor, synchronous and runWhen
	*
	* @return {Number} An ID used to remove interceptor later
	*/
	use(fulfilled, rejected, options) {
		this.handlers.push({
			fulfilled,
			rejected,
			synchronous: options ? options.synchronous : false,
			runWhen: options ? options.runWhen : null
		});
		return this.handlers.length - 1;
	}
	/**
	* Remove an interceptor from the stack
	*
	* @param {Number} id The ID that was returned by `use`
	*
	* @returns {void}
	*/
	eject(id) {
		if (this.handlers[id]) this.handlers[id] = null;
	}
	/**
	* Clear all interceptors from the stack
	*
	* @returns {void}
	*/
	clear() {
		if (this.handlers) this.handlers = [];
	}
	/**
	* Iterate over all the registered interceptors
	*
	* This method is particularly useful for skipping over any
	* interceptors that may have become `null` calling `eject`.
	*
	* @param {Function} fn The function to call for each interceptor
	*
	* @returns {void}
	*/
	forEach(fn) {
		utils_default.forEach(this.handlers, function forEachHandler(h) {
			if (h !== null) fn(h);
		});
	}
};
//#endregion
//#region node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
	silentJSONParsing: true,
	forcedJSONParsing: true,
	clarifyTimeoutError: false,
	legacyInterceptorReqResOrdering: true,
	advertiseZstdAcceptEncoding: false,
	validateStatusUndefinedResolves: true
};
//#endregion
//#region node_modules/axios/lib/platform/node/classes/URLSearchParams.js
var URLSearchParams_default = url.URLSearchParams;
//#endregion
//#region node_modules/axios/lib/platform/node/index.js
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
	DIGIT,
	ALPHA,
	ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
	let str = "";
	const { length } = alphabet;
	const randomValues = new Uint32Array(size);
	crypto.randomFillSync(randomValues);
	for (let i = 0; i < size; i++) str += alphabet[randomValues[i] % length];
	return str;
};
var node_default = {
	isNode: true,
	classes: {
		URLSearchParams: URLSearchParams_default,
		FormData: FormData_default,
		Blob: typeof Blob !== "undefined" && Blob || null
	},
	ALPHABET,
	generateString,
	protocols: [
		"http",
		"https",
		"file",
		"data"
	]
};
//#endregion
//#region node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
/**
* Determine if we're running in a standard browser environment
*
* This allows axios to run in a web worker, and react-native.
* Both environments support XMLHttpRequest, but not fully standard globals.
*
* web workers:
*  typeof window -> undefined
*  typeof document -> undefined
*
* react-native:
*  navigator.product -> 'ReactNative'
* nativescript
*  navigator.product -> 'NativeScript' or 'NS'
*
* @returns {boolean}
*/
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(_navigator.product) < 0);
/**
* Determine if we're running in a standard browser webWorker environment
*
* Although the `isStandardBrowserEnv` method indicates that
* `allows axios to run in a web worker`, the WebWorker will still be
* filtered out due to its judgment standard
* `typeof window !== 'undefined' && typeof document !== 'undefined'`.
* This leads to a problem when axios post `FormData` in webWorker
*/
var hasStandardBrowserWebWorkerEnv = (() => {
	return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";
//#endregion
//#region node_modules/axios/lib/platform/index.js
var platform_default = {
	...utils_exports,
	...node_default
};
//#endregion
//#region node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData$1(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/formDataToJSON.js
var MAX_DEPTH = 100;
function throwIfDepthExceeded(index) {
	if (index > MAX_DEPTH) throw new AxiosError$1("FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	const path = [];
	const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
	let match;
	while ((match = pattern.exec(name)) !== null) {
		throwIfDepthExceeded(path.length);
		path.push(match[0] === "[]" ? "" : match[1] || match[0]);
	}
	return path;
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		throwIfDepthExceeded(index);
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
//#endregion
//#region node_modules/axios/lib/defaults/index.js
var own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
	transitional: transitional_default,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function transformRequest(data, headers) {
		const contentType = headers.getContentType() || "";
		const hasJSONContentType = contentType.indexOf("application/json") > -1;
		const isObjectPayload = utils_default.isObject(data);
		if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
		if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
		if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
		if (utils_default.isArrayBufferView(data)) return data.buffer;
		if (utils_default.isURLSearchParams(data)) {
			headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
			return data.toString();
		}
		let isFileList;
		if (isObjectPayload) {
			const formSerializer = own(this, "formSerializer");
			if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
			if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
				const env = own(this, "env");
				const _FormData = env && env.FormData;
				return toFormData$1(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
			}
		}
		if (isObjectPayload || hasJSONContentType) {
			headers.setContentType("application/json", false);
			return stringifySafely(data);
		}
		return data;
	}],
	transformResponse: [function transformResponse(data) {
		const transitional = own(this, "transitional") || defaults.transitional;
		const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
		const responseType = own(this, "responseType");
		const JSONRequested = responseType === "json";
		if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
		if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
			const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
			try {
				return JSON.parse(data, own(this, "parseReviver"));
			} catch (e) {
				if (strictJSONParsing) {
					if (e.name === "SyntaxError") throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
					throw e;
				}
			}
		}
		return data;
	}],
	/**
	* A timeout in milliseconds to abort a request. If set to 0 (default) a
	* timeout is not created.
	*/
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: platform_default.classes.FormData,
		Blob: platform_default.classes.Blob
	},
	validateStatus: function validateStatus(status) {
		return status >= 200 && status < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (method) => {
	defaults.headers[method] = {};
});
//#endregion
//#region node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders$1.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
//#endregion
//#region node_modules/axios/lib/cancel/isCancel.js
function isCancel$1(value) {
	return !!(value && value.__CANCEL__);
}
//#endregion
//#region node_modules/axios/lib/cancel/CanceledError.js
var CanceledError$1 = class extends AxiosError$1 {
	/**
	* A `CanceledError` is an object that is thrown when an operation is canceled.
	*
	* @param {string=} message The message.
	* @param {Object=} config The config.
	* @param {Object=} request The request.
	*
	* @returns {CanceledError} The created error.
	*/
	constructor(message, config, request) {
		super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
		this.name = "CanceledError";
		this.__CANCEL__ = true;
	}
};
//#endregion
//#region node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError$1("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE, response.config, response.request, response));
}
//#endregion
//#region node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
//#endregion
//#region node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	if (!relativeURL) return baseURL;
	let end = baseURL.length;
	while (end > 0 && baseURL.charCodeAt(end - 1) === 47) end--;
	return baseURL.slice(0, end) + "/" + relativeURL.replace(/^\/+/, "");
}
//#endregion
//#region node_modules/axios/lib/core/buildFullPath.js
var malformedHttpProtocol = /^https?:(?!\/\/)/i;
var httpProtocolControlCharacters = /[\t\n\r]/g;
function stripLeadingC0ControlOrSpace(url) {
	let i = 0;
	while (i < url.length && url.charCodeAt(i) <= 32) i++;
	return url.slice(i);
}
function normalizeURLForProtocolCheck(url) {
	return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
}
function redactFragment(fragment) {
	if (!fragment) return fragment;
	return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = "") => {
		return `${separator}${parameterName}${REDACTED}`;
	});
}
function redactSensitiveURLParts(url) {
	const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${REDACTED}@`);
	const fragmentIndex = redactedURL.indexOf("#");
	const redactedURLWithoutFragment = (fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${REDACTED}`);
	if (fragmentIndex === -1) return redactedURLWithoutFragment;
	return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}
function assertValidHttpProtocolURL(url, config) {
	if (typeof url === "string") {
		const normalizedURL = normalizeURLForProtocolCheck(url);
		if (malformedHttpProtocol.test(normalizedURL)) throw new AxiosError$1(`Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`, AxiosError$1.ERR_INVALID_URL, config);
	}
}
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
	assertValidHttpProtocolURL(requestedURL, config);
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
		assertValidHttpProtocolURL(baseURL, config);
		return combineURLs(baseURL, requestedURL);
	}
	return requestedURL;
}
//#endregion
//#region node_modules/proxy-from-env/index.js
var DEFAULT_PORTS$1 = {
	ftp: 21,
	gopher: 70,
	http: 80,
	https: 443,
	ws: 80,
	wss: 443
};
function parseUrl(urlString) {
	try {
		return new URL(urlString);
	} catch {
		return null;
	}
}
/**
* @param {string|object|URL} url - The URL as a string or URL instance, or a
*   compatible object (such as the result from legacy url.parse).
* @return {string} The URL of the proxy that should handle the request to the
*  given URL. If no proxy is set, this will be an empty string.
*/
function getProxyForUrl(url) {
	var parsedUrl = (typeof url === "string" ? parseUrl(url) : url) || {};
	var proto = parsedUrl.protocol;
	var hostname = parsedUrl.host;
	var port = parsedUrl.port;
	if (typeof hostname !== "string" || !hostname || typeof proto !== "string") return "";
	proto = proto.split(":", 1)[0];
	hostname = hostname.replace(/:\d*$/, "");
	port = parseInt(port) || DEFAULT_PORTS$1[proto] || 0;
	if (!shouldProxy(hostname, port)) return "";
	var proxy = getEnv(proto + "_proxy") || getEnv("all_proxy");
	if (proxy && proxy.indexOf("://") === -1) proxy = proto + "://" + proxy;
	return proxy;
}
/**
* Determines whether a given URL should be proxied.
*
* @param {string} hostname - The host name of the URL.
* @param {number} port - The effective port of the URL.
* @returns {boolean} Whether the given URL should be proxied.
* @private
*/
function shouldProxy(hostname, port) {
	var NO_PROXY = getEnv("no_proxy").toLowerCase();
	if (!NO_PROXY) return true;
	if (NO_PROXY === "*") return false;
	return NO_PROXY.split(/[,\s]/).every(function(proxy) {
		if (!proxy) return true;
		var parsedProxy = proxy.match(/^(.+):(\d+)$/);
		var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
		var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
		if (parsedProxyPort && parsedProxyPort !== port) return true;
		if (!/^[.*]/.test(parsedProxyHostname)) return hostname !== parsedProxyHostname;
		if (parsedProxyHostname.charAt(0) === "*") parsedProxyHostname = parsedProxyHostname.slice(1);
		return !hostname.endsWith(parsedProxyHostname);
	});
}
/**
* Get the value for an environment variable.
*
* @param {string} key - The name of the environment variable.
* @return {string} The value of the environment variable.
* @private
*/
function getEnv(key) {
	return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}
//#endregion
//#region node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
//#endregion
//#region node_modules/debug/src/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		/**
		* The currently active debug mode names, and names to skip.
		*/
		createDebug.names = [];
		createDebug.skips = [];
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
				if (template[templateIndex] === "*") {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++;
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
//#endregion
//#region node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*/
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	/**
	* Colors.
	*/
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
//#endregion
//#region node_modules/debug/src/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty = __require("tty");
	var util$1 = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*/
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util$1.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = __require("supports-color");
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		const { namespace: name, useColors } = this;
		if (useColors) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	/**
	* Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
	*/
	function log(...args) {
		return process.stderr.write(util$1.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	/**
	* Map %O to `util.inspect()`, allowing multiple lines if needed.
	*/
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts);
	};
}));
//#endregion
//#region node_modules/debug/src/index.js
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer / nwjs process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
//#endregion
//#region node_modules/agent-base/dist/src/promisify.js
var require_promisify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function promisify(fn) {
		return function(req, opts) {
			return new Promise((resolve, reject) => {
				fn.call(this, req, opts, (err, rtn) => {
					if (err) reject(err);
					else resolve(rtn);
				});
			});
		};
	}
	exports.default = promisify;
}));
//#endregion
//#region node_modules/agent-base/dist/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var events_1 = __require("events");
	var debug_1 = __importDefault(require_src$1());
	var promisify_1 = __importDefault(require_promisify());
	var debug = debug_1.default("agent-base");
	function isAgent(v) {
		return Boolean(v) && typeof v.addRequest === "function";
	}
	function isSecureEndpoint() {
		const { stack } = /* @__PURE__ */ new Error();
		if (typeof stack !== "string") return false;
		return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
	}
	function createAgent(callback, opts) {
		return new createAgent.Agent(callback, opts);
	}
	(function(createAgent) {
		/**
		* Base `http.Agent` implementation.
		* No pooling/keep-alive is implemented by default.
		*
		* @param {Function} callback
		* @api public
		*/
		class Agent extends events_1.EventEmitter {
			constructor(callback, _opts) {
				super();
				let opts = _opts;
				if (typeof callback === "function") this.callback = callback;
				else if (callback) opts = callback;
				this.timeout = null;
				if (opts && typeof opts.timeout === "number") this.timeout = opts.timeout;
				this.maxFreeSockets = 1;
				this.maxSockets = 1;
				this.maxTotalSockets = Infinity;
				this.sockets = {};
				this.freeSockets = {};
				this.requests = {};
				this.options = {};
			}
			get defaultPort() {
				if (typeof this.explicitDefaultPort === "number") return this.explicitDefaultPort;
				return isSecureEndpoint() ? 443 : 80;
			}
			set defaultPort(v) {
				this.explicitDefaultPort = v;
			}
			get protocol() {
				if (typeof this.explicitProtocol === "string") return this.explicitProtocol;
				return isSecureEndpoint() ? "https:" : "http:";
			}
			set protocol(v) {
				this.explicitProtocol = v;
			}
			callback(req, opts, fn) {
				throw new Error("\"agent-base\" has no default implementation, you must subclass and override `callback()`");
			}
			/**
			* Called by node-core's "_http_client.js" module when creating
			* a new HTTP request with this Agent instance.
			*
			* @api public
			*/
			addRequest(req, _opts) {
				const opts = Object.assign({}, _opts);
				if (typeof opts.secureEndpoint !== "boolean") opts.secureEndpoint = isSecureEndpoint();
				if (opts.host == null) opts.host = "localhost";
				if (opts.port == null) opts.port = opts.secureEndpoint ? 443 : 80;
				if (opts.protocol == null) opts.protocol = opts.secureEndpoint ? "https:" : "http:";
				if (opts.host && opts.path) delete opts.path;
				delete opts.agent;
				delete opts.hostname;
				delete opts._defaultAgent;
				delete opts.defaultPort;
				delete opts.createConnection;
				req._last = true;
				req.shouldKeepAlive = false;
				let timedOut = false;
				let timeoutId = null;
				const timeoutMs = opts.timeout || this.timeout;
				const onerror = (err) => {
					if (req._hadError) return;
					req.emit("error", err);
					req._hadError = true;
				};
				const ontimeout = () => {
					timeoutId = null;
					timedOut = true;
					const err = /* @__PURE__ */ new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
					err.code = "ETIMEOUT";
					onerror(err);
				};
				const callbackError = (err) => {
					if (timedOut) return;
					if (timeoutId !== null) {
						clearTimeout(timeoutId);
						timeoutId = null;
					}
					onerror(err);
				};
				const onsocket = (socket) => {
					if (timedOut) return;
					if (timeoutId != null) {
						clearTimeout(timeoutId);
						timeoutId = null;
					}
					if (isAgent(socket)) {
						debug("Callback returned another Agent instance %o", socket.constructor.name);
						socket.addRequest(req, opts);
						return;
					}
					if (socket) {
						socket.once("free", () => {
							this.freeSocket(socket, opts);
						});
						req.onSocket(socket);
						return;
					}
					const err = /* @__PURE__ */ new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
					onerror(err);
				};
				if (typeof this.callback !== "function") {
					onerror(/* @__PURE__ */ new Error("`callback` is not defined"));
					return;
				}
				if (!this.promisifiedCallback) {
					if (this.callback.length >= 3) {
						debug("Converting legacy callback function to promise");
						this.promisifiedCallback = promisify_1.default(this.callback);
					} else this.promisifiedCallback = this.callback;
				}
				if (typeof timeoutMs === "number" && timeoutMs > 0) timeoutId = setTimeout(ontimeout, timeoutMs);
				if ("port" in opts && typeof opts.port !== "number") opts.port = Number(opts.port);
				try {
					debug("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
					Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
				} catch (err) {
					Promise.reject(err).catch(callbackError);
				}
			}
			freeSocket(socket, opts) {
				debug("Freeing socket %o %o", socket.constructor.name, opts);
				socket.destroy();
			}
			destroy() {
				debug("Destroying agent %o", this.constructor.name);
			}
		}
		createAgent.Agent = Agent;
		createAgent.prototype = createAgent.Agent.prototype;
	})(createAgent || (createAgent = {}));
	module.exports = createAgent;
}));
//#endregion
//#region node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var debug = __importDefault(require_src$1()).default("https-proxy-agent:parse-proxy-response");
	function parseProxyResponse(socket) {
		return new Promise((resolve, reject) => {
			let buffersLength = 0;
			const buffers = [];
			function read() {
				const b = socket.read();
				if (b) ondata(b);
				else socket.once("readable", read);
			}
			function cleanup() {
				socket.removeListener("end", onend);
				socket.removeListener("error", onerror);
				socket.removeListener("close", onclose);
				socket.removeListener("readable", read);
			}
			function onclose(err) {
				debug("onclose had error %o", err);
			}
			function onend() {
				debug("onend");
			}
			function onerror(err) {
				cleanup();
				debug("onerror %o", err);
				reject(err);
			}
			function ondata(b) {
				buffers.push(b);
				buffersLength += b.length;
				const buffered = Buffer.concat(buffers, buffersLength);
				if (buffered.indexOf("\r\n\r\n") === -1) {
					debug("have not received end of HTTP headers yet...");
					read();
					return;
				}
				const firstLine = buffered.toString("ascii", 0, buffered.indexOf("\r\n"));
				const statusCode = +firstLine.split(" ")[1];
				debug("got proxy server response: %o", firstLine);
				resolve({
					statusCode,
					buffered
				});
			}
			socket.on("error", onerror);
			socket.on("close", onclose);
			socket.on("end", onend);
			read();
		});
	}
	exports.default = parseProxyResponse;
}));
//#endregion
//#region node_modules/https-proxy-agent/dist/agent.js
var require_agent = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var net_1 = __importDefault(__require("net"));
	var tls_1 = __importDefault(__require("tls"));
	var url_1 = __importDefault(__require("url"));
	var assert_1 = __importDefault(__require("assert"));
	var debug_1 = __importDefault(require_src$1());
	var agent_base_1 = require_src();
	var parse_proxy_response_1 = __importDefault(require_parse_proxy_response());
	var debug = debug_1.default("https-proxy-agent:agent");
	/**
	* The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
	* the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
	*
	* Outgoing HTTP requests are first tunneled through the proxy server using the
	* `CONNECT` HTTP request method to establish a connection to the proxy server,
	* and then the proxy server connects to the destination target and issues the
	* HTTP request from the proxy server.
	*
	* `https:` requests have their socket connection upgraded to TLS once
	* the connection to the proxy server has been established.
	*
	* @api public
	*/
	var HttpsProxyAgent = class extends agent_base_1.Agent {
		constructor(_opts) {
			let opts;
			if (typeof _opts === "string") opts = url_1.default.parse(_opts);
			else opts = _opts;
			if (!opts) throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
			debug("creating new HttpsProxyAgent instance: %o", opts);
			super(opts);
			const proxy = Object.assign({}, opts);
			this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
			proxy.host = proxy.hostname || proxy.host;
			if (typeof proxy.port === "string") proxy.port = parseInt(proxy.port, 10);
			if (!proxy.port && proxy.host) proxy.port = this.secureProxy ? 443 : 80;
			if (this.secureProxy && !("ALPNProtocols" in proxy)) proxy.ALPNProtocols = ["http 1.1"];
			if (proxy.host && proxy.path) {
				delete proxy.path;
				delete proxy.pathname;
			}
			this.proxy = proxy;
		}
		/**
		* Called when the node-core HTTP client library is creating a
		* new HTTP request.
		*
		* @api protected
		*/
		callback(req, opts) {
			return __awaiter(this, void 0, void 0, function* () {
				const { proxy, secureProxy } = this;
				let socket;
				if (secureProxy) {
					debug("Creating `tls.Socket`: %o", proxy);
					socket = tls_1.default.connect(proxy);
				} else {
					debug("Creating `net.Socket`: %o", proxy);
					socket = net_1.default.connect(proxy);
				}
				const headers = Object.assign({}, proxy.headers);
				let payload = `CONNECT ${`${opts.host}:${opts.port}`} HTTP/1.1\r\n`;
				if (proxy.auth) headers["Proxy-Authorization"] = `Basic ${Buffer.from(proxy.auth).toString("base64")}`;
				let { host, port, secureEndpoint } = opts;
				if (!isDefaultPort(port, secureEndpoint)) host += `:${port}`;
				headers.Host = host;
				headers.Connection = "close";
				for (const name of Object.keys(headers)) payload += `${name}: ${headers[name]}\r\n`;
				const proxyResponsePromise = parse_proxy_response_1.default(socket);
				socket.write(`${payload}\r\n`);
				const { statusCode, buffered } = yield proxyResponsePromise;
				if (statusCode === 200) {
					req.once("socket", resume);
					if (opts.secureEndpoint) {
						debug("Upgrading socket connection to TLS");
						const servername = opts.servername || opts.host;
						return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, "host", "hostname", "path", "port")), {
							socket,
							servername
						}));
					}
					return socket;
				}
				socket.destroy();
				const fakeSocket = new net_1.default.Socket({ writable: false });
				fakeSocket.readable = true;
				req.once("socket", (s) => {
					debug("replaying proxy buffer for failed request");
					assert_1.default(s.listenerCount("data") > 0);
					s.push(buffered);
					s.push(null);
				});
				return fakeSocket;
			});
		}
	};
	exports.default = HttpsProxyAgent;
	function resume(socket) {
		socket.resume();
	}
	function isDefaultPort(port, secure) {
		return Boolean(!secure && port === 80 || secure && port === 443);
	}
	function isHTTPS(protocol) {
		return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
	}
	function omit(obj, ...keys) {
		const ret = {};
		let key;
		for (key in obj) if (!keys.includes(key)) ret[key] = obj[key];
		return ret;
	}
}));
//#endregion
//#region node_modules/https-proxy-agent/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var agent_1 = (exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_agent());
	function createHttpsProxyAgent(opts) {
		return new agent_1.default(opts);
	}
	(function(createHttpsProxyAgent) {
		createHttpsProxyAgent.HttpsProxyAgent = agent_1.default;
		createHttpsProxyAgent.prototype = agent_1.default.prototype;
	})(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
	module.exports = createHttpsProxyAgent;
}));
//#endregion
//#region node_modules/follow-redirects/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var debug;
	module.exports = function() {
		if (!debug) {
			try {
				debug = require_src$1()("follow-redirects");
			} catch (error) {}
			if (typeof debug !== "function") debug = function() {};
		}
		debug.apply(null, arguments);
	};
}));
//#endregion
//#region node_modules/follow-redirects/index.js
var require_follow_redirects = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var url$1 = __require("url");
	var URL = url$1.URL;
	var http$1 = __require("http");
	var https$1 = __require("https");
	var Writable = __require("stream").Writable;
	var assert = __require("assert");
	var debug = require_debug();
	// istanbul ignore next
	(function detectUnsupportedEnvironment() {
		var looksLikeNode = typeof process !== "undefined";
		var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
		var looksLikeV8 = isFunction(Error.captureStackTrace);
		if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) console.warn("The follow-redirects package should be excluded from browser builds.");
	})();
	var useNativeURL = false;
	try {
		assert(new URL(""));
	} catch (error) {
		useNativeURL = error.code === "ERR_INVALID_URL";
	}
	var sensitiveHeaders = [
		"Authorization",
		"Proxy-Authorization",
		"Cookie"
	];
	var preservedUrlFields = [
		"auth",
		"host",
		"hostname",
		"href",
		"path",
		"pathname",
		"port",
		"protocol",
		"query",
		"search",
		"hash"
	];
	var events = [
		"abort",
		"aborted",
		"connect",
		"error",
		"socket",
		"timeout"
	];
	var eventHandlers = Object.create(null);
	events.forEach(function(event) {
		eventHandlers[event] = function(arg1, arg2, arg3) {
			this._redirectable.emit(event, arg1, arg2, arg3);
		};
	});
	var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
	var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
	var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", RedirectionError);
	var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
	var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
	// istanbul ignore next
	var destroy = Writable.prototype.destroy || noop;
	function RedirectableRequest(options, responseCallback) {
		Writable.call(this);
		this._sanitizeOptions(options);
		this._options = options;
		this._ended = false;
		this._ending = false;
		this._redirectCount = 0;
		this._redirects = [];
		this._requestBodyLength = 0;
		this._requestBodyBuffers = [];
		if (responseCallback) this.on("response", responseCallback);
		var self = this;
		this._onNativeResponse = function(response) {
			try {
				self._processResponse(response);
			} catch (cause) {
				self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
			}
		};
		this._headerFilter = new RegExp("^(?:" + sensitiveHeaders.concat(options.sensitiveHeaders).map(escapeRegex).join("|") + ")$", "i");
		this._performRequest();
	}
	RedirectableRequest.prototype = Object.create(Writable.prototype);
	RedirectableRequest.prototype.abort = function() {
		destroyRequest(this._currentRequest);
		this._currentRequest.abort();
		this.emit("abort");
	};
	RedirectableRequest.prototype.destroy = function(error) {
		destroyRequest(this._currentRequest, error);
		destroy.call(this, error);
		return this;
	};
	RedirectableRequest.prototype.write = function(data, encoding, callback) {
		if (this._ending) throw new WriteAfterEndError();
		if (!isString(data) && !isBuffer(data)) throw new TypeError("data should be a string, Buffer or Uint8Array");
		if (isFunction(encoding)) {
			callback = encoding;
			encoding = null;
		}
		if (data.length === 0) {
			if (callback) callback();
			return;
		}
		if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
			this._requestBodyLength += data.length;
			this._requestBodyBuffers.push({
				data,
				encoding
			});
			this._currentRequest.write(data, encoding, callback);
		} else {
			this.emit("error", new MaxBodyLengthExceededError());
			this.abort();
		}
	};
	RedirectableRequest.prototype.end = function(data, encoding, callback) {
		if (isFunction(data)) {
			callback = data;
			data = encoding = null;
		} else if (isFunction(encoding)) {
			callback = encoding;
			encoding = null;
		}
		if (!data) {
			this._ended = this._ending = true;
			this._currentRequest.end(null, null, callback);
		} else {
			var self = this;
			var currentRequest = this._currentRequest;
			this.write(data, encoding, function() {
				self._ended = true;
				currentRequest.end(null, null, callback);
			});
			this._ending = true;
		}
	};
	RedirectableRequest.prototype.setHeader = function(name, value) {
		this._options.headers[name] = value;
		this._currentRequest.setHeader(name, value);
	};
	RedirectableRequest.prototype.removeHeader = function(name) {
		delete this._options.headers[name];
		this._currentRequest.removeHeader(name);
	};
	RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
		var self = this;
		function destroyOnTimeout(socket) {
			socket.setTimeout(msecs);
			socket.removeListener("timeout", socket.destroy);
			socket.addListener("timeout", socket.destroy);
		}
		function startTimer(socket) {
			if (self._timeout) clearTimeout(self._timeout);
			self._timeout = setTimeout(function() {
				self.emit("timeout");
				clearTimer();
			}, msecs);
			destroyOnTimeout(socket);
		}
		function clearTimer() {
			if (self._timeout) {
				clearTimeout(self._timeout);
				self._timeout = null;
			}
			self.removeListener("abort", clearTimer);
			self.removeListener("error", clearTimer);
			self.removeListener("response", clearTimer);
			self.removeListener("close", clearTimer);
			if (callback) self.removeListener("timeout", callback);
			if (!self.socket) self._currentRequest.removeListener("socket", startTimer);
		}
		if (callback) this.on("timeout", callback);
		if (this.socket) startTimer(this.socket);
		else this._currentRequest.once("socket", startTimer);
		this.on("socket", destroyOnTimeout);
		this.on("abort", clearTimer);
		this.on("error", clearTimer);
		this.on("response", clearTimer);
		this.on("close", clearTimer);
		return this;
	};
	[
		"flushHeaders",
		"getHeader",
		"setNoDelay",
		"setSocketKeepAlive"
	].forEach(function(method) {
		RedirectableRequest.prototype[method] = function(a, b) {
			return this._currentRequest[method](a, b);
		};
	});
	[
		"aborted",
		"connection",
		"socket"
	].forEach(function(property) {
		Object.defineProperty(RedirectableRequest.prototype, property, { get: function() {
			return this._currentRequest[property];
		} });
	});
	RedirectableRequest.prototype._sanitizeOptions = function(options) {
		if (!options.headers) options.headers = {};
		if (!isArray(options.sensitiveHeaders)) options.sensitiveHeaders = [];
		if (options.host) {
			if (!options.hostname) options.hostname = options.host;
			delete options.host;
		}
		if (!options.pathname && options.path) {
			var searchPos = options.path.indexOf("?");
			if (searchPos < 0) options.pathname = options.path;
			else {
				options.pathname = options.path.substring(0, searchPos);
				options.search = options.path.substring(searchPos);
			}
		}
	};
	RedirectableRequest.prototype._performRequest = function() {
		var protocol = this._options.protocol;
		var nativeProtocol = this._options.nativeProtocols[protocol];
		if (!nativeProtocol) throw new TypeError("Unsupported protocol " + protocol);
		if (this._options.agents) {
			var scheme = protocol.slice(0, -1);
			this._options.agent = this._options.agents[scheme];
		}
		var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
		request._redirectable = this;
		for (var event of events) request.on(event, eventHandlers[event]);
		this._currentUrl = /^\//.test(this._options.path) ? url$1.format(this._options) : this._options.path;
		if (this._isRedirect) {
			var i = 0;
			var self = this;
			var buffers = this._requestBodyBuffers;
			(function writeNext(error) {
				// istanbul ignore else
				if (request === self._currentRequest) {
					// istanbul ignore if
					if (error) self.emit("error", error);
					else if (i < buffers.length) {
						var buffer = buffers[i++];
						// istanbul ignore else
						if (!request.finished) request.write(buffer.data, buffer.encoding, writeNext);
					} else if (self._ended) request.end();
				}
			})();
		}
	};
	RedirectableRequest.prototype._processResponse = function(response) {
		var statusCode = response.statusCode;
		if (this._options.trackRedirects) this._redirects.push({
			url: this._currentUrl,
			headers: response.headers,
			statusCode
		});
		var location = response.headers.location;
		if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
			response.responseUrl = this._currentUrl;
			response.redirects = this._redirects;
			this.emit("response", response);
			this._requestBodyBuffers = [];
			return;
		}
		destroyRequest(this._currentRequest);
		response.destroy();
		if (++this._redirectCount > this._options.maxRedirects) throw new TooManyRedirectsError();
		var requestHeaders;
		var beforeRedirect = this._options.beforeRedirect;
		if (beforeRedirect) requestHeaders = Object.assign({ Host: response.req.getHeader("host") }, this._options.headers);
		var method = this._options.method;
		if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
			this._options.method = "GET";
			this._requestBodyBuffers = [];
			removeMatchingHeaders(/^content-/i, this._options.headers);
		}
		var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
		var currentUrlParts = parseUrl(this._currentUrl);
		var currentHost = currentHostHeader || currentUrlParts.host;
		var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url$1.format(Object.assign(currentUrlParts, { host: currentHost }));
		var redirectUrl = resolveUrl(location, currentUrl);
		debug("redirecting to", redirectUrl.href);
		this._isRedirect = true;
		spreadUrlObject(redirectUrl, this._options);
		if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) removeMatchingHeaders(this._headerFilter, this._options.headers);
		if (isFunction(beforeRedirect)) {
			var responseDetails = {
				headers: response.headers,
				statusCode
			};
			var requestDetails = {
				url: currentUrl,
				method,
				headers: requestHeaders
			};
			beforeRedirect(this._options, responseDetails, requestDetails);
			this._sanitizeOptions(this._options);
		}
		this._performRequest();
	};
	function wrap(protocols) {
		var exports$1 = {
			maxRedirects: 21,
			maxBodyLength: 10485760
		};
		var nativeProtocols = {};
		Object.keys(protocols).forEach(function(scheme) {
			var protocol = scheme + ":";
			var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
			var wrappedProtocol = exports$1[scheme] = Object.create(nativeProtocol);
			function request(input, options, callback) {
				if (isURL(input)) input = spreadUrlObject(input);
				else if (isString(input)) input = spreadUrlObject(parseUrl(input));
				else {
					callback = options;
					options = validateUrl(input);
					input = { protocol };
				}
				if (isFunction(options)) {
					callback = options;
					options = null;
				}
				options = Object.assign({
					maxRedirects: exports$1.maxRedirects,
					maxBodyLength: exports$1.maxBodyLength
				}, input, options);
				options.nativeProtocols = nativeProtocols;
				if (!isString(options.host) && !isString(options.hostname)) options.hostname = "::1";
				assert.equal(options.protocol, protocol, "protocol mismatch");
				debug("options", options);
				return new RedirectableRequest(options, callback);
			}
			function get(input, options, callback) {
				var wrappedRequest = wrappedProtocol.request(input, options, callback);
				wrappedRequest.end();
				return wrappedRequest;
			}
			Object.defineProperties(wrappedProtocol, {
				request: {
					value: request,
					configurable: true,
					enumerable: true,
					writable: true
				},
				get: {
					value: get,
					configurable: true,
					enumerable: true,
					writable: true
				}
			});
		});
		return exports$1;
	}
	function noop() {}
	function parseUrl(input) {
		var parsed;
		// istanbul ignore else
		if (useNativeURL) parsed = new URL(input);
		else {
			parsed = validateUrl(url$1.parse(input));
			if (!isString(parsed.protocol)) throw new InvalidUrlError({ input });
		}
		return parsed;
	}
	function resolveUrl(relative, base) {
		// istanbul ignore next
		return useNativeURL ? new URL(relative, base) : parseUrl(url$1.resolve(base, relative));
	}
	function validateUrl(input) {
		if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) throw new InvalidUrlError({ input: input.href || input });
		if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) throw new InvalidUrlError({ input: input.href || input });
		return input;
	}
	function spreadUrlObject(urlObject, target) {
		var spread = target || {};
		for (var key of preservedUrlFields) spread[key] = urlObject[key];
		if (spread.hostname.startsWith("[")) spread.hostname = spread.hostname.slice(1, -1);
		if (spread.port !== "") spread.port = Number(spread.port);
		spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
		return spread;
	}
	function removeMatchingHeaders(regex, headers) {
		var lastValue;
		for (var header in headers) if (regex.test(header)) {
			lastValue = headers[header];
			delete headers[header];
		}
		return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
	}
	function createErrorType(code, message, baseClass) {
		function CustomError(properties) {
			// istanbul ignore else
			if (isFunction(Error.captureStackTrace)) Error.captureStackTrace(this, this.constructor);
			Object.assign(this, properties || {});
			this.code = code;
			this.message = this.cause ? message + ": " + this.cause.message : message;
		}
		CustomError.prototype = new (baseClass || Error)();
		Object.defineProperties(CustomError.prototype, {
			constructor: {
				value: CustomError,
				enumerable: false
			},
			name: {
				value: "Error [" + code + "]",
				enumerable: false
			}
		});
		return CustomError;
	}
	function destroyRequest(request, error) {
		for (var event of events) request.removeListener(event, eventHandlers[event]);
		request.on("error", noop);
		request.destroy(error);
	}
	function isSubdomain(subdomain, domain) {
		assert(isString(subdomain) && isString(domain));
		var dot = subdomain.length - domain.length - 1;
		return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
	}
	function isArray(value) {
		return value instanceof Array;
	}
	function isString(value) {
		return typeof value === "string" || value instanceof String;
	}
	function isFunction(value) {
		return typeof value === "function";
	}
	function isBuffer(value) {
		return typeof value === "object" && "length" in value;
	}
	function isURL(value) {
		return URL && value instanceof URL;
	}
	function escapeRegex(regex) {
		return regex.replace(/[\]\\/()*+?.$]/g, "\\$&");
	}
	module.exports = wrap({
		http: http$1,
		https: https$1
	});
	module.exports.wrap = wrap;
}));
//#endregion
//#region node_modules/axios/lib/env/data.js
var import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
var import_follow_redirects = /* @__PURE__ */ __toESM(require_follow_redirects(), 1);
var VERSION$1 = "1.19.0";
//#endregion
//#region node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
//#endregion
//#region node_modules/axios/lib/helpers/fromDataURI.js
var DATA_URL_PATTERN = /^([^,;]+\/[^,;]+)?((?:;[^,;=]+=[^,;]+)*)(;base64)?,([\s\S]*)$/;
/**
* Parse data uri to a Buffer or Blob
*
* @param {String} uri
* @param {?Boolean} asBlob
* @param {?Object} options
* @param {?Function} options.Blob
*
* @returns {Buffer|Blob}
*/
function fromDataURI(uri, asBlob, options) {
	const _Blob = options && options.Blob || platform_default.classes.Blob;
	const protocol = parseProtocol(uri);
	if (asBlob === void 0 && _Blob) asBlob = true;
	if (protocol === "data") {
		uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
		const match = DATA_URL_PATTERN.exec(uri);
		if (!match) throw new AxiosError$1("Invalid URL", AxiosError$1.ERR_INVALID_URL);
		const type = match[1];
		const params = match[2];
		const encoding = match[3] ? "base64" : "utf8";
		const body = match[4];
		let mime = "";
		if (type) mime = params ? type + params : type;
		else if (params) mime = "text/plain" + params;
		const buffer = encoding === "base64" ? Buffer.from(body, "base64") : Buffer.from(decodeURIComponent(body), encoding);
		if (asBlob) {
			if (!_Blob) throw new AxiosError$1("Blob is not supported", AxiosError$1.ERR_NOT_SUPPORT);
			return new _Blob([buffer], { type: mime });
		}
		return buffer;
	}
	throw new AxiosError$1("Unsupported protocol " + protocol, AxiosError$1.ERR_NOT_SUPPORT);
}
//#endregion
//#region node_modules/axios/lib/core/setFormDataHeaders.js
var FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
/**
* Apply the headers generated by a FormData implementation to the request headers,
* honoring the `formDataHeaderPolicy` option: with 'content-only', copy only the
* content-* headers; otherwise merge all of them.
*
* @param {AxiosHeaders} headers - the request headers to mutate
* @param {Object | null | undefined} formHeaders - headers produced by the FormData implementation
* @param {String} [policy] - the resolved `formDataHeaderPolicy` config value
*
* @returns {void}
*/
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders || {}).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosTransformStream.js
var kInternals = Symbol("internals");
var AxiosTransformStream = class extends stream.Transform {
	constructor(options) {
		options = utils_default.toFlatObject(options, {
			maxRate: 0,
			chunkSize: 65536,
			minChunkSize: 100,
			timeWindow: 500,
			ticksRate: 2,
			samplesCount: 15
		}, null, (prop, source) => {
			return !utils_default.isUndefined(source[prop]);
		});
		super({ readableHighWaterMark: options.chunkSize });
		const internals = this[kInternals] = {
			timeWindow: options.timeWindow,
			chunkSize: options.chunkSize,
			maxRate: options.maxRate,
			minChunkSize: options.minChunkSize,
			bytesSeen: 0,
			isCaptured: false,
			notifiedBytesLoaded: 0,
			ts: Date.now(),
			bytes: 0,
			onReadCallback: null
		};
		this.on("newListener", (event) => {
			if (event === "progress") {
				if (!internals.isCaptured) internals.isCaptured = true;
			}
		});
	}
	_read(size) {
		const internals = this[kInternals];
		if (internals.onReadCallback) internals.onReadCallback();
		return super._read(size);
	}
	_transform(chunk, encoding, callback) {
		const internals = this[kInternals];
		const maxRate = internals.maxRate;
		const readableHighWaterMark = this.readableHighWaterMark;
		const timeWindow = internals.timeWindow;
		const bytesThreshold = maxRate / (1e3 / timeWindow);
		const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * .01) : 0;
		const pushChunk = (_chunk, _callback) => {
			const bytes = Buffer.byteLength(_chunk);
			internals.bytesSeen += bytes;
			internals.bytes += bytes;
			internals.isCaptured && this.emit("progress", internals.bytesSeen);
			if (this.push(_chunk)) process.nextTick(_callback);
			else internals.onReadCallback = () => {
				internals.onReadCallback = null;
				process.nextTick(_callback);
			};
		};
		const transformChunk = (_chunk, _callback) => {
			const chunkSize = Buffer.byteLength(_chunk);
			let chunkRemainder = null;
			let maxChunkSize = readableHighWaterMark;
			let bytesLeft;
			let passed = 0;
			if (maxRate) {
				const now = Date.now();
				if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
					internals.ts = now;
					bytesLeft = bytesThreshold - internals.bytes;
					internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
					passed = 0;
				}
				bytesLeft = bytesThreshold - internals.bytes;
			}
			if (maxRate) {
				if (bytesLeft <= 0) return setTimeout(() => {
					_callback(null, _chunk);
				}, timeWindow - passed);
				if (bytesLeft < maxChunkSize) maxChunkSize = bytesLeft;
			}
			if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
				chunkRemainder = _chunk.subarray(maxChunkSize);
				_chunk = _chunk.subarray(0, maxChunkSize);
			}
			pushChunk(_chunk, chunkRemainder ? () => {
				process.nextTick(_callback, null, chunkRemainder);
			} : _callback);
		};
		transformChunk(chunk, function transformNextChunk(err, _chunk) {
			if (err) return callback(err);
			if (_chunk) transformChunk(_chunk, transformNextChunk);
			else callback(null);
		});
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/readBlob.js
var { asyncIterator } = Symbol;
var readBlob = async function* (blob) {
	if (blob.stream) yield* blob.stream();
	else if (blob.arrayBuffer) yield await blob.arrayBuffer();
	else if (blob[asyncIterator]) yield* blob[asyncIterator]();
	else yield blob;
};
//#endregion
//#region node_modules/axios/lib/helpers/formDataToStream.js
var BOUNDARY_ALPHABET = platform_default.ALPHABET.ALPHA_DIGIT + "-_";
var textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new util.TextEncoder();
var CRLF = "\r\n";
var CRLF_BYTES = textEncoder.encode(CRLF);
var CRLF_BYTES_COUNT = 2;
var FormDataPart = class {
	constructor(name, value) {
		const { escapeName } = this.constructor;
		const isStringValue = utils_default.isString(value);
		let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
		if (isStringValue) value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
		else {
			const safeType = String(value.type || "application/octet-stream").replace(/[\r\n]/g, "");
			headers += `Content-Type: ${safeType}${CRLF}`;
		}
		this.headers = textEncoder.encode(headers + CRLF);
		this.contentLength = isStringValue ? value.byteLength : value.size;
		this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
		this.name = name;
		this.value = value;
	}
	async *encode() {
		yield this.headers;
		const { value } = this;
		if (utils_default.isTypedArray(value)) yield value;
		else yield* readBlob(value);
		yield CRLF_BYTES;
	}
	static escapeName(name) {
		return String(name).replace(/[\r\n"]/g, (match) => ({
			"\r": "%0D",
			"\n": "%0A",
			"\"": "%22"
		})[match]);
	}
};
var formDataToStream = (form, headersHandler, options) => {
	const { tag = "form-data-boundary", size = 25, boundary = tag + "-" + platform_default.generateString(size, BOUNDARY_ALPHABET) } = options || {};
	if (!utils_default.isFormData(form)) throw new TypeError("FormData instance required");
	if (boundary.length < 1 || boundary.length > 70) throw new Error("boundary must be 1-70 characters long");
	const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
	const footerBytes = textEncoder.encode("--" + boundary + "--\r\n");
	let contentLength = footerBytes.byteLength;
	const parts = Array.from(form.entries()).map(([name, value]) => {
		const part = new FormDataPart(name, value);
		contentLength += part.size;
		return part;
	});
	contentLength += boundaryBytes.byteLength * parts.length;
	contentLength = utils_default.toFiniteNumber(contentLength);
	const computedHeaders = { "Content-Type": `multipart/form-data; boundary=${boundary}` };
	if (Number.isFinite(contentLength)) computedHeaders["Content-Length"] = contentLength;
	headersHandler && headersHandler(computedHeaders);
	return Readable.from((async function* () {
		for (const part of parts) {
			yield boundaryBytes;
			yield* part.encode();
		}
		yield footerBytes;
	})());
};
//#endregion
//#region node_modules/axios/lib/helpers/ZlibHeaderTransformStream.js
var ZlibHeaderTransformStream = class extends stream.Transform {
	__transform(chunk, encoding, callback) {
		this.push(chunk);
		callback();
	}
	_transform(chunk, encoding, callback) {
		if (chunk.length !== 0) {
			this._transform = this.__transform;
			if (chunk[0] !== 120) {
				const header = Buffer.alloc(2);
				header[0] = 120;
				header[1] = 156;
				this.push(header, encoding);
			}
		}
		this.__transform(chunk, encoding, callback);
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/Http2Sessions.js
var Http2Sessions = class {
	constructor() {
		this.sessions = Object.create(null);
	}
	getSession(authority, options) {
		options = Object.assign({ sessionTimeout: 1e3 }, options);
		let authoritySessions = this.sessions[authority];
		if (authoritySessions) {
			let len = authoritySessions.length;
			for (let i = 0; i < len; i++) {
				const [sessionHandle, sessionOptions] = authoritySessions[i];
				if (!sessionHandle.destroyed && !sessionHandle.closed && util.isDeepStrictEqual(sessionOptions, options)) return sessionHandle;
			}
		}
		const session = http2.connect(authority, options);
		let removed;
		let timer;
		const removeSession = () => {
			if (removed) return;
			removed = true;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			let entries = authoritySessions, len = entries.length, i = len;
			while (i--) if (entries[i][0] === session) {
				if (len === 1) delete this.sessions[authority];
				else entries.splice(i, 1);
				if (!session.closed) session.close();
				return;
			}
		};
		const originalRequestFn = session.request;
		const { sessionTimeout } = options;
		if (sessionTimeout != null) {
			let streamsCount = 0;
			session.request = function() {
				const stream = originalRequestFn.apply(this, arguments);
				streamsCount++;
				if (timer) {
					clearTimeout(timer);
					timer = null;
				}
				stream.once("close", () => {
					if (!--streamsCount) timer = setTimeout(() => {
						timer = null;
						removeSession();
					}, sessionTimeout);
				});
				return stream;
			};
		}
		session.once("close", removeSession);
		let entry = [session, options];
		authoritySessions ? authoritySessions.push(entry) : authoritySessions = this.sessions[authority] = [entry];
		return session;
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/callbackify.js
var callbackify = (fn, reducer) => {
	return utils_default.isAsyncFn(fn) ? function(...args) {
		const cb = args.pop();
		fn.apply(this, args).then((value) => {
			try {
				reducer ? cb(null, ...reducer(value)) : cb(null, value);
			} catch (err) {
				cb(err);
			}
		}, cb);
	} : fn;
};
//#endregion
//#region node_modules/axios/lib/helpers/shouldBypassProxy.js
var LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set(["localhost", "0.0.0.0"]);
var isIPv4Loopback = (host) => {
	const parts = host.split(".");
	if (parts.length !== 4) return false;
	if (parts[0] !== "127") return false;
	return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
};
/**
* Canonicalize an IPv4 address written in shorthand, octal, or hex form into
* dotted-decimal. IPv6 addresses and non-IP strings are returned unchanged so
* the existing IPv4-mapped IPv6 unmap path and the isLoopback path can still
* see them.
*
* Shorthand expansion mirrors Node's URL parser: literal parts fill from the
* left, the final part fills the remaining octets from the right with
* zero-padding on the left.
*   127.1     -> 127.0.0.1
*   127.0.1   -> 127.0.0.1
*   1.2.3     -> 1.2.0.3
*
* Each octet is parsed with an explicit base: 16 for `0x`/`0X` prefix, 8 for
* zero-prefixed multi-digit all-`0-7` parts, 10 otherwise. Zero-prefixed
* decimal-looking parts that contain `8` or `9` are rejected to match Node's
* URL parser, and the comparison layer falls through to non-bypass if either
* side rejects the form (fail-safe).
*
* Returns the input unchanged on any parse failure, out-of-range octet, or
* unusual shape (1-part, 5+ parts) so the comparison layer fails closed.
*/
var parseIPv4Octet = (text) => {
	if (/^0[xX][0-9a-fA-F]+$/.test(text)) {
		const n = parseInt(text.slice(2), 16);
		return Number.isFinite(n) ? n : null;
	}
	if (text.length > 1 && /^0[0-7]+$/.test(text)) {
		const n = parseInt(text, 8);
		return Number.isFinite(n) ? n : null;
	}
	if (text.length > 1 && /^0[0-9]+$/.test(text)) return null;
	if (/^[0-9]+$/.test(text)) {
		const n = parseInt(text, 10);
		return Number.isFinite(n) ? n : null;
	}
	return null;
};
var normalizeIPAddress = (host) => {
	if (typeof host !== "string" || !host || host.indexOf(":") !== -1) return host;
	let h = host;
	if (h.charAt(0) === "[" && h.charAt(h.length - 1) === "]") h = h.slice(1, -1);
	h = h.replace(/\.+$/, "");
	if (!/^[0-9.xXa-fA-F]+$/.test(h)) return host;
	const parts = h.split(".");
	if (parts.some((p) => p === "")) return host;
	if (parts.length === 4) {
		const octets = parts.map(parseIPv4Octet);
		if (octets.some((n) => n === null || n < 0 || n > 255)) return host;
		return octets.join(".");
	}
	if (parts.length > 4) return host;
	if (parts.length === 1) return host;
	const literalOctets = parts.slice(0, -1);
	const tail = parts[parts.length - 1];
	const tailSlots = 4 - literalOctets.length;
	const tailValue = parseIPv4Octet(tail);
	if (tailValue === null) return host;
	const maxTail = (1 << 8 * tailSlots) - 1;
	if (tailValue < 0 || tailValue > maxTail) return host;
	const tailOctets = new Array(tailSlots).fill(0);
	for (let i = tailSlots - 1, v = tailValue; i >= 0; i--, v >>= 8) tailOctets[i] = v & 255;
	const literal = literalOctets.map(parseIPv4Octet);
	if (literal.some((n) => n === null || n < 0 || n > 255)) return host;
	return [...literal, ...tailOctets].join(".");
};
var isIPv6ZeroGroup = (group) => /^0{1,4}$/.test(group);
var isIPv6Unspecified = (host) => {
	if (host === "::") return true;
	const compressionIndex = host.indexOf("::");
	if (compressionIndex !== -1) {
		if (compressionIndex !== host.lastIndexOf("::")) return false;
		const left = host.slice(0, compressionIndex);
		const right = host.slice(compressionIndex + 2);
		const leftGroups = left ? left.split(":") : [];
		const rightGroups = right ? right.split(":") : [];
		return leftGroups.length + rightGroups.length < 8 && leftGroups.every(isIPv6ZeroGroup) && rightGroups.every(isIPv6ZeroGroup);
	}
	const groups = host.split(":");
	return groups.length === 8 && groups.every(isIPv6ZeroGroup);
};
var isIPv6Loopback = (host) => {
	if (host === "::1") return true;
	const v4MappedDotted = host.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (v4MappedDotted) return isIPv4Loopback(v4MappedDotted[1]);
	const v4MappedHex = host.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
	if (v4MappedHex) {
		const high = parseInt(v4MappedHex[1], 16);
		return high >= 32512 && high <= 32767;
	}
	const groups = host.split(":");
	if (groups.length === 8) {
		for (let i = 0; i < 7; i++) if (!/^0+$/.test(groups[i])) return false;
		return /^0*1$/.test(groups[7]);
	}
	return false;
};
var isLoopback = (host) => {
	if (!host) return false;
	if (LOOPBACK_HOSTNAMES.has(host)) return true;
	if (isIPv4Loopback(host)) return true;
	if (isIPv6Unspecified(host)) return true;
	return isIPv6Loopback(host);
};
var DEFAULT_PORTS = {
	http: 80,
	https: 443,
	ws: 80,
	wss: 443,
	ftp: 21
};
var parseNoProxyEntry = (entry) => {
	let entryHost = entry;
	let entryPort = 0;
	if (entryHost.charAt(0) === "[") {
		const bracketIndex = entryHost.indexOf("]");
		if (bracketIndex !== -1) {
			const host = entryHost.slice(1, bracketIndex);
			const rest = entryHost.slice(bracketIndex + 1);
			if (rest.charAt(0) === ":" && /^\d+$/.test(rest.slice(1))) entryPort = Number.parseInt(rest.slice(1), 10);
			return [host, entryPort];
		}
	}
	const firstColon = entryHost.indexOf(":");
	const lastColon = entryHost.lastIndexOf(":");
	if (firstColon !== -1 && firstColon === lastColon && /^\d+$/.test(entryHost.slice(lastColon + 1))) {
		entryPort = Number.parseInt(entryHost.slice(lastColon + 1), 10);
		entryHost = entryHost.slice(0, lastColon);
	}
	return [entryHost, entryPort];
};
var IPV4_MAPPED_DOTTED_RE = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i;
var IPV4_MAPPED_HEX_RE = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i;
var unmapIPv4MappedIPv6 = (host) => {
	if (typeof host !== "string" || host.indexOf(":") === -1) return host;
	const dotted = host.match(IPV4_MAPPED_DOTTED_RE);
	if (dotted) return dotted[1];
	const hex = host.match(IPV4_MAPPED_HEX_RE);
	if (hex) {
		const high = parseInt(hex[1], 16);
		const low = parseInt(hex[2], 16);
		return `${high >> 8}.${high & 255}.${low >> 8}.${low & 255}`;
	}
	return host;
};
var normalizeNoProxyHost = (hostname) => {
	if (!hostname) return hostname;
	if (hostname.charAt(0) === "[" && hostname.charAt(hostname.length - 1) === "]") hostname = hostname.slice(1, -1);
	const trimmed = hostname.replace(/\.+$/, "");
	const ipv4 = normalizeIPAddress(trimmed);
	if (ipv4 !== trimmed) return ipv4;
	return unmapIPv4MappedIPv6(trimmed);
};
function shouldBypassProxy(location) {
	let parsed;
	try {
		parsed = new URL(location);
	} catch (_err) {
		return false;
	}
	const noProxy = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
	if (!noProxy) return false;
	if (noProxy === "*") return true;
	const port = Number.parseInt(parsed.port, 10) || DEFAULT_PORTS[parsed.protocol.split(":", 1)[0]] || 0;
	const hostname = normalizeNoProxyHost(parsed.hostname.toLowerCase());
	return noProxy.split(/[\s,]+/).some((entry) => {
		if (!entry) return false;
		if (entry === "*") return true;
		let [entryHost, entryPort] = parseNoProxyEntry(entry);
		entryHost = normalizeNoProxyHost(entryHost);
		if (!entryHost) return false;
		if (entryPort && entryPort !== port) return false;
		if (entryHost.charAt(0) === "*") entryHost = entryHost.slice(1);
		if (entryHost.charAt(0) === ".") return hostname.endsWith(entryHost);
		return hostname === entryHost || isLoopback(hostname) && isLoopback(entryHost);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Function}
*/
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn(...args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
//#endregion
//#region node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	let bytesNotified = 0;
	const _speedometer = speedometer(50, 250);
	return throttle((e) => {
		if (!e || typeof e.loaded !== "number") return;
		const rawLoaded = e.loaded;
		const total = e.lengthComputable ? e.total : void 0;
		const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
		const progressBytes = Math.max(0, loaded - bytesNotified);
		const rate = _speedometer(progressBytes);
		bytesNotified = Math.max(bytesNotified, loaded);
		listener({
			loaded,
			total,
			progress: total ? loaded / total : void 0,
			bytes: progressBytes,
			rate: rate ? rate : void 0,
			estimated: rate && total ? (total - loaded) / rate : void 0,
			event: e,
			lengthComputable: total != null,
			[isDownloadStream ? "download" : "upload"]: true
		});
	}, freq);
};
var progressEventDecorator = (total, throttled) => {
	const lengthComputable = total != null;
	return [(loaded) => throttled[0]({
		lengthComputable,
		total,
		loaded
	}), throttled[1]];
};
var asyncDecorator = (fn, scheduler = utils_default.asap) => (...args) => scheduler(() => fn(...args));
//#endregion
//#region node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
/**
* Estimate data: URL byte lengths *without* allocating large buffers.
* - Fetch percent-decodes a base64 body before decoding it.
* - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
*   raw body, including ignored characters and content after padding.
* - Non-base64 data is percent-decoded and then encoded as UTF-8.
*/
var isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
var isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
var hexValue = (charCode) => charCode <= 57 ? charCode - 48 : (charCode & 223) - 55;
var isBase64Char = (charCode) => charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode >= 48 && charCode <= 57 || charCode === 43 || charCode === 47 || charCode === 45 || charCode === 95;
var isBase64Whitespace = (charCode) => charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
var base64Bytes = (significant) => {
	const groups = Math.floor(significant / 4);
	const remainder = significant % 4;
	return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};
var estimateBase64BufferAllocation = (body) => {
	const len = body.length;
	let padding = 0;
	if (len > 0 && body.charCodeAt(len - 1) === 61) {
		padding++;
		if (len > 1 && body.charCodeAt(len - 2) === 61) padding++;
	}
	return Math.floor((len - padding) * 3 / 4);
};
var estimatePercentDecodedBase64Bytes = (body) => {
	const len = body.length;
	let significant = 0;
	let padding = 0;
	let invalid = false;
	for (let i = 0; i < len; i++) {
		let code = body.charCodeAt(i);
		if (code === 37 && isPercentEncodedByte(body, i, len)) {
			code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
			i += 2;
		}
		if (isBase64Whitespace(code)) continue;
		if (code === 61) {
			padding++;
			continue;
		}
		if (!isBase64Char(code) || padding > 0) {
			invalid = true;
			continue;
		}
		significant++;
	}
	if (invalid || padding > 2 || padding > 0 && (significant + padding) % 4 !== 0 || significant % 4 === 1) return estimateBase64BufferAllocation(body);
	return base64Bytes(significant);
};
var estimateDataURLBytes = (url, estimateBase64) => {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) return estimateBase64(body);
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c === 37 && isPercentEncodedByte(body, i, len)) {
			bytes += 1;
			i += 2;
		} else if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
};
/**
* Estimate the percent-decoded payload size used by Fetch data: URLs.
*
* @param {string} url
* @returns {number}
*/
function estimateDataURLDecodedBytes(url) {
	const fragmentIndex = typeof url === "string" ? url.indexOf("#") : -1;
	return estimateDataURLBytes(fragmentIndex === -1 ? url : url.slice(0, fragmentIndex), estimatePercentDecodedBase64Bytes);
}
/**
* Estimate the Buffer backing allocation used by Node's raw base64 decoder.
*
* @param {string} url
* @returns {number}
*/
function estimateDataURLBufferAllocation(url) {
	return estimateDataURLBytes(url, estimateBase64BufferAllocation);
}
//#endregion
//#region node_modules/axios/lib/adapters/http.js
var zlibOptions = {
	flush: zlib.constants.Z_SYNC_FLUSH,
	finishFlush: zlib.constants.Z_SYNC_FLUSH
};
var brotliOptions = {
	flush: zlib.constants.BROTLI_OPERATION_FLUSH,
	finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
};
var zstdOptions = {
	flush: zlib.constants.ZSTD_e_flush,
	finishFlush: zlib.constants.ZSTD_e_flush
};
var isBrotliSupported = utils_default.isFunction(zlib.createBrotliDecompress);
var isZstdSupported = utils_default.isFunction(zlib.createZstdDecompress);
var ACCEPT_ENCODING = "gzip, compress, deflate" + (isBrotliSupported ? ", br" : "");
var ACCEPT_ENCODING_WITH_ZSTD = ACCEPT_ENCODING + (isZstdSupported ? ", zstd" : "");
var scheduleProgress = typeof process !== "undefined" && process.nextTick ? process.nextTick.bind(process) : utils_default.asap;
var { http: httpFollow, https: httpsFollow } = import_follow_redirects.default;
var isHttps = /https:?/;
var kAxiosSocketListener = Symbol("axios.http.socketListener");
var kAxiosCurrentReq = Symbol("axios.http.currentReq");
var kAxiosInstalledTunnel = Symbol("axios.http.installedTunnel");
var tunnelingAgentCache = /* @__PURE__ */ new Map();
var tunnelingAgentCacheUser = /* @__PURE__ */ new WeakMap();
var NODE_NATIVE_ENV_PROXY_SUPPORT = {
	22: 21,
	24: 5
};
function isNodeNativeEnvProxySupported(nodeVersion = process.versions && process.versions.node) {
	if (!nodeVersion) return false;
	const [major, minor] = nodeVersion.split(".").map((part) => Number(part));
	if (!Number.isInteger(major) || !Number.isInteger(minor)) return false;
	if (major > 24) return true;
	return NODE_NATIVE_ENV_PROXY_SUPPORT[major] != null && minor >= NODE_NATIVE_ENV_PROXY_SUPPORT[major];
}
function isNodeEnvProxyEnabled(agent, nodeVersion = process.versions && process.versions.node) {
	if (!isNodeNativeEnvProxySupported(nodeVersion)) return false;
	const agentOptions = agent && agent.options;
	return Boolean(agentOptions && utils_default.hasOwnProp(agentOptions, "proxyEnv") && agentOptions.proxyEnv != null);
}
function getProxyEnvAgent(options, configHttpAgent, configHttpsAgent) {
	return isHttps.test(options.protocol) ? configHttpsAgent || https.globalAgent : configHttpAgent || http.globalAgent;
}
function getTunnelingAgent(agentOptions, userHttpsAgent) {
	const key = agentOptions.protocol + "//" + agentOptions.hostname + ":" + (agentOptions.port || "") + "#" + (agentOptions.auth || "");
	const cache = userHttpsAgent ? tunnelingAgentCacheUser.get(userHttpsAgent) || tunnelingAgentCacheUser.set(userHttpsAgent, /* @__PURE__ */ new Map()).get(userHttpsAgent) : tunnelingAgentCache;
	let agent = cache.get(key);
	if (agent) return agent;
	const merged = userHttpsAgent && userHttpsAgent.options ? {
		...userHttpsAgent.options,
		...agentOptions
	} : agentOptions;
	agent = new import_dist.default(merged);
	if (userHttpsAgent && userHttpsAgent.options) {
		const originTLSOptions = { ...userHttpsAgent.options };
		const callback = agent.callback;
		agent.callback = function axiosTunnelingAgentCallback(req, opts) {
			return callback.call(this, req, {
				...originTLSOptions,
				...opts
			});
		};
	}
	agent[kAxiosInstalledTunnel] = true;
	cache.set(key, agent);
	return agent;
}
var supportedProtocols = platform_default.protocols.map((protocol) => {
	return protocol + ":";
});
var decodeURIComponentSafe$1 = (value) => {
	if (!utils_default.isString(value)) return value;
	try {
		return decodeURIComponent(value);
	} catch (error) {
		return value;
	}
};
var flushOnFinish = (stream, [throttled, flush]) => {
	stream.on("end", flush).on("error", flush);
	return throttled;
};
var http2Sessions = new Http2Sessions();
/**
* If the proxy, auth, sensitive header, or config beforeRedirects functions are defined,
* call them with the options object.
*
* @param {Object<string, any>} options - The options object that was passed to the request.
*
* @returns {Object<string, any>}
*/
function dispatchBeforeRedirect(options, responseDetails, requestDetails) {
	if (options.beforeRedirects.proxy) options.beforeRedirects.proxy(options);
	if (options.beforeRedirects.auth) options.beforeRedirects.auth(options);
	if (options.beforeRedirects.sensitiveHeaders) options.beforeRedirects.sensitiveHeaders(options, requestDetails);
	if (options.beforeRedirects.config) options.beforeRedirects.config(options, responseDetails, requestDetails);
}
function stripMatchingHeaders(headers, sensitiveSet) {
	if (!headers) return;
	Object.keys(headers).forEach((header) => {
		if (sensitiveSet.has(header.toLowerCase())) delete headers[header];
	});
}
function isSameOriginRedirect(redirectOptions, requestDetails) {
	if (!requestDetails) return false;
	try {
		return new URL(requestDetails.url).origin === new URL(redirectOptions.href).origin;
	} catch (e) {
		return false;
	}
}
/**
* If the proxy or config afterRedirects functions are defined, call them with the options
*
* @param {http.ClientRequestArgs} options
* @param {AxiosProxyConfig} configProxy configuration from Axios options object
* @param {string} location
*
* @returns {http.ClientRequestArgs}
*/
function setProxy(options, configProxy, location, isRedirect, configHttpsAgent, configHttpAgent) {
	let proxy = configProxy;
	const proxyEnvAgent = getProxyEnvAgent(options, configHttpAgent, configHttpsAgent);
	if (!proxy && proxy !== false && !isNodeEnvProxyEnabled(proxyEnvAgent)) {
		const proxyUrl = getProxyForUrl(location);
		if (proxyUrl) {
			if (!shouldBypassProxy(location)) proxy = new URL(proxyUrl);
		}
	}
	if (isRedirect && options.headers) {
		for (const name of Object.keys(options.headers)) if (name.toLowerCase() === "proxy-authorization") delete options.headers[name];
	}
	if (isRedirect && options.agent && options.agent[kAxiosInstalledTunnel]) options.agent = void 0;
	if (proxy) {
		const isProxyURL = proxy instanceof URL;
		const readProxyField = (key) => isProxyURL || utils_default.hasOwnProp(proxy, key) ? proxy[key] : void 0;
		const proxyUsername = readProxyField("username");
		const proxyPassword = readProxyField("password");
		let proxyAuth = utils_default.hasOwnProp(proxy, "auth") ? proxy.auth : void 0;
		if (proxyUsername) proxyAuth = (proxyUsername || "") + ":" + (proxyPassword || "");
		if (proxyAuth) {
			const authIsObject = typeof proxyAuth === "object";
			const authUsername = authIsObject && utils_default.hasOwnProp(proxyAuth, "username") ? proxyAuth.username : void 0;
			const authPassword = authIsObject && utils_default.hasOwnProp(proxyAuth, "password") ? proxyAuth.password : void 0;
			if (Boolean(authUsername || authPassword)) proxyAuth = (authUsername || "") + ":" + (authPassword || "");
			else if (authIsObject) throw new AxiosError$1("Invalid proxy authorization", AxiosError$1.ERR_BAD_OPTION, { proxy });
		}
		if (isHttps.test(options.protocol)) {
			if (!(configHttpsAgent instanceof import_dist.default)) {
				const proxyHost = readProxyField("hostname") || readProxyField("host");
				const proxyPort = readProxyField("port");
				const rawProxyProtocol = readProxyField("protocol");
				const normalizedProtocol = rawProxyProtocol ? rawProxyProtocol.includes(":") ? rawProxyProtocol : `${rawProxyProtocol}:` : "http:";
				const proxyHostForURL = proxyHost && proxyHost.includes(":") && !proxyHost.startsWith("[") ? `[${proxyHost}]` : proxyHost;
				const proxyURL = new URL(`${normalizedProtocol}//${proxyHostForURL}${proxyPort ? ":" + proxyPort : ""}`);
				const agentOptions = {
					protocol: proxyURL.protocol,
					hostname: proxyURL.hostname.replace(/^\[|\]$/g, ""),
					port: proxyURL.port,
					auth: proxyAuth && typeof proxyAuth === "string" ? proxyAuth : void 0
				};
				if (proxyURL.protocol === "https:") agentOptions.ALPNProtocols = ["http/1.1"];
				const tunnelingAgent = getTunnelingAgent(agentOptions, configHttpsAgent);
				options.agent = tunnelingAgent;
				if (options.agents) options.agents.https = tunnelingAgent;
			}
		} else {
			if (proxyAuth) {
				const base64 = Buffer.from(proxyAuth, "utf8").toString("base64");
				options.headers["Proxy-Authorization"] = "Basic " + base64;
			}
			let hasUserHostHeader = false;
			for (const name of Object.keys(options.headers)) if (name.toLowerCase() === "host") {
				hasUserHostHeader = true;
				break;
			}
			if (!hasUserHostHeader) options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
			const proxyHost = readProxyField("hostname") || readProxyField("host");
			options.hostname = proxyHost;
			options.host = proxyHost;
			options.port = readProxyField("port");
			options.path = location;
			const proxyProtocol = readProxyField("protocol");
			if (proxyProtocol) options.protocol = proxyProtocol.includes(":") ? proxyProtocol : `${proxyProtocol}:`;
		}
	}
	options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
		setProxy(redirectOptions, configProxy, redirectOptions.href, true, configHttpsAgent, configHttpAgent);
	};
}
var isHttpAdapterSupported = typeof process !== "undefined" && utils_default.kindOf(process) === "process";
var wrapAsync = (asyncExecutor) => {
	return new Promise((resolve, reject) => {
		let onDone;
		let isDone;
		const done = (value, isRejected) => {
			if (isDone) return;
			isDone = true;
			onDone && onDone(value, isRejected);
		};
		const _resolve = (value) => {
			done(value);
			resolve(value);
		};
		const _reject = (reason) => {
			done(reason, true);
			reject(reason);
		};
		asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
	});
};
var resolveFamily = ({ address, family }) => {
	if (!utils_default.isString(address)) throw TypeError("address must be a string");
	return {
		address,
		family: family || (address.indexOf(".") < 0 ? 6 : 4)
	};
};
var buildAddressEntry = (address, family) => resolveFamily(utils_default.isObject(address) ? address : {
	address,
	family
});
var http2Transport = { request(options, cb) {
	const authority = options.protocol + "//" + options.hostname + ":" + (options.port || (options.protocol === "https:" ? 443 : 80));
	const { http2Options, headers } = options;
	const session = http2Sessions.getSession(authority, http2Options);
	const { HTTP2_HEADER_SCHEME, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS } = http2.constants;
	const http2Headers = {
		[HTTP2_HEADER_SCHEME]: options.protocol.replace(":", ""),
		[HTTP2_HEADER_METHOD]: options.method,
		[HTTP2_HEADER_PATH]: options.path
	};
	utils_default.forEach(headers, (header, name) => {
		name.charAt(0) !== ":" && (http2Headers[name] = header);
	});
	const req = session.request(http2Headers);
	req.once("response", (responseHeaders) => {
		const response = req;
		responseHeaders = Object.assign({}, responseHeaders);
		const status = responseHeaders[HTTP2_HEADER_STATUS];
		delete responseHeaders[HTTP2_HEADER_STATUS];
		response.headers = responseHeaders;
		response.statusCode = +status;
		cb(response);
	});
	return req;
} };
var http_default = isHttpAdapterSupported && function httpAdapter(config) {
	return wrapAsync(async function dispatchHttpRequest(resolve$1, reject, onDone) {
		const own = (key) => utils_default.getSafeProp(config, key);
		const transitional = own("transitional") || transitional_default;
		let data = own("data");
		let lookup = own("lookup");
		let family = own("family");
		let httpVersion = own("httpVersion");
		if (httpVersion === void 0) httpVersion = 1;
		let http2Options = own("http2Options");
		const httpAgent = own("httpAgent");
		const httpsAgent = own("httpsAgent");
		const configProxy = own("proxy");
		const responseType = own("responseType");
		const responseEncoding = own("responseEncoding");
		const socketPath = own("socketPath");
		const method = own("method").toUpperCase();
		const maxRedirects = own("maxRedirects");
		const maxBodyLength = own("maxBodyLength");
		const maxContentLength = own("maxContentLength");
		const decompress = own("decompress");
		let isDone;
		let rejected = false;
		let req;
		let connectPhaseTimer;
		httpVersion = +httpVersion;
		if (Number.isNaN(httpVersion)) throw TypeError(`Invalid protocol version: '${config.httpVersion}' is not a number`);
		if (httpVersion !== 1 && httpVersion !== 2) throw TypeError(`Unsupported protocol version '${httpVersion}'`);
		const isHttp2 = httpVersion === 2;
		if (lookup) {
			const _lookup = callbackify(lookup, (value) => utils_default.isArray(value) ? value : [value]);
			lookup = (hostname, opt, cb) => {
				_lookup(hostname, opt, (err, arg0, arg1) => {
					if (err) return cb(err);
					const addresses = utils_default.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
					opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
				});
			};
		}
		const abortEmitter = new EventEmitter();
		function abort(reason) {
			try {
				abortEmitter.emit("abort", !reason || reason.type ? new CanceledError$1(null, config, req) : reason);
			} catch (err) {}
		}
		function clearConnectPhaseTimer() {
			if (connectPhaseTimer) {
				clearTimeout(connectPhaseTimer);
				connectPhaseTimer = null;
			}
		}
		function createTimeoutError() {
			const configTimeout = own("timeout");
			let timeoutErrorMessage = configTimeout ? "timeout of " + configTimeout + "ms exceeded" : "timeout exceeded";
			const configTimeoutErrorMessage = own("timeoutErrorMessage");
			if (configTimeoutErrorMessage) timeoutErrorMessage = configTimeoutErrorMessage;
			return new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, req);
		}
		abortEmitter.once("abort", reject);
		const onFinished = () => {
			clearConnectPhaseTimer();
			if (config.cancelToken) config.cancelToken.unsubscribe(abort);
			if (config.signal) config.signal.removeEventListener("abort", abort);
			abortEmitter.removeAllListeners();
		};
		if (config.cancelToken || config.signal) {
			config.cancelToken && config.cancelToken.subscribe(abort);
			if (config.signal) config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
		}
		onDone((response, isRejected) => {
			isDone = true;
			clearConnectPhaseTimer();
			if (isRejected) {
				rejected = true;
				onFinished();
				return;
			}
			const { data } = response;
			if (data instanceof stream.Readable || data instanceof stream.Duplex) {
				const offListeners = stream.finished(data, () => {
					offListeners();
					onFinished();
				});
			} else onFinished();
		});
		const fullPath = buildFullPath(own("baseURL"), own("url"), own("allowAbsoluteUrls"), config);
		const urlBase = socketPath ? "http://localhost" : platform_default.hasBrowserEnv ? platform_default.origin : void 0;
		const parsed = new URL(fullPath, urlBase);
		const protocol = parsed.protocol || supportedProtocols[0];
		if (protocol === "data:") {
			if (maxContentLength > -1) {
				if (estimateDataURLBufferAllocation(String(own("url") || fullPath || "")) > maxContentLength) return reject(new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config));
			}
			let convertedData;
			if (method !== "GET") return settle(resolve$1, reject, {
				status: 405,
				statusText: "method not allowed",
				headers: {},
				config
			});
			try {
				convertedData = fromDataURI(own("url"), responseType === "blob", { Blob: config.env && config.env.Blob });
			} catch (err) {
				throw AxiosError$1.from(err, AxiosError$1.ERR_BAD_REQUEST, config);
			}
			if (responseType === "text") {
				convertedData = convertedData.toString(responseEncoding);
				if (!responseEncoding || responseEncoding === "utf8") convertedData = utils_default.stripBOM(convertedData);
			} else if (responseType === "stream") convertedData = stream.Readable.from(convertedData);
			return settle(resolve$1, reject, {
				data: convertedData,
				status: 200,
				statusText: "OK",
				headers: new AxiosHeaders$1(),
				config
			});
		}
		if (supportedProtocols.indexOf(protocol) === -1) return reject(new AxiosError$1("Unsupported protocol " + protocol, AxiosError$1.ERR_BAD_REQUEST, config));
		const headers = AxiosHeaders$1.from(config.headers).normalize();
		headers.set("User-Agent", "axios/1.19.0", false);
		const { onUploadProgress, onDownloadProgress } = config;
		const maxRate = config.maxRate;
		let maxUploadRate = void 0;
		let maxDownloadRate = void 0;
		if (utils_default.isSpecCompliantForm(data)) {
			const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
			data = formDataToStream(data, (formHeaders) => {
				headers.set(formHeaders);
			}, {
				tag: `axios-1.19.0-boundary`,
				boundary: userBoundary && userBoundary[1] || void 0
			});
		} else if (utils_default.isFormData(data) && utils_default.isFunction(data.getHeaders) && data.getHeaders !== Object.prototype.getHeaders) {
			setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
			if (!headers.hasContentLength()) try {
				const knownLength = await util.promisify(data.getLength).call(data);
				Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
			} catch (e) {}
		} else if (utils_default.isBlob(data) || utils_default.isFile(data)) {
			data.size && headers.setContentType(data.type || "application/octet-stream");
			headers.setContentLength(data.size || 0);
			data = stream.Readable.from(readBlob(data));
		} else if (data && !utils_default.isStream(data)) {
			if (Buffer.isBuffer(data)) {} else if (utils_default.isArrayBuffer(data)) data = Buffer.from(new Uint8Array(data));
			else if (utils_default.isString(data)) data = Buffer.from(data, "utf-8");
			else return reject(new AxiosError$1("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", AxiosError$1.ERR_BAD_REQUEST, config));
			headers.setContentLength(data.length, false);
			if (maxBodyLength > -1 && data.length > maxBodyLength) return reject(new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, config));
		}
		const contentLength = utils_default.toFiniteNumber(headers.getContentLength());
		if (utils_default.isArray(maxRate)) {
			maxUploadRate = maxRate[0];
			maxDownloadRate = maxRate[1];
		} else maxUploadRate = maxDownloadRate = maxRate;
		if (data && (onUploadProgress || maxUploadRate)) {
			if (!utils_default.isStream(data)) data = stream.Readable.from(data, { objectMode: false });
			data = stream.pipeline([data, new AxiosTransformStream({ maxRate: utils_default.toFiniteNumber(maxUploadRate) })], utils_default.noop);
			onUploadProgress && data.on("progress", flushOnFinish(data, progressEventDecorator(contentLength, progressEventReducer(asyncDecorator(onUploadProgress, scheduleProgress), false, 3))));
		}
		let auth = void 0;
		const configAuth = own("auth");
		if (configAuth) {
			const username = utils_default.getSafeProp(configAuth, "username") || "";
			const password = utils_default.getSafeProp(configAuth, "password") || "";
			auth = username + ":" + password;
		}
		if (!auth && (parsed.username || parsed.password)) {
			const urlUsername = decodeURIComponentSafe$1(parsed.username);
			const urlPassword = decodeURIComponentSafe$1(parsed.password);
			auth = urlUsername + ":" + urlPassword;
		}
		auth && headers.delete("authorization");
		let path;
		try {
			path = buildURL(parsed.pathname + parsed.search, own("params"), own("paramsSerializer")).replace(/^\?/, "");
		} catch (err) {
			return reject(AxiosError$1.from(err, AxiosError$1.ERR_BAD_REQUEST, config, null, null, {
				url: own("url"),
				exists: true
			}));
		}
		headers.set("Accept-Encoding", utils_default.hasOwnProp(transitional, "advertiseZstdAcceptEncoding") && transitional.advertiseZstdAcceptEncoding === true ? ACCEPT_ENCODING_WITH_ZSTD : ACCEPT_ENCODING, false);
		const options = Object.assign(Object.create(null), {
			path,
			method,
			headers: toByteStringHeaderObject(headers),
			agents: {
				http: httpAgent,
				https: httpsAgent
			},
			auth,
			protocol,
			family,
			beforeRedirect: dispatchBeforeRedirect,
			beforeRedirects: Object.create(null),
			http2Options
		});
		!utils_default.isUndefined(lookup) && (options.lookup = lookup);
		if (socketPath) {
			if (typeof socketPath !== "string") return reject(new AxiosError$1("socketPath must be a string", AxiosError$1.ERR_BAD_OPTION_VALUE, config));
			const allowedSocketPaths = own("allowedSocketPaths");
			if (allowedSocketPaths != null) {
				const allowed = Array.isArray(allowedSocketPaths) ? allowedSocketPaths : [allowedSocketPaths];
				const resolvedSocket = resolve(socketPath);
				if (!allowed.some((entry) => typeof entry === "string" && resolve(entry) === resolvedSocket)) return reject(new AxiosError$1(`socketPath "${socketPath}" is not permitted by allowedSocketPaths`, AxiosError$1.ERR_BAD_OPTION_VALUE, config));
			}
			options.socketPath = socketPath;
		} else {
			options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
			options.port = parsed.port;
			setProxy(options, configProxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path, false, httpsAgent, httpAgent);
		}
		let transport;
		let isNativeTransport = false;
		let transportEnforcesMaxBodyLength = false;
		const isHttpsRequest = isHttps.test(options.protocol);
		if (options.agent == null) options.agent = isHttpsRequest ? httpsAgent : httpAgent;
		if (isHttp2) transport = http2Transport;
		else {
			const configTransport = own("transport");
			if (configTransport) transport = configTransport;
			else if (maxRedirects === 0) {
				transport = isHttpsRequest ? https : http;
				isNativeTransport = true;
			} else {
				transportEnforcesMaxBodyLength = true;
				options.sensitiveHeaders = [];
				if (maxRedirects) options.maxRedirects = maxRedirects;
				const configBeforeRedirect = own("beforeRedirect");
				if (configBeforeRedirect) options.beforeRedirects.config = configBeforeRedirect;
				if (auth) {
					const requestOrigin = parsed.origin;
					const authToRestore = auth;
					options.beforeRedirects.auth = function beforeRedirectAuth(redirectOptions) {
						try {
							if (new URL(redirectOptions.href).origin === requestOrigin) redirectOptions.auth = authToRestore;
						} catch (e) {}
					};
				}
				const sensitiveHeaders = own("sensitiveHeaders");
				if (sensitiveHeaders != null) {
					if (!utils_default.isArray(sensitiveHeaders)) return reject(new AxiosError$1("sensitiveHeaders must be an array of strings", AxiosError$1.ERR_BAD_OPTION_VALUE, config));
					const sensitiveSet = /* @__PURE__ */ new Set();
					for (const header of sensitiveHeaders) {
						if (!utils_default.isString(header)) return reject(new AxiosError$1("sensitiveHeaders must be an array of strings", AxiosError$1.ERR_BAD_OPTION_VALUE, config));
						sensitiveSet.add(header.toLowerCase());
					}
					if (sensitiveSet.size) {
						options.sensitiveHeaders = Array.from(sensitiveSet);
						options.beforeRedirects.sensitiveHeaders = function beforeRedirectSensitiveHeaders(redirectOptions, requestDetails) {
							if (!isSameOriginRedirect(redirectOptions, requestDetails)) stripMatchingHeaders(redirectOptions.headers, sensitiveSet);
						};
					}
				}
				transport = isHttpsRequest ? httpsFollow : httpFollow;
			}
		}
		if (maxBodyLength > -1) options.maxBodyLength = maxBodyLength;
		else options.maxBodyLength = Infinity;
		options.insecureHTTPParser = Boolean(own("insecureHTTPParser"));
		req = transport.request(options, function handleResponse(res) {
			clearConnectPhaseTimer();
			if (req.destroyed) return;
			const streams = [res];
			const responseLength = utils_default.toFiniteNumber(res.headers["content-length"]);
			if (onDownloadProgress || maxDownloadRate) {
				const transformStream = new AxiosTransformStream({ maxRate: utils_default.toFiniteNumber(maxDownloadRate) });
				onDownloadProgress && transformStream.on("progress", flushOnFinish(transformStream, progressEventDecorator(responseLength, progressEventReducer(asyncDecorator(onDownloadProgress, scheduleProgress), true, 3))));
				streams.push(transformStream);
			}
			let responseStream = res;
			const lastRequest = res.req || req;
			if (decompress !== false && res.headers["content-encoding"]) {
				if (method === "HEAD" || res.statusCode === 204) delete res.headers["content-encoding"];
				switch ((res.headers["content-encoding"] || "").toLowerCase()) {
					case "gzip":
					case "x-gzip":
					case "compress":
					case "x-compress":
						streams.push(zlib.createUnzip(zlibOptions));
						delete res.headers["content-encoding"];
						break;
					case "deflate":
						streams.push(new ZlibHeaderTransformStream());
						streams.push(zlib.createUnzip(zlibOptions));
						delete res.headers["content-encoding"];
						break;
					case "br":
						if (isBrotliSupported) {
							streams.push(zlib.createBrotliDecompress(brotliOptions));
							delete res.headers["content-encoding"];
						}
						break;
					case "zstd": if (isZstdSupported) {
						streams.push(zlib.createZstdDecompress(zstdOptions));
						delete res.headers["content-encoding"];
					}
				}
			}
			responseStream = streams.length > 1 ? stream.pipeline(streams, utils_default.noop) : streams[0];
			const response = {
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: new AxiosHeaders$1(res.headers),
				config,
				request: lastRequest
			};
			if (responseType === "stream") {
				if (maxContentLength > -1) {
					const limit = maxContentLength;
					const source = responseStream;
					async function* enforceMaxContentLength() {
						let totalResponseBytes = 0;
						for await (const chunk of source) {
							totalResponseBytes += chunk.length;
							if (totalResponseBytes > limit) throw new AxiosError$1("maxContentLength size of " + limit + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, lastRequest);
							yield chunk;
						}
					}
					responseStream = stream.Readable.from(enforceMaxContentLength(), { objectMode: false });
				}
				response.data = responseStream;
				settle(resolve$1, reject, response);
			} else {
				const responseBuffer = [];
				let totalResponseBytes = 0;
				responseStream.on("data", function handleStreamData(chunk) {
					responseBuffer.push(chunk);
					totalResponseBytes += chunk.length;
					if (maxContentLength > -1 && totalResponseBytes > maxContentLength) {
						rejected = true;
						responseStream.destroy();
						abort(new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, lastRequest));
					}
				});
				responseStream.on("aborted", function handlerStreamAborted() {
					if (rejected) return;
					const err = new AxiosError$1("stream has been aborted", AxiosError$1.ERR_BAD_RESPONSE, config, lastRequest, response);
					responseStream.destroy(err);
					reject(err);
				});
				responseStream.on("error", function handleStreamError(err) {
					if (rejected) return;
					reject(AxiosError$1.from(err, null, config, lastRequest, response));
				});
				responseStream.on("end", function handleStreamEnd() {
					try {
						let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
						if (responseType !== "arraybuffer") {
							responseData = responseData.toString(responseEncoding);
							if (!responseEncoding || responseEncoding === "utf8") responseData = utils_default.stripBOM(responseData);
						}
						response.data = responseData;
					} catch (err) {
						return reject(AxiosError$1.from(err, null, config, response.request, response));
					}
					settle(resolve$1, reject, response);
				});
			}
			abortEmitter.once("abort", (err) => {
				if (!responseStream.destroyed) {
					responseStream.emit("error", err);
					responseStream.destroy();
				}
			});
		});
		abortEmitter.once("abort", (err) => {
			if (req.close) req.close();
			else req.destroy(err);
		});
		req.on("error", function handleRequestError(err) {
			reject(AxiosError$1.from(err, null, config, req));
		});
		const boundSockets = /* @__PURE__ */ new Set();
		req.on("socket", function handleRequestSocket(socket) {
			if (typeof socket.setKeepAlive === "function") socket.setKeepAlive(true, 6e4);
			if (!socket[kAxiosSocketListener]) {
				socket.on("error", function handleSocketError(err) {
					const current = socket[kAxiosCurrentReq];
					if (current && !current.destroyed) current.destroy(err);
				});
				socket[kAxiosSocketListener] = true;
			}
			socket[kAxiosCurrentReq] = req;
			boundSockets.add(socket);
		});
		req.once("close", function clearCurrentReq() {
			clearConnectPhaseTimer();
			for (const socket of boundSockets) if (socket[kAxiosCurrentReq] === req) socket[kAxiosCurrentReq] = null;
			boundSockets.clear();
		});
		if (own("timeout")) {
			const timeout = parseInt(own("timeout"), 10);
			if (Number.isNaN(timeout)) {
				abort(new AxiosError$1("error trying to parse `config.timeout` to int", AxiosError$1.ERR_BAD_OPTION_VALUE, config, req));
				return;
			}
			const handleTimeout = function handleTimeout() {
				if (isDone) return;
				abort(createTimeoutError());
			};
			if (isNativeTransport && timeout > 0) connectPhaseTimer = setTimeout(handleTimeout, timeout);
			req.setTimeout(timeout, handleTimeout);
		} else req.setTimeout(0);
		if (utils_default.isStream(data)) {
			let ended = false;
			let errored = false;
			data.on("end", () => {
				ended = true;
			});
			data.once("error", (err) => {
				errored = true;
				req.destroy(err);
			});
			data.on("close", () => {
				if (!ended && !errored) abort(new CanceledError$1("Request stream has been aborted", config, req));
			});
			let uploadStream = data;
			if (maxBodyLength > -1 && !transportEnforcesMaxBodyLength) {
				const limit = maxBodyLength;
				let bytesSent = 0;
				uploadStream = stream.pipeline([data, new stream.Transform({ transform(chunk, _enc, cb) {
					bytesSent += chunk.length;
					if (bytesSent > limit) return cb(new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, config, req));
					cb(null, chunk);
				} })], utils_default.noop);
				uploadStream.on("error", (err) => {
					if (!req.destroyed) req.destroy(err);
				});
			}
			uploadStream.pipe(req);
		} else {
			data && req.write(data);
			req.end();
		}
	});
};
//#endregion
//#region node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
	url = new URL(url, platform_default.origin);
	return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
//#endregion
//#region node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? {
	write(name, value, expires, path, domain, secure, sameSite) {
		if (typeof document === "undefined") return;
		const cookie = [`${name}=${encodeURIComponent(value)}`];
		if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
		if (utils_default.isString(path)) cookie.push(`path=${path}`);
		if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
		if (secure === true) cookie.push("secure");
		if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
		document.cookie = cookie.join("; ");
	},
	read(name) {
		if (typeof document === "undefined") return null;
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].replace(/^\s+/, "");
			const eq = cookie.indexOf("=");
			if (eq !== -1 && cookie.slice(0, eq) === name) try {
				return decodeURIComponent(cookie.slice(eq + 1));
			} catch (e) {
				return cookie.slice(eq + 1);
			}
		}
		return null;
	},
	remove(name) {
		this.write(name, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
//#endregion
//#region node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
var ownEnumerableKeys = (thing) => {
	if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) return Object.keys(thing).concat(Object.getOwnPropertySymbols(thing).filter((symbol) => Object.getOwnPropertyDescriptor(thing, symbol).enumerable));
	return Object.keys(thing);
};
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig$2(config1, config2) {
	config1 = config1 || {};
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function getMergedTransitionalOption(prop) {
		const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
		if (!utils_default.isUndefined(transitional2)) {
			if (utils_default.isPlainObject(transitional2)) {
				if (utils_default.hasOwnProp(transitional2, prop)) return transitional2[prop];
			} else return;
		}
		const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
		if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) return transitional1[prop];
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		allowedSocketPaths: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(ownEnumerableKeys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
		if (utils_default.hasOwnProp(config1, "validateStatus")) config.validateStatus = getMergedValue(void 0, config1.validateStatus);
		else delete config.validateStatus;
	}
	return config;
}
//#endregion
//#region node_modules/axios/lib/helpers/resolveConfig.js
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8$1 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
function resolveConfig$1(config) {
	const newConfig = mergeConfig$2({}, config);
	const own = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own("data");
	let withXSRFToken = own("withXSRFToken");
	const xsrfHeaderName = own("xsrfHeaderName");
	const xsrfCookieName = own("xsrfCookieName");
	let headers = own("headers");
	const auth = own("auth");
	const baseURL = own("baseURL");
	const allowAbsoluteUrls = own("allowAbsoluteUrls");
	const url = own("url");
	newConfig.headers = headers = AxiosHeaders$1.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig), own("params"), own("paramsSerializer"));
	if (auth) {
		const username = utils_default.getSafeProp(auth, "username") || "";
		const password = utils_default.getSafeProp(auth, "password") || "";
		try {
			headers.set("Authorization", "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : "")));
		} catch (e) {
			throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_OPTION_VALUE, config);
		}
	}
	if (utils_default.isFormData(data)) {
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) headers.setContentType(void 0);
		else if (utils_default.isFunction(data.getHeaders)) setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
}
var xhr_default = typeof XMLHttpRequest !== "undefined" && function(config) {
	return new Promise(function dispatchXhrRequest(resolve, reject) {
		const _config = resolveConfig$1(config);
		let requestData = _config.data;
		const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
		let { responseType, onUploadProgress, onDownloadProgress } = _config;
		let onCanceled;
		let uploadThrottled, downloadThrottled;
		let flushUpload, flushDownload;
		function done() {
			flushUpload && flushUpload();
			flushDownload && flushDownload();
			_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
			_config.signal && _config.signal.removeEventListener("abort", onCanceled);
		}
		let request = new XMLHttpRequest();
		request.open(_config.method.toUpperCase(), _config.url, true);
		request.timeout = _config.timeout;
		function onloadend() {
			if (!request) return;
			const responseHeaders = AxiosHeaders$1.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
			settle(function _resolve(value) {
				resolve(value);
				done();
			}, function _reject(err) {
				reject(err);
				done();
			}, {
				data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				config,
				request
			});
			request = null;
		}
		if ("onloadend" in request) request.onloadend = onloadend;
		else request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) return;
			if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
			setTimeout(onloadend);
		};
		request.onabort = function handleAbort() {
			if (!request) return;
			reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
			done();
			request = null;
		};
		request.onerror = function handleError(event) {
			const err = new AxiosError$1(event && event.message ? event.message : "Network Error", AxiosError$1.ERR_NETWORK, config, request);
			err.event = event || null;
			reject(err);
			done();
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
			const transitional = _config.transitional || transitional_default;
			if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
			reject(new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, request));
			done();
			request = null;
		};
		requestData === void 0 && requestHeaders.setContentType(null);
		if ("setRequestHeader" in request) utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
			request.setRequestHeader(key, val);
		});
		if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
		if (responseType && responseType !== "json") request.responseType = _config.responseType;
		if (onDownloadProgress) {
			[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
			request.addEventListener("progress", downloadThrottled);
		}
		if (onUploadProgress && request.upload) {
			[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
			request.upload.addEventListener("progress", uploadThrottled);
			request.upload.addEventListener("loadend", flushUpload);
		}
		if (_config.cancelToken || _config.signal) {
			onCanceled = (cancel) => {
				if (!request) return;
				reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
				request.abort();
				done();
				request = null;
			};
			_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
			if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
		}
		const protocol = parseProtocol(_config.url);
		if (protocol && !platform_default.protocols.includes(protocol)) {
			reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
			done();
			return;
		}
		request.send(requestData || null);
	});
};
//#endregion
//#region node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
	signals = signals ? signals.filter(Boolean) : [];
	if (!timeout && !signals.length) return;
	const controller = new AbortController();
	let aborted = false;
	const onabort = function(reason) {
		if (!aborted) {
			aborted = true;
			unsubscribe();
			const err = reason instanceof Error ? reason : this.reason;
			controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
		}
	};
	let timer = timeout && setTimeout(() => {
		timer = null;
		onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
	}, timeout);
	const unsubscribe = () => {
		if (!signals) return;
		timer && clearTimeout(timer);
		timer = null;
		signals.forEach((signal) => {
			signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
		});
		signals = null;
	};
	signals.forEach((signal) => {
		if (aborted) return;
		if (signal.aborted) {
			onabort.call(signal);
			return;
		}
		signal.addEventListener("abort", onabort, { once: true });
	});
	const { signal } = controller;
	signal.unsubscribe = () => utils_default.asap(unsubscribe);
	return signal;
};
//#endregion
//#region node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
	let len = chunk.byteLength;
	if (!chunkSize || len < chunkSize) {
		yield chunk;
		return;
	}
	let pos = 0;
	let end;
	while (pos < len) {
		end = pos + chunkSize;
		yield chunk.slice(pos, end);
		pos = end;
	}
};
var readBytes = async function* (iterable, chunkSize) {
	for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
};
var readStream = async function* (stream) {
	if (stream[Symbol.asyncIterator]) {
		yield* stream;
		return;
	}
	const reader = stream.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			yield value;
		}
	} finally {
		await reader.cancel();
	}
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
	const iterator = readBytes(stream, chunkSize);
	let bytes = 0;
	let done;
	let _onFinish = (e) => {
		if (!done) {
			done = true;
			onFinish && onFinish(e);
		}
	};
	return new ReadableStream({
		async pull(controller) {
			try {
				const { done, value } = await iterator.next();
				if (done) {
					_onFinish();
					controller.close();
					return;
				}
				let len = value.byteLength;
				if (onProgress) onProgress(bytes += len);
				controller.enqueue(new Uint8Array(value));
			} catch (err) {
				_onFinish(err);
				throw err;
			}
		},
		cancel(reason) {
			_onFinish(reason);
			return iterator.return();
		}
	}, { highWaterMark: 2 });
};
//#endregion
//#region node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE = 65536;
var { isFunction } = utils_default;
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
var decodeURIComponentSafe = (value) => {
	if (!utils_default.isString(value)) return value;
	try {
		return decodeURIComponent(value);
	} catch (error) {
		return value;
	}
};
var test = (fn, ...args) => {
	try {
		return !!fn(...args);
	} catch (e) {
		return false;
	}
};
var maybeWithAuthCredentials = (url) => {
	const protocolIndex = url.indexOf("://");
	let urlToCheck = url;
	if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
	return urlToCheck.includes("@") || urlToCheck.includes(":");
};
var factory = (env) => {
	const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
	const { ReadableStream, TextEncoder } = globalObject;
	env = utils_default.merge.call({ skipUndefined: true }, {
		Request: globalObject.Request,
		Response: globalObject.Response
	}, env);
	const { fetch: envFetch, Request, Response } = env;
	const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
	const isRequestSupported = isFunction(Request);
	const isResponseSupported = isFunction(Response);
	if (!isFetchSupported) return false;
	const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
	const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
	const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
		let duplexAccessed = false;
		const request = new Request(platform_default.origin, {
			body: new ReadableStream(),
			method: "POST",
			get duplex() {
				duplexAccessed = true;
				return "half";
			}
		});
		const hasContentType = request.headers.has("Content-Type");
		if (request.body != null) request.body.cancel();
		return duplexAccessed && !hasContentType;
	});
	const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
	const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
	isFetchSupported && (() => {
		[
			"text",
			"arrayBuffer",
			"blob",
			"formData",
			"stream"
		].forEach((type) => {
			!resolvers[type] && (resolvers[type] = (res, config) => {
				let method = res && res[type];
				if (method) return method.call(res);
				throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
			});
		});
	})();
	const getBodyLength = async (body) => {
		if (body == null) return 0;
		if (utils_default.isBlob(body)) return body.size;
		if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
			method: "POST",
			body
		}).arrayBuffer()).byteLength;
		if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
		if (utils_default.isURLSearchParams(body)) body = body + "";
		if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
	};
	const resolveBodyLength = async (headers, body) => {
		const length = utils_default.toFiniteNumber(headers.getContentLength());
		return length == null ? getBodyLength(body) : length;
	};
	return async (config) => {
		let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength } = resolveConfig$1(config);
		const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
		const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
		const own = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
		let _fetch = envFetch || fetch;
		responseType = responseType ? (responseType + "").toLowerCase() : "text";
		let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
		let request = null;
		const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
			composedSignal.unsubscribe();
		});
		let requestContentLength;
		let pendingBodyError = null;
		const maxBodyLengthError = () => new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, config, request);
		try {
			let auth = void 0;
			const configAuth = own("auth");
			if (configAuth) auth = {
				username: utils_default.getSafeProp(configAuth, "username") || "",
				password: utils_default.getSafeProp(configAuth, "password") || ""
			};
			if (maybeWithAuthCredentials(url)) {
				const parsedURL = new URL(url, platform_default.origin);
				if (!auth && (parsedURL.username || parsedURL.password)) auth = {
					username: decodeURIComponentSafe(parsedURL.username),
					password: decodeURIComponentSafe(parsedURL.password)
				};
				if (parsedURL.username || parsedURL.password) {
					parsedURL.username = "";
					parsedURL.password = "";
					url = parsedURL.href;
				}
			}
			if (auth) {
				headers.delete("authorization");
				headers.set("Authorization", "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || ""))));
			}
			if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
				if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
			}
			if (hasMaxBodyLength && method !== "get" && method !== "head") {
				const outboundLength = await getBodyLength(data);
				if (typeof outboundLength === "number" && isFinite(outboundLength)) {
					requestContentLength = outboundLength;
					if (outboundLength > maxBodyLength) throw maxBodyLengthError();
				}
			}
			const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
			const trackRequestStream = (stream, onProgress, flush) => trackStream(stream, DEFAULT_CHUNK_SIZE, (loadedBytes) => {
				if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
				onProgress && onProgress(loadedBytes);
			}, flush);
			if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
				requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
				if (requestContentLength !== 0 || mustEnforceStreamBody) {
					let _request = new Request(url, {
						method: "POST",
						body: data,
						duplex: "half"
					});
					let contentTypeHeader;
					if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
					if (_request.body) {
						const [onProgress, flush] = onUploadProgress && progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))) || [];
						data = trackRequestStream(_request.body, onProgress, flush);
					}
				}
			} else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") data = trackRequestStream(data);
			else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") throw new AxiosError$1("Stream request bodies are not supported by the current fetch implementation", AxiosError$1.ERR_NOT_SUPPORT, config, request);
			if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
			const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
			if (utils_default.isFormData(data)) {
				const contentType = headers.getContentType();
				if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
			}
			headers.set("User-Agent", "axios/" + VERSION$1, false);
			const resolvedOptions = {
				...fetchOptions,
				signal: composedSignal,
				method: method.toUpperCase(),
				headers: toByteStringHeaderObject(headers.normalize()),
				body: data,
				duplex: "half",
				credentials: isCredentialsSupported ? withCredentials : void 0
			};
			request = isRequestSupported && new Request(url, resolvedOptions);
			let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
			const responseHeaders = AxiosHeaders$1.from(response.headers);
			if (hasMaxContentLength) {
				const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
			}
			const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
			if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
				const options = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((prop) => {
					options[prop] = response[prop];
				});
				const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
				let bytesRead = 0;
				const onChunkProgress = (loadedBytes) => {
					if (hasMaxContentLength) {
						bytesRead = loadedBytes;
						if (bytesRead > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
					}
					onProgress && onProgress(loadedBytes);
				};
				response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
					flush && flush();
					unsubscribe && unsubscribe();
				}), options);
			}
			responseType = responseType || "text";
			let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
			if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
				let materializedSize;
				if (responseData != null) {
					if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
					else if (typeof responseData.size === "number") materializedSize = responseData.size;
					else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
				}
				if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
			}
			!isStreamResponse && unsubscribe && unsubscribe();
			return await new Promise((resolve, reject) => {
				settle(resolve, reject, {
					data: responseData,
					headers: AxiosHeaders$1.from(response.headers),
					status: response.status,
					statusText: response.statusText,
					config,
					request
				});
			});
		} catch (err) {
			unsubscribe && unsubscribe();
			if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
				const canceledError = composedSignal.reason;
				canceledError.config = config;
				request && (canceledError.request = request);
				if (err !== canceledError) Object.defineProperty(canceledError, "cause", {
					__proto__: null,
					value: err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw canceledError;
			}
			if (pendingBodyError) {
				request && !pendingBodyError.request && (pendingBodyError.request = request);
				throw pendingBodyError;
			}
			if (err instanceof AxiosError$1) {
				request && !err.request && (err.request = request);
				throw err;
			}
			if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
				const networkError = new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request, err && err.response);
				Object.defineProperty(networkError, "cause", {
					__proto__: null,
					value: err.cause || err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw networkError;
			}
			throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
		}
	};
};
var seedCache = /* @__PURE__ */ new Map();
var getFetch = (config) => {
	let env = config && config.env || {};
	const { fetch, Request, Response } = env;
	const seeds = [
		Request,
		Response,
		fetch
	];
	let i = seeds.length, seed, target, map = seedCache;
	while (i--) {
		seed = seeds[i];
		target = map.get(seed);
		target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
		map = target;
	}
	return target;
};
getFetch();
//#endregion
//#region node_modules/axios/lib/adapters/adapters.js
/**
* Known adapters mapping.
* Provides environment-specific adapters for Axios:
* - `http` for Node.js
* - `xhr` for browsers
* - `fetch` for fetch API-based requests
*
* @type {Object<string, Function|Object>}
*/
var knownAdapters = {
	http: http_default,
	xhr: xhr_default,
	fetch: { get: getFetch }
};
utils_default.forEach(knownAdapters, (fn, value) => {
	if (fn) {
		try {
			Object.defineProperty(fn, "name", {
				__proto__: null,
				value
			});
		} catch (e) {}
		Object.defineProperty(fn, "adapterName", {
			__proto__: null,
			value
		});
	}
});
/**
* Render a rejection reason string for unknown or unsupported adapters
*
* @param {string} reason
* @returns {string}
*/
var renderReason = (reason) => `- ${reason}`;
/**
* Check if the adapter is resolved (function, null, or false)
*
* @param {Function|null|false} adapter
* @returns {boolean}
*/
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
/**
* Get the first suitable adapter from the provided list.
* Tries each adapter in order until a supported one is found.
* Throws an AxiosError if no adapter is suitable.
*
* @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
* @param {Object} config - Axios request configuration
* @throws {AxiosError} If no suitable adapter is available
* @returns {Function} The resolved adapter function
*/
function getAdapter$1(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter === void 0) throw new AxiosError$1(`Unknown adapter '${id}'`);
		}
		if (adapter && (utils_default.isFunction(adapter) || (adapter = adapter.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter;
	}
	if (!adapter) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		throw new AxiosError$1(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), AxiosError$1.ERR_NOT_SUPPORT);
	}
	return adapter;
}
/**
* Exports Axios adapters and utility to resolve an adapter
*/
var adapters_default = {
	/**
	* Resolve an adapter from a list of adapter names or functions.
	* @type {Function}
	*/
	getAdapter: getAdapter$1,
	/**
	* Exposes all known adapters
	* @type {Object<string, Function|Object>}
	*/
	adapters: knownAdapters
};
//#endregion
//#region node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError$1(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders$1.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders$1.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel$1(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/validator.js
var validators$1 = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((type, i) => {
	validators$1[type] = function validator(thing) {
		return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
	};
});
var deprecatedWarnings = {};
/**
* Transitional option validator
*
* @param {function|boolean?} validator - set to false if the transitional option has been removed
* @param {string?} version - deprecated version / removed since version
* @param {string?} message - some message with additional info
*
* @returns {function}
*/
validators$1.transitional = function transitional(validator, version, message) {
	function formatMessage(opt, desc) {
		return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
	}
	return (value, opt, opts) => {
		if (validator === false) throw new AxiosError$1(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError$1.ERR_DEPRECATED);
		if (version && !deprecatedWarnings[opt]) {
			deprecatedWarnings[opt] = true;
			console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
		}
		return validator ? validator(value, opt, opts) : true;
	};
};
validators$1.spelling = function spelling(correctSpelling) {
	return (value, opt) => {
		console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
		return true;
	};
};
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object" || options === null) throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
	}
}
var validator_default = {
	assertOptions,
	validators: validators$1
};
//#endregion
//#region node_modules/axios/lib/core/Axios.js
var validators = validator_default.validators;
/**
* Create a new instance of Axios
*
* @param {Object} instanceConfig The default config for the instance
*
* @return {Axios} A new instance of Axios
*/
var Axios$1 = class {
	constructor(instanceConfig) {
		this.defaults = instanceConfig || {};
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager()
		};
	}
	/**
	* Dispatch a request
	*
	* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	* @param {?Object} config
	*
	* @returns {Promise} The Promise to be fulfilled
	*/
	async request(configOrUrl, config) {
		try {
			return await this._request(configOrUrl, config);
		} catch (err) {
			if (err instanceof Error) {
				let dummy = {};
				Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
				const stack = (() => {
					if (!dummy.stack) return "";
					const firstNewlineIndex = dummy.stack.indexOf("\n");
					return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
				})();
				try {
					if (!err.stack) err.stack = stack;
					else if (stack) {
						const firstNewlineIndex = stack.indexOf("\n");
						const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
						const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
						if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
					}
				} catch (e) {}
			}
			throw err;
		}
	}
	_request(configOrUrl, config) {
		if (typeof configOrUrl === "string") {
			config = config || {};
			config.url = configOrUrl;
		} else config = configOrUrl || {};
		config = mergeConfig$2(this.defaults, config);
		const { transitional, paramsSerializer, headers } = config;
		if (transitional !== void 0) validator_default.assertOptions(transitional, {
			silentJSONParsing: validators.transitional(validators.boolean),
			forcedJSONParsing: validators.transitional(validators.boolean),
			clarifyTimeoutError: validators.transitional(validators.boolean),
			legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
			advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
			validateStatusUndefinedResolves: validators.transitional(validators.boolean)
		}, false);
		if (paramsSerializer != null) {
			if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
			else validator_default.assertOptions(paramsSerializer, {
				encode: validators.function,
				serialize: validators.function
			}, true);
		}
		if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
		else config.allowAbsoluteUrls = true;
		validator_default.assertOptions(config, {
			baseUrl: validators.spelling("baseURL"),
			withXsrfToken: validators.spelling("withXSRFToken")
		}, true);
		config.method = (config.method || this.defaults.method || "get").toLowerCase();
		let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
		headers && utils_default.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query",
			"common"
		], (method) => {
			delete headers[method];
		});
		config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
		const requestInterceptorChain = [];
		let synchronousRequestInterceptors = true;
		this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
			if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
			synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
			const transitional = config.transitional || transitional_default;
			if (transitional && transitional.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		const responseInterceptorChain = [];
		this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
			responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		let promise;
		let i = 0;
		let len;
		if (!synchronousRequestInterceptors) {
			const chain = [dispatchRequest.bind(this), void 0];
			chain.unshift(...requestInterceptorChain);
			chain.push(...responseInterceptorChain);
			len = chain.length;
			promise = Promise.resolve(config);
			while (i < len) promise = promise.then(chain[i++], chain[i++]);
			return promise;
		}
		len = requestInterceptorChain.length;
		let newConfig = config;
		while (i < len) {
			const onFulfilled = requestInterceptorChain[i++];
			const onRejected = requestInterceptorChain[i++];
			try {
				newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
			} catch (error) {
				if (!onRejected) {
					promise = Promise.reject(error);
					break;
				}
				try {
					const rejectedResult = onRejected.call(this, error);
					if (utils_default.isThenable(rejectedResult)) promise = Promise.resolve(rejectedResult).then(() => dispatchRequest.call(this, newConfig));
				} catch (rejectedError) {
					promise = Promise.reject(rejectedError);
				}
				break;
			}
		}
		if (!promise) try {
			promise = dispatchRequest.call(this, newConfig);
		} catch (error) {
			promise = Promise.reject(error);
		}
		i = 0;
		len = responseInterceptorChain.length;
		while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
		return promise;
	}
	getUri(config) {
		config = mergeConfig$2(this.defaults, config);
		return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config), config.params, config.paramsSerializer);
	}
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"options"
], function forEachMethodNoData(method) {
	Axios$1.prototype[method] = function(url, config) {
		return this.request(mergeConfig$2(config || {}, {
			method,
			url,
			data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
		}));
	};
});
utils_default.forEach([
	"post",
	"put",
	"patch",
	"query"
], function forEachMethodWithData(method) {
	function generateHTTPMethod(isForm) {
		return function httpMethod(url, data, config) {
			return this.request(mergeConfig$2(config || {}, {
				method,
				headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
				url,
				data
			}));
		};
	}
	Axios$1.prototype[method] = generateHTTPMethod();
	if (method !== "query") Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
//#endregion
//#region node_modules/axios/lib/cancel/CancelToken.js
/**
* A `CancelToken` is an object that can be used to request cancellation of an operation.
*
* @param {Function} executor The executor function.
*
* @returns {CancelToken}
*/
var CancelToken$1 = class CancelToken$1 {
	constructor(executor) {
		if (typeof executor !== "function") throw new TypeError("executor must be a function.");
		let resolvePromise;
		this.promise = new Promise(function promiseExecutor(resolve) {
			resolvePromise = resolve;
		});
		const token = this;
		this.promise.then((cancel) => {
			if (!token._listeners) return;
			let i = token._listeners.length;
			while (i-- > 0) token._listeners[i](cancel);
			token._listeners = null;
		});
		this.promise.then = (onfulfilled) => {
			let _resolve;
			const promise = new Promise((resolve) => {
				token.subscribe(resolve);
				_resolve = resolve;
			}).then(onfulfilled);
			promise.cancel = function reject() {
				token.unsubscribe(_resolve);
			};
			return promise;
		};
		executor(function cancel(message, config, request) {
			if (token.reason) return;
			token.reason = new CanceledError$1(message, config, request);
			resolvePromise(token.reason);
		});
	}
	/**
	* Throws a `CanceledError` if cancellation has been requested.
	*/
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	/**
	* Subscribe to the cancel signal
	*/
	subscribe(listener) {
		if (this.reason) {
			listener(this.reason);
			return;
		}
		if (this._listeners) this._listeners.push(listener);
		else this._listeners = [listener];
	}
	/**
	* Unsubscribe from the cancel signal
	*/
	unsubscribe(listener) {
		if (!this._listeners) return;
		const index = this._listeners.indexOf(listener);
		if (index !== -1) this._listeners.splice(index, 1);
	}
	toAbortSignal() {
		const controller = new AbortController();
		const abort = (err) => {
			controller.abort(err);
		};
		this.subscribe(abort);
		controller.signal.unsubscribe = () => this.unsubscribe(abort);
		return controller.signal;
	}
	/**
	* Returns an object that contains a new `CancelToken` and a function that, when called,
	* cancels the `CancelToken`.
	*/
	static source() {
		let cancel;
		return {
			token: new CancelToken$1(function executor(c) {
				cancel = c;
			}),
			cancel
		};
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  const args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread$1(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError$1(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
//#endregion
//#region node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode$1 = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerReturnsAnUnknownError: 520,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
	HttpStatusCode$1[value] = key;
});
//#endregion
//#region node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios$1(defaultConfig);
	const instance = bind(Axios$1.prototype.request, context);
	utils_default.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig$2(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
	return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$2;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
//#endregion
//#region node_modules/axios/index.js
var { Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig: mergeConfig$1, create } = axios;
//#endregion
//#region node_modules/@inertiajs/core/dist/index.esm.js
var Config = class {
	constructor(defaults) {
		this.config = {};
		this.defaults = defaults;
	}
	extend(defaults) {
		if (defaults) this.defaults = {
			...this.defaults,
			...defaults
		};
		return this;
	}
	replace(newConfig) {
		this.config = newConfig;
	}
	get(key) {
		return has(this.config, key) ? get(this.config, key) : get(this.defaults, key);
	}
	set(keyOrValues, value) {
		if (typeof keyOrValues === "string") set(this.config, keyOrValues, value);
		else Object.entries(keyOrValues).forEach(([key, val]) => {
			set(this.config, key, val);
		});
	}
};
var config$1 = new Config({
	form: {
		recentlySuccessfulDuration: 2e3,
		forceIndicesArrayFormatInFormData: true,
		withAllErrors: false
	},
	future: {
		preserveEqualProps: false,
		useDataInertiaHeadAttribute: false,
		useDialogForErrorModal: false,
		useScriptElementForInitialPage: false
	},
	prefetch: {
		cacheFor: 3e4,
		hoverDelay: 75
	}
});
function debounce(fn, delay) {
	let timeoutID;
	return function(...args) {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => fn.apply(this, args), delay);
	};
}
function fireEvent(name, options) {
	return document.dispatchEvent(new CustomEvent(`inertia:${name}`, options));
}
var fireBeforeEvent = (visit) => {
	return fireEvent("before", {
		cancelable: true,
		detail: { visit }
	});
};
var fireErrorEvent = (errors) => {
	return fireEvent("error", { detail: { errors } });
};
var fireExceptionEvent = (exception) => {
	return fireEvent("exception", {
		cancelable: true,
		detail: { exception }
	});
};
var fireFinishEvent = (visit) => {
	return fireEvent("finish", { detail: { visit } });
};
var fireInvalidEvent = (response) => {
	return fireEvent("invalid", {
		cancelable: true,
		detail: { response }
	});
};
var fireBeforeUpdateEvent = (page2) => {
	return fireEvent("beforeUpdate", { detail: { page: page2 } });
};
var fireNavigateEvent = (page2) => {
	return fireEvent("navigate", { detail: { page: page2 } });
};
var fireProgressEvent = (progress3) => {
	return fireEvent("progress", { detail: { progress: progress3 } });
};
var fireStartEvent = (visit) => {
	return fireEvent("start", { detail: { visit } });
};
var fireSuccessEvent = (page2) => {
	return fireEvent("success", { detail: { page: page2 } });
};
var firePrefetchedEvent = (response, visit) => {
	return fireEvent("prefetched", { detail: {
		fetchedAt: Date.now(),
		response: response.data,
		visit
	} });
};
var firePrefetchingEvent = (visit) => {
	return fireEvent("prefetching", { detail: { visit } });
};
var fireFlashEvent = (flash) => {
	return fireEvent("flash", { detail: { flash } });
};
var SessionStorage = class {
	static set(key, value) {
		if (typeof window !== "undefined") window.sessionStorage.setItem(key, JSON.stringify(value));
	}
	static get(key) {
		if (typeof window !== "undefined") return JSON.parse(window.sessionStorage.getItem(key) || "null");
	}
	static merge(key, value) {
		const existing = this.get(key);
		if (existing === null) this.set(key, value);
		else this.set(key, {
			...existing,
			...value
		});
	}
	static remove(key) {
		if (typeof window !== "undefined") window.sessionStorage.removeItem(key);
	}
	static removeNested(key, nestedKey) {
		const existing = this.get(key);
		if (existing !== null) {
			delete existing[nestedKey];
			this.set(key, existing);
		}
	}
	static exists(key) {
		try {
			return this.get(key) !== null;
		} catch (error) {
			return false;
		}
	}
	static clear() {
		if (typeof window !== "undefined") window.sessionStorage.clear();
	}
};
SessionStorage.locationVisitKey = "inertiaLocationVisit";
var encryptHistory = async (data) => {
	if (typeof window === "undefined") throw new Error("Unable to encrypt history");
	const iv = getIv();
	const key = await getOrCreateKey(await getKeyFromSessionStorage());
	if (!key) throw new Error("Unable to encrypt history");
	return await encryptData(iv, key, data);
};
var historySessionStorageKeys = {
	key: "historyKey",
	iv: "historyIv"
};
var decryptHistory = async (data) => {
	const iv = getIv();
	const storedKey = await getKeyFromSessionStorage();
	if (!storedKey) throw new Error("Unable to decrypt history");
	return await decryptData(iv, storedKey, data);
};
var encryptData = async (iv, key, data) => {
	if (typeof window === "undefined") throw new Error("Unable to encrypt history");
	if (typeof window.crypto.subtle === "undefined") {
		console.warn("Encryption is not supported in this environment. SSL is required.");
		return Promise.resolve(data);
	}
	const textEncoder = new TextEncoder();
	const str = JSON.stringify(data);
	const encoded = new Uint8Array(str.length * 3);
	const result = textEncoder.encodeInto(str, encoded);
	return window.crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, encoded.subarray(0, result.written));
};
var decryptData = async (iv, key, data) => {
	if (typeof window.crypto.subtle === "undefined") {
		console.warn("Decryption is not supported in this environment. SSL is required.");
		return Promise.resolve(data);
	}
	const decrypted = await window.crypto.subtle.decrypt({
		name: "AES-GCM",
		iv
	}, key, data);
	return JSON.parse(new TextDecoder().decode(decrypted));
};
var getIv = () => {
	const ivString = SessionStorage.get(historySessionStorageKeys.iv);
	if (ivString) return new Uint8Array(ivString);
	const iv = window.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
	SessionStorage.set(historySessionStorageKeys.iv, Array.from(iv));
	return iv;
};
var createKey = async () => {
	if (typeof window.crypto.subtle === "undefined") {
		console.warn("Encryption is not supported in this environment. SSL is required.");
		return Promise.resolve(null);
	}
	return window.crypto.subtle.generateKey({
		name: "AES-GCM",
		length: 256
	}, true, ["encrypt", "decrypt"]);
};
var saveKey = async (key) => {
	if (typeof window.crypto.subtle === "undefined") {
		console.warn("Encryption is not supported in this environment. SSL is required.");
		return Promise.resolve();
	}
	const keyData = await window.crypto.subtle.exportKey("raw", key);
	SessionStorage.set(historySessionStorageKeys.key, Array.from(new Uint8Array(keyData)));
};
var getOrCreateKey = async (key) => {
	if (key) return key;
	const newKey = await createKey();
	if (!newKey) return null;
	await saveKey(newKey);
	return newKey;
};
var getKeyFromSessionStorage = async () => {
	const stringKey = SessionStorage.get(historySessionStorageKeys.key);
	if (!stringKey) return null;
	return await window.crypto.subtle.importKey("raw", new Uint8Array(stringKey), {
		name: "AES-GCM",
		length: 256
	}, true, ["encrypt", "decrypt"]);
};
var stripTopLevelUndefined = (obj) => {
	const result = {};
	for (const key of Object.keys(obj)) if (obj[key] !== void 0) result[key] = obj[key];
	return result;
};
var objectsAreEqual = (obj1, obj2, excludeKeys) => {
	if (obj1 === obj2) return true;
	for (const key in obj1) {
		if (excludeKeys.includes(key)) continue;
		if (obj1[key] === obj2[key]) continue;
		if (!compareValues(obj1[key], obj2[key])) return false;
	}
	for (const key in obj2) {
		if (excludeKeys.includes(key)) continue;
		if (!(key in obj1)) return false;
	}
	return true;
};
var compareValues = (value1, value2) => {
	switch (typeof value1) {
		case "object": return objectsAreEqual(value1, value2, []);
		case "function": return value1.toString() === value2.toString();
		default: return value1 === value2;
	}
};
var conversionMap = {
	ms: 1,
	s: 1e3,
	m: 6e4,
	h: 36e5,
	d: 864e5
};
var timeToMs = (time) => {
	if (typeof time === "number") return time;
	for (const [unit, conversion] of Object.entries(conversionMap)) if (time.endsWith(unit)) return parseFloat(time) * conversion;
	return parseInt(time);
};
var PrefetchedRequests = class {
	constructor() {
		this.cached = [];
		this.inFlightRequests = [];
		this.removalTimers = [];
		this.currentUseId = null;
	}
	add(params, sendFunc, { cacheFor, cacheTags }) {
		if (this.findInFlight(params)) return Promise.resolve();
		const existing = this.findCached(params);
		if (!params.fresh && existing && existing.staleTimestamp > Date.now()) return Promise.resolve();
		const [stale, prefetchExpiresIn] = this.extractStaleValues(cacheFor);
		const promise = new Promise((resolve, reject) => {
			sendFunc({
				...params,
				onCancel: () => {
					this.remove(params);
					params.onCancel();
					reject();
				},
				onError: (error) => {
					this.remove(params);
					params.onError(error);
					reject();
				},
				onPrefetching(visitParams) {
					params.onPrefetching(visitParams);
				},
				onPrefetched(response, visit) {
					params.onPrefetched(response, visit);
				},
				onPrefetchResponse(response) {
					resolve(response);
				},
				onPrefetchError(error) {
					prefetchedRequests.removeFromInFlight(params);
					reject(error);
				}
			});
		}).then((response) => {
			this.remove(params);
			const pageResponse = response.getPageResponse();
			page.mergeOncePropsIntoResponse(pageResponse);
			this.cached.push({
				params: { ...params },
				staleTimestamp: Date.now() + stale,
				expiresAt: Date.now() + prefetchExpiresIn,
				response: promise,
				singleUse: prefetchExpiresIn === 0,
				timestamp: Date.now(),
				inFlight: false,
				tags: Array.isArray(cacheTags) ? cacheTags : [cacheTags]
			});
			const oncePropExpiresIn = this.getShortestOncePropTtl(pageResponse);
			this.scheduleForRemoval(params, oncePropExpiresIn ? Math.min(prefetchExpiresIn, oncePropExpiresIn) : prefetchExpiresIn);
			this.removeFromInFlight(params);
			response.handlePrefetch();
			return response;
		});
		this.inFlightRequests.push({
			params: { ...params },
			response: promise,
			staleTimestamp: null,
			inFlight: true
		});
		return promise;
	}
	removeAll() {
		this.cached = [];
		this.removalTimers.forEach((removalTimer) => {
			clearTimeout(removalTimer.timer);
		});
		this.removalTimers = [];
	}
	removeByTags(tags) {
		this.cached = this.cached.filter((prefetched) => {
			return !prefetched.tags.some((tag) => tags.includes(tag));
		});
	}
	remove(params) {
		this.cached = this.cached.filter((prefetched) => {
			return !this.paramsAreEqual(prefetched.params, params);
		});
		this.clearTimer(params);
	}
	removeFromInFlight(params) {
		this.inFlightRequests = this.inFlightRequests.filter((prefetching) => {
			return !this.paramsAreEqual(prefetching.params, params);
		});
	}
	extractStaleValues(cacheFor) {
		const [stale, expires] = this.cacheForToStaleAndExpires(cacheFor);
		return [timeToMs(stale), timeToMs(expires)];
	}
	cacheForToStaleAndExpires(cacheFor) {
		if (!Array.isArray(cacheFor)) return [cacheFor, cacheFor];
		switch (cacheFor.length) {
			case 0: return [0, 0];
			case 1: return [cacheFor[0], cacheFor[0]];
			default: return [cacheFor[0], cacheFor[1]];
		}
	}
	clearTimer(params) {
		const timer = this.removalTimers.find((removalTimer) => {
			return this.paramsAreEqual(removalTimer.params, params);
		});
		if (timer) {
			clearTimeout(timer.timer);
			this.removalTimers = this.removalTimers.filter((removalTimer) => removalTimer !== timer);
		}
	}
	scheduleForRemoval(params, expiresIn) {
		if (typeof window === "undefined") return;
		this.clearTimer(params);
		if (expiresIn > 0) {
			const timer = window.setTimeout(() => this.remove(params), expiresIn);
			this.removalTimers.push({
				params,
				timer
			});
		}
	}
	get(params) {
		return this.findCached(params) || this.findInFlight(params);
	}
	use(prefetched, params) {
		const id = `${params.url.pathname}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
		this.currentUseId = id;
		return prefetched.response.then((response) => {
			if (this.currentUseId !== id) return;
			response.mergeParams({
				...params,
				onPrefetched: () => {}
			});
			this.removeSingleUseItems(params);
			return response.handle();
		});
	}
	removeSingleUseItems(params) {
		this.cached = this.cached.filter((prefetched) => {
			if (!this.paramsAreEqual(prefetched.params, params)) return true;
			return !prefetched.singleUse;
		});
	}
	findCached(params) {
		return this.cached.find((prefetched) => {
			return this.paramsAreEqual(prefetched.params, params);
		}) || null;
	}
	findInFlight(params) {
		return this.inFlightRequests.find((prefetched) => {
			return this.paramsAreEqual(prefetched.params, params);
		}) || null;
	}
	withoutPurposePrefetchHeader(params) {
		const newParams = cloneDeep(params);
		if (newParams.headers["Purpose"] === "prefetch") delete newParams.headers["Purpose"];
		return newParams;
	}
	paramsAreEqual(params1, params2) {
		return objectsAreEqual(this.withoutPurposePrefetchHeader(params1), this.withoutPurposePrefetchHeader(params2), [
			"showProgress",
			"replace",
			"prefetch",
			"preserveScroll",
			"preserveState",
			"onBefore",
			"onBeforeUpdate",
			"onStart",
			"onProgress",
			"onFinish",
			"onCancel",
			"onSuccess",
			"onError",
			"onFlash",
			"onPrefetched",
			"onCancelToken",
			"onPrefetching",
			"async",
			"viewTransition"
		]);
	}
	updateCachedOncePropsFromCurrentPage() {
		this.cached.forEach((prefetched) => {
			prefetched.response.then((response) => {
				const pageResponse = response.getPageResponse();
				page.mergeOncePropsIntoResponse(pageResponse, { force: true });
				for (const [group, deferredProps] of Object.entries(pageResponse.deferredProps ?? {})) {
					const remaining = deferredProps.filter((prop) => pageResponse.props[prop] === void 0);
					if (remaining.length > 0) pageResponse.deferredProps[group] = remaining;
					else delete pageResponse.deferredProps[group];
				}
				const oncePropExpiresIn = this.getShortestOncePropTtl(pageResponse);
				if (oncePropExpiresIn === null) return;
				const prefetchExpiresIn = prefetched.expiresAt - Date.now();
				const expiresIn = Math.min(prefetchExpiresIn, oncePropExpiresIn);
				if (expiresIn > 0) this.scheduleForRemoval(prefetched.params, expiresIn);
				else this.remove(prefetched.params);
			});
		});
	}
	getShortestOncePropTtl(page2) {
		const expiryTimestamps = Object.values(page2.onceProps ?? {}).map((onceProp) => onceProp.expiresAt).filter((expiresAt) => !!expiresAt);
		if (expiryTimestamps.length === 0) return null;
		return Math.min(...expiryTimestamps) - Date.now();
	}
};
var prefetchedRequests = new PrefetchedRequests();
var elementInViewport = (el) => {
	if (el.offsetParent === null) return false;
	const rect = el.getBoundingClientRect();
	const verticallyVisible = rect.top < window.innerHeight && rect.bottom >= 0;
	const horizontallyVisible = rect.left < window.innerWidth && rect.right >= 0;
	return verticallyVisible && horizontallyVisible;
};
var getScrollableParent = (element) => {
	const allowsVerticalScroll = (el) => {
		const computedStyle = window.getComputedStyle(el);
		if (["scroll", "overlay"].includes(computedStyle.overflowY)) return true;
		if (computedStyle.overflowY !== "auto") return false;
		if (["visible", "clip"].includes(computedStyle.overflowX)) return true;
		return hasDimensionConstraint(computedStyle.maxHeight, el.style.height) || isConstrainedByLayout(el, "height");
	};
	const allowsHorizontalScroll = (el) => {
		const computedStyle = window.getComputedStyle(el);
		if (["scroll", "overlay"].includes(computedStyle.overflowX)) return true;
		if (computedStyle.overflowX !== "auto") return false;
		if (["visible", "clip"].includes(computedStyle.overflowY)) return true;
		return hasDimensionConstraint(computedStyle.maxWidth, el.style.width) || isConstrainedByLayout(el, "width");
	};
	const hasDimensionConstraint = (computedMaxDimension, inlineStyleDimension) => {
		if (computedMaxDimension && computedMaxDimension !== "none" && computedMaxDimension !== "0px") return true;
		if (inlineStyleDimension && inlineStyleDimension !== "auto" && inlineStyleDimension !== "0") return true;
		return false;
	};
	const isConstrainedByLayout = (el, dimension) => {
		const parent2 = el.parentElement;
		if (!parent2) return false;
		const parentStyle = window.getComputedStyle(parent2);
		if (["flex", "inline-flex"].includes(parentStyle.display)) {
			const isColumnLayout = ["column", "column-reverse"].includes(parentStyle.flexDirection);
			return dimension === "height" ? isColumnLayout : !isColumnLayout;
		}
		return ["grid", "inline-grid"].includes(parentStyle.display);
	};
	let parent = element?.parentElement;
	while (parent) {
		const allowsScroll = allowsVerticalScroll(parent) || allowsHorizontalScroll(parent);
		if (window.getComputedStyle(parent).display !== "contents" && allowsScroll) return parent;
		parent = parent.parentElement;
	}
	return null;
};
var getElementsInViewportFromCollection = (elements, referenceElement) => {
	if (!referenceElement) return elements.filter((element) => elementInViewport(element));
	const referenceIndex = elements.indexOf(referenceElement);
	const upwardElements = [];
	const downwardElements = [];
	for (let i = referenceIndex; i >= 0; i--) {
		const element = elements[i];
		if (elementInViewport(element)) upwardElements.push(element);
		else break;
	}
	for (let i = referenceIndex + 1; i < elements.length; i++) {
		const element = elements[i];
		if (elementInViewport(element)) downwardElements.push(element);
		else break;
	}
	return [...upwardElements.reverse(), ...downwardElements];
};
var requestAnimationFrame = (cb, times = 1) => {
	window.requestAnimationFrame(() => {
		if (times > 1) requestAnimationFrame(cb, times - 1);
		else cb();
	});
};
var getInitialPageFromDOM = (id, useScriptElement = false) => {
	if (typeof window === "undefined") return null;
	if (!useScriptElement) {
		const el = document.getElementById(id);
		if (el?.dataset.page) return JSON.parse(el.dataset.page);
	}
	const scriptEl = document.querySelector(`script[data-page="${id}"][type="application/json"]`);
	if (scriptEl?.textContent) return JSON.parse(scriptEl.textContent);
	return null;
};
var isServer = typeof window === "undefined";
var isFirefox = !isServer && /Firefox/i.test(window.navigator.userAgent);
var Scroll = class {
	static save() {
		history.saveScrollPositions(this.getScrollRegions());
	}
	static getScrollRegions() {
		return Array.from(this.regions()).map((region) => ({
			top: region.scrollTop,
			left: region.scrollLeft
		}));
	}
	static regions() {
		return document.querySelectorAll("[scroll-region]");
	}
	static scrollToTop() {
		if (isFirefox && getComputedStyle(document.documentElement).scrollBehavior === "smooth") return requestAnimationFrame(() => window.scrollTo(0, 0), 2);
		window.scrollTo(0, 0);
	}
	static reset() {
		if (!(isServer ? null : window.location.hash)) this.scrollToTop();
		this.regions().forEach((region) => {
			if (typeof region.scrollTo === "function") region.scrollTo(0, 0);
			else {
				region.scrollTop = 0;
				region.scrollLeft = 0;
			}
		});
		this.save();
		this.scrollToAnchor();
	}
	static scrollToAnchor() {
		const anchorHash = isServer ? null : window.location.hash;
		if (anchorHash) setTimeout(() => {
			const anchorElement = document.getElementById(anchorHash.slice(1));
			anchorElement ? anchorElement.scrollIntoView() : this.scrollToTop();
		});
	}
	static restore(scrollRegions) {
		if (isServer) return;
		window.requestAnimationFrame(() => {
			this.restoreDocument();
			this.restoreScrollRegions(scrollRegions);
		});
	}
	static restoreScrollRegions(scrollRegions) {
		if (isServer) return;
		this.regions().forEach((region, index) => {
			const scrollPosition = scrollRegions[index];
			if (!scrollPosition) return;
			if (typeof region.scrollTo === "function") region.scrollTo(scrollPosition.left, scrollPosition.top);
			else {
				region.scrollTop = scrollPosition.top;
				region.scrollLeft = scrollPosition.left;
			}
		});
	}
	static restoreDocument() {
		const scrollPosition = history.getDocumentScrollPosition();
		window.scrollTo(scrollPosition.left, scrollPosition.top);
	}
	static onScroll(event) {
		const target = event.target;
		if (typeof target.hasAttribute === "function" && target.hasAttribute("scroll-region")) this.save();
	}
	static onWindowScroll() {
		history.saveDocumentScrollPosition({
			top: window.scrollY,
			left: window.scrollX
		});
	}
};
var isFile$1 = (value) => typeof File !== "undefined" && value instanceof File || value instanceof Blob || typeof FileList !== "undefined" && value instanceof FileList && value.length > 0;
function hasFiles$1(data) {
	return isFile$1(data) || data instanceof FormData && Array.from(data.values()).some((value) => hasFiles$1(value)) || typeof data === "object" && data !== null && Object.values(data).some((value) => hasFiles$1(value));
}
var isFormData = (value) => value instanceof FormData;
function objectToFormData(source, form = new FormData(), parentKey = null, queryStringArrayFormat = "brackets") {
	source = source || {};
	for (const key in source) if (Object.prototype.hasOwnProperty.call(source, key)) append(form, composeKey(parentKey, key, "indices"), source[key], queryStringArrayFormat);
	return form;
}
function composeKey(parent, key, format) {
	if (!parent) return key;
	return format === "brackets" ? `${parent}[]` : `${parent}[${key}]`;
}
function append(form, key, value, format) {
	if (Array.isArray(value)) return Array.from(value.keys()).forEach((index) => append(form, composeKey(key, index.toString(), format), value[index], format));
	else if (value instanceof Date) return form.append(key, value.toISOString());
	else if (value instanceof File) return form.append(key, value, value.name);
	else if (value instanceof Blob) return form.append(key, value);
	else if (typeof value === "boolean") return form.append(key, value ? "1" : "0");
	else if (typeof value === "string") return form.append(key, value);
	else if (typeof value === "number") return form.append(key, `${value}`);
	else if (value === null || value === void 0) return form.append(key, "");
	objectToFormData(value, form, key, format);
}
function hrefToUrl(href) {
	return new URL(href.toString(), typeof window === "undefined" ? void 0 : window.location.toString());
}
var transformUrlAndData = (href, data, method, forceFormData, queryStringArrayFormat) => {
	let url = typeof href === "string" ? hrefToUrl(href) : href;
	if ((hasFiles$1(data) || forceFormData) && !isFormData(data)) {
		if (config$1.get("form.forceIndicesArrayFormatInFormData")) queryStringArrayFormat = "indices";
		data = objectToFormData(data, new FormData(), null, queryStringArrayFormat);
	}
	if (isFormData(data)) return [url, data];
	const [_href, _data] = mergeDataIntoQueryString(method, url, data, queryStringArrayFormat);
	return [hrefToUrl(_href), _data];
};
function mergeDataIntoQueryString(method, href, data, qsArrayFormat = "brackets") {
	const hasDataForQueryString = method === "get" && !isFormData(data) && Object.keys(data).length > 0;
	const hasHost = urlHasProtocol(href.toString());
	const hasAbsolutePath = hasHost || href.toString().startsWith("/") || href.toString() === "";
	const hasRelativePath = !hasAbsolutePath && !href.toString().startsWith("#") && !href.toString().startsWith("?");
	const hasRelativePathWithDotPrefix = /^[.]{1,2}([/]|$)/.test(href.toString());
	const hasSearch = href.toString().includes("?") || hasDataForQueryString;
	const hasHash = href.toString().includes("#");
	const url = new URL(href.toString(), typeof window === "undefined" ? "http://localhost" : window.location.toString());
	if (hasDataForQueryString) {
		const hasIndices = /\[\d+\]/.test(decodeURIComponent(url.search));
		url.search = import_lib.stringify({
			...import_lib.parse(url.search, {
				ignoreQueryPrefix: true,
				allowSparse: true
			}),
			...data
		}, {
			encodeValuesOnly: true,
			arrayFormat: hasIndices ? "indices" : qsArrayFormat
		});
	}
	return [[
		hasHost ? `${url.protocol}//${url.host}` : "",
		hasAbsolutePath ? url.pathname : "",
		hasRelativePath ? url.pathname.substring(hasRelativePathWithDotPrefix ? 0 : 1) : "",
		hasSearch ? url.search : "",
		hasHash ? url.hash : ""
	].join(""), hasDataForQueryString ? {} : data];
}
function urlWithoutHash$1(url) {
	url = new URL(url.href);
	url.hash = "";
	return url;
}
var setHashIfSameUrl = (originUrl, destinationUrl) => {
	if (originUrl.hash && !destinationUrl.hash && urlWithoutHash$1(originUrl).href === destinationUrl.href) destinationUrl.hash = originUrl.hash;
};
var isSameUrlWithoutHash$1 = (url1, url2) => {
	return urlWithoutHash$1(url1).href === urlWithoutHash$1(url2).href;
};
var isSameUrlWithoutQueryOrHash = (url1, url2) => {
	return url1.origin === url2.origin && url1.pathname === url2.pathname;
};
function isUrlMethodPair(href) {
	return href !== null && typeof href === "object" && href !== void 0 && "url" in href && "method" in href;
}
function urlHasProtocol(url) {
	return /^([a-z][a-z0-9+.-]*:)?\/\/[^/]/i.test(url);
}
function urlToString(url, absolute) {
	const urlObj = typeof url === "string" ? hrefToUrl(url) : url;
	return absolute ? `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}${urlObj.search}${urlObj.hash}` : `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
}
var CurrentPage = class {
	constructor() {
		this.componentId = {};
		this.listeners = [];
		this.isFirstPageLoad = true;
		this.cleared = false;
		this.pendingDeferredProps = null;
		this.historyQuotaExceeded = false;
	}
	init({ initialPage, swapComponent, resolveComponent, onFlash }) {
		this.page = {
			...initialPage,
			flash: initialPage.flash ?? {}
		};
		this.swapComponent = swapComponent;
		this.resolveComponent = resolveComponent;
		this.onFlashCallback = onFlash;
		eventHandler.on("historyQuotaExceeded", () => {
			this.historyQuotaExceeded = true;
		});
		return this;
	}
	set(page2, { replace = false, preserveScroll = false, preserveState = false, viewTransition = false } = {}) {
		if (Object.keys(page2.deferredProps || {}).length) {
			this.pendingDeferredProps = {
				deferredProps: page2.deferredProps,
				component: page2.component,
				url: page2.url
			};
			if (page2.initialDeferredProps === void 0) page2.initialDeferredProps = page2.deferredProps;
		}
		this.componentId = {};
		const componentId = this.componentId;
		if (page2.clearHistory) history.clear();
		return this.resolve(page2.component).then((component) => {
			if (componentId !== this.componentId) return;
			page2.rememberedState ?? (page2.rememberedState = {});
			const isServer3 = typeof window === "undefined";
			const location = !isServer3 ? window.location : new URL(page2.url);
			const scrollRegions = !isServer3 && preserveScroll ? Scroll.getScrollRegions() : [];
			replace = replace || isSameUrlWithoutHash$1(hrefToUrl(page2.url), location);
			const pageForHistory = {
				...page2,
				flash: {}
			};
			return new Promise((resolve) => replace ? history.replaceState(pageForHistory, resolve) : history.pushState(pageForHistory, resolve)).then(() => {
				const isNewComponent = !this.isTheSame(page2);
				if (!isNewComponent && Object.keys(page2.props.errors || {}).length > 0) viewTransition = false;
				this.page = page2;
				this.cleared = false;
				if (this.hasOnceProps()) prefetchedRequests.updateCachedOncePropsFromCurrentPage();
				if (isNewComponent) this.fireEventsFor("newComponent");
				if (this.isFirstPageLoad) this.fireEventsFor("firstLoad");
				this.isFirstPageLoad = false;
				if (this.historyQuotaExceeded) {
					this.historyQuotaExceeded = false;
					return;
				}
				return this.swap({
					component,
					page: page2,
					preserveState,
					viewTransition
				}).then(() => {
					if (preserveScroll) window.requestAnimationFrame(() => Scroll.restoreScrollRegions(scrollRegions));
					else Scroll.reset();
					if (this.pendingDeferredProps && this.pendingDeferredProps.component === page2.component && this.pendingDeferredProps.url === page2.url) eventHandler.fireInternalEvent("loadDeferredProps", this.pendingDeferredProps.deferredProps);
					this.pendingDeferredProps = null;
					if (!replace) fireNavigateEvent(page2);
				});
			});
		});
	}
	setQuietly(page2, { preserveState = false } = {}) {
		return this.resolve(page2.component).then((component) => {
			this.page = page2;
			this.cleared = false;
			history.setCurrent(page2);
			return this.swap({
				component,
				page: page2,
				preserveState,
				viewTransition: false
			});
		});
	}
	clear() {
		this.cleared = true;
	}
	isCleared() {
		return this.cleared;
	}
	get() {
		return this.page;
	}
	getWithoutFlashData() {
		return {
			...this.page,
			flash: {}
		};
	}
	hasOnceProps() {
		return Object.keys(this.page.onceProps ?? {}).length > 0;
	}
	merge(data) {
		this.page = {
			...this.page,
			...data
		};
	}
	setFlash(flash) {
		this.page = {
			...this.page,
			flash
		};
		this.onFlashCallback?.(flash);
	}
	setUrlHash(hash) {
		if (!this.page.url.includes(hash)) this.page.url += hash;
	}
	remember(data) {
		this.page.rememberedState = data;
	}
	swap({ component, page: page2, preserveState, viewTransition }) {
		const doSwap = () => this.swapComponent({
			component,
			page: page2,
			preserveState
		});
		if (!viewTransition || !document?.startViewTransition || document.visibilityState === "hidden") return doSwap();
		const viewTransitionCallback = typeof viewTransition === "boolean" ? () => null : viewTransition;
		return new Promise((resolve) => {
			const transitionResult = document.startViewTransition(() => doSwap().then(resolve));
			transitionResult.ready.catch(() => {});
			viewTransitionCallback(transitionResult);
		});
	}
	resolve(component) {
		return Promise.resolve(this.resolveComponent(component));
	}
	isTheSame(page2) {
		return this.page.component === page2.component;
	}
	on(event, callback) {
		this.listeners.push({
			event,
			callback
		});
		return () => {
			this.listeners = this.listeners.filter((listener) => listener.event !== event && listener.callback !== callback);
		};
	}
	fireEventsFor(event) {
		this.listeners.filter((listener) => listener.event === event).forEach((listener) => listener.callback());
	}
	mergeOncePropsIntoResponse(response, { force = false } = {}) {
		Object.entries(response.onceProps ?? {}).forEach(([key, onceProp]) => {
			const existingOnceProp = this.page.onceProps?.[key];
			if (existingOnceProp === void 0) return;
			if (force || response.props[onceProp.prop] === void 0) {
				response.props[onceProp.prop] = this.page.props[existingOnceProp.prop];
				response.onceProps[key].expiresAt = existingOnceProp.expiresAt;
			}
		});
	}
};
var page = new CurrentPage();
var Queue = class {
	constructor() {
		this.items = [];
		this.processingPromise = null;
	}
	add(item) {
		this.items.push(item);
		return this.process();
	}
	process() {
		this.processingPromise ?? (this.processingPromise = this.processNext().finally(() => {
			this.processingPromise = null;
		}));
		return this.processingPromise;
	}
	processNext() {
		const next = this.items.shift();
		if (next) return Promise.resolve(next()).then(() => this.processNext());
		return Promise.resolve();
	}
};
var isServer2 = typeof window === "undefined";
var queue = new Queue();
var isChromeIOS = !isServer2 && /CriOS/.test(window.navigator.userAgent);
var History = class {
	constructor() {
		this.rememberedState = "rememberedState";
		this.scrollRegions = "scrollRegions";
		this.preserveUrl = false;
		this.current = {};
		this.initialState = null;
	}
	remember(data, key) {
		this.replaceState({
			...page.getWithoutFlashData(),
			rememberedState: {
				...page.get()?.rememberedState ?? {},
				[key]: data
			}
		});
	}
	restore(key) {
		if (!isServer2) return this.current[this.rememberedState]?.[key] !== void 0 ? this.current[this.rememberedState]?.[key] : this.initialState?.[this.rememberedState]?.[key];
	}
	pushState(page2, cb = null) {
		if (isServer2) return;
		if (this.preserveUrl) {
			cb && cb();
			return;
		}
		this.current = page2;
		queue.add(() => {
			return this.getPageData(page2).then((data) => {
				const doPush = () => this.doPushState({ page: data }, page2.url).then(() => cb?.());
				if (isChromeIOS) return new Promise((resolve) => {
					setTimeout(() => doPush().then(resolve));
				});
				return doPush();
			});
		});
	}
	clonePageProps(page2) {
		try {
			structuredClone(page2.props);
			return page2;
		} catch {
			return {
				...page2,
				props: cloneDeep(page2.props)
			};
		}
	}
	getPageData(page2) {
		const pageWithClonedProps = this.clonePageProps(page2);
		return new Promise((resolve) => {
			return page2.encryptHistory ? encryptHistory(pageWithClonedProps).then(resolve) : resolve(pageWithClonedProps);
		});
	}
	processQueue() {
		return queue.process();
	}
	decrypt(page2 = null) {
		if (isServer2) return Promise.resolve(page2 ?? page.get());
		const pageData = page2 ?? window.history.state?.page;
		return this.decryptPageData(pageData).then((data) => {
			if (!data) throw new Error("Unable to decrypt history");
			if (this.initialState === null) this.initialState = data ?? void 0;
			else this.current = data ?? {};
			return data;
		});
	}
	decryptPageData(pageData) {
		return pageData instanceof ArrayBuffer ? decryptHistory(pageData) : Promise.resolve(pageData);
	}
	saveScrollPositions(scrollRegions) {
		queue.add(() => {
			return Promise.resolve().then(() => {
				if (!window.history.state?.page) return;
				if (isEqual(this.getScrollRegions(), scrollRegions)) return;
				return this.doReplaceState({
					page: window.history.state.page,
					scrollRegions
				});
			});
		});
	}
	saveDocumentScrollPosition(scrollRegion) {
		queue.add(() => {
			return Promise.resolve().then(() => {
				if (!window.history.state?.page) return;
				if (isEqual(this.getDocumentScrollPosition(), scrollRegion)) return;
				return this.doReplaceState({
					page: window.history.state.page,
					documentScrollPosition: scrollRegion
				});
			});
		});
	}
	getScrollRegions() {
		return window.history.state?.scrollRegions || [];
	}
	getDocumentScrollPosition() {
		return window.history.state?.documentScrollPosition || {
			top: 0,
			left: 0
		};
	}
	replaceState(page2, cb = null) {
		if (isEqual(this.current, page2)) {
			cb && cb();
			return;
		}
		const { flash, ...pageWithoutFlash } = page2;
		page.merge(pageWithoutFlash);
		if (isServer2) return;
		if (this.preserveUrl) {
			cb && cb();
			return;
		}
		this.current = page2;
		queue.add(() => {
			return this.getPageData(page2).then((data) => {
				const doReplace = () => this.doReplaceState({ page: data }, page2.url).then(() => cb?.());
				if (isChromeIOS) return new Promise((resolve) => {
					setTimeout(() => doReplace().then(resolve));
				});
				return doReplace();
			});
		});
	}
	isHistoryThrottleError(error) {
		return error instanceof Error && error.name === "SecurityError" && (error.message.includes("history.pushState") || error.message.includes("history.replaceState"));
	}
	isQuotaExceededError(error) {
		return error instanceof Error && error.name === "QuotaExceededError";
	}
	withThrottleProtection(cb) {
		return Promise.resolve().then(() => {
			try {
				return cb();
			} catch (error) {
				if (!this.isHistoryThrottleError(error)) throw error;
				console.error(error.message);
			}
		});
	}
	doReplaceState(data, url) {
		return this.withThrottleProtection(() => {
			window.history.replaceState({
				...data,
				scrollRegions: data.scrollRegions ?? window.history.state?.scrollRegions,
				documentScrollPosition: data.documentScrollPosition ?? window.history.state?.documentScrollPosition
			}, "", url);
		});
	}
	doPushState(data, url) {
		return this.withThrottleProtection(() => {
			try {
				window.history.pushState(data, "", url);
			} catch (error) {
				if (!this.isQuotaExceededError(error)) throw error;
				eventHandler.fireInternalEvent("historyQuotaExceeded", url);
			}
		});
	}
	getState(key, defaultValue) {
		return this.current?.[key] ?? defaultValue;
	}
	deleteState(key) {
		if (this.current[key] !== void 0) {
			delete this.current[key];
			this.replaceState(this.current);
		}
	}
	clearInitialState(key) {
		if (this.initialState && this.initialState[key] !== void 0) delete this.initialState[key];
	}
	browserHasHistoryEntry() {
		return !isServer2 && !!window.history.state?.page;
	}
	clear() {
		SessionStorage.remove(historySessionStorageKeys.key);
		SessionStorage.remove(historySessionStorageKeys.iv);
	}
	setCurrent(page2) {
		this.current = page2;
	}
	isValidState(state) {
		return !!state.page;
	}
	getAllState() {
		return this.current;
	}
};
if (typeof window !== "undefined" && window.history.scrollRestoration) window.history.scrollRestoration = "manual";
var history = new History();
var EventHandler = class {
	constructor() {
		this.internalListeners = [];
	}
	init() {
		if (typeof window !== "undefined") {
			window.addEventListener("popstate", this.handlePopstateEvent.bind(this));
			window.addEventListener("pageshow", this.handlePageshowEvent.bind(this));
			window.addEventListener("scroll", debounce(Scroll.onWindowScroll.bind(Scroll), 100), true);
		}
		if (typeof document !== "undefined") document.addEventListener("scroll", debounce(Scroll.onScroll.bind(Scroll), 100), true);
	}
	onGlobalEvent(type, callback) {
		const listener = ((event) => {
			const response = callback(event);
			if (event.cancelable && !event.defaultPrevented && response === false) event.preventDefault();
		});
		return this.registerListener(`inertia:${type}`, listener);
	}
	on(event, callback) {
		this.internalListeners.push({
			event,
			listener: callback
		});
		return () => {
			this.internalListeners = this.internalListeners.filter((listener) => listener.listener !== callback);
		};
	}
	onMissingHistoryItem() {
		page.clear();
		this.fireInternalEvent("missingHistoryItem");
	}
	fireInternalEvent(event, ...args) {
		this.internalListeners.filter((listener) => listener.event === event).forEach((listener) => listener.listener(...args));
	}
	registerListener(type, listener) {
		document.addEventListener(type, listener);
		return () => document.removeEventListener(type, listener);
	}
	handlePageshowEvent(event) {
		if (event.persisted) history.decrypt().catch(() => this.onMissingHistoryItem());
	}
	handlePopstateEvent(event) {
		const state = event.state || null;
		if (state === null) {
			const url = hrefToUrl(page.get().url);
			url.hash = window.location.hash;
			history.replaceState({
				...page.getWithoutFlashData(),
				url: url.href
			});
			Scroll.reset();
			return;
		}
		if (!history.isValidState(state)) return this.onMissingHistoryItem();
		history.decrypt(state.page).then((data) => {
			if (page.get().version !== data.version) {
				this.onMissingHistoryItem();
				return;
			}
			router.cancelAll({ prefetch: false });
			page.setQuietly(data, { preserveState: false }).then(() => {
				Scroll.restore(history.getScrollRegions());
				fireNavigateEvent(page.get());
				const pendingDeferred = {};
				const pageProps = page.get().props;
				for (const [group, props] of Object.entries(data.initialDeferredProps ?? data.deferredProps ?? {})) {
					const missing = props.filter((prop) => pageProps[prop] === void 0);
					if (missing.length > 0) pendingDeferred[group] = missing;
				}
				if (Object.keys(pendingDeferred).length > 0) this.fireInternalEvent("loadDeferredProps", pendingDeferred);
			});
		}).catch(() => {
			this.onMissingHistoryItem();
		});
	}
};
var eventHandler = new EventHandler();
var NavigationType = class {
	constructor() {
		this.type = this.resolveType();
	}
	resolveType() {
		if (typeof window === "undefined") return "navigate";
		if (window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation").length > 0) return window.performance.getEntriesByType("navigation")[0].type;
		return "navigate";
	}
	get() {
		return this.type;
	}
	isBackForward() {
		return this.type === "back_forward";
	}
	isReload() {
		return this.type === "reload";
	}
};
var navigationType = new NavigationType();
var InitialVisit = class {
	static handle() {
		this.clearRememberedStateOnReload();
		[
			this.handleBackForward,
			this.handleLocation,
			this.handleDefault
		].find((handler) => handler.bind(this)());
	}
	static clearRememberedStateOnReload() {
		if (navigationType.isReload()) {
			history.deleteState(history.rememberedState);
			history.clearInitialState(history.rememberedState);
		}
	}
	static handleBackForward() {
		if (!navigationType.isBackForward() || !history.browserHasHistoryEntry()) return false;
		const scrollRegions = history.getScrollRegions();
		history.decrypt().then((data) => {
			page.set(data, {
				preserveScroll: true,
				preserveState: true
			}).then(() => {
				Scroll.restore(scrollRegions);
				fireNavigateEvent(page.get());
			});
		}).catch(() => {
			eventHandler.onMissingHistoryItem();
		});
		return true;
	}
	/**
	* @link https://inertiajs.com/redirects#external-redirects
	*/
	static handleLocation() {
		if (!SessionStorage.exists(SessionStorage.locationVisitKey)) return false;
		const locationVisit = SessionStorage.get(SessionStorage.locationVisitKey) || {};
		SessionStorage.remove(SessionStorage.locationVisitKey);
		if (typeof window !== "undefined") page.setUrlHash(window.location.hash);
		history.decrypt(page.get()).then(() => {
			const rememberedState = history.getState(history.rememberedState, {});
			const scrollRegions = history.getScrollRegions();
			page.remember(rememberedState);
			page.set(page.get(), {
				preserveScroll: locationVisit.preserveScroll,
				preserveState: true
			}).then(() => {
				if (locationVisit.preserveScroll) Scroll.restore(scrollRegions);
				fireNavigateEvent(page.get());
			});
		}).catch(() => {
			eventHandler.onMissingHistoryItem();
		});
		return true;
	}
	static handleDefault() {
		if (typeof window !== "undefined") page.setUrlHash(window.location.hash);
		page.set(page.get(), {
			preserveScroll: true,
			preserveState: true
		}).then(() => {
			if (navigationType.isReload()) Scroll.restore(history.getScrollRegions());
			else Scroll.scrollToAnchor();
			const page2 = page.get();
			fireNavigateEvent(page2);
			const flash = page2.flash;
			if (Object.keys(flash).length > 0) queueMicrotask(() => fireFlashEvent(flash));
		});
	}
};
var Poll = class {
	constructor(interval, cb, options) {
		this.intervalId = null;
		this.timeoutId = null;
		this.throttle = false;
		this.keepAlive = false;
		this.cbCount = 0;
		this.inFlight = false;
		this.currentCancel = null;
		this.stopped = true;
		this.instanceId = 0;
		this.keepAlive = options.keepAlive ?? false;
		this.mode = options.mode ?? "overlap";
		this.cb = cb;
		this.interval = interval;
		if (options.autoStart ?? true) this.start();
	}
	stop() {
		this.stopped = true;
		this.instanceId++;
		this.inFlight = false;
		this.currentCancel = null;
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}
	start() {
		if (typeof window === "undefined") return;
		this.stop();
		this.stopped = false;
		if (this.mode === "rest") {
			this.scheduleNext();
			return;
		}
		this.intervalId = window.setInterval(() => this.tick(), this.interval);
	}
	isInBackground(hidden) {
		this.throttle = this.keepAlive ? false : hidden;
		if (this.throttle) this.cbCount = 0;
	}
	scheduleNext() {
		if (this.stopped) return;
		this.timeoutId = window.setTimeout(() => {
			this.timeoutId = null;
			this.tick();
		}, this.interval);
	}
	tick() {
		if (!this.throttle || this.cbCount % 10 === 0) this.fire();
		else if (this.mode === "rest") this.scheduleNext();
		if (this.throttle) this.cbCount++;
	}
	fire() {
		if (this.inFlight && this.mode === "cancel") this.currentCancel?.();
		const instance = this.instanceId;
		this.cb({
			onStart: (cancel) => {
				if (instance !== this.instanceId) return;
				this.inFlight = true;
				this.currentCancel = cancel;
			},
			onFinish: () => {
				if (instance !== this.instanceId) return;
				this.inFlight = false;
				this.currentCancel = null;
				if (this.mode === "rest") this.scheduleNext();
			}
		});
	}
};
var Polls = class {
	constructor() {
		this.polls = [];
		this.setupVisibilityListener();
	}
	get count() {
		return this.polls.length;
	}
	add(interval, cb, options) {
		const poll = new Poll(interval, cb, options);
		this.polls.push(poll);
		return {
			stop: () => poll.stop(),
			start: () => poll.start(),
			destroy: () => {
				poll.stop();
				this.polls = this.polls.filter((p) => p !== poll);
			}
		};
	}
	clear() {
		this.polls.forEach((poll) => poll.stop());
		this.polls = [];
	}
	setupVisibilityListener() {
		if (typeof document === "undefined") return;
		document.addEventListener("visibilitychange", () => {
			this.polls.forEach((poll) => poll.isInBackground(document.hidden));
		}, false);
	}
};
var polls = new Polls();
var RequestParams = class _RequestParams {
	constructor(params) {
		this.callbacks = [];
		if (!params.prefetch) this.params = params;
		else {
			const wrappedCallbacks = {
				onBefore: this.wrapCallback(params, "onBefore"),
				onBeforeUpdate: this.wrapCallback(params, "onBeforeUpdate"),
				onStart: this.wrapCallback(params, "onStart"),
				onProgress: this.wrapCallback(params, "onProgress"),
				onFinish: this.wrapCallback(params, "onFinish"),
				onCancel: this.wrapCallback(params, "onCancel"),
				onSuccess: this.wrapCallback(params, "onSuccess"),
				onError: this.wrapCallback(params, "onError"),
				onFlash: this.wrapCallback(params, "onFlash"),
				onCancelToken: this.wrapCallback(params, "onCancelToken"),
				onPrefetched: this.wrapCallback(params, "onPrefetched"),
				onPrefetching: this.wrapCallback(params, "onPrefetching")
			};
			this.params = {
				...params,
				...wrappedCallbacks,
				onPrefetchResponse: params.onPrefetchResponse || (() => {}),
				onPrefetchError: params.onPrefetchError || (() => {})
			};
		}
	}
	static create(params) {
		return new _RequestParams(params);
	}
	data() {
		return this.params.method === "get" ? null : this.params.data;
	}
	queryParams() {
		return this.params.method === "get" ? this.params.data : {};
	}
	isPartial() {
		return this.params.only.length > 0 || this.params.except.length > 0 || this.params.reset.length > 0;
	}
	isPrefetch() {
		return this.params.prefetch === true;
	}
	isDeferredPropsRequest() {
		return this.params.deferredProps === true;
	}
	onCancelToken(cb) {
		this.params.onCancelToken({ cancel: cb });
	}
	markAsFinished() {
		this.params.completed = true;
		this.params.cancelled = false;
		this.params.interrupted = false;
	}
	markAsCancelled({ cancelled = true, interrupted = false }) {
		this.params.onCancel();
		this.params.completed = false;
		this.params.cancelled = cancelled;
		this.params.interrupted = interrupted;
	}
	wasCancelledAtAll() {
		return this.params.cancelled || this.params.interrupted;
	}
	onFinish() {
		this.params.onFinish(this.params);
	}
	onStart() {
		this.params.onStart(this.params);
	}
	onPrefetching() {
		this.params.onPrefetching(this.params);
	}
	onPrefetchResponse(response) {
		if (this.params.onPrefetchResponse) this.params.onPrefetchResponse(response);
	}
	onPrefetchError(error) {
		if (this.params.onPrefetchError) this.params.onPrefetchError(error);
	}
	all() {
		return this.params;
	}
	headers() {
		const headers = { ...this.params.headers };
		if (this.isPartial()) headers["X-Inertia-Partial-Component"] = page.get().component;
		const only = this.params.only.concat(this.params.reset);
		if (only.length > 0) headers["X-Inertia-Partial-Data"] = only.join(",");
		if (this.params.except.length > 0) headers["X-Inertia-Partial-Except"] = this.params.except.join(",");
		if (this.params.reset.length > 0) headers["X-Inertia-Reset"] = this.params.reset.join(",");
		if (this.params.errorBag && this.params.errorBag.length > 0) headers["X-Inertia-Error-Bag"] = this.params.errorBag;
		return headers;
	}
	setPreserveOptions(page2) {
		this.params.preserveScroll = _RequestParams.resolvePreserveOption(this.params.preserveScroll, page2);
		this.params.preserveState = _RequestParams.resolvePreserveOption(this.params.preserveState, page2);
	}
	runCallbacks() {
		this.callbacks.forEach(({ name, args }) => {
			this.params[name](...args);
		});
	}
	merge(toMerge) {
		this.params = {
			...this.params,
			...toMerge
		};
	}
	wrapCallback(params, name) {
		return (...args) => {
			this.recordCallback(name, args);
			params[name](...args);
		};
	}
	recordCallback(name, args) {
		this.callbacks.push({
			name,
			args
		});
	}
	static resolvePreserveOption(value, page2) {
		if (typeof value === "function") return value(page2);
		if (value === "errors") return Object.keys(page2.props.errors || {}).length > 0;
		return value;
	}
};
var modal_default = {
	modal: null,
	listener: null,
	previousBodyOverflow: null,
	createIframeAndPage(html) {
		if (typeof html === "object") html = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(html)}`;
		const page2 = document.createElement("html");
		page2.innerHTML = html;
		page2.querySelectorAll("a").forEach((a) => a.setAttribute("target", "_top"));
		const iframe = document.createElement("iframe");
		iframe.style.backgroundColor = "white";
		iframe.style.borderRadius = "5px";
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.setAttribute("sandbox", "allow-scripts");
		return {
			iframe,
			page: page2
		};
	},
	show(html) {
		const { iframe, page: page2 } = this.createIframeAndPage(html);
		this.modal = document.createElement("div");
		this.modal.style.position = "fixed";
		this.modal.style.width = "100vw";
		this.modal.style.height = "100vh";
		this.modal.style.padding = "50px";
		this.modal.style.boxSizing = "border-box";
		this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)";
		this.modal.style.zIndex = 2e5;
		this.modal.addEventListener("click", () => this.hide());
		this.modal.appendChild(iframe);
		document.body.prepend(this.modal);
		this.previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		iframe.srcdoc = page2.outerHTML;
		this.listener = this.hideOnEscape.bind(this);
		document.addEventListener("keydown", this.listener);
	},
	hide() {
		this.modal.outerHTML = "";
		this.modal = null;
		document.body.style.overflow = this.previousBodyOverflow ?? "";
		this.previousBodyOverflow = null;
		document.removeEventListener("keydown", this.listener);
	},
	hideOnEscape(event) {
		if (event.keyCode === 27) this.hide();
	}
};
var dialog_default = { show(html) {
	const { iframe, page: page2 } = modal_default.createIframeAndPage(html);
	iframe.style.boxSizing = "border-box";
	iframe.style.display = "block";
	const dialog = document.createElement("dialog");
	dialog.id = "inertia-error-dialog";
	Object.assign(dialog.style, {
		width: "calc(100vw - 100px)",
		height: "calc(100vh - 100px)",
		padding: "0",
		margin: "auto",
		border: "none",
		backgroundColor: "transparent"
	});
	const dialogStyleElement = document.createElement("style");
	dialogStyleElement.textContent = `
      dialog#inertia-error-dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
      }

      dialog#inertia-error-dialog:focus {
        outline: none;
      }
    `;
	document.head.appendChild(dialogStyleElement);
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener("close", () => {
		dialogStyleElement.remove();
		dialog.remove();
	});
	dialog.appendChild(iframe);
	document.body.prepend(dialog);
	dialog.showModal();
	dialog.focus();
	iframe.srcdoc = page2.outerHTML;
} };
var queue2 = new Queue();
var Response = class _Response {
	constructor(requestParams, response, originatingPage) {
		this.requestParams = requestParams;
		this.response = response;
		this.originatingPage = originatingPage;
		this.wasPrefetched = false;
	}
	static create(params, response, originatingPage) {
		return new _Response(params, response, originatingPage);
	}
	async handlePrefetch() {
		if (isSameUrlWithoutHash$1(this.requestParams.all().url, window.location)) this.handle();
	}
	async handle() {
		return queue2.add(() => this.process());
	}
	async process() {
		if (this.requestParams.all().prefetch) {
			this.wasPrefetched = true;
			this.requestParams.all().prefetch = false;
			this.requestParams.all().onPrefetched(this.response, this.requestParams.all());
			firePrefetchedEvent(this.response, this.requestParams.all());
			return Promise.resolve();
		}
		this.requestParams.runCallbacks();
		if (!this.isInertiaResponse()) return this.handleNonInertiaResponse();
		await history.processQueue();
		history.preserveUrl = this.requestParams.all().preserveUrl;
		await this.setPage();
		const errors = page.get().props.errors || {};
		if (Object.keys(errors).length > 0) {
			const scopedErrors = this.getScopedErrors(errors);
			fireErrorEvent(scopedErrors);
			return this.requestParams.all().onError(scopedErrors);
		}
		router.flushByCacheTags(this.requestParams.all().invalidateCacheTags || []);
		if (!this.wasPrefetched) router.flush(page.get().url);
		const { flash } = page.get();
		if (Object.keys(flash).length > 0 && !this.requestParams.isDeferredPropsRequest()) {
			fireFlashEvent(flash);
			this.requestParams.all().onFlash(flash);
		}
		fireSuccessEvent(page.get());
		await this.requestParams.all().onSuccess(page.get());
		history.preserveUrl = false;
	}
	mergeParams(params) {
		this.requestParams.merge(params);
	}
	getPageResponse() {
		const data = this.getDataFromResponse(this.response.data);
		if (typeof data === "object") return this.response.data = {
			...data,
			flash: data.flash ?? {}
		};
		return this.response.data = data;
	}
	async handleNonInertiaResponse() {
		if (this.isLocationVisit()) {
			const locationUrl = hrefToUrl(this.getHeader("x-inertia-location"));
			setHashIfSameUrl(this.requestParams.all().url, locationUrl);
			return this.locationVisit(locationUrl);
		}
		const response = {
			...this.response,
			data: this.getDataFromResponse(this.response.data)
		};
		if (fireInvalidEvent(response)) return config$1.get("future.useDialogForErrorModal") ? dialog_default.show(response.data) : modal_default.show(response.data);
	}
	isInertiaResponse() {
		return this.hasHeader("x-inertia");
	}
	hasStatus(status2) {
		return this.response.status === status2;
	}
	getHeader(header) {
		return this.response.headers[header];
	}
	hasHeader(header) {
		return this.getHeader(header) !== void 0;
	}
	isLocationVisit() {
		return this.hasStatus(409) && this.hasHeader("x-inertia-location");
	}
	/**
	* @link https://inertiajs.com/redirects#external-redirects
	*/
	locationVisit(url) {
		try {
			SessionStorage.set(SessionStorage.locationVisitKey, { preserveScroll: this.requestParams.all().preserveScroll === true });
			if (typeof window === "undefined") return;
			if (isSameUrlWithoutHash$1(window.location, url)) window.location.reload();
			else window.location.href = url.href;
		} catch (error) {
			return false;
		}
	}
	async setPage() {
		const pageResponse = this.getPageResponse();
		if (!this.shouldSetPage(pageResponse)) return Promise.resolve();
		this.mergeProps(pageResponse);
		page.mergeOncePropsIntoResponse(pageResponse);
		this.preserveEqualProps(pageResponse);
		await this.setRememberedState(pageResponse);
		this.requestParams.setPreserveOptions(pageResponse);
		pageResponse.url = history.preserveUrl ? page.get().url : this.pageUrl(pageResponse);
		this.requestParams.all().onBeforeUpdate(pageResponse);
		fireBeforeUpdateEvent(pageResponse);
		return page.set(pageResponse, {
			replace: this.requestParams.all().replace,
			preserveScroll: this.requestParams.all().preserveScroll,
			preserveState: this.requestParams.all().preserveState,
			viewTransition: this.requestParams.all().viewTransition
		});
	}
	getDataFromResponse(response) {
		if (typeof response !== "string") return response;
		try {
			return JSON.parse(response);
		} catch (error) {
			return response;
		}
	}
	shouldSetPage(pageResponse) {
		if (!this.requestParams.all().async) return true;
		if (this.originatingPage.component !== pageResponse.component) return true;
		if (this.originatingPage.component !== page.get().component) return false;
		const originatingUrl = hrefToUrl(this.originatingPage.url);
		const currentPageUrl = hrefToUrl(page.get().url);
		return originatingUrl.origin === currentPageUrl.origin && originatingUrl.pathname === currentPageUrl.pathname;
	}
	pageUrl(pageResponse) {
		const responseUrl = hrefToUrl(pageResponse.url);
		setHashIfSameUrl(this.requestParams.all().url, responseUrl);
		return responseUrl.pathname + responseUrl.search + responseUrl.hash;
	}
	preserveEqualProps(pageResponse) {
		if (pageResponse.component !== page.get().component || config$1.get("future.preserveEqualProps") !== true) return;
		const currentPageProps = page.get().props;
		Object.entries(pageResponse.props).forEach(([key, value]) => {
			if (isEqual(value, currentPageProps[key])) pageResponse.props[key] = currentPageProps[key];
		});
	}
	mergeProps(pageResponse) {
		if (!this.requestParams.isPartial() || pageResponse.component !== page.get().component) return;
		const propsToAppend = pageResponse.mergeProps || [];
		const propsToPrepend = pageResponse.prependProps || [];
		const propsToDeepMerge = pageResponse.deepMergeProps || [];
		const matchPropsOn = pageResponse.matchPropsOn || [];
		const mergeProp = (prop, shouldAppend) => {
			const currentProp = get(page.get().props, prop);
			const incomingProp = get(pageResponse.props, prop);
			if (Array.isArray(incomingProp)) {
				const newArray = this.mergeOrMatchItems(currentProp || [], incomingProp, prop, matchPropsOn, shouldAppend);
				set(pageResponse.props, prop, newArray);
			} else if (typeof incomingProp === "object" && incomingProp !== null) {
				const newObject = {
					...currentProp || {},
					...incomingProp
				};
				set(pageResponse.props, prop, newObject);
			}
		};
		propsToAppend.forEach((prop) => mergeProp(prop, true));
		propsToPrepend.forEach((prop) => mergeProp(prop, false));
		propsToDeepMerge.forEach((prop) => {
			const currentProp = page.get().props[prop];
			const incomingProp = pageResponse.props[prop];
			const deepMerge = (target, source, matchProp) => {
				if (Array.isArray(source)) return this.mergeOrMatchItems(target, source, matchProp, matchPropsOn);
				if (typeof source === "object" && source !== null) return Object.keys(source).reduce((acc, key) => {
					acc[key] = deepMerge(target ? target[key] : void 0, source[key], `${matchProp}.${key}`);
					return acc;
				}, { ...target });
				return source;
			};
			pageResponse.props[prop] = deepMerge(currentProp, incomingProp, prop);
		});
		pageResponse.props = {
			...page.get().props,
			...pageResponse.props
		};
		if (this.requestParams.isDeferredPropsRequest()) {
			const currentErrors = page.get().props.errors;
			if (currentErrors && Object.keys(currentErrors).length > 0) pageResponse.props.errors = currentErrors;
		}
		if (page.get().scrollProps) pageResponse.scrollProps = {
			...page.get().scrollProps || {},
			...pageResponse.scrollProps || {}
		};
		if (page.hasOnceProps()) pageResponse.onceProps = {
			...page.get().onceProps || {},
			...pageResponse.onceProps || {}
		};
		if (this.requestParams.isDeferredPropsRequest()) pageResponse.flash = { ...page.get().flash };
		const currentOriginalDeferred = page.get().initialDeferredProps;
		if (currentOriginalDeferred && Object.keys(currentOriginalDeferred).length > 0) pageResponse.initialDeferredProps = currentOriginalDeferred;
	}
	mergeOrMatchItems(existingItems, newItems, matchProp, matchPropsOn, shouldAppend = true) {
		const items = Array.isArray(existingItems) ? existingItems : [];
		const matchingKey = matchPropsOn.find((key) => {
			return key.split(".").slice(0, -1).join(".") === matchProp;
		});
		if (!matchingKey) return shouldAppend ? [...items, ...newItems] : [...newItems, ...items];
		const uniqueProperty = matchingKey.split(".").pop() || "";
		const newItemsMap = /* @__PURE__ */ new Map();
		newItems.forEach((item) => {
			if (this.hasUniqueProperty(item, uniqueProperty)) newItemsMap.set(item[uniqueProperty], item);
		});
		return shouldAppend ? this.appendWithMatching(items, newItems, newItemsMap, uniqueProperty) : this.prependWithMatching(items, newItems, newItemsMap, uniqueProperty);
	}
	appendWithMatching(existingItems, newItems, newItemsMap, uniqueProperty) {
		const updatedExisting = existingItems.map((item) => {
			if (this.hasUniqueProperty(item, uniqueProperty) && newItemsMap.has(item[uniqueProperty])) return newItemsMap.get(item[uniqueProperty]);
			return item;
		});
		const newItemsToAdd = newItems.filter((item) => {
			if (!this.hasUniqueProperty(item, uniqueProperty)) return true;
			return !existingItems.some((existing) => this.hasUniqueProperty(existing, uniqueProperty) && existing[uniqueProperty] === item[uniqueProperty]);
		});
		return [...updatedExisting, ...newItemsToAdd];
	}
	prependWithMatching(existingItems, newItems, newItemsMap, uniqueProperty) {
		const untouchedExisting = existingItems.filter((item) => {
			if (this.hasUniqueProperty(item, uniqueProperty)) return !newItemsMap.has(item[uniqueProperty]);
			return true;
		});
		return [...newItems, ...untouchedExisting];
	}
	hasUniqueProperty(item, property) {
		return item && typeof item === "object" && property in item;
	}
	async setRememberedState(pageResponse) {
		const rememberedState = await history.getState(history.rememberedState, {});
		if (this.requestParams.all().preserveState && rememberedState && pageResponse.component === page.get().component) pageResponse.rememberedState = rememberedState;
	}
	getScopedErrors(errors) {
		if (!this.requestParams.all().errorBag) return errors;
		return errors[this.requestParams.all().errorBag || ""] || {};
	}
};
var Request = class _Request {
	constructor(params, page2) {
		this.page = page2;
		this.requestHasFinished = false;
		this.requestParams = RequestParams.create(params);
		this.cancelToken = new AbortController();
	}
	static create(params, page2) {
		return new _Request(params, page2);
	}
	isPrefetch() {
		return this.requestParams.isPrefetch();
	}
	async send() {
		this.requestParams.onCancelToken(() => this.cancel({ cancelled: true }));
		fireStartEvent(this.requestParams.all());
		this.requestParams.onStart();
		if (this.requestParams.all().prefetch) {
			this.requestParams.onPrefetching();
			firePrefetchingEvent(this.requestParams.all());
		}
		const originallyPrefetch = this.requestParams.all().prefetch;
		return axios({
			method: this.requestParams.all().method,
			url: urlWithoutHash$1(this.requestParams.all().url).href,
			data: this.requestParams.data(),
			params: this.requestParams.queryParams(),
			signal: this.cancelToken.signal,
			headers: this.getHeaders(),
			onUploadProgress: this.onProgress.bind(this),
			responseType: "text"
		}).then((response) => {
			this.response = Response.create(this.requestParams, response, this.page);
			return this.response.handle();
		}).catch((error) => {
			if (error?.response) {
				this.response = Response.create(this.requestParams, error.response, this.page);
				return this.response.handle();
			}
			return Promise.reject(error);
		}).catch((error) => {
			if (axios.isCancel(error)) return;
			if (fireExceptionEvent(error)) {
				if (originallyPrefetch) this.requestParams.onPrefetchError(error);
				return Promise.reject(error);
			}
		}).finally(() => {
			this.finish();
			if (originallyPrefetch && this.response) this.requestParams.onPrefetchResponse(this.response);
		});
	}
	finish() {
		if (this.requestParams.wasCancelledAtAll()) return;
		this.requestParams.markAsFinished();
		this.fireFinishEvents();
	}
	fireFinishEvents() {
		if (this.requestHasFinished) return;
		this.requestHasFinished = true;
		fireFinishEvent(this.requestParams.all());
		this.requestParams.onFinish();
	}
	cancel({ cancelled = false, interrupted = false }) {
		if (this.requestHasFinished) return;
		this.cancelToken.abort();
		this.requestParams.markAsCancelled({
			cancelled,
			interrupted
		});
		this.fireFinishEvents();
	}
	onProgress(progress3) {
		if (this.requestParams.data() instanceof FormData) {
			progress3.percentage = progress3.progress ? Math.round(progress3.progress * 100) : 0;
			fireProgressEvent(progress3);
			this.requestParams.all().onProgress(progress3);
		}
	}
	getHeaders() {
		const headers = {
			...this.requestParams.headers(),
			Accept: "text/html, application/xhtml+xml",
			"X-Requested-With": "XMLHttpRequest",
			"X-Inertia": true
		};
		const page2 = page.get();
		if (page2.version) headers["X-Inertia-Version"] = page2.version;
		const onceProps = Object.entries(page2.onceProps || {}).filter(([, onceProp]) => {
			if (page2.props[onceProp.prop] === void 0) return false;
			return !onceProp.expiresAt || onceProp.expiresAt > Date.now();
		}).map(([key]) => key);
		if (onceProps.length > 0) headers["X-Inertia-Except-Once-Props"] = onceProps.join(",");
		return headers;
	}
};
var RequestStream = class {
	constructor({ maxConcurrent, interruptible }) {
		this.requests = [];
		this.maxConcurrent = maxConcurrent;
		this.interruptible = interruptible;
	}
	send(request) {
		this.requests.push(request);
		request.send().finally(() => {
			this.requests = this.requests.filter((r) => r !== request);
		});
	}
	interruptInFlight() {
		this.cancel({ interrupted: true }, false);
	}
	cancelInFlight({ prefetch = true } = {}) {
		this.requests.filter((request) => prefetch || !request.isPrefetch()).forEach((request) => request.cancel({ cancelled: true }));
	}
	cancel({ cancelled = false, interrupted = false } = {}, force = false) {
		if (!force && !this.shouldCancel()) return;
		this.requests.shift()?.cancel({
			cancelled,
			interrupted
		});
	}
	shouldCancel() {
		return this.interruptible && this.requests.length >= this.maxConcurrent;
	}
};
var Router = class {
	constructor() {
		this.syncRequestStream = new RequestStream({
			maxConcurrent: 1,
			interruptible: true
		});
		this.asyncRequestStream = new RequestStream({
			maxConcurrent: Infinity,
			interruptible: false
		});
		this.clientVisitQueue = new Queue();
	}
	init({ initialPage, resolveComponent, swapComponent, onFlash }) {
		page.init({
			initialPage,
			resolveComponent,
			swapComponent,
			onFlash
		});
		InitialVisit.handle();
		eventHandler.init();
		eventHandler.on("missingHistoryItem", () => {
			if (typeof window !== "undefined") this.visit(window.location.href, {
				preserveState: true,
				preserveScroll: true,
				replace: true
			});
		});
		eventHandler.on("loadDeferredProps", (deferredProps) => {
			this.loadDeferredProps(deferredProps);
		});
		eventHandler.on("historyQuotaExceeded", (url) => {
			window.location.href = url;
		});
	}
	get(url, data = {}, options = {}) {
		return this.visit(url, {
			...options,
			method: "get",
			data
		});
	}
	post(url, data = {}, options = {}) {
		return this.visit(url, {
			preserveState: true,
			...options,
			method: "post",
			data
		});
	}
	put(url, data = {}, options = {}) {
		return this.visit(url, {
			preserveState: true,
			...options,
			method: "put",
			data
		});
	}
	patch(url, data = {}, options = {}) {
		return this.visit(url, {
			preserveState: true,
			...options,
			method: "patch",
			data
		});
	}
	delete(url, options = {}) {
		return this.visit(url, {
			preserveState: true,
			...options,
			method: "delete"
		});
	}
	reload(options = {}) {
		return this.doReload(options);
	}
	doReload(options = {}) {
		if (typeof window === "undefined") return;
		return this.visit(window.location.href, {
			...options,
			preserveScroll: true,
			preserveState: true,
			async: true,
			headers: {
				...options.headers || {},
				"Cache-Control": "no-cache"
			}
		});
	}
	remember(data, key = "default") {
		history.remember(data, key);
	}
	restore(key = "default") {
		return history.restore(key);
	}
	on(type, callback) {
		if (typeof window === "undefined") return () => {};
		return eventHandler.onGlobalEvent(type, callback);
	}
	/**
	* @deprecated Use cancelAll() instead.
	*/
	cancel() {
		this.syncRequestStream.cancelInFlight();
	}
	get activePolls() {
		return polls.count;
	}
	cancelAll({ async = true, prefetch = true, sync = true } = {}) {
		if (async) this.asyncRequestStream.cancelInFlight({ prefetch });
		if (sync) this.syncRequestStream.cancelInFlight();
	}
	poll(interval, requestOptions = {}, options = {}) {
		return polls.add(interval, ({ onStart, onFinish }) => {
			const resolved = typeof requestOptions === "function" ? requestOptions() : requestOptions;
			this.reload({
				...resolved,
				onCancelToken: (token) => {
					onStart(token.cancel);
					resolved.onCancelToken?.(token);
				},
				onFinish: (visit) => {
					onFinish();
					resolved.onFinish?.(visit);
				}
			});
		}, {
			autoStart: options.autoStart ?? true,
			keepAlive: options.keepAlive ?? false,
			mode: options.mode
		});
	}
	visit(href, options = {}) {
		const visit = this.getPendingVisit(href, {
			...options,
			showProgress: options.showProgress ?? !options.async
		});
		const events = this.getVisitEvents(options);
		if (events.onBefore(visit) === false || !fireBeforeEvent(visit)) return;
		const currentPageUrl = hrefToUrl(page.get().url);
		if (!(visit.only.length > 0 || visit.except.length > 0 || visit.reset.length > 0 ? isSameUrlWithoutQueryOrHash(visit.url, currentPageUrl) : isSameUrlWithoutHash$1(visit.url, currentPageUrl))) this.asyncRequestStream.cancelInFlight({ prefetch: false });
		if (!visit.async) this.syncRequestStream.interruptInFlight();
		if (!page.isCleared() && !visit.preserveUrl) Scroll.save();
		const requestParams = {
			...visit,
			...events
		};
		const prefetched = prefetchedRequests.get(requestParams);
		if (prefetched) {
			progress.reveal(prefetched.inFlight);
			prefetchedRequests.use(prefetched, requestParams);
		} else {
			progress.reveal(true);
			(visit.async ? this.asyncRequestStream : this.syncRequestStream).send(Request.create(requestParams, page.get()));
		}
	}
	getCached(href, options = {}) {
		return prefetchedRequests.findCached(this.getPrefetchParams(href, options));
	}
	flush(href, options = {}) {
		prefetchedRequests.remove(this.getPrefetchParams(href, options));
	}
	flushAll() {
		prefetchedRequests.removeAll();
	}
	flushByCacheTags(tags) {
		prefetchedRequests.removeByTags(Array.isArray(tags) ? tags : [tags]);
	}
	getPrefetching(href, options = {}) {
		return prefetchedRequests.findInFlight(this.getPrefetchParams(href, options));
	}
	prefetch(href, options = {}, prefetchOptions = {}) {
		if ((options.method ?? (isUrlMethodPair(href) ? href.method : "get")) !== "get") throw new Error("Prefetch requests must use the GET method");
		const visit = this.getPendingVisit(href, {
			...options,
			async: true,
			showProgress: false,
			prefetch: true,
			viewTransition: false
		});
		if (visit.url.origin + visit.url.pathname + visit.url.search === window.location.origin + window.location.pathname + window.location.search) return;
		const events = this.getVisitEvents(options);
		if (events.onBefore(visit) === false || !fireBeforeEvent(visit)) return;
		progress.hide();
		this.asyncRequestStream.interruptInFlight();
		const requestParams = {
			...visit,
			...events
		};
		const ensureCurrentPageIsSet = () => {
			return new Promise((resolve) => {
				const checkIfPageIsDefined = () => {
					if (page.get()) resolve();
					else setTimeout(checkIfPageIsDefined, 50);
				};
				checkIfPageIsDefined();
			});
		};
		ensureCurrentPageIsSet().then(() => {
			prefetchedRequests.add(requestParams, (params) => {
				this.asyncRequestStream.send(Request.create(params, page.get()));
			}, {
				cacheFor: config$1.get("prefetch.cacheFor"),
				cacheTags: [],
				...prefetchOptions
			});
		});
	}
	clearHistory() {
		history.clear();
	}
	decryptHistory() {
		return history.decrypt();
	}
	resolveComponent(component) {
		return page.resolve(component);
	}
	replace(params) {
		this.clientVisit(params, { replace: true });
	}
	replaceProp(name, value, options) {
		this.replace({
			preserveScroll: true,
			preserveState: true,
			props(currentProps) {
				const newValue = typeof value === "function" ? value(get(currentProps, name), currentProps) : value;
				return set(cloneDeep(currentProps), name, newValue);
			},
			...options || {}
		});
	}
	appendToProp(name, value, options) {
		this.replaceProp(name, (currentValue, currentProps) => {
			const newValue = typeof value === "function" ? value(currentValue, currentProps) : value;
			if (!Array.isArray(currentValue)) currentValue = currentValue !== void 0 ? [currentValue] : [];
			return [...currentValue, newValue];
		}, options);
	}
	prependToProp(name, value, options) {
		this.replaceProp(name, (currentValue, currentProps) => {
			const newValue = typeof value === "function" ? value(currentValue, currentProps) : value;
			if (!Array.isArray(currentValue)) currentValue = currentValue !== void 0 ? [currentValue] : [];
			return [newValue, ...currentValue];
		}, options);
	}
	push(params) {
		this.clientVisit(params);
	}
	flash(keyOrData, value) {
		const current = page.get().flash;
		let flash;
		if (typeof keyOrData === "function") flash = keyOrData(current);
		else if (typeof keyOrData === "string") flash = {
			...current,
			[keyOrData]: value
		};
		else if (keyOrData && Object.keys(keyOrData).length) flash = {
			...current,
			...keyOrData
		};
		else return;
		page.setFlash(flash);
		if (Object.keys(flash).length) fireFlashEvent(flash);
	}
	clientVisit(params, { replace = false } = {}) {
		this.clientVisitQueue.add(() => this.performClientVisit(params, { replace }));
	}
	performClientVisit(params, { replace = false } = {}) {
		const current = page.get();
		const onceProps = typeof params.props === "function" ? Object.fromEntries(Object.values(current.onceProps ?? {}).map((onceProp) => [onceProp.prop, current.props[onceProp.prop]])) : {};
		const props = typeof params.props === "function" ? params.props(current.props, onceProps) : params.props ?? current.props;
		const flash = typeof params.flash === "function" ? params.flash(current.flash) : params.flash;
		const { viewTransition, onError, onFinish, onFlash, onSuccess, ...pageParams } = params;
		const page2 = {
			...current,
			...pageParams,
			flash: flash ?? {},
			props
		};
		const preserveScroll = RequestParams.resolvePreserveOption(params.preserveScroll ?? false, page2);
		const preserveState = RequestParams.resolvePreserveOption(params.preserveState ?? false, page2);
		return page.set(page2, {
			replace,
			preserveScroll,
			preserveState,
			viewTransition
		}).then(() => {
			const currentFlash = page.get().flash;
			if (Object.keys(currentFlash).length > 0) {
				fireFlashEvent(currentFlash);
				onFlash?.(currentFlash);
			}
			const errors = page.get().props.errors || {};
			if (Object.keys(errors).length === 0) {
				onSuccess?.(page.get());
				return;
			}
			const scopedErrors = params.errorBag ? errors[params.errorBag || ""] || {} : errors;
			onError?.(scopedErrors);
		}).finally(() => onFinish?.(params));
	}
	getPrefetchParams(href, options) {
		return {
			...this.getPendingVisit(href, {
				...options,
				async: true,
				showProgress: false,
				prefetch: true,
				viewTransition: false
			}),
			...this.getVisitEvents(options)
		};
	}
	getPendingVisit(href, options, pendingVisitOptions = {}) {
		if (isUrlMethodPair(href)) {
			const urlMethodPair = href;
			href = urlMethodPair.url;
			options.method = options.method ?? urlMethodPair.method;
		}
		const defaultVisitOptionsCallback = config$1.get("visitOptions");
		const configuredOptions = defaultVisitOptionsCallback ? defaultVisitOptionsCallback(href.toString(), cloneDeep(options)) || {} : {};
		const mergedOptions = {
			method: "get",
			data: {},
			replace: false,
			preserveScroll: false,
			preserveState: false,
			only: [],
			except: [],
			headers: {},
			errorBag: "",
			forceFormData: false,
			queryStringArrayFormat: "brackets",
			async: false,
			showProgress: true,
			fresh: false,
			reset: [],
			preserveUrl: false,
			prefetch: false,
			invalidateCacheTags: [],
			viewTransition: false,
			...stripTopLevelUndefined(options),
			...stripTopLevelUndefined(configuredOptions)
		};
		const [url, _data] = transformUrlAndData(href, mergedOptions.data, mergedOptions.method, mergedOptions.forceFormData, mergedOptions.queryStringArrayFormat);
		const visit = {
			cancelled: false,
			completed: false,
			interrupted: false,
			...mergedOptions,
			...pendingVisitOptions,
			url,
			data: _data
		};
		if (visit.prefetch) visit.headers["Purpose"] = "prefetch";
		return visit;
	}
	getVisitEvents(options) {
		return {
			onCancelToken: options.onCancelToken || (() => {}),
			onBefore: options.onBefore || (() => {}),
			onBeforeUpdate: options.onBeforeUpdate || (() => {}),
			onStart: options.onStart || (() => {}),
			onProgress: options.onProgress || (() => {}),
			onFinish: options.onFinish || (() => {}),
			onCancel: options.onCancel || (() => {}),
			onSuccess: options.onSuccess || (() => {}),
			onError: options.onError || (() => {}),
			onFlash: options.onFlash || (() => {}),
			onPrefetched: options.onPrefetched || (() => {}),
			onPrefetching: options.onPrefetching || (() => {})
		};
	}
	loadDeferredProps(deferred) {
		if (deferred) Object.entries(deferred).forEach(([_, group]) => {
			this.doReload({
				only: group,
				deferredProps: true
			});
		});
	}
};
var UseFormUtils = class {
	/**
	* Creates a callback that returns a UrlMethodPair.
	*
	* createWayfinderCallback(urlMethodPair)
	* createWayfinderCallback(method, url)
	* createWayfinderCallback(() => urlMethodPair)
	* createWayfinderCallback(() => method, () => url)
	*/
	static createWayfinderCallback(...args) {
		return () => {
			if (args.length === 1) return isUrlMethodPair(args[0]) ? args[0] : args[0]();
			return {
				method: typeof args[0] === "function" ? args[0]() : args[0],
				url: typeof args[1] === "function" ? args[1]() : args[1]
			};
		};
	}
	/**
	* Parses all useForm() arguments into { rememberKey, data, precognitionEndpoint }.
	*
	* useForm()
	* useForm(data)
	* useForm(rememberKey, data)
	* useForm(method, url, data)
	* useForm(urlMethodPair, data)
	*
	*/
	static parseUseFormArguments(...args) {
		if (args.length === 0) return {
			rememberKey: null,
			data: {},
			precognitionEndpoint: null
		};
		if (args.length === 1) return {
			rememberKey: null,
			data: args[0],
			precognitionEndpoint: null
		};
		if (args.length === 2) {
			if (typeof args[0] === "string") return {
				rememberKey: args[0],
				data: args[1],
				precognitionEndpoint: null
			};
			return {
				rememberKey: null,
				data: args[1],
				precognitionEndpoint: this.createWayfinderCallback(args[0])
			};
		}
		return {
			rememberKey: null,
			data: args[2],
			precognitionEndpoint: this.createWayfinderCallback(args[0], args[1])
		};
	}
	/**
	* Parses all submission arguments into { method, url, options }.
	* It uses the Precognition endpoint if no explicit method/url are provided.
	*
	* form.submit(method, url)
	* form.submit(method, url, options)
	* form.submit(urlMethodPair)
	* form.submit(urlMethodPair, options)
	* form.submit()
	* form.submit(options)
	*/
	static parseSubmitArguments(args, precognitionEndpoint) {
		if (args.length === 3 || args.length === 2 && typeof args[0] === "string") return {
			method: args[0],
			url: args[1],
			options: args[2] ?? {}
		};
		if (isUrlMethodPair(args[0])) return {
			...args[0],
			options: args[1] ?? {}
		};
		return {
			...precognitionEndpoint(),
			options: args[0] ?? {}
		};
	}
	/**
	* Merges headers into the Precognition validate() arguments.
	*/
	static mergeHeadersForValidation(field, config2, headers) {
		const merge = (config3) => {
			config3.headers = {
				...headers ?? {},
				...config3.headers ?? {}
			};
			return config3;
		};
		if (field && typeof field === "object" && !("target" in field)) field = merge(field);
		else if (config2 && typeof config2 === "object") config2 = merge(config2);
		else if (typeof field === "string") config2 = merge(config2 ?? {});
		else field = merge(field ?? {});
		return [field, config2];
	}
};
function undotKey(key) {
	if (!key.includes(".")) return key;
	const transformSegment = (segment) => {
		if (segment.startsWith("[") && segment.endsWith("]")) return segment;
		return segment.split(".").reduce((result, part, index) => index === 0 ? part : `${result}[${part}]`);
	};
	return key.replace(/\\\./g, "__ESCAPED_DOT__").split(/(\[[^\]]*\])/).filter(Boolean).map(transformSegment).join("").replace(/__ESCAPED_DOT__/g, ".");
}
function parseKey(key) {
	const path = [];
	const pattern = /([^\[\]]+)|\[(\d*)\]/g;
	let match;
	while ((match = pattern.exec(key)) !== null) if (match[1] !== void 0) path.push(match[1]);
	else if (match[2] !== void 0) path.push(match[2] === "" ? "" : Number(match[2]));
	return path;
}
function setNestedObject(obj, path, value) {
	let current = obj;
	for (let i = 0; i < path.length - 1; i++) {
		if (!(path[i] in current)) current[path[i]] = {};
		current = current[path[i]];
	}
	current[path[path.length - 1]] = value;
}
function objectHasSequentialNumericKeys(value) {
	const keys = Object.keys(value);
	const numericKeys = keys.filter((k) => /^\d+$/.test(k)).map(Number).sort((a, b) => a - b);
	return keys.length === numericKeys.length && numericKeys.length > 0 && numericKeys[0] === 0 && numericKeys.every((n, i) => n === i);
}
function convertSequentialObjectsToArrays(value) {
	if (Array.isArray(value)) return value.map(convertSequentialObjectsToArrays);
	if (typeof value !== "object" || value === null || isFile$1(value)) return value;
	if (objectHasSequentialNumericKeys(value)) {
		const result2 = [];
		for (let i = 0; i < Object.keys(value).length; i++) result2[i] = convertSequentialObjectsToArrays(value[i]);
		return result2;
	}
	const result = {};
	for (const key in value) result[key] = convertSequentialObjectsToArrays(value[key]);
	return result;
}
function formDataToObject(source) {
	const form = {};
	for (const [key, value] of source.entries()) {
		if (value instanceof File && value.size === 0 && value.name === "") continue;
		const path = parseKey(undotKey(key));
		if (path[path.length - 1] === "") {
			const arrayPath = path.slice(0, -1);
			const existing = get(form, arrayPath);
			if (Array.isArray(existing)) existing.push(value);
			else if (existing && typeof existing === "object" && !isFile$1(existing)) {
				const numericKeys = Object.keys(existing).filter((k) => /^\d+$/.test(k)).map(Number).sort((a, b) => a - b);
				set(form, arrayPath, numericKeys.length > 0 ? [...numericKeys.map((k) => existing[k]), value] : [value]);
			} else set(form, arrayPath, [value]);
			continue;
		}
		setNestedObject(form, path.map(String), value);
	}
	return convertSequentialObjectsToArrays(form);
}
var Renderer = {
	preferredAttribute() {
		return config$1.get("future.useDataInertiaHeadAttribute") ? "data-inertia" : "inertia";
	},
	buildDOMElement(tag) {
		const template = document.createElement("template");
		template.innerHTML = tag;
		const node = template.content.firstChild;
		if (!tag.startsWith("<script ")) return node;
		const script = document.createElement("script");
		script.innerHTML = node.innerHTML;
		node.getAttributeNames().forEach((name) => {
			script.setAttribute(name, node.getAttribute(name) || "");
		});
		return script;
	},
	isInertiaManagedElement(element) {
		return element.nodeType === Node.ELEMENT_NODE && element.getAttribute(this.preferredAttribute()) !== null;
	},
	findMatchingElementIndex(element, elements) {
		const attribute = this.preferredAttribute();
		const key = element.getAttribute(attribute);
		if (key !== null) return elements.findIndex((element2) => element2.getAttribute(attribute) === key);
		return -1;
	},
	update: debounce(function(elements) {
		const sourceElements = elements.map((element) => this.buildDOMElement(element));
		Array.from(document.head.childNodes).filter((element) => this.isInertiaManagedElement(element)).forEach((targetElement) => {
			const index = this.findMatchingElementIndex(targetElement, sourceElements);
			if (index === -1) {
				targetElement?.parentNode?.removeChild(targetElement);
				return;
			}
			const sourceElement = sourceElements.splice(index, 1)[0];
			if (sourceElement && !targetElement.isEqualNode(sourceElement)) targetElement?.parentNode?.replaceChild(sourceElement, targetElement);
		});
		sourceElements.forEach((element) => document.head.appendChild(element));
	}, 1)
};
function createHeadManager(isServer3, titleCallback, onUpdate) {
	const states = {};
	let lastProviderId = 0;
	function connect() {
		const id = lastProviderId += 1;
		states[id] = [];
		return id.toString();
	}
	function disconnect(id) {
		if (id === null || Object.keys(states).indexOf(id) === -1) return;
		delete states[id];
		commit();
	}
	function reconnect(id) {
		if (Object.keys(states).indexOf(id) === -1) states[id] = [];
	}
	function update(id, elements = []) {
		if (id !== null && Object.keys(states).indexOf(id) > -1) states[id] = elements;
		commit();
	}
	function collect() {
		const title = titleCallback("");
		const attribute = Renderer.preferredAttribute();
		const defaults = { ...title ? { title: `<title ${attribute}="">${title}</title>` } : {} };
		const elements = Object.values(states).reduce((carry, elements2) => carry.concat(elements2), []).reduce((carry, element) => {
			if (element.indexOf("<") === -1) return carry;
			if (element.indexOf("<title ") === 0) {
				const title2 = element.match(/(<title [^>]+>)(.*?)(<\/title>)/s);
				carry.title = title2 ? `${title2[1]}${titleCallback(title2[2])}${title2[3]}` : element;
				return carry;
			}
			const match = element.match(attribute === "inertia" ? / inertia="[^"]+"/ : / data-inertia="[^"]+"/);
			if (match) carry[match[0]] = element;
			else carry[Object.keys(carry).length] = element;
			return carry;
		}, defaults);
		return Object.values(elements);
	}
	function commit() {
		isServer3 ? onUpdate(collect()) : Renderer.update(collect());
	}
	commit();
	return {
		forceUpdate: commit,
		createProvider: function() {
			const id = connect();
			return {
				preferredAttribute: Renderer.preferredAttribute,
				reconnect: () => reconnect(id),
				update: (elements) => update(id, elements),
				disconnect: () => disconnect(id)
			};
		}
	};
}
var MERGE_INTENT_HEADER = "X-Inertia-Infinite-Scroll-Merge-Intent";
var useInfiniteScrollData = (options) => {
	const getScrollPropFromCurrentPage = () => {
		const scrollProp = page.get().scrollProps?.[options.getPropName()];
		if (scrollProp) return scrollProp;
		throw new Error(`The page object does not contain a scroll prop named "${options.getPropName()}".`);
	};
	const state = {
		component: null,
		loading: false,
		previousPage: null,
		nextPage: null,
		lastLoadedPage: null,
		requestCount: 0
	};
	const resetState = () => {
		const scrollProp = getScrollPropFromCurrentPage();
		state.component = page.get().component;
		state.loading = false;
		state.previousPage = scrollProp.previousPage;
		state.nextPage = scrollProp.nextPage;
		state.lastLoadedPage = scrollProp.currentPage;
		state.requestCount = 0;
	};
	const getRememberKey = () => `inertia:infinite-scroll-data:${options.getPropName()}`;
	if (typeof window !== "undefined") {
		resetState();
		const rememberedState = router.restore(getRememberKey());
		if (rememberedState && typeof rememberedState === "object" && rememberedState.lastLoadedPage === getScrollPropFromCurrentPage().currentPage) {
			state.previousPage = rememberedState.previousPage;
			state.nextPage = rememberedState.nextPage;
			state.lastLoadedPage = rememberedState.lastLoadedPage;
			state.requestCount = rememberedState.requestCount || 0;
		}
	}
	const removeEventListener = router.on("success", (event) => {
		if (state.component === event.detail.page.component && getScrollPropFromCurrentPage().reset) {
			resetState();
			options.onReset?.();
		}
	});
	const getScrollPropKeyForSide = (side) => {
		return side === "next" ? "nextPage" : "previousPage";
	};
	const findPageToLoad = (side) => {
		const pagePropName = getScrollPropKeyForSide(side);
		return state[pagePropName];
	};
	const syncStateOnSuccess = (side) => {
		const scrollProp = getScrollPropFromCurrentPage();
		const paginationProp = getScrollPropKeyForSide(side);
		state.lastLoadedPage = scrollProp.currentPage;
		state[paginationProp] = scrollProp[paginationProp];
		state.requestCount += 1;
		router.remember({
			previousPage: state.previousPage,
			nextPage: state.nextPage,
			lastLoadedPage: state.lastLoadedPage,
			requestCount: state.requestCount
		}, getRememberKey());
	};
	const getPageName = () => getScrollPropFromCurrentPage().pageName;
	const getRequestCount = () => state.requestCount;
	const fetchPage = (side, reloadOptions = {}) => {
		const page2 = findPageToLoad(side);
		if (state.loading || page2 === null) return;
		state.loading = true;
		router.reload({
			...reloadOptions,
			data: { [getPageName()]: page2 },
			only: [options.getPropName()],
			preserveUrl: true,
			headers: {
				[MERGE_INTENT_HEADER]: side === "previous" ? "prepend" : "append",
				...reloadOptions.headers
			},
			onBefore: (visit) => {
				side === "next" ? options.onBeforeNextRequest() : options.onBeforePreviousRequest();
				reloadOptions.onBefore?.(visit);
			},
			onBeforeUpdate: (page3) => {
				options.onBeforeUpdate();
				reloadOptions.onBeforeUpdate?.(page3);
			},
			onSuccess: (page3) => {
				syncStateOnSuccess(side);
				reloadOptions.onSuccess?.(page3);
			},
			onFinish: (visit) => {
				state.loading = false;
				const completed = visit.completed;
				const page3 = completed ? state.lastLoadedPage : null;
				side === "next" ? options.onCompleteNextRequest(page3, {
					page: page3,
					completed
				}) : options.onCompletePreviousRequest(page3, {
					page: page3,
					completed
				});
				reloadOptions.onFinish?.(visit);
			}
		});
	};
	const getLastLoadedPage = () => state.lastLoadedPage;
	const hasPrevious = () => !!state.previousPage;
	const hasNext = () => !!state.nextPage;
	const fetchPrevious = (reloadOptions) => fetchPage("previous", reloadOptions);
	const fetchNext = (reloadOptions) => fetchPage("next", reloadOptions);
	return {
		getLastLoadedPage,
		getPageName,
		getRequestCount,
		hasPrevious,
		hasNext,
		fetchNext,
		fetchPrevious,
		removeEventListener
	};
};
var useIntersectionObservers = () => {
	const intersectionObservers = [];
	const newIntersectionObserver = (callback, options = {}) => {
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) callback(entry);
		}, options);
		intersectionObservers.push(observer);
		return observer;
	};
	const flushAll = () => {
		intersectionObservers.forEach((observer) => observer.disconnect());
		intersectionObservers.length = 0;
	};
	return {
		new: newIntersectionObserver,
		flushAll
	};
};
var INFINITE_SCROLL_PAGE_KEY = "infiniteScrollPage";
var INFINITE_SCROLL_IGNORE_KEY = "infiniteScrollIgnore";
var getPageFromElement = (element) => element.dataset[INFINITE_SCROLL_PAGE_KEY];
var useInfiniteScrollElementManager = (options) => {
	const intersectionObservers = useIntersectionObservers();
	let itemsObserver;
	let startElementObserver;
	let endElementObserver;
	let itemsMutationObserver;
	let triggersEnabled = false;
	const setupObservers = () => {
		itemsMutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType !== Node.ELEMENT_NODE) return;
					addedElements.add(node);
				});
			});
			rememberElementsDebounced();
		});
		itemsMutationObserver.observe(options.getItemsElement(), { childList: true });
		itemsObserver = intersectionObservers.new((entry) => options.onItemIntersected(entry.target));
		const observerOptions = {
			root: options.getScrollableParent(),
			rootMargin: `${Math.max(1, options.getTriggerMargin())}px`
		};
		startElementObserver = intersectionObservers.new(options.onPreviousTriggered, observerOptions);
		endElementObserver = intersectionObservers.new(options.onNextTriggered, observerOptions);
	};
	const enableTriggers = () => {
		if (triggersEnabled) disableTriggers();
		const startElement = options.getStartElement();
		const endElement = options.getEndElement();
		if (startElement && options.shouldFetchPrevious()) startElementObserver.observe(startElement);
		if (endElement && options.shouldFetchNext()) endElementObserver.observe(endElement);
		triggersEnabled = true;
	};
	const disableTriggers = () => {
		if (!triggersEnabled) return;
		startElementObserver.disconnect();
		endElementObserver.disconnect();
		triggersEnabled = false;
	};
	const refreshTriggers = () => {
		if (triggersEnabled) enableTriggers();
	};
	const flushAll = () => {
		disableTriggers();
		intersectionObservers.flushAll();
		itemsMutationObserver?.disconnect();
	};
	const addedElements = /* @__PURE__ */ new Set();
	const elementIsUntagged = (element) => !(INFINITE_SCROLL_PAGE_KEY in element.dataset) && !(INFINITE_SCROLL_IGNORE_KEY in element.dataset);
	const processManuallyAddedElements = () => {
		Array.from(addedElements).forEach((element) => {
			if (elementIsUntagged(element)) element.dataset[INFINITE_SCROLL_IGNORE_KEY] = "true";
			itemsObserver.observe(element);
		});
		addedElements.clear();
	};
	const findUntaggedElements = (containerElement) => {
		return Array.from(containerElement.querySelectorAll(`:scope > *:not([data-infinite-scroll-page]):not([data-infinite-scroll-ignore])`));
	};
	let hasRestoredElements = false;
	const processServerLoadedElements = (loadedPage) => {
		if (!hasRestoredElements) {
			hasRestoredElements = true;
			if (restoreElements()) return;
		}
		findUntaggedElements(options.getItemsElement()).forEach((element) => {
			if (elementIsUntagged(element)) element.dataset[INFINITE_SCROLL_PAGE_KEY] = loadedPage?.toString() || "1";
			itemsObserver.observe(element);
		});
		rememberElements();
	};
	const getElementsRememberKey = () => `inertia:infinite-scroll-elements:${options.getPropName()}`;
	const rememberElements = () => {
		const pageElementRange = {};
		const childNodes = options.getItemsElement().childNodes;
		for (let index = 0; index < childNodes.length; index++) {
			const node = childNodes[index];
			if (node.nodeType !== Node.ELEMENT_NODE) continue;
			const page2 = getPageFromElement(node);
			if (typeof page2 === "undefined") continue;
			if (!(page2 in pageElementRange)) pageElementRange[page2] = {
				from: index,
				to: index
			};
			else pageElementRange[page2].to = index;
		}
		router.remember(pageElementRange, getElementsRememberKey());
	};
	const rememberElementsDebounced = debounce(rememberElements, 250);
	const restoreElements = () => {
		const pageElementRange = router.restore(getElementsRememberKey());
		if (!pageElementRange || typeof pageElementRange !== "object") return false;
		const childNodes = options.getItemsElement().childNodes;
		for (let index = 0; index < childNodes.length; index++) {
			const node = childNodes[index];
			if (node.nodeType !== Node.ELEMENT_NODE) continue;
			const element = node;
			let elementPage;
			for (const [page2, range] of Object.entries(pageElementRange)) if (index >= range.from && index <= range.to) {
				elementPage = page2;
				break;
			}
			if (elementPage) element.dataset[INFINITE_SCROLL_PAGE_KEY] = elementPage;
			else if (!elementIsUntagged(element)) continue;
			else element.dataset[INFINITE_SCROLL_IGNORE_KEY] = "true";
			itemsObserver.observe(element);
		}
		return true;
	};
	return {
		setupObservers,
		enableTriggers,
		disableTriggers,
		refreshTriggers,
		flushAll,
		processManuallyAddedElements,
		processServerLoadedElements
	};
};
var queue3 = new Queue();
var initialUrl;
var payloadUrl;
var initialUrlWasAbsolute = null;
var useInfiniteScrollQueryString = (options) => {
	let enabled = true;
	const queuePageUpdate = (page2) => {
		queue3.add(() => {
			return new Promise((resolve) => {
				if (!enabled) {
					initialUrl = payloadUrl = null;
					return resolve();
				}
				if (!initialUrl || !payloadUrl) {
					const currentPageUrl = page.get().url;
					initialUrl = hrefToUrl(currentPageUrl);
					payloadUrl = hrefToUrl(currentPageUrl);
					initialUrlWasAbsolute = urlHasProtocol(currentPageUrl);
				}
				const pageName = options.getPageName();
				const searchParams = payloadUrl.searchParams;
				if (page2 === "1") searchParams.delete(pageName);
				else searchParams.set(pageName, page2);
				setTimeout(() => resolve());
			});
		}).finally(() => {
			if (enabled && initialUrl && payloadUrl && initialUrl.href !== payloadUrl.href && initialUrlWasAbsolute !== null) router.replace({
				url: urlToString(payloadUrl, initialUrlWasAbsolute),
				preserveScroll: true,
				preserveState: true
			});
			initialUrl = payloadUrl = initialUrlWasAbsolute = null;
		});
	};
	return {
		onItemIntersected: debounce((itemElement) => {
			const itemsElement = options.getItemsElement();
			if (!enabled || options.shouldPreserveUrl() || !itemElement || !itemsElement) return;
			const pageMap = /* @__PURE__ */ new Map();
			getElementsInViewportFromCollection([...itemsElement.children], itemElement).forEach((element) => {
				const page2 = getPageFromElement(element) ?? "1";
				if (pageMap.has(page2)) pageMap.set(page2, pageMap.get(page2) + 1);
				else pageMap.set(page2, 1);
			});
			const mostVisiblePage = Array.from(pageMap.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
			if (mostVisiblePage !== void 0) queuePageUpdate(mostVisiblePage);
		}, 250),
		cancel: () => enabled = false
	};
};
var useInfiniteScrollPreservation = (options) => {
	const createCallbacks = () => {
		let currentScrollTop;
		let referenceElement = null;
		let referenceElementTop = 0;
		const captureScrollPosition = () => {
			const scrollableContainer = options.getScrollableParent();
			const itemsElement = options.getItemsElement();
			currentScrollTop = scrollableContainer?.scrollTop || window.scrollY;
			const visibleElements = getElementsInViewportFromCollection([...itemsElement.children]);
			if (visibleElements.length > 0) {
				referenceElement = visibleElements[0];
				const containerRect = scrollableContainer?.getBoundingClientRect() || { top: 0 };
				const containerTop = scrollableContainer ? containerRect.top : 0;
				referenceElementTop = referenceElement.getBoundingClientRect().top - containerTop;
			}
		};
		const restoreScrollPosition = () => {
			if (!referenceElement) return;
			let attempts = 0;
			let restored = false;
			const restore = () => {
				attempts++;
				if (restored || attempts > 10) return false;
				const scrollableContainer = options.getScrollableParent();
				const containerRect = scrollableContainer?.getBoundingClientRect() || { top: 0 };
				const containerTop = scrollableContainer ? containerRect.top : 0;
				const adjustment = referenceElement.getBoundingClientRect().top - containerTop - referenceElementTop;
				if (adjustment === 0) {
					window.requestAnimationFrame(restore);
					return;
				}
				if (scrollableContainer) scrollableContainer.scrollTo({ top: currentScrollTop + adjustment });
				else window.scrollTo(0, window.scrollY + adjustment);
				restored = true;
			};
			window.requestAnimationFrame(restore);
		};
		return {
			captureScrollPosition,
			restoreScrollPosition
		};
	};
	return { createCallbacks };
};
function useInfiniteScroll(options) {
	const queryStringManager = useInfiniteScrollQueryString({
		...options,
		getPageName: () => dataManager.getPageName()
	});
	const scrollPreservation = useInfiniteScrollPreservation(options);
	const elementManager = useInfiniteScrollElementManager({
		...options,
		onItemIntersected: queryStringManager.onItemIntersected,
		onPreviousTriggered: () => dataManager.fetchPrevious(),
		onNextTriggered: () => dataManager.fetchNext()
	});
	const dataManager = useInfiniteScrollData({
		...options,
		onBeforeUpdate: elementManager.processManuallyAddedElements,
		onCompletePreviousRequest: (_, details) => {
			options.onCompletePreviousRequest(details);
			if (details.completed) requestAnimationFrame(() => elementManager.processServerLoadedElements(details.page), 2);
		},
		onCompleteNextRequest: (_, details) => {
			options.onCompleteNextRequest(details);
			if (details.completed) requestAnimationFrame(() => elementManager.processServerLoadedElements(details.page), 2);
		},
		onReset: options.onDataReset
	});
	const addScrollPreservationCallbacks = (reloadOptions) => {
		const { captureScrollPosition, restoreScrollPosition } = scrollPreservation.createCallbacks();
		const originalOnBeforeUpdate = reloadOptions.onBeforeUpdate || (() => {});
		const originalOnSuccess = reloadOptions.onSuccess || (() => {});
		reloadOptions.onBeforeUpdate = (page2) => {
			originalOnBeforeUpdate(page2);
			captureScrollPosition();
		};
		reloadOptions.onSuccess = (page2) => {
			originalOnSuccess(page2);
			restoreScrollPosition();
		};
		return reloadOptions;
	};
	const originalFetchNext = dataManager.fetchNext;
	dataManager.fetchNext = (reloadOptions = {}) => {
		if (options.inReverseMode()) reloadOptions = addScrollPreservationCallbacks(reloadOptions);
		originalFetchNext(reloadOptions);
	};
	const originalFetchPrevious = dataManager.fetchPrevious;
	dataManager.fetchPrevious = (reloadOptions = {}) => {
		if (!options.inReverseMode()) reloadOptions = addScrollPreservationCallbacks(reloadOptions);
		originalFetchPrevious(reloadOptions);
	};
	const removeEventListener = router.on("success", () => requestAnimationFrame(elementManager.refreshTriggers, 2));
	return {
		dataManager,
		elementManager,
		flush: () => {
			removeEventListener();
			dataManager.removeEventListener();
			elementManager.flushAll();
			queryStringManager.cancel();
		}
	};
}
function isContentEditableOrPrevented(event) {
	return event.target instanceof HTMLElement && event.target.isContentEditable || event.defaultPrevented;
}
function shouldIntercept(event) {
	const isLink = event.currentTarget.tagName.toLowerCase() === "a";
	const target = isLink ? event.currentTarget.target : "";
	return !(isContentEditableOrPrevented(event) || isLink && event.altKey || isLink && event.ctrlKey || isLink && event.metaKey || isLink && event.shiftKey || isLink && target !== "" && target !== "_self" || isLink && "button" in event && event.button !== 0);
}
function shouldNavigate(event) {
	const isButton = event.currentTarget.tagName.toLowerCase() === "button";
	return !isContentEditableOrPrevented(event) && (event.key === "Enter" || isButton && event.key === " ");
}
var baseComponentSelector = "nprogress";
var progress2;
var settings = {
	minimum: .08,
	easing: "linear",
	positionUsing: "translate3d",
	speed: 200,
	trickle: true,
	trickleSpeed: 200,
	showSpinner: true,
	barSelector: "[role=\"bar\"]",
	spinnerSelector: "[role=\"spinner\"]",
	parent: "body",
	color: "#29d",
	includeCSS: true,
	template: [
		"<div class=\"bar\" role=\"bar\">",
		"<div class=\"peg\"></div>",
		"</div>",
		"<div class=\"spinner\" role=\"spinner\">",
		"<div class=\"spinner-icon\"></div>",
		"</div>"
	].join("")
};
var status = null;
var configure = (options) => {
	Object.assign(settings, options);
	if (settings.includeCSS) injectCSS(settings.color);
	progress2 = document.createElement("div");
	progress2.id = baseComponentSelector;
	progress2.innerHTML = settings.template;
};
var set5 = (n) => {
	const started = isStarted();
	n = clamp(n, settings.minimum, 1);
	status = n === 1 ? null : n;
	const progress3 = render(!started);
	const bar = progress3.querySelector(settings.barSelector);
	const speed = settings.speed;
	const ease = settings.easing;
	progress3.offsetWidth;
	queue4((next) => {
		const barStyles = (() => {
			if (settings.positionUsing === "translate3d") return {
				transition: `all ${speed}ms ${ease}`,
				transform: `translate3d(${toBarPercentage(n)}%,0,0)`
			};
			if (settings.positionUsing === "translate") return {
				transition: `all ${speed}ms ${ease}`,
				transform: `translate(${toBarPercentage(n)}%,0)`
			};
			return { marginLeft: `${toBarPercentage(n)}%` };
		})();
		for (const key in barStyles) bar.style[key] = barStyles[key];
		if (n !== 1) return setTimeout(next, speed);
		progress3.style.transition = "none";
		progress3.style.opacity = "1";
		progress3.offsetWidth;
		setTimeout(() => {
			progress3.style.transition = `all ${speed}ms linear`;
			progress3.style.opacity = "0";
			setTimeout(() => {
				remove();
				progress3.style.transition = "";
				progress3.style.opacity = "";
				next();
			}, speed);
		}, speed);
	});
};
var isStarted = () => typeof status === "number";
var start = () => {
	if (!status) set5(0);
	const work = function() {
		setTimeout(function() {
			if (!status) return;
			increaseByRandom();
			work();
		}, settings.trickleSpeed);
	};
	if (settings.trickle) work();
};
var done = (force) => {
	if (!force && !status) return;
	increaseByRandom(.3 + .5 * Math.random());
	set5(1);
};
var increaseByRandom = (amount) => {
	const n = status;
	if (n === null) return start();
	if (n > 1) return;
	amount = typeof amount === "number" ? amount : (() => {
		const ranges = {
			.1: [0, .2],
			.04: [.2, .5],
			.02: [.5, .8],
			.005: [.8, .99]
		};
		for (const r in ranges) if (n >= ranges[r][0] && n < ranges[r][1]) return parseFloat(r);
		return 0;
	})();
	return set5(clamp(n + amount, 0, .994));
};
var render = (fromStart) => {
	if (isRendered()) return document.getElementById(baseComponentSelector);
	document.documentElement.classList.add(`${baseComponentSelector}-busy`);
	const bar = progress2.querySelector(settings.barSelector);
	const perc = fromStart ? "-100" : toBarPercentage(status || 0);
	const parent = getParent();
	bar.style.transition = "all 0 linear";
	bar.style.transform = `translate3d(${perc}%,0,0)`;
	if (!settings.showSpinner) progress2.querySelector(settings.spinnerSelector)?.remove();
	if (parent !== document.body) parent.classList.add(`${baseComponentSelector}-custom-parent`);
	parent.appendChild(progress2);
	return progress2;
};
var getParent = () => {
	return isDOM(settings.parent) ? settings.parent : document.querySelector(settings.parent);
};
var remove = () => {
	document.documentElement.classList.remove(`${baseComponentSelector}-busy`);
	getParent().classList.remove(`${baseComponentSelector}-custom-parent`);
	progress2?.remove();
};
var isRendered = () => {
	return document.getElementById(baseComponentSelector) !== null;
};
var isDOM = (obj) => {
	if (typeof HTMLElement === "object") return obj instanceof HTMLElement;
	return obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string";
};
function clamp(n, min, max) {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}
var toBarPercentage = (n) => (-1 + n) * 100;
var queue4 = /* @__PURE__ */ (() => {
	const pending = [];
	const next = () => {
		const fn = pending.shift();
		if (fn) fn(next);
	};
	return (fn) => {
		pending.push(fn);
		if (pending.length === 1) next();
	};
})();
var injectCSS = (color) => {
	const element = document.createElement("style");
	element.textContent = `
    #${baseComponentSelector} {
      pointer-events: none;
    }

    #${baseComponentSelector} .bar {
      background: ${color};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #${baseComponentSelector} .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1.0;

      transform: rotate(3deg) translate(0px, -4px);
    }

    #${baseComponentSelector} .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #${baseComponentSelector} .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;

      animation: ${baseComponentSelector}-spinner 400ms linear infinite;
    }

    .${baseComponentSelector}-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .${baseComponentSelector}-custom-parent #${baseComponentSelector} .spinner,
    .${baseComponentSelector}-custom-parent #${baseComponentSelector} .bar {
      position: absolute;
    }

    @keyframes ${baseComponentSelector}-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
	document.head.appendChild(element);
};
var show = () => {
	if (progress2) progress2.style.display = "";
};
var hide = () => {
	if (progress2) progress2.style.display = "none";
};
var progress_component_default = {
	configure,
	isStarted,
	done,
	set: set5,
	remove,
	start,
	status,
	show,
	hide
};
var Progress = class {
	constructor() {
		this.hideCount = 0;
	}
	start() {
		progress_component_default.start();
	}
	reveal(force = false) {
		this.hideCount = Math.max(0, this.hideCount - 1);
		if (force || this.hideCount === 0) progress_component_default.show();
	}
	hide() {
		this.hideCount++;
		progress_component_default.hide();
	}
	set(status2) {
		progress_component_default.set(Math.max(0, Math.min(1, status2)));
	}
	finish() {
		progress_component_default.done();
	}
	reset() {
		progress_component_default.set(0);
	}
	remove() {
		progress_component_default.done();
		progress_component_default.remove();
	}
	isStarted() {
		return progress_component_default.isStarted();
	}
	getStatus() {
		return progress_component_default.status;
	}
};
var progress = new Progress();
progress.reveal;
progress.hide;
function addEventListeners(delay) {
	document.addEventListener("inertia:start", (e) => handleStartEvent(e, delay));
	document.addEventListener("inertia:progress", handleProgressEvent);
}
function handleStartEvent(event, delay) {
	if (!event.detail.visit.showProgress) progress.hide();
	const timeout = setTimeout(() => progress.start(), delay);
	document.addEventListener("inertia:finish", (e) => finish(e, timeout), { once: true });
}
function handleProgressEvent(event) {
	if (progress.isStarted() && event.detail.progress?.percentage) progress.set(Math.max(progress.getStatus(), event.detail.progress.percentage / 100 * .9));
}
function finish(event, timeout) {
	clearTimeout(timeout);
	if (!progress.isStarted()) return;
	if (event.detail.visit.completed) progress.finish();
	else if (event.detail.visit.interrupted) progress.reset();
	else if (event.detail.visit.cancelled) progress.remove();
}
function setupProgress({ delay = 250, color = "#29d", includeCSS = true, showSpinner = false } = {}) {
	addEventListeners(delay);
	progress_component_default.configure({
		showSpinner,
		includeCSS,
		color
	});
}
var FormComponentResetSymbol = Symbol("FormComponentReset");
function isFormElement(element) {
	return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;
}
function resetInputElement(input, defaultValues) {
	const oldValue = input.value;
	const oldChecked = input.checked;
	switch (input.type.toLowerCase()) {
		case "checkbox":
			input.checked = defaultValues.includes(input.value);
			break;
		case "radio":
			input.checked = defaultValues[0] === input.value;
			break;
		case "file":
			input.value = "";
			break;
		case "button":
		case "submit":
		case "reset":
		case "image": break;
		default: input.value = defaultValues[0] !== null && defaultValues[0] !== void 0 ? String(defaultValues[0]) : "";
	}
	return input.value !== oldValue || input.checked !== oldChecked;
}
function resetSelectElement(select, defaultValues) {
	const oldValue = select.value;
	const oldSelectedOptions = Array.from(select.selectedOptions).map((opt) => opt.value);
	if (select.multiple) {
		const defaultStrings = defaultValues.map((value) => String(value));
		Array.from(select.options).forEach((option) => {
			option.selected = defaultStrings.includes(option.value);
		});
	} else select.value = defaultValues[0] !== void 0 ? String(defaultValues[0]) : "";
	const newSelectedOptions = Array.from(select.selectedOptions).map((opt) => opt.value);
	return select.multiple ? JSON.stringify(oldSelectedOptions.sort()) !== JSON.stringify(newSelectedOptions.sort()) : select.value !== oldValue;
}
function resetFormElement(element, defaultValues) {
	if (element.disabled) {
		if (element instanceof HTMLInputElement) {
			const oldValue = element.value;
			const oldChecked = element.checked;
			switch (element.type.toLowerCase()) {
				case "checkbox":
				case "radio":
					element.checked = element.defaultChecked;
					return element.checked !== oldChecked;
				case "file":
					element.value = "";
					return oldValue !== "";
				case "button":
				case "submit":
				case "reset":
				case "image": return false;
				default:
					element.value = element.defaultValue;
					return element.value !== oldValue;
			}
		} else if (element instanceof HTMLSelectElement) {
			const oldSelectedOptions = Array.from(element.selectedOptions).map((opt) => opt.value);
			Array.from(element.options).forEach((option) => {
				option.selected = option.defaultSelected;
			});
			const newSelectedOptions = Array.from(element.selectedOptions).map((opt) => opt.value);
			return JSON.stringify(oldSelectedOptions.sort()) !== JSON.stringify(newSelectedOptions.sort());
		} else if (element instanceof HTMLTextAreaElement) {
			const oldValue = element.value;
			element.value = element.defaultValue;
			return element.value !== oldValue;
		}
		return false;
	}
	if (element instanceof HTMLInputElement) return resetInputElement(element, defaultValues);
	else if (element instanceof HTMLSelectElement) return resetSelectElement(element, defaultValues);
	else if (element instanceof HTMLTextAreaElement) {
		const oldValue = element.value;
		element.value = defaultValues[0] !== void 0 ? String(defaultValues[0]) : "";
		return element.value !== oldValue;
	}
	return false;
}
function resetFieldElements(elements, defaultValues) {
	let hasChanged = false;
	if (elements instanceof RadioNodeList || elements instanceof HTMLCollection) Array.from(elements).forEach((node, index) => {
		if (node instanceof Element && isFormElement(node)) {
			if (node instanceof HTMLInputElement && ["checkbox", "radio"].includes(node.type.toLowerCase())) {
				if (resetFormElement(node, defaultValues)) hasChanged = true;
			} else if (resetFormElement(node, defaultValues[index] !== void 0 ? [defaultValues[index]] : [defaultValues[0] ?? null].filter(Boolean))) hasChanged = true;
		}
	});
	else if (isFormElement(elements)) hasChanged = resetFormElement(elements, defaultValues);
	return hasChanged;
}
function resetFormFields(formElement, defaults, fieldNames) {
	if (!formElement) return;
	const resetEntireForm = !fieldNames || fieldNames.length === 0;
	if (resetEntireForm) {
		const formData = new FormData(formElement);
		const formElementNames = Array.from(formElement.elements).map((el) => isFormElement(el) ? el.name : "").filter(Boolean);
		fieldNames = [.../* @__PURE__ */ new Set([
			...defaults.keys(),
			...formData.keys(),
			...formElementNames
		])];
	}
	let hasChanged = false;
	fieldNames.forEach((fieldName) => {
		const elements = formElement.elements.namedItem(fieldName);
		if (elements) {
			if (resetFieldElements(elements, defaults.getAll(fieldName))) hasChanged = true;
		}
	});
	if (hasChanged && resetEntireForm) formElement.dispatchEvent(new CustomEvent("reset", {
		bubbles: true,
		cancelable: true,
		detail: { [FormComponentResetSymbol]: true }
	}));
}
var router = new Router();
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
* @license MIT */
//#endregion
//#region node_modules/laravel-precognition/dist/client.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
/**
* The configured axios client.
*/
var axiosClient = axios.create();
/**
* The request fingerprint resolver.
*/
var requestFingerprintResolver = (config, axios) => `${config.method}:${config.baseURL ?? axios.defaults.baseURL ?? ""}${config.url}`;
/**
* The precognition success resolver.
*/
var successResolver = (response) => response.status === 204 && response.headers["precognition-success"] === "true";
/**
* The abort controller cache.
*/
var abortControllers = {};
/**
* The precognitive HTTP client instance.
*/
var client = {
	get: (url, data = {}, config = {}) => request(mergeConfig("get", url, data, config)),
	post: (url, data = {}, config = {}) => request(mergeConfig("post", url, data, config)),
	patch: (url, data = {}, config = {}) => request(mergeConfig("patch", url, data, config)),
	put: (url, data = {}, config = {}) => request(mergeConfig("put", url, data, config)),
	delete: (url, data = {}, config = {}) => request(mergeConfig("delete", url, data, config)),
	use(axios) {
		axiosClient = axios;
		return client;
	},
	axios() {
		return axiosClient;
	},
	fingerprintRequestsUsing(callback) {
		requestFingerprintResolver = callback === null ? () => null : callback;
		return client;
	},
	determineSuccessUsing(callback) {
		successResolver = callback;
		return client;
	}
};
/**
* Merge the client specified arguments with the provided configuration.
*/
var mergeConfig = (method, url, data, config) => ({
	url,
	method,
	...config,
	...["get", "delete"].includes(method) ? { params: merge$1({}, data, config?.params) } : { data: merge$1({}, data, config?.data) }
});
/**
* Send and handle a new request.
*/
var request = (userConfig = {}) => {
	const config = [
		resolveConfig,
		abortMatchingRequests,
		refreshAbortController
	].reduce((config, callback) => callback(config), userConfig);
	if ((config.onBefore ?? (() => true))() === false) return Promise.resolve(null);
	(config.onStart ?? (() => null))();
	return axiosClient.request(config).then(async (response) => {
		if (config.precognitive) validatePrecognitionResponse(response);
		const status = response.status;
		let payload = response;
		if (config.precognitive && config.onPrecognitionSuccess && successResolver(payload)) payload = await Promise.resolve(config.onPrecognitionSuccess(payload) ?? payload);
		if (config.onSuccess && isSuccess(status)) payload = await Promise.resolve(config.onSuccess(payload) ?? payload);
		return (resolveStatusHandler(config, status) ?? ((response) => response))(payload) ?? payload;
	}, (error) => {
		if (isNotServerGeneratedError(error)) return Promise.reject(error);
		if (config.precognitive) validatePrecognitionResponse(error.response);
		return (resolveStatusHandler(config, error.response.status) ?? ((_, error) => Promise.reject(error)))(error.response, error);
	}).finally(config.onFinish ?? (() => null));
};
/**
* Resolve the configuration.
*/
var resolveConfig = (config) => {
	const only = config.only ?? config.validate;
	return {
		...config,
		timeout: config.timeout ?? axiosClient.defaults["timeout"] ?? 3e4,
		precognitive: config.precognitive !== false,
		fingerprint: typeof config.fingerprint === "undefined" ? requestFingerprintResolver(config, axiosClient) : config.fingerprint,
		headers: {
			...config.headers,
			"Content-Type": resolveContentType(config),
			...config.precognitive !== false ? { Precognition: true } : {},
			...only ? { "Precognition-Validate-Only": Array.from(only).join() } : {}
		}
	};
};
/**
* Determine if the status is successful.
*/
var isSuccess = (status) => status >= 200 && status < 300;
/**
* Abort an existing request with the same configured fingerprint.
*/
var abortMatchingRequests = (config) => {
	if (typeof config.fingerprint !== "string") return config;
	abortControllers[config.fingerprint]?.abort();
	delete abortControllers[config.fingerprint];
	return config;
};
/**
* Create and configure the abort controller for a new request.
*/
var refreshAbortController = (config) => {
	if (typeof config.fingerprint !== "string" || config.signal || config.cancelToken || !config.precognitive) return config;
	abortControllers[config.fingerprint] = new AbortController();
	return {
		...config,
		signal: abortControllers[config.fingerprint].signal
	};
};
/**
* Ensure that the response is a Precognition response.
*/
var validatePrecognitionResponse = (response) => {
	if (response.headers?.precognition !== "true") throw Error("Did not receive a Precognition response. Ensure you have the Precognition middleware in place for the route.");
};
/**
* Determine if the error was not triggered by a server response.
*/
var isNotServerGeneratedError = (error) => {
	return !isAxiosError(error) || typeof error.response?.status !== "number" || isCancel(error);
};
/**
* Resolve the handler for the given HTTP response status.
*/
var resolveStatusHandler = (config, code) => ({
	401: config.onUnauthorized,
	403: config.onForbidden,
	404: config.onNotFound,
	409: config.onConflict,
	422: config.onValidationError,
	423: config.onLocked
})[code];
/**
* Resolve the request's "Content-Type" header.
*/
var resolveContentType = (config) => config.headers?.["Content-Type"] ?? config.headers?.["Content-type"] ?? config.headers?.["content-type"] ?? (hasFiles(config.data) ? "multipart/form-data" : "application/json");
/**
* Determine if the payload has any files.
*
* @see https://github.com/inertiajs/inertia/blob/master/packages/core/src/files.ts
*/
var hasFiles = (data) => isFile(data) || typeof data === "object" && data !== null && Object.values(data).some((value) => hasFiles(value));
/**
* Determine if the value is a file.
*/
var isFile = (value) => typeof File !== "undefined" && value instanceof File || value instanceof Blob || typeof FileList !== "undefined" && value instanceof FileList && value.length > 0;
//#endregion
//#region node_modules/laravel-precognition/dist/validator.js
/**
* Expand a wildcard path to concrete paths using the given data.
*
* Examples:
* - 'users.*' with {users: [{name: 'A'}, {name: 'B'}]} => ['users.0', 'users.1']
* - 'users.*.name' with {users: [{name: 'A'}, {name: 'B'}]} => ['users.0.name', 'users.1.name']
* - 'author.*' with {author: {name: 'John', bio: 'Dev'}} => ['author.name', 'author.bio']
*/
var expandWildcardPaths = (pattern, data) => {
	if (!pattern.includes("*")) return [pattern];
	const parts = pattern.split(".");
	let paths = [""];
	for (const part of parts) if (part === "*") {
		const expanded = [];
		for (const path of paths) {
			const value = path ? get(data, path) : data;
			if (Array.isArray(value)) for (let index = 0; index < value.length; index++) expanded.push(path ? `${path}.${index}` : String(index));
			else if (value !== null && typeof value === "object") for (const key of Object.keys(value)) expanded.push(path ? `${path}.${key}` : key);
		}
		paths = expanded;
	} else paths = paths.map((path) => path ? `${path}.${part}` : part);
	return paths;
};
/**
* Determine if a key matches the given pattern.
*/
var keyMatchesPattern = (key, pattern) => {
	if (!pattern.includes("*")) return key === pattern;
	return new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, "[^.]+") + "$").test(key);
};
/**
* Omit entries from an object whose keys match the given patterns.
*/
var omitByPattern = (obj, patterns) => {
	return Object.fromEntries(Object.entries(obj).filter(([key]) => {
		return !patterns.some((pattern) => keyMatchesPattern(key, pattern));
	}));
};
var createValidator = (callback, initialData = {}) => {
	/**
	* Event listener state.
	*/
	const listeners = {
		errorsChanged: [],
		touchedChanged: [],
		validatingChanged: [],
		validatedChanged: []
	};
	/**
	* Validate files state.
	*/
	let validateFiles = false;
	/**
	* Processing validation state.
	*/
	let validating = false;
	/**
	* Set the validating inputs.
	*
	* Returns an array of listeners that should be invoked once all state
	* changes have taken place.
	*/
	const setValidating = (value) => {
		if (value !== validating) {
			validating = value;
			return listeners.validatingChanged;
		}
		return [];
	};
	/**
	* Inputs that have been validated.
	*/
	let validated = [];
	/**
	* Set the validated inputs.
	*
	* Returns an array of listeners that should be invoked once all state
	* changes have taken place.
	*/
	const setValidated = (value) => {
		const uniqueNames = [...new Set(value)];
		if (validated.length !== uniqueNames.length || !uniqueNames.every((name) => validated.includes(name))) {
			validated = uniqueNames;
			return listeners.validatedChanged;
		}
		return [];
	};
	/**
	* Valid validation state.
	*/
	const valid = () => validated.filter((name) => typeof errors[name] === "undefined");
	/**
	* Touched input state.
	*/
	let touched = [];
	/**
	* Set the touched inputs.
	*
	* Returns an array of listeners that should be invoked once all state
	* changes have taken place.
	*/
	const setTouched = (value) => {
		const uniqueNames = [...new Set(value)];
		if (touched.length !== uniqueNames.length || !uniqueNames.every((name) => touched.includes(name))) {
			touched = uniqueNames;
			return listeners.touchedChanged;
		}
		return [];
	};
	/**
	* Validation errors state.
	*/
	let errors = {};
	/**
	* Set the input errors.
	*
	* Returns an array of listeners that should be invoked once all state
	* changes have taken place.
	*/
	const setErrors = (value) => {
		const prepared = toValidationErrors(value);
		if (!isEqual(errors, prepared)) {
			errors = prepared;
			return listeners.errorsChanged;
		}
		return [];
	};
	/**
	* Forget the given input's errors.
	*
	* Returns an array of listeners that should be invoked once all state
	* changes have taken place.
	*/
	const forgetError = (name) => {
		const newErrors = { ...errors };
		delete newErrors[resolveName(name)];
		return setErrors(newErrors);
	};
	/**
	* Has errors state.
	*/
	const hasErrors = () => Object.keys(errors).length > 0;
	/**
	* Debouncing timeout state.
	*/
	let debounceTimeoutDuration = 1500;
	const setDebounceTimeout = (value) => {
		debounceTimeoutDuration = value;
		validator.cancel();
		validator = createValidator();
	};
	/**
	* The old data.
	*/
	let oldData = initialData;
	/**
	* The data currently being validated.
	*/
	let validatingData = null;
	/**
	* The old touched.
	*/
	let oldTouched = [];
	/**
	* The touched currently being validated.
	*/
	let validatingTouched = null;
	/**
	* Create a debounced validation callback.
	*/
	const createValidator = () => debounce$1((instanceConfig) => {
		callback({
			get: (url, data = {}, globalConfig = {}) => client.get(url, parseData(data), resolveConfig(globalConfig, instanceConfig, data)),
			post: (url, data = {}, globalConfig = {}) => client.post(url, parseData(data), resolveConfig(globalConfig, instanceConfig, data)),
			patch: (url, data = {}, globalConfig = {}) => client.patch(url, parseData(data), resolveConfig(globalConfig, instanceConfig, data)),
			put: (url, data = {}, globalConfig = {}) => client.put(url, parseData(data), resolveConfig(globalConfig, instanceConfig, data)),
			delete: (url, data = {}, globalConfig = {}) => client.delete(url, parseData(data), resolveConfig(globalConfig, instanceConfig, data))
		}).catch((error) => {
			if (isCancel(error)) return null;
			if (isAxiosError(error) && error.response?.status === 422) return null;
			return Promise.reject(error);
		});
	}, debounceTimeoutDuration, {
		leading: true,
		trailing: true
	});
	/**
	* Validator state.
	*/
	let validator = createValidator();
	/**
	* Resolve the configuration.
	*/
	const resolveConfig = (globalConfig, instanceConfig, data = {}) => {
		const config = {
			...globalConfig,
			...instanceConfig
		};
		const only = Array.from(config.only ?? config.validate ?? touched);
		return {
			...instanceConfig,
			...mergeConfig$1(globalConfig, instanceConfig),
			only,
			timeout: config.timeout ?? 5e3,
			onValidationError: (response, axiosError) => {
				[...setValidated([...validated, ...only]), ...setErrors(merge$1(omitByPattern({ ...errors }, only), response.data.errors))].forEach((listener) => listener());
				return config.onValidationError ? config.onValidationError(response, axiosError) : Promise.reject(axiosError);
			},
			onSuccess: (response) => {
				setValidated([...validated, ...only]).forEach((listener) => listener());
				return config.onSuccess ? config.onSuccess(response) : response;
			},
			onPrecognitionSuccess: (response) => {
				[...setValidated([...validated, ...only]), ...setErrors(omitByPattern({ ...errors }, only))].forEach((listener) => listener());
				return config.onPrecognitionSuccess ? config.onPrecognitionSuccess(response) : response;
			},
			onBefore: () => {
				const hasWildcards = touched.some((name) => name.includes("*"));
				const expandedTouched = hasWildcards ? [...new Set(touched.flatMap((name) => expandWildcardPaths(name, data)))] : touched;
				if (config.onBeforeValidation && config.onBeforeValidation({
					data,
					touched: expandedTouched
				}, {
					data: oldData,
					touched: oldTouched
				}) === false) return false;
				if ((config.onBefore || (() => true))() === false) return false;
				if (hasWildcards) setTouched(expandedTouched).forEach((listener) => listener());
				validatingTouched = touched;
				validatingData = data;
				return true;
			},
			onStart: () => {
				setValidating(true).forEach((listener) => listener());
				(config.onStart ?? (() => null))();
			},
			onFinish: () => {
				setValidating(false).forEach((listener) => listener());
				oldTouched = validatingTouched;
				oldData = validatingData;
				validatingTouched = validatingData = null;
				(config.onFinish ?? (() => null))();
			}
		};
	};
	/**
	* Validate the given input.
	*/
	const validate = (name, value, config) => {
		if (typeof name === "undefined") {
			const only = Array.from(config?.only ?? config?.validate ?? []);
			setTouched([...touched, ...only]).forEach((listener) => listener());
			validator(config ?? {});
			return;
		}
		if (isFile(value) && !validateFiles) {
			console.warn("Precognition file validation is not active. Call the \"validateFiles\" function on your form to enable it.");
			return;
		}
		name = resolveName(name);
		if (name.includes("*") || get(oldData, name) !== value) {
			setTouched([name, ...touched]).forEach((listener) => listener());
			validator(config ?? {});
		}
	};
	/**
	* Parse the validated data.
	*/
	const parseData = (data) => validateFiles === false ? forgetFiles(data) : data;
	/**
	* The form validator instance.
	*/
	const form = {
		touched: () => touched,
		validate(name, value, config) {
			if (typeof name === "object" && !("target" in name)) {
				config = name;
				name = value = void 0;
			}
			validate(name, value, config);
			return form;
		},
		touch(input) {
			const inputs = Array.isArray(input) ? input : [resolveName(input)];
			setTouched([...touched, ...inputs]).forEach((listener) => listener());
			return form;
		},
		validating: () => validating,
		valid,
		errors: () => errors,
		hasErrors,
		setErrors(value) {
			setErrors(value).forEach((listener) => listener());
			return form;
		},
		forgetError(name) {
			forgetError(name).forEach((listener) => listener());
			return form;
		},
		defaults(data) {
			initialData = data;
			oldData = data;
			return form;
		},
		reset(...names) {
			if (names.length === 0) setTouched([]).forEach((listener) => listener());
			else {
				const newTouched = [...touched];
				names.forEach((name) => {
					if (newTouched.includes(name)) newTouched.splice(newTouched.indexOf(name), 1);
					set(oldData, name, get(initialData, name));
				});
				setTouched(newTouched).forEach((listener) => listener());
			}
			return form;
		},
		setTimeout(value) {
			setDebounceTimeout(value);
			return form;
		},
		on(event, callback) {
			listeners[event].push(callback);
			return form;
		},
		validateFiles() {
			validateFiles = true;
			return form;
		},
		withoutFileValidation() {
			validateFiles = false;
			return form;
		}
	};
	return form;
};
/**
* Normalise the validation errors as Inertia formatted errors.
*/
var toSimpleValidationErrors = (errors) => {
	return Object.keys(errors).reduce((carry, key) => ({
		...carry,
		[key]: Array.isArray(errors[key]) ? errors[key][0] : errors[key]
	}), {});
};
/**
* Normalise the validation errors as Laravel formatted errors.
*/
var toValidationErrors = (errors) => {
	return Object.keys(errors).reduce((carry, key) => ({
		...carry,
		[key]: typeof errors[key] === "string" ? [errors[key]] : errors[key]
	}), {});
};
/**
* Resolve the input's "name" attribute.
*/
var resolveName = (name) => {
	return typeof name !== "string" ? name.target.name : name;
};
/**
* Forget any files from the payload.
*/
var forgetFiles = (data) => {
	const newData = { ...data };
	Object.keys(newData).forEach((name) => {
		const value = newData[name];
		if (value === null) return;
		if (isFile(value)) {
			delete newData[name];
			return;
		}
		if (Array.isArray(value)) {
			newData[name] = Object.values(forgetFiles({ ...value }));
			return;
		}
		if (typeof value === "object") {
			newData[name] = forgetFiles(newData[name]);
			return;
		}
	});
	return newData;
};
//#endregion
//#region node_modules/@inertiajs/react/dist/index.esm.js
var headContext = (0, import_react.createContext)(null);
headContext.displayName = "InertiaHeadContext";
var HeadContext_default = headContext;
var pageContext = (0, import_react.createContext)(null);
pageContext.displayName = "InertiaPageContext";
var PageContext_default = pageContext;
var currentIsInitialPage = true;
var routerIsInitialized = false;
var swapComponent = async () => {
	currentIsInitialPage = false;
};
function App({ children, initialPage, initialComponent, resolveComponent, titleCallback, onHeadUpdate }) {
	const [current, setCurrent] = (0, import_react.useState)({
		component: initialComponent || null,
		page: {
			...initialPage,
			flash: initialPage.flash ?? {}
		},
		key: null
	});
	const headManager = (0, import_react.useMemo)(() => {
		return createHeadManager(typeof window === "undefined", titleCallback || ((title) => title), onHeadUpdate || (() => {}));
	}, []);
	if (!routerIsInitialized) {
		router.init({
			initialPage,
			resolveComponent,
			swapComponent: async (args) => swapComponent(args),
			onFlash: (flash) => {
				setCurrent((current2) => ({
					...current2,
					page: {
						...current2.page,
						flash
					}
				}));
			}
		});
		routerIsInitialized = true;
	}
	(0, import_react.useEffect)(() => {
		swapComponent = async ({ component, page, preserveState }) => {
			if (currentIsInitialPage) {
				currentIsInitialPage = false;
				return;
			}
			(0, import_react_dom.flushSync)(() => setCurrent((current2) => ({
				component,
				page,
				key: preserveState ? current2.key : Date.now()
			})));
		};
		router.on("navigate", () => headManager.forceUpdate());
	}, []);
	if (!current.component) return (0, import_react.createElement)(HeadContext_default.Provider, { value: headManager }, (0, import_react.createElement)(PageContext_default.Provider, { value: current.page }, null));
	const renderChildren = children || (({ Component, props, key }) => {
		const child = (0, import_react.createElement)(Component, {
			key,
			...props
		});
		if (typeof Component.layout === "function") return Component.layout(child);
		if (Array.isArray(Component.layout)) return Component.layout.concat(child).reverse().reduce((children2, Layout) => (0, import_react.createElement)(Layout, {
			children: children2,
			...props
		}));
		return child;
	});
	return (0, import_react.createElement)(HeadContext_default.Provider, { value: headManager }, (0, import_react.createElement)(PageContext_default.Provider, { value: current.page }, renderChildren({
		Component: current.component,
		key: current.key,
		props: current.page.props
	})));
}
App.displayName = "Inertia";
async function createInertiaApp({ id = "app", resolve, setup, title, progress: progress2 = {}, page, render, defaults = {} }) {
	config.replace(defaults);
	const isServer = typeof window === "undefined";
	const useScriptElementForInitialPage = config.get("future.useScriptElementForInitialPage");
	const initialPage = page || getInitialPageFromDOM(id, useScriptElementForInitialPage);
	const resolveComponent = (name) => Promise.resolve(resolve(name)).then((module) => module.default || module);
	let head = [];
	const reactApp = await Promise.all([resolveComponent(initialPage.component), router.decryptHistory().catch(() => {})]).then(([initialComponent]) => {
		const props = {
			initialPage,
			initialComponent,
			resolveComponent,
			titleCallback: title
		};
		if (isServer) return setup({
			el: null,
			App,
			props: {
				...props,
				onHeadUpdate: (elements) => head = elements
			}
		});
		return setup({
			el: document.getElementById(id),
			App,
			props
		});
	});
	if (!isServer && progress2) setupProgress(progress2);
	if (isServer && render) {
		const element = () => {
			if (!useScriptElementForInitialPage) return (0, import_react.createElement)("div", {
				id,
				"data-page": JSON.stringify(initialPage)
			}, reactApp);
			return (0, import_react.createElement)(import_react.Fragment, null, (0, import_react.createElement)("script", {
				"data-page": id,
				type: "application/json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(initialPage).replace(/\//g, "\\/") }
			}), (0, import_react.createElement)("div", { id }, reactApp));
		};
		const body = await render(element());
		return {
			head,
			body
		};
	}
}
var isReact19 = typeof import_react.use === "function";
function usePage() {
	const page = isReact19 ? import_react.use(PageContext_default) : import_react.useContext(PageContext_default);
	if (!page) throw new Error("usePage must be used within the Inertia component");
	return page;
}
var urlWithoutHash = (url) => {
	url = new URL(url.href);
	url.hash = "";
	return url;
};
var isSameUrlWithoutHash = (url1, url2) => {
	return urlWithoutHash(url1).href === urlWithoutHash(url2).href;
};
var Deferred = ({ children, data, fallback }) => {
	if (!data) throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const pageProps = usePage().props;
	const keys = (0, import_react.useMemo)(() => Array.isArray(data) ? data : [data], [data]);
	(0, import_react.useEffect)(() => {
		const removeListener = router3.on("start", (e) => {
			const isPartialVisit = e.detail.visit.only.length > 0 || e.detail.visit.except.length > 0;
			const isReloadingKey = e.detail.visit.only.find((key) => keys.includes(key));
			if (isSameUrlWithoutHash(e.detail.visit.url, window.location) && (!isPartialVisit || isReloadingKey)) setLoaded(false);
		});
		return () => {
			removeListener();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setLoaded(keys.every((key) => pageProps[key] !== void 0));
	}, [pageProps, keys]);
	const propsAreDefined = (0, import_react.useMemo)(() => keys.every((key) => pageProps[key] !== void 0), [keys, pageProps]);
	if (loaded && propsAreDefined) return typeof children === "function" ? children() : children;
	return typeof fallback === "function" ? fallback() : fallback;
};
Deferred.displayName = "InertiaDeferred";
function useRemember(initialState, key, excludeKeysRef) {
	const [state, setState] = (0, import_react.useState)(() => {
		const restored = router.restore(key);
		return restored !== void 0 ? restored : initialState;
	});
	(0, import_react.useEffect)(() => {
		const keys = excludeKeysRef?.current;
		if (keys && keys.length > 0 && typeof state === "object" && state !== null) {
			const filtered = { ...state };
			keys.forEach((k) => delete filtered[k]);
			router.remember(filtered, key);
		} else router.remember(state, key);
	}, [state, key]);
	return [state, setState];
}
function useForm(...args) {
	const isMounted = (0, import_react.useRef)(false);
	const parsedArgs = UseFormUtils.parseUseFormArguments(...args);
	const { rememberKey, data: initialData } = parsedArgs;
	const precognitionEndpoint = (0, import_react.useRef)(parsedArgs.precognitionEndpoint);
	const [defaults, setDefaults] = (0, import_react.useState)(typeof initialData === "function" ? cloneDeep(initialData()) : cloneDeep(initialData));
	const cancelToken = (0, import_react.useRef)(null);
	const recentlySuccessfulTimeoutId = (0, import_react.useRef)(void 0);
	const excludeKeysRef = (0, import_react.useRef)([]);
	const [data, setData] = rememberKey ? useRemember(defaults, `${rememberKey}:data`, excludeKeysRef) : (0, import_react.useState)(defaults);
	const [errors, setErrors] = rememberKey ? useRemember({}, `${rememberKey}:errors`) : (0, import_react.useState)({});
	const [hasErrors, setHasErrors] = (0, import_react.useState)(false);
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [progress2, setProgress] = (0, import_react.useState)(null);
	const [wasSuccessful, setWasSuccessful] = (0, import_react.useState)(false);
	const [recentlySuccessful, setRecentlySuccessful] = (0, import_react.useState)(false);
	const transform = (0, import_react.useRef)((data2) => data2);
	const isDirty = (0, import_react.useMemo)(() => !isEqual(data, defaults), [data, defaults]);
	const validatorRef = (0, import_react.useRef)(null);
	const [validating, setValidating] = (0, import_react.useState)(false);
	const [touchedFields, setTouchedFields] = (0, import_react.useState)([]);
	const [validFields, setValidFields] = (0, import_react.useState)([]);
	const withAllErrors = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	const setDefaultsCalledInOnSuccess = (0, import_react.useRef)(false);
	const dataRef = (0, import_react.useRef)(data);
	(0, import_react.useEffect)(() => {
		dataRef.current = data;
	});
	const commitData = (0, import_react.useCallback)((next) => {
		dataRef.current = next;
		setData(next);
	}, [setData]);
	const submit = (0, import_react.useCallback)((...args2) => {
		const { method, url, options } = UseFormUtils.parseSubmitArguments(args2, precognitionEndpoint.current);
		setDefaultsCalledInOnSuccess.current = false;
		const _options = {
			...options,
			onCancelToken: (token) => {
				cancelToken.current = token;
				if (options.onCancelToken) return options.onCancelToken(token);
			},
			onBefore: (visit) => {
				setWasSuccessful(false);
				setRecentlySuccessful(false);
				clearTimeout(recentlySuccessfulTimeoutId.current);
				if (options.onBefore) return options.onBefore(visit);
			},
			onStart: (visit) => {
				setProcessing(true);
				if (options.onStart) return options.onStart(visit);
			},
			onProgress: (event) => {
				setProgress(event || null);
				if (options.onProgress) return options.onProgress(event);
			},
			onSuccess: async (page) => {
				if (isMounted.current) {
					setProcessing(false);
					setProgress(null);
					setErrors({});
					setHasErrors(false);
					setWasSuccessful(true);
					setRecentlySuccessful(true);
					recentlySuccessfulTimeoutId.current = setTimeout(() => {
						if (isMounted.current) setRecentlySuccessful(false);
					}, config.get("form.recentlySuccessfulDuration"));
				}
				const onSuccess = options.onSuccess ? await options.onSuccess(page) : null;
				if (isMounted.current && !setDefaultsCalledInOnSuccess.current) setData((data2) => {
					setDefaults(cloneDeep(data2));
					return data2;
				});
				return onSuccess;
			},
			onError: (errors2) => {
				if (isMounted.current) {
					setProcessing(false);
					setProgress(null);
					setErrors(errors2);
					setHasErrors(Object.keys(errors2).length > 0);
					validatorRef.current?.setErrors(errors2);
				}
				if (options.onError) return options.onError(errors2);
			},
			onCancel: () => {
				if (isMounted.current) {
					setProcessing(false);
					setProgress(null);
				}
				if (options.onCancel) return options.onCancel();
			},
			onFinish: (visit) => {
				if (isMounted.current) {
					setProcessing(false);
					setProgress(null);
				}
				cancelToken.current = null;
				if (options.onFinish) return options.onFinish(visit);
			}
		};
		const transformedData = transform.current(dataRef.current);
		if (method === "delete") router.delete(url, {
			..._options,
			data: transformedData
		});
		else router[method](url, transformedData, _options);
	}, [setErrors, transform]);
	const setDataFunction = (0, import_react.useCallback)((keyOrData, maybeValue) => {
		if (typeof keyOrData === "string") commitData(set(cloneDeep(dataRef.current), keyOrData, maybeValue));
		else if (typeof keyOrData === "function") commitData(keyOrData(dataRef.current));
		else commitData(keyOrData);
	}, [commitData]);
	const setDefaultsFunction = (0, import_react.useCallback)((fieldOrFields, maybeValue) => {
		setDefaultsCalledInOnSuccess.current = true;
		let newDefaults = {};
		if (typeof fieldOrFields === "undefined") {
			newDefaults = { ...dataRef.current };
			setDefaults(dataRef.current);
		} else setDefaults((defaults2) => {
			newDefaults = typeof fieldOrFields === "string" ? set(cloneDeep(defaults2), fieldOrFields, maybeValue) : Object.assign(cloneDeep(defaults2), fieldOrFields);
			return newDefaults;
		});
		validatorRef.current?.defaults(newDefaults);
	}, [setDefaults]);
	const reset = (0, import_react.useCallback)((...fields) => {
		if (fields.length === 0) commitData(defaults);
		else {
			const next = fields.filter((key) => has(defaults, key)).reduce((carry, key) => {
				return set(carry, key, get(defaults, key));
			}, { ...dataRef.current });
			commitData(next);
		}
		validatorRef.current?.reset(...fields);
	}, [commitData, defaults]);
	const setError = (0, import_react.useCallback)((fieldOrFields, maybeValue) => {
		setErrors((errors2) => {
			const newErrors = {
				...errors2,
				...typeof fieldOrFields === "string" ? { [fieldOrFields]: maybeValue } : fieldOrFields
			};
			setHasErrors(Object.keys(newErrors).length > 0);
			validatorRef.current?.setErrors(newErrors);
			return newErrors;
		});
	}, [setErrors, setHasErrors]);
	const clearErrors = (0, import_react.useCallback)((...fields) => {
		setErrors((errors2) => {
			const newErrors = Object.keys(errors2).reduce((carry, field) => ({
				...carry,
				...fields.length > 0 && !fields.includes(field) ? { [field]: errors2[field] } : {}
			}), {});
			setHasErrors(Object.keys(newErrors).length > 0);
			if (validatorRef.current) {
				if (fields.length === 0) validatorRef.current.setErrors({});
				else fields.forEach(validatorRef.current.forgetError);
			}
			return newErrors;
		});
	}, [setErrors, setHasErrors]);
	const resetAndClearErrors = (0, import_react.useCallback)((...fields) => {
		reset(...fields);
		clearErrors(...fields);
	}, [reset, clearErrors]);
	const createSubmitMethod = (method) => (url, options = {}) => {
		submit(method, url, options);
	};
	const getMethod = (0, import_react.useCallback)(createSubmitMethod("get"), [submit]);
	const post = (0, import_react.useCallback)(createSubmitMethod("post"), [submit]);
	const put = (0, import_react.useCallback)(createSubmitMethod("put"), [submit]);
	const patch = (0, import_react.useCallback)(createSubmitMethod("patch"), [submit]);
	const deleteMethod = (0, import_react.useCallback)(createSubmitMethod("delete"), [submit]);
	const cancel = (0, import_react.useCallback)(() => {
		if (cancelToken.current) cancelToken.current.cancel();
	}, []);
	const form = {
		data,
		setData: setDataFunction,
		isDirty,
		errors,
		hasErrors,
		processing,
		progress: progress2,
		wasSuccessful,
		recentlySuccessful,
		transform: (0, import_react.useCallback)((callback) => {
			transform.current = callback;
		}, []),
		setDefaults: setDefaultsFunction,
		reset,
		setError,
		clearErrors,
		resetAndClearErrors,
		submit,
		get: getMethod,
		post,
		put,
		patch,
		delete: deleteMethod,
		cancel,
		dontRemember: (...keys) => {
			excludeKeysRef.current = keys;
			return form;
		}
	};
	const tap = (value, callback) => {
		callback(value);
		return value;
	};
	const valid = (0, import_react.useCallback)((field) => validFields.includes(field), [validFields]);
	const invalid = (0, import_react.useCallback)((field) => field in errors, [errors]);
	const touched = (0, import_react.useCallback)((field) => typeof field === "string" ? touchedFields.includes(field) : touchedFields.length > 0, [touchedFields]);
	const validate = (field, config3) => {
		if (typeof field === "object" && !("target" in field)) {
			config3 = field;
			field = void 0;
		}
		if (field === void 0) validatorRef.current.validate(config3);
		else {
			const fieldName = resolveName(field);
			const currentData = dataRef.current;
			const transformedData = transform.current(currentData);
			validatorRef.current.validate(fieldName, get(transformedData, fieldName), config3);
		}
		return form;
	};
	const withPrecognition = (...args2) => {
		precognitionEndpoint.current = UseFormUtils.createWayfinderCallback(...args2);
		if (!validatorRef.current) {
			const validator = createValidator((client) => {
				const { method, url } = precognitionEndpoint.current();
				const currentData = dataRef.current;
				const transformedData = transform.current(currentData);
				return client[method](url, transformedData);
			}, cloneDeep(defaults));
			validatorRef.current = validator;
			validator.on("validatingChanged", () => {
				setValidating(validator.validating());
			}).on("validatedChanged", () => {
				setValidFields(validator.valid());
			}).on("touchedChanged", () => {
				setTouchedFields(validator.touched());
			}).on("errorsChanged", () => {
				const validationErrors = withAllErrors.current ?? config.get("form.withAllErrors") ? validator.errors() : toSimpleValidationErrors(validator.errors());
				setErrors(validationErrors);
				setHasErrors(Object.keys(validationErrors).length > 0);
				setValidFields(validator.valid());
			});
		}
		const precognitiveForm = Object.assign(form, {
			validating,
			validator: () => validatorRef.current,
			valid,
			invalid,
			touched,
			withoutFileValidation: () => tap(precognitiveForm, () => validatorRef.current?.withoutFileValidation()),
			touch: (field, ...fields) => {
				if (Array.isArray(field)) validatorRef.current?.touch(field);
				else if (typeof field === "string") validatorRef.current?.touch([field, ...fields]);
				else validatorRef.current?.touch(field);
				return precognitiveForm;
			},
			withAllErrors: () => tap(precognitiveForm, () => withAllErrors.current = true),
			setValidationTimeout: (duration) => tap(precognitiveForm, () => validatorRef.current?.setTimeout(duration)),
			validateFiles: () => tap(precognitiveForm, () => validatorRef.current?.validateFiles()),
			validate,
			setErrors: (errors2) => tap(precognitiveForm, () => form.setError(errors2)),
			forgetError: (field) => tap(precognitiveForm, () => form.clearErrors(resolveName(field)))
		});
		return precognitiveForm;
	};
	form.withPrecognition = withPrecognition;
	return precognitionEndpoint.current ? form.withPrecognition(precognitionEndpoint.current) : form;
}
var deferStateUpdate = (callback) => {
	typeof import_react.startTransition === "function" ? import_react.startTransition(callback) : setTimeout(callback, 0);
};
var noop = () => void 0;
var FormContext = (0, import_react.createContext)(void 0);
var Form = (0, import_react.forwardRef)(({ action = "", method = "get", headers = {}, queryStringArrayFormat = "brackets", errorBag = null, showProgress = true, transform = (data) => data, options = {}, onStart = noop, onProgress = noop, onFinish = noop, onBefore = noop, onCancel = noop, onSuccess = noop, onError = noop, onCancelToken = noop, onSubmitComplete = noop, disableWhileProcessing = false, resetOnError = false, resetOnSuccess = false, setDefaultsOnSuccess = false, invalidateCacheTags = [], validateFiles = false, validationTimeout = 1500, withAllErrors = null, children, ...props }, ref) => {
	const getTransformedData = () => {
		const [_url, data] = getUrlAndData();
		return transform(data);
	};
	const form = useForm({}).withPrecognition(() => resolvedMethod, () => getUrlAndData()[0]).setValidationTimeout(validationTimeout);
	if (validateFiles) form.validateFiles();
	if (withAllErrors ?? config$1.get("form.withAllErrors")) form.withAllErrors();
	form.transform(getTransformedData);
	const formElement = (0, import_react.useRef)(void 0);
	const resolvedMethod = (0, import_react.useMemo)(() => {
		return isUrlMethodPair(action) ? action.method : method.toLowerCase();
	}, [action, method]);
	const [isDirty, setIsDirty] = (0, import_react.useState)(false);
	const defaultData = (0, import_react.useRef)(new FormData());
	const getFormData = (submitter) => new FormData(formElement.current, submitter);
	const getData = (submitter) => formDataToObject(getFormData(submitter));
	const getUrlAndData = (submitter) => {
		return mergeDataIntoQueryString(resolvedMethod, isUrlMethodPair(action) ? action.url : action, getData(submitter), queryStringArrayFormat);
	};
	const updateDirtyState = (event) => {
		if (event.type === "reset" && event.detail?.[FormComponentResetSymbol]) event.preventDefault();
		deferStateUpdate(() => setIsDirty(event.type === "reset" ? false : !isEqual(getData(), formDataToObject(defaultData.current))));
	};
	const clearErrors = (...names) => {
		form.clearErrors(...names);
		return form;
	};
	(0, import_react.useEffect)(() => {
		defaultData.current = getFormData();
		form.setDefaults(getData());
		const formEvents = [
			"input",
			"change",
			"reset"
		];
		formEvents.forEach((e) => formElement.current.addEventListener(e, updateDirtyState));
		return () => {
			formEvents.forEach((e) => formElement.current?.removeEventListener(e, updateDirtyState));
		};
	}, []);
	(0, import_react.useEffect)(() => {
		form.setValidationTimeout(validationTimeout);
	}, [validationTimeout]);
	(0, import_react.useEffect)(() => {
		if (validateFiles) form.validateFiles();
		else form.withoutFileValidation();
	}, [validateFiles]);
	const reset = (...fields) => {
		if (formElement.current) resetFormFields(formElement.current, defaultData.current, fields);
		form.reset(...fields);
	};
	const resetAndClearErrors = (...fields) => {
		clearErrors(...fields);
		reset(...fields);
	};
	const maybeReset = (resetOption) => {
		if (!resetOption) return;
		if (resetOption === true) reset();
		else if (resetOption.length > 0) reset(...resetOption);
	};
	const submit = (submitter) => {
		const [url, data] = getUrlAndData(submitter);
		if (submitter?.getAttribute("formtarget") === "_blank" && resolvedMethod === "get") {
			window.open(url, "_blank");
			return;
		}
		const submitOptions = {
			headers,
			queryStringArrayFormat,
			errorBag,
			showProgress,
			invalidateCacheTags,
			onCancelToken,
			onBefore,
			onStart,
			onProgress,
			onFinish,
			onCancel,
			onSuccess: (...args) => {
				onSuccess(...args);
				onSubmitComplete({
					reset,
					defaults
				});
				maybeReset(resetOnSuccess);
				if (setDefaultsOnSuccess === true) defaults();
			},
			onError(...args) {
				onError(...args);
				maybeReset(resetOnError);
			},
			...options
		};
		form.transform(() => transform(data));
		form.submit(resolvedMethod, url, submitOptions);
		form.transform(getTransformedData);
	};
	const defaults = () => {
		defaultData.current = getFormData();
		setIsDirty(false);
	};
	const exposed = {
		errors: form.errors,
		hasErrors: form.hasErrors,
		processing: form.processing,
		progress: form.progress,
		wasSuccessful: form.wasSuccessful,
		recentlySuccessful: form.recentlySuccessful,
		isDirty,
		clearErrors,
		resetAndClearErrors,
		setError: form.setError,
		reset,
		submit,
		defaults,
		getData,
		getFormData,
		validator: () => form.validator(),
		validating: form.validating,
		valid: form.valid,
		invalid: form.invalid,
		validate: (field, config3) => form.validate(...UseFormUtils.mergeHeadersForValidation(field, config3, headers)),
		touch: form.touch,
		touched: form.touched
	};
	(0, import_react.useImperativeHandle)(ref, () => exposed, [
		form,
		isDirty,
		submit
	]);
	const formNode = (0, import_react.createElement)("form", {
		...props,
		ref: formElement,
		action: isUrlMethodPair(action) ? action.url : action,
		method: resolvedMethod,
		onSubmit: (event) => {
			event.preventDefault();
			submit(event.nativeEvent.submitter);
		},
		inert: disableWhileProcessing && form.processing && (isReact19 ? true : "true")
	}, typeof children === "function" ? children(exposed) : children);
	return (0, import_react.createElement)(FormContext.Provider, { value: exposed }, formNode);
});
Form.displayName = "InertiaForm";
var Head = function({ children, title }) {
	const headManager = (0, import_react.useContext)(HeadContext_default);
	const provider = (0, import_react.useMemo)(() => headManager.createProvider(), [headManager]);
	const isServer = typeof window === "undefined";
	(0, import_react.useEffect)(() => {
		provider.reconnect();
		provider.update(renderNodes(children));
		return () => {
			provider.disconnect();
		};
	}, [
		provider,
		children,
		title
	]);
	function isUnaryTag(node) {
		return typeof node.type === "string" && [
			"area",
			"base",
			"br",
			"col",
			"embed",
			"hr",
			"img",
			"input",
			"keygen",
			"link",
			"meta",
			"param",
			"source",
			"track",
			"wbr"
		].indexOf(node.type) > -1;
	}
	function renderTagStart(node) {
		const attrs = Object.keys(node.props).reduce((carry, name) => {
			if ([
				"head-key",
				"children",
				"dangerouslySetInnerHTML"
			].includes(name)) return carry;
			const value = String(node.props[name]);
			if (value === "") return carry + ` ${name}`;
			return carry + ` ${name}="${escape$1(value)}"`;
		}, "");
		return `<${String(node.type)}${attrs}>`;
	}
	function renderTagChildren(node) {
		const { children: children2 } = node.props;
		if (typeof children2 === "string") return children2;
		if (Array.isArray(children2)) return children2.reduce((html, child) => html + renderTag(child), "");
		return "";
	}
	function renderTag(node) {
		let html = renderTagStart(node);
		if (node.props.children) html += renderTagChildren(node);
		if (node.props.dangerouslySetInnerHTML) html += node.props.dangerouslySetInnerHTML.__html;
		if (!isUnaryTag(node)) html += `</${String(node.type)}>`;
		return html;
	}
	function ensureNodeHasInertiaProp(node) {
		return import_react.cloneElement(node, { [provider.preferredAttribute()]: node.props["head-key"] !== void 0 ? node.props["head-key"] : "" });
	}
	function renderNode(node) {
		return renderTag(ensureNodeHasInertiaProp(node));
	}
	function renderNodes(nodes) {
		const elements = import_react.Children.toArray(nodes).filter((node) => node).map((node) => renderNode(node));
		if (title && !elements.find((tag) => tag.startsWith("<title"))) elements.push(`<title ${provider.preferredAttribute()}>${escape$1(title)}</title>`);
		return elements;
	}
	if (isServer) provider.update(renderNodes(children));
	return null;
};
var Head_default = Head;
var resolveHTMLElement = (value, fallback) => {
	if (!value) return fallback;
	if (value && typeof value === "object" && "current" in value) return value.current;
	if (typeof value === "string") return document.querySelector(value);
	return fallback;
};
var renderSlot = (slotContent, slotProps, fallback = null) => {
	if (!slotContent) return fallback;
	return typeof slotContent === "function" ? slotContent(slotProps) : slotContent;
};
var InfiniteScroll = (0, import_react.forwardRef)(({ data, buffer = 0, as = "div", manual = false, manualAfter = 0, preserveUrl = false, reverse = false, autoScroll, children, startElement, endElement, itemsElement, previous, next, loading, onlyNext = false, onlyPrevious = false, ...props }, ref) => {
	const [startElementFromRef, setStartElementFromRef] = (0, import_react.useState)(null);
	const startElementRef = (0, import_react.useCallback)((node) => setStartElementFromRef(node), []);
	const [endElementFromRef, setEndElementFromRef] = (0, import_react.useState)(null);
	const endElementRef = (0, import_react.useCallback)((node) => setEndElementFromRef(node), []);
	const [itemsElementFromRef, setItemsElementFromRef] = (0, import_react.useState)(null);
	const itemsElementRef = (0, import_react.useCallback)((node) => setItemsElementFromRef(node), []);
	const scrollProp = usePage().scrollProps?.[data];
	const [loadingPrevious, setLoadingPrevious] = (0, import_react.useState)(false);
	const [loadingNext, setLoadingNext] = (0, import_react.useState)(false);
	const [requestCount, setRequestCount] = (0, import_react.useState)(0);
	const [hasPreviousPage, setHasPreviousPage] = (0, import_react.useState)(!!scrollProp?.previousPage);
	const [hasNextPage, setHasNextPage] = (0, import_react.useState)(!!scrollProp?.nextPage);
	const [resolvedStartElement, setResolvedStartElement] = (0, import_react.useState)(null);
	const [resolvedEndElement, setResolvedEndElement] = (0, import_react.useState)(null);
	const [resolvedItemsElement, setResolvedItemsElement] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const element = startElement ? resolveHTMLElement(startElement, startElementFromRef) : startElementFromRef;
		setResolvedStartElement(element);
	}, [startElement, startElementFromRef]);
	(0, import_react.useEffect)(() => {
		const element = endElement ? resolveHTMLElement(endElement, endElementFromRef) : endElementFromRef;
		setResolvedEndElement(element);
	}, [endElement, endElementFromRef]);
	(0, import_react.useEffect)(() => {
		const element = itemsElement ? resolveHTMLElement(itemsElement, itemsElementFromRef) : itemsElementFromRef;
		setResolvedItemsElement(element);
	}, [itemsElement, itemsElementFromRef]);
	const scrollableParent = (0, import_react.useMemo)(() => getScrollableParent(resolvedItemsElement), [resolvedItemsElement]);
	const callbackPropsRef = (0, import_react.useRef)({
		buffer,
		onlyNext,
		onlyPrevious,
		reverse,
		preserveUrl
	});
	callbackPropsRef.current = {
		buffer,
		onlyNext,
		onlyPrevious,
		reverse,
		preserveUrl
	};
	const [infiniteScroll, setInfiniteScroll] = (0, import_react.useState)(null);
	const dataManager = (0, import_react.useMemo)(() => infiniteScroll?.dataManager, [infiniteScroll]);
	const elementManager = (0, import_react.useMemo)(() => infiniteScroll?.elementManager, [infiniteScroll]);
	const scrollToBottom = (0, import_react.useCallback)(() => {
		if (scrollableParent) scrollableParent.scrollTo({
			top: scrollableParent.scrollHeight,
			behavior: "instant"
		});
		else window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "instant"
		});
	}, [scrollableParent]);
	(0, import_react.useEffect)(() => {
		if (!resolvedItemsElement) return;
		function syncStateFromDataManager() {
			setRequestCount(infiniteScrollInstance.dataManager.getRequestCount());
			setHasPreviousPage(infiniteScrollInstance.dataManager.hasPrevious());
			setHasNextPage(infiniteScrollInstance.dataManager.hasNext());
		}
		const infiniteScrollInstance = useInfiniteScroll({
			getPropName: () => data,
			inReverseMode: () => callbackPropsRef.current.reverse,
			shouldFetchNext: () => !callbackPropsRef.current.onlyPrevious,
			shouldFetchPrevious: () => !callbackPropsRef.current.onlyNext,
			shouldPreserveUrl: () => callbackPropsRef.current.preserveUrl,
			getTriggerMargin: () => callbackPropsRef.current.buffer,
			getStartElement: () => resolvedStartElement,
			getEndElement: () => resolvedEndElement,
			getItemsElement: () => resolvedItemsElement,
			getScrollableParent: () => scrollableParent,
			onBeforePreviousRequest: () => setLoadingPrevious(true),
			onBeforeNextRequest: () => setLoadingNext(true),
			onCompletePreviousRequest: ({ completed }) => {
				setLoadingPrevious(false);
				if (completed) syncStateFromDataManager();
			},
			onCompleteNextRequest: ({ completed }) => {
				setLoadingNext(false);
				if (completed) syncStateFromDataManager();
			},
			onDataReset: syncStateFromDataManager
		});
		setInfiniteScroll(infiniteScrollInstance);
		const { dataManager: dataManager2, elementManager: elementManager2 } = infiniteScrollInstance;
		syncStateFromDataManager();
		elementManager2.setupObservers();
		elementManager2.processServerLoadedElements(dataManager2.getLastLoadedPage());
		if (autoLoad) elementManager2.enableTriggers();
		return () => {
			infiniteScrollInstance.flush();
			setInfiniteScroll(null);
		};
	}, [
		data,
		resolvedItemsElement,
		resolvedStartElement,
		resolvedEndElement,
		scrollableParent
	]);
	const manualMode = (0, import_react.useMemo)(() => manual || manualAfter > 0 && requestCount >= manualAfter, [
		manual,
		manualAfter,
		requestCount
	]);
	const autoLoad = (0, import_react.useMemo)(() => !manualMode, [manualMode]);
	(0, import_react.useEffect)(() => {
		autoLoad ? elementManager?.enableTriggers() : elementManager?.disableTriggers();
	}, [
		autoLoad,
		onlyNext,
		onlyPrevious,
		resolvedStartElement,
		resolvedEndElement
	]);
	(0, import_react.useEffect)(() => {
		if (autoScroll !== void 0 ? autoScroll : reverse) scrollToBottom();
	}, [scrollableParent]);
	(0, import_react.useImperativeHandle)(ref, () => ({
		fetchNext: dataManager?.fetchNext || (() => {}),
		fetchPrevious: dataManager?.fetchPrevious || (() => {}),
		hasPrevious: dataManager?.hasPrevious || (() => false),
		hasNext: dataManager?.hasNext || (() => false)
	}), [dataManager]);
	const headerAutoMode = autoLoad && !onlyNext;
	const footerAutoMode = autoLoad && !onlyPrevious;
	const sharedExposed = {
		loadingPrevious,
		loadingNext,
		hasPrevious: hasPreviousPage,
		hasNext: hasNextPage
	};
	const exposedPrevious = {
		loading: loadingPrevious,
		fetch: dataManager?.fetchPrevious ?? (() => {}),
		autoMode: headerAutoMode,
		manualMode: !headerAutoMode,
		hasMore: hasPreviousPage,
		...sharedExposed
	};
	const exposedNext = {
		loading: loadingNext,
		fetch: dataManager?.fetchNext ?? (() => {}),
		autoMode: footerAutoMode,
		manualMode: !footerAutoMode,
		hasMore: hasNextPage,
		...sharedExposed
	};
	const exposedSlot = {
		loading: loadingPrevious || loadingNext,
		loadingPrevious,
		loadingNext
	};
	const renderElements = [];
	if (!startElement) renderElements.push((0, import_react.createElement)("div", { ref: startElementRef }, renderSlot(previous, exposedPrevious, loadingPrevious ? renderSlot(loading, exposedPrevious) : null)));
	renderElements.push((0, import_react.createElement)(as, {
		...props,
		ref: itemsElementRef
	}, typeof children === "function" ? children(exposedSlot) : children));
	if (!endElement) renderElements.push((0, import_react.createElement)("div", { ref: endElementRef }, renderSlot(next, exposedNext, loadingNext ? renderSlot(loading, exposedNext) : null)));
	return (0, import_react.createElement)(import_react.Fragment, {}, ...reverse ? [...renderElements].reverse() : renderElements);
});
InfiniteScroll.displayName = "InertiaInfiniteScroll";
var noop2 = () => void 0;
var Link = (0, import_react.forwardRef)(({ children, as = "a", data = {}, href = "", method = "get", preserveScroll = false, preserveState = null, preserveUrl = false, replace = false, only = [], except = [], headers = {}, queryStringArrayFormat = "brackets", async = false, onClick = noop2, onCancelToken = noop2, onBefore = noop2, onStart = noop2, onProgress = noop2, onFinish = noop2, onCancel = noop2, onSuccess = noop2, onError = noop2, onPrefetching = noop2, onPrefetched = noop2, prefetch = false, cacheFor = 0, cacheTags = [], viewTransition = false, ...props }, ref) => {
	const [inFlightCount, setInFlightCount] = (0, import_react.useState)(0);
	const hoverTimeout = (0, import_react.useRef)(void 0);
	const _method = (0, import_react.useMemo)(() => {
		return isUrlMethodPair(href) ? href.method : method.toLowerCase();
	}, [href, method]);
	const _as = (0, import_react.useMemo)(() => {
		if (typeof as !== "string" || as.toLowerCase() !== "a") return as;
		return _method !== "get" ? "button" : as.toLowerCase();
	}, [as, _method]);
	const mergeDataArray = (0, import_react.useMemo)(() => mergeDataIntoQueryString(_method, isUrlMethodPair(href) ? href.url : href, data, queryStringArrayFormat), [
		href,
		_method,
		data,
		queryStringArrayFormat
	]);
	const url = (0, import_react.useMemo)(() => mergeDataArray[0], [mergeDataArray]);
	const _data = (0, import_react.useMemo)(() => mergeDataArray[1], [mergeDataArray]);
	const baseParams = (0, import_react.useMemo)(() => ({
		data: _data,
		method: _method,
		preserveScroll,
		preserveState: preserveState ?? _method !== "get",
		preserveUrl,
		replace,
		only,
		except,
		headers,
		async
	}), [
		_data,
		_method,
		preserveScroll,
		preserveState,
		preserveUrl,
		replace,
		only,
		except,
		headers,
		async
	]);
	const visitParams = (0, import_react.useMemo)(() => ({
		...baseParams,
		viewTransition,
		onCancelToken,
		onBefore,
		onStart(visit) {
			setInFlightCount((count) => count + 1);
			onStart(visit);
		},
		onProgress,
		onFinish(visit) {
			setInFlightCount((count) => count - 1);
			onFinish(visit);
		},
		onCancel,
		onSuccess,
		onError
	}), [
		baseParams,
		viewTransition,
		onCancelToken,
		onBefore,
		onStart,
		onProgress,
		onFinish,
		onCancel,
		onSuccess,
		onError
	]);
	const prefetchModes = (0, import_react.useMemo)(() => {
		if (prefetch === true) return ["hover"];
		if (prefetch === false) return [];
		if (Array.isArray(prefetch)) return prefetch;
		return [prefetch];
	}, Array.isArray(prefetch) ? prefetch : [prefetch]);
	const cacheForValue = (0, import_react.useMemo)(() => {
		if (cacheFor !== 0) return cacheFor;
		if (prefetchModes.length === 1 && prefetchModes[0] === "click") return 0;
		return config.get("prefetch.cacheFor");
	}, [cacheFor, prefetchModes]);
	const doPrefetch = (0, import_react.useMemo)(() => {
		return () => {
			router.prefetch(url, {
				...baseParams,
				onPrefetching,
				onPrefetched
			}, {
				cacheFor: cacheForValue,
				cacheTags
			});
		};
	}, [
		url,
		baseParams,
		onPrefetching,
		onPrefetched,
		cacheForValue,
		cacheTags
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			clearTimeout(hoverTimeout.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (prefetchModes.includes("mount")) setTimeout(() => doPrefetch());
	}, prefetchModes);
	const regularEvents = { onClick: (event) => {
		onClick(event);
		if (shouldIntercept(event)) {
			event.preventDefault();
			router.visit(url, visitParams);
		}
	} };
	const prefetchHoverEvents = {
		onMouseEnter: () => {
			hoverTimeout.current = window.setTimeout(() => {
				doPrefetch();
			}, config.get("prefetch.hoverDelay"));
		},
		onMouseLeave: () => {
			clearTimeout(hoverTimeout.current);
		},
		onClick: regularEvents.onClick
	};
	const prefetchClickEvents = {
		onMouseDown: (event) => {
			if (shouldIntercept(event)) {
				event.preventDefault();
				doPrefetch();
			}
		},
		onKeyDown: (event) => {
			if (shouldNavigate(event)) {
				event.preventDefault();
				doPrefetch();
			}
		},
		onMouseUp: (event) => {
			if (shouldIntercept(event)) {
				event.preventDefault();
				router.visit(url, visitParams);
			}
		},
		onKeyUp: (event) => {
			if (shouldNavigate(event)) {
				event.preventDefault();
				router.visit(url, visitParams);
			}
		},
		onClick: (event) => {
			onClick(event);
			if (shouldIntercept(event)) event.preventDefault();
		}
	};
	const elProps = (0, import_react.useMemo)(() => {
		if (_as === "button") return { type: "button" };
		if (_as === "a" || typeof _as !== "string") return { href: url };
		return {};
	}, [_as, url]);
	return (0, import_react.createElement)(_as, {
		...props,
		...elProps,
		ref,
		...(() => {
			if (prefetchModes.includes("hover")) return prefetchHoverEvents;
			if (prefetchModes.includes("click")) return prefetchClickEvents;
			return regularEvents;
		})(),
		"data-loading": inFlightCount > 0 ? "" : void 0
	}, children);
});
Link.displayName = "InertiaLink";
var Link_default = Link;
var WhenVisible = ({ children, data, params, buffer, as, always, fallback }) => {
	always = always ?? false;
	as = as ?? "div";
	fallback = fallback ?? null;
	const pageProps = usePage().props;
	const keys = (0, import_react.useMemo)(() => data ? Array.isArray(data) ? data : [data] : [], [data]);
	const [loaded, setLoaded] = (0, import_react.useState)(() => keys.length > 0 && keys.every((key) => pageProps[key] !== void 0));
	const [isFetching, setIsFetching] = (0, import_react.useState)(false);
	const fetching = (0, import_react.useRef)(false);
	const ref = (0, import_react.useRef)(null);
	const observer = (0, import_react.useRef)(null);
	const getReloadParamsRef = (0, import_react.useRef)(() => ({}));
	(0, import_react.useEffect)(() => {
		if (keys.length > 0) setLoaded(keys.every((key) => pageProps[key] !== void 0));
	}, [pageProps, keys]);
	getReloadParamsRef.current = (0, import_react.useCallback)(() => {
		const reloadParams = { ...params };
		if (data) reloadParams.only = Array.isArray(data) ? data : [data];
		return reloadParams;
	}, [params, data]);
	const registerObserver = () => {
		observer.current?.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (!entries[0].isIntersecting) return;
			if (fetching.current) return;
			if (!always && loaded) return;
			fetching.current = true;
			setIsFetching(true);
			const reloadParams = getReloadParamsRef.current();
			router.reload({
				...reloadParams,
				onStart: (e) => {
					fetching.current = true;
					setIsFetching(true);
					reloadParams.onStart?.(e);
				},
				onFinish: (e) => {
					setLoaded(true);
					fetching.current = false;
					setIsFetching(false);
					reloadParams.onFinish?.(e);
					if (!always) observer.current?.disconnect();
				}
			});
		}, { rootMargin: `${buffer || 0}px` });
		observer.current.observe(ref.current);
	};
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		if (loaded && !always) return;
		registerObserver();
		return () => {
			observer.current?.disconnect();
		};
	}, [
		always,
		loaded,
		buffer
	]);
	const resolveChildren = () => typeof children === "function" ? children({ fetching: isFetching }) : children;
	const resolveFallback = () => typeof fallback === "function" ? fallback() : fallback;
	if (always || !loaded) return (0, import_react.createElement)(as, {
		props: null,
		ref
	}, loaded ? resolveChildren() : resolveFallback());
	return loaded ? resolveChildren() : null;
};
WhenVisible.displayName = "InertiaWhenVisible";
var router3 = router;
var config = config$1.extend();
//#endregion
export { usePage as a, router3 as i, Link_default as n, require_react_dom as o, createInertiaApp as r, Head_default as t };
