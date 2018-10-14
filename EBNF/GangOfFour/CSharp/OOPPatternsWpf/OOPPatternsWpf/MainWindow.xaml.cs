﻿using System.Windows;
using OOPPatternsWpf.ClassAdapterPattern;
using OOPPatternsWpf.ObjectAdapterPattern;
using OOPPatternsWpf.AdapterTrial3;
using OOPPatternsWpf.FactoryMethod;
using OOPPatternsWpf.AbstractFactory;
using OOPPatternsWpf.BridgePattern;
using OOPPatternsWpf.PrototypePattern;
using OOPPatternsWpf.ObserverPattern;
using System.Collections.Generic;

namespace OOPPatternsWpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        OOPPatternsMainWindowMVVM mvvm;

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

            // Code with old classes but works
            //a = new ClassA();
            //b = new ClassB();

            //ClassAFormat1Adapter adapter = new ClassAFormat1Adapter();

            //IStringProvider strProvider = (IStringProvider)(adapter.adapt(a));
            //string field = strProvider.getStringData();
            //b.setStringData(field);

            //statusBarTB.Text = b.getStringData();

        }

        private void factoryMethodPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            FormatFactory ff = new FormatFactory();

            IStringFormat hash = ff.GetFormat(FormatsType.FormatHash);
            IStringFormat forwardSlash = ff.GetFormat(FormatsType.FormatForwardSlash);
            IStringFormat dots = ff.GetFormat(FormatsType.FormatDots);

            statusBarTB.Text = 
                "Hash: " + hash.getFormat("Hello World") + ", " +
                "forward slash: " + forwardSlash.getFormat("New world of Programming Awaits You") + ", " +
                "dots: " + dots.getFormat("GoF Patterns in C#");
        }

        private void abstractFactoryPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            var appearance = OOPPatternsSettings.Default.Appearance;

            IGUIFactory factory;

            try
            {

                switch (appearance)
                {
                    case Constants.WIN_APPEARANCE:
                        factory = new WinFactory();
                        break;

                    case Constants.OSX_APPEARANCE:
                        factory = new OSXFactory();
                        break;

                    default:
                        throw new System.NotImplementedException();
                }

                var button = factory.CreateButton();
                button.Paint();
            }
            catch(System.Exception ex)
            {
                if(ex.GetType() == typeof(System.NotImplementedException))
                {
                    statusBarTB.Text = "That format of type " + appearance + ", wasn't implemented!";
                }
            }
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

        private void prototypePatternBtn_Click(object sender, RoutedEventArgs e)
        {
            ConcretePrototype1 p1 = new ConcretePrototype1();
            p1.proto1Field = 10;

            ConcretePrototype2 p2 = new ConcretePrototype2();
            p2.proto2Field = 20;

            ConcretePrototype1 p11 = (ConcretePrototype1)p1.Clone();

            ConcretePrototype2 p22 = (ConcretePrototype2)p2.Clone();

            statusBarTB.Text = "proto 1: " + p11.proto1Field + ", proto 2: " + p22.proto2Field;
        }

        private void observerPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            statusBarTB.Text = mvvm.os.getObserversState();
        }

        private void unregisterA_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osA);
        }

        private void registerA_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osA = new ObserverA();
            mvvm.os.registerObserver(mvvm.osA);
        }

        private void unregisterB_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osB);
        }

        private void registerB_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osB = new ObserverB();
            mvvm.os.registerObserver(mvvm.osB);
        }

        private void unregisterC_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osC);
        }

        private void registerC_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osC = new ObserverC();
            mvvm.os.registerObserver(mvvm.osC);
        }

        private void chooseStateCB_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            mvvm.os.subjectState = ((ObserverState)chooseStateCB.SelectedValue);
        }
    }
}
