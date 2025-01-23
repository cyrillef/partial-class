//
// Copyright (c) Autodesk, Inc. All rights reserved
//
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

import PartialOneClass from './final/partial-1';
import PartialTwoClass from './final/partial-2';

import FinalDecoratedClass from './final';
import AnotherClass from './another';

export const test: () => void
	= (): void => {

		//#region FinalDecoratedClass
		PartialOneClass.myStatic();
		PartialTwoClass.myStatic();

		(FinalDecoratedClass as any).myStatic();
		FinalDecoratedClass.myStatic();

		const finalDecoratedClass: FinalDecoratedClass = new FinalDecoratedClass();
		finalDecoratedClass.hello();
		(finalDecoratedClass as any).whoAmI();
		finalDecoratedClass.whoAmI();
		(finalDecoratedClass as any).whoAreYou();
		finalDecoratedClass.whoAreYou();

		console.log(finalDecoratedClass.myVar);
		console.log(PartialOneClass.myStaticVar);

		finalDecoratedClass.printMyVar();
		//#endregion

		//#region AnotherClass
		(AnotherClass as any).myStatic();
		AnotherClass.myStatic();

		const anotherClass: AnotherClass = new AnotherClass();
		anotherClass.hello();
		(anotherClass as any).whoAmI();
		anotherClass.whoAmI();
		(anotherClass as any).whoAreYou();
		anotherClass.whoAreYou();

		console.log(anotherClass.myVar);

		anotherClass.printMyVar();
		//#endregion

	};

export default test;
