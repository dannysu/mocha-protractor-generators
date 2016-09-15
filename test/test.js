'use strict';

const origIt = it;
const origAfter = after;
require('../src').install();
require('should');

describe('mocha-protractor-generators', function() {
    let executeCount = 0;

    describe('regular function', function() {
        beforeEach(function() {
            executeCount++;
        });

        afterEach(function() {
            executeCount++;
        });

        before(function() {
            executeCount++;
        });

        after(function() {
            executeCount++;
        });

        it('should work the same as before', function() {
            executeCount++;
            return executeCount.should.be.eql(3);
        });
    });

    describe('after testing regular function', function() {
        origIt('should have incremented executeCount', function() {
            return executeCount.should.be.eql(5);
        });

        origAfter(function() {
            executeCount = 0;
        });
    });

    describe('generator function', function() {
        beforeEach(function*() {
            yield Promise.resolve();
            executeCount++;
        });

        afterEach(function*() {
            yield Promise.resolve();
            executeCount++;
        });

        before(function*() {
            yield Promise.resolve();
            executeCount++;
        });

        after(function*() {
            yield Promise.resolve();
            executeCount++;
            return executeCount.should.be.eql(5);
        });

        it('should execute via Protractor ControlFlow', function*() {
            yield Promise.resolve();
            executeCount++;
            return executeCount.should.be.eql(3);
        });
    });

    describe('after testing generator function', function() {
        origIt('should have incremented executeCount', function() {
            return executeCount.should.be.eql(5);
        });

        origAfter(function() {
            executeCount = 0;
        });
    });
});
