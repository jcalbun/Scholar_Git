using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSDataContract;
using TCSBusinessEntities;

namespace TCSDCTranslator
{
    public class dct_TcsUser
    {
        public dc_TcsUser BusinessEntityToDataContract(be_ApplicationUser _ApplicationUser)
        {
            dc_TcsUser _dc_TcsUser = new dc_TcsUser();

            _dc_TcsUser.User = _ApplicationUser.codigo_usuario;

            return _dc_TcsUser;
        }

        public dc_TcsUser[] BusinessEntityToDataContract(be_ApplicationUser[] _ApplicationUserList)
        {
            List<dc_TcsUser> _dcList = new List<dc_TcsUser>();

            foreach (be_ApplicationUser _be_ApplicationUser in _ApplicationUserList)
            {
                _dcList.Add(this.BusinessEntityToDataContract(_be_ApplicationUser));
            }
            return _dcList.ToArray();

        }
    }
}
