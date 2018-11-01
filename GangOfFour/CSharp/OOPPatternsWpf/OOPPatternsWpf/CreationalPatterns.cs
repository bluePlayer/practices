using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using OOPPatternsWpf.AbstractFactory;
using OOPPatternsWpf.FactoryMethod;
using OOPPatternsWpf.PrototypePattern;
using OOPPatternsWpf.BuilderPattern;

namespace OOPPatternsWpf
{
    partial class MainWindow
    {
        private void builderPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            var builder = new LamborgihiniBuilder();
            var director = new SportsCarBuildDirector(builder);

            director.Construct();
            BP_Car myRaceCar = builder.GetResult();

            builder.NumDoors = 4;
            //builder = new PeugeotBuilder();
            myRaceCar = builder.GetResult();

            statusBarTB.Text = myRaceCar.GetCarInfo();

            // C# StringBuilder

            StringBuilder sb = new StringBuilder();
            sb.Append("Test String Builder");
            
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
            catch (System.Exception ex)
            {
                if (ex.GetType() == typeof(System.NotImplementedException))
                {
                    statusBarTB.Text = "That format of type " + appearance + ", wasn't implemented!";
                }
            }
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
    }
}
