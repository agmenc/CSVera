#!/bin/sh

version=$(cat minor_version.txt)
#let version++
#echo $version > minor_version.txt

target="download/files"
minifiedName="csvera-1.${version}-min.js"

cat ${target}/CSVera.template | sed "s/@CSVERA@/${minifiedName}/" > ${target}/CSVera.html

java -jar closure-compiler/compiler.jar  --compilation_level SIMPLE_OPTIMIZATIONS --js src/KeyBindings.js --js src/TableFilterer.js --js src/jquery.inc-6.js --js src/CsvExtractor.js --js src/InlineCellEditor.js --js src/TableLoader.js --js src/TableEditor.js --js src/Constructor.js --js_output_file ${target}/${minifiedName}

cp src/csvera.css src/jquery-1.7.1.min.js src/underscore-min.js ${target}

zip -rv -x *.zip @ download/csvera-1.${version}.zip ${target}/*
