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
    public partial class Ingresos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Ingresos));
        }

        [Ajax.AjaxMethod()]
        public string getIngresos(string txtIngreso, string txtDocumento, string ddlTipoIngreso, string txtFechaDesde, string txtFechaHasta)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_ingresosResult[] _ingresos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _ingresos = dataContext.get_ingresos(txtIngreso, txtDocumento, ddlTipoIngreso, txtFechaDesde, txtFechaHasta).ToArray();

            }

            XElement _xmlIngresos = new XElement("Ingresos");

            foreach (get_ingresosResult _u in _ingresos)
            {
                XElement Ingreso = new XElement("Ingreso",
                                         new XElement("id_ingreso", _u.id_ingreso),
                                         new XElement("numero_documento", _u.numero_documento),
                                         new XElement("id_tipo_ingreso", _u.id_tipo_ingreso),
                                         new XElement("tipo_ingreso", _u.tipo_ingreso),
                                         new XElement("ano_ingreso", _u.ano_ingreso),
                                         new XElement("mes_ingreso", _u.mes_ingreso),
                                         new XElement("fecha", _u.fecha),
                                         new XElement("monto", _u.monto),
                                         new XElement("fecha", _u.fecha),
                                         new XElement("tipo_pago", _u.tipo_ingreso),
                                         new XElement("observaciones", _u.observaciones),
                                         new XElement("descripcion", _u.descripcion));

                _xmlIngresos.Add(Ingreso);

            }

            return _xmlIngresos.ToString();

        }
    }
}