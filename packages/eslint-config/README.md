# eslint-config-pixel2html

This is a shareable ESLint configuration used by Pixel2HTML.

## Installation

If you're using our [Frontend Boilerplate](https://github.com/Pixel2HTML/pixel2html-generator) or our [Shopify Boilerplate](https://github.com/Pixel2HTML/shopify-skeleton) then you don't have to do anything you're already linting like a boss.

## Manual Installation

```bash
npm install eslint eslint-config-pixel2html --save-dev
```

Then set your `.eslintrc` or in your eslint field inside `package.json`:

```json
{
  "extends": "pixel2html"
}
```

That's it! You can override the settings from `eslint-config-pixel2html` by editing the `.eslintrc` file. Learn more about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
