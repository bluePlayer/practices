using System.Collections.Generic;
public class CompositeTerminalSymbol:ITerminalSymbol
{
    private string symbolName{get;set;}
    private readonly List<ITerminalSymbol> terminalSymbols;
    public CompositeTerminalSymbol(string sn)
    {
        symbolName = sn;
        terminalSymbols = new List<ITerminalSymbol>();
    }

    public void Add(ITerminalSymbol graphic)
    {
        terminalSymbols.Add(graphic);
    }

    public void AddRange(params ITerminalSymbol[] terminalSymbol)
    {
        terminalSymbols.AddRange(terminalSymbol);
    }

    public void Delete(ITerminalSymbol terminalSymbol)
    {
        terminalSymbols.Remove(terminalSymbol);
    }

    public void Print(string str)
    {
        foreach(var childSymbol in terminalSymbols)
        {
            childSymbol.Print(str + " " + symbolName);
        }
    }
}