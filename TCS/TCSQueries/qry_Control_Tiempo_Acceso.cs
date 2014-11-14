using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSGateway;

namespace TCSQueries
{
    public class qry_Control_Tiempo_Acceso
    {


                public be_Control_Tiempo_Acceso getControlTiempoAcceso(string codigo_aplicacion)
        {
            gw_Control_Tiempo_Acceso _gw_control = new gw_Control_Tiempo_Acceso();
            be_Control_Tiempo_Acceso _be_control = _gw_control.getControlTiempoAcceso(codigo_aplicacion);
            return _be_control;
        }
    }

}
