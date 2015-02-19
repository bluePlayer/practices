/**
 * Sodrzhi podmoduli so klasi i metodi koi se reshenia na zadachite od slednava kniga: Zbirka Algoritmi i Programi napishana od Gjogi Jovanchevski, 
 * Biljana Stojchevska i Nevena Ackovska, Gocmar 2005 godina. Se e napishano vo JavaSkript i klasite/ funkciite se prilagodeni na Makedonski jazik.
 * @module TurboGjorgi
 * @class TurboGjorgi
 * @main TurboGjorgi
 * @author Vladimir Z. aka bluePlayer. https://github.com/bluePlayer/practices
 */
window.TurboGjorgi = window.TurboGjorgi || (function (windowDocumentObject) {'use strict';

    var
        /**
         * documentObject e drugo ime za window.document objektot koj se prakja kako parametar na funkcijata zadolzhena za sozdavanje na
         * TurboGjorgi objektot.
         * @property documentObject
         * @type Object
         * @default window.document
         */
        documentObject = windowDocumentObject,

        /**
         * Sodrzhi aplikaciska  konfiguracija. 
         * @property config
         * @type Object
         * @default null
         */
        config = null,

        /**
         * parent e drugo ime za tekovniot objekt i gradba na TurboGjorgi ili this.
         * @property parent
         * @type Object
         * @default null
         */
        parent = null,

        /**
         * initApp() e funkcija koja se koristi za inicijaliziranje na celata aplikacija. Se povikuva koga kje se vchita celoto drvo na
         * aplikacijata. Taa e rekurzivna i go posetuva sekoj podobjekt od drvoto na nekojObjekt. Ako tekovniot objekt sodrzhi init() funkcija vo sebe, 
         * taa kje se povika i pritoa se prakja parametarot config. 
         * @method initApp
         * @param {Object} nekojObjekt
         * @param {Object} config
         */
        initApp = function (nekojObjekt, config) {
            var i;
            for (i in nekojObjekt) {
                if (nekojObjekt[i] !== null && typeof nekojObjekt[i] === 'object') {
                    if (nekojObjekt[i].hasOwnProperty('init')) {
                        nekojObjekt[i].init(config);
                    }
                    initApp(nekojObjekt[i]);
                }
            }
        },

        /**
         * Konstanta
         * @property IME_APLIKACIJA
         * @type String
         * @default "TurboGjorgi"
         * @final
         */
        IME_APLIKACIJA = "TurboGjorgi",

        /**
         * Konstanta
         * @property BROJOT_NE_E_PRIRODEN
         * @type String
         * @default "Vneseniot broj ne e priroden!"
         * @final
         */
        BROJOT_NE_E_PRIRODEN = "Vneseniot broj ne e priroden!",

        /**
         * Konstanta
         * @property BROJOT_NE_E_CEL
         * @type String
         * @default "Vneseniot broj ne e cel!"
         * @final
         */
        BROJOT_NE_E_CEL = "Vneseniot broj ne e cel!",

        /**
         * Konstanta
         * @property BROJOT_E_PAREN
         * @type String
         * @default "Brojot e paren!"
         * @final
         */
        BROJOT_E_PAREN = "Brojot e paren!",

        /**
         * Konstanta
         * @property BROJOT_NE_E_PAREN
         * @type String
         * @default "Brojot ne e paren!"
         * @final
         */
        BROJOT_NE_E_PAREN = "Brojot ne e paren!",

        /**
         * Konstanta
         * @property EDEN_OD_PARAMETRITE_NE_E_BROJ
         * @type String
         * @default "Eden od parametrite ne e od tip broj!"
         * @final
         */
        EDEN_OD_PARAMETRITE_NE_E_BROJ = "Eden od parametrite ne e od tip broj!",

        /**
         * Konstanta
         * @property DELENJE_SO_NULA
         * @type String
         * @default "Ne e dozvoleno delenje so nula!"
         * @final
         */
        DELENJE_SO_NULA = "Ne e dozvoleno delenje so nula!",

        /**
         * Konstanta
         * @property BROJOT_NE_E_TRICIFREN
         * @type String
         * @default "Brojot ne e tricifren!"
         * @final
         */
        BROJOT_NE_E_TRICIFREN = "Brojot ne e tricifren!",

        /**
         * Konstanta
         * @property EDEN_OD_BROEVITE_NE_E_TRICIFREN
         * @type String
         * @default "Eden od broevite ne e tricifren!"
         * @final
         */
        EDEN_OD_BROEVITE_NE_E_TRICIFREN = "Eden od broevite ne e tricifren!",

        /**
         * Konstanta
         * @property BROJOT_NA_PARAMETRI_E_NULA
         * @type String
         * @default "Brojot na prametri e nula!"
         * @final
         */
        BROJOT_NA_PARAMETRI_E_NULA = "Brojot na prametri e nula!",

        /**
         * Konstanta
         * @property NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ
         * @type String
         * @default "Ne se vadi koren od negativen broj!"
         * @final
         */
        NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ = "Ne se vadi koren od negativen broj!",

        /**
         * Konstanta
         * @property MORA_DA_IMA_BAREM_DVA_PARAMETRI
         * @type String
         * @default "Mora da ima barem dva parametri!"
         * @final
         */
        MORA_DA_IMA_BAREM_DVA_PARAMETRI = "Mora da ima barem dva parametri!",

        /**
         * Konstanta
         * @property PARAMETAROT_NE_E_FUNKCIJA
         * @type String
         * @default "Parametarot ne e funkcija!"
         * @final
         */
        PARAMETAROT_NE_E_FUNKCIJA = "Parametarot ne e funkcija!",

        /**
         * Konstanta
         * @property BROJOT_E_POMAL_OD_NULA
         * @type String
         * @default "Brojot e pomal od nula!"
         * @final
         */
        BROJOT_E_POMAL_OD_NULA = "Brojot e pomal od nula!",

        /**
         * Konstanta
         * @property BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA
         * @type String
         * @default "Brojot e pomal ili ednakov na nula!"
         * @final
         */
        BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA = "Brojot e pomal ili ednakov na nula!",

        /**
         * Konstanta
         * @property NE_KUCNAVTE_BROEVI
         * @type String
         * @default "Ne kucnavte ni eden broj!"
         * @final
         */
        NE_KUCNAVTE_BROEVI = "Ne kucnavte ni eden broj!",

        /**
         * Konstanta
         * @property TREBA_DA_KUCNETE_BAREM_DVE_BUKVI
         * @type String
         * @default "Treba da kucnete barem dve bukvi!"
         * @final
         */
        TREBA_DA_KUCNETE_BAREM_DVE_BUKVI = "Treba da kucnete barem dve bukvi!",

        /**
         * Konstanta
         * @property MORA_DA_KUCNETE_BUKVA_ILI_BROJ
         * @type String
         * @default "Mora da kucnete bukva ili broj!"
         * @final
         */
        MORA_DA_KUCNETE_BUKVA_ILI_BROJ = "Mora da kucnete bukva ili broj!",

        /**
         * Konstanta
         * @property EDEN_OD_PARAM_NE_E_BOOL
         * @type String
         * @default "Eden od parametrite ne e od tip Boolean!"
         * @final
         */
        EDEN_OD_PARAM_NE_E_BOOL = "Eden od parametrite ne e od tip Boolean!",

        /**
         * Konstanta
         * @property BROJOT_E_PROST
         * @type String
         * @default "Brojot e prost!"
         * @final
         */
        BROJOT_E_PROST = "Brojot e prost!",

        /**
         * Konstanta
         * @property BROJOT_NE_E_PROST
         * @type String
         * @default "Brojot ne e prost!"
         * @final
         */
        BROJOT_NE_E_PROST = "Brojot ne e prost!";

    return {

        /**
         * Sodrzhi funkcii-konstanti so koi se vrakja vrednost na dadena konstanta navedena pogore. JavaSkript nema konstanti
         * pa zatoa se koristat funkcii za da se zachuva vrednosta na dadena promenliva. Isto taka se koristi funkciski blok(scope)
         * bidejkji promenliva definirana vo funkcija so var e nedostapna nadvor od nea. 
         * @class Konstanti 
         */
        Konstanti: {

            /**
             * Funkcija-konstanta, vrakja ime na aplikacijata.
             * @method IME_APLIKACIJA
             * @return {String}
             */
            IME_APLIKACIJA: function () {
                return IME_APLIKACIJA;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka vneseniot broj ne e priroden.
             * @method BROJOT_NE_E_PRIRODEN
             * @return {String}
             */
            BROJOT_NE_E_PRIRODEN: function () {
                return BROJOT_NE_E_PRIRODEN;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka vneseniot broj ne e cel.
             * @method BROJOT_NE_E_CEL
             * @return {String}
             */
            BROJOT_NE_E_CEL: function () {
                return BROJOT_NE_E_CEL;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot e paren.
             * @method BROJOT_E_PAREN
             * @return {String}
             */
            BROJOT_E_PAREN: function () {
                return BROJOT_E_PAREN;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot ne e paren.
             * @method BROJOT_NE_E_PAREN
             * @return {String}
             */
            BROJOT_NE_E_PAREN: function () {
                return BROJOT_NE_E_PAREN;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot prost.
             * @method BROJOT_E_PROST
             * @return {String}
             */
            BROJOT_E_PROST: function () {
                return BROJOT_E_PROST;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot ne e prost.
             * @method BROJOT_NE_E_PROST
             * @return {String}
             */
            BROJOT_NE_E_PROST: function () {
                return BROJOT_NE_E_PROST;
            },

            /**
             * Funkcija-konstanta, vrakja poraka za zabraneto delenje so nula.
             * @method DELENJE_SO_NULA
             * @return {String}
             */
            DELENJE_SO_NULA: function () {
                return DELENJE_SO_NULA;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot ne e tricifren.
             * @method BROJOT_NE_E_TRICIFREN
             * @return {String}
             */
            BROJOT_NE_E_TRICIFREN: function () {
                return BROJOT_NE_E_TRICIFREN;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka eden od broevite ne e tricifren.
             * @method EDEN_OD_BROEVITE_NE_E_TRICIFREN
             * @return {String}
             */
            EDEN_OD_BROEVITE_NE_E_TRICIFREN: function () {
                return EDEN_OD_BROEVITE_NE_E_TRICIFREN;
            },

            /**
             * Funkcija-konstanta, vrakja poraka ne se vadi koren od negativen broj.
             * @method NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ
             * @return {String}
             */
            NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ: function () {
                return NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot e pomal od nula.
             * @method BROJOT_E_POMAL_OD_NULA
             * @return {String}
             */
            BROJOT_E_POMAL_OD_NULA: function () {
                return BROJOT_E_POMAL_OD_NULA;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka brojot e pomal ili ednakov na nula.
             * @method BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA
             * @return {String}
             */
            BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA: function () {
                return BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka ne e kucnat ni eden broj od tastatura.
             * @method NE_KUCNAVTE_BROEVI
             * @return {String}
             */
            NE_KUCNAVTE_BROEVI: function () {
                return NE_KUCNAVTE_BROEVI;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka treba da se kucnat barem dve bukvi od tastatura. 
             * @method TREBA_DA_KUCNETE_BAREM_DVE_BUKVI
             * @return {String}
             */
            TREBA_DA_KUCNETE_BAREM_DVE_BUKVI: function () {
                return TREBA_DA_KUCNETE_BAREM_DVE_BUKVI;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka mora da se kucne bukva ili broj od tastatura. 
             * @method MORA_DA_KUCNETE_BUKVA_ILI_BROJ
             * @return {String}
             */
            MORA_DA_KUCNETE_BUKVA_ILI_BROJ: function () {
                return MORA_DA_KUCNETE_BUKVA_ILI_BROJ;
            },

            /**
             * Funkcija-konstanta, vrakja poraka deka eden od parametrite ne e od tip Boolean.
             * @method EDEN_OD_PARAM_NE_E_BOOL
             * @return {String}
             */
            EDEN_OD_PARAM_NE_E_BOOL: function () {
                return EDEN_OD_PARAM_NE_E_BOOL;
            }
        },

        /**
         * @class TurboGjorgi
         */

        /**
         * napraviDrvo() pravi drvo od objekti i podobjekti so naveduvanje na string razdvoen so tochki.
         * @example
         *      napraviDrvo('moj.nov.podobjekt'); Kje napravi objekt 'moj' so podobjekt 'nov' koj sodrzhi pod objekt 'podobjekt'
         * @method napraviDrvo
         * @param {String} drvoString String koj go opishuva drvoto shto treba da se napravi razdvoeno so tochi. Primer: 'moj.nov.podobjekt'
         * @param {Object} novObjekt Ovoj objekt gi sodrzhi site polinja i metodi goi treba da postojat vo objektot moj.nov.podobjekt
         * @chainable
         * @return {Object} Noviot objekt 'podobjekt' koj se sodrzhi sodrzhi vo 'moj.nov' objektot.
         */
        napraviDrvo: function (drvoString, novObjekt) {
            var delovi = drvoString.split('.'),
                pomObjekt = {},
                turboGjorgi = this,
                i = 0,
                pole = {};

            if (delovi[0] === turboGjorgi.Konstanti.IME_APLIKACIJA()) {
                delovi = delovi.slice(1);
            }

            for (i = 0; i < delovi.length; i += 1) {
                if (turboGjorgi[delovi[i]] === undefined) {
                    for (pole in novObjekt) {
                        if (novObjekt.hasOwnProperty(pole)) {
                            pomObjekt[pole] = novObjekt[pole];
                        }
                    }
                    turboGjorgi[delovi[i]] = pomObjekt;
                }
                turboGjorgi = turboGjorgi[delovi[i]];
            }
            return turboGjorgi;
        },

        /**
         * Sekogash vrakja dekaden oblik na prateniot parametar. Za istata namena mozhe da se koristi parseFloat(param, 10), no vtoriot 
         * parametar mozhe da bide zaboraven pa zatoa e napravena ovaa funkcija.
         * @method parsirajDrobenBroj
         * @param {Number} param
         * @return {Number}
         */
        parsirajDrobenBroj: function (param) {
            return parseFloat(param, 10);
        },

        /**
         * Sekogash vrakja dekaden cel oblik na prateniot parametar. Za istata namena mozhe da se koristi parseInt(param, 10), no vtoriot 
         * parametar mozhe da bide zaboraven pa zatoa e napravena ovaa funkcija.
         * @method parsirajCelBroj
         * @param {Number} param
         * @return {Number}
         */
        parsirajCelBroj: function (param) {
            return parseInt(param, 10);
        },

        /**
         * eParenBroj(broj) proveruva dali broj e cel broj i ako e togash proveruva dali e paren. Se vrakja soodvetno Boolean vrednost. 
         * @method eParenBroj
         * @param {Number} broj
         * @return {Boolean}
         */
        eParenBroj: function (broj) {
            return parent.funkcijaOdPovekjeBroevi(function () {
                var ishod = false;
                if (parent.eCelBroj(broj)) {
                    if (broj % 2 === 0) {
                        ishod = true;
                    } else {
                        ishod = false;
                    }
                } else {
                    ishod = BROJOT_NE_E_CEL;
                }
                return ishod;
            }, broj);
        },

        /**
         * eProstBroj1Do10() funkcijata proveruva dali daden broj od 1 do 10 e prost ili ne prost broj i soodvetno vrakja Boolean vrednost.
         * @method eProstBroj1Do10
         * @param {Number} broj
         * @return {Boolean}
         */
        eProstBroj1Do10: function (broj) {
            return parent.funkcijaOdPovekjeBroevi(function () {
                var ishod = '';
                switch (broj) {
                case 1:
                    ishod = true;
                    break;
                case 2:
                    ishod = true;
                    break;
                case 3:
                    ishod = true;
                    break;
                case 4:
                    ishod = false;
                    break;
                case 5:
                    ishod = true;
                    break;
                case 6:
                    ishod = false;
                    break;
                case 7:
                    ishod = true;
                    break;
                case 8:
                    ishod = false;
                    break;
                case 9:
                    ishod = false;
                    break;
                case 10:
                    ishod = false;
                    break;
                }
                return ishod;
            }, broj);
        },

        /**
         * Proveruva dali parametarot e cel broj.
         * @method eCelBroj
         * @param {Number} n
         * @return {Boolean}
         */
        eCelBroj: function (n) {
            return parent.funkcijaOdPovekjeBroevi(function () {
                var ishod = false;
                if (n % 1 === 0) {
                    ishod = true;
                }
                return ishod;
            }, n);
        },

        /**
         * Proveruva dali parametarot e priroden broj. Se sostoi od dve proverki: prvo se proba dali n e pogolem od nula i ako e 
         * togash se proveruva dali e cel broj. 
         * @method ePrirodenBroj
         * @param {Number} n
         * @return {Boolean}
         */
        ePrirodenBroj: function (n) {
            return parent.funkcijaOdPovekjeBroevi(function () {
                var ishod = false;
                if (n >= 0 && parent.eCelBroj(n)) {
                    ishod = true;
                }
                return ishod;
            }, n);
        },

        /**
         * Proveruva dali parametarot e od tip broj. Se koristi funkcija parseFloat() shto vrakja NaN ako prviot parametar ne e od tip
         * broj. Potoa se koristi funkcija isNaN() za da se potvrdi dali e ili ne e broj.
         * @method eBroj
         * @param {Number} param
         * @return {Boolean}
         */
        eBroj: function (param) {
            var ishod = false;
            if (isNaN(parent.parsirajDrobenBroj(param))) {
                ishod = false;
            } else {
                ishod = true;
            }
            return ishod;
        },

        /**
         * Proveruva dali parametarot e od tip niza. Vo JavaSkript sekoja niza e voedno i objekt pa e malku teshko da se razlikuva.
         * Zatoa se koristat povekje proverki, prvo dali parametarot e objekt, potoa dali ima pole length i dali e od tip broj.
         * Sledat ushte dve proverki, dali poleto splice e funkcija i dali length ne e nabroivo odnosno dali ne mozhe da se pristapi do
         * nego vo for(var myProp in myObject) lupa.
         * @method eNiza
         * @param {Array} param
         * @return {Boolean}
         */
        eNiza: function (niza) {
            return niza &&
                typeof niza === 'object' &&
                typeof niza.length === 'number' &&
                typeof niza.splice === 'function' &&
                !(niza.propertyIsEnumerable('length'));
        },

        /**
         * Proveruva dali dadenata niza go sodrzhi dadeniot element i vrakja soodveten odgovor so true ili false.
         * @method nizaSodrzhi
         * @param {Array} niza
         * @param {Object} element
         * @return {Boolean}
         */
        nizaSodrzhi: function (niza, element) {
            var i = 0,
                sodrzhi = false;
            for (i = 0; i < niza.length; i += 0) {
                if (niza[i] === element) {
                    sodrzhi = true;
                }
            }
            return sodrzhi;
        },

        /**
         * Proveruva dali parametarot e tricifren broj, odnosno izmegju 99 i 1000. Ovaa funkcija ne proveruva tip, zatoa treba da se 
         * koristat drugi funkcii ili kodovi.
         * @method eTricifrenBroj
         * @param {Number} param
         * @return {Boolean}
         */
        eTricifrenBroj: function (param) {
            var ishod = false;
            if (param > 99 && param < 1000) {
                ishod = true;
            }
            return ishod;
        },

         /**
         * Potrebno e da se pratat najmalce dva prametri od koi prviot mora da bide funkcija, a vtoriot kje bide od tip broj. Slednite parametri
         * mora da bidat od tip broj. Ovaa funkcija e vazhna za proverka na parametrite dali se borevi i ako ovoj uslov e tochen, na dadenite broevi
         * se izhvirshuva funkcijata koja shto e pratena kako prv parametar. Ovaa funkcija e napravena so cel da se zashtedi na povtoruvanje na istite proverki
         * vo povekje funkcii koi imaat slichna namena. Na primer zoshto da pishuvame proverka vo funkcija kub(n) i istata proverka vo funkcija kvadrat(n).
         * Na nekoj nachin ovde se koristi Dekorator shablonot, ovaa funkcija ja dekorirame(ukrasuvame) so funkcijata pratena kako prv parametar.
         * @example
         *      funkcijaOdPovekjeBroevi(zbirNaSredniCifri(), a, b); Ako a i b se broevi, togash kje se izhvrshi zbirNaSredniCifri() na a i b.
         * @method funkcijaOdPovekjeBroevi
         * @param {Function} presmetajFunkcija
         * @param {Number} param1
         * @return {Object}
         */
        funkcijaOdPovekjeBroevi: function (presmetajFunkcija) {
            var i = 1,
                ishod = null,
                siteSeBroevi = true,
                parametri = [],
                funkcija = null;

            if (arguments.length !== 0) {
                funkcija = presmetajFunkcija;

                if (arguments.length < 2) {
                    ishod = MORA_DA_IMA_BAREM_DVA_PARAMETRI;
                } else {

                    if (typeof funkcija !== 'function') {
                        ishod = PARAMETAROT_NE_E_FUNKCIJA;
                    } else {
                        for (i = 1; i < arguments.length; i += 1) {
                            if (!this.eBroj(arguments[i])) {
                                siteSeBroevi = false;
                            } else {
                                parametri.push(arguments[i]);
                            }
                        }

                        if (siteSeBroevi) {
                            ishod = funkcija.apply(presmetajFunkcija, parametri);
                        } else {
                            ishod = EDEN_OD_PARAMETRITE_NE_E_BROJ;
                        }
                    }
                }
            } else {
                ishod = BROJOT_NA_PARAMETRI_E_NULA;
            }
            return ishod;
        },

        /**
         * init() funkcijata sluzhi za da se inicijaliziraat nekoi vnatreshni polinja, i se izhvrshuva otkako kje se vchita sodrzhinata na DOM drvoto, 
         * odnosno so nastanot: "DOMContentLoaded". Vo celata aplikacija se koristi poleto parent koe shto e postaveno na vrednost this, shto vo ovoj 
         * sluchaj e window.TurboGjogi objektot.
         * @event init
         * @param {Object} configObject
         */
        init: function (configObject) {
            config = configObject;
            parent = this;
            initApp(parent, config);
        }
    };
    }(window.document));

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';

    var turboGjorgi = window.TurboGjorgi,
        rks = turboGjorgi.KontrolniStrukturi.RedoslendaKontrolnaStruktura,
        iodm = turboGjorgi.KontrolniStrukturiZaIzbor.IzborOdDveMozhnosti,
        iodpm = turboGjorgi.KontrolniStrukturiZaIzbor.IzborOdPovekjeMozhnosti,
        config = {"event": event};

    turboGjorgi.init(config);
    window.document.addEventListener('keydown', rks.vnesiCelBrojSoKopchinja);
    window.document.addEventListener('keypress', iodpm.keypressNastan);

    console.log(rks.kvadrat(5.8));
    console.log(rks.kvadrat("zdravo"));
    console.log(rks.kub(5.8));
    console.log(rks.dolzhinaNaKruzhnica(5.8));
    console.log(rks.ploshtinaNaKruzhinca(5.8));
    console.log(rks.zbirOdDva(5.8, 3.4));
    console.log(rks.zbirOdDva("tekst", 3.4));
    console.log(rks.razlikaOdDva(5.8, 3.4));
    console.log(rks.proizvodOdDva(5.8, 3.4));
    console.log(rks.proizvodOdDva(5.8, "tekst"));
    console.log(rks.kolichnikOdDva(5.8, 3.4));
    console.log(rks.kolichnikOdDva(5.8, 0));
    console.log(rks.srednaCifraTricifrenBroj(578));
    console.log(rks.srednaCifraTricifrenBroj(12367));
    console.log(rks.zbirNaSredniCifri(234, 879));
    console.log(rks.zbirNaSredniCifri(2348, 879));
    console.log(rks.rastojanieDve3DTochki(3, 4, 5, 6, 7, 8));
    console.log(rks.rastojanieDve3DTochki(3, "tekst", 5, 6, 7, 8));
    console.log(rks.sistemRavenkiSoDveNepoznati(1, 2, 3, 4, 5, 6));
    console.log(rks.logichkiOperaciiOdAiB(true, false));
    console.log(rks.logichkiOperaciiOdAiB(false, false));
    console.log(iodm.triBrojaStraniNaTriagolnik(2, 3, 4));
    console.log(iodm.triBrojaStraniNaTriagolnik(1, 1, 4));
    console.log(iodm.prirodenBrojEParen(2));
    console.log(iodm.prirodenBrojEParen(3));
    console.log(iodm.prirodenBrojEParen(-2));
    console.log(iodm.prirodenBrojEParen(2.4));
    console.log(iodm.podrediPoGolemina(1, 2, 3));
    console.log(iodm.podrediPoGolemina(2, 1, 3));
    console.log(iodm.podrediPoGolemina(3, 1, 2));
    console.log(iodm.podrediPoGolemina(3, 2, 1));
    console.log(iodm.podrediPoGolemina(1, 3, 2));
    console.log(iodm.podrediPoGolemina(2, 3, 1));
    console.log(iodm.ravenkaAXPlusBEdnakvoNula(0, 4));
    console.log(iodm.ravenkaAXPlusBEdnakvoNula(3, 8));
    console.log(iodm.ravenkaAXPlusBEdnakvoNula(-5, 8));
    console.log(iodm.tricifrenBrojSumaKuboviNaCifri("zdravo"));
    console.log(iodm.tricifrenBrojSumaKuboviNaCifri(10000));
    console.log(iodm.tricifrenBrojSumaKuboviNaCifri(444.5));
    console.log(iodm.tricifrenBrojSumaKuboviNaCifri(648));
    console.log(iodm.pronajdiTricifrenBrojEdnakovZbirKubovi());
    console.log(iodpm.vidNaAgol(34));
    console.log(iodpm.vidNaAgol(90));
    console.log(iodpm.vidNaAgol(178));
    console.log(iodpm.vidNaAgol(180));
    console.log(iodpm.vidNaAgol(345));
    console.log(iodpm.vidNaAgol(360));
    console.log(iodpm.svojstvaBroevi1Do10());
    console.log(iodpm.brojDenoviVoMesec(2, 10));
    console.log(iodpm.brojDenoviVoMesec(13));
    console.log(iodpm.brojDenoviVoMesec(19.9));
    });



