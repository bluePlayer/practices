class GlyphFactory {
    public:
        const int NCHARCODES = 128;
        GlyphFactory();
        virtual ~GlyphFactory();
        
        virtual Character* CreateCharacter(char);
        virtual Row* CreateRow();
        virtual Column* CreateColumn();
        
        GlyphFactory::GlyphFactory () {
            for (int i = 0; i < NCHARCODES; i += 1) {
                _character[i] = 0;
            }
        }
        
        Character* GlyphFactory:: CreateCharacter (char c) {
            if (!_character[c]) {
                _character[c] = new Character(c);
            }
            
            return _character[c];
        }
        
        Row* GlyphFactory::CreateRow () {
            return new Row;
        }
        
        Column* GlyphFactory::CreateColumn () {
            return new Column;
        }
        // ...
     private:
        Character* _character[NCHARCODES];
};
