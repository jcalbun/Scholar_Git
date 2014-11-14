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
using System.Runtime.InteropServices;
using System.Web.Configuration;
using System.Web.SessionState;

namespace TCSWebSite
{
    public partial class RutaEstudiante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(RutaEstudiante));        
        }

        [Ajax.AjaxMethod()]
        public string getRutaEstudiantes(string txtRuta, string txtTrayecto, string txtEstudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ruta_estudiantesResult[] _result_list = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _result_list = dataContext.get_ruta_estudiantes(txtRuta, txtTrayecto, txtEstudiante).ToArray();

            }

            XElement _xmlResults = new XElement("Rutas");

            foreach (get_ruta_estudiantesResult _u in _result_list)
            {
                XElement _result = new XElement("Ruta",
                                         new XElement("IdEstudiante", _u.id_estudiante),
                                         new XElement("Estudiante", _u.estudiante),
                                         new XElement("IdTrayecto", _u.id_trayecto),
                                         new XElement("Trayecto", _u.trayecto),
                                         new XElement("TipoTrayecto", _u.nombre_tipo_trayecto),
                                         new XElement("IdRuta", _u.id_ruta),
                                         new XElement("DescripcionRuta", _u.descripcion));

                _xmlResults.Add(_result);

            }

            return _xmlResults.ToString();

        }

        [Ajax.AjaxMethod()]
        public string Insert(string txtCurrentRutaId, string txtCurrentEstudianteId, string txtCurrentTrayectoId)
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


            ruta_trayecto _new = new ruta_trayecto();
            _new.id_ruta = Convert.ToInt32(txtCurrentRutaId);
            _new.id_trayecto = Convert.ToInt32(txtCurrentTrayectoId);
            _new.usuario_cr = "TCSUSER";
            _new.usuario_up = "TCSUSER";
            _new.fecha_cr = DateTime.Now;
            _new.fecha_up = DateTime.Now;

            dataContext.ruta_trayectos.InsertOnSubmit(_new);
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

        //[Ajax.AjaxMethod()]Update(string txtCurrentRutaId, string txtCurrentEstudianteId, string txtCurrentTrayectoId)
        //{
        //    //Set dates and local settings for the current thread
        //    //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

        //    XmlSerializer xs = new XmlSerializer(typeof(bool));

        //    MemoryStream ms = new MemoryStream();

        //    XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

        //    bool result = false;

        //    gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
        //    _gw_ScholarConnection.Connection();

        //    ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;


        //    ruta_trayecto _new = null;

        //    _new = (from u in dataContext.ruta_trayectos
        //            where u.id_ruta.ToString().Trim() == txtCurrentRutaId.Trim() && u.id_trayecto.ToString().Trim() == txtCurrentTrayectoId.Trim()
        //            select u).FirstOrDefault();

        //    if (_new != null)
        //    {
        //        _new.id_trayecto = 
        //    }

        //    result = true;

        //    ms = new MemoryStream();

        //    xtw = new XmlTextWriter(ms, Encoding.UTF8);

        //    xs = new XmlSerializer(typeof(bool));

        //    xs.Serialize(xtw, result);

        //    ms = (MemoryStream)xtw.BaseStream;

        //    string xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray());

        //    xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);

        //    return xmlResult;
        //}

        [Ajax.AjaxMethod()]
        public string Delete(string txtCurrentRutaId, string txtCurrentEstudianteId, string txtCurrentTrayectoId)
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


            ruta_trayecto _new = null;

            _new = (from u in dataContext.ruta_trayectos
                    where u.id_ruta.ToString().Trim() == txtCurrentRutaId.Trim() && u.id_trayecto.ToString().Trim() == txtCurrentTrayectoId.Trim()
                    select u).FirstOrDefault();

            if (_new != null)
            {
                    dataContext.ruta_trayectos.DeleteOnSubmit(_new);
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


        [Ajax.AjaxMethod()]
        public string getRutaConductores(string txtRuta, string txtTrayecto, string txtConductor)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ruta_conductoresResult[] _ruta_conductores = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _ruta_conductores = dataContext.get_ruta_conductores(txtRuta, txtConductor, txtTrayecto).ToArray();

            }

            XElement _xmlRutaConductores = new XElement("RutaConductores");

            foreach (get_ruta_conductoresResult _u in _ruta_conductores)
            {
                XElement _ruta_conductor = new XElement("RutaConductor",
                                         new XElement("IdRuta", _u.id_ruta),
                                         new XElement("Ruta", _u.nombre_ruta),
                                         new XElement("IdTrayecto", _u.id_trayecto),
                                         new XElement("Trayecto", _u.trayecto),
                                         new XElement("IdConductor", _u.id_conductor),
                                         new XElement("Conductor", _u.conductor));

                _xmlRutaConductores.Add(_ruta_conductor);

            }

            return _xmlRutaConductores.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadRutasPopupPage(string _id_ruta, string _descripcion_ruta)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_rutas_genResult[] _rutas = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _rutas = dataContext.get_rutas_gen(_id_ruta, _descripcion_ruta).ToArray();

            }

            XElement _xmlRutas = new XElement("Rutas");

            foreach (get_rutas_genResult _u in _rutas)
            {
                XElement _ruta = new XElement("Ruta",
                                         new XElement("Id", _u.id_ruta),
                                         new XElement("Descripcion", _u.descripcion));

                _xmlRutas.Add(_ruta);

            }

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
                                         new XElement("Estudiante", _u.estudiante),
                                         new XElement("Tipo", _u.tipo_trayecto));

                _xmlTrayectos.Add(xmlTrayecto);

            }

            return _xmlTrayectos.ToString();

        }
    }
}