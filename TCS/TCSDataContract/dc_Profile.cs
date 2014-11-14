using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace TCSDataContract
{
    [DataContract]
    public class dc_Profile
    {
        private string _code;
        private string _description;
        private dc_Option[] _options;


        [DataMember]
        public dc_Option[] options
        {
            get { return _options; }
            set { _options = value; }
        }


        [DataMember]
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }



        [DataMember]
        public string code
        {
            get { return _code; }
            set { _code = value; }
        }









    }
}
