DEST="./dist"

mkdir -p "$DEST/about/"
SCRIPT_FILENAME=index.php REQUEST_URI=/ php index.php > "./$DEST/index.html"
SCRIPT_FILENAME=team.php REQUEST_URI=/ php about/team.php > "./$DEST/about/team.html"
# SCRIPT_FILENAME=team.php REQUEST_URI=/about php team.php > "./$DEST/about/team.html"
