## CSVera

CSVera is a planning and estimating tool, disguised as an in-browser CSV editor. Advantages:
* No server is required
* The underlying data is still a checked-in CSV
* You can display it read-only from a CI server, e.g. TeamCity
* It doesn't really care what columns you have, so long as there is a header row

## Download & Install
* Download the [Complete Zip](https://github.com/agmenc/CSVera/raw/master/download/csvera-1.1.zip). To change versions, just grab the latest copy of [csvera.js](https://raw.github.com/agmenc/CSVera/master/download/files/csvera-1.1-min.js)
* Modify the `<table>` in `CSVera.html` so that the `csv` attribute points to your own CSV file. This should have a header row.

## Usage
* Open `CSVera.html` in your favourite browser (Chrome)
* Click rows to select them. Use the arrow keys to move them up and down. `CTRL-d` (or `CMD-d`) to duplicate the row.
* Click column headings to activate filters.
* Use `CTRL-a` then `CTRL-c` to copy the contents back to the original file (or `CMD-a` and `CMD-c`)

## Abusage
### Chrome
Google Chrome sucks a bit when it comes to security overkill. It won't let one local file AJAX-load another, since `file:///` URLs don't have any origin, therefore violate the same origin policy, even when they have the same origin. The workaround is to start Chrome with this check disabled.

Mac:
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
```

Windows:
```
"C:\Documents and Settings\username\Local Settings\Application Data\Google\Chrome\Application\chrome.exe"   --allow-file-access-from-files
```

### Firefox
Go to `about:config` (type it in the address bar) and set `security.fileuri.strict_origin_policy` to `false`

### IE
Versions less than IE 9 are aggressively unsupported. IE 9 is just untested.

## Unfeatures

CSVera does not yet do:
* Saving back to the original file. Javascript isn't allowed to do this. The workarounds are hideous. I might do one later.
* Column-click sorting
