class Scanner {
    public:
        Scanner(istream&);
        
        virtual ~Scanner();
        virtual Token& Scanner();
        
    private:
        istream& _inputStream;
};
