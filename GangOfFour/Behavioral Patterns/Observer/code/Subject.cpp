class Subject {
    public:
        virtual ~Subject();
        virtual void Attach(Observer*);
        virtual void Detach(Observer*);
        virtual void Notify();
        
        void Subject::Attach (Observer* o) {
            _observers->Append(o);
        }
        
        void Subject::Detach (Observer*) {
            _observers->Remove(o);
        }
        
        void Subject::Notify () {
            ListIterator<Observer*> i (_observers);
            
            for (i.First(); !i.IsDone(); i.Next()) {
                i.CurrentItem()->Update(this);
            }
        }
        
    protected:
        Subject();
        
    private:
        List<Observer*> *_observers;
};
