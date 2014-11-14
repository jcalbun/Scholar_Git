using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Control_Tiempo_Acceso
    {

         private string _codigo_aplicacion;
		
		private System.Nullable<char> _activo;
		
		private System.Nullable<int> _dias_vigencia;
		
		private System.Nullable<int> _dias_aviso_previo;
		
		private System.Nullable<char> _usa_nueva_encriptacion;
		
		private int _intentos_permitidos;
		
		private int _password_almacenados;
		
		private int _segundos_inactividad;
		
		private System.Nullable<int> _largo_minimo;
		
		private System.Nullable<int> _minutos_bloqueo;

        public be_Control_Tiempo_Acceso()
		{
		}

        public be_Control_Tiempo_Acceso(string codigo_aplicacion, System.Nullable<char> activo, System.Nullable<int> dias_vigencia, System.Nullable<int> dias_aviso_previo, System.Nullable<char> usa_nueva_encriptacion, int intentos_permitidos, int password_almacenados, int segundos_inactividad, System.Nullable<int> largo_minimo, System.Nullable<int> minutos_bloqueo)
        {
            this._codigo_aplicacion = codigo_aplicacion;
            this._activo = activo;
            this._dias_vigencia = dias_vigencia;
            this._dias_aviso_previo = dias_aviso_previo;
            this._usa_nueva_encriptacion = usa_nueva_encriptacion;
            this._intentos_permitidos = intentos_permitidos;
            this._password_almacenados = password_almacenados;
            this._segundos_inactividad = segundos_inactividad;
            this._largo_minimo = largo_minimo;
            this._minutos_bloqueo = minutos_bloqueo;
        }
				
		public string codigo_aplicacion
		{
			get
			{
				return this._codigo_aplicacion;
			}
			set
			{
				if ((this._codigo_aplicacion != value))
				{
					this._codigo_aplicacion = value;
				}
			}
		}
				
		public System.Nullable<char> activo
		{
			get
			{
				return this._activo;
			}
			set
			{
				if ((this._activo != value))
				{
					this._activo = value;
				}
			}
		}
				
		public System.Nullable<int> dias_vigencia
		{
			get
			{
				return this._dias_vigencia;
			}
			set
			{
				if ((this._dias_vigencia != value))
				{
					this._dias_vigencia = value;
				}
			}
		}
				
		public System.Nullable<int> dias_aviso_previo
		{
			get
			{
				return this._dias_aviso_previo;
			}
			set
			{
				if ((this._dias_aviso_previo != value))
				{
					this._dias_aviso_previo = value;
				}
			}
		}
				
		public System.Nullable<char> usa_nueva_encriptacion
		{
			get
			{
				return this._usa_nueva_encriptacion;
			}
			set
			{
				if ((this._usa_nueva_encriptacion != value))
				{
					this._usa_nueva_encriptacion = value;
				}
			}
		}
				
		public int intentos_permitidos
		{
			get
			{
				return this._intentos_permitidos;
			}
			set
			{
				if ((this._intentos_permitidos != value))
				{
					this._intentos_permitidos = value;
				}
			}
		}
				
		public int password_almacenados
		{
			get
			{
				return this._password_almacenados;
			}
			set
			{
				if ((this._password_almacenados != value))
				{
					this._password_almacenados = value;
				}
			}
		}
				
		public int segundos_inactividad
		{
			get
			{
				return this._segundos_inactividad;
			}
			set
			{
				if ((this._segundos_inactividad != value))
				{
					this._segundos_inactividad = value;
				}
			}
		}
				
		public System.Nullable<int> largo_minimo
		{
			get
			{
				return this._largo_minimo;
			}
			set
			{
				if ((this._largo_minimo != value))
				{
					this._largo_minimo = value;
				}
			}
		}
				
		public System.Nullable<int> minutos_bloqueo
		{
			get
			{
				return this._minutos_bloqueo;
			}
			set
			{
				if ((this._minutos_bloqueo != value))
				{
					this._minutos_bloqueo = value;
				}
			}
		}
    }
    
}
