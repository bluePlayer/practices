using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace KopiranjeProekti
{
    public class Pomagala
    {
        public static string snimiPapki(string izvornaPateka, string celnaPateka, string msg)
        {
            string ishod = msg;

            try
            {
                foreach (string dirPath in Directory.GetDirectories(izvornaPateka, "*", SearchOption.AllDirectories))
                {
                    Directory.CreateDirectory(dirPath.Replace(izvornaPateka, celnaPateka));
                }

                return ishod;
            }
            catch(Exception ex)
            {
                ishod = ex.Message;
                return ishod;
            }
        }

        public static string snimiDatoteki(string izvornaPateka, string celnaPateka, string msg)
        {
            string ishod = msg;

            try
            { 
                foreach (string newPath in Directory.GetFiles(izvornaPateka, "*.*", SearchOption.AllDirectories))
                {
                    File.Copy(newPath, newPath.Replace(izvornaPateka, celnaPateka), true);
                }

                return ishod;
            }
            catch(Exception ex)
            {
                ishod = ex.Message;
                return ishod;
            }
        }
    }
}
