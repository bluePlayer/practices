class Button : public Widget {
    public:
        Button(DialogDirector*);
        
        virtual void SetText(const char* text);
        virtual void HandleMouse(MouseEvent& event);
        
        // ...
        
        void Button::HandleMouse (MouseEvent& event) {
            Changed();
        }
};
