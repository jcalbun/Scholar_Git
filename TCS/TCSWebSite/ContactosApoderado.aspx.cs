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
    public partial class ContactosApoderado : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(ContactosApoderado));
        }

        [Ajax.AjaxMethod()]
        public string getContactosApoderado(string _apoderado, string _contacto, string _direccion, string _telefono)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contactos_apoderadoResult[] _contactos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _contactos = dataContext.get_contactos_apoderado(_apoderado, _contacto,_direccion, _telefono).ToArray();

            }

            XElement _xmlContactos = new XElement("Contactos");

            foreach (get_contactos_apoderadoResult _u in _contactos)
            {
                XElement contacto = new XElement("Contacto",
                                         new XElement("IdApoderado", _u.id),
                                         new XElement("ApellidosAP", _u.apellidos_ap),
                                         new XElement("NombresAP", _u.nombres_ap),
                                         new XElement("NombreCompletoAP", _u.nombre_completo_ap),
                                         new XElement("IdContacto", _u.id_contacto),
                                         new XElement("Direccion1", _u.direccion_1),
                                         new XElement("Direccion2", _u.direccion_2),
                                         new XElement("Telefono1", _u.telefono_1),
                                         new XElement("Telefono2", _u.telefono_2),
                                         new XElement("Email", _u.email),
                                         new XElement("Comentarios", _u.comentarios));

                _xmlContactos.Add(contacto);

            }

            return _xmlContactos.ToString();

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
        public string InsertContactosApoderado(string txtCodigoAp, string txtCurrentDireccion1, string txtCurrentDireccion2,string txtCurrentTelefono1,string txtCurrentTelefono2,string txtCurrentEmail,string txtCurrentObs)
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

            contacto _con = new contacto();

            _con.direccion_1 = txtCurrentDireccion1;
            _con.direccion_2 = txtCurrentDireccion2;
            _con.telefono_1 = txtCurrentTelefono1;
            _con.telefono_2 = txtCurrentTelefono2;
            _con.email = txtCurrentEmail;
            _con.comentarios = txtCurrentObs;
            _con.usuario_cr = "TCSUSER";
            _con.usuario_up = "TCSUSER";
            _con.fecha_cr = DateTime.Now;
            _con.fecha_up = DateTime.Now;

            dataContext.contactos.InsertOnSubmit(_con);
            dataContext.SubmitChanges();
            
            contacto_apoderado _ap = new contacto_apoderado();

            _ap.id_apoderado = Convert.ToInt32(txtCodigoAp);
            _ap.id_contacto = _con.id;
            _ap.usuario_cr = "TCSUSER";
            _ap.usuario_up = "TCSUSER";
            _ap.fechar_cr = DateTime.Now;
            _ap.fecha_up = DateTime.Now;

            dataContext.contacto_apoderados.InsertOnSubmit(_ap);
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