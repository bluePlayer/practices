class Character : public Glyph {
    public:
        Character(char);
        
        virtual void Draw(Window*, GlyphContext&);
        
    private:
        char _charcode;
};
