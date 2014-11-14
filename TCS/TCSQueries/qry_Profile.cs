using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSGateway;

namespace TCSQueries
{
    public    class qry_Profile
    {

        public be_Profile GetProfile(string _userId, string _applicationId)
        {
            gw_Profile _gw_Profile = new gw_Profile();

            be_Profile _be_Profile = _gw_Profile.GetProfile(_userId, _applicationId);

            return _be_Profile;
        }

    }
}
