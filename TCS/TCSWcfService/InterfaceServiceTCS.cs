using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using TCSDataContract;


namespace TCSWcfService
{
    
    [ServiceContract]
    public interface InterfaceServiceTCS
    {
              
        [OperationContract]
        dc_User ValidUserAccess(string _userId, string _userPassword, string _applicationId);

        [OperationContract]
        dc_Profile GetMenu(string _userId, string _applicationId);

        [OperationContract]
        dc_User UsrUpdatePassword(string _userId, string _userPassword, string _newPassword, string _applicationId);

        [OperationContract]
        dc_TcsUser[] GetTcsUsers();

    }

    
}
