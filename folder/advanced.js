// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus(); // Όταν φορτώνεται η σελίδα να είναι έτοιμο το text box να δεχτεί τιμές (χωρίς να κλικαριστεί πρίν με το ποντίκι)

newGuess.addEventListener("keyup", checkKey); // Ορισμός χειριστή για όταν ελευθερωθεί ένα πλήκτρο (ουσιαστικά αφού πατηθεί).
checkButton.addEventListener("click", checkGuess); // Ορισμός χειριστή για οταν πατηθεί (με αριστερό κλικ) το button "Έλεγχος".
restartButton.addEventListener("click", restart); // Ορισμός χειριστή για οταν πατηθεί (με αριστερό κλικ) το button "Παίξε ξανά".
let triesCounter = 0; // Όρισμός μετρητή προσπαθειών, με αρχική τιμή 0.

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100 
 και τον εκχωρεί στη μεταβλητή theGuess */

    theGuess = Math.floor(Math.random() * 100 + 1); // Εκχώρηση τυχαίου ακεραίου αριθμού μεταξύ 1 και 100 στην global μεταβλητή theGuess
    console.log(theGuess); // Εμφάνιση στο console του τυχαίου αριθμού (βοηθητικό)
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>> 
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */

    if ((e.code === "Enter" || e.code === "NumpadEnter") && !newGuess.hasAttribute("readonly")) {
    checkGuess(); /* Καλείται μόνο αν ο χρήστης πατήσει το πληκτρο Enter ή το Enter του Numpad και εφόσον το text box ΔΕΝ έχει την ιδιότητα "readonly"
                     που προστίθεται μόνο σε περίπτωση νίκης ή ήττας. ('Ετσι ώστε να μην καλείται η checkGuess() με το πάτημα των πλήκτρων Enter
                     όταν έχει χάσει ή έχει κερδίσει.) */
    }
}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */

    newGuess.focus(); // Όταν πατιέται το button "Ελεγχος" να είναι έτοιμο το text box να δεχτεί τιμές (χωρίς να κλικαριστεί πριν με το ποντίκι)
    let result = processGuess(newGuess.value); /* Κλήση της processGuess() με παράμετρο το text που έδωσε ο χρήστης και εκχώρηση της αυτού που 
                                                  επιστρέφεται στην μεταβλητή result */
    if (result === "win" || result === "lost") { // Έλεγχος αποτελέσματος που επιστρέφει η processGuess()
        checkButton.style.visibility = "hidden"; // Σε περίπτωση νίκης ή ήττας (και μόνο), απόκρυψη του button "Έλεγχος"
        restartButton.style.visibility = "visible"; // και εμφάνιση του button "Παίξε ξανά"
    }
}

