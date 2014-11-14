using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public  class be_ApplicationUser
    {

        private string _codigo_usuario;

        private string _codigo_aplicacion;

        private System.Nullable<System.DateTime> _startDate;

        private System.Nullable<System.DateTime> _finishDate;

        private System.Nullable<char> _tipo_usuario;

        private System.Nullable<System.DateTime> _fecha_ultimo_acceso;

        private System.Nullable<int> _tryNumber;

        private System.Nullable<System.DateTime> _Fecha_Intento_Fallido;

        private System.Nullable<char> _Bloqueado;

        
        public be_ApplicationUser()
        {
        }

        public string codigo_usuario
        {
            get
            {
                return this._codigo_usuario;
            }
            set
            {
                if ((this._codigo_usuario != value))
                {
                    this._codigo_usuario = value;
                }
            }
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

        public System.Nullable<System.DateTime> startDate
        {
            get
            {
                return this._startDate;
            }
            set
            {
                if ((this._startDate != value))
                {
                    this._startDate = value;
                }
            }
        }

        public System.Nullable<System.DateTime> finishDate
        {
            get
            {
                return this._finishDate;
            }
            set
            {
                if ((this._finishDate != value))
                {
                    this._finishDate = value;
                }
            }
        }

        public System.Nullable<char> tipo_usuario
        {
            get
            {
                return this._tipo_usuario;
            }
            set
            {
                if ((this._tipo_usuario != value))
                {
                    this._tipo_usuario = value;
                }
            }
        }

        public System.Nullable<System.DateTime> fecha_ultimo_acceso
        {
            get
            {
                return this._fecha_ultimo_acceso;
            }
            set
            {
                if ((this._fecha_ultimo_acceso != value))
                {
                    this._fecha_ultimo_acceso = value;
                }
            }
        }

        public System.Nullable<int> tryNumber
        {
            get
            {
                return this._tryNumber;
            }
            set
            {
                if ((this._tryNumber != value))
                {
                    this._tryNumber = value;
                }
            }
        }

        public System.Nullable<System.DateTime> Fecha_Intento_Fallido
        {
            get
            {
                return this._Fecha_Intento_Fallido;
            }
            set
            {
                if ((this._Fecha_Intento_Fallido != value))
                {
                    this._Fecha_Intento_Fallido = value;
                }
            }
        }

        public System.Nullable<char> Bloqueado
        {
            get
            {
                return this._Bloqueado;
            }
            set
            {
                if ((this._Bloqueado != value))
                {
                    this._Bloqueado = value;
                }
            }
        }



    }
}
