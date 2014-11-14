using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;

namespace TCSWebSite
{
    public partial class Contrato_Print : System.Web.UI.Page
    {
        public string formatearRut(string rut)
        {
            int cont = 0;
            string format;
            if (rut.Length == 0)
            {
                return "";
            }
            else
            {
                rut = rut.Replace(".", "");
                rut = rut.Replace("-", "");
                format = "-" + rut.Substring(rut.Length - 1);
                for (int i = rut.Length - 2; i >= 0; i--)
                {
                    format = rut.Substring(i, 1) + format;
                    cont++;
                    if (cont == 3 && i != 0)
                    {
                        format = "." + format;
                        cont = 0;
                    }
                }
                return format;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

            XPSClass.nombre_tran = Request.QueryString["nombre_tran"]; 
            XPSClass.rut_tran = Request.QueryString["rut_tran"]; 
            XPSClass.fono_tran = Request.QueryString["fono_tran"]; 
            XPSClass.domicilio_tran = Request.QueryString["domicilio_tran"]; 
            XPSClass.nombre_apo = Request.QueryString["nombre_apo"]; 
            XPSClass.rut_apo = formatearRut(Request.QueryString["rut_apo"]); 
            XPSClass.fono_apo = Request.QueryString["fono_apo"]; 
            XPSClass.domicilio_apo = Request.QueryString["domicilio_apo"]; 
            XPSClass.nombre_estab = Request.QueryString["nombre_estab"]; 
            XPSClass.nombre_estudiante = Request.QueryString["nombre_estudiante"]; 
            XPSClass.horario_trayecto = Request.QueryString["horario_trayecto"];
            XPSClass.monto_numero = "$ " + string.Format("{0:c}", Request.QueryString["monto_numero"]);
            XPSClass.monto_letras = Conv.enletras(Request.QueryString["monto_numero"]) + " PESOS";
            XPSClass.fecha_ini = Request.QueryString["fecha_ini"]; 
            XPSClass.fecha_fin = Request.QueryString["fecha_fin"];

            string sid = Request.Form["id"];
            string pageTemplate = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/documents/contrato.xaml"));
            //string pageTemplate = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/documents/ruta_transporte_2.xaml"));

            byte[] bytes = XPSClass.FlowDocumentToXPS(XPSClass.GenerateLetter(pageTemplate), 640, 900);

            HttpContext context = HttpContext.Current;
            context.Response.Clear();
            context.Response.ClearContent();
            context.Response.ClearHeaders();
            context.Response.BufferOutput = true;
            
            context.Response.ContentType = "application/vnd.ms-xpsdocument";
            context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + "CONTRATO_" + XPSClass.nombre_apo.Trim() + ".xps");
            context.Response.OutputStream.Write(bytes, 0, bytes.Length);

            context.ApplicationInstance.CompleteRequest();
            
            //context.Response.Flush();
            //context.Response.Close();
            //context.Response.End();



        }

        public string GenerateContract(string nombre_tran, string rut_tran, string fono_tran, string domicilio_tran, string nombre_apo, string rut_apo, string fono_apo, string domicilio_apo, string nombre_estab, string nombre_estudiante, string horario_trayecto, string monto_numero, string fecha_ini, string fecha_fin)
        {
            try
            {
                string sid = Request.Form["id"];
                string pageTemplate = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/documents/contrato.xaml"));

                XPSClass.nombre_tran = nombre_tran;
                XPSClass.rut_tran = rut_tran;
                XPSClass.fono_tran = fono_tran;
                XPSClass.domicilio_tran = domicilio_tran;
                XPSClass.nombre_apo = nombre_apo;
                XPSClass.rut_apo = rut_apo;
                XPSClass.fono_apo = fono_apo;
                XPSClass.domicilio_apo = domicilio_apo;
                XPSClass.nombre_estab = nombre_estab;
                XPSClass.nombre_estudiante = nombre_estudiante;
                XPSClass.horario_trayecto = horario_trayecto;
                XPSClass.monto_numero = monto_numero;
                XPSClass.monto_letras = Conv.enletras(monto_numero);
                XPSClass.fecha_ini = fecha_ini;
                XPSClass.fecha_fin = fecha_fin;

                byte[] bytes = XPSClass.FlowDocumentToXPS(XPSClass.GenerateLetter(pageTemplate), 640, 900);

                HttpContext context = HttpContext.Current;
                context.Response.Clear();
                context.Response.ContentType = "application/vnd.ms-xpsdocument";
                //context.Response.AppendHeader("Content-Disposition", "attachment; filename=document.xps");
                context.Response.AddHeader("Content-Disposition", "attachment; filename=document.xps");
                context.Response.OutputStream.Write(bytes, 0, bytes.Length);
                context.Response.Flush();
                context.Response.Close();
                context.Response.End();

                //Response.Clear();
                //Response.ContentType = "application/vnd.ms-xpsdocument";
                //Response.AddHeader("Content-Disposition", "attachment; filename=document.xps");
                //Response.OutputStream.Write(bytes, 0, bytes.Length);
                //Response.Flush();
                //Response.Close();


            }
            catch (Exception ex)
            {
            }
            return "true";
        }
    }
}