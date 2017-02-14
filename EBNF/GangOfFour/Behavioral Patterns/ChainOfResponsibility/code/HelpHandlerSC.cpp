typedef int Topic;
const Topic NO_HELP_TOPIC = -1;

class HelpHandler {
    public: 
        HelpHandler(HelpHandler* = 0, Topic = NO_HELP_TOPIC);
        
        virtual bool HasHelp();
        virtual void SetHandler(HelpHandler*, Topic);
        virtual void HandleHelp();
        
        HelpHandler:: HelpHandler (HelpHandler* h, Topic t) : _successor(h), _topict(t) {}
        
        bool HelpHandler::HasHelp () {
            return _topic != NO_HELP_TOPIC;
        }
        
        void HelpHandler::HandleHelp () {
            if (_successor != 0) {
                successor->HandleHelp();
            }
        }
    
    private:
        HelpHandler* _successor;
        Topic _topic;    
};
