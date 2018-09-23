public class OpenSwitchCommand:ICommand
{
    private ISwitchable _switchable;

    public OpenSwitchCommand(ISwitchable switchable)
    {
        _switchable = switchable;
    }

    public void Execute()
    {
        _switchable.PowerOn();
    }
}