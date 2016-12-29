class WindowImp {
    public:
        virtual void ImpTop() = 0;
        virtual void ImpBottom() = 0;
        virtual void ImpSetExtent(const Point&) = 0;
        virtual void ImpSetOrigin(const Point&) = 0;
        
        virtual void DeviceRect(Coord, Coord, Coord, Coord) = 0;
        virtual void DeviceText(const char*, Coord, Coord) = 0;
        virtual void DeviceBitmap(const char*, Coord, Coord) = 0;
        
        void Window::DrawRect(const Point& p1, const Point& p2) {
            WindowImp* imp = GetWindowImp();
            imp->DeviceRect(p1.X(), p1.Y(), p2.X(), p2.Y());
        }
        
        // lots more functions for drawing on widnows...
        
    protected:
        WindowImp();
        
        WindowImp* Window::GetWindowImp () {
            if (_imp == 0) {
                _imp = WindowSystemFactory::Instance()->MakeWindowImp();
            }
                return _imp;
            }
        }
