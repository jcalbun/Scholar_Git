using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSGateway;
using TCSBusinessEntities;

namespace TCSQueries
{
    public class qry_User
    {

        public be_User GetUser(string _userId)
        {
            gw_User _gw_User = new gw_User();

            be_User _be_User = _gw_User.GetUser(_userId);

            return _be_User;
        }

        public string UpdatePasswordUser(string _userid, string _password)
        {
            gw_User _gw_User = new gw_User();

            return _gw_User.UpdatePassword(_userid, _password);
        }


        public bool CheckLastPassword(string user, string password, int back)
        {
            gw_User _gw_User = new gw_User();

            return _gw_User.CheckLastPassword(user, password, back);
        
        }

        public be_ApplicationUser[] GetTCSUsers()
        {
            gw_User _gw_User = new gw_User();

            return _gw_User.GetTCSUsers();
        }


    }
}
