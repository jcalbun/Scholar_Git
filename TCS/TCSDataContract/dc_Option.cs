using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace TCSDataContract
{
    public class dc_Option
    {
        private string _menuOptionAccess;
        private string _menuOptionId;
        private dc_OptionApplication _optionApplication;

        [DataMember]
        public dc_OptionApplication optionApplication
        {
            get { return _optionApplication; }
            set { _optionApplication = value; }
        }


        [DataMember]
        public string menuOptionId
        {
            get { return _menuOptionId; }
            set { _menuOptionId = value; }
        }

        [DataMember]
        public string menuOptionAccess
        {
            get { return _menuOptionAccess; }
            set { _menuOptionAccess = value; }
        }



    }
}
