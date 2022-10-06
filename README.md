# robotFramework-vscodeFormatter README

## Features : Document Formatter

* Document Formatter automatically format the document for readability purpose.

* This extension only do this, colors are from an other extension.

* Use "SHIFT + ALT + F" or "right click" -> "Format Document" to format the page.

---
   
   * Basics
  
   * Not Formatted Tests Or Keywords :
  
   ![Basic](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/basicUc.PNG) 

  * Formatted Tests or Keywords : 
  
  * Tags, Setup, Teardown, Arguments and Return are formatted independently, to keep minimal space with given indent.
  
    Documentation and following "..." aren't formatted, they remain as they were write.

    You can use "|||" in the beginning of a line to avoid the formatting of the line.
	
    Keywords are formatted in groups, If newline or new test, it starts a new formatted group.
  
    ![Basic Format](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/BasicUcFormated.PNG) 

---

* Document Formatter automatically format FOR and IF loop (rbf 4.X for If Loop).

    * Not Formatted Loop :
	
    ![Loop](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/LoopKw.PNG) 
    
	* Formatted Loop : 
  
	    * Each new nested FOR, IF, GIVEN or TRY initiate a new bucket of formatted keywords.
	  
			FOR, IF or ELSE IF, GIVEN THEN, and TRY EXCEPT FINNALY keywords are formatted independently.
			 
			It have the same particularities than basic format. 

    ![Loop Format](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/LoopKwFormated.PNG) 
  
---

* Document Formatter Indent Option.
     
	![Param Indent](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/paramIndent.PNG) 

    * Document Formatted with 2 spaces indent :
	
    ![two indents](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/2indents.PNG) 

---

* Document Formatter listKeywordToFormat Option.
	* List Of Keyword You want To automatically format with given indent.

---

* Document Formatter : Keyword with one or many arguments very long (by default, more than 60 chars, excluding spaces in count).
	
	* Non Formatted Test With Long Arg Keyword :
     
	![longArg](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/LongVarKeepOrReinitBucket.PNG) 

    * Test Formatted :
	
		* Format type one : only the long keyword is formatted, following lines keep precedent lines format group.
		
		![longArgFormatKeep](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/LongVarKeepBucketFormated.PNG) 
		
		* Option to choose which max length in arg you want before format :
		
			To avoid bug, if you choose to use this option, set "maxCharsInArgsReinitBucket" to "1000".
		
		![paramlongArgFormatKeep](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/paramLongVarKeepBucket.PNG) 
		
		* Format type two : only the long keyword line is formatted, following lines start a new formatted group.
		
		![longArgFormatReinit](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/LongVarReinitBucketFormated.PNG) 
		
		* Option to choose which max length in arg you want before format :
		
			To avoid bug, if you choose to use this option, set "maxCharsInArgsKeepBucket" to "1000".
		
		![paramlongArgFormatReinit](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/paramLongVarReinitBucket.PNG) 

---

* Document Formatter : line with a lot of keywords or args (by default, more than 10 kw/args).
	
	* Non Formatted Test With Many Args and Keywords :
     
	![manyArg](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/KeywordWithManyVarKeepOrReinitBucket.PNG) 

    * Test Formatted :
	
		* Format type one : only the line with many args/kw is formatted, following lines keep precedent lines format group.
		
		![manyArgFormatKeep](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/KeywordWithManyVarKeepBucketFormated.PNG) 
		
		* Option to choose which max args/kw you want before format :
		
			To avoid bug, if you choose to use this option, set "maxArgsInKwLineReinitBucket" to "1000".
		
		![parammanyArgFormatKeep](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/paramKwManyVarKeepBucket.PNG) 
		
		* Format type two : only the line with many args/kw is formatted, following lines start a new format group.
		
		![manyArgFormatReinit](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/KeywordWithManyVarReinitBucketFormated.PNG) 
		
		* Option to choose which max args/kw you want before format :
		
			To avoid bug, if you choose to use this option, set "maxArgsInKwLineKeepBucket" to "1000".
		
		![parammanyArgFormatReinit](https://github.com/Flibi/robotFramework-vscodeFormatter/raw/master/pictures/paramManyVarInKwReinitBucket.PNG) 
		

# Credits

* Coloration comes from "Robot Framework Intellisense FORK"

* tumit : https://github.com/tumit/vscode-rf-formatter

* nayanda1 : https://github.com/KMK-ONLINE/vscode-robotExtension
	
 
# Versions
### 1.0.0
Initial release
### 1.1.0
Non Formatted ready to read line by robot Framework with "|||" in the beginning of the line.
Use "|" in indentation is now retroactive if you want to suppress them
### 1.2
Keyword, Tags, Return ... Are now case insensitive.
TRY EXCEPT FINALLY from RFW 5 added to formater.
Added listKeywordToFormat option
