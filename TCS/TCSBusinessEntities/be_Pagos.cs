using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Pagos
    {
        private int _id;
        private string _numero_documento;
        private be_Contrato _contrato;
        private be_Apoderado _apoderado;
        private decimal _monto;
        private string _tipo_pago;
        private DateTime _fecha;
        private int _ano_cuota;
        private int _mes_cuota;
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

        public be_Contrato contrato
        {
            get { return _contrato; }
            set { _contrato = value; }
        }

        public be_Apoderado apoderado
        {
            get { return _apoderado; }
            set { _apoderado = value; }
        }

        public Decimal monto
        {
            get { return _monto; }
            set { _monto = value; }
        }

        public string tipo_pago
        {
            get { return _tipo_pago; }
            set { _tipo_pago = value; }
        }

        public DateTime fecha
        {
            get { return _fecha; }
            set { _fecha = value; }
        }

        public int ano_cuota
        {
            get { return _ano_cuota; }
            set { _ano_cuota = value; }
        }

        public int mes_cuota
        {
            get { return _mes_cuota; }
            set { _mes_cuota = value; }
        }

        public string observaciones
        {
            get { return _observaciones; }
            set { _observaciones = value; }
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
