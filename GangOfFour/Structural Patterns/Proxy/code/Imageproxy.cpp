class ImageProxy: public Graphic {
    public:
        ImageProxy(const char* imageFile);
        virtual ~ImageProxy();
        
        virtual void Draw(const Point& at);
        virtual void HandleMouse(Event& event);
        
        virtual const Point& GetExtent();
        
        virtual void Load(istream& from);
        virtual void Save(ostream& to);
        
        ImageProxy::ImageProxy (const char* fileName) {
            _fileName = strdup(fileName);
            _extent = Point::Zero; // don't know extent yet'
            _image = 0;
        }
        
        Image* ImageProxy::GetImage () {
            if (_image == 0) {
                _image = new Image(_fileName);
            }
            
            _return _image;
        }
        
        const Point& ImageProxy::GetExtent () {
            if (_extent == Point::Zero) {
                _extent = GetImage() -> GetExtent();
            }
            
            return _extent;
        }
        
        void ImageProxy::Draw (const Point& at) {
            GetImage() -> Draw(at);
        }
        
        void ImageProxy::HandleMouse (Event& event) {
            GetImage() -> HandleMouse(event);
        }
        
        void ImageProxy::Save(ostream& to) {
            to << _extent << _fileName;
        }
        
        void ImageProxy::Load (istream& from) {
            from >> _extent >> _fileName;
        }
        
        /*
        // Smalltalk code
        doNotUnderstand: aMessage
            ^ self realSubject
                perform: aMessage selector
                withArguments: aMessage arguments
        
        doNotUnderstand: aMessage
            ^ (legalMessages includes: aMessage selector)
            ifTrue: [self realSubject
                perform: aMessage selector
                withArguments: aMessage arguments]
            ifFalse: [self error: 'Illegal operator']
        */
        
     protected:
        Image* GetImage();
        
        Image* _image;
        Point _extend;
        char* _fileName;
};
