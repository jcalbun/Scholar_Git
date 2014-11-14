using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;
using System.Web.UI.WebControls;

namespace TCSWebSite
{
    public partial class Print_Ruta : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            string pageTemplate = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/documents/RUTA_TRANSPORTE_4.xaml"));

            string nombre_ruta = Request.QueryString["nombre_ruta"];
            nombre_ruta = nombre_ruta.Replace("Ñ", "N");
            string nombre_transportista = Request.QueryString["nombre_transportista"];
            string nombre_ayudante = Request.QueryString["nombre_ayudante"];
            string nombre_vehiculo = Request.QueryString["nombre_vehiculo"];

            string _xmlPrintRuta = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/documents/xmlfile.xml"));

            //XDocument doc = XDocument.Parse(_xmlPrintRuta);
            XmlDocument doc1 = new XmlDocument();
            
            doc1.LoadXml(_xmlPrintRuta);

            XmlNodeList nl = doc1.SelectNodes("Rutas/Ruta");
            int i = 1;
            foreach (XmlNode xnode in nl)
            {
                string estudiante = xnode["estudiante"].InnerText;
                string direccion_origen = xnode["direccion_origen"].InnerText;
                string telefono_origen = xnode["telefono_origen"].InnerText;
                string hora_origen = xnode["hora_origen"].InnerText;
                string nombre_establecimiento = xnode["nombre_establecimiento"].InnerText;
                string direccion_destino = xnode["direccion_destino"].InnerText;
                string telefono_destino = xnode["telefono_destino"].InnerText;

                pageTemplate = pageTemplate.Replace("[NOMBRE_ESTUDIANTE_"+i.ToString()+"]", estudiante);
                pageTemplate = pageTemplate.Replace("[DIRECCION_ORIGEN_" + i.ToString() + "]", direccion_origen);
                pageTemplate = pageTemplate.Replace("[FONO_" + i.ToString() + "]", telefono_origen);
                pageTemplate = pageTemplate.Replace("[HR_" + i.ToString() + "]", hora_origen);
                pageTemplate = pageTemplate.Replace("[ESTAB_" + i.ToString() + "]", nombre_establecimiento);
                pageTemplate = pageTemplate.Replace("[DIRECCION_DESTINO_" + i.ToString() + "]", direccion_destino);
                pageTemplate = pageTemplate.Replace("[FOND_" + i.ToString() + "]", telefono_destino);

                i++;
            }

            for (int j = i; j <= 50; j++)
            {
                pageTemplate = pageTemplate.Replace("[NOMBRE_ESTUDIANTE_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[DIRECCION_ORIGEN_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[FONO_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[HR_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[ESTAB_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[DIRECCION_DESTINO_" + j.ToString() + "]", String.Empty);
                pageTemplate = pageTemplate.Replace("[FOND_" + j.ToString() + "]", String.Empty);
            }

            pageTemplate = pageTemplate.Replace("[NOMBRE_RUTA]", nombre_ruta);
            pageTemplate = pageTemplate.Replace("[FECHA_ACTUAL]", DateTime.Now.ToShortDateString());
            pageTemplate = pageTemplate.Replace("[NOMBRE_TRANSPORTISTA]",nombre_transportista);
            pageTemplate = pageTemplate.Replace("[NOMBRE_AYUDANTE]",nombre_ayudante);
            pageTemplate = pageTemplate.Replace("[NOMBRE_VEHICULO]",nombre_vehiculo);


            byte[] bytes = XPSClass.FlowDocumentToXPS(XPSClass.GenerateLetter2(pageTemplate), 900, 900);

            HttpContext context = HttpContext.Current;
            
            context.Response.Clear();
            context.Response.ClearContent();
            context.Response.ClearHeaders();
            context.Response.BufferOutput = true;

            context.Response.ContentType = "application/vnd.ms-xpsdocument";
            context.Response.AppendHeader("Content-Disposition", "attachment; filename= " + nombre_ruta.Trim() + ".xps");
            context.Response.OutputStream.Write(bytes, 0, bytes.Length);

            context.ApplicationInstance.CompleteRequest();

            //context.Response.Flush();
            //context.Response.Close();
            //context.Response.End();
        }
    }
}