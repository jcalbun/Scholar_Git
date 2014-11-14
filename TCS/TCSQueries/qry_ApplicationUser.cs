using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSGateway;

namespace TCSQueries
{
    public class qry_ApplicationUser
    {

        public be_ApplicationUser GetApplicationUser(string _userId, string _applicationId)
        {
            gw_ApplicationUser _gw_ApplicationUser = new gw_ApplicationUser();

            be_ApplicationUser _be_ApplicationUser = _gw_ApplicationUser.GetApplicationUser(_userId, _applicationId);

            return _be_ApplicationUser;
        }

        public void unlockUser(string _userId, string _applicationId)
        {
            gw_ApplicationUser _gw_ApplicationUser = new gw_ApplicationUser();
            _gw_ApplicationUser.unlockUser(_userId, _applicationId);
        }

        public void addTry(string _userId, string _applicationId, be_Control_Tiempo_Acceso control)
        {
            gw_ApplicationUser _gw_ApplicationUser = new gw_ApplicationUser();
            _gw_ApplicationUser.addTry(_userId, _applicationId, control);
        }

    }
}
