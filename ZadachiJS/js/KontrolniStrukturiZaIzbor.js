/**
 * Sodrzhi klasi so metodi koi se reshenia na zadachite povrzani so glava 2, Kontrolni Strukturi za izbor.
 * @module Zadachi
 * @submodule KontrolniStrukturiZaIzbor
 */
window.Zadachi.napraviDrvo('KontrolniStrukturiZaIzbor', {});

/**
 * IzborOdDveMozhnosti sodrzhi metodi koi se reshenia na zadachite povrzani so podglava 2.1 Izbor od dve mozhnosti.
 * @class IzborOdDveMozhnosti
 * @uses Zadachi
 * @uses Konstanti
 * @uses RedoslendaKontrolnaStruktura
 */
window.Zadachi.napraviDrvo('KontrolniStrukturiZaIzbor.IzborOdDveMozhnosti', (function (zadachiObj) {'use strict';

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
         * rks e drugo ime za tekovniot objektot zadachi.KontrolniStrukturi.RedoslendaKontrolnaStruktura
         * @property rks
         * @type Object
         * @default zadachi.KontrolniStrukturi.RedoslendaKontrolnaStruktura
         */
        rks = null;

    return {

        /**
         * triBrojaStraniNaTriagolnik() funkcijata zema tri broevi a, b i c i proveruva dali tie pravat triagolnik. Za da pravat triagolnik
         * mora da se ispolneti uslovite (a + b >= c), (a + c >= b) i (b + c >= a) odnosno zbriot na bilo koi dve strani ne smee da bide pomal od 
         * tretata.
         * @method triBrojaStraniNaTriagolnik
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @return {Boolean}
         */
        triBrojaStraniNaTriagolnik: function (a, b, c) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var eTriagolnik = true,
                    aPlusB = a + b,
                    aPlusC = a + c,
                    bPlusC = b + c;

                if (aPlusB >= c && aPlusC >= b && bPlusC >= a) {
                    eTriagolnik = true;
                } else {
                    eTriagolnik = false;
                }

                return eTriagolnik;
            }, a, b, c);
        },

        /**
         * prirodenBrojEParen() proveruva dali prirodniot broj n e paren. Prvo se proba dali e n priroden broj, i ako e togash
         * se proveruva dali e paren.
         * tretata.
         * @method prirodenBrojEParen
         * @param {Number} n
         * @return {Boolean}
         */
        prirodenBrojEParen: function (n) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var ishod = false;
                if (zadachi.ePrirodenBroj(n) && zadachi.eParenBroj(n)) {
                    ishod = true;
                } else {
                    ishod = zadachi.Konstanti.BROJOT_NE_E_PRIRODEN();
                }
                return ishod;
            }, n);
        },

        /**
         * podrediPoGolemina() funkcijata zema tri broevi a, b i c i gi podreduva po golemina vo opagjachki redosled.
         * @method podrediPoGolemina
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @return {Boolean}
         */
        podrediPoGolemina: function (a, b, c) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var prv = 0,
                    vtor = 0,
                    tret = 0;

                if (a >= b) {
                    prv = a;
                    if (a >= c) {
                        if (b >= c) {
                            vtor = b;
                            tret = c;
                        } else {
                            vtor = c;
                            tret = b;
                        }
                    } else {
                        prv = c;
                        vtor = a;
                        tret = b;
                    }
                } else {
                    prv = b;
                    if (b >= c) {
                        if (a >= c) {
                            vtor = a;
                            tret = c;
                        } else {
                            vtor = c;
                            tret = a;
                        }
                    } else {
                        prv = c;
                        vtor = b;
                        tret = a;
                    }
                }

                return [prv, vtor, tret];
            }, a, b, c);
        },

        /**
         * ravenkaAXPlusBEdnakvoNula() reshava ravenka so edna nepoznata, ax + b = 0. 
         * @method ravenkaAXPlusBEdnakvoNula
         * @param {Number} n
         * @return {Boolean}
         */
        ravenkaAXPlusBEdnakvoNula: function (a, b) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var ishod = 0;
                if (a === 0) {
                    ishod = zadachi.Konstanti.DELENJE_SO_NULA();
                } else {
                    ishod = -(b / a);
                }
                return ishod;
            }, a, b);
        },

        /**
         * tricifrenBrojSumaKuboviNaCifri() proveruva dali prateniot broj e ednakov so zbirot na kubovite na negovite cifri.
         * @method tricifrenBrojSumaKuboviNaCifri
         * @param {Number} broj
         * @return {Boolean}
         */
        tricifrenBrojSumaKuboviNaCifri: function (broj) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var ishod = false,
                    brojStr = '',
                    prvaCifra = 0,
                    vtoraCifra = 0,
                    tretaCifra = 0,
                    zbir = 0;

                if (zadachi.eCelBroj(broj)) {
                    if (zadachi.eTricifrenBroj(broj)) {
                        brojStr = broj.toString();
                        prvaCifra = zadachi.parsirajCelBroj(brojStr.charAt(0));
                        vtoraCifra = zadachi.parsirajCelBroj(brojStr.charAt(1));
                        tretaCifra = zadachi.parsirajCelBroj(brojStr.charAt(2));
                        prvaCifra = rks.kub(prvaCifra);
                        vtoraCifra = rks.kub(vtoraCifra);
                        tretaCifra = rks.kub(tretaCifra);
                        zbir = prvaCifra + vtoraCifra + tretaCifra;

                        if (zbir === broj) {
                            ishod = true;
                        } else {
                            ishod = false;
                        }
                    } else {
                        ishod = zadachi.Konstanti.BROJOT_NE_E_TRICIFREN();
                    }
                } else {
                    ishod = zadachi.Konstanti.BROJOT_NE_E_CEL();
                }
                return ishod;
            }, broj);
        },

        /**
         * pronajdiTricifrenBrojEdnakovZbirKubovi() go naogja brojot izmegju 100 i 999 koj e ednakov na zbirot na kubovite na negovite cifri.
         * Treba da vrati broj 407 <=> 4^3 + 7^3 = 64 + 343 = 407
         * @method pronajdiTricifrenBrojEdnakovZbirKubovi
         * @return {Number}
         */
        pronajdiTricifrenBrojEdnakovZbirKubovi: function () {
            var i = 0,
                ishod = 0;

            for (i = 100; i < 1000; i += 1) {
                if (parent.tricifrenBrojSumaKuboviNaCifri(i)) {
                    ishod = i;
                }
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
            rks = zadachi.KontrolniStrukturi.RedoslendaKontrolnaStruktura;
        }
    };
    }(window.Zadachi)));

