using System;

class NonterminalExpression:AbstractExpression
{
    public override void Interpret(Context context)
    {
        Console.WriteLine("Called Nonterminal.Interpret()");
    }
}