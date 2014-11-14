using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Ayudante
    {
        private int _id;
        private string _rut;
        private string _nombres;
        private string _apellidos;
        private string _fotografia;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string rut
        {
            get { return _rut; }
            set { _rut = value; }
        }

        public string nombres
        {
            get { return _nombres; }
            set { _nombres = value; }
        }

        public string apellidos
        {
            get { return _apellidos; }
            set { _apellidos = value; }
        }

        public string fotografia
        {
            get { return _fotografia; }
            set { _fotografia = value; }
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
