/**
 * Sodrzhi podmoduli so klasi i metodi koi se reshenia na zadachite od slednava kniga: Zbirka Algoritmi i Programi napishana od Gjogi Jovanchevski, 
 * Biljana Stojchevska i Nevena Ackovska, Gocmar 2005 godina. Se e napishano vo JavaSkript i klasite/ funkciite se prilagodeni na Makedonski jazik.
 * @module TurboGjorgi
 * @class TurboGjorgi
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
         * initApp() e nastan-funkcija koja se koristi za inicijaliziranje na celata aplikacija. Se povikuva koga kje se vchita celoto drvo na
         * aplikacijata. Taa e rekurzivna i go posetuva sekoj podobjekt od drvoto na nekojObjekt. Ako tekovniot objekt sodrzhi init() funkcija vo sebe, 
         * taa kje se povika i pritoa se prakja parametarot config. 
         * @event initApp
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
        EDEN_OD_PARAM_NE_E_BOOL = "Eden od parametrite ne e od tip Boolean!";

    return {

        /**
         * Sodrzhi funkcii-konstanti so koi se vrakja vrednost na dadena konstanta navedena pogore. JavaSkript nema konstanti
         * pa zatoa se koristat funkcii za da se zachuva vrednosta na dadena promenliva. Isto taka se koristi funkciski blok(scope)
         * bidejkji promenliva definirana vo funkcija so var e nedostapna nadvor od nea. 
         * @class konstanti 
         */
        konstanti: {

            /**
             * Funkcija-konstanta, vrakja ime na aplikacijata.
             * @method IME_APLIKACIJA
             * @return {String}
             */
            IME_APLIKACIJA: function () {
                return IME_APLIKACIJA;
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
         * Creates objects and subobjects by using just a string in dotted notation. 
         * Example namespace('my.new.namespace'); will create object 'my' that contains subobject 'new', which contains 
         * subobject 'namespace'. 
         * @class TurboGjorgi
         * @method namespace
         * @param {String} nsString String describing the namespace of objects separated by a dots. 
         * @param {Object} newObjectDefinition And object to initialize each of the newly created subobject. If you add a property with all caps 
         * it will consider it as a constant and therefore use Constants object to create new constant that cannot be changed using Firebug 
         * or other browser debugging interface. 
         * @return {Object} Returns the new object that represents the new namespace of objects and subobjects, defined by the dots in the string
         * argument.
         */
        namespace: function (nsString, newObjectDefinition) {
            var parts = nsString.split('.'),
                newObject = {},
                turboGjorgi = this,
                i = 0,
                property = {};

            if (parts[0] === turboGjorgi.konstanti.IME_APLIKACIJA()) {
                parts = parts.slice(1);
            }

            for (i = 0; i < parts.length; i += 1) {
                if (turboGjorgi[parts[i]] === undefined) {
                    for (property in newObjectDefinition) {
                        if (newObjectDefinition.hasOwnProperty(property)) {
                            newObject[property] = newObjectDefinition[property];
                        }
                    }
                    turboGjorgi[parts[i]] = newObject;
                }
                turboGjorgi = turboGjorgi[parts[i]];
            }
            return turboGjorgi;
        },

        /**
         * Sekogash vrakja dekaden oblik na prateniot parametar. Za istata namena mozhe da se koristi parseFloat(param, 10), no vtoriot 
         * parametar mozhe da bide zaboraven pa zatoa e napraven ovaa funkcija.
         * @method parsirajDrobenBroj
         * @param {Number} param
         * @return {Number}
         */
        parsirajDrobenBroj: function (param) {
            return parseFloat(param, 10);
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
         * Primer: funkcijaOdPovekjeBroevi(zbirNaSredniCifri(a, b), a, b); Ako a i b se broevi, togash kje se izhvrshi zbirNaSredniCifri na a i b.
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
         * @method init
         * @param {Object} configObject
         */
        init: function (configObject) {
            config = configObject;
            parent = this;
            initApp(parent, config);
        }
    };
    }(window.document));

/**
 * Sodrzhi klasi so metodi koi se reshenia na zadachite povrzani so glava 1, Kontrolni Strukturi.
 * @module KontrolniStrukturi
 * @submodule KontrolniStrukturi
 */
