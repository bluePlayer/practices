class Client {
    public:
        static void main () {
            MyClass* receiver = new MyClass;
            // ...
            
            Command* aCommand = new SimpleCommand<MyClass>(receiver, &MyClass::Action);
            
            // ...
            
            aCommand->Execute();
            
            return 0;
        }
};
