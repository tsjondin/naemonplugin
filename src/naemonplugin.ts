"use strict";

import {
	OptionParser,
	StringOption,
	IntegerOption,
	IncrementOption,
} from "optionparser";

import {NaemonThreshold, NaemonThresholdOption} from "./naemonthreshold";

export interface PerformanceData {
	label : string,
	value : number,
	crit : string | undefined,
	warn : string | undefined,
	min : number | undefined,
	max : number | undefined,
	uom : string
}

export class NaemonPlugin {

	private host : string;
	private value : number;
	private timeout : string;
	private verbosity : number;

	private warning : NaemonThreshold;
	private critical : NaemonThreshold;
	private perfdata : Array<PerformanceData> = [];
	private output : Array<string> = [];

	readonly parser : OptionParser;

	constructor (description : string) {
		this.parser = new OptionParser(description);
		this.parser.add(new IncrementOption('v', 'verbose', 'Increase verbosity of output'));
		this.parser.add(new StringOption('V', 'version', 'Version'));
		this.parser.add(new StringOption('H', 'hostname', 'The host to perform the check against'));
		this.parser.add(new NaemonThresholdOption('w', 'warning', 'Warning threshold to use'));
		this.parser.add(new NaemonThresholdOption('c', 'critical', 'Critical threshold to use'));
		this.parser.add(new IntegerOption('t', 'timeout', 'Seconds before the plugin execution times out'));
	}

	public options () : any {
		return this.parser.parse();
	}

	public set_value (value : number) {
		this.value = value;
	}

	public add_perfdata (
		label : string,
		value : number,
		uom : string = 'number',
		warn : string | undefined = undefined,
		crit : string | undefined = undefined,
		min : number | undefined = undefined,
		max : number | undefined = undefined
	) {
		this.perfdata.push({label, value, warn, crit, min, max, uom});
	}

	public get_perfdata () : Array<PerformanceData> {
		return this.perfdata;
	}

	/**
	 * Returns the string representation of this plugins added performance data items.
	 */
	public get_perfdata_render () : string {
		return this.perfdata.map((data : PerformanceData) : string => {
			let uom : string = (data.uom === 'number') ? '' : data.uom;
			return `'${data.label}'=${data.value}${uom};` + ([
				data.warn ? data.warn : '',
				data.crit ? data.crit : '',
				data.min ? data.min : '',
				data.max ? data.max : ''
			].join(';'));
		}).join('|');
	}

	/**
	 * Tests whether a value is within a NaemonThreshold
	 */
	public within_threshold (value : number, threshold : NaemonThreshold) : boolean {
		if (threshold.within) {
			return (value >= threshold.low && value <= threshold.high);
		} else {
			return (value < threshold.low || value > threshold.high);
		}
	}

}
