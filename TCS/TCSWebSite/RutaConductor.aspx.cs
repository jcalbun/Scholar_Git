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
    public partial class RutaConductor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(RutaConductor));        
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
    }
}