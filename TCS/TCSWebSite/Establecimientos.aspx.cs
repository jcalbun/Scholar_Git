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


using TCSWebSite.TCSWcfServiceReference;


namespace TCSWebSite
{
    public partial class Establecimientos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Establecimientos));
        }

        [Ajax.AjaxMethod()]
        public string getEstablecimientos(string _id, string _descripcion)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_establecimientosResult[] _establecimientos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _establecimientos = dataContext.get_establecimientos(_id, _descripcion).ToArray();

            }

            XElement _xmlEstablecimientos = new XElement("Establecimientos");

            foreach (get_establecimientosResult _u in _establecimientos)
            {
                XElement establecimiento = new XElement("Establecimiento",
                                         new XElement("Id", _u.id),
                                         new XElement("Descripcion", _u.descripcion),
                                         new XElement("Direccion", _u.direccion_1),
                                         new XElement("Telefono", _u.telefono_1),
                                         new XElement("Email", _u.email),
                                         new XElement("Tipo", _u.id_tipo),
                                         new XElement("NombreTipo", _u.tipo_establecimiento));

                _xmlEstablecimientos.Add(establecimiento);

            }

            return _xmlEstablecimientos.ToString();

        }
    }
}