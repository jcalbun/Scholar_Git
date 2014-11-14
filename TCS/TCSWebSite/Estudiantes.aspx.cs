using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Threading;
using System.Xml;
using System.Xml.Serialization;
using System.Xml.Linq;
using System.Linq;
using System.Text;
using TCSGateway;
using TCSDataClasses;


using System.IO;
using System.Text;
using System.Runtime.InteropServices;
using System.Web.Configuration;
using System.Web.SessionState;
using System.Threading;


namespace TCSWebSite
{
    public partial class Estudiantes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Estudiantes));
        }

        [Ajax.AjaxMethod()]
        public string getEstudiantes(string _id_estudiante, string _rut_estudiante, string _nombres_estudiante, string _apellidos_estudiante, string _apoderado, string _nombre_establecimiento, string _contacto)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_estudiantesResult[] _Estudiantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _Estudiantes = dataContext.get_estudiantes(_id_estudiante, _rut_estudiante, _nombres_estudiante, _apellidos_estudiante, _apoderado, _nombre_establecimiento, _contacto, "").ToArray();

            }

            XElement _xmlEstudiantes = new XElement("Estudiantes");

            foreach (get_estudiantesResult _u in _Estudiantes)
            {
                XElement Estudiante = new XElement("Estudiante",
                                         new XElement("Id", _u.id),
                                         new XElement("Rut", _u.rut),
                                         new XElement("Apellidos", _u.apellidos),
                                         new XElement("Nombres", _u.nombres),
                                         new XElement("Nombres", _u.fotografia),
                                         new XElement("Observaciones", _u.observaciones));

                _xmlEstudiantes.Add(Estudiante);

            }

            return _xmlEstudiantes.ToString();

        }

        [Ajax.AjaxMethod()]
        public bool existsRut(string _rut)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            estudiante _estudiante = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _estudiante = (from u in dataContext.estudiantes
                              where (u.rut.Trim() == _rut.Trim())
                              select u).FirstOrDefault();
            }

            if (_estudiante != null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        [Ajax.AjaxMethod()]
        public string InsertEstudiante(string txtRut, string txtNombre, string txtApellidos, string txtObservaciones)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            estudiante _estudiante = new estudiante();

            _estudiante.rut = txtRut;
            _estudiante.apellidos = txtApellidos;
            _estudiante.nombres = txtNombre;
            _estudiante.observaciones = txtObservaciones;
            _estudiante.usuario_cr = "TCSUSER";
            _estudiante.usuario_up = "TCSUSER";
            _estudiante.fecha_cr = DateTime.Now;
            _estudiante.fecha_up = DateTime.Now;


            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            dataContext.estudiantes.InsertOnSubmit(_estudiante);
            dataContext.SubmitChanges();

            result = true;


            ms = new MemoryStream();

            xtw = new XmlTextWriter(ms, Encoding.UTF8);

            xs = new XmlSerializer(typeof(bool));

            xs.Serialize(xtw, result);

            ms = (MemoryStream)xtw.BaseStream;

            string xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray());

            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);

            return xmlResult;
        }

        [Ajax.AjaxMethod()]
        public string UpdateEstudiante(string txtCodigo, string txtRut, string txtNombre,  string txtApellidos, string txtObservaciones)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            estudiante _estudiante = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _estudiante = (from u in dataContext.estudiantes
                              where (u.id.ToString().Trim() == txtCodigo.Trim())
                              select u).FirstOrDefault();

                if (_estudiante != null)
                {
                    _estudiante.rut = txtRut;
                    _estudiante.apellidos = txtApellidos;
                    _estudiante.nombres = txtNombre;
                    _estudiante.observaciones = txtObservaciones;
                    _estudiante.usuario_up = "TCSUSER";
                    _estudiante.fecha_up = DateTime.Now;

                    dataContext.SubmitChanges();

                    result = true;
                }
                else
                {
                    result = false;

                }
            }

            ms = new MemoryStream();

            xtw = new XmlTextWriter(ms, Encoding.UTF8);

            xs = new XmlSerializer(typeof(bool));

            xs.Serialize(xtw, result);

            ms = (MemoryStream)xtw.BaseStream;

            string xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray());

            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);

            return xmlResult;


        }

        [Ajax.AjaxMethod()]
        public string LoadEstudiantesPopupPage(string _rut_estudiante, string _nombres_estudiante, string _apellidos_estudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_estudiantesResult[] _Estudiantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _Estudiantes = dataContext.get_estudiantes("", _rut_estudiante, _nombres_estudiante, _apellidos_estudiante, "", "", "", "").ToArray();

            }

            XElement _xmlEstudiantes = new XElement("Estudiantes");

            foreach (get_estudiantesResult _u in _Estudiantes)
            {
                XElement Estudiante = new XElement("Estudiante",
                                         new XElement("Id", _u.id),
                                         new XElement("Rut", _u.rut),
                                         new XElement("Apellido", _u.apellidos.Trim()),
                                         new XElement("Nombre", _u.nombres.Trim()));

                _xmlEstudiantes.Add(Estudiante);

            }

            return _xmlEstudiantes.ToString();

        }


    }
}