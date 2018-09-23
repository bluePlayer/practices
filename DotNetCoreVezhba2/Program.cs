using System;
using System.Collections.Generic;

namespace DotNetCoreVezhba2
{
    class Program
    {
        private static bool exeCommandPattern = false;
        private static bool exeInterpretPattern = false;
        private static bool exeCompositePattern = false;

        private static bool exeCompositeTerminalSymbol = true;

        static void Main(string[] args)
        {
            if(exeCommandPattern)
            {
                string argument = args.Length > 0 ? args[0].ToUpper() : null;

                ISwitchable lamp = new Light();

                // Pass reference to the lamp instance to each command
                ICommand switchClose = new CloseSwitchCommand(lamp);
                ICommand switchOpen = new OpenSwitchCommand(lamp);

                // Pass reference to instances of the Command objects to the switch
                Switch @switch = new Switch(switchClose, switchOpen);

                if (argument == "ON" || argument == "on")
                {
                    // Switch (the Invoker) will invoke Execute() on the command object.
                    @switch.Open();
                }
                else if (argument == "OFF" || argument == "off")
                {
                    // Switch (the Invoker) will invoke the Execute() on the command object.
                    @switch.Close();
                }
                else
                {
                    Console.WriteLine("Argument \"ON\" or \"OFF\" is required.");
                }
            }

            if(exeInterpretPattern)
            {
                var context = new Context();

                // Usually a tree
                var expression = new List<AbstractExpression>();

                // Populate 'abstract syntax tree'
                expression.Add(new TerminalExpression());
                expression.Add(new NonterminalExpression());
                expression.Add(new TerminalExpression());
                expression.Add(new TerminalExpression());

                // Interpret
                foreach (AbstractExpression exp in expression)
                {
                    exp.Interpret(context);
                }
            }

            if(exeCompositePattern)
            {
                // composite pattern
                var compositeGraphic = new CompositeGraphic();
                var compositeGraphic1 = new CompositeGraphic();
                var compositeGraphic2 = new CompositeGraphic();

                compositeGraphic1.Add(new Ellipse());
                compositeGraphic2.AddRange(new Ellipse(), new Ellipse());

                compositeGraphic.AddRange(
                    new Ellipse(), 
                    compositeGraphic1, 
                    compositeGraphic2);

                compositeGraphic.Print();
                Console.ReadLine();
            }

            if(exeCompositeTerminalSymbol)
            {
                var bnfExpression = new CompositeTerminalSymbol("expression");
                var bnfPlus = new CompositeTerminalSymbol("plus");
                var bnfMinus = new CompositeTerminalSymbol("minus");
                var bnfVariable = new CompositeTerminalSymbol("variable");
                var bnfDigit = new CompositeTerminalSymbol("digit");
                var bnfNumber = new CompositeTerminalSymbol("number");

                bnfExpression.AddRange(
                    new TerminalSymbol("plus"), 
                    new TerminalSymbol("minus"), 
                    new TerminalSymbol("variable"), 
                    new TerminalSymbol("number"));

                bnfPlus.AddRange(bnfExpression, bnfExpression, new TerminalSymbol(" + "));
                bnfMinus.AddRange(bnfExpression, bnfExpression, new TerminalSymbol(" - "));
                bnfVariable.AddRange(
                    new TerminalSymbol("a"),
                    new TerminalSymbol("b"),
                    new TerminalSymbol("c"),
                    new TerminalSymbol("d"),
                    new TerminalSymbol("e"),
                    new TerminalSymbol("f"),
                    new TerminalSymbol("g")
                );

                bnfDigit.AddRange(
                    new TerminalSymbol("0"),
                    new TerminalSymbol("1"),
                    new TerminalSymbol("2"),
                    new TerminalSymbol("3"),
                    new TerminalSymbol("4"),
                    new TerminalSymbol("5"),
                    new TerminalSymbol("6"),
                    new TerminalSymbol("7"),
                    new TerminalSymbol("8"),
                    new TerminalSymbol("9")
                );

                bnfNumber.AddRange(bnfDigit, bnfDigit, bnfNumber);

                bnfExpression.Print(String.Empty);
                bnfPlus.Print(String.Empty);
                bnfMinus.Print(String.Empty);
                bnfVariable.Print(String.Empty);
                bnfDigit.Print(String.Empty);
                //bnfNumber.Print(string.Empty);

                Console.ReadLine();
            }
        }
    }
}
