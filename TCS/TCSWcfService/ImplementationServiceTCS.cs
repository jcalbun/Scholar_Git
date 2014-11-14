using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using TCSBusinessEntities;
using TCSBusinessActions;
using TCSDataContract;
using TCSDCTranslator;

namespace TCSWcfService
{
    
    public class ImplementationServiceTCS : InterfaceServiceTCS
    {

        public dc_User ValidUserAccess(string _userId, string _userPassword, string _applicationId)
        {
           ba_User _ba_User = new ba_User();
           be_User _be_User = _ba_User.ValidUserAccess(_userId, _userPassword, _applicationId);
           dct_User _dct_User = new dct_User();
           return _dct_User.BusinessEntityToDataContract(_be_User);
        }

        public dc_Profile GetMenu(string _userId, string _applicationId)
        {
            ba_User _ba_User = new ba_User();
            
            be_Profile _be_Profile = _ba_User.GetProfile(_userId, _applicationId);
            dct_Profile _dct_profile = new dct_Profile();
            return _dct_profile.BusinessEntityToDataContract(_be_Profile);
        }

        public dc_User UsrUpdatePassword(string _userId, string _userPassword, string _newPassword, string _applicationId)
        {
            ba_User _ba_User = new ba_User();
            be_User _be_User = _ba_User.UpdatePassword(_userId, _userPassword, _newPassword, _applicationId);
            dct_User _dct_User = new dct_User();
            return _dct_User.BusinessEntityToDataContract(_be_User);
        }

     

        public dc_TcsUser[] GetTcsUsers()
        {
            ba_User _ba_User = new ba_User();
            dct_TcsUser _dct_TcsUser = new dct_TcsUser();
            return _dct_TcsUser.BusinessEntityToDataContract(_ba_User.GetTCSUsers());
        }


    }
}
