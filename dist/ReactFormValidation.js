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

        var ReactFormValidation = function ReactFormValidation() {
            _classCallCheck(this, ReactFormValidation);
        };

        ReactFormValidation._createErrorMessage = function (e, m, s) {
            return e || m + ' is ' + s;
        };

        ReactFormValidation.Required = function (m, v, e) {
            return v && v.length > 0 ? true : ReactFormValidation._createErrorMessage(e, m, 'required');
        };

        ReactFormValidation.IsNumber = function (m, v, e) {
            return v && !isNaN(v) ? true : ReactFormValidation._createErrorMessage(e, m, 'not a number');
        };

        ReactFormValidation.MinLength = function (m, v, n, e) {
            return v && v.length >= n ? true : ReactFormValidation._createErrorMessage(e, m, 'less than ' + n);
        };

        ReactFormValidation.MaxLength = function (m, v, n, e) {
            return v && v.length <= n ? true : ReactFormValidation._createErrorMessage(e, m, 'greater than ' + n);
        };

        ReactFormValidation.Min = function (m, v, n, e) {
            return v && parseInt(v) >= n ? true : ReactFormValidation._createErrorMessage(e, m, 'less than ' + n);
        };

        ReactFormValidation.Max = function (m, v, n, e) {
            return v && parseInt(v) <= n ? true : ReactFormValidation._createErrorMessage(e, m, 'greater than ' + n);
        };

        exports.default = ReactFormValidation;
    });
});