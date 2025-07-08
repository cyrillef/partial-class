// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM 'AS IS' AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
/*jshint esversion: 9 */

export default {
	"class": {
		"keys": [
			"design:properties",
			"design:paramtypes",
			"test:class"
		],
		"design:properties": [
			{
				"name": "property",
				"type": "String",
				"options": {
					"propertyName": "property",
					"target": {},
					"name": "property"
				},
				"target": "TestClass"
			},
			{
				"name": "property2",
				"type": "Number",
				"options": {
					"propertyName": "property2",
					"target": {},
					"name": "property2"
				},
				"target": "TestClass"
			}
		],
		"design:paramtypes": [],
		"test:class": {
			"className": "TestClass",
			"constructor": "f TestClass",
			"name": "TestClass"
		}
	},
	"staticProperties": {
		"staticProperty": {
			"keys": [
				"design:type",
				"test:property"
			],
			"design:type": "f String",
			"test:property": {
				"propertyName": "staticProperty",
				"target": "f TestClass",
				"name": "staticProperty"
			}
		}
	},
	"staticAccessors": {
		"staticPropertyGetter": {
			"keys": [
				"design:paramtypes",
				"design:type",
				"test:property"
			],
			"design:paramtypes": [
				"f String"
			],
			"design:type": "f String",
			"test:property": {
				"propertyName": "staticPropertyGetter",
				"target": "f TestClass",
				"name": "staticGetter"
			}
		}
	},
	"staticMethods": {
		"staticMethod": {
			"keys": [
				"design:returntype",
				"design:paramtypes",
				"design:type",
				"test:method"
			],
			"design:returntype": "f String",
			"design:paramtypes": [],
			"design:type": "f Function",
			"test:method": {
				"methodName": "staticMethod",
				"target": "f TestClass",
				"descriptor": {
					"value": "f staticMethod",
					"writable": true,
					"enumerable": false,
					"configurable": true
				},
				"name": "staticMethod"
			}
		}
	},
	"prototype": {
		"keys": []
	},
	"properties": {
		"property": {
			"keys": [
				"design:type",
				"test:property"
			],
			"design:type": "f String",
			"test:property": {
				"propertyName": "property",
				"target": {},
				"name": "property"
			}
		},
		"property2": {
			"keys": [
				"design:type",
				"test:property"
			],
			"design:type": "f Number",
			"test:property": {
				"propertyName": "property2",
				"target": {},
				"name": "property2"
			}
		}
	},
	"accessors": {
		"propertyGetter": {
			"keys": [
				"design:paramtypes",
				"design:type",
				"test:property"
			],
			"design:paramtypes": [
				"f String"
			],
			"design:type": "f String",
			"test:property": {
				"propertyName": "propertyGetter",
				"target": {},
				"name": "getter"
			}
		}
	},
	"methods": {
		"method": {
			"keys": [
				"design:returntype",
				"design:paramtypes",
				"design:type",
				"test:method"
			],
			"design:returntype": "f String",
			"design:paramtypes": [
				"f String"
			],
			"design:type": "f Function",
			"test:method": {
				"methodName": "method",
				"target": {},
				"descriptor": {
					"value": "f method",
					"writable": true,
					"enumerable": false,
					"configurable": true
				},
				"name": "method"
			}
		},
		"withParams": {
			"keys": [
				"design:returntype",
				"design:paramtypes",
				"design:type",
				"test:parameter"
			],
			"design:returntype": "f String",
			"design:paramtypes": [
				"f String"
			],
			"design:type": "f Function",
			"test:parameter": {
				"parameterKey": "withParams",
				"target": {},
				"parameterIndex": 0,
				"name": "testParam"
			}
		}
	}
};