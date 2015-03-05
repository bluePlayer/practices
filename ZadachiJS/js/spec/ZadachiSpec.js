describe("Zadachi.js", function () {
    var zadachi = window.Zadachi;
        MojPodObjekt = {
            config: null,
            parent: null,
            pole1: null,
            testFunkcija1: function () {
                return "zdravo";
            },
            MojVtorPodObjekt: {
                config: null,
                ime: "Vlado",
                parent: null,
                pole2: null,
                testFunkcija2: function () {
                    return "svetu";
                },
                MojTretPodObjekt: {
                    parent: null,
                    config: null,
                    pole3: null,
                    testFunkcija3: function () {
                        return this.uloga;
                    },
                    uloga: "Softverski Inzenjer",
                    init: function (config) {
                        parent = this;
                        this.config = config;
                        this.pole3 = this.testFunkcija3();
                    }
                },
                init: function (config) {
                    parent = this;
                    this.config = config;
                    this.pole2 = this.testFunkcija2();
                }
            },
            init: function (config) {
                parent = this;
                this.config = config;
                this.pole1 = this.testFunkcija1();
                zadachi.initApp(this, config);
            }
       };

    describe("Proverka dali initApp() ja inizijalizira cela aplikacija", function () {
        var konfiguracija;
        beforeEach(function () {
            konfiguracija = {moiPodesuvanja: "moi podesuvanja"};
            MojPodObjekt.init(konfiguracija);
        });

        it("MojPodObjekt.parent da bide definirano", function () {
            expect(MojPodObjekt.parent).toBeDefined();
        });

        it("MojPodObjekt.config da bide ednakvo na {moiPodesuvanja: \"moi podesuvanja\"}", function () {
            expect(MojPodObjekt.config).toEqual(konfiguracija);
        });

        it("MojPodObjekt.pole1 da bide ednakvo na \"zdravo\"", function () {
            expect(MojPodObjekt.pole1).toEqual("zdravo");
        });

        it("MojPodObjekt.MojVtorPodObjekt.parent da bide definirano", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.parent).toBeDefined();
        });

        it("MojPodObjekt.MojVtorPodObjekt.config da bide ednakvo na {moiPodesuvanja: \"moi podesuvanja\"}", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.config).toEqual(konfiguracija);
        });

        it("MojPodObjekt.MojVtorPodObjekt.pole2 da bide ednakvo na \"svetu\"", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.pole2).toEqual("svetu");
        });

        it("MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.parent da bide definirano", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.parent).toBeDefined();
        });

        it("MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.config da bide ednakvo na {moiPodesuvanja: \"moi podesuvanja\"}", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.config).toEqual(konfiguracija);
        });

        it("MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.pole3 da bide ednakvo na \"Softverski Inzenjer\"", function () {
            expect(MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt.pole3).toEqual("Softverski Inzenjer");
        });
    });

    describe("Proverka dali napraviDrvo() vrakja objekt so potrebna gradba.", function () {
        it("napraviDrvo('MojPodObjekt', {})", function () {
            expect(zadachi.napraviDrvo('MojPodObjekt', {})).toBeDefined(MojPodObjekt);
        });

        it('napraviDrvo(\'MojPodObjekt.MojVtorPodObjekt\', {ime: "Vlado"})', function () {
            expect(zadachi.napraviDrvo('MojPodObjekt.MojVtorPodObjekt', {ime: "Vlado"})).toBeDefined(MojPodObjekt.MojVtorPodObjekt);
        });
        
        it('napraviDrvo(\'MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt\', {uloga: "Softverski Inzenjer"})', function () {
            expect(zadachi.napraviDrvo('MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt', {uloga: "Softverski Inzenjer"})).toBeDefined(MojPodObjekt.MojVtorPodObjekt.MojTretPodObjekt);
        });
    });

    describe("Proverka dali eBroj() proveruva tochno dali parametarot e od tip Number", function () {
        it("eBroj(10) treba da vrati true", function () {
            expect(zadachi.eBroj(10)).toEqual(true);
        });

        it("eBroj(-10) treba da vrati true", function () {
            expect(zadachi.eBroj(-10)).toEqual(true);
        });

        it("eBroj(10.456) treba da vrati true", function () {
            expect(zadachi.eBroj(10.456)).toEqual(true);
        });

        it("eBroj(-10.456) treba da vrati true", function () {
            expect(zadachi.eBroj(-10.456)).toEqual(true);
        });

        it("eBroj(0) treba da vrati true", function () {
            expect(zadachi.eBroj(0)).toEqual(true);
        });

        it("eBroj(Infinity), Infinity e broj pa zatoa treba da vrati true", function () {
            expect(zadachi.eBroj(Infinity)).toEqual(true);
        });

        it("eBroj(-Infinity), -Infinity e broj pa zatoa treba da vrati true", function () {
            expect(zadachi.eBroj(-Infinity)).toEqual(true);
        });

        it("eBroj(NaN) treba da vrati false", function () {
            expect(zadachi.eBroj(NaN)).toEqual(false);
        });

        it("eBroj(true) treba da vrati false", function () {
            expect(zadachi.eBroj(true)).toEqual(false);
        });

        it("eBroj(false) treba da vrati false", function () {
            expect(zadachi.eBroj(false)).toEqual(false);
        });

        it("eBroj(undefined) treba da vrati false", function () {
            expect(zadachi.eBroj(undefined)).toEqual(false);
        });

        it("eBroj({}) treba da vrati false", function () {
            expect(zadachi.eBroj({})).toEqual(false);
        });

        it("eBroj(function () {}) treba da vrati false", function () {
            expect(zadachi.eBroj(function () {})).toEqual(false);
        });

        it("eBroj([]) treba da vrati false", function () {
            expect(zadachi.eBroj([])).toEqual(false);
        });

        it("eBroj(null) treba da vrati false", function () {
            expect(zadachi.eBroj(null)).toEqual(false);
        });

        it("eBroj(\"string\") treba da vrati false", function () {
            expect(zadachi.eBroj("string")).toEqual(false);
        });
    });

    describe("Proverka dali eNiza() proveruva tochno dali parametarot e od tip Array", function () {
        it("eNiza([]) treba da vrati true", function () {
            expect(zadachi.eNiza([])).toEqual(true);
        });

        it("eNiza(new Array()) treba da vrati true", function () {
            expect(zadachi.eNiza(new Array())).toEqual(true);
        });

        it("eNiza(10.456) treba da vrati false", function () {
            expect(zadachi.eNiza(10.456)).toEqual(false);
        });

        it("eNiza(-10.456) treba da vrati false", function () {
            expect(zadachi.eNiza(-10.456)).toEqual(false);
        });

        xit("eNiza(NaN) treba da vrati false", function () {
            expect(zadachi.eNiza(NaN)).toEqual(false);
        });

        it("eNiza(true) treba da vrati false", function () {
            expect(zadachi.eNiza(true)).toEqual(false);
        });

        it("eNiza(false) treba da vrati false", function () {
            expect(zadachi.eNiza(false)).toEqual(false);
        });

        xit("eNiza(undefined) treba da vrati false", function () {
            expect(zadachi.eNiza(undefined)).toEqual(false);
        });

        it("eNiza({}) treba da vrati false", function () {
            expect(zadachi.eNiza({})).toEqual(false);
        });

        it("eNiza(function () {}) treba da vrati false", function () {
            expect(zadachi.eNiza(function () {})).toEqual(false);
        });

        xit("eNiza(null) treba da vrati false", function () {
            expect(zadachi.eNiza(null)).toEqual(false);
        });

        it("eNiza(\"string\") treba da vrati false", function () {
            expect(zadachi.eNiza("string")).toEqual(false);
        });
    });

    describe("nizaSodrzhi(niza, element) proveruva nizata 'niza' go sodrzhi element", function () {
        var niza = [2, "zdravo", -5.54, null, undefined, NaN, {}, [], false, Infinity, -Infinity];

        it("nizaSodrzhi([2, \"zdravo\", -5.54, null, undefined, NaN, {}, [], false, Infinity, -Infinity], \"zdravo\") treba da vrati true", function () {
            expect(zadachi.nizaSodrzhi(niza, "zdravo")).toEqual(true);
        });

        it("nizaSodrzhi([2, \"zdravo\", -5.54, null, undefined, NaN, {}, [], false, Infinity, -Infinity], 5, false], \"svetu\") treba da vrati false", function () {
            expect(zadachi.nizaSodrzhi(niza, "svetu")).toEqual(false);
        });

        xit("nizaSodrzhi([2, \"zdravo\", -5.54, null, undefined, NaN, {}, [], false, Infinity, -Infinity], null) treba da vrati true", function () {
            expect(zadachi.nizaSodrzhi(niza, null)).toEqual(true);
        });

        xit("nizaSodrzhi([2, \"zdravo\", -5.54, null, undefined, NaN, {}, [], false, Infinity, -Infinity], undefined) treba da vrati false", function () {
            expect(zadachi.nizaSodrzhi(niza, undefined)).toEqual(true);
        });

        it("nizaSodrzhi(NaN, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(NaN, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi(null, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(null, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi(undefined, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(undefined, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi(false, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(false, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi(true, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(true, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi(function () {}, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi(function () {}, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });

        it("nizaSodrzhi({}, \"svetu\") treba da vrati frli iskluhok IskParamNeEOdTipArray", function () {
            expect(function () {zadachi.nizaSodrzhi({}, "svetu")}).toThrow(new zadachi.Iskluchoci.IskParamNeEOdTipArray());
        });
    });

    describe("funkcijaOdPovekjeBroevi() proveruva dali prviot argument e funkcija, a site sledni mora da se broevi.", function () {
        var soberi = function (a, b) {return a + b;},
            pomnozhi = function(a, b) {return a * b;};
            
        it("funkcijaOdPovekjeBroevi(function () {}) treba da frli iskluchok IskMoraNajmalceDvaParam", function () {
            expect(function () { zadachi.funkcijaOdPovekjeBroevi(soberi) }).toThrow(new zadachi.Iskluchoci.IskMoraNajmalceDvaParam());
        });

        it("funkcijaOdPovekjeBroevi(\"proba\", function () {}) treba da frli iskluchok IskParamNeEFunkcija", function () {
            expect(function () { zadachi.funkcijaOdPovekjeBroevi("proba", soberi) }).toThrow(new zadachi.Iskluchoci.IskParamNeEFunkcija());
        });

        it("funkcijaOdPovekjeBroevi(function () {}, 3, 2, \"proba\") treba da frli iskluchok IskEdenOdParamNeEBroj", function () {
            expect(function () { zadachi.funkcijaOdPovekjeBroevi(soberi, 3, 2, "proba") }).toThrow(new zadachi.Iskluchoci.IskEdenOdParamNeEBroj());
        });

        it("funkcijaOdPovekjeBroevi(function () {}, 3, \"proba\", 5) treba da frli iskluchok IskEdenOdParamNeEBroj", function () {
            expect(function () { zadachi.funkcijaOdPovekjeBroevi(soberi, 3, "proba", 5) }).toThrow(new zadachi.Iskluchoci.IskEdenOdParamNeEBroj());
        });

        it("funkcijaOdPovekjeBroevi(function (a, b) { return a + b;}, 3, 5) = 8", function () {
            expect(zadachi.funkcijaOdPovekjeBroevi(soberi, 3, 5)).toEqual(8);
        });

        it("funkcijaOdPovekjeBroevi(function (a, b) { return a * b;}, 3, 5) = 15", function () {
            expect(zadachi.funkcijaOdPovekjeBroevi(pomnozhi, 3, 5)).toEqual(15);
        });
    });

    describe("eParenBroj(broj) proveruva dali broj e paren i vrakja true ili false", function () {
        it("eParenBroj(6) = true", function () {
            expect(zadachi.eParenBroj(6)).toEqual(true);
        });

        it("eParenBroj(7) = true", function () {
            expect(zadachi.eParenBroj(7)).toEqual(false);
        });

        it("eParenBroj(4.6) frla iskluchok IskBrojotNeECel", function () {
            expect(function () {zadachi.eParenBroj(4.6)}).toThrow(new zadachi.Iskluchoci.IskBrojotNeECel());
        });
    });

    describe("eCelBroj(broj) proveruva dali broj e cel i vrakja true ili false", function () {
        it("eCelBroj(6) vrakja true", function () {
            expect(zadachi.eCelBroj(6)).toEqual(true);
        });

        it("eCelBroj(7.89) vrakja false", function () {
            expect(zadachi.eCelBroj(7.89)).toEqual(false);
        });

        it("eCelBroj(-4.6) vrakja false", function () {
            expect(zadachi.eCelBroj(-4.6)).toEqual(false);
        });

        it("eCelBroj(-4) vrakja true", function () {
            expect(zadachi.eCelBroj(-4)).toEqual(true);
        });
    });

    describe("eProstBroj1Do10(broj) proveruva dali broj pripagja na mn. {1, 10} i dali e prost broj", function () {
        it("eProstBroj1Do10(-3) treba da fli iskluchok IskBrojotNeEPriroden", function () {
            expect(function () { zadachi.eProstBroj1Do10(-3) }).toThrow(new zadachi.Iskluchoci.IskBrojotNeEPriroden());
        });

        it("eProstBroj1Do10(3.56) treba da fli iskluchok IskBrojotNeEPriroden", function () {
            expect(function () { zadachi.eProstBroj1Do10(3.56) }).toThrow(new zadachi.Iskluchoci.IskBrojotNeEPriroden());
        });

        it("eProstBroj1Do10(1, 2, 3, 5, 7) = true", function () {
            expect(zadachi.eProstBroj1Do10(1)).toEqual(true);
            expect(zadachi.eProstBroj1Do10(2)).toEqual(true);
            expect(zadachi.eProstBroj1Do10(3)).toEqual(true);
            expect(zadachi.eProstBroj1Do10(5)).toEqual(true);
            expect(zadachi.eProstBroj1Do10(7)).toEqual(true);
        });
        it("eProstBroj1Do10(4, 6, 8, 9, 10) = false", function () {
            expect(zadachi.eProstBroj1Do10(4)).toEqual(false);
            expect(zadachi.eProstBroj1Do10(6)).toEqual(false);
            expect(zadachi.eProstBroj1Do10(8)).toEqual(false);
            expect(zadachi.eProstBroj1Do10(9)).toEqual(false);
            expect(zadachi.eProstBroj1Do10(10)).toEqual(false);
        });
    });

    describe("ePrirodenBroj(broj) proveruva dali broj e pritoden, cel odnosno pogolem od nula i vrakja true ili false", function () {
        it("ePrirodenBroj(6) vrakja true", function () {
            expect(zadachi.ePrirodenBroj(6)).toEqual(true);
        });

        it("ePrirodenBroj(0) vrakja false", function () {
            expect(zadachi.ePrirodenBroj(0)).toEqual(false);
        });

        it("ePrirodenBroj(7.89) vrakja false", function () {
            expect(zadachi.ePrirodenBroj(7.89)).toEqual(false);
        });

        it("ePrirodenBroj(-4.6) vrakja false", function () {
            expect(zadachi.ePrirodenBroj(-4.6)).toEqual(false);
        });

        it("ePrirodenBroj(-4) vrakja false", function () {
            expect(zadachi.ePrirodenBroj(-4)).toEqual(false);
        });
    });

    describe("eTricifrenBroj(broj) proveruva dali broj tricifren odnosno pomegju 100 i 999 i vrakja true ili false", function () {
        it("eTricifrenBroj(6) vrakja false", function () {
            expect(zadachi.eTricifrenBroj(6)).toEqual(false);
        });

        it("eTricifrenBroj(99) vrakja false", function () {
            expect(zadachi.eTricifrenBroj(99)).toEqual(false);
        });

        it("eTricifrenBroj(100) vrakja true", function () {
            expect(zadachi.eTricifrenBroj(100)).toEqual(true);
        });

        it("eTricifrenBroj(598) vrakja true", function () {
            expect(zadachi.eTricifrenBroj(598)).toEqual(true);
        });

        it("eTricifrenBroj(999) vrakja true", function () {
            expect(zadachi.eTricifrenBroj(999)).toEqual(true);
        });

        it("eTricifrenBroj(1000) vrakja false", function () {
            expect(zadachi.eTricifrenBroj(1000)).toEqual(false);
        });

        it("eTricifrenBroj(23456) vrakja false", function () {
            expect(zadachi.eTricifrenBroj(23456)).toEqual(false);
        });

        it("eTricifrenBroj(-345.87) vrakja true. Kje go scrati drobniot del i kje go pretvori vo pozitiven broj.", function () {
            expect(zadachi.eTricifrenBroj(-345.87)).toEqual(true);
        });

        it("eTricifrenBroj(-398) vrakja true. kje go pretvori vo pozitiven a potota kje proveri dali e tricifren.", function () {
            expect(zadachi.eTricifrenBroj(-398)).toEqual(true);
        });
    });
    
    });