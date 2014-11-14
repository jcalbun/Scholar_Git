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


namespace TCSWebSite
{
    public partial class ContactosConductor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(ContactosConductor));
        }

        [Ajax.AjaxMethod()]
        public string getContactosConductor(string txtConductor, string txtContacto, string txtDireccion, string txtTelefono)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contactos_conductorResult[] _contactos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _contactos = dataContext.get_contactos_conductor(txtConductor, txtContacto, txtDireccion, txtTelefono).ToArray();

            }

            XElement _xmlContactos = new XElement("Contactos");

            foreach (get_contactos_conductorResult _u in _contactos)
            {
                XElement contacto = new XElement("Contacto",
                                         new XElement("IdConductor", _u.id_conductor),
                                         new XElement("Conductor", _u.conductor),
                                         new XElement("IdContacto", _u.id_contacto),
                                         new XElement("Direccion1", _u.direccion_1),
                                         new XElement("Direccion2", _u.direccion_2),
                                         new XElement("Telefono1", _u.telefono_1),
                                         new XElement("Telefono2", _u.telefono_2),
                                         new XElement("Email", _u.email),
                                         new XElement("Comentarios", _u.observaciones));

                _xmlContactos.Add(contacto);

            }

            return _xmlContactos.ToString();

        }


    }
}