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
    public partial class RutaAyudante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(RutaAyudante));        
        }

        [Ajax.AjaxMethod()]
        public string getRutaAyudantes(string txtRuta, string txtTrayecto, string txtAyudante, string txtEstudiante)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ruta_ayudantesResult[] _ruta_ayudantes = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _ruta_ayudantes = dataContext.get_ruta_ayudantes(txtRuta, txtTrayecto, txtAyudante, txtEstudiante).ToArray();

            }

            XElement _xmlRutaAyudantes = new XElement("RutaAyudantes");

            foreach (get_ruta_ayudantesResult _u in _ruta_ayudantes)
            {
                XElement _ruta_ayudante = new XElement("RutaAyudante",
                                         new XElement("IdRuta", _u.id_ruta),
                                         new XElement("Ruta", _u.nombre_ruta),
                                         new XElement("IdTrayecto", _u.id_trayecto),
                                         new XElement("Trayecto", _u.trayecto),
                                         new XElement("IdAyudante", _u.id_ayudante),
                                         new XElement("Ayudante", _u.ayudante),
                                         new XElement("IdEstudiante", _u.id_estudiante),
                                         new XElement("Estudiante", _u.estudiante));

                _xmlRutaAyudantes.Add(_ruta_ayudante);

            }

            return _xmlRutaAyudantes.ToString();

        }
    }
}