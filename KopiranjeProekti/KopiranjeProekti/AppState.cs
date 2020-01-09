using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Diagnostics;
using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;

namespace KopiranjeProekti
{
    public class AppState : Notifier
    {
        protected XmlNode xmlKoren;
        protected MainWindow mainWindow;
        protected XmlDocument proektiXML;
        protected XmlNodeList proektiXMLList;

        public bool DebugMode;

        private string _opisNaSoftverot;
        public string opisNaSoftverot
        {
            get
            {
                return _opisNaSoftverot;
            }
            set
            {
                _opisNaSoftverot = value;
                OnPropertyChanged("opisNaSoftverot");
            }
        }

        private string _vrstaNaSoftverot;
        public string vrstaNaSoftverot
        {
            get
            {
                return _vrstaNaSoftverot;
            }
            set
            {
                _vrstaNaSoftverot = value;
                OnPropertyChanged("vrstaNaSoftverot");
            }
        }

        private string _tvorec;
        public string tvorec
        {
            get
            {
                return _tvorec;
            }
            set
            {
                _tvorec = value;
                OnPropertyChanged("tvorec");
            }
        }

        private CelnaPateka _sektorskiCelnaPateka;
        public CelnaPateka sektorskiCelnaPateka
        {
            get
            {
                return _sektorskiCelnaPateka;
            }
            set
            {
                _sektorskiCelnaPateka = value;
                OnPropertyChanged("sektorskiCelnaPateka");
            }
        }

        private CelnaPateka _nasCelnaPateka;
        public CelnaPateka nasCelnaPateka
        {
            get
            {
                return _nasCelnaPateka;
            }
            set
            {
                _nasCelnaPateka = value;
                OnPropertyChanged("nasCelnaPateka");
            }
        }

        private CelnaPateka _spodeluvanjeCelnaPateka;
        public CelnaPateka spodeluvanjeCelnaPateka
        {
            get
            {
                return _spodeluvanjeCelnaPateka;
            }
            set
            {
                _spodeluvanjeCelnaPateka = value;
                OnPropertyChanged("spodeluvanjeCelnaPateka");
            }
        }

        private CelnaPateka _mcafeeServerCelnaPateka;
        public CelnaPateka mcafeeServerCelnaPateka
        {
            get
            {
                return _mcafeeServerCelnaPateka;
            }
            set
            {
                _mcafeeServerCelnaPateka = value;
                OnPropertyChanged("mcafeeServerCelnaPateka");
            }
        }

        private CelnaPateka _poZhelbaCelnaPateka;
        public CelnaPateka poZhelbaCelnaPateka
        {
            get
            {
                return _poZhelbaCelnaPateka;
            }
            set
            {
                _poZhelbaCelnaPateka = value;
                OnPropertyChanged("poZhelbaCelnaPateka");
            }
        }

        private string _statusBarPoraka;
        public string statusBarPoraka
        {
            get
            {
                return _statusBarPoraka;
            }
            set
            {
                _statusBarPoraka = value;
                OnPropertyChanged("statusBarPoraka");
            }
        }

        private bool _arhivirajProekt;
        public bool arhivirajProekt
        {
            get
            {
                return _arhivirajProekt;
            }
            set
            {
                _arhivirajProekt = value;
                OnPropertyChanged("arhivirajProekt");
            }
        }

        private int _brojProekti;
        public int brojProekti
        {
            get
            {
                return _brojProekti;
            }
            set
            {
                _brojProekti = value;
                OnPropertyChanged("brojProekti");
            }
        }

        private ObservableCollection<Proekt> _proekti;
        public ObservableCollection<Proekt> proekti
        {
            get
            {
                return _proekti;
            }
            set
            {
                _proekti = value;
                OnPropertyChanged("proekti");
            }
        }

        private bool _kopirajNaSektorskiDisk;
        public bool kopirajNaSektorskiDisk
        {
            get
            {
                return _kopirajNaSektorskiDisk;
            }
            set
            {
                _kopirajNaSektorskiDisk = value;
                OnPropertyChanged("kopirajNaSektorskiDisk");
            }
        }

        private string _sektorskiPateka;
        public string sektorskiPateka
        {
            get
            {
                return _sektorskiPateka;
            }
            set
            {
                _sektorskiPateka = value;
                OnPropertyChanged("sektorskiPateka");
            }
        }

