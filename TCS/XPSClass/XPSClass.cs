using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Xps;
using System.Windows.Xps.Serialization;
using System.Windows.Xps.Packaging;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Markup;
using System.IO;
using System.IO.Packaging;

namespace TCSWebSite
{
    public static class XPSClass
    {
        public static string nombre_tran;
        public static string rut_tran;
        public static string fono_tran;
        public static string domicilio_tran;
        public static string nombre_apo;
        public static string rut_apo;
        public static string fono_apo;
        public static string domicilio_apo;
        public static string nombre_estab;
        public static string nombre_estudiante;
        public static string horario_trayecto;
        public static string monto_numero;
        public static string monto_letras;
        public static string fecha_ini;
        public static string fecha_fin;
        public static string fecha_actual;

        public static FlowDocument GenerateLetter(string pageTemplate)
        {
            //string pageTemplate = System.IO.File.ReadAllText(@"C:\CodeMangusta\TCS\TCSWebSite\CONTRATO.XAML");
            fecha_actual = DateTime.Now.ToShortDateString();

            pageTemplate = pageTemplate.Replace("[NOMBRE_TRANSPORTISTA]", nombre_tran);
            pageTemplate = pageTemplate.Replace("[RUT_TRANSPORTISTA]",rut_tran);
            pageTemplate = pageTemplate.Replace("[FONO_TRANSPORTISTA]", fono_tran);
            pageTemplate = pageTemplate.Replace("[DOMICILIO_TRANSPORTISTA]", domicilio_tran);
            pageTemplate = pageTemplate.Replace("[NOMBRE_APODERADO]", nombre_apo);
            pageTemplate = pageTemplate.Replace("[RUT_APODERADO]", rut_apo);
            pageTemplate = pageTemplate.Replace("[FONO_APODERADO]", fono_apo);
            pageTemplate = pageTemplate.Replace("[DOMICILIO_APODERADO]", domicilio_apo);
            pageTemplate = pageTemplate.Replace("[NOMBRE_ESTABLECIMIENTO]", nombre_estab);
            pageTemplate = pageTemplate.Replace("[NOMBRE_ESTUDIANTE]", nombre_estudiante);
            pageTemplate = pageTemplate.Replace("[HORARIO_TRAYECTO]", horario_trayecto);
            pageTemplate = pageTemplate.Replace("[MONTO_NUMEROS]", monto_numero);
            pageTemplate = pageTemplate.Replace("[MONTO_LETRAS]", monto_letras);
            pageTemplate = pageTemplate.Replace("[FECHA_INICIAL]", fecha_ini);
            pageTemplate = pageTemplate.Replace("[FECHA_FINAL]", fecha_fin);
            pageTemplate = pageTemplate.Replace("[FECHA_ACTUAL]", fecha_actual);

            //pageTemplate = pageTemplate.Replace("[ESTUDIANTE_1]", "JUAN OSVALDO SALINAS MANQUEHUE REBOLLEDO");

            FlowDocument flowDocument = (FlowDocument)XamlReader.Parse(pageTemplate);


            return flowDocument;
        }

        public static FlowDocument GenerateLetter2(string pageTemplate)
        {
            
            FlowDocument flowDocument = (FlowDocument)XamlReader.Parse(pageTemplate);


            return flowDocument;
        }

        public static byte[] FlowDocumentToXPS(FlowDocument flowDocument, int width, int height)
        {
            MemoryStream stream = new MemoryStream();
            // create a package
            using (Package package = Package.Open(stream, FileMode.CreateNew))
            {
                // create an empty XPS document   
                using (XpsDocument xpsDoc = new XpsDocument(package, CompressionOption.NotCompressed))
                {
                    // create a serialization manager
                    XpsSerializationManager rsm = new XpsSerializationManager(new XpsPackagingPolicy(xpsDoc), false);
                    // retrieve document paginator
                    DocumentPaginator paginator = ((IDocumentPaginatorSource)flowDocument).DocumentPaginator;
                    // set page size
                    paginator.PageSize = new System.Windows.Size(width, height);
                    // save as XPS
                    rsm.SaveAsXaml(paginator);
                    rsm.Commit();
                }
                return stream.ToArray();
            }
        }
    }
}
