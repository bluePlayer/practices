using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration.Install;
using System.Collections;

namespace KopiranjeProekti
{
    /*
     * Installer Class Events in order
    Commit
    Install
    OnAfterInstall
    OnAfterRollback
    OnAfterUninstall
    OnBeforeInstall
    OnBeforeRollback
    OnBeforeUninstall
    OnCommitted
    OnCommitting
    Rollback
    Uninstall
    */
    [RunInstaller(true)]
    public class InstallerKlasa:Installer
    {
        public InstallerKlasa() : base()
        {
            // Attach the 'Committed' event.
            this.Committed += new InstallEventHandler(MyInstaller_Committed);
            // Attach the 'Committing' event.
            this.Committing += new InstallEventHandler(MyInstaller_Committing);

        }

        // Event handler for 'Committing' event.
        private void MyInstaller_Committing(object sender, InstallEventArgs e)
        {
            Console.WriteLine("");
            Console.WriteLine("Committing Event occurred.");
            Console.WriteLine("");
        }

        // Event handler for 'Committed' event.
        private void MyInstaller_Committed(object sender, InstallEventArgs e)
        {
            Console.WriteLine("");
            Console.WriteLine("Committed Event occurred.");
            Console.WriteLine("");
        }

        // Override the 'Install' method.
        public override void Install(IDictionary stateSaver)
        {
            base.Install(stateSaver);

            stateSaver.Add("TargetDir", Context.Parameters["DP_TargetDir"].ToString());
        }

        // Override the 'Commit' method.
        public override void Commit(IDictionary savedState)
        {
            base.Commit(savedState);
        }

        // Override the 'Rollback' method.
        public override void Rollback(IDictionary savedState)
        {
            base.Rollback(savedState);
        }
    }
}
