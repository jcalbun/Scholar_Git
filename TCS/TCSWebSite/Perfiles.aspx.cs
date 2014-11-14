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
    public partial class Perfiles : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Perfiles));
        }

        [Ajax.AjaxMethod()]
        public string getPerfiles(string _codigo, string _nombre)
        {
            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();

            //gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            //_gw_ScholarConnection.Connection();

            profile[] _perfiles = null;

            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;

                _perfiles = (from u in dataContext.profiles
                             where (u.profile_id.Contains(_codigo) || _codigo == "") &&
                                   (u.profile_desc.Contains(_nombre) || _nombre == "")
                             select u).ToArray();
            }

            XElement _xmlPerfiles = new XElement("Perfiles");

             foreach (profile _u in _perfiles)
            {
                XElement perfil = new XElement("Perfil",
                                         new XElement("Codigo", _u.profile_id),
                                         new XElement("Nombre", _u.profile_desc));

                _xmlPerfiles.Add(perfil);

            }

            return _xmlPerfiles.ToString();

        }

        [Ajax.AjaxMethod()]
        public string LoadPerfilesPopupPage(string _codigo, string _nombre)
        {
            //Set dates and local settings for the current thread
            Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();

            profile[] _perfiles = null;

            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;

                _perfiles = (from u in dataContext.profiles
                             where (u.profile_id.Contains(_codigo) || _codigo == "") &&
                                   (u.profile_desc.Contains(_nombre) || _nombre == "")
                             select u).ToArray();
            }

            XElement _xmlPerfiles = new XElement("Perfiles");

            foreach (profile _u in _perfiles)
            {
                XElement perfil = new XElement("Perfil",
                                         new XElement("Codigo", _u.profile_id),
                                         new XElement("Nombre", _u.profile_desc),
                                         new XElement("Descripcion", _u.profile_desc));

                _xmlPerfiles.Add(perfil);

            }

            return _xmlPerfiles.ToString();
        }

    }


}