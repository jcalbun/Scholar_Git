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
    public partial class Ayudante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Ayudante));

        }

        [Ajax.AjaxMethod()]
        public string getAyudantes(string strCodigo, string strRut, string strNombre, string strApellido)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ayudantesResult[] _ayudantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _ayudantes = dataContext.get_ayudantes(strCodigo, strRut, strNombre, strApellido).ToArray();

            }

            XElement _xmlAyudantes = new XElement("Ayudantes");

            foreach (get_ayudantesResult _u in _ayudantes)
            {
                XElement _conductor = new XElement("Ayudante",
                                         new XElement("Id", _u.id),
                                         new XElement("Rut", _u.rut),
                                         new XElement("Nombres", _u.nombres),
                                         new XElement("Apellidos", _u.apellidos));

                _xmlAyudantes.Add(_conductor);

            }

            return _xmlAyudantes.ToString();

        }
    }
}