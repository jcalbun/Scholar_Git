using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_ContactoEstablecimiento
    {
        private int _id;
        private be_Establecimiento _establecimiento;
        private be_Contacto _contacto;
        private string _usuario_cr;
        private DateTime _fecha_cr;
        private string _usuario_up;
        private DateTime _fecha_up;

        public int id
        {
            get { return _id; }
            set { _id = value; }
        }

        public be_Establecimiento establecimiento
        {
            get { return _establecimiento; }
            set { _establecimiento = value; }
        }

        public be_Contacto contacto
        {
            get { return _contacto; }
            set { _contacto = value; }
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
