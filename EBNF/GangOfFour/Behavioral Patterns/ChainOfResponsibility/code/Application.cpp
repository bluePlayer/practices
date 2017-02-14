class Application: public HelpHandler {
    public:
        const Topic PRINT_TOPIC = 1;
        const Topic PAPER_ORIENTATION_TOPIC = 2;
        const Topic APPLICATION_TOPIC = 3;
        
        Application(Topic t) : HelpHandler (0, t) {}
        
        Application* application = new Application(APPLICATION_TOPIC);
        
        Dialog* dialog = new Dialog(application, PRINT_TOPIC);
        Button* button = new Button(dialog, PAPER_ORIENTATION_TOPIC);
        
        // button->HanledHelp();
        
        virtual void HandleHelp();
        // appropriate-specific operations...
        
        void Application::HandleHelp () {
            // show a list of help topics
        }
};
