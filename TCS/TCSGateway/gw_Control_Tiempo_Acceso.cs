using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;
using TCSDOTranslator;


namespace TCSGateway
{
    public class gw_Control_Tiempo_Acceso
    {
        public be_Control_Tiempo_Acceso getControlTiempoAcceso(string codigo_aplicacion)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            Control_Tiempo_Acceso_web _control = new Control_Tiempo_Acceso_web();
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _control = (from u in dataContext.Control_Tiempo_Acceso_web where (u.codigo_aplicacion == codigo_aplicacion) select u).FirstOrDefault();
            }

            dot_Control_Tiempo_Acceso _dot_Control_Tiempo_Acceso = new dot_Control_Tiempo_Acceso();
            return _dot_Control_Tiempo_Acceso.DataObjectToBusinessEntity(_control);
        }
    }

}
