using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using OOPPatternsWpf.BridgePattern;
using OOPPatternsWpf.AdapterTrial3;
using OOPPatternsWpf.ClassAdapterPattern;
using OOPPatternsWpf.ObjectAdapterPattern;
using OOPPatternsWpf.FactoryMethod;

namespace OOPPatternsWpf
{
    partial class MainWindow
    {
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

        /// <summary>
        /// link: https://en.wikipedia.org/wiki/Adapter_pattern
        /// TODO Add Adapter factory with formats.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void adapterTrial3PatternBtn_Click(object sender, RoutedEventArgs e)
        {
            string data = "";
            ClassA a = new ClassA();
            ClassB b = new ClassB();

            AdapterFormatsFactory aff = new AdapterFormatsFactory();

            IStringFormat hashFormat = aff.GetFormat(AdapterFormatsType.ClassFormatHash, a);
            IStringFormat forwardSlashFormat = aff.GetFormat(AdapterFormatsType.ClassFormatForwardSlash, a);
            IStringFormat dotsFormat = aff.GetFormat(AdapterFormatsType.ClassFormatDots, a);

            FormatHashAdapter hashAdapter = new FormatHashAdapter();
            IStringProvider hashProvider = (IStringProvider)(hashAdapter.adapt(a));
            data = hashProvider.getStringData();
            statusBarTB.Text += "hashAdapter: " + data + ", ";

            FormatForwardSlashAdapter forwardSlashAdapter = new FormatForwardSlashAdapter();
            IStringProvider forwardSlashProvider = (IStringProvider)(forwardSlashAdapter.adapt(a));
            data = forwardSlashProvider.getStringData();
            statusBarTB.Text += "forwardSlashProvider: " + data + ", ";

            FormatDotsAdapter forwardDotsAdapter = new FormatDotsAdapter();
            IStringProvider dotsProvider = (IStringProvider)(forwardDotsAdapter.adapt(a));
            data = dotsProvider.getStringData();
            statusBarTB.Text += "dotsProvider: " + data + ", ";

            b.setStringData(data);

            statusBarTB.Text += "\n Class B: " + b.getStringData();

            // TODO Code with old classes but works
            //a = new ClassA();
            //b = new ClassB();

            //ClassAFormat1Adapter adapter = new ClassAFormat1Adapter();

            //IStringProvider strProvider = (IStringProvider)(adapter.adapt(a));
            //string field = strProvider.getStringData();
            //b.setStringData(field);

            //statusBarTB.Text = b.getStringData();
        }

        private void bridgePatternBtn_Click(object sender, RoutedEventArgs e)
        {
            IDeviceBridge lightSwitch = new LightSwitch();
            IDeviceBridge tvSwitch = new TVSwitch();
            IDeviceBridge radioSwitch = new RadioSwitch();

            DeviceBridge db = new DeviceBridge(lightSwitch);
            statusBarTB.Text = db.On() + ", ";

            db = new DeviceBridge(tvSwitch);
            statusBarTB.Text += db.Off() + ", ";

            db = new DeviceBridge(radioSwitch);
            statusBarTB.Text += db.On();
        }
    }
}
