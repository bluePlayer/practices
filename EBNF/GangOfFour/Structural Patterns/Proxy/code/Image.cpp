//class Image;
//extern Image* LoadAnImageFile(const char*);
    // external function
    
//ImagePtr image = ImagePtr("anImageFileName");
//image -> Draw(Point(50, 100));
// (image.operator->())->Draw(Point(50, 100));

class Image: public Graphic {
    public:
        Image(const char* file); // loads image from a file
        virtual ~Image();
        
        virtual void Draw(const Point& at);
        virtual void HandleMouse(Event& event);
        
        virtual const Point& GetExtent();
        
        virtual void Load(istream& from);
        virtual void Save(ostream& to);
        
    private:
        // ...
};
