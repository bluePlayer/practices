using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace KopiranjeProekti
{
    public class Proekt : Notifier
    {
        private int _ID;
        public int ID
        {
            get
            {
                return _ID;
            }
            set
            {
                _ID = value;
                OnPropertyChanged("ID");
            }
        }

        private string _ime;
        public string ime
        {
            get
            {
                return _ime;
            }
            set
            {
                _ime = value;
                OnPropertyChanged("ime");
            }
        }

        private string _pateka;
        public string pateka
        {
            get
            {
                return _pateka;
            }
            set
            {
                _pateka = value;
                OnPropertyChanged("pateka");
            }
        }

        private string _zipPatekaSektorski;
        public string zipPatekaSektorski
        {
            get
            {
                return _zipPatekaSektorski;
            }
            set
            {
                _zipPatekaSektorski = value;
                OnPropertyChanged("zipPatekaSektorski");
            }
        }

        private string _celnaPatekaSektorski;
        public string celnaPatekaSektorski
        {
            get
            {
                return _celnaPatekaSektorski;
            }
            set
            {
                _celnaPatekaSektorski = value;
                OnPropertyChanged("celnaPatekaSektorski");
            }
        }

        private string _zipPatekaNAS;
        public string zipPatekaNAS
        {
            get
            {
                return _zipPatekaNAS;
            }
            set
            {
                _zipPatekaNAS = value;
                OnPropertyChanged("zipPatekaNAS");
            }
        }

        private string _celnaPatekaNAS;
        public string celnaPatekaNAS
        {
            get
            {
                return _celnaPatekaNAS;
            }
            set
            {
                _celnaPatekaNAS = value;
                OnPropertyChanged("celnaPatekaNAS");
            }
        }

        private string _zipPatekaSpodeluvanje;
        public string zipPatekaSpodeluvanje
        {
            get
            {
                return _zipPatekaSpodeluvanje;
            }
            set
            {
                _zipPatekaSpodeluvanje = value;
                OnPropertyChanged("_zipPatekaSpodeluvanje");
            }
        }

        private string _celnaPatekaSpodeluvanje;
        public string celnaPatekaSpodeluvanje
        {
            get
            {
                return _celnaPatekaSpodeluvanje;
            }
            set
            {
                _celnaPatekaSpodeluvanje = value;
                OnPropertyChanged("celnaPatekaSpodeluvanje");
            }
        }

        private string _zipPatekaMcafeeServer;
        public string zipPatekaMcafeeServer
        {
            get
            {
                return _zipPatekaMcafeeServer;
            }
            set
            {
                _zipPatekaMcafeeServer = value;
                OnPropertyChanged("zipPatekaMcafeeServer");
            }
        }

        private string _celnaPatekaMcafeeServer;
        public string celnaPatekaMcafeeServer
        {
            get
            {
                return _celnaPatekaMcafeeServer;
            }
            set
            {
                _celnaPatekaMcafeeServer = value;
                OnPropertyChanged("celnaPatekaMcafeeServer");
            }
        }

        private bool _pechatiPapkiPateki;
        public bool pechatiPapkiPateki
        {
            get
            {
                return _pechatiPapkiPateki;
            }
            set
            {
                _pechatiPapkiPateki = value;
                OnPropertyChanged("pechatiPapkiPateki");
            }
        }

        private string[] _papkiPateki;
        public string[] papkiPateki
        {
            get
            {
                return _papkiPateki;
            }
            set
            {
                _papkiPateki = value;
                OnPropertyChanged("papkiPateki");
            }
        }

        private int _brojPapki;
        public int brojPapki
        {
            get
            {
                return _brojPapki;
            }
            set
            {
                _brojPapki = value;
                OnPropertyChanged("brojPapki");
            }
        }

        private bool _pechatiPapkiDatoteki;
        public bool pechatiPapkiDatoteki
        {
            get
            {
                return _pechatiPapkiDatoteki;
            }
            set
            {
                _pechatiPapkiDatoteki = value;
                OnPropertyChanged("pechatiPapkiDatoteki");
            }
        }

        private string[] _datotekiPateki;
        public string[] datotekiPateki
        {
            get
            {
                return _datotekiPateki;
            }
            set
            {
                _datotekiPateki = value;
                OnPropertyChanged("datotekiPateki");
            }
        }

        private int _brojDatoteki;
        public int brojDatoteki
        {
            get
            {
                return _brojDatoteki;
            }
            set
            {
                _brojDatoteki = value;
                OnPropertyChanged("brojDatoteki");
            }
        }

        public Proekt(int ID, string ime)
        {
            this.ID = ID;
            this.ime = ime;
        }

        public Proekt(int ID, string ime, string pateka, string sektorskiPateka, string nasPateka, string spodeluvanjePateka, string mcafeeServerPateka)
        {
            this.ID = ID;
            this.ime = ime;
            this.pateka = pateka;

            celnaPatekaSektorski = sektorskiPateka + "\\" + this.ime;
            zipPatekaSektorski = celnaPatekaSektorski + "_" + DateTime.Today.ToString(Konstanti.OSNOVEN_DATUM_FORMAT) + Konstanti.ZIP_FORMAT;

            celnaPatekaNAS = nasPateka + "\\" + this.ime;
            zipPatekaNAS = celnaPatekaNAS + "_" + DateTime.Today.ToString(Konstanti.OSNOVEN_DATUM_FORMAT) + Konstanti.ZIP_FORMAT;

            celnaPatekaSpodeluvanje = spodeluvanjePateka + "\\" + this.ime;
            zipPatekaSpodeluvanje = celnaPatekaSpodeluvanje + "_" + DateTime.Today.ToString(Konstanti.OSNOVEN_DATUM_FORMAT) + Konstanti.ZIP_FORMAT;

            celnaPatekaMcafeeServer = mcafeeServerPateka + "\\" + this.ime;
            zipPatekaMcafeeServer = celnaPatekaMcafeeServer + "_" + DateTime.Today.ToString(Konstanti.OSNOVEN_DATUM_FORMAT) + Konstanti.ZIP_FORMAT;

            pechatiPapkiPateki = false;
            papkiPateki = Directory.GetDirectories(pateka, "*", SearchOption.AllDirectories);
            brojPapki = papkiPateki.Length;

            pechatiPapkiDatoteki = false;
            datotekiPateki = Directory.GetFiles(pateka, "*.*", SearchOption.AllDirectories);
            brojDatoteki = datotekiPateki.Length;
        }

        public override string ToString()
        {
            string ishod = "";

            ishod += "----- Proekt -----";
            ishod += "ID: " + ID + Environment.NewLine;
            ishod += "Ime: " + ime + Environment.NewLine;
            ishod += "Pateka: " + pateka + Environment.NewLine;

            ishod += "Celna Pateka - Sektorski: " + celnaPatekaSektorski + Environment.NewLine;
            ishod += "ZIP Pateka - Sektorski: " + zipPatekaSektorski + Environment.NewLine;

            ishod += "Celna Pateka - NAS: " + celnaPatekaNAS + Environment.NewLine;
            ishod += "ZIP Pateka - NAS: " + zipPatekaNAS + Environment.NewLine;

            ishod += "Celna Pateka - Spodeluvanje: " + celnaPatekaSpodeluvanje + Environment.NewLine;
            ishod += "ZIP Pateka - NAS: " + zipPatekaSpodeluvanje + Environment.NewLine;

            ishod += "Celna Pateka - Mcafee Server: " + celnaPatekaMcafeeServer + Environment.NewLine;
            ishod += "ZIP Pateka - Mcafee Server: " + zipPatekaMcafeeServer + Environment.NewLine;

            ishod += "brojPapki: " + brojPapki + Environment.NewLine;

            if (pechatiPapkiPateki)
            {
                foreach (string p in papkiPateki)
                {
                    ishod += "Papka pateka: " + p + Environment.NewLine;
                }
            }

            ishod += "brojDatoteki: " + brojDatoteki + Environment.NewLine;

            if (pechatiPapkiDatoteki)
            {
                foreach (string p in datotekiPateki)
                {
                    ishod += "Papka datoteka: " + p + Environment.NewLine;
                }
            }

            return ishod;
        }
    }
}
