# robotFramework-vscodeFormatter README

## Features : Document Formatter

* Document Formatter
    * it automatically format the document for readability purpose f

![Document Formatter](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/document-formatter.png)

* Keyword Autocomplete
    * it scans all the included resources and search for its keywords
    * it will suggest common keywords from BuiltIn, Selenium2Library, ExtendedSelenium2Library, and more

![Keyword Autocomplete](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/smart-keyword-autocomplete.png)

* Resource Autocomplete
    * it scans all resources

![Resource Autocomplete](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/smart-resource-autocomplete.png)

* Variable Autocomplete
    * it scans all the included resources and search for its global variables
    * it scans all variables from local files

![Variable Autocomplete](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/smart-variable-autocomplete.png)

* Language Autocomplete

![Language Autocomplete](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/builtin-grammar-autocomplete.png)

* Find All References
    * Show all references of keywords
    * Show all references of global variables

![Find All References](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/reference-provider.png)

* Keyword Definition
    * Show the original keyword location
    * ctrl + click to the keyword will bring you to the original keyword location

![Keyword Definition](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/keyword-definition.png)

* Variable Definition
    * Show the original global and suite variable location
    * ctrl + click to the variable will bring you to the original variable location

![Variable Definition](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/variable-definition.png)

* Keyword Rename
    * can rename keyword and all its reference

![Keyword Rename](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/keyword-rename.png)

* Variable Rename
    * can rename global variable and all its reference

![Variable Rename](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/variable-rename.png)

* Variable Hover
    * Hovering your mouse on global variable will give you the information about its initialization value

![Variable Hover](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/variable-hover.png)

* Keyword Hover
    * Hovering your mouse on keyword will give you the information about its Arguments and Return Value

![Keyword Hover](https://github.com/KMK-ONLINE/vscode-robotExtension/raw/master/keyword-hover.png)

## Configurations

You can create default configuration for your workspace by creating config.json inside your workspace root folder:

* Default Keyword Autocomplete Library
    * You can set default autocomplete keyword from library you want across all your files in the workspace

``` javascript
//config.json
{
    "lib":["AppiumLibrary", "Process", ...] //it must be in array
}
```

## Requirements

You need to have robotframework language support for visual studio code if you want text highlighter

## Known Issues

Little performance issues when scanning when handle more than 300++ files whith complex structure in workspace

## For Contributors

- You can added new suggestion library with its keywords at src/dictionary/KeywordDictionary.ts with format:

``` typescript
export var LIB =
	[
        //your new library is here
		{
			name: "libraryName", //name must be correct
			key: [ "keyword1", "keyword2" ]
        },
        ...
    ]
    
```

- Don't forget to add definition if you add new method, function, class or anything new:

``` typescript
/**
 *  this is class for something
 */
export class MyClass{

    /**
     * This is method to do something
     *
     * @param args arguments of something
     *
     * @return something
     */
    public myMethod(args) : any {
        .
        .
        .
        return 0;
    }

}
```

- Don't forget to update the version on "package.json" and add changelog on "CHANGELOG.md" if you made some changes:

``` javascript
//package.json
{
    "name": "robotf-extension",
    "displayName": "RobotF Extension",
    "description": "Extension for robot framework",
    "version": "1.5.1", //update this version
    "publisher": "kmk-labs",
    ..
    ..
}
```

## Release Notes

### 1.6.0
Now you can create your own workspace configuration

### 1.5.0
Added reference provider

### 1.4.0
Major code restructure

### 1.3.1
Added hover provider

### 1.2.0
Added rename provider

### 1.1.0
Added definition provider

### 1.0.0
Initial release of robot framework extension
