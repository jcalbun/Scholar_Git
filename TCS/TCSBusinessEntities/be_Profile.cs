using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Profile
    {

        private string _code;
        private string _description;
        private List<be_Option> _options;


        public List<be_Option> options
        {
            get { return _options; }
            set { _options = value; }
        }
        

        public string description
        {
            get { return _description; }
            set { _description = value; }
        }

        public string code
        {
            get { return _code; }
            set { _code = value; }
        }
  


    }
}
