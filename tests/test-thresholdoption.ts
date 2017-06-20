"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';

import {
	NaemonThresholdOption,
	NaemonThreshold
} from "../naemonthreshold";

@suite("Test string options")
class NaemonThresholdOptionTester {

	@test "Test format '10'" () {

		const option = new NaemonThresholdOption('t', 'test');
		option.set_value('10');
		const value : NaemonThreshold = option.get_value();

		expect(value).to.deep.equal({
			low: 0,
			high: 10,
			within: false
		});

	}

	@test "Test format '10:'" () {

		const option = new NaemonThresholdOption('t', 'test');
		option.set_value('10:');
		const value : NaemonThreshold = option.get_value();

		expect(value).to.deep.equal({
			low: 10,
			high: Number.MAX_VALUE,
			within: false
		});

	}

	@test "Test format '~:10'" () {

		const option = new NaemonThresholdOption('t', 'test');
		option.set_value('~:10');
		const value : NaemonThreshold = option.get_value();

		expect(value).to.deep.equal({
			low: Number.MIN_VALUE,
			high: 10,
			within: false
		});

	}

	@test "Test format '10:20'" () {

		const option = new NaemonThresholdOption('t', 'test');
		option.set_value('10:20');
		const value : NaemonThreshold = option.get_value();

		expect(value).to.deep.equal({
			low: 10,
			high: 20,
			within: false
		});

	}

	@test "Test format '@10:20'" () {

		const option = new NaemonThresholdOption('t', 'test');
		option.set_value('@10:20');
		const value : NaemonThreshold = option.get_value();

		expect(value).to.deep.equal({
			low: 10,
			high: 20,
			within: true
		});

	}

}

