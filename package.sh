#!/bin/sh

java -jar closure-compiler/compiler.jar  --compilation_level SIMPLE_OPTIMIZATIONS --js src/KeyBindings.js --js src/TableFilterer.js --js src/jquery.inc-6.js --js src/CsvExtractor.js --js src/InlineCellEditor.js --js src/TableLoader.js --js src/TableEditor.js --js src/Constructor.js --js_output_file download-files/csvera.js

cp src/csvera.css src/jquery-1.7.1.min.js src/underscore-min.js download-files

zip -rv -x *.zip @ download-all.zip download-files/*
