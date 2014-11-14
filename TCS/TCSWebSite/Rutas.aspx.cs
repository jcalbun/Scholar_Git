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
    public partial class Rutas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Rutas));        
        }

        [Ajax.AjaxMethod()]
        public string getRutas(string txtIdRuta, string txtEstudianteId)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_rutas_genResult[] _rutas = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _rutas = dataContext.get_rutas_gen(txtIdRuta, "").ToArray();

            }

            XElement _xmlRutas = new XElement("Rutas");

            foreach (get_rutas_genResult _u in _rutas)
            {
                XElement _ruta = new XElement("Ruta",
                                         new XElement("IdRuta", _u.id_ruta),
                                         new XElement("DescripcionRuta", _u.descripcion),
                                         new XElement("ObsRutas", _u.observaciones));

                _xmlRutas.Add(_ruta);

            }

            return _xmlRutas.ToString();

        }

         [Ajax.AjaxMethod()]
        public string GetReporteRuta(string nombre_tran, string nombre_ruta, string nombre_ayudante, string descripcion_vehiculo, string codigo_ruta)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            GET_RPT_RUTAS_TRANSPORTEResult[] _rutas = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _rutas = dataContext.GET_RPT_RUTAS_TRANSPORTE(Convert.ToInt32(codigo_ruta)).ToArray();

            }

            XElement _xmlRutas = new XElement("Rutas");

            foreach (GET_RPT_RUTAS_TRANSPORTEResult _u in _rutas)
            {
                XElement _ruta = new XElement("Ruta",
                                         new XElement("id_ruta", _u.id_ruta),
                                         new XElement("nombre_ruta", _u.nombre_ruta),
                                         new XElement("obs_ruta", _u.obs_ruta),
                                         new XElement("id_estudiante", _u.ID_ESTUDIANTE),
                                         new XElement("estudiante", _u.ESTUDIANTE),
                                         new XElement("id_contacto_origen", _u.id_contacto_origen),
                                         new XElement("direccion_origen", _u.DIRECCION_ORIGEN),
                                         new XElement("telefono_origen", _u.TELEFONO_ORIGEN),
                                         new XElement("hora_origen", _u.hora_origen.ToShortTimeString()),
                                         new XElement("id_establecimiento", _u.ID_ESTABLECIMIENTO),
                                         new XElement("nombre_establecimiento", _u.nombre_establecimiento),
                                         new XElement("direccion_destino", _u.DIRECCION_DESTINO),
                                         new XElement("telefono_destino", _u.TELEFONO_DESTINO));

                _xmlRutas.Add(_ruta);

            }

            XmlDocument doc1 = new XmlDocument();
            doc1.LoadXml(_xmlRutas.ToString());

            XmlWriterSettings oSettings = new XmlWriterSettings();
            oSettings.Indent = true;
            oSettings.OmitXmlDeclaration = false;
            oSettings.Encoding = Encoding.ASCII;

            XmlWriter writer = XmlWriter.Create(HttpContext.Current.Server.MapPath("~/documents/xmlfile.xml"), oSettings);
            doc1.WriteTo(writer);
            writer.Close();
            

            return _xmlRutas.ToString();

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
        public string LoadTrayectosPopupPage(string _id_estudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_trayectosResult[] _Trayectos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _Trayectos = dataContext.get_trayectos("", "", "", "", _id_estudiante).ToArray();

            }

            XElement _xmlTrayectos = new XElement("Trayectos");

            foreach (get_trayectosResult _u in _Trayectos)
            {
                XElement xmlTrayecto = new XElement("Trayecto",
                                         new XElement("Id", _u.id),
                                         new XElement("Origen", _u.origen),
                                         new XElement("Destino", _u.destino),
                                         new XElement("Estudiante", _u.estudiante));

                _xmlTrayectos.Add(xmlTrayecto);

            }

            return _xmlTrayectos.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertRuta(string txtCurrentIdRuta, string txtCurrentDescripcion, string txtCurrentObs)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;
            
            ruta _ruta = new ruta();
            _ruta.descripcion = txtCurrentDescripcion;
            _ruta.observaciones = txtCurrentObs;
            _ruta.id_trayecto = 0;

            _ruta.usuario_cr = "TCSUSER";
            _ruta.usuario_up = "TCSUSER";
            _ruta.fecha_cr = DateTime.Now;
            _ruta.fecha_up = DateTime.Now;

            dataContext.rutas.InsertOnSubmit(_ruta);
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
        public string UpdateRuta(string txtCurrentIdRuta, string txtCurrentDescripcion, string txtCurrentObs)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            ruta _ruta = null;

            _ruta = (from u in dataContext.rutas
                     where (u.id.ToString().Trim() == txtCurrentIdRuta.Trim())
                     select u).FirstOrDefault();

            if (_ruta != null)
            {
                _ruta.descripcion = txtCurrentDescripcion;
                _ruta.observaciones = txtCurrentObs;
                _ruta.id_trayecto = 0;
                _ruta.usuario_up = "TCSUSER";
                _ruta.fecha_up = DateTime.Now;
                dataContext.SubmitChanges();
            }


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