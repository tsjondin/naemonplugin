"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';

import {NaemonPlugin, PerformanceData} from "../src/naemonplugin";
import {NaemonThreshold} from "../src/naemonthreshold";

@suite("Test Naemon plugin perfdata")
class NaemonPluginPerfadataTester {

	@test "Test that perfdata is retriavable correctly" () {

		const plugin = new NaemonPlugin("Just testing");
		plugin.add_perfdata("label", 5);
		const perfdata : Array<PerformanceData> = plugin.get_perfdata();

		expect(perfdata).to.deep.equal([{
			label: "label",
			value: 5,
			warn: undefined,
			crit: undefined,
			min: undefined,
			max: undefined,
			uom: "number"
		}]);

	}

	@test "Test that perfdata is rendered correctly for one instance" () {

		const plugin = new NaemonPlugin("Just testing");
		plugin.add_perfdata("label", 5);
		const perfdata : string = plugin.get_perfdata_render();

		expect(perfdata).to.equal("'label'=5;;;;");

	}

	@test "Test that perfdata is rendered correctly for multiple instance" () {

		const plugin = new NaemonPlugin("Just testing");
		plugin.add_perfdata("label1", 5);
		plugin.add_perfdata("label2", 10);
		const perfdata : string = plugin.get_perfdata_render();

		expect(perfdata).to.equal("'label1'=5;;;;|'label2'=10;;;;");

	}

}

