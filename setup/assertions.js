const chai = require("chai");
const playwrightTest = require("@playwright/test");

global.expect = playwrightTest.expect;
global.assert = chai.assert;
global.should = chai.should;
