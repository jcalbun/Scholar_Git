using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TCSBusinessEntities;
using TCSDataClasses;

namespace TCSDOTranslator
{
    public  class dot_Control_Tiempo_Acceso
    {
        public be_Control_Tiempo_Acceso DataObjectToBusinessEntity(Control_Tiempo_Acceso_web _control)
        {
            be_Control_Tiempo_Acceso _be_control = new be_Control_Tiempo_Acceso();
            if (_control != null)
            {
                _be_control.codigo_aplicacion = _control.codigo_aplicacion.Trim();
                _be_control.activo = _control.activo;
                _be_control.dias_aviso_previo = _control.dias_aviso_previo;
                _be_control.dias_vigencia = _control.dias_vigencia;
                _be_control.intentos_permitidos = _control.intentos_permitidos;
                _be_control.largo_minimo = _control.largo_minimo;
                _be_control.minutos_bloqueo = _control.minutos_bloqueo;
                _be_control.password_almacenados = _control.password_almacenados;
                _be_control.segundos_inactividad = _control.segundos_inactividad;
                _be_control.usa_nueva_encriptacion = _control.usa_nueva_encriptacion;
            }
            return _be_control;
        }





    }
}
