using System.Windows;
using OOPPatternsWpf.ObserverPattern;
using System.Collections.Generic;
using OOPPatternsWpf.FacadePattern;

namespace OOPPatternsWpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        OOPPatternsMainWindowMVVM mvvm;
        ChatWindow cw;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            // TODO is there a way to initialize DataContext window without using contructors???
            mvvm = new OOPPatternsMainWindowMVVM(); // (OOPPatternsMainWindowMVVM)this.DataContext;

            mvvm.osStates = new List<ObserverState>();
            mvvm.subject = new ProxyClass();
            mvvm.os = new ObserverSubject();
            mvvm.osA = new ObserverA();
            mvvm.osB = new ObserverB();
            mvvm.osC = new ObserverC();

            ObserverState stateInit = new ObserverState(1, Constants.OBSERVER_STATE_INIT);
            mvvm.osStates.Add(stateInit);

            ObserverState stateReady = new ObserverState(2, Constants.OBSERVER_STATE_READY);
            mvvm.osStates.Add(stateReady);

            ObserverState stateProcessing = new ObserverState(3, Constants.OBSERVER_STATE_PROCESSIND);
            mvvm.osStates.Add(stateProcessing);

            ObserverState stateDone = new ObserverState(4, Constants.OBSERVER_STATE_DONE);
            mvvm.osStates.Add(stateDone);

            chooseStateCB.ItemsSource = mvvm.osStates;

            this.DataContext = mvvm;

            cw = new ChatWindow();
        }

        private void openChatWindowBtn_Click(object sender, RoutedEventArgs e)
        {
            cw.Show();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            cw.Close();
            App.Current.Shutdown();
        }
    }
}
