using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TCSWebSite.TCSWcfServiceReference;
using System.Collections;


namespace TCSWebSite
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Ajax.Utility.RegisterTypeForAjax(typeof(Home));
        }

        [Ajax.AjaxMethod()]
        public string LogIn(string _userId, string _userPassword, string _applicationId)
        {

            InterfaceServiceTCSClient client = new InterfaceServiceTCSClient();
            dc_User _user = client.ValidUserAccess(_userId, _userPassword, _applicationId);
            client.Close();

            string xmlResult = null;
            MemoryStream ms = new MemoryStream();
            XmlTextWriter xmltw = new XmlTextWriter(ms, Encoding.UTF8);
            XmlSerializer xs = new XmlSerializer(typeof(dc_User));
            xs.Serialize(xmltw, _user);
            ms = (MemoryStream)xmltw.BaseStream;
            xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray()).ToString();
            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);
            return xmlResult;

        }

        [Ajax.AjaxMethod()]
        public string GetMenu(string _userId, string _applicationId)
        {
            InterfaceServiceTCSClient client = new InterfaceServiceTCSClient();

            dc_Profile  _dc_ProfileList =  client.GetMenu(_userId, _applicationId);

            client.Close();

            string xmlResult = null;
            MemoryStream ms = new MemoryStream();
            XmlTextWriter xmltw = new XmlTextWriter(ms, Encoding.UTF8);
            XmlSerializer xs = new XmlSerializer(typeof(dc_Profile));
            xs.Serialize(xmltw, _dc_ProfileList);
            ms = (MemoryStream)xmltw.BaseStream;
            xmlResult = cs.UTF8Helper.UTF8ByteArrayToString(ms.ToArray()).ToString();
            xmlResult = xmlResult.Substring(1, xmlResult.Length - 1);
            return xmlResult;
        }

    }
}
