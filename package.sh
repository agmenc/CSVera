#!/bin/sh

java -jar closure-compiler/compiler.jar  --compilation_level ADVANCED_OPTIMIZATIONS --js src/KeyBindings.js --js src/TableFilterer.js --js src/jquery.inc-6.js --js src/CsvExtractor.js --js src/InlineCellEditor.js --js src/TableLoader.js --js src/TableEditor.js --js_output_file download/csvera.js

cp src/CSVera.html src/csvera.css src/jquery-1.7.1.min.js src/underscore-min.js download

zip -rv -x *.zip @ download/download.zip download/
