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
    public partial class ApoderadoEstudiante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(ApoderadoEstudiante));        
        }

        [Ajax.AjaxMethod()]
        public string getApoderadoEstudiantes(string txtApoderado, string txtEstudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_apoderado_estudiantesResult[] _apoderado_estudiantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderado_estudiantes = dataContext.get_apoderado_estudiantes(txtApoderado, txtEstudiante).ToArray();

            }

            XElement _xmlApoderadoEstudiantes = new XElement("ApoderadoEstudiantes");

            foreach (get_apoderado_estudiantesResult _u in _apoderado_estudiantes)
            {
                XElement _apoderado_estudiante =    new XElement("ApoderadoEstudiante",
                                                    new XElement("IdApoderado", _u.id_apoderado),
                                                    new XElement("Apoderado", _u.apoderado),
                                                    new XElement("IdEstudiante", _u.id_estudiante),
                                                    new XElement("Estudiante", _u.estudiante));

                _xmlApoderadoEstudiantes.Add(_apoderado_estudiante);

            }

            return _xmlApoderadoEstudiantes.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadApoderadosPopupPage(string _rut_apoderado, string _apellidos_apoderado, string _nombres_apoderado)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_apoderadosResult[] _apoderados = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderados = dataContext.get_apoderados("", _rut_apoderado, _nombres_apoderado, _apellidos_apoderado, "", "", "").ToArray();

            }

            XElement _xmlApoderados = new XElement("Apoderados");

            foreach (get_apoderadosResult _u in _apoderados)
            {
                XElement apoderado = new XElement("Apoderado",
                                         new XElement("Id", _u.id_ap),
                                         new XElement("Rut", _u.rut_ap),
                                         new XElement("Nombre", _u.apellidos_ap.Trim() + "," + _u.nombres_ap.Trim()));

                _xmlApoderados.Add(apoderado);

            }

            return _xmlApoderados.ToString();
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
                                         new XElement("Nombre", _u.apellidos.Trim() + "," + _u.nombres.Trim()));

                _xmlEstudiantes.Add(Estudiante);

            }

            return _xmlEstudiantes.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertApoderadoEstudiante(string txtCodigoAp, string txtCodigoEst)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            apoderado_estudiante _ap = new apoderado_estudiante();

            _ap.id_apoderado = Convert.ToInt32(txtCodigoAp);
            _ap.id_estudiante = Convert.ToInt32(txtCodigoEst);
            _ap.usuario_cr = "TCSUSER";
            _ap.usuario_up = "TCSUSER";
            _ap.fecha_cr = DateTime.Now;
            _ap.fecha_up = DateTime.Now;


            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            dataContext.apoderado_estudiantes.InsertOnSubmit(_ap);
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
    }
}