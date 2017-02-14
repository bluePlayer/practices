class Dialog: public Widget {
    public:
        Dialog(HelpHandler* h, Topic t = NO_HELP_TOPIC);
        
        virtual void HandleHelp();
        // Widget operations that Dialog overrides...
        // ...
        
        Dialog::Dialog (HelpHandler* h, Topic t) : Widget(0) {
            SetHandler(h, t);
        }
        
        void Dialog::HandleHelp () {
            if (HasHelp()) {
                // offer help on the dialog
            } else {
                HelpHandler::HandleHelp();
            }
        }
};
