class Widget {
    public:
        Widget(DialogDirector*);
        
        virtual void Changed();
        virtual void HandleMouse(MouseEvent& event);
        // ...
        
        void Widget::Changed () {
            _director->WidgetChanged(this);
        }
        
    private:
        DialogDirector* _director;
};
