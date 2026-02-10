/* ============================================ 
   MOBILE MENU TOGGLE
   ============================================ */

// Funkcija koja upravlja mobilnim menijem
function initMobileMenu() {

    // Dohvata dugme za mobilni meni
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    // Dohvata navigacioni meni koji se prikazuje / skriva
    const navMenu = document.getElementById('navMenu');

    // Provjera da li elementi postoje na stranici
    // Ako ne postoje (npr. na nekoj drugoj stranici),
    // funkcija se prekida i ništa se ne izvršava
    if (!mobileMenuToggle || !navMenu) {
        return;
    }

    // Event listener koji osluškuje klik na dugme
    mobileMenuToggle.addEventListener('click', function() {

        // Dodaje ili uklanja klasu "active" na dugme
        // (koristi se za animaciju ikone)
        mobileMenuToggle.classList.toggle('active');

        // Dodaje ili uklanja klasu "active" na meni
        // (prikazuje ili skriva navigaciju)
        navMenu.classList.toggle('active');
    });

    // Dohvata sve linkove unutar navigacije
    const navLinks = navMenu.querySelectorAll('.nav-link');

    // Za svaki link u meniju
    navLinks.forEach(link => {

        // Dodaje event listener na klik
        link.addEventListener('click', function() {

            // Kada se klikne na link,
            // uklanja se "active" klasa sa dugmeta
            mobileMenuToggle.classList.remove('active');

            // Također se zatvara navigacioni meni
            navMenu.classList.remove('active');
        });
    });

    // Event listener koji prati klik bilo gdje na stranici
    document.addEventListener('click', function(event) {

        // Provjerava da li je klik unutar navigacije
        const isClickInsideNav = navMenu.contains(event.target);

        // Provjerava da li je klik na dugme
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        // Ako klik NIJE na meni, NIJE na dugme,
        // i meni je trenutno otvoren
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {

            // Zatvara mobilni meni
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   MENU FILTER FUNCTIONALITY
   ============================================ */

// Funkcija za filtriranje palačinki po kategorijama
function initMenuFilter() {

    // Dohvata sva dugmad za filtriranje (npr. Chocolate, Fruit, All)
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Dohvata sve kartice menija (palačinke)
    const menuCards = document.querySelectorAll('.menu-card');

    // Ako dugmad ili kartice ne postoje (npr. nismo na menu stranici),
    // funkcija se prekida
    if (filterButtons.length === 0 || menuCards.length === 0) {
        return;
    }

    // Za svako dugme za filtriranje
    filterButtons.forEach(button => {

        // Dodaje event listener za klik
        button.addEventListener('click', function() {

            // Uklanja "active" klasu sa svih filter dugmadi
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Dodaje "active" klasu samo na kliknuto dugme
            this.classList.add('active');

            // Uzimanje vrijednosti iz data-filter atributa
            // (npr. "chocolate", "fruit", "all")
            const filterValue = this.getAttribute('data-filter');

            // Prolazak kroz sve kartice menija
            menuCards.forEach(card => {

                // Uzimanje kategorije kartice iz data-category atributa
                const cardCategory = card.getAttribute('data-category');

                // Ako je odabrano "all" ili se kategorija poklapa
                if (filterValue === 'all' || cardCategory === filterValue) {

                    // Uklanja klasu "hidden" (kartica se prikazuje)
                    card.classList.remove('hidden');

                    // Postavlja opacity na 0 radi animacije
                    card.style.opacity = '0';

                    // Kratko kašnjenje za smooth fade-in efekt
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.3s ease';
                    }, 10);

                } else {
                    // Ako se kategorija ne poklapa,
                    // kartica se skriva
                    card.classList.add('hidden');
                }
            });
        });
    });
}
