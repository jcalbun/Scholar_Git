using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace TCSDataContract
{
    [DataContract]
    public class dc_User
    {
        private string _usuario;
        private string _password;
        private string _login;
        private string _message;
        private string _status;
        private dc_ApplicationUser _applicationUser;
        private dc_Profile _profile;


        [DataMember]
        public string message
        {
            get { return _message; }
            set { _message = value; }
        }

        [DataMember]
        public string status
        {
            get { return _status; }
            set { _status = value; }
        }


        [DataMember]
        public dc_ApplicationUser applicationUser
        {
            get { return _applicationUser; }
            set { _applicationUser = value; }
        }

        [DataMember]
        public dc_Profile profile
        {
            get { return _profile; }
            set { _profile = value; }
        }


        [DataMember]
        public string login
        {
            get { return _login; }
            set { _login = value; }
        }
        [DataMember]
        public string password
        {
            get { return _password; }
            set { _password = value; }
        }
        [DataMember]
        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }






    }
}