/**
 * IzborOdPovekjeMozhnosti sodrzhi metodi koi se reshenia na zadachite povrzani so podglava 2.2 Izbor od povekje mozhnosti.
 * @class IzborOdPovekjeMozhnosti
 * @uses Zadachi
 * @uses Konstanti
 */
window.Zadachi.napraviDrvo('KontrolniStrukturiZaIzbor.IzborOdPovekjeMozhnosti', (function (zadachiObj) {'use strict';

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
         * Konstanta
         * @property NE_E_PRAVILEN_REDEN_BROJ_MESEC
         * @type String
         * @default "Ne e pravilen reden broj na mesec!"
         * @final
         */
        NE_E_PRAVILEN_REDEN_BROJ_MESEC = "Ne e pravilen reden broj na mesec!",

        /**
         * Konstanta
         * @property BROJOT_E_PAREN
         * @type String
         * @default "Dozvolivi se samo vrednosti 0 ili 1!"
         * @final
         */
        DOZVOLIVI_SE_SAMO_VREDNOSTI_0_ILI_1 = "Dozvolivi se samo vrednosti 0 ili 1!";

    return {

        /**
         * keypressNastan() funkcijata proveruva dali vnesenata bukva od tastaturata e golema ili mala. Se koristi JavaSkript 
         * nastanot 'keypress' bidejki samo toj mozhe da razdvoi mali od golemi bukvi. 'keydown' i 'keyup' ne dvojat mali od golemi bukvi,
         * tie sekogash vrakjaat podatoci za golemi bukvi. 'keypress' nastanot se sluchiva koga kje se pritisne kopche i toa vrakja nekakva
         * bukva kako vrednost. Ostanatite specijalni znaci, borevi i sistemski kopchina se nebitni. Se koristi 'charCode' poleto od event 
         * objektot. Spored dokumentacija na Mozilla, 'charCode' e zastareno i treba da se izbegnuva, iako site preslistuvachi go poddrzhuvaat.
         * Kako zamena da se koristi poleto 'key', koe seushte ne e opshto prifateno i zatoa treba da se koristi 'charCode' kade e 'key' fali.
         * @event keypressNastan:keypress
         * @param {Object} event
         */
        keypressNastan: function (event) {
            var bukva = 0,
                bukvaStr = '',
                ishod = '';

            if (event.hasOwnProperty('key')) {
                bukva = event.key;
            } else {
                bukva = event.charCode;
            }

            bukvaStr = String.fromCharCode(bukva);
            if (bukvaStr === bukvaStr.toUpperCase()) {
                ishod = "Bukvata e golema: " + bukvaStr;
            } else {
                ishod = "Bukvata e mala: " + bukvaStr;
            }
            console.log(ishod);
        },

        /**
         * vidNaAgol() funkcijata vrakja opis na agolot. Ako agol > 0 i agol < 90 togash e ostar. Ako agol = 90 togash e prav.
         * Ako agol > 90 i agol < 180 togash e tap. Ako agol = 180 togash e ramen. Ako agol > 180 i agol < 360 togash e tap, i ako
         * agol = 360 togash e poln.
         * @method vidNaAgol
         * @param {Number} agol
         * @return {String}
         */
        vidNaAgol: function (agol) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var ishod = '';
                if (agol > 0 && agol < 90) {
                    ishod = "Ostar: " + agol;
                } else if (agol === 90) {
                    ishod = "Prav: " + agol;
                } else if (agol > 90 && agol < 180) {
                    ishod = "Tap: " + agol;
                } else if (agol === 180) {
                    ishod = "Ramen: " + agol;
                } else if (agol > 181 && agol < 360) {
                    ishod = "Tap: " + agol;
                } else if (agol === 360) {
                    ishod = "Poln: " + agol;
                }
                return ishod;
            }, agol);
        },

        /**
         * svojstvaBroevi1Do10() funkcijata gi pechati svostvata na broevite od 1 do 10. Parnost/neparnost, prost/neprost broj.
         * @method svojstvaBroevi1Do10
         * @return {Object}
         */
        svojstvaBroevi1Do10: function () {
            var i = 0,
                ishod = {};
            for (i = 1; i < 11; i += 1) {
                ishod[i] = [];
                if (zadachi.eParenBroj(i)) {
                    ishod[i].push(zadachi.Konstanti.BROJOT_E_PAREN());
                } else {
                    ishod[i].push(zadachi.Konstanti.BROJOT_NE_E_PAREN());
                }

                if (zadachi.eProstBroj1Do10(i)) {
                    ishod[i].push(zadachi.Konstanti.BROJOT_E_PROST());
                } else {
                    ishod[i].push(zadachi.Konstanti.BROJOT_NE_E_PROST());
                }
            }
            return ishod;
        },

        /**
         * brojDenoviVoMesec() funkcijata pechati broj na denovi vo izbran mesec. Se prakja i vrednost za preodna ili ne preodna godina i pritoa
         * za vtor mesec se vrakja 28 denovi odnosno 29 denovi.
         * @method brojDenoviVoMesec
         * @param {Number} mesecBroj vrednost od 1 do 12
         * @param {Number} preodnaGodina vrednosti 0 za ne preodna godina i 1 za preodna godina. Ako vrednost za ovoj parametar se izostavi
         * togash osnovna vrednost e 0 ili ne preodna godina.
         * @default 0
         * @return {Number}
         */
        brojDenoviVoMesec: function (mesecBroj, preodnaGodina) {
            return zadachi.funkcijaOdPovekjeBroevi(function () {
                var ishod = 0;
                preodnaGodina = (preodnaGodina === undefined ? 0 : preodnaGodina);
                if (zadachi.eCelBroj(mesecBroj)) {
                    if (mesecBroj < 1 || mesecBroj > 12) {
                        ishod = NE_E_PRAVILEN_REDEN_BROJ_MESEC;
                    } else {
                        switch (mesecBroj) {
                        case 1:
                            ishod = 31;
                            break;
                        case 2:
                            if (zadachi.eCelBroj(preodnaGodina)) {
                                if (preodnaGodina === 0) {
                                    ishod = 28;
                                } else if (preodnaGodina === 1) {
                                    ishod = 29;
                                } else {
                                    ishod = DOZVOLIVI_SE_SAMO_VREDNOSTI_0_ILI_1 + ": preodnaGodina = " + preodnaGodina;
                                }
                            } else {
                                ishod = zadachi.Konstanti.BROJOT_NE_E_CEL() + ": preodnaGodina, " + preodnaGodina;
                            }
                            break;
                        case 3:
                            ishod = 31;
                            break;
                        case 4:
                            ishod = 30;
                            break;
                        case 5:
                            ishod = 31;
                            break;
                        case 6:
                            ishod = 30;
                            break;
                        case 7:
                            ishod = 31;
                            break;
                        case 8:
                            ishod = 31;
                            break;
                        case 9:
                            ishod = 30;
                            break;
                        case 10:
                            ishod = 31;
                            break;
                        case 11:
                            ishod = 30;
                            break;
                        case 12:
                            ishod = 31;
                            break;
                        }
                    }
                } else {
                    ishod = zadachi.Konstanti.BROJOT_NE_E_CEL();
                }
                return ishod;
            }, mesecBroj);
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