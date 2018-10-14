class Singleton {
    public:
        static Singleton* Instance();
        Singleton* Singleton::Instance () {
            if (_instance == 0) {
                _instance = new Singleton;
            }
            
            return _instance;
        }
        
    protected:
        Singleton();
        
    private:
        static Singleton* _instance;
        Singleton* Singleton::_instance = 0;

}
