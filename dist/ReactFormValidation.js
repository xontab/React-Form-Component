(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ReactFormValidation = mod.exports;
    }
})(this, function (exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define(['exports'], factory);
        } else if (typeof exports !== "undefined") {
            factory(exports);
        } else {
            var mod = {
                exports: {}
            };
            factory(mod.exports);
            global.ReactFormValidation = mod.exports;
        }
    })(this, function (exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var ReactFormValidations = function ReactFormValidations() {
            _classCallCheck(this, ReactFormValidations);
        };

        ReactFormValidations._createErrorMessage = function (e, m, s) {
            return e || m + ' is ' + s;
        };

        ReactFormValidations.Required = function (m, v, e) {
            return v && v.length > 0 ? true : ReactFormValidations._createErrorMessage(e, m, 'required');
        };

        ReactFormValidations.IsNumber = function (m, v, e) {
            return v && !isNaN(v) ? true : ReactFormValidations._createErrorMessage(e, m, 'not a number');
        };

        ReactFormValidations.MinLength = function (m, v, n, e) {
            return v && v.length >= n ? true : ReactFormValidations._createErrorMessage(e, m, 'less than ' + n + ' characters');
        };

        ReactFormValidations.MaxLength = function (m, v, n, e) {
            return v && v.length <= n ? true : ReactFormValidations._createErrorMessage(e, m, 'greater than ' + n + ' characters');
        };

        ReactFormValidations.Min = function (m, v, n, e) {
            return v && parseInt(v) >= n ? true : ReactFormValidations._createErrorMessage(e, m, 'less than ' + n);
        };

        ReactFormValidations.Max = function (m, v, n, e) {
            return v && parseInt(v) <= n ? true : ReactFormValidations._createErrorMessage(e, m, 'greater than ' + n);
        };

        exports.default = ReactFormValidations;
    });
});