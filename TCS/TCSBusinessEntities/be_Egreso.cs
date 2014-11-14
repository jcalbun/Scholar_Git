using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Egreso
    {
        private int _id;
        private string _numero_documento;
        private be_TipoEgreso _tipo_egreso;
        private decimal _monto;
        private DateTime _fecha;
        private int _ano_egreso;
        private int _mes_egreso;
        private string _descripcion;
        private string _observaciones;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string numero_documento
        {
            get { return _numero_documento; }
            set { _numero_documento = value; }
        }

        public be_TipoEgreso tipo_egreso
        {
            get { return _tipo_egreso; }
            set { _tipo_egreso = value; }
        }

        public Decimal monto
        {
            get { return _monto; }
            set { _monto = value; }
        }

        public int ano_egreso
        {
            get { return _ano_egreso; }
            set { _ano_egreso = value; }
        }

        public int mes_egreso
        {
            get { return _mes_egreso; }
            set { _mes_egreso = value; }
        }

         public string observaciones
        {
            get { return _observaciones; }
            set { _observaciones = value; }
        }

        public string descripcion
        {
            get { return _descripcion; }
            set { _descripcion = value; }
        }

        public string usuario_cr
        {
            get { return _usuario_cr; }
            set { _usuario_cr = value; }
        }

        public DateTime fecha_cr
        {
            get { return _fecha_cr; }
            set { _fecha_cr = value; }
        }

        public string usuario_up
        {
            get { return _usuario_up; }
            set { _usuario_up = value; }
        }

        public DateTime fecha_up
        {
            get { return _fecha_up; }
            set { _fecha_up = value; }
        }
    }
}