function processGuess(newValue){
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */

    let userGuess = parseInt(newValue); /* Κλήση της parseInt() με παράμετρο το String που έδωσε ο χρήστης για να επιστρέψει τον αριθμό που
                                           συμβολίζει και εκχώρησή του στην μεταβλητή userGuess. */
    newGuess.value = ""; // Καθαρισμός του text box απο την τιμή του χρήστη (για να είναι κενό ώστε να δεχτεί την επόμενη).
    if (isNaN(userGuess)) { // Έλεγχος αν είναι τελικά αριθμός ή String που αναπαριστά αριθμό η τιμή που έδωσε ο χρήστης.
        message.textContent = "Δώσε αριθμό!"; // Αν όχι, εμφάνιση αντίστοιχου μηνύματος με την εκχώρησή του στο textContent του αντίστοιχου div element της html.
        message.style.backgroundColor = "var(--msg-wrong-color)"; // Ορισμός κατάλληλου χρώματος υποβάθρου του μηνύματος.
    } else if (userGuess>=1 && userGuess<=100){ // Αν είναι αριθμος:
        if (previousGuesses.indexOf(userGuess)=== -1) {
            triesCounter += 1; // Αυξάνει τον (global) μετρητή προσπαθειών κατά 1.
            previousGuesses.push(userGuess); // Προσθήκη στο τέλος του array του αριθμού που έδωσε ο χρήστης.
            lowHigh.textContent = "Προηγούμενες προσπάθειες: " + previousGuesses.join(" "); // Εμφάνιση του αντίστοιχου μηνύματος με τις προσπάθειες
                                                        // του χρήστη χωρισμένες με κενά, εκχωρώντας το στο textContent του αντίστοιχου div της html.
            if (triesCounter <= 10) { // Έλεγχος αν οι προσπάθειες είναι μέχρι και 10 (Διαφορετικά δεν επιστρέφει τίποτα). Αν είναι μέχρι και 10:
                if (userGuess === theGuess) { // Aν ο αριθμός που έδωσε ο χρήστης είναι ίσος με αυτόν που βρήκε η newRandom():
                    message.textContent = "Μπράβο το βρήκες!"; // Εμφάνιση του κατάλληλου μηνύματος.
                    message.style.backgroundColor = "var(--msg-win-color)"; // Με το κατάλληλο χρώμα.
                    newGuess.setAttribute("readonly", ""); /* Προσθήκη της ιδιότητας readonly με τιμή κενή στο text box, ώστε να μην μπορεί ο χρήστης να εκχωρήσει
                                                          τιμή εάν κλικάρει με το ποντίκι, αφού θα έχει βρει τον αριθμό και το παιχνίδι θα έχει τελειώσει. */
                    return "win"; // Επιστροφή της αντίστοιχής τιμής.
                } else if (triesCounter === 10) { // Αλλιώς, αν είναι η 10η προσπάθεια χωρίς να έχει βρει τη σωστή λύση (αλλιώς θα είχε κερδίσει απο τον απο πάνω έλεγχο)
                    message.textContent = "Τέλος παιχνιδιού, έχασες!"; // Εμφάνιση του κατάλληλου μηνύματος.
                    message.style.backgroundColor = "var(--msg-wrong-color)"; // Με το κατάλληλο χρώμα.
                    newGuess.setAttribute("readonly", ""); // Προσθήκη της ιδιότητας readonly με τιμή κενή στο text box, ώστε να μην μπορεί ο χρήστης να εκχωρήσει
                                                       // τιμή εάν κλικάρει με το ποντίκι, αφού θα έχει χάσει.
                    return "lost"; // Επιστροφή της αντίστοιχής τιμής.
                } else if (userGuess > theGuess) { // Διαφορετικά, αν η τιμή του χρήστη είναι μεγαλύτερη απο αυτήν της newRandom().
                    message.textContent = "Λάθος το ξεπέρασες"; // Εμφάνιση του κατάλληλου μηνύματος.
                    message.style.backgroundColor = "var(--msg-wrong-color)"; // Με το κατάλληλο χρώμα.
                } else { // Διαφορετικά, αν η τιμή του χρήστη είναι μικρότερη απο αυτήν της newRandom().
                    message.textContent = "Λάθος είσαι πιο χαμηλά"; // Εμφάνιση του κατάλληλου μηνύματος.
                    message.style.backgroundColor = "var(--msg-wrong-color)"; // Με το κατάλληλο χρώμα.
                }
            }
        } else {
            message.textContent = "Δίνεις αριθμό που έχεις δώσει ήδη!"; // Αν όχι, εμφάνιση αντίστοιχου μηνύματος με την εκχώρησή του στο textContent του αντίστοιχου div element της html.
            message.style.backgroundColor = "var(--msg-wrong-color)"; // Ορισμός κατάλληλου χρώματος υποβάθρου του μηνύματος.
        }
    } else {
        message.textContent = "Δώσε αριθμό μεταξύ 1 και 100."; // Αν όχι, εμφάνιση αντίστοιχου μηνύματος με την εκχώρησή του στο textContent του αντίστοιχου div element της html.
        message.style.backgroundColor = "var(--msg-wrong-color)"; // Ορισμός κατάλληλου χρώματος υποβάθρου του μηνύματος.
    }
    
}

function restart(){
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο 
'restart' και επανεκινεί τη διαδικασία */

    restartButton.style.visibility = "hidden"; // Απόκρυψη του κουμπιού "Παίξε ξανά".
    lowHigh.textContent = ""; // Επαναφορά της τιμής σε κενό του textcontent του αντίστοιχου div που εμφανίζει τις προηγούμενες προσπάθειες
    message.textContent = ""; // Ομοίως και για το αντίστοιχο μήνυμα που εμφανίζεται κάθε φορά, ώστε να μην εμφανίζεται ουτε αυτό.
    newRandom(); // Κλήση εκ νέου της newRandom() για να βρει νέο ακέραιο μεταξύ 1 και 100.
    previousGuesses = []; // Επανεκχώρηση στην previousGuesses νέου κενου array.
    triesCounter = 0; // Μηδενισμός του μετρητή προσπαθειών, εκχωρώντας του την τιμή 0.
    checkButton.style.visibility = "visible"; // Επανεμφάνιση του button "Έλεγχος"
    newGuess.removeAttribute("readonly"); // Κατάργηση της ιδιότητας readonly απο το text box για μπορεί να κλικαριστεί με το ποντικί και να εκχωρηθούν τιμές.
    newGuess.focus(); // Για να είναι έτοιμο το text box να δεχτεί τιμές (χωρίς να κλικαριστεί πρώτα με το ποντίκι)
}
