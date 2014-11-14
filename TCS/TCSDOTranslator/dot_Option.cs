using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;

namespace TCSDOTranslator
{
    public class dot_Option
    {

        public be_Option DataObjectToBusinessEntity(profile_menu_option _profile_menu_option)
        {
            be_Option _be_Option = new be_Option();
            _be_Option.menuOptionAccess = _profile_menu_option.menu_option_access.Trim();
            _be_Option.menuOptionId = _profile_menu_option.menu_option_id.Trim();
            return _be_Option;
        }

    }
}