window.TurboGjorgi.namespace('KontrolniStrukturi', {});

/**
 * RedoslendaKontrolnaStruktura sodrzhi metodi koi se reshenia na zadachite povrzani so podglava 1.1 Redoslenda kontrolna struktura.
 * @class RedoslendaKontrolnaStruktura
 */
window.TurboGjorgi.namespace('KontrolniStrukturi.RedoslendaKontrolnaStruktura', (function () {'use strict';

    var
        /**
         * Sodrzhi aplikaciska  konfiguracija. 
         * @property config
         * @type Object
         * @default null
         */
        config = null,

        /**
         * turboGjorgi e drugo ime za tekovniot objekt window.TurboGjorgi. TurboGjogi klasata ima korisni funkcii kako, eNiza, eBroj itn...
         * @property turboGjorgi
         * @type Object
         * @default window.TurboGjorgi
         */
        turboGjorgi = window.TurboGjorgi,

        /**
         * parent e drugo ime za tekovniot objekt i gradba na TurboGjorgi ili this.
         * @property parent
         * @type Object
         * @default this
         */
        parent = null,

        /**
         * brojStr e string za pamtenje na vnesenite broevi od tastatura i nivno pretvarane potoa vo cel broj. Primer:
         * vneseni se broevi 4, 5, 6 edno po drugo od tastatura i potoa e pritisnato kopcheto Enter. brojStr = '456' koj potoa se 
         * pretvora vo broj 456 i se pravat soodvetni presmetki. Vidi napraviTasterOdgovorObjekt() i vnesiCelBrojSoKopchinja().
         * @property brojStr
         * @type String
         * @default ''
         */
        brojStr = '',

        /**
         * prvaBukva e pole za prvata vnesena bukva od tastatura. Se pamti dekadniot zapis na bukvata ili event.keyCode.
         * @property prvaBukva
         * @type Integer
         * @default null
         */
        prvaBukva = null,

        /**
         * vtoraBukva e pole za vtorata vnesena bukva od tastatura. Se pamti dekadniot zapis na bukvata ili event.keyCode.
         * @property vtoraBukva
         * @type Integer
         * @default null
         */
        vtoraBukva = null,

        /**
         * bukvaBrojach sluzhi kako flip-flop za vnes i pamtenje na dve posledovatelni bukvi od tastatura. Ako bukvaBrojach e 1 se zapishuva 
         * vo poleto prvaBukva i bukvaBrojach se zgolemuva za eden. Ako bukvaBrojach e 2 se zapishuva vo poleto vtoraBukva i bukvaBrojach 
         * se namaluva za eden.
         * @property bukvaBrojach
         * @type Integer
         * @default 1
         */
        bukvaBrojach = 1,

        /**
         * napraviTasterOdgovorObjekt() sozdava objekt koj gi sorzhi site potrebni podelementi za rabota so tastatura. Se pravi objekt so
         * slednava gradba: {ishod: {funkciiOdCelBroj: {}, funkciiOdBukvi: {}}, greshki: []}. funkciiOdCelBroj podobjektot sodrzhi: vrednost na x, 
         * sledbenik na x, prethodnik na x, x^2, sqrt(x), e^x, cos(x), ln(x). funkciiOdBukvi sodrzhi: poslednata bukva vnesena od tastarura, 
         * prethodnik na dadenata bukva, sledbenik na dadenata bukva i golemiot zapis na dadenata bukva. Isto taka sorzhi i kluch bukviRazlika shto
         * pretstavuva razlika na dekadnite zapisi na poslednite dve vneseni bukvi od tastatura. Podobjektot sodrzhi niza od greshki koi se napraveni
         * za vreme na povekje pritiskanja se dodeka ne se pritisne Enter. Koga kje se prititsne Enter tasterOdgovor objekto se prebrishuva i 
         * se pravi nov prazen objekt so ista gradba so pomosh na napraviTasterOdgovorObjekt() funkcijata.
         * @method napraviTasterOdgovorObjekt
         * @return {Object}
         */
        napraviTasterOdgovorObjekt = function () {
            return {
                ishod: {
                    funkciiOdCelBroj: {},
                    funkciiOdBukvi: {}
                },
                greshki: []
            };
        },

        /**
         * Sodrzhi podatoci vo objektna struktura povrzani so vnes od tastatura. Pogledni napraviTasterOdgovorObjekt() i vnesiCelBrojSoKopchinja().
         * @property tasterOdgovor
         * @type Object
         * @default {
                ishod: {
                    funkciiOdCelBroj: {},
                    funkciiOdBukvi: {}
                },
                greshki: []
            }
         */
        tasterOdgovor = napraviTasterOdgovorObjekt();

    return {

        /**
         * Go vrakja kvadratot na brojot n, n^2
         * @method kvadrat
         * @param {Number} n
         * @return {Number}
         */
        kvadrat: function (n) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (n) {
                return n * n;
            }, n);
        },

        /**
         * Go vrakja kubot na brojot n, n^3
         * @method kub
         * @param {Number} n
         * @return {Number}
         */
        kub: function (n) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (n) {
                return n * n * n;
            }, n);
        },

        /**
         * Ja vrakja dolzhinata na kruzhnicata so daden radius.
         * @method dolzhinaNaKruzhnica
         * @param {Number} radius
         * @return {Number}
         */
        dolzhinaNaKruzhnica: function (radius) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (radius) {
                return 2 * Math.PI * radius;
            }, radius);
        },

        /**
         * Ja vrakja ploshtinata na kruzhnicata so daden radius.
         * @method ploshtinaNaKruzhinca
         * @param {Number} radius
         * @return {Number}
         */
        ploshtinaNaKruzhinca: function (radius) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (radius) {
                return Math.PI * parent.kvadrat(radius);
            }, radius);
        },

        /**
         * Go vrakja zbirot na parametrite a i b.
         * @method zbirOdDva
         * @param {Number} a
         * @param {Number} b
         * @return {Number}
         */
        zbirOdDva: function (a, b) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b) {
                return a + b;
            }, a, b);
        },

        /**
         * Ja vrakja razlikata na parametrite a i b.
         * @method razlikaOdDva
         * @param {Number} a
         * @param {Number} b
         * @return {Number}
         */
        razlikaOdDva: function (a, b) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b) {
                return a - b;
            }, a, b);
        },

        /**
         * Go vrakja proizvodot na parametrite a i b.
         * @method proizvodOdDva
         * @param {Number} a
         * @param {Number} b
         * @return {Number}
         */
        proizvodOdDva: function (a, b) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b) {
                return a * b;
            }, a, b);
        },

        /**
         * Go vrakja kolichnikot na parametrite a i b. Isto taka proveruva dali b e nula, i ako e vrakja poraka DELENJE_SO_NULA.
         * @method kolichnikOdDva
         * @param {Number} a
         * @param {Number} b
         * @return {Number}
         */
        kolichnikOdDva: function (a, b) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b) {
                var ishod = null;
                if (b === 0) {
                    ishod = turboGjorgi.konstanti.DELENJE_SO_NULA();
                } else {
                    ishod = a / b;
                }
                return ishod;
            }, a, b);
        },

        /**
         * Proveruva dali brojot e tricifren, i ako e ja vrakja srednata cifra. Ako brojot ne e tricifren, vrakja poraka BROJOT_NE_E_TRICIFREN.
         * @method srednaCifraTricifrenBroj
         * @param {Number} broj
         * @return {Number}
         */
        srednaCifraTricifrenBroj: function (broj) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (broj) {
                var pomosh = 0,
                    ishod = null;
                if (turboGjorgi.eTricifrenBroj(broj)) {
                    pomosh = broj % 100;
                    ishod = (pomosh - pomosh % 10) / 10;
                } else {
                    ishod = turboGjorgi.konstanti.BROJOT_NE_E_TRICIFREN();
                }
                return ishod;
            }, broj);
        },

        /**
         * Proveruva dali dvata parametri a i b se tricifreni, i ako se vrakja zbir na srednite cifri. Ako barem eden od borevite ne e tricifren,
         * funkcijata vrakja poraka EDEN_OD_BROEVITE_NE_E_TRICIFREN.
         * @method zbirNaSredniCifri
         * @param {Number} a
         * @param {Number} b
         * @return {Number}
         */
        zbirNaSredniCifri: function (a, b) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b) {
                var ishod = null;
                if (turboGjorgi.eTricifrenBroj(a) && turboGjorgi.eTricifrenBroj(b)) {
                    ishod = parent.srednaCifraTricifrenBroj(a) + parent.srednaCifraTricifrenBroj(b);
                } else {
                    ishod = turboGjorgi.konstanti.EDEN_OD_BROEVITE_NE_E_TRICIFREN();
                }
                return ishod;
            }, a, b);
        },

        /**
         * Vrakja rastojanie izmegju dve tochki postaveni vo 3D prostor. Ako vo presmetkata ispod korenot se najde negativen broj se vrakja poraka:
         * NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ.
         * @method rastojanieDve3DTochki
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} z1
         * @param {Number} x2
         * @param {Number} y2
         * @param {Number} z2
         * @return {Number}
         */
        rastojanieDve3DTochki: function (x1, y1, z1, x2, y2, z2) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (x1, y1, z1, x2, y2, z2) {
                var ishod = parent.kvadrat(x2 - x1) + parent.kvadrat(y2 - y1) + parent.kvadrat(z2 - z1);
                if (ishod < 0) {
                    ishod = turboGjorgi.konstanti.NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ();
                } else {
                    ishod = Math.sqrt(ishod);
                }
                return ishod;
            }, x1, y1, z1, x2, y2, z2);
        },

        /**
         * Reshava sistem od dve linearni ravenki so dve nepoznati: ax + by = c, dx + ey = f, i vrakja objekt so dve polinja: {x: vrX, y: vrY}
         * @method sistemRavenkiSoDveNepoznati
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @param {Number} d
         * @param {Number} e
         * @param {Number} f
         * @return {Number}
         */
        sistemRavenkiSoDveNepoznati: function (a, b, c, d, e, f) {
            return turboGjorgi.funkcijaOdPovekjeBroevi(function (a, b, c, d, e, f) {
                var x = 0,
                    y = 0;

                x = c / a - (b * a * f - b * d * c) / (e * a - d * b);
                y = (a * f - d * c) / (e * a - d * b);

                return {
                    x: x,
                    y: y
                };
            }, a, b, c, d, e, f);
        },

        /**
         * vnesiCelBrojSoKopchinja() e nastan-funkcija koja pechati objekt koga kje se vnesat povekje broevi ili najmalce dve bukvi od tastatura posle 
         * pritiskanje na Enter kopcheto. Se pechati objekt so slednava gradba {ishod: {funkciiOdCelBroj: {}, funkciiOdBukvi: {}}, greshki: []}.
         * funkciiOdCelBroj podobjektot sodrzhi: vrednost na x, sledbenik na x, prethodnik na x, x^2, sqrt(x), e^x, cos(x), ln(x). 
         * funkciiOdBukvi sodrzhi: poslednata bukva vnesena od tastarura, prethodnik na dadenata bukva, sledbenik na dadenata bukva i 
         * golemiot zapis na dadenata bukva. Isto taka sorzhi i kluch bukviRazlika shto pretstavuva razlika na dekadnite zapisi na poslednite 
         * dve vneseni bukvi od tastatura. Podobjektot sodrzhi niza od greshki koi se napraveni za vreme na povekje pritiskanja se dodeka ne 
         * se pritisne Enter. Koga kje se prititsne Enter, tasterOdgovor objektot se prebrishuva i se pravi nov prazen objekt so ista gradba 
         * so pomosh na napraviTasterOdgovorObjekt() funkcijata.
         * @event vnesiCelBrojSoKopchinja
         * @param {Object} event
         */
        vnesiCelBrojSoKopchinja: function (event) {
            var x = null;
            if (event.keyCode === 13) {
                // kopche enter
                if (brojStr === '') {
                    tasterOdgovor.greshki.push(turboGjorgi.konstanti.NE_KUCNAVTE_BROEVI());
                } else {
                    x = parseInt(brojStr, 10);
                    tasterOdgovor.ishod.funkciiOdCelBroj = {
                        broj: x,
                        prethodnik: x - 1,
                        sledbenik: x + 1,
                        kvadrat: parent.kvadrat(x),
                        koren: (x < 0 ? turboGjorgi.konstanti.BROJOT_E_POMAL_OD_NULA() : Math.sqrt(x)),
                        eNaStepenX: Math.exp(x),
                        cosinus: Math.cos(x),
                        logaritamOdX: (x <= 0 ? turboGjorgi.konstanti.BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA() : Math.log(x))
                    };
                    brojStr = '';
                }
                console.log(tasterOdgovor);
                bukvaBrojach = 1;
                prvaBukva = null;
                vtoraBukva = null;
                tasterOdgovor = null;
                tasterOdgovor = napraviTasterOdgovorObjekt();
            } else if (event.keyCode >= 48 && event.keyCode <= 57) {
                // broevi
                brojStr = brojStr + String.fromCharCode(event.keyCode);
            } else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
                // bukvi
                tasterOdgovor.ishod.funkciiOdBukvi.prethodnikBukva = String.fromCharCode(event.keyCode - 1);
                tasterOdgovor.ishod.funkciiOdBukvi.sledbenikBukva = String.fromCharCode(event.keyCode + 1);
                tasterOdgovor.ishod.funkciiOdBukvi.bukvaDekadno = event.keyCode;
                tasterOdgovor.ishod.funkciiOdBukvi.bukva = String.fromCharCode(event.keyCode);
                tasterOdgovor.ishod.funkciiOdBukvi.golemaBukva = String.fromCharCode(event.keyCode).toUpperCase();
                if (bukvaBrojach === 1) {
                    prvaBukva = event.keyCode;
                    bukvaBrojach += 1;
                } else if (bukvaBrojach === 2) {
                    vtoraBukva = event.keyCode;
                    bukvaBrojach -= 1;
                }
                if (prvaBukva === null || vtoraBukva === null) {
                    tasterOdgovor.greshki.push(turboGjorgi.konstanti.TREBA_DA_KUCNETE_BAREM_DVE_BUKVI());
                } else {
                    tasterOdgovor.ishod.funkciiOdBukvi.bukviRazlika = prvaBukva - vtoraBukva;
                }
            } else {
                tasterOdgovor.greshki.push(turboGjorgi.konstanti.MORA_DA_KUCNETE_BUKVA_ILI_BROJ());
            }
        },

        /**
         * logichkiOperaciiOdAiB() vrakja objekt se slednava gradba: {AiB: a && b, AlilB: a || b, neA: !a, neB: !b, AiskluchivoIliB: a != b} ili 
         * greshka EDEN_OD_PARAM_NE_E_BOOL ako eden od a ili b ne e od tip Boolean.
         * @method logichkiOperaciiOdAiB
         * @param {Boolean} a
         * @param {Boolean} b
         * @return {Object}
         */
        logichkiOperaciiOdAiB: function (a, b) {
            var ishod = null;
            if (typeof a !== 'boolean' || typeof b !== 'boolean') {
                ishod = turboGjorgi.konstanti.EDEN_OD_PARAM_NE_E_BOOL();
            } else {
                ishod = {
                    AiB: a && b,
                    AiliB: a || b,
                    neA: !a,
                    neB: !b,
                    AiskluchivoIliB: a !== b
                };
            }
            return ishod;
        },

        /**
         * init() funkcijata sluzhi za da se inicijaliziraat nekoi vnatreshni polinja, i se izhvrshuva otkako kje se vchita sodrzhinata na DOM drvoto, 
         * odnosno so nastanot: "DOMContentLoaded". Vo celata aplikacija se koristi poleto parent koe shto e postaveno na vrednost this, shto vo ovoj 
         * sluchaj e window.TurboGjogi objektot.
         * @method init
         * @param {Object} configObject
         */
        init: function (configObject) {
            config = configObject;
            parent = this;
        }
    };
    }()));

window.document.addEventListener("DOMContentLoaded", function (event) {'use strict';

    var turboGjorgi = window.TurboGjorgi,
        rks = turboGjorgi.KontrolniStrukturi.RedoslendaKontrolnaStruktura,
        config = {"event": event};

    turboGjorgi.init(config);
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

    });

window.document.addEventListener('keydown', window.TurboGjorgi.KontrolniStrukturi.RedoslendaKontrolnaStruktura.vnesiCelBrojSoKopchinja);

