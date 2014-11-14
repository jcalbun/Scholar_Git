using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSDataContract;
using TCSBusinessEntities;

namespace TCSDCTranslator
{
    public class dct_Profile
    {

        public dc_Profile BusinessEntityToDataContract(be_Profile _be_Profile)
        {
            dct_Option _dct_Option = new dct_Option();
            dc_Profile _dc_Profile = new dc_Profile();
            _dc_Profile.code = _be_Profile.code;
            _dc_Profile.description = _be_Profile.description;
            _dc_Profile.options = _dct_Option.BusinessEntityToDataContract(_be_Profile.options);

            return _dc_Profile;
        }


        public dc_Profile[] BusinessEntityToDataContract(be_Profile[] _be_ProfileList)
        {
            List<dc_Profile> _dcProfileList = new List<dc_Profile>();
            foreach (be_Profile _beProfile in _be_ProfileList)
            {
                _dcProfileList.Add(this.BusinessEntityToDataContract(_beProfile));
            }
            return _dcProfileList.ToArray();
        }

    }
}
