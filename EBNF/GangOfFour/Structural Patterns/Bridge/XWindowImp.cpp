class XWindowImp: public WindowImp {
    public:
        XWindowImp();
        virtual void DeiceRect(Coord, Coord, Coord, Coord);
        
        void XWindowImp::DeviceRect (Coord x0, Coord y0, Coord x1, Coord y1) {
            int x = round(min(x0, x1));
            int y = round(min(y0, y1));
            int w = round(abs(x0 - x1));
            int h = round(abs(y0 - y1));
            XDrawRectangle(_dpy, _winID, _gc, x, y, w, h); 
        }
        // remainder of public interface...
        
    private:
        // lots of X window system specific state, including:
        Display* _dpy;
        Drawable _winID; // window id     
        GC _gc; // window graphics context
}

