# cash

> Simple-to-use currency converter

## Usage

### Convert currencies

Let's say we want to test the cash library using `node bin/index.js` in a CMD.

```js
'use strict';

const Conf = require('conf');
const meow = require('meow');
const chalk = require('chalk');
const cash = require('./cash.js');

const config = new Conf();
const argv = process.argv.slice(2);

const {DEFAULT_TO_CURRENCIES} = require('./constants');

...

const command = {
	amount: parseFloat(argv[0]) || 1,
	from: argv[1] || config.get('defaultFrom', 'USD'),
	to: (argv.length > 2) ? process.argv.slice(4) : config.get('defaultTo', DEFAULT_TO_CURRENCIES)
};

cash(command);
```

By default, running the command will convert USD in EUR, GBP and JPY. <br>
So running `node bin/index.js` will output:

```sh
√ 0.879 (EUR) Euro
√ 0.755 (GBP) British Pound Sterling
√ 111.877 (JPY) Japanese Yen

Conversion of USD 1
```

You can also specify an amount to convert, its currency and the currencies you want to convert it into: `node bin/index.js 10 <amount> <from> <into>` <br>
For example, running `node bin/index.js 10 usd krw` will output:

```sh
√ 11263.463 (KRW) South Korean Won

Conversion of USD 10
```

### Setting the default conversion

```js
...
const cli = meow(`
	Usage
		$ cash <amount> <from> <to>
		$ cash <options>
	Options
		--set -s 			Set default currencies
	Examples
		$ cash 10 usd eur pln
		$ cash --set usd aud
`);

if (argv.indexOf('--save') !== -1 || argv.indexOf('-s') !== -1) {
	config.set('defaultFrom', argv[1] || config.get('defaultFrom', 'USD'));
	config.set('defaultTo', (argv.length > 2) ? process.argv.slice(4) : config.get('defaultTo', DEFAULT_TO_CURRENCIES));
	console.log(chalk.green('Saved default currencies to ' + config.path));
	process.exit(0);
}
...
```

If you want to change the default conversion, you can specify the currency of the amount to be converted and the currencies into which it will be converted: `node bin/index.js -s <from> <into>` <br>
For example, running `node bin/index.js -s usd krw` will set the default conversion to USD to KRW:

```sh
Saved default currencies to .\cash-nodejs\Config\config.json
```

Now if we run `node bin/index.js`:

```sh
√ 1126.346 (KRW) South Korean Won

Conversion of USD 1
```

## API

To use the cash library to your project, add this line:

```js
const cash = require('./cash.js');
```

To use it, you have to create a constant specifying the following:
- `amount`(float) - amount to be converted
- `from` (string) - currency of the amount to be converted
- `to` ([string]) - currencies to be converted to

Here's an example:

```js
const command = {
	amount:10,
	from:'eur',
	to:['usd'],
}

cash(command);
```

## Install

After forking and cloning the project, go to where your repository is located and run the command:

```sh
npm i
```
NB: make sure you have [npm](https://npmjs.org/) installed.
