using System;
public class TerminalSymbol:ITerminalSymbol
{
    private string symbolName{get; set;}

    public TerminalSymbol(string sn)
    {
        symbolName = sn;
    }
    public void Print(string str)
    {
        Console.WriteLine(str + " " +this.GetType().Name + ": " + symbolName);
    }
}