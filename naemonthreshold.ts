"use strict";

import {
	OptionInterface,
	Option
} from "optionparser";

export interface NaemonThreshold {
	low : number,
	high : number,
	within : boolean
}

export class NaemonThresholdOption extends Option implements OptionInterface {

	private value : NaemonThreshold;

	public set_value (value : string) : void {
		const MATCH_RANGE_DEF : RegExp = /^(\@)?(\d+|~)?(\:)?(\d+)?$/;
		let match : Array<string> | null;
		if (match = value.match(MATCH_RANGE_DEF)) {

			let within : boolean = (match[1] === '@');
			let low : number = 0;
			let high : number = 0;

			if (match[3]) {

				high = Number.MAX_VALUE;

				if (match[2] === "~") {
					low = Number.MIN_VALUE;
				} else if (match[2]) {
					low = parseFloat(match[2]);
				}

				if (match[4]) {
					high = parseFloat(match[4]);
				}

			} else {
				high = parseFloat(match[2]);
			}

			this.value = {low, high, within};

		} else {
			throw new Error("Foobar");
		}
	}

	public get_value () : NaemonThreshold {
		return this.value;
	}

}
