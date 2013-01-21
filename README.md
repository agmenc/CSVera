CSVera
======

CSVera is a planning and estimating tool, disguised as an in-browser CSV editor. Advantages:
* No server is required
* The underlying data is still a checked-in CSV
* You can display it read-only from a CI server, e.g. TeamCity
* It doesn't really care what columns you have, so long as there is a header row

Download
========
Download the complete zip or just grab the latest copy of csvera.js

Usage
=====
* Modify the file CSVera.html so that it points to your own CSV file. This should have a header row.
* Open csvera.html in your favourite browser.
* Click rows to select them. Use the arrow keys to move them up and down.
* Click column headings to activate the filters.
* Use CTRL-A then CTRL-C to copy the contents back to the original file.

Abusage
=======
Google Chrome sucks a bit when it comes to security overkill. It won't let one local file AJAX-load another, since file:/// URLs don't have any origin, therefore violate the same origin policy. The workaround is to start Chrome with this check disabled.

Mac:
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
```

Windows:
```
"C:\Documents and Settings\username\Local Settings\Application Data\Google\Chrome\Application\chrome.exe"   --allow-file-access-from-files
```

Unfeatures
==========

CSVera does not yet do:
* Saving back to the original file. Javascript isn't allowed to do this. The workarounds are hideous. I might do one later.
* Multi-column filtering
* In-cell editing
* Hiding of rows based on empty/full cells
* Column-click sorting
