using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf
{
    class Constants
    {
        public const short WIN_APPEARANCE = 1;
        public const short OSX_APPEARANCE = 2;

        public const int OBSERVER_STATE_INIT_ID = 1;
        public const int OBSERVER_STATE_READY_ID = 2;
        public const int OBSERVER_STATE_PROCESSIND_ID = 3;
        public const int OBSERVER_STATE_DONE_ID = 4;

        public const string OBSERVER_STATE_INIT = "init";
        public const string OBSERVER_STATE_READY = "ready";
        public const string OBSERVER_STATE_PROCESSIND = "processing";
        public const string OBSERVER_STATE_DONE = "done";
    }
}
