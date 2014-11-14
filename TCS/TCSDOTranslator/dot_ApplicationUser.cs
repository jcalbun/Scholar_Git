using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;

namespace TCSDOTranslator
{
    public class dot_ApplicationUser
    {

        public be_ApplicationUser DataObjectToBusinessEntity(usuarios_aplicacione _usuarioAplicacion)
        {
            be_ApplicationUser _be_applicationUser = new be_ApplicationUser();
            if (_usuarioAplicacion != null)
            {
                _be_applicationUser.finishDate = _usuarioAplicacion.fecha_fin;
                _be_applicationUser.startDate = _usuarioAplicacion.fecha_inicio;
                _be_applicationUser.tryNumber = _usuarioAplicacion.intentos_hechos;
                _be_applicationUser.codigo_aplicacion = _usuarioAplicacion.codigo_aplicacion;
                _be_applicationUser.codigo_usuario = _usuarioAplicacion.codigo_usuario;
                _be_applicationUser.Bloqueado = _usuarioAplicacion.Bloqueado;
                _be_applicationUser.Fecha_Intento_Fallido = _usuarioAplicacion.Fecha_Intento_Fallido;
                _be_applicationUser.fecha_ultimo_acceso = _usuarioAplicacion.fecha_ultimo_acceso;
                _be_applicationUser.tipo_usuario = _usuarioAplicacion.tipo_usuario;
            }
            return _be_applicationUser;
        }

        public be_ApplicationUser[] DataObjectToBusinessEntity(usuarios_aplicacione[] _usuarioAplicacionList)
        {
            List<be_ApplicationUser> _be_ApplicationUser = new List<be_ApplicationUser>();

            if (_usuarioAplicacionList != null)
            {
                foreach (usuarios_aplicacione _user in _usuarioAplicacionList)
                {
                    _be_ApplicationUser.Add(DataObjectToBusinessEntity(_user));
                }
            }
            return _be_ApplicationUser.ToArray();
        }

        

    }
}
