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
    public partial class PerfilUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Opciones));
        }

        [Ajax.AjaxMethod()]
        public string getOpciones(string _codigo, string _nombre)
        {
            //gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            //_gw_SecurityConnection.Connection();

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            //option_application[] _opciones = null;
            //profile[] _perfiles = null;
            get_opcionesResult[] _opciones = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _opciones = dataContext.get_opciones(_codigo, _nombre).ToArray();

                //_opciones = (from u in dataContext.optio
                //             where (u.profile_id.Contains(_codigo) || _codigo == "") &&
                //                   (u.profile_desc.Contains(_nombre) || _nombre == "")
                //             select u).ToArray();
            }

            XElement _xmlOpciones = new XElement("Opciones");

            foreach (get_opcionesResult _u in _opciones)
            {
                XElement opcion = new XElement("Opcion",
                                         new XElement("Codigo", _u.codigo),
                                         new XElement("Nombre", _u.nombre),
                                         new XElement("Url", _u.url));

                _xmlOpciones.Add(opcion);

            }

            return _xmlOpciones.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadOpcionesPopupPage(string _codigo, string _nombre)
        {
            //Set dates and local settings for the current thread
            Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_opcionesResult[] _opciones = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _opciones = dataContext.get_opciones(_codigo, _nombre).ToArray();

                //_opciones = (from u in dataContext.optio
                //             where (u.profile_id.Contains(_codigo) || _codigo == "") &&
                //                   (u.profile_desc.Contains(_nombre) || _nombre == "")
                //             select u).ToArray();
            }

            XElement _xmlOpciones = new XElement("Opciones");

            foreach (get_opcionesResult _u in _opciones)
            {
                XElement opcion = new XElement("Opcion",
                                         new XElement("Codigo", _u.codigo),
                                         new XElement("Nombre", _u.nombre),
                                         new XElement("Url", _u.url));

                _xmlOpciones.Add(opcion);

            }

            return _xmlOpciones.ToString();

        }
    }
}