        private bool _kopirajNaNASDisk;
        public bool kopirajNaNASDisk
        {
            get
            {
                return _kopirajNaNASDisk;
            }
            set
            {
                _kopirajNaNASDisk = value;
                OnPropertyChanged("kopirajNaNASDisk");
            }
        }

        private string _nasPateka;
        public string nasPateka
        {
            get
            {
                return _nasPateka;
            }
            set
            {
                _nasPateka = value;
                OnPropertyChanged("nasPateka");
            }
        }

        private bool _kopirajNaSpodeluvanjeDisk;
        public bool kopirajNaSpodeluvanjeDisk
        {
            get
            {
                return _kopirajNaSpodeluvanjeDisk;
            }
            set
            {
                _kopirajNaSpodeluvanjeDisk = value;
                OnPropertyChanged("kopirajNaSpodeluvanjeDisk");
            }
        }

        private string _spodeluvanjePateka;
        public string spodeluvanjePateka
        {
            get
            {
                return _spodeluvanjePateka;
            }
            set
            {
                _spodeluvanjePateka = value;
                OnPropertyChanged("spodeluvanjePateka");
            }
        }

        private bool _kopirajNaMcafeeServer;
        public bool kopirajNaMcafeeServer
        {
            get
            {
                return _kopirajNaMcafeeServer;
            }
            set
            {
                _kopirajNaMcafeeServer = value;
                OnPropertyChanged("kopirajNaMcafeeServer");
            }
        }

        private string _mcafeeServerPateka;
        public string mcafeeServerPateka
        {
            get
            {
                return _mcafeeServerPateka;
            }
            set
            {
                _mcafeeServerPateka = value;
                OnPropertyChanged("mcafeeServerPateka");
            }
        }

        private bool _kopirajNaPoZhelbaPateka;
        public bool kopirajNaPoZhelbaPateka
        {
            get
            {
                return _kopirajNaPoZhelbaPateka;
            }
            set
            {
                _kopirajNaPoZhelbaPateka = value;
                OnPropertyChanged("kopirajNaPoZhelbaPateka");
            }
        }

        private string _poZhelbaPateka;
        public string poZhelbaPateka
        {
            get
            {
                return _poZhelbaPateka;
            }
            set
            {
                _poZhelbaPateka = value;
                OnPropertyChanged("poZhelbaPateka");
            }
        }

        private Proekt _izbranProekt;
        public Proekt izbranProekt
        {
            get
            {
                return _izbranProekt;
            }
            set
            {
                _izbranProekt = value;
                OnPropertyChanged("izbranProekt");
            }
        }

        public AppState(MainWindow mainWindow)
        {
            init(mainWindow);
        }

        public void init(MainWindow mainWindow)
        {
            try
            {
                opisNaSoftverot = "Kопирање папка со нејзината содржина на неколку преодредени патеки.";
                vrstaNaSoftverot = "Врста: " + Assembly.GetExecutingAssembly().GetName().Version.ToString();
                tvorec = "Изработил: Владимир Закар \u00a9 2019";
                statusBarPoraka = "";

                DebugMode = KopiranjeProektiPostavki.Default.DebugMode;

                this.mainWindow = mainWindow;

                kopirajNaSektorskiDisk = false;
                kopirajNaNASDisk = true;
                kopirajNaSpodeluvanjeDisk = true;
                kopirajNaMcafeeServer = false;

                arhivirajProekt = false;

                vchitajXML();
            }
            catch (Exception ex)
            {
                statusBarPoraka = new StackTrace(ex, true).GetFrame(1).GetMethod().Name + "(): " + ex.Message;
            }
        }

