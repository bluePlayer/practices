using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace KopiranjeProekti
{
    public class CelnaPateka : Notifier
    {
        private string _pateka;
        public string pateka
        {
            get
            {
                return _pateka;
            }
            private set
            {
                _pateka = value;
                OnPropertyChanged("pateka");
            }
        }

        private string _celnaPateka;
        public string celnaPateka
        {
            get
            {
                return _celnaPateka;
            }
            private set
            {
                _celnaPateka = value;
                OnPropertyChanged("celnaPateka");
            }
        }

        private int _postoKopiranjePapki;
        public int postoKopiranjePapki
        {
            get
            {
                return _postoKopiranjePapki;
            }
            private set
            {
                _postoKopiranjePapki = value;
                OnPropertyChanged("postoKopiranjePapki");
            }
        }

        private int _postoKopiranjeDatoteki;
        public int postoKopiranjeDatoteki
        {
            get
            {
                return _postoKopiranjeDatoteki;
            }
            private set
            {
                _postoKopiranjeDatoteki = value;
                OnPropertyChanged("postoKopiranjeDatoteki");
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

        private string _statusBarPorakaPapki;
        public string statusBarPorakaPapki
        {
            get
            {
                return _statusBarPorakaPapki;
            }
            private set
            {
                _statusBarPorakaPapki = value;
                OnPropertyChanged("statusBarPorakaPapki");
            }
        }

        private string _statusBarPorakaDatoteki;
        public string statusBarPorakaDatoteki
        {
            get
            {
                return _statusBarPorakaDatoteki;
            }
            private set
            {
                _statusBarPorakaDatoteki = value;
                OnPropertyChanged("statusBarPorakaDatoteki");
            }
        }

        private bool _iskopiraniPapki;
        public bool iskopiraniPapki
        {
            get
            {
                return _iskopiraniPapki;
            }
            private set
            {
                _iskopiraniPapki = value;
                OnPropertyChanged("iskopiraniPapki");
            }
        }

        public Task iskopirajPapkiIDatoteki;

        public CelnaPateka(string pateka)
        {
            iskopiraniPapki = false;
            this.pateka = pateka;
        }

        public void reset()
        {
            statusBarPorakaPapki = "";
            statusBarPorakaDatoteki = "";
        }

        public void kopirajPapki(Proekt proekt)
        {
            int brojach = 0;

            try
            {
                this.celnaPateka = this.pateka + "\\" + proekt.ime;
                brojach = 0;
                postoKopiranjePapki = 0;

                // TODO System.IO.Compression.ZipFile postoi od .NET 4.5 vo System.IO.Compression.FileSystem
                //if (arhivirajProekt)
                //{
                //    if(File.Exists(izbranProekt.zipPatekaSektorski))
                //    {
                //        File.Delete(izbranProekt.zipPatekaSektorski);
                //    }

                //    System.IO.Compression.ZipFile.CreateFromDirectory(izbranProekt.pateka, izbranProekt.zipPatekaSektorski);
                //}

                if (Directory.Exists(celnaPateka))
                {
                    Directory.Delete(celnaPateka, true);
                }

                foreach (string dirPath in proekt.papkiPateki)
                {
                    Directory.CreateDirectory(dirPath.Replace(proekt.pateka, celnaPateka));
                    brojach += 1;
                    postoKopiranjePapki = (brojach * 100) / proekt.brojPapki;
                    statusBarPorakaPapki = "Снимив " + postoKopiranjePapki + "% од папките. ";

                    if(brojach == proekt.brojPapki)
                    {
                        iskopiraniPapki = true;
                    }
                } 
            }
            catch (Exception ex)
            {
                iskopiraniPapki = false;
                statusBarPorakaPapki = ex.Message;
            }
        }

        public void kopirajDatoteki(Proekt proekt)
        {
            int brojach = 0;

            try
            {
                if (iskopiraniPapki)
                {
                    brojach = 0;
                    postoKopiranjeDatoteki = 0;

                    foreach (string newPath in proekt.datotekiPateki)
                    {
                        File.Copy(newPath, newPath.Replace(proekt.pateka, celnaPateka), true);
                        brojach += 1;
                        postoKopiranjeDatoteki = (brojach * 100) / proekt.brojDatoteki;
                        statusBarPorakaDatoteki = "Снимив " + postoKopiranjeDatoteki + "% од датотеките. ";
                    }

                    iskopiraniPapki = false;    
                }
                else
                {
                    throw new NeiskopiraniPapkiException("Не си ископирани папките! Ископирајте ги прво папките со повикување на функцијата kopirajPapki(). ");
                }
            }
            catch (Exception ex)
            {
                statusBarPorakaDatoteki = ex.Message;
            }
        }
    }
}
