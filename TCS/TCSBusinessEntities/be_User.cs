using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_User
    {
        private string _usuario;
        private string _password;
        private string _login;
        private string _message;
        private string _status;
        private be_ApplicationUser _applicationUser;
        private be_Profile _profile;





        public be_ApplicationUser applicationUser
        {
            get { return _applicationUser; }
            set { _applicationUser = value; }
        }

        public be_Profile profile
        {
            get { return _profile; }
            set { _profile = value; }
        }


        public string message
        {
            get { return _message; }
            set { _message = value;  }
        }
        
        public string status
        {
            get { return _status; }
            set { _status = value;  }
        }

        public string login
        {
            get { return _login; }
            set { _login = value; }
        }

        public string password
        {
            get { return _password; }
            set { _password = value; }
        }

        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }





        



    }
}
