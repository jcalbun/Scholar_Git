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
using System.Data;
using System.Reflection;

using System.IO;
using System.Runtime.InteropServices;
using System.Web.Configuration;
using System.Web.SessionState;

namespace TCSWebSite
{
    public partial class Pagos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Pagos));        
        }

        [Ajax.AjaxMethod()]
        public string LoadApoderadosPopupPage(string _rut_apoderado, string _apellidos_apoderado, string _nombres_apoderado)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_apoderadosResult[] _apoderados = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _apoderados = dataContext.get_apoderados("", _rut_apoderado, _nombres_apoderado, _apellidos_apoderado, "", "", "").ToArray();

            }

            XElement _xmlApoderados = new XElement("Apoderados");

            foreach (get_apoderadosResult _u in _apoderados)
            {
                XElement apoderado = new XElement("Apoderado",
                                         new XElement("Id", _u.id_ap),
                                         new XElement("Rut", _u.rut_ap),
                                         new XElement("Nombre", _u.apellidos_ap.Trim() + "," + _u.nombres_ap.Trim()));

                _xmlApoderados.Add(apoderado);

            }

            return _xmlApoderados.ToString();
        }

        [Ajax.AjaxMethod()]
        public string InsertPago(string txtCurrentPagoId, string txtCurrentIdApoderado, string txtCurrentContratoId, string txtCurrentFechaPago, string txtCurrentAnoCuota, string txtCurrentMesCuota, string txtCurrentMonto, string ddlCurrentTipoPago, string txtCurrentComprobante, string txtCurrentObs)
        {
            //Set dates and local settings for the current thread
            //Thread.CurrentThread.CurrentCulture = CultureManager.CulturePattern;

            XmlSerializer xs = new XmlSerializer(typeof(bool));

            MemoryStream ms = new MemoryStream();

            XmlTextWriter xtw = new XmlTextWriter(ms, Encoding.UTF8);

            bool result = false;

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

            pago _pago = new pago();

            _pago.id_apoderado = Convert.ToInt32(txtCurrentIdApoderado);
            _pago.id_contrato = Convert.ToInt32(txtCurrentContratoId);
            _pago.numero_documento = txtCurrentComprobante;
            _pago.fecha = Convert.ToDateTime(txtCurrentFechaPago);
            _pago.monto = Convert.ToDecimal(txtCurrentMonto);
            _pago.observaciones = txtCurrentObs;
            _pago.tipo_pago = ddlCurrentTipoPago[0];
            _pago.ano_cuota = Convert.ToInt32(txtCurrentAnoCuota);
            _pago.mes_cuota = Convert.ToInt32(txtCurrentMesCuota);
            

            _pago.usuario_cr = "TCSUSER";
            _pago.usuario_up = "TCSUSER";
            _pago.fecha_cr = DateTime.Now;
            _pago.fecha_up = DateTime.Now;

            dataContext.pagos.InsertOnSubmit(_pago);
            dataContext.SubmitChanges();

            result = true;

            ms = new MemoryStream();

            xtw = new XmlTextWriter(ms, Encoding.UTF8);

            xs = new XmlSerializer(typeof(bool));

            xs.Serialize(xtw, result);

            ms = (MemoryStream)xtw.BaseStream;

            string xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray());

            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);

            return xmlResult;
        }

        [Ajax.AjaxMethod()]
        public string LoadContratosPopupPage(string txtApoderado)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_contratos3Result[] _contratos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _contratos = dataContext.get_contratos3(txtApoderado).ToArray();

            }

            XElement _xmlContratos = new XElement("Contratos");

            foreach (get_contratos3Result _u in _contratos)
            {
                XElement _contrato = new XElement("Contrato",
                                         new XElement("id_contrato", _u.id),
                                         new XElement("id_apoderado", _u.id_apoderado),
                                         new XElement("apoderado", _u.apoderado.Trim()),
                                         new XElement("id_estudiante", _u.id_estudiante),
                                         new XElement("estudiante", _u.estudiante),
                                         new XElement("id_fecha_pago_contrato", _u.id_fecha_pago_contrato),
                                         new XElement("fecha_pago_contrato", _u.fecha_pago_contrato),
                                         new XElement("ano_contrato", _u.ano),
                                         new XElement("monto_contrato", Convert.ToInt32(_u.monto_contrato)),
                                         new XElement("activo", _u.activo),
                                         new XElement("fecha_inicio", _u.fecha_inicio.Value.ToShortDateString()),
                                         new XElement("fecha_fin", _u.fecha_fin.Value.ToShortDateString()),
                                         new XElement("rut_apoderado", _u.rut_apoderado),
                                         new XElement("id_establecimiento", _u.id_establecimiento),
                                         new XElement("nombre_establecimiento", _u.nombre_establecimiento),
                                         new XElement("itinerario", _u.itinerario),
                                         new XElement("direccion_apoderado", _u.direccion_apoderado),
                                         new XElement("telefono_apoderado", _u.telefono_apoderado),
                                         new XElement("observaciones", _u.observaciones));

                _xmlContratos.Add(_contrato);

            }

            return _xmlContratos.ToString();
        }

        [Ajax.AjaxMethod()]
        public string getPagos(string txtPagoId, string txtApoderado, string txtContrato, string txtDocumento, string txtFechaDesde, string txtFechaHasta)
        {

            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_pagosResult[] _pagos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _pagos = dataContext.get_pagos(txtPagoId, txtApoderado, txtContrato, txtDocumento, txtFechaDesde, txtFechaHasta).ToArray();

            }

            XElement _xmlPagos = new XElement("Pagos");

            foreach (get_pagosResult _u in _pagos)
            {
                XElement pago = new XElement("Pago",
                                         new XElement("id_pago", _u.id_pago),
                                         new XElement("id_contrato", _u.id_contrato),
                                         new XElement("id_apoderado", _u.id_apoderado),
                                         new XElement("apoderado", _u.apoderado),
                                         new XElement("id_contrato", _u.id_contrato),
                                         new XElement("numero_documento", _u.numero_documento),
                                         new XElement("ano_cuota", _u.ano_cuota),
                                         new XElement("mes_cuota", _u.mes_cuota),
                                         new XElement("fecha", _u.fecha.ToShortDateString()),
                                         new XElement("monto", _u.monto),
                                         new XElement("fecha", _u.fecha.ToShortDateString()),
                                         new XElement("tipo_pago", _u.tipo_pago),
                                         new XElement("observaciones", _u.observaciones));

                _xmlPagos.Add(pago);

            }

            return _xmlPagos.ToString();

        }

        protected void btnInformePagos_Click(object sender, EventArgs e)
        {
            gw_ScholarConnection _gw_ScholarConnection = new gw_ScholarConnection();
            _gw_ScholarConnection.Connection();

            get_informe_pagosResult[] _pagos = null;

            if (_gw_ScholarConnection.log.status == "SUCCESSFUL")
            {
                ScholarDBDataContext dataContext = _gw_ScholarConnection.scholarDBDataContext;

                _pagos = dataContext.get_informe_pagos().ToArray();
                DataTable dt = ConvertArrayToDatatable(_pagos);

                DataSet ds = new DataSet("table");
                ds.Tables.Add(dt); 

                GridView gv = new GridView();
                gv.AutoGenerateColumns = true;

                gv.DataSource = ds;
                gv.DataBind();

                Response.Clear();

                Response.AddHeader("content-disposition", "attachment; filename=FileName.xls");
                Response.ContentType = "application/vnd.xls";
                System.IO.StringWriter stringWrite = new System.IO.StringWriter();
                System.Web.UI.HtmlTextWriter htmlWrite = new HtmlTextWriter(stringWrite);
                gv.RenderControl(htmlWrite);
                Response.Write(stringWrite.ToString());
                Response.End();

            }

        }

        public DataTable ConvertArrayToDatatable(get_informe_pagosResult[] arrList)
        {
            DataTable dt = new DataTable();
            try
            {
                if (arrList.Count() > 0)
                {
                    Type arrype = arrList[0].GetType();
                    dt = new DataTable(arrype.Name);

                    foreach (PropertyInfo propInfo in arrype.GetProperties())
                    {
                        dt.Columns.Add(new DataColumn(propInfo.Name));
                    }

                    foreach (object obj in arrList)
                    {
                        DataRow dr = dt.NewRow();

                        foreach (DataColumn dc in dt.Columns)
                        {
                            dr[dc.ColumnName] = obj.GetType().GetProperty(dc.ColumnName).GetValue(obj, null);
                        }
                        dt.Rows.Add(dr);

                    }
                }


                return dt;
            }
            catch (Exception ex)
            {
                return dt;
            }

        }
    }
}