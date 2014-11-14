using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Trayecto
    {
        private int _id;
        private be_Contacto _contacto_origen;
        private be_Contacto _contacto_destino;
        private be_TipoTrayecto _tipo_trayecto;
        private string _dias_semana;
        private DateTime _hora_origen;
        private DateTime _hora_destino;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public be_Contacto contacto_origen
        {
            get { return _contacto_origen; }
            set { _contacto_origen = value; }
        }

        public be_Contacto contacto_destino
        {
            get { return _contacto_destino; }
            set { _contacto_destino = value; }
        }

        public be_TipoTrayecto tipo_trayecto
        {
            get { return _tipo_trayecto; }
            set { _tipo_trayecto = value; }
        }

        public string dias_semana
        {
            get { return _dias_semana; }
            set { _dias_semana = value; }
        }

        public DateTime hora_origen
        {
            get { return _hora_origen; }
            set { _hora_origen = value; }
        }

        public DateTime hora_destino
        {
            get { return _hora_destino; }
            set { _hora_destino = value; }
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
