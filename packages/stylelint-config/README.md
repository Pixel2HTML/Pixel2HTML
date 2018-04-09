# stylelint-config-pixel2html

[Stylelint](https://stylelint.io/) SCSS config recommendations from Pixel2HTML

Your standard every day bro scss stylelint configuration:


## Installation

If you're using our [Frontend Boilerplate](https://github.com/Pixel2HTML/pixel2html-generator) or our [Shopify Boilerplate](https://github.com/Pixel2HTML/shopify-skeleton) then you don't have to do anything you're already linting like a boss.


## Manual Installation

```bash
npm install stylelint @pixel2html/stylelint-config --save-dev
```

## Usage

Just set your stylelint config to:

```json
{
  "extends": "@pixel2html/stylelint-config"
}
```

### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to turn off the `block-no-empty` rule, and add the `unit-whitelist` rule:

```json
{
  "extends": "@pixel2html/stylelint-config",
  "rules": {
    "block-no-empty": null,
    "unit-whitelist": ["em", "rem", "s"]
  }
}
```
