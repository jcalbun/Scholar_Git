using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Option
    {
        private string _menuOptionId;
        private string _menuOptionAccess;
        private be_OptionApplication _optionApplication;


        public be_OptionApplication optionApplication
        {
            get { return _optionApplication; }
            set { _optionApplication = value; }
        }
        
        public string menuOptionAccess
        {
            get { return _menuOptionAccess; }
            set { _menuOptionAccess = value; }
        }


        public string menuOptionId
        {
            get { return _menuOptionId; }
            set { _menuOptionId = value; }
        }
        

    }
}
