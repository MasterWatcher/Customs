var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ios-export.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ios-export.js":
/*!***************************!*\
  !*** ./src/ios-export.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var colors = getColors();
  var savePanel = NSSavePanel.savePanel();
  savePanel.setNameFieldStringValue('Colors.xcassets');
  savePanel.setAllowsOtherFileTypes(true);
  savePanel.setExtensionHidden(false);

  if (savePanel.runModal()) {
    exportAsFile(colors, savePanel.URL());
  }
});

function getColors() {
  var result = [];

  var sketch = __webpack_require__(/*! sketch */ "sketch");

  var document = sketch.getSelectedDocument();
  var layers = document.getLayersNamed('Colors');

  if (layers.length) {
    var groupLayers = layers[0].layers;
    groupLayers.forEach(function (shape, i) {
      console.log(shape.name + ' ' + shape.style.fills[0].color);
      result.push({
        name: shape.name,
        color: shape.style.fills[0].color
      });
    });
  } else {
    context.document.showMessage('there is no folder "Colors" in the document');
  }

  return result;
}

function exportAsFile(colors, url) {
  var manager = NSFileManager.defaultManager(); // var content = contentsJSON() 
  // var path = url.path()
  // var fileString = NSString.stringWithString(JSON.stringify(content, null, 4))
  // fileString.writeToFile_atomically_encoding_error(path + "/Contents.json", true, NSUTF8StringEncoding, null)

  colors.forEach(function (colorData, i) {
    var content = contentsJSON(colorData);
    var fileName = colorData.name + '.colorset';
    var colorsetURL = url.URLByAppendingPathComponent(fileName);
    manager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(colorsetURL.path(), true, null, null);
    var path = colorsetURL.path();
    var fileString = NSString.stringWithString(JSON.stringify(content, null, 4));
    fileString.writeToFile_atomically_encoding_error(path + "/Contents.json", true, NSUTF8StringEncoding, null);
  });
}

function contentsJSON(colorData) {
  return {
    info: {
      version: 1,
      author: "com.goncharov.sketch.customs"
    },
    colors: [colorObject(colorData)]
  };
}

function colorObject(colorData) {
  return {
    idiom: "universal",
    color: {
      "color-space": "display-p3",
      components: {
        red: '0x' + colorData.color.substring(1, 3),
        green: '0x' + colorData.color.substring(3, 5),
        blue: '0x' + colorData.color.substring(5, 7),
        alpha: '0x' + colorData.color.substring(7, 9)
      }
    }
  };
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=ios-export.js.map