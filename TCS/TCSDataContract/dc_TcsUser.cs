using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;


namespace TCSDataContract
{
    [DataContract]
    public class dc_TcsUser
    {
        
        string _user;
        
        [DataMember]
        public string User
        {
            get { return _user; }
            set { _user = value; }
        }

    }
}
