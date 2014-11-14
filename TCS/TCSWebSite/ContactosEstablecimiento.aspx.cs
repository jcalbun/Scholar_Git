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
    public partial class ContactosEstablecimiento : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(ContactosEstablecimiento));        
        }

        [Ajax.AjaxMethod()]
        public string getContactosEstablecimiento(string txtEstablecimiento, string txtContacto, string txtDireccion, string txtTelefono)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contactos_establecimientoResult[] _contactos_establecimiento = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _contactos_establecimiento = dataContext.get_contactos_establecimiento(txtEstablecimiento, txtContacto, txtDireccion, txtTelefono).ToArray();

            }

            XElement _xmlContactosEstablecimiento = new XElement("ContactosEstablecimiento");

            foreach (get_contactos_establecimientoResult _u in _contactos_establecimiento)
            {
                XElement _contacto_establecimiento = new XElement("ContactoEstablecimiento",
                                                    new XElement("id_establecimiento", _u.id_establecimiento),
                                                    new XElement("establecimiento", _u.establecimiento),
                                                    new XElement("id_contacto", _u.id_contacto),
                                                    new XElement("direccion_1", _u.direccion_1),
                                                    new XElement("direccion_2", _u.direccion_2),
                                                    new XElement("telefono_1", _u.telefono_1),
                                                    new XElement("telefono_2", _u.telefono_2),
                                                    new XElement("email", _u.email),
                                                    new XElement("observaciones", _u.observaciones));

                _xmlContactosEstablecimiento.Add(_contacto_establecimiento);

            }

            return _xmlContactosEstablecimiento.ToString();

        }
    }
}