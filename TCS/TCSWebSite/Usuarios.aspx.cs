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
    public partial class Usuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Usuarios));
        }


        [Ajax.AjaxMethod()]
        public string LoadUsuariosPopupPage(string _codigo, string _nombre)
        {
            //Set dates and local settings for the current thread
            Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            _gw_SecurityConnection.Connection();
            usuarios_aplicacione[] _usuarios = null;
            if (_gw_SecurityConnection.log.status == "SUCCESSFUL")
            {
                SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                _usuarios = (from u in dataContext.usuarios_aplicaciones
                             where (u.usuario.codigo_usuario.Contains(_codigo) || _codigo == "") &&
                                   (u.usuario.nombre.Contains(_nombre) || _nombre == "")
                             select u).ToArray();
            }


           
            XElement _xmlTcsUsers = new XElement("Usuarios");

            foreach (usuarios_aplicacione _u in _usuarios)
            {

                XElement TcsUser = new XElement("TcsUser",
                                         new XElement("Codigo", _u.usuario.codigo_usuario),
                                         new XElement("Nombre", _u.usuario.nombre));
                _xmlTcsUsers.Add(TcsUser);

            }

            return _xmlTcsUsers.ToString();
        }

        [Ajax.AjaxMethod()]
        public string getUsuarios(string _codigo, string _nombre)
        {
            //gw_SecurityConnection _gw_SecurityConnection = new gw_SecurityConnection();
            //_gw_SecurityConnection.Connection();

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();
            
            //usuarios_aplicacione[] _usuarios = null;

            get_usuariosResult[] _usuarios = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                //SecurityDBDataContext dataContext = _gw_SecurityConnection.securityDBDataContext;
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _usuarios = dataContext.get_usuarios(_codigo, _nombre).ToArray();
                
                //_usuarios = (from u in dataContext.usuarios_aplicaciones 
                //             where (u.usuario.codigo_usuario.Contains(_codigo) || _codigo == "") &&
                //                   (u.usuario.nombre.Contains(_nombre) || _nombre == "")
                //             select u).ToArray();
            }
            
            XElement _xmlUsuarios = new XElement("Usuarios");

            //foreach (usuarios_aplicacione _u in _usuarios)
            foreach (get_usuariosResult _u in _usuarios)
            {
                XElement usuario = new XElement("Usuario",
                                         new XElement("Codigo", _u.codigo_usuario),
                                         new XElement("Nombre", _u.nombre),
                                         new XElement("Perfil", _u.codigo_perfil),
                                         new XElement("Activo", _u.activo),
                                         new XElement("Email", _u.email),
                                         new XElement("Password", _u.password),
                                         new XElement("Caduca", _u.fecha_validez),
                                         new XElement("FechaValidez", _u.fecha_validez));

                //XElement usuario = new XElement("Usuario",
                //                         new XElement("Codigo", _u.usuario.codigo_usuario),
                //                         new XElement("Nombre", _u.usuario.nombre),
                //                         new XElement("Perfil", _u.usuario.codigo_perfil),
                //                         new XElement("Activo", _u.Bloqueado.ToString()));
                _xmlUsuarios.Add(usuario);

            }

            return _xmlUsuarios.ToString();

        }
    }
}