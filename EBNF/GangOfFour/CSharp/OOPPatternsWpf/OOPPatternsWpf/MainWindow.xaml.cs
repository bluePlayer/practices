using System.Windows;
using OOPPatternsWpf.ClassAdapterPattern;
using OOPPatternsWpf.ObjectAdapterPattern;

namespace OOPPatternsWpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Subject subject = new ProxyClass();
        }

        private void proxyPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            ICar car = new ProxyCar(new Driver(15));
            car.DriveCar();

            car = new ProxyCar(new Driver(25));
            car.DriveCar();
        }

        private void classAdapterPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            ClassAdaptorClient client = new ClassAdaptorClient();
            client.doWork();
        }

        private void objectAdapterPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            ObjectAdapterClient client = new ObjectAdapterClient();
            client.doWork();
        }
    }
}