        public void vchitajXML()
        {
            Proekt proekt;

            brojProekti = 0;
            proektiXML = new XmlDocument();

            if (DebugMode)
            {
                proektiXML.Load(Konstanti.PROEKTI_XML_PATEKA_DEBUG);
            }
            else
            {
                proektiXML.Load(Konstanti.PROEKTI_XML_PATEKA);
            }

            xmlKoren = proektiXML.ChildNodes[1];

            sektorskiPateka = xmlKoren.ChildNodes[0].InnerText;
            sektorskiCelnaPateka = new CelnaPateka(sektorskiPateka);

            nasPateka = xmlKoren.ChildNodes[1].InnerText;
            nasCelnaPateka = new CelnaPateka(nasPateka);

            spodeluvanjePateka = xmlKoren.ChildNodes[2].InnerText;
            spodeluvanjeCelnaPateka = new CelnaPateka(spodeluvanjePateka);

            mcafeeServerPateka = xmlKoren.ChildNodes[3].InnerText;
            mcafeeServerCelnaPateka = new CelnaPateka(mcafeeServerPateka);

            poZhelbaPateka = xmlKoren.ChildNodes[4].InnerText;
            poZhelbaCelnaPateka = new CelnaPateka(poZhelbaPateka);

            proekti = new ObservableCollection<Proekt>();
            proektiXMLList = proektiXML.GetElementsByTagName("proekt");

            proekt = new Proekt(brojProekti, Poraki.ODBERI_PROEKT_MSG);

            proekti.Add(proekt);

            foreach (XmlNode node in proektiXMLList)
            {
                brojProekti += 1;

                proekt = new Proekt(
                    brojProekti,
                    node.ChildNodes[0].InnerText,
                    node.ChildNodes[1].InnerText,
                    sektorskiPateka,
                    nasPateka,
                    spodeluvanjePateka,
                    mcafeeServerPateka);

                proekti.Add(proekt);
            }

            izbranProekt = proekti[0];
        }

        public void reset()
        {
            sektorskiCelnaPateka.reset();
            nasCelnaPateka.reset();
            spodeluvanjeCelnaPateka.reset();
            mcafeeServerCelnaPateka.reset();
            poZhelbaCelnaPateka.reset();
        }

        public void kopirajProekti()
        {
            try
            {

                statusBarPoraka = "";

                if (kopirajNaSektorskiDisk)
                {
                    sektorskiCelnaPateka.iskopirajPapkiIDatoteki = 
                        new Task(() => sektorskiCelnaPateka.kopirajPapki(izbranProekt));

                    sektorskiCelnaPateka.iskopirajPapkiIDatoteki.ContinueWith(delegate
                    {
                        sektorskiCelnaPateka.kopirajDatoteki(izbranProekt);
                    });

                    sektorskiCelnaPateka.iskopirajPapkiIDatoteki.Start();
                }

                if (kopirajNaNASDisk)
                {
                    nasCelnaPateka.iskopirajPapkiIDatoteki = 
                        new Task(() => nasCelnaPateka.kopirajPapki(izbranProekt));

                    nasCelnaPateka.iskopirajPapkiIDatoteki.ContinueWith(delegate
                    {
                        nasCelnaPateka.kopirajDatoteki(izbranProekt);
                    });

                    nasCelnaPateka.iskopirajPapkiIDatoteki.Start();
                }

                if (kopirajNaSpodeluvanjeDisk)
                {
                    spodeluvanjeCelnaPateka.iskopirajPapkiIDatoteki = 
                        new Task(() => spodeluvanjeCelnaPateka.kopirajPapki(izbranProekt));

                    spodeluvanjeCelnaPateka.iskopirajPapkiIDatoteki.ContinueWith(delegate
                    {
                        spodeluvanjeCelnaPateka.kopirajDatoteki(izbranProekt);
                    });

                    spodeluvanjeCelnaPateka.iskopirajPapkiIDatoteki.Start();
                }

                if (kopirajNaMcafeeServer)
                {
                    mcafeeServerCelnaPateka.iskopirajPapkiIDatoteki =
                        new Task(() => mcafeeServerCelnaPateka.kopirajPapki(izbranProekt));

                    mcafeeServerCelnaPateka.iskopirajPapkiIDatoteki.ContinueWith(delegate
                    {
                        mcafeeServerCelnaPateka.kopirajDatoteki(izbranProekt);
                    });

                    mcafeeServerCelnaPateka.iskopirajPapkiIDatoteki.Start();
                }

                if (kopirajNaPoZhelbaPateka)
                {
                    poZhelbaCelnaPateka.iskopirajPapkiIDatoteki =
                        new Task(() => poZhelbaCelnaPateka.kopirajPapki(izbranProekt));

                    poZhelbaCelnaPateka.iskopirajPapkiIDatoteki.ContinueWith(delegate
                    {
                        poZhelbaCelnaPateka.kopirajDatoteki(izbranProekt);
                    });

                    poZhelbaCelnaPateka.iskopirajPapkiIDatoteki.Start();
                }
            }
            catch (Exception ex)
            {
                statusBarPoraka = new StackTrace(ex, true).GetFrame(1).GetMethod().Name + "(): " + ex.Message;
            }
        }
    }
}
