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
    public partial class RutaMinibus : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(RutaMinibus));        
        }

        [Ajax.AjaxMethod()]
        public string getRutaMinibuses(string txtRuta, string txtTrayecto, string txtMinibus, string txtEstudiante, string txtConductor)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ruta_minibusesResult[] _ruta_minibuses = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _ruta_minibuses = dataContext.get_ruta_minibuses(txtRuta, txtMinibus, txtTrayecto, txtEstudiante, txtConductor).ToArray();

            }

            XElement _xmlRutaMinibuses = new XElement("RutaMinibuses");

            foreach (get_ruta_minibusesResult _u in _ruta_minibuses)
            {
                XElement _ruta_conductor = new XElement("RutaMinibus",
                                         new XElement("IdRuta", _u.id_ruta),
                                         new XElement("Ruta", _u.nombre_ruta),
                                         new XElement("IdTrayecto", _u.id_trayecto),
                                         new XElement("Trayecto", _u.trayecto),
                                         new XElement("IdMinibus", _u.id_minibus),
                                         new XElement("Minibus", _u.minibus),
                                         new XElement("IdEstudiante", _u.id_estudiante),
                                         new XElement("Estudiante", _u.estudiante));

                _xmlRutaMinibuses.Add(_ruta_conductor);

            }

            return _xmlRutaMinibuses.ToString();

        }
    }
}