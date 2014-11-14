using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Contrato
    {

        private int _id;
        private be_Apoderado _apoderado;
        private List<be_Estudiante> _estudiantes;
        private int _ano;
        private DateTime _fecha_inicio;
        private DateTime _fecha_fin;
        private Decimal _monto_contrato;
        private be_FechaPagoServicio _fecha_pago_servicio;
        private string _observaciones;
        private string _activo;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public be_Apoderado apoderado
        {
            get { return _apoderado; }
            set { _apoderado = value; }
        }

        public List<be_Estudiante> estudiantes
        {
            get { return _estudiantes; }
            set { _estudiantes = value; }
        }

        public int ano
        {
            get { return _ano; }
            set { _ano = value; }
        }

        public DateTime fecha_inicio
        {
            get { return _fecha_inicio; }
            set { _fecha_inicio = value; }
        }

        public DateTime fecha_fin
        {
            get { return _fecha_fin; }
            set { _fecha_fin = value; }
        }

        public Decimal monto_contrato
        {
            get { return _monto_contrato; }
            set { _monto_contrato = value; }
        }

        public be_FechaPagoServicio fecha_pago_servicio
        {
            get { return _fecha_pago_servicio; }
            set { _fecha_pago_servicio = value; }
        }

        public string observaciones
        {
            get { return _observaciones; }
            set { _observaciones = value; }
        }

        public string activo
        {
            get { return _activo; }
            set { _activo = value; }
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
