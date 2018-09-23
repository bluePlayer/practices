using System;
class TerminalExpression: AbstractExpression
{
    public override void Interpret(Context context)
    {
        Console.WriteLine("Called Terminal.Interpret()");
    }
}