using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSDataContract;
using TCSBusinessEntities;


namespace TCSDCTranslator
{
    public class dct_User
    {

        public dc_User BusinessEntityToDataContract(be_User _be_User)
        {


            dc_User _dc_user = new dc_User();
            if (_be_User.login != null)
            {
                _dc_user.login = _be_User.login.Trim();
                _dc_user.password = string.Empty; //por un tema de seguridad no subire password encriptada.
                _dc_user.usuario = _be_User.usuario.Trim();
                _dc_user.message = _be_User.message;
                _dc_user.status = _be_User.status;
            }
            else
            {
                _dc_user.login = _be_User.login;
                _dc_user.password = string.Empty;
                _dc_user.usuario = _be_User.usuario;
                _dc_user.message = "Invalid User";
                _dc_user.status = "WARNING";
            }


            return _dc_user;
        }


    }
}
