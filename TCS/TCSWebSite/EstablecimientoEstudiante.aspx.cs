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
    public partial class EstablecimientoEstudiante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(EstablecimientoEstudiante));        
        }

        [Ajax.AjaxMethod()]
        public string getEstablecimientoEstudiantes(string txtEstablecimiento, string txtEstudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_establecimiento_estudiantesResult[] _establecimiento_estudiantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimiento_estudiantes = dataContext.get_establecimiento_estudiantes(txtEstablecimiento, txtEstudiante).ToArray();

            }

            XElement _xmlEstablecimientoEstudiantes = new XElement("EstablecimientoEstudiantes");

            foreach (get_establecimiento_estudiantesResult _u in _establecimiento_estudiantes)
            {
                XElement _establecimiento_estudiante = new XElement("EstablecimientoEstudiante",
                                                    new XElement("id_establecimiento", _u.id_establecimiento),
                                                    new XElement("establecimiento", _u.establecimiento),
                                                    new XElement("rut_estudiante", _u.rut_estudiante),
                                                    new XElement("id_estudiante", _u.id_estudiante),
                                                    new XElement("estudiante", _u.estudiante));

                _xmlEstablecimientoEstudiantes.Add(_establecimiento_estudiante);

            }

            return _xmlEstablecimientoEstudiantes.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadNewEstudiantesPopupPage(string _rut_estudiante, string _nombres_estudiante, string _apellidos_estudiante)
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
        public string LoadNewEstablecimientosPopupPage(string _id, string _descripcion)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_establecimientosResult[] _establecimientos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimientos = dataContext.get_establecimientos(_id, _descripcion).ToArray();

            }

            XElement _xmlEstablecimientos = new XElement("Establecimientos");

            foreach (get_establecimientosResult _u in _establecimientos)
            {
                XElement establecimiento = new XElement("Establecimiento",
                                         new XElement("Id", _u.id),
                                         new XElement("Nombre", _u.descripcion),
                                         new XElement("Direccion", _u.direccion_1));

                _xmlEstablecimientos.Add(establecimiento);

            }

            return _xmlEstablecimientos.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertEstablecimientoEstudiante(string txtCodigoEst, string txtCodigoEstabl)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            establecimiento_estudiante _ap = new establecimiento_estudiante();

            _ap.id_establecimiento = Convert.ToInt32(txtCodigoEstabl);
            _ap.id_estudiante = Convert.ToInt32(txtCodigoEst);
            _ap.usuario_cr = "TCSUSER";
            _ap.usuario_up = "TCSUSER";
            _ap.fecha_cr = DateTime.Now;
            _ap.fecha_up = DateTime.Now;


            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            dataContext.establecimiento_estudiantes.InsertOnSubmit(_ap);
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