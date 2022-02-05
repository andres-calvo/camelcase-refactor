# camelcase-refactor

Refactor all your css classes to camelCase, this extension will read following types of files *.module.scss , *.module.sass , *.module.css , *.jsx , *.tsx  

#### CSS classes RegExp  
**(?<=(\.))([_a-zA-Z]+[_a-zA-Z0-9-]*)**  
#### JSX | TSX classNames RegExp  
**(?<=(styles\.))([_a-zA-Z]+[_a-zA-Z0-9-]*)**

## Features

This extension comes with two commands, "camelCase: Classes" and "camelCase: JSX|TSX classNames" , first one is in charge of refactoring all of your classes, while last one will refactor react classNames.


## Release Notes

### 1.0.0

Initial release
