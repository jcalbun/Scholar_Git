using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCSBusinessEntities
{
    public class be_Minibus
    {
        private int _id;
        private string _numero_patente;
        private string _marca;
        private string _modelo;
        private int _ano;
        private string _tipo_combustible;
        private int _kilometraje;
        private int _ano_inicio_actividad;
        private string _descripcion;
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
        public string numero_patente
        {
            get { return _numero_patente; }
            set { _numero_patente = value; }
        }
        public string marca
        {
            get { return _marca; }
            set { _marca = value; }
        }
        public string modelo
        {
            get { return _modelo; }
            set { _modelo = value; }
        }
        public int ano
        {
            get { return _ano; }
            set { _ano = value; }
        }
        public string tipo_combustible
        {
            get { return _tipo_combustible; }
            set { _tipo_combustible = value; }
        }
        public int kilometraje
        {
            get { return _kilometraje; }
            set { _kilometraje = value; }
        }
        public int ano_inicio_actividad
        {
            get { return _ano_inicio_actividad; }
            set { _ano_inicio_actividad = value; }
        }
        public string descripcion
        {
            get { return _descripcion; }
            set { _descripcion = value; }
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
