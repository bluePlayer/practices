class IconWindow: public Window {
    public:
        virtual void DrawContents();    
        void IconWindow::DrawContents() {
            WindowImp* imp = new GetWindowImp();
            if (imp != 0) {
                imp->DeviceBitmap(_bitmapName, 0.0, 0.0);
            }
        }  
    private:
        const char* _bitmapName;
              
};
