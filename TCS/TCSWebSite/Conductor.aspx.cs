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
    public partial class Conductor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Conductor));
        }

        [Ajax.AjaxMethod()]
        public string getConductores(string strCodigo, string strRut, string strNombre, string strApellido)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_conductoresResult[] _conductores = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _conductores = dataContext.get_conductores(strCodigo, strRut, strNombre, strApellido).ToArray();

            }

            XElement _xmlConductores = new XElement("Conductores");

            foreach (get_conductoresResult _u in _conductores)
            {
                XElement _conductor = new XElement("Conductor",
                                         new XElement("Id", _u.id),
                                         new XElement("Rut", _u.rut),
                                         new XElement("Nombres", _u.nombres),
                                         new XElement("Apellidos", _u.apellidos));

                _xmlConductores.Add(_conductor);

            }

            return _xmlConductores.ToString();

        }
    }
}