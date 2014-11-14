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
    public partial class Apoderados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Apoderados));
        }

        [Ajax.AjaxMethod()]
        public bool existsRut(string _rut)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            apoderado _apoderado = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderado = (from u in dataContext.apoderados
                            where (u.rut.Trim() == _rut.Trim())
                            select u).FirstOrDefault();
            }

            if (_apoderado != null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        [Ajax.AjaxMethod()]
        public string getApoderados(string _id_apoderado, string _rut_apoderado, string _nombres_apoderado, string _apellidos_apoderado, string _nombre_estudiante, string _nombre_establecimiento, string _contacto)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_apoderadosResult[] _apoderados = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderados = dataContext.get_apoderados(_id_apoderado, _rut_apoderado, _nombres_apoderado, _apellidos_apoderado, _nombre_estudiante, _nombre_establecimiento, _contacto).ToArray();
            }

            XElement _xmlApoderados = new XElement("Apoderados");

            foreach (get_apoderadosResult _u in _apoderados)
            {
                XElement apoderado = new XElement("Apoderado",
                                         new XElement("Id", _u.id_ap),
                                         new XElement("Rut", _u.rut_ap),
                                         new XElement("Apellidos", _u.apellidos_ap),
                                         new XElement("Nombres", _u.nombres_ap),
                                         new XElement("TieneContrato", _u.tiene_contrato),
                                         new XElement("TipoParentezco", _u.id_tipo_parentezco));
                _xmlApoderados.Add(apoderado);

            }

            return _xmlApoderados.ToString();

        }

        [Ajax.AjaxMethod()]
        public string InsertApoderado(string txtCodigo, string txtRut, string txtNombre, string txtApellidos, string txtTieneContrato, string txtParentesco)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            apoderado _apoderado = new apoderado();

            _apoderado.rut = txtRut;
            _apoderado.apellidos = txtApellidos;
            _apoderado.nombres = txtNombre;
            _apoderado.tiene_contrato = txtTieneContrato[0];
            _apoderado.id_tipo_parentezco = txtParentesco[0];
            _apoderado.usuario_cr = "TCSUSER";
            _apoderado.usuario_up = "TCSUSER";
            _apoderado.fecha_cr = DateTime.Now;
            _apoderado.fecha_up = DateTime.Now;
            

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            dataContext.apoderados.InsertOnSubmit(_apoderado);
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
        public string UpdateApoderado(string txtCodigo, string txtRut, string txtNombre, string txtApellidos, string txtTieneContrato, string txtParentesco)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            apoderado _apoderado = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderado = (from u in dataContext.apoderados
                              where (u.id.ToString().Trim() == txtCodigo.Trim())
                              select u).FirstOrDefault();

                if (_apoderado != null)
                {
                    _apoderado.apellidos = txtApellidos;
                    _apoderado.nombres = txtNombre;
                    _apoderado.rut = txtRut;
                    _apoderado.tiene_contrato = txtTieneContrato.Trim()[0];
                    _apoderado.id_tipo_parentezco = txtParentesco.Trim()[0];
                    _apoderado.fecha_up = DateTime.Now;
                    _apoderado.usuario_up = "TCSUSER";

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

    }
}