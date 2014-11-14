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
    public partial class Contratos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Contratos));
            //btnGenerateLetter_OnClick();
        }

        [Ajax.AjaxMethod()]
        public string GenerateContract(string nombre_tran, string rut_tran, string fono_tran, string domicilio_tran, string nombre_apo, string rut_apo, string fono_apo, string domicilio_apo, string nombre_estab, string nombre_estudiante, string horario_trayecto, string monto_numero, string fecha_ini, string fecha_fin)
        {
            //Response.Redirect("Contrato_Print.aspx?nombre_tran=" + nombre_tran + "&rut_tran=" + rut_tran + "&fono_tran=" + fono_tran + "&domicilio_tran=" + domicilio_tran + "&rut_apo=" + rut_tran + "&rut_apo=" + fono_apo + "&fono_apo=" + domicilio_apo + "&domicilio_apo=" + nombre_estab + "&nombre_estab=" + nombre_estab + "&nombre_estudiante=" + nombre_estudiante + "&horario_trayecto=" + horario_trayecto + "&monto_numero=" + monto_numero + "&fecha_ini=" + fecha_ini + "&fecha_fin=" + fecha_fin);
            HttpContext.Current.Response.Redirect("Contrato_Print.aspx");

            return "true";
        }



        [Ajax.AjaxMethod()]
        public string getContratos(string txtContratoId, string txtApoderado, string txtEstudiante, string txtAnoContrato, string ddlFechaPago)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contratos2Result[] _contratos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _contratos = dataContext.get_contratos2(txtContratoId, txtApoderado, txtEstudiante, txtAnoContrato, ddlFechaPago).ToArray();

            }

            XElement _xmlContratos = new XElement("Contratos");

            foreach (get_contratos2Result _u in _contratos)
            {
                XElement _contrato = new XElement("Contrato",
                                         new XElement("id_contrato", _u.id),
                                         new XElement("id_apoderado", _u.id_apoderado),
                                         new XElement("apoderado", _u.apoderado.Trim()),
                                         new XElement("id_estudiante", _u.id_estudiante),
                                         new XElement("estudiante", _u.estudiante),
                                         new XElement("id_fecha_pago_contrato", _u.id_fecha_pago_contrato),
                                         new XElement("fecha_pago_contrato", _u.fecha_pago_contrato),
                                         new XElement("ano_contrato", _u.ano),
                                         new XElement("monto_contrato", Convert.ToInt32(_u.monto_contrato)),
                                         new XElement("activo", _u.activo),
                                         new XElement("fecha_inicio", _u.fecha_inicio.Value.ToShortDateString()),
                                         new XElement("fecha_fin", _u.fecha_fin.Value.ToShortDateString()),
                                         new XElement("rut_apoderado", _u.rut_apoderado),
                                         new XElement("id_establecimiento", _u.id_establecimiento),
                                         new XElement("nombre_establecimiento", _u.nombre_establecimiento),
                                         new XElement("itinerario", _u.itinerario),
                                         new XElement("direccion_apoderado", _u.direccion_apoderado),
                                         new XElement("telefono_apoderado", _u.telefono_apoderado),
                                         new XElement("observaciones", _u.observaciones));

                _xmlContratos.Add(_contrato);

            }

            return _xmlContratos.ToString();

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
                                         new XElement("Direccion", _u.direccion),
                                         new XElement("Telefono", _u.telefono),
                                         new XElement("Nombre", _u.apellidos_ap.Trim() + " " + _u.nombres_ap.Trim()));

                _xmlApoderados.Add(apoderado);

            }

            return _xmlApoderados.ToString();
        }

        [Ajax.AjaxMethod()]
        public string LoadEstudiantesPopupPage(string _rut_estudiante, string _nombres_estudiante, string _apellidos_estudiante, string id_apoderado)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_estudiantesResult[] _Estudiantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _Estudiantes = dataContext.get_estudiantes("", _rut_estudiante, _nombres_estudiante, _apellidos_estudiante, "", "", "", id_apoderado).ToArray();

            }

            XElement _xmlEstudiantes = new XElement("Estudiantes");

            foreach (get_estudiantesResult _u in _Estudiantes)
            {
                XElement Estudiante = new XElement("Estudiante",
                                         new XElement("Id", _u.id),
                                         new XElement("Rut", _u.rut),
                                         new XElement("Nombre", _u.apellidos.Trim() + " " + _u.nombres.Trim()));

                _xmlEstudiantes.Add(Estudiante);

            }

            return _xmlEstudiantes.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadNewEstablecimientosPopupPage(string _id_estudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            if (_id_estudiante.Trim() == "") _id_estudiante = null;

            get_establecimiento_estudiantes_2Result[] _establecimientos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimientos = dataContext.get_establecimiento_estudiantes_2(_id_estudiante).ToArray();

            }

            XElement _xmlEstablecimientos = new XElement("Establecimientos");

            foreach (get_establecimiento_estudiantes_2Result _u in _establecimientos)
            {
                XElement establecimiento = new XElement("Establecimiento",
                                         new XElement("Id_Establecimiento", _u.id_establecimiento),
                                         new XElement("Nombre", _u.establecimiento),
                                         new XElement("Direccion", _u.direccion_1),
                                         new XElement("Itinerario", _u.itinerario));

                _xmlEstablecimientos.Add(establecimiento);

            }

            return _xmlEstablecimientos.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertContratos(string txtCurrentContrato, string txtCurrentIdApoderado, string txtCurrentIdEstudiante, string ddlCurrentAnoContrato, string txtCurrentFechaInicio, string txtCurrentFechaFin, string txtCurrentMonto, string ddlCurrentFechaPago, string txtCurrentObs, string chkCurrentActivo)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            contrato _new = new contrato();

            _new.activo = chkCurrentActivo[0];
            _new.ano = Convert.ToInt32(ddlCurrentAnoContrato);
            _new.id_apoderado = Convert.ToInt32(txtCurrentIdApoderado);
            _new.id_estudiante = Convert.ToInt32(txtCurrentIdEstudiante);
            _new.id_fecha_pago_contrato = Convert.ToInt32(ddlCurrentFechaPago);
            _new.monto_contrato = Convert.ToDecimal(txtCurrentMonto);
            _new.observaciones = txtCurrentObs;
            _new.fecha_inicio = Convert.ToDateTime(txtCurrentFechaInicio);
            _new.fecha_fin = Convert.ToDateTime(txtCurrentFechaFin);
            _new.usuario_cr = "TCSUSER";
            _new.usuario_up = "TCSUSER";
            _new.fecha_cr = DateTime.Now;
            _new.fecha_up = DateTime.Now;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            dataContext.contratos.InsertOnSubmit(_new);
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