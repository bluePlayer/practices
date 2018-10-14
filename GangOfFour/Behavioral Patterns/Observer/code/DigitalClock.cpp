class DigitalClock : public Widget, public Observer {
    public:
        DigitalClock(ClockTimer*);
        
        virtual ~DigitalClock();
        virtual void Update(Subject*);
        // overrides Observer operation
        virtual void Draw();
        // observer Widget operation;
        // defines how to draw the digital clock
        
        DigitalClock::DigitalClock (ClockTimer* s) {
            _subject = s;
            _subject->Attach(this);
        }
        
        DigitalClock::DigitalClock () {
            _subject->Detach(this);
        }
        
        void DigitalClock::Update (Subject* theChangedSubject) {
            if (theChangedSubject == _subject) {
                Draw();
            }
        }
        
        void DigitalClock::Draw () {
            // get the new values from the subject
            
            int hour = _subject->GetHour();
            int minute = _subject->GetMinute();
            // etc...
            // draw the digital clock;
        }
        
     private:
        ClockTimer* _subject;
};
