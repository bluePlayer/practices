public class Switch 
{
    ICommand _closedCommand;
    ICommand _oppenedCommand;

    public Switch(ICommand closedCommand, ICommand oppenedCommand)
    {
        this._closedCommand = closedCommand;
        this._oppenedCommand = oppenedCommand;
    }

    public void Close()
    {
        this._closedCommand.Execute();
    }
    
    public void Open()
    {
        this._oppenedCommand.Execute();
    }
}