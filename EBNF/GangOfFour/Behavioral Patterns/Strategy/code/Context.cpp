class Context {
    public:
        void Main () {
        
            Composition* quick = new Composition(new SimpleCompositor());
            Composition* slick = new Composition(new TeXCompositor());
            Composition* iconic = new Composition(new ArrayCompositor(100));
            
            return 0;
        }
};
