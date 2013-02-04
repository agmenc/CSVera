#!/bin/sh

function updateVersion() {
    minorVersion=$(cat minor_version.txt)
    let minorVersion++
    echo $minorVersion > minor_version.txt
    version="1.${minorVersion}"
    replace "CSVera.template.html" "${target}/CSVera.html"
    replace "README.template.md" "README.md"
}

function replace() {
    template=$1
    toPublish=$2
    cat "templates/$template" | sed "s/@VERSION@/${version}/" > "$toPublish"
}

function remove() {
    directory=$1
    filePattern=$2
    for file in $(find $directory -name "$filePattern") ; do
        git rm --ignore-unmatch $file
        rm -f $file
    done
}

version=
target="download/files"

remove download "csvera-*.zip"
remove ${target} "csvera-*.min.js"

updateVersion

# allScripts=$(ls *.js | egrep -v "jquery*min.js|underscore-min.js") | add the src/ to the front
java -jar closure-compiler/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js src/KeyBindings.js --js src/TableFilterer.js --js src/jquery.inc-6.js --js src/CsvExtractor.js --js src/InlineCellEditor.js --js src/RawEditor.js --js src/TableLoader.js --js src/SelectText.js --js src/TableEditor.js --js src/Constructor.js --js_output_file ${target}/csvera-${version}.min.js

cp src/csvera.css src/jquery-1.7.1.min.js src/underscore-min.js ${target}

zip -rv -x *.zip @ download/csvera-${version}.zip ${target}/*

git add ${target}/csvera-${version}.min.js
git add download/csvera-${version}.zip
