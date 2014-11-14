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
    public partial class Minibuses : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Minibuses));
        }

        [Ajax.AjaxMethod()]
        public string getMinibuses(string txtId, string txtPatente, string txtMarca, string txtModelo, string txtAno)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_minibusesResult[] _minibuses = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _minibuses = dataContext.get_minibuses(txtId, txtPatente, txtMarca, txtModelo, txtAno).ToArray();

            }

            XElement _xmlMinibuses = new XElement("Minibuses");

            foreach (get_minibusesResult _u in _minibuses)
            {
                XElement _minibus = new XElement("Minibus",
                                         new XElement("Id", _u.id),
                                         new XElement("Patente", _u.numero_patente),
                                         new XElement("Descripcion", _u.descripcion),
                                         new XElement("Marca", _u.marca),
                                         new XElement("Modelo", _u.modelo),
                                         new XElement("Ano", _u.ano),
                                         new XElement("AnoActividad", _u.ano_inicio_actividad),
                                         new XElement("Kilometraje", _u.kilometraje),
                                         new XElement("TipoCombustible", _u.tipo_combustible));

                _xmlMinibuses.Add(_minibus);

            }

            return _xmlMinibuses.ToString();

        }
    }
}