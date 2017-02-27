class FontDialogDirector : public DialogDirector {
    public:
        FontDialogDirector();
        
        virtual ~FontDialogDirector();
        virtual void WidgetChanged(Widget*);
        
        void FontDialogDirector::CreateWidgets () {
            _ok = new Button(this);
            _cancel = new Button(this);
            _fontList = new ListBox(this);
            _fontName = new EntryField(this);
            // fill the listBox with the available font names
            // assemble the widgets in the dialog
        }
        
        void FontDialogDirector::WidgetChanged (Widget* theChangedWidget) {
            if (theChangedWidget == _fontList) {
                _fontName->SetText(_fontList->GetSelection());
            } else if (theChangedWidget == _ok) {
                // apply font change and dismiss dialog
                // ...
            } else if (theChangedWidget == _cancel) {
                //dialog
            }
        }
    
    protected:
        virtual void CreateWidgets();
        
    private:
        Button* _ok;
        Button* _cancel;
        ListBox* _fontList;
        EntryField* _fontName;
};
