class BorderDecorator :  public Decorator {
    public:
        BorderDecorator(VisualComponent*, int borderWidth);
       
        virtual void Draw();
        
        void BorderDecorator::Draw () {
            Decorator::Draw();
            DrawBorder(_width);
        }
    
    private:
        void DrawBorder(int);
        int _width;
};
