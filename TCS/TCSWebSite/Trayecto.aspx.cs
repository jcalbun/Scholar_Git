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
    public partial class Trayecto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Trayecto));
        }

        [Ajax.AjaxMethod()]
        public string getTrayectos(string txtCurrentEstudiante, string txtCurrentId, string txtCurrentOrigen, string txtCurrentDestino)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_trayectosResult[] _trayectos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _trayectos = dataContext.get_trayectos(txtCurrentEstudiante, txtCurrentId, txtCurrentOrigen, txtCurrentDestino, "").ToArray();

            }

            XElement _xmlTrayectos = new XElement("Trayectos");

            foreach (get_trayectosResult _u in _trayectos)
            {
                XElement _trayecto = new XElement("Trayecto",
                                         new XElement("IdEstudiante", _u.id_estudiante),
                                         new XElement("Estudiante", _u.estudiante),
                                         new XElement("IdTrayecto", _u.id),
                                         new XElement("IdOrigen", _u.id_contacto_origen),
                                         new XElement("Origen", _u.origen),
                                         new XElement("IdDestino", _u.id_contacto_destino),
                                         new XElement("Destino", _u.destino),
                                         new XElement("HoraOrigen", _u.hora_origen),
                                         new XElement("HoraDestino", _u.hora_destino),
                                         new XElement("IdTipoTrayecto", _u.id_tipo_trayecto),
                                         new XElement("TipoTrayecto", _u.tipo_trayecto),
                                         new XElement("DiasSemana", _u.dias_semana));

                _xmlTrayectos.Add(_trayecto);

            }

            return _xmlTrayectos.ToString();

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
        public string LoadNewEstablecimientosPopupPage(string _estudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contactos_estudianteResult[] _establecimientos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimientos = dataContext.get_contactos_estudiante(Convert.ToInt32(_estudiante)).ToArray();

            }

            XElement _xmlEstablecimientos = new XElement("Contactos");

            foreach (get_contactos_estudianteResult _u in _establecimientos)
            {
                XElement establecimiento = new XElement("Contacto",
                                         new XElement("Id", _u.id),
                                         new XElement("Direccion", _u.direccion_1));

                _xmlEstablecimientos.Add(establecimiento);

            }

            return _xmlEstablecimientos.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadNewEstablecimientos2PopupPage(string _estudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contactos_establecimiento_estudianteResult[] _establecimientos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimientos = dataContext.get_contactos_establecimiento_estudiante(Convert.ToInt32(_estudiante)).ToArray();

            }

            XElement _xmlEstablecimientos = new XElement("Contactos");

            foreach (get_contactos_establecimiento_estudianteResult _u in _establecimientos)
            {
                XElement establecimiento = new XElement("Contacto",
                                         new XElement("Id", _u.id),
                                         new XElement("Id_Apoderado", _u.id_apoderado),
                                         new XElement("Id_Establecimiento", _u.id_establecimiento),
                                         new XElement("Direccion", _u.direccion_1));

                _xmlEstablecimientos.Add(establecimiento);

            }

            return _xmlEstablecimientos.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertTrayecto(string txtCurrentIdEstudiante, string txtCurrentOrigen, string txtCurrentDestino, string txtCurrentTipo, string chkCurrentLunes, string chkCurrentMartes, string chkCurrentMiercoles, string chkCurrentJueves, string chkCurrentViernes, string chkCurrentSabado, string chkCurrentDomingo, string txtCurrentHoraOrigen, string txtCurrentHoraDestino, string hidIdApoderado, string hidIdEstablecimiento)
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

            
            trayecto _con = new trayecto();

            if (txtCurrentTipo.Trim() == "I")
            {
                _con.id_contacto_origen = Convert.ToInt32(txtCurrentOrigen);
                _con.id_contacto_destino = Convert.ToInt32(txtCurrentDestino);
            }
            else
            {
                _con.id_contacto_origen = Convert.ToInt32(txtCurrentDestino);
                _con.id_contacto_destino = Convert.ToInt32(txtCurrentOrigen);
            }
           
            _con.id_tipo_trayecto = txtCurrentTipo[0];
            _con.hora_origen = Convert.ToDateTime(txtCurrentHoraOrigen);

            _con.hora_destino =Convert.ToDateTime(txtCurrentHoraDestino);
            _con.dias_semana = chkCurrentLunes[0].ToString() + chkCurrentMartes[0].ToString() + chkCurrentMiercoles[0].ToString() + chkCurrentJueves[0].ToString() + chkCurrentViernes[0].ToString() + chkCurrentSabado[0].ToString() + chkCurrentDomingo[0].ToString();
            _con.usuario_cr = "TCSUSER";
            _con.usuario_up = "TCSUSER";
            _con.fechar_cr = DateTime.Now;
            _con.fecha_up = DateTime.Now;

            dataContext.trayectos.InsertOnSubmit(_con);
            dataContext.SubmitChanges();


            trayecto_estudiante _ap = new trayecto_estudiante();
            _ap.id_trayecto = _con.id;
            _ap.id_tipo_jornada = 'M';
            _ap.activo = 'Y';
            _ap.id_apoderado = Convert.ToInt32(hidIdApoderado);
            _ap.id_establecimiento = Convert.ToInt32(hidIdEstablecimiento);
            _ap.id_estudiante = Convert.ToInt32(txtCurrentIdEstudiante);
            _ap.usuario_cr = "TCSUSER";
            _ap.usuario_up = "TCSUSER";
            _ap.fecha_cr = DateTime.Now;
            _ap.fecha_up = DateTime.Now;

            dataContext.trayecto_estudiantes.InsertOnSubmit(_ap);
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