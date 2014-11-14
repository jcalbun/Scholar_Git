using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;



namespace TCSDOTranslator
{
    public class dot_User
    {
        public be_User DataObjectToBusinessEntity(usuario _usuario)
        {
            be_User _be_user = new be_User();
            if (_usuario != null)
            {
                _be_user.login = _usuario.codigo_usuario.Trim();
                _be_user.usuario = _usuario.nombre.Trim();
                _be_user.password = _usuario.password.Replace(" ", "");
            }
            return _be_user;
        }

    }
}
