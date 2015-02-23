/**
 * Sodrzhi klasi so metodi koi se reshenia na zadachite povrzani so glava 1, Kontrolni Strukturi.
 * @module Zadachi
 * @submodule KontrolniStrukturi
 */
window.Zadachi.napraviDrvo('KontrolniStrukturi', {});

/**
 * RedoslendaKontrolnaStruktura sodrzhi metodi koi se reshenia na zadachite povrzani so podglava 1.1 Redoslenda kontrolna struktura.
 * @class RedoslendaKontrolnaStruktura
 * @uses Zadachi
 * @uses Konstanti
 */
window.Zadachi.napraviDrvo('KontrolniStrukturi.RedoslendaKontrolnaStruktura', (function (zadachiObj) {'use strict';

    var
        /**
         * Sodrzhi aplikaciska  konfiguracija. 
         * @property config
         * @type Object
         * @default null
         */
        config = null,

        /**
         * zadachi e drugo ime za tekovniot objekt window.Zadachi. TurboGjogi klasata ima korisni funkcii kako, eNiza, eBroj itn...
         * @property zadachi
         * @type Object
         * @default window.Zadachi
         */
        zadachi = zadachiObj,

        /**
         * parent e drugo ime za tekovniot objekt i gradba na Zadachi ili this.
         * @property parent
         * @type Object
         * @default this
         */
        parent = null,

        /**
         * brojStr e string za pamtenje na vnesenite broevi od tastatura i nivno pretvarane potoa vo cel broj. 
         * @example
         *      kucnati se broevi 4, 5, 6 edno po drugo i potoa e pritisnato kopcheto Enter. brojStr = '456' koj potoa se pretvora vo broj 456 i se pravat soodvetni presmetki. 
         * Vidi napraviTasterOdgovorObjekt() i vnesiCelBrojSoKopchinja().
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
         * slednava gradba: 
         * @example
         *     {ishod: { funkciiOdCelBroj: {}, funkciiOdBukvi: {} }, greshki: [] }
         * funkciiOdCelBroj podobjektot sodrzhi: vrednost na x, 
         * sledbenik na x, prethodnik na x, x^2, sqrt(x), e^x, cos(x), ln(x). funkciiOdBukvi sodrzhi: poslednata bukva vnesena od tastarura, 
         * prethodnik na dadenata bukva, sledbenik na dadenata bukva i golemiot zapis na dadenata bukva. Isto taka sorzhi i kluch bukviRazlika shto
         * pretstavuva razlika na dekadnite zapisi na poslednite dve vneseni bukvi od tastatura. Podobjektot sodrzhi niza od greshki koi se napraveni
         * za vreme na povekje pritiskanja se dodeka ne se pritisne Enter. Koga kje se prititsne Enter tasterOdgovor objektot se prebrishuva i 
         * se pravi nov prazen objekt so ista gradba so pomosh na napraviTasterOdgovorObjekt() funkcijata.
         * @method napraviTasterOdgovorObjekt
         * @return {Object} vrakja prazen objekt so gradbata: {ishod: { funkciiOdCelBroj: {}, funkciiOdBukvi: {} }, greshki: [] }
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
            return zadachi.funkcijaOdPovekjeBroevi(function (n) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (n) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (radius) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (radius) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b) {
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b) {
                var ishod = null;
                if (b === 0) {
                    ishod = zadachi.Konstanti.DELENJE_SO_NULA();
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
            return zadachi.funkcijaOdPovekjeBroevi(function (broj) {
                var pomosh = 0,
                    ishod = null;
                if (zadachi.eTricifrenBroj(broj)) {
                    pomosh = broj % 100;
                    ishod = (pomosh - pomosh % 10) / 10;
                } else {
                    ishod = zadachi.Konstanti.BROJOT_NE_E_TRICIFREN();
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b) {
                var ishod = null;
                if (zadachi.eTricifrenBroj(a) && zadachi.eTricifrenBroj(b)) {
                    ishod = parent.srednaCifraTricifrenBroj(a) + parent.srednaCifraTricifrenBroj(b);
                } else {
                    ishod = zadachi.Konstanti.EDEN_OD_BROEVITE_NE_E_TRICIFREN();
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
            return zadachi.funkcijaOdPovekjeBroevi(function (x1, y1, z1, x2, y2, z2) {
                var ishod = parent.kvadrat(x2 - x1) + parent.kvadrat(y2 - y1) + parent.kvadrat(z2 - z1);
                if (ishod < 0) {
                    ishod = zadachi.Konstanti.NE_SE_VADI_KOREN_OD_NEGATIVEN_BROJ();
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
            return zadachi.funkcijaOdPovekjeBroevi(function (a, b, c, d, e, f) {
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
         * pritiskanje na Enter kopcheto. Se pechati objekt so slednava gradba 
         * @example
         *      {ishod: { funkciiOdCelBroj: {}, funkciiOdBukvi: {} }, greshki: [] }.
         * funkciiOdCelBroj podobjektot sodrzhi: vrednost na x, sledbenik na x, prethodnik na x, x^2, sqrt(x), e^x, cos(x), ln(x). 
         * funkciiOdBukvi sodrzhi: poslednata bukva vnesena od tastarura, prethodnik na dadenata bukva, sledbenik na dadenata bukva i 
         * golemiot zapis na dadenata bukva. Isto taka sorzhi i kluch bukviRazlika shto pretstavuva razlika na dekadnite zapisi na poslednite 
         * dve vneseni bukvi od tastatura. Podobjektot sodrzhi niza od greshki koi se napraveni za vreme na povekje pritiskanja se dodeka ne 
         * se pritisne Enter. Koga kje se prititsne Enter, tasterOdgovor objektot se prebrishuva i se pravi nov prazen objekt so ista gradba 
         * so pomosh na napraviTasterOdgovorObjekt() funkcijata.
         * @event vnesiCelBrojSoKopchinja:keydown
         * @param {Object} event
         */
        vnesiCelBrojSoKopchinja: function (event) {
            var x = null;
            if (event.keyCode === 13) {
                if (brojStr === '') {
                    tasterOdgovor.greshki.push(zadachi.Konstanti.NE_KUCNAVTE_BROEVI());
                } else {
                    x = parseInt(brojStr, 10);
                    tasterOdgovor.ishod.funkciiOdCelBroj = {
                        broj: x,
                        prethodnik: x - 1,
                        sledbenik: x + 1,
                        kvadrat: parent.kvadrat(x),
                        koren: (x < 0 ? zadachi.Konstanti.BROJOT_E_POMAL_OD_NULA() : Math.sqrt(x)),
                        eNaStepenX: Math.exp(x),
                        cosinus: Math.cos(x),
                        logaritamOdX: (x <= 0 ? zadachi.Konstanti.BROJOT_E_POMAL_ILI_EDNAKOV_NA_NULA() : Math.log(x))
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
                brojStr = brojStr + String.fromCharCode(event.keyCode);
            } else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
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
                    tasterOdgovor.greshki.push(zadachi.Konstanti.TREBA_DA_KUCNETE_BAREM_DVE_BUKVI());
                } else {
                    tasterOdgovor.ishod.funkciiOdBukvi.bukviRazlika = prvaBukva - vtoraBukva;
                }
            } else {
                tasterOdgovor.greshki.push(zadachi.Konstanti.MORA_DA_KUCNETE_BUKVA_ILI_BROJ());
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
                ishod = zadachi.Konstanti.EDEN_OD_PARAM_NE_E_BOOL();
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
    }(window.Zadachi)));