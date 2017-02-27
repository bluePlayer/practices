class DialogDirector {
    public:
        virtual ~DialogDirector();
        virtual void ShowDialog();
        virtual void WidgetChanged(Widget*) = 0;
        
    protected:
        DialogDirector();
        
        virtual void CreateWidgets() = 0;
};
