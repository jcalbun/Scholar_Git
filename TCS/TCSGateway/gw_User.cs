using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;
using TCSDOTranslator;



namespace TCSGateway
{
    public class gw_User
    {

        public be_User GetUser(string user)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuario _usuario = new usuario();
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuario = (from u in dataContext.usuarios where (u.codigo_usuario == user) select u).FirstOrDefault();
            }
            dot_User _dot_User = new dot_User();
           return  _dot_User.DataObjectToBusinessEntity(_usuario);
        }

        public be_ApplicationUser[] GetTCSUsers()
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuarios_aplicacione[] _usuarios = null;
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuarios = (from u in dataContext.usuarios_aplicaciones where (u.codigo_aplicacion == "TCS") select u).ToArray();
            }
            dot_ApplicationUser _dot_ApplicationUser = new dot_ApplicationUser();
            return _dot_ApplicationUser.DataObjectToBusinessEntity(_usuarios).ToArray();
        }


        public string UpdatePassword(string user, string password)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuario _usuario = new usuario();


            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                try
                {
                    SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;

                    _usuario = (from u in dataContext.usuarios where (u.codigo_usuario == user) select u).FirstOrDefault();
                    _usuario.password = password;
                    _usuario.fecha_ult_password = DateTime.Now;
                    dataContext.SubmitChanges();
                    dataContext.sp_insert_historial_password(user, "TCS", password);
                }
                catch (Exception e)
                {

                    return e.Message;
                }

            }
            return "SUCCESS";
        }


        public bool CheckLastPassword(string user, string password, int back)
        { 
        
           gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
           _gw_SecurityConnection.Connection();
                bool encontro = false;

           if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
           {

               SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
               IEnumerable<almacena_password> lastPws = (from u in dataContext.almacena_passwords where (u.codigo_aplicacion == "TCS" && u.codigo_usuario == user) select u).Take(back).OrderByDescending(u => u.fecha_cambio);
               

               foreach (almacena_password _record in lastPws)
               {
                   if (_record.password ==  password.PadRight(20,' '))
                   {
                       encontro = true;
                   }
               }
           }
           return encontro;           
        }





    }
}
