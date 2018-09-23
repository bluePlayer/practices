using System.Collections.Generic;
public class CompositeGraphic:IGraphic
{
    private readonly List<IGraphic> graphics;
    public CompositeGraphic()
    {
        graphics = new List<IGraphic>();
    }

    public void Add(IGraphic graphic)
    {
        graphics.Add(graphic);
    }

    public void AddRange(params IGraphic[] graphic)
    {
        graphics.AddRange(graphic);
    }

    public void Delete(IGraphic graphic)
    {
        graphics.Remove(graphic);
    }

    public void Print()
    {
        foreach(var childGraphic in graphics)
        {
            childGraphic.Print();
        }
    }
}