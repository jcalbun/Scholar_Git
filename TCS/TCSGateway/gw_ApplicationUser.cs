using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;
using TCSDOTranslator;


namespace TCSGateway
{
    public class gw_ApplicationUser
    {

        public be_ApplicationUser GetApplicationUser(string user, string _applicationId)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuarios_aplicacione _usuarioAplicacione = new usuarios_aplicacione();
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuarioAplicacione = (from u in dataContext.usuarios_aplicaciones where (u.codigo_usuario == user) && (u.codigo_aplicacion == _applicationId) select u).FirstOrDefault();
            }
            dot_ApplicationUser _dot_ApplicationUser = new dot_ApplicationUser();
            return _dot_ApplicationUser.DataObjectToBusinessEntity(_usuarioAplicacione);
        }

        public void unlockUser(string user, string _applicationId)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuarios_aplicacione _usuarioAplicacione = new usuarios_aplicacione();
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuarioAplicacione = (from u in dataContext.usuarios_aplicaciones where (u.codigo_usuario == user) && (u.codigo_aplicacion == _applicationId) select u).FirstOrDefault();

                _usuarioAplicacione.Bloqueado = 'N';
                _usuarioAplicacione.Fecha_Intento_Fallido = null;
                _usuarioAplicacione.intentos_hechos = 0;
                
                dataContext.SubmitChanges();
            }
        }

        public void addTry(string user, string _applicationId, be_Control_Tiempo_Acceso control)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuarios_aplicacione _usuarioAplicacione = new usuarios_aplicacione();
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuarioAplicacione = (from u in dataContext.usuarios_aplicaciones where (u.codigo_usuario == user) && (u.codigo_aplicacion == _applicationId) select u).FirstOrDefault();

                _usuarioAplicacione.intentos_hechos++;
                if (_usuarioAplicacione.intentos_hechos == control.intentos_permitidos)
                {
                    _usuarioAplicacione.Bloqueado = 'S';
                }
                _usuarioAplicacione.Fecha_Intento_Fallido = DateTime.Now;
                dataContext.SubmitChanges();
            }
        }

    }
}
