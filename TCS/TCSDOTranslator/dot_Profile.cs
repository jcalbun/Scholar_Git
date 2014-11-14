using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;

namespace TCSDOTranslator
{
    public class dot_Profile
    {

        public be_Profile DataObjectToBusinessEntity(profile _profile)
        {
            be_Profile _be_Profile = new be_Profile();
            _be_Profile.code = _profile.profile_id;
            _be_Profile.description = _be_Profile.description;
            return _be_Profile;
        }

    }
}
