CSVera
======

CSVera is a browser-based CSV editor. It doesn't require a server to run. It is useful for editing CSV files which are stored under source control.

I use it to edit a prioritised feature-list for applications I am working on. This is checked-in to source control, and my collaborators can also edit it. If I really mess things up, I revert the change.

Usage
=====
* Modify the file csvera.html so that it points to your own CSV file. This should have a header row.
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
