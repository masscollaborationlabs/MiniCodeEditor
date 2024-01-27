# Contributions

If you are reading this, it is because you are interested in contributing your grain of sand to this small project.

## Table of contents
1.  [Create or edit language files](#create-or-edit-language-files)
    1. [Highlights](#highlights)
    1. [Shortcuts](#shortcuts)

## Create or edit language files

Inside the **languages** folder you will find several files containing the rules of the different programming languages.


The syntax that follows the name of the files is **PROGRAMMING_LANGUAGE**.js

### Highlights
The way Mini Code Editor highlights the code of a certain color is based on the highlights property.

Using regular expressions, the string is replaced by HTML tags applying the color effect

```json
// Regex to paint HTML comments in green
{
    "regex": /&lt;!--[^>]*--&gt;/gm,
    "replaceTo": "<SPAN CLASS='mini-code-editor-green'>$&</SPAN>"
}
```

List of available colors:
```css
.mini-code-editor-blue{color: blue;}
.mini-code-editor-red{color: red;}
.mini-code-editor-green{color: green;}
.mini-code-editor-orange{color: orange;}
.mini-code-editor-purple{color: purple;}
.mini-code-editor-brown{color: brown;}
```

### IMPORTANT !!!!!!!!!!!

To avoid unexpected effects when using the editor, it is important that these regular expressions go at the beginning of the highlighting rule

```json
{
    "regex": "&",
    "replaceTo": "&amp;"
},
{
    "regex": "<",
    "replaceTo": "&lt;"
},
{
    "regex": ">",
    "replaceTo": "&gt;"
},
{
    "regex": "=",
    "replaceTo": "&equals;"
},
```

If you plan to use the above characters, remember for their respective HTML entities inside regular expressions

```txt
& -> &amp;
< -> &lt;
> -> &gt;
= -> &equals;
```

Regular expressions are executed in order. And that order matters, if a regular expression is giving weird results, try changing the order in which regular expressions are executed.

### Shortcuts

Shortcuts are easier to edit than highlights.

Just enter the keyword to activate the shortcut. Then you indicate the block to create from the right and left, to indicate where to position the cursor of the editor after adding the block.

```json
{
    "keyword": "form",
    "left": "<form action='' method=''>\n\t",
    "right": "\n</form>"
}
```

```txt
Result:
<form action='' method=''>
    |
</form>
```