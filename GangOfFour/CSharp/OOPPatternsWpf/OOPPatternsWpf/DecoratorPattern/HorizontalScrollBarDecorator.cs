using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class HorizontalScrollBarDecorator:WindowDecorator
    {
        public HorizontalScrollBarDecorator(DPWindow windowToBeDecorated):base(windowToBeDecorated)
        {
            this.windowToBeDecorated = windowToBeDecorated;
        }

        public new void draw()
        {
            base.draw();
            drawHorizontalScrollBar();
        }

        private void drawHorizontalScrollBar()
        {
            // Draw the horizontal scrollbar
        }

        public new string GetDescription()
        {
            return base.GetDescription() + ", including horizontal scrollbars";
        }
    }
}
