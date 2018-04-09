# Running the Pixel2HTML Generator

### Option 1: Answering the questions

To generate the **Pixel2HTML Boilerplate** go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo pixel2html
```
The **Pixel2HTML Boilerplate** will ask you questions about this points. Answering with the desired options will generate the code.

* Project Name?
* Quantity of screens?
* Markup Language? _Options: HTML / Pug_
* Markup Integration? _Options: None / Jekyll_
* Frontend Framework _Options: None / Bootstrap 3.*/ Bootstrap 4 Beta / Foundation_
* jQuery? _Options: true / false_


### Option 2: Using available parameters

You also can answer this questions passing parameters to the generator command.

Here there are the available questions:

* `--projectName` (*string*)
* `--qtyScreens` (*int*)
* `--markupLanguage` (*string*) [html, pug]
* `--markupIntegration` (*string*) [jekyll, none]
* `--frontEndFramework` (*string*) [bootstrap, bootstrap-4, foundation, none]
* `--jQuery` (*bool*)

Example:

```
$ yo pixel2html --projectName=Floyd --markupLanguage='html'
```

### Option 3: Using the config file

You can create a `.project.conf` file in the root directory of your project.
Here an example of it's structure:

```
{
  "projectName": 'XXX',
  "qtyScreens": 4,
  "markupLanguage": 'html',
  "markupIntegration": 'jekyll',
  "frontEndFramework": "bootstrap",
  "jQuery": true
}
```

Once you answered all the question, you can hit at:
```
$ yo pixel2html
```
