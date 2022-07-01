(function () {

        var afficherOnglet = function (a, ainmations) {

            if (ainmations === undefined) {
                ainmations = true;
            }

            var div = a.parentNode.parentNode.parentNode;
            var li = a.parentNode;
            var activeTab = div.querySelector('.tab-content.active'); //contenu actif
            var aAfficher = div.querySelector(a.getAttribute('href')); //contenu à afficher

            if (li.classList.contains('active')) {
                return false;
            }

            //On RETIRE la class active de l'onglet actif
            div.querySelector('.tabs .active').classList.remove('active');
            //J'ajoute la class active à l'onglet actuel
            li.classList.add('active');

            //On RETIRE la class active du contenu actif
            //div.querySelector('.tab-content.active').classList.remove('active');

            //j'ajoute la class active sur le contenu correspondant à mon clique
            //div.querySelector(a.getAttribute('href')).classList.add('active');

            if (ainmations) {
                activeTab.classList.add('fade');
                activeTab.classList.remove('in');

                var transitionend = function () {
                    this.classList.remove('fade');
                    this.classList.remove('active');
                    aAfficher.classList.add('active');
                    aAfficher.offsetWidth;
                    aAfficher.classList.add('fade');
                    aAfficher.offsetWidth;
                    aAfficher.classList.add('in');
                    activeTab.removeEventListener('transitionend', transitionend);
                    activeTab.removeEventListener('webkitTransitionEnd', transitionend);
                    activeTab.removeEventListener('oTransitionEnd', transitionend);

                };
                activeTab.addEventListener('transitionend', transitionend);
                activeTab.addEventListener('webkitTransitionEnd', transitionend);
                activeTab.addEventListener('oTransitionEnd', transitionend);

            } else {
                aAfficher.classList.add('active');
                activeTab.classList.remove('active');
            }

            // On ajoute la classe fadr sur l'élement actif
            // à la fin de l'ainmation
            //  on retire la classe fade et active
            //  on ajoute la classe fade et active à l'élément à afficher
            //  on ajoute la classe in
        }

        var tabs = document.querySelectorAll('.tabs a');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function (e) {
                afficherOnglet(this, true)
            })
        }

        /*
        JE RECUPERER Le hash
        AJOUTER LA CLASS ACTIVE SUR LE LIEN href="hash"
        RETIRER LA CLASS ACTIVE SUR les autres onglets
        Afficher / Masquer les contenus correspondants
        */

        var hashChange = function (e) {
            var a = document.querySelector('a[href="' + hash + '"]');
            if (a !== nul && !a.classList.contains('active')) {
                afficherOnglet(a, e !== undefined);
            }
        }

        window.addEventListener('hashchange', hashChange);
        hashChange();

})();