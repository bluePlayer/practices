using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf
{
    class ProxyCar:ICar
    {
        private Driver driver;
        public ICar realCar;

        public ProxyCar(Driver d)
        {
            driver = d;
            realCar = new Car();
        }

        public void DriveCar()
        {
            if (driver.Age < 16)
            {
                Console.WriteLine("Sorry, the driver is too young to drive.");
            }
            else
            {
                this.realCar.DriveCar();
            }
        }
    }
}
