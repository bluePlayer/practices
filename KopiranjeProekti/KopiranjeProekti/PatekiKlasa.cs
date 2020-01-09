using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KopiranjeProekti
{
    public class PatekiKlasa:Notifier
    {
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

        public PatekiKlasa(string sektorskiPateka, string nasPateka, string spodeluvanjePateka, string mcafeeServerPateka)
        {
            this.sektorskiPateka = sektorskiPateka;
            this.nasPateka = nasPateka;
            this.spodeluvanjePateka = spodeluvanjePateka;
            this.mcafeeServerPateka = mcafeeServerPateka;
        }
    }
}
