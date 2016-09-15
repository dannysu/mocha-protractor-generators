'use strict';

const flow = protractor.promise.controlFlow();

const e = exports;

e.install = function() {
    const METHODS = [
        'beforeEach',
        'afterEach',
        'before',
        'after',
        'it'
    ];

	METHODS.forEach(function(name) {
		const originalFn = global[name];

		const modifiedFn = function() {
            const args = [].slice.call(arguments);
            const lastIndex = args.length - 1;
			const testFn = args[lastIndex];

            if (testFn.constructor.name === 'GeneratorFunction') {
                args[lastIndex] = function() {
                    return flow.execute(testFn);
                };
            }

			return originalFn.apply(null, args);
		};

		modifiedFn.only = function() {
			if (name === 'it') {
				throw new Error('mocha-protractor-generators does not support "it.only"');
			}

			return originalFn.only.apply(null, arguments);
		};

		modifiedFn.skip = function() {
			return originalFn.skip.apply(null, arguments);
		};

		global[name] = modifiedFn;
	});
};
