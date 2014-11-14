using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{

    public class be_Contacto
    {
        private int _id;
        private string _direccion_1;
        private string _direccion_2;
        private string _telefono_1;
        private string _telefono_2;
        private string _email;
        private string _comentarios;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string direccion_1
        {
            get { return _direccion_1; }
            set { _direccion_1 = value; }
        }

        public string direccion_2
        {
            get { return _direccion_2; }
            set { _direccion_2 = value; }
        }

        public string telefono_1
        {
            get { return _telefono_1; }
            set { _telefono_1 = value; }
        }

        public string telefono_2
        {
            get { return _telefono_2; }
            set { _telefono_2 = value; }
        }

        public string email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string comentarios
        {
            get { return _comentarios; }
            set { _comentarios = value; }
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
