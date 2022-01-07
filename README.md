# Movie Recommendation App

Σκοπός της εργασίας είναι να υλοποιήσετε ένα frontend το οποίο θα σας επιτρέπει μέσω της χρήσης ενός API να προσπελάσετε ταινίες και αξιολογήσεις χρηστών και να τα αξιοποιήσετε προκειμένου να φτιάξετε ένα σύστημα παροχής προτάσεων (recommendation) προς τους χρήστες του frontend.

## Λειτουργικότητα

Συγκεκριμένα η λειτουργικότητα που θα υποστηρίζει το frontend θα είναι η εξής:

Αναζήτηση με τίτλο ταινίας και εμφάνιση στο frontend στοιχείων ταινίας με δομημένο τρόπο.
Προσθήκη αξιολόγησης [0.5, 1, 1.5, 2, 2.5,..., 5] για την ταινία. Οι αξιολογήσεις θα αποθηκεύονται σε ένα αντικείμενο για κάθε χρήστη στον client.
Προβολή προτάσεων για ταινίες που το σύστημα εκτιμά ότι θα άρεσαν στο χρήστη.

## Προσέγγιση

Η λογική του recommendation βασίζεται στην τεχνική "collaborative filtering", όπου –πρακτικά- οι προτιμήσεις ενός χρήστη συγκρίνονται με προτιμήσεις άλλων χρηστών στα ίδια αντικείμενα. Το αποτέλεσμα της σύγκρισης ονομάζεται συντελεστής συσχέτισης (correlation coefficient) και το σύστημα θεωρεί ότι όσο μεγαλύτερος είναι τόσο περισσότερο τα “profiles” δύο χρηστών ταυτίζονται. Επομένως, προτιμήσεις με υψηλή βαθμολογία από ένα χρήστη μπορούν να χρησιμοποιηθούν ως συστάσεις για έναν άλλο με τον οποίο "ταυτίζονται". Ένας τέτοιος συντελεστής είναι και ο Pearson correlation coefficient.

Αναμένεται να χρησιμοποιήσετε pure Javascript, HTML, CSS (προαιρετικά).

## Στόχοι

Μείωση του όγκου των δεδομένων που μεταφέρονται μέσω του δικτύου χρησιμοποιώντας τεχνικές στο frontend.
Χρήση μίας μόνο σελίδας .html και δυναμική διαχείριση του περιεχομένου (επομένως έντονη χρήση της Javascript και του AJAX).
Ελαχιστοποίηση σφαλμάτων στο UI (π.χ. μη εύρεση ταινίας λόγω λανθασμένου τρόπου γραφής)

## API(Backend)

URL: http://62.217.127.19:8010/movie

Μέθοδος: POST

Είσοδος: Ένα string ως json της μορφής {"keyword":"Toy"}

Έξοδος: Ένα json array με στοιχεία της/των ταινίας/ιών συμπεριλαμβανόμενου και του ID της/τους (mID) που ξεκινούν από το input string.

 -------------------------

URL: http://62.217.127.19:8010/movie/{mId}

Μέθοδος: GET

Είσοδος: mID ταινίας ως παράμετρο με τίτλο "id" στο HTTP request

Έξοδος: Ένα json array με τα στοιχεία της ταινίας

  -------------------------


URL: http://62.217.127.19:8010/ratings

Μέθοδος: POST

Είσοδος: Ένα json που θα περιέχει ένα array με mID ταινιών της μορφής {"movieList":[4,5,12]}

Έξοδος: Ένα json array με αξιολογήσεις για κάθε ταινία και κάθε χρήστη

 
 -------------------------

URL: http://62.217.127.19:8010/ratings/{id}

Μέθοδος: GET

Είσοδος: uID χρήστη ως παράμετρο με τίτλο "id" στο HTTP request

Έξοδος: Ένα json array με τα ratings και τα υπόλοιπα στοιχεία των ταινιών τις οποίες ο χρήστης uID έχει αξιολογήσει.

 -------------------------

## Σημειώσεις

Δε χρειάζεται να υλοποιήσετε μηχανισμούς authorization, authentication, accounting. Θεωρείστε ότι τη σελίδα τη χρησιμοποιεί ένας χρήστης για όσο διάστημα την έχει ανοιχτή.
Θα πρέπει να χρησιμοποιήσετε τα APIs και τις τεχνικές που είδαμε στο μάθημα (vanilla JS). Όχι frameworks και τίποτα μετά από την ES2015
Μπορείτε να βρείτε τους κανόνες για την παράδοση της εργασίας εδώ: [hua](http://www.dit.hua.gr/~tserpes/instructions.html)

## Αρχεία

Περιλαμβάνονται τα:
* movies.html
* movieapp.js
* functions.js
* style.css
* popcorn.png

## Documentation
<a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images\search.png">
</a>
```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Acknowledgments

[How to make a movie app in Vanilla Javascript](https://dev.to/abhidevelopssuntech/how-to-make-a-movie-app-in-vanilla-javascript-2336)

[How to Build a Movie App with Vanilla JavaScript](https://javascript.plainenglish.io/how-to-build-a-movie-app-with-vanilla-javascript-351a9255d7ad)

[How to Fetch and Display JSON Data in HTML Using JavaScript](https://howtocreateapps.com/fetch-and-display-json-html-javascript/)

[Grid system](https://getbootstrap.com/docs/5.1/layout/grid/)

[Generating dynamic html cards from a javascript array](https://stackoverflow.com/questions/54706080/generating-dynamic-html-cards-from-a-javascript-array)

[Make bootstrap navbar fixed on scroll (sticky top)](https://bootstrap-menu.com/detail-fixed-onscroll.html)

[5 star rating with css and html](https://codepen.io/hesguru/pen/BaybqXv)

[https://codepen.io/hesguru/pen/BaybqXv](https://stackoverflow.com/questions/50201740/click-event-add-html-element-everytime-i-click-pure-js)

[Neumorphism Card Animation](https://codepen.io/ngthuongdoan/pen/wvWvbbj)

[How to make a star rating with JS ⭐ ⭐ ⭐ ⭐ ⭐](https://dev.to/leonardoschmittk/how-to-make-a-star-rating-with-js-36d3)

[pearson-correlation.js](https://gist.github.com/matt-west/6500993)

[Star-Rating Using A Single Input](https://dev.to/madsstoumann/star-rating-using-a-single-input-i0l)

[How TO - CSS Loader](https://www.w3schools.com/howto/howto_css_loader.asp)

[Sort JSON Object Array Based On A Key Attribute In JavaScript](https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/)

[Fetch in fetch inside a loop JS](https://stackoverflow.com/questions/60710423/fetch-in-fetch-inside-a-loop-js)

