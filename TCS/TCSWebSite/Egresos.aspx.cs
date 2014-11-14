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
    public partial class Egresos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Egresos));
        }

        [Ajax.AjaxMethod()]
        public string getEgresos(string txtEgreso, string txtDocumento, string ddlTipoEgreso, string txtFechaDesde, string txtFechaHasta)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_egresosResult[] _egresos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _egresos = dataContext.get_egresos(txtEgreso, txtDocumento, ddlTipoEgreso, txtFechaDesde, txtFechaHasta).ToArray();

            }

            XElement _xmlEgresos = new XElement("Egresos");

            foreach (get_egresosResult _u in _egresos)
            {
                XElement Egreso = new XElement("Egreso",
                                         new XElement("id_egreso", _u.id_egreso),
                                         new XElement("numero_documento", _u.numero_documento),
                                         new XElement("id_tipo_egreso", _u.id_tipo_egreso),
                                         new XElement("tipo_egreso", _u.tipo_egreso),
                                         new XElement("ano_egreso", _u.ano_egreso),
                                         new XElement("mes_egreso", _u.mes_egreso),
                                         new XElement("fecha", _u.fecha),
                                         new XElement("monto", _u.monto),
                                         new XElement("fecha", _u.fecha),
                                         new XElement("tipo_pago", _u.tipo_egreso),
                                         new XElement("observaciones", _u.observaciones),
                                         new XElement("descripcion", _u.descripcion));

                _xmlEgresos.Add(Egreso);

            }

            return _xmlEgresos.ToString();

        }
    }
}