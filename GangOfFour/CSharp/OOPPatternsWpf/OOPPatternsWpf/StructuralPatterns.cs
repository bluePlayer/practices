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
using OOPPatternsWpf.FacadePattern;
using OOPPatternsWpf.CompositePattern;
using OOPPatternsWpf.DecoratorPattern;

namespace OOPPatternsWpf
{
    partial class MainWindow
    {
        private void decoratorPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            CircleDecorator c = new CircleDecorator();
            Console.WriteLine(c.StrFunc());

            ColoredShape cc = new ColoredShape("red", c);
            Console.WriteLine(cc.StrFunc());

            // Create a decorated Window with horizontal and vertical scrollbars
            DPWindow decoratedWindow = new HorizontalScrollBarDecorator(
                    new VerticalScrollBarDecorator(new SimpleWindow()));

            // Print the Window's description
            Console.WriteLine(decoratedWindow.GetDescription());

            Coffee kafica = new SimpleCoffee();
            Utils.printInfo(kafica);

            kafica = new WithMilk(kafica);
            Utils.printInfo(kafica);

            kafica = new WithSprinkles(kafica);
            Utils.printInfo(kafica);
        }

        private void facadePatternBtn_Click(object sender, RoutedEventArgs e)
        {
            CarFacade cf = new CarFacade();
            cf.CreateCompleteCar();
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

        private void compositePatternBtn_Click(object sender, RoutedEventArgs e)
        {
            // initialize variables
            var compositeGraphic = new CompositeGraphic("Graphic");
            var compositeGraphic1 = new CompositeGraphic("Graphic1");
            var compositeGraphic2 = new CompositeGraphic("Graphic2");

            //Add 1 Graphic to compositeGraphic1
            compositeGraphic1.Add(new Ellipse(-8, -9, 10, 20));

            compositeGraphic1.AddRange(new Ellipse(35, 49, 35,15),
                new Circle(5, 5, 37),
                new Rectangle(9, 8, 10, 10), 
                new Square(-19, -23, 40));

            //Add 2 Graphic to compositeGraphic2
            compositeGraphic2.AddRange(new Ellipse(36, 74, 100, 135),
                new Ellipse(-1, -13, 25, 90));

            /*Add 1 Graphic, compositeGraphic1, and 
              compositeGraphic2 to compositeGraphic */
            compositeGraphic.AddRange(new Ellipse(0, 0, 23, 34),
                compositeGraphic1,
                new Circle(5, 5, 37),
                compositeGraphic2);

            compositeGraphic.AddRange(new Ellipse(55, 11, 30, 35),
                new Rectangle(10, 10, 20, 50),
                new Rectangle(5, 5, 30, 45),
                new Circle(5, 5, 37));

            /*Prints the complete graphic 
            (four times the string "Ellipse").*/
            compositeGraphic.Print();
            Console.ReadLine();
        }
    }
}